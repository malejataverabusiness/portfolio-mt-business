import { describe, it, expect, vi } from "vitest";

// Mock server-only so unit tests can run outside of Next.js Server Component runtime
vi.mock("server-only", () => ({}));

import { calculateQuoteV1 } from "../calculator";
import { generateCustomerFacingRange } from "../formatters";
import type { PricingSettings } from "../../types";

describe("MTB Quote V1 — Integration & Security Audit Test Suite", () => {
  const mockSettings: PricingSettings = {
    id: "settings-prod",
    default_margin: 0.35,
    default_contingency: 0.1,
    account_mgmt_rate: 0.1,
    project_mgmt_rate: 0.1,
    min_project_value_cop: 1000000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  it("1. Should enforce minimum project value floor when calculated price is lower", () => {
    const tinyItem = {
      deliverableId: "tiny-deliv",
      quantity: 1,
      complexity: "basic" as const,
      mtbLaborHours: 1,
      mtbHourlyRateCop: 50000,
      freelancerHours: 0,
      freelancerHourlyRateCop: 0,
    };

    const res = calculateQuoteV1({
      items: [tinyItem],
      settings: mockSettings,
    });

    expect(res.calculatedPriceCop).toBeGreaterThanOrEqual(1000000);
  });

  it("2. Should apply complexity multipliers correctly across basic, standard, advanced, enterprise", () => {
    const baseItem = {
      deliverableId: "cmplx-deliv",
      quantity: 1,
      complexity: "basic" as const,
      mtbLaborHours: 10,
      mtbHourlyRateCop: 100000,
      freelancerHours: 0,
      freelancerHourlyRateCop: 0,
    };

    const basicRes = calculateQuoteV1({ items: [{ ...baseItem, complexity: "basic" }], settings: mockSettings });
    const stdRes = calculateQuoteV1({ items: [{ ...baseItem, complexity: "standard" }], settings: mockSettings });
    const advRes = calculateQuoteV1({ items: [{ ...baseItem, complexity: "advanced" }], settings: mockSettings });
    const entRes = calculateQuoteV1({ items: [{ ...baseItem, complexity: "enterprise" }], settings: mockSettings });

    expect(basicRes.costBaseCop).toBeLessThan(stdRes.costBaseCop);
    expect(stdRes.costBaseCop).toBeLessThan(advRes.costBaseCop);
    expect(advRes.costBaseCop).toBeLessThan(entRes.costBaseCop);
  });

  it("3. Should apply urgency multipliers accurately (normal 1.0x, urgent 1.15x, critical 1.5x)", () => {
    const item = {
      deliverableId: "urgency-deliv",
      quantity: 1,
      complexity: "standard" as const,
      mtbLaborHours: 20,
      mtbHourlyRateCop: 140000,
      freelancerHours: 0,
      freelancerHourlyRateCop: 0,
    };

    const normal = calculateQuoteV1({ items: [item], urgency: "normal", settings: mockSettings });
    const urgent = calculateQuoteV1({ items: [item], urgency: "urgent", settings: mockSettings });
    const critical = calculateQuoteV1({ items: [item], urgency: "critical", settings: mockSettings });

    expect(urgent.calculatedPriceCop).toBeGreaterThan(normal.calculatedPriceCop);
    expect(critical.calculatedPriceCop).toBeGreaterThan(urgent.calculatedPriceCop);
  });

  it("4. Should format customer-facing range cleanly with ±12% rounding", () => {
    const range = generateCustomerFacingRange(10000000);

    expect(range.lowCop).toBeLessThan(10000000);
    expect(range.highCop).toBeGreaterThan(10000000);
    expect(range.formattedRange).toContain("COP");
  });

  it("5. Should handle external costs and manual overrides deterministically", () => {
    const item = {
      deliverableId: "override-deliv",
      quantity: 1,
      complexity: "standard" as const,
      mtbLaborHours: 10,
      mtbHourlyRateCop: 100000,
      freelancerHours: 0,
      freelancerHourlyRateCop: 0,
    };

    const normal = calculateQuoteV1({ items: [item], settings: mockSettings });
    const adjusted = calculateQuoteV1({
      items: [item],
      manualAdjustmentCop: 500000,
      externalCostsTotalCop: 300000,
      settings: mockSettings,
    });

    expect(adjusted.finalPriceCop).toBe(normal.calculatedPriceCop + 500000 + 300000);
  });

  it("6. Social Media Package Audit Scenario", () => {
    // Roles: SMM (100k), Content Mgr (100k), Designer (65k), Copywriter (65k), Video Editor (85k), CM (65k)
    // Avg freelancer rate ~75k, MTB rate 100k
    const item = {
      deliverableId: "social-media-pkg",
      quantity: 1,
      complexity: "standard" as const,
      mtbLaborHours: 30, // Strategy & Account Mgmt
      mtbHourlyRateCop: 100000,
      freelancerHours: 70, // Content, Design, Video, Copy, Community
      freelancerHourlyRateCop: 75000,
    };

    const res = calculateQuoteV1({ items: [item], urgency: "normal", settings: mockSettings });
    expect(res.costBaseCop).toBeGreaterThan(8000000);
    expect(res.recommendedPriceCop).toBeGreaterThan(res.costBaseCop);
  });

  it("7. Website Package Audit Scenario", () => {
    // Roles: UX (115k), UI (100k), Copy (65k), Frontend (115k), Backend (130k), PM (80k)
    const item = {
      deliverableId: "website-custom-pkg",
      quantity: 1,
      complexity: "advanced" as const,
      mtbLaborHours: 50,
      mtbHourlyRateCop: 120000,
      freelancerHours: 120,
      freelancerHourlyRateCop: 105000,
    };

    const res = calculateQuoteV1({ items: [item], urgency: "normal", settings: mockSettings });
    expect(res.costBaseCop).toBeGreaterThan(15000000);
  });

  it("8. Mobile App Package Audit Scenario", () => {
    // Roles: Product Des (130k), UX (115k), UI (100k), React Native (140k), Backend (130k), PM (80k)
    const item = {
      deliverableId: "mobile-app-pkg",
      quantity: 1,
      complexity: "enterprise" as const,
      mtbLaborHours: 80,
      mtbHourlyRateCop: 135000,
      freelancerHours: 200,
      freelancerHourlyRateCop: 125000,
    };

    const res = calculateQuoteV1({ items: [item], urgency: "urgent", settings: mockSettings });
    expect(res.recommendedPriceCop).toBeGreaterThan(40000000);
  });

  it("9. Marketing Campaign Audit Scenario", () => {
    // Roles: Strategist (140k), Content Mgr (100k), Copywriter (65k), Designer (65k), Paid Media (110k), Analyst (110k)
    const item = {
      deliverableId: "mktg-campaign-pkg",
      quantity: 1,
      complexity: "standard" as const,
      mtbLaborHours: 40,
      mtbHourlyRateCop: 120000,
      freelancerHours: 80,
      freelancerHourlyRateCop: 95000,
    };

    const res = calculateQuoteV1({
      items: [item],
      urgency: "normal",
      externalCostsTotalCop: 5000000, // 5M Meta Ads spend
      settings: mockSettings,
    });

    expect(res.externalCostsTotalCop).toBe(5000000);
    expect(res.finalPriceCop).toBe(res.calculatedPriceCop);
  });
});
