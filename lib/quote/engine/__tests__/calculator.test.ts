import { describe, it, expect, vi } from "vitest";

// Mock server-only so unit tests can run outside of Next.js Server Component runtime
vi.mock("server-only", () => ({}));

import { calculateQuoteV1 } from "../calculator";
import type { EngineCalculationInput, SeniorityLevel } from "../types";
import type { PricingSettings } from "../../types";

const mockSettings: PricingSettings = {
  id: "test-settings-001",
  default_margin: 0.35, // Target 35%
  default_contingency: 0.1, // Small 10%
  account_mgmt_rate: 0.1, // 10%
  project_mgmt_rate: 0.1, // 10%
  min_project_value_cop: 3000000, // 3M COP floor
  account_mgmt_rate_cop: 70000,
  project_mgmt_rate_cop: 80000,
  mtb_standard_rate_cop: 140000,
  mtb_advanced_rate_cop: 175000,
  mtb_expert_rate_cop: 200000,
  margin_floor: 0.25,
  margin_target: 0.35,
  margin_premium: 0.45,
  contingency_small: 0.1,
  contingency_medium: 0.08,
  contingency_large: 0.07,
  urgency_normal: 1.0,
  urgency_urgent: 1.15,
  urgency_very_urgent: 1.3,
  urgency_critical: 1.5,
  consulting_min_cop: 280000,
  is_active: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe("MTB Quote V1 — Formal Pricing Engine Unit Tests (Phase 4)", () => {
  // 1. Basic calculation
  it("1. Basic calculation — computes Internal Cost Base / (1 - Margin) = Recommended Price", () => {
    const input: EngineCalculationInput = {
      items: [
        {
          deliverableId: "deliv-1",
          quantity: 1,
          complexity: "standard", // 1.0 multiplier
          mtbLaborHours: 10,
          mtbHourlyRateCop: 140000, // 1,400,000 COP
          freelancerHours: 10,
          freelancerHourlyRateCop: 100000, // 1,000,000 COP
        },
      ],
      settings: mockSettings,
      marginTier: "target", // 35% margin -> divisor 0.65
      contingencyTier: "small", // 10% contingency
    };

    const result = calculateQuoteV1(input);

    // Direct Cost = 1,400,000 + 1,000,000 = 2,400,000 COP
    expect(result.directCostTotalCop).toBe(2400000);
    expect(result.mtbLaborCost).toBe(1400000);
    expect(result.freelancerCost).toBe(1000000);

    // Overhead = 10% AM + 10% PM + 10% Contingency = 30% of 2,400,000 = 720,000
    expect(result.accountManagementCost).toBe(240000);
    expect(result.projectManagementCost).toBe(240000);
    expect(result.contingency).toBe(240000);

    // Internal Cost Base = 2,400,000 + 720,000 = 3,120,000 COP
    expect(result.internalCost).toBe(3120000);

    // Recommended Price = 3,120,000 / (1 - 0.35) = 4,800,000 COP
    expect(result.recommendedPrice).toBe(4800000);
    expect(result.margin).toBe(0.35);
  });

  // 2. Multiple roles
  it("2. Multiple roles — calculates labor costs accurately across different assigned roles", () => {
    const input: EngineCalculationInput = {
      items: [
        {
          deliverableId: "ui-design",
          assignedRole: "UI Designer",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 0,
          mtbHourlyRateCop: 140000,
          freelancerHours: 20,
          freelancerHourlyRateCop: 60000, // 1,200,000 COP
        },
        {
          deliverableId: "arch-review",
          assignedRole: "MTB Internal Engineer",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 5,
          mtbHourlyRateCop: 175000, // 875,000 COP
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: mockSettings,
    };

    const result = calculateQuoteV1(input);
    expect(result.freelancerCost).toBe(1200000);
    expect(result.mtbLaborCost).toBe(875000);
    expect(result.directCostTotalCop).toBe(2075000);
  });

  // 3. Multiple deliverables
  it("3. Multiple deliverables — aggregates detailed cost breakdown across multiple items", () => {
    const input: EngineCalculationInput = {
      items: [
        {
          deliverableId: "deliv-a",
          quantity: 2,
          complexity: "standard",
          mtbLaborHours: 5,
          mtbHourlyRateCop: 140000, // 5 * 140k * 2 = 1,400,000
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
        {
          deliverableId: "deliv-b",
          quantity: 3,
          complexity: "standard",
          mtbLaborHours: 0,
          mtbHourlyRateCop: 0,
          freelancerHours: 10,
          freelancerHourlyRateCop: 50000, // 10 * 50k * 3 = 1,500,000
        },
      ],
      settings: mockSettings,
    };

    const result = calculateQuoteV1(input);
    expect(result.items.length).toBe(2);
    expect(result.detailedCostBreakdown.length).toBe(2);
    expect(result.mtbLaborCost).toBe(1400000);
    expect(result.freelancerCost).toBe(1500000);
    expect(result.directCostTotalCop).toBe(2900000);
  });

  // 4. Different seniorities
  it("4. Different seniorities — junior vs senior hourly rates reflect appropriately in cost base", () => {
    const runForSeniority = (rate: number, seniority: SeniorityLevel) =>
      calculateQuoteV1({
        items: [
          {
            deliverableId: "copywriting",
            quantity: 1,
            complexity: "standard",
            seniority,
            mtbLaborHours: 0,
            mtbHourlyRateCop: 0,
            freelancerHours: 10,
            freelancerHourlyRateCop: rate,
          },
        ],
        settings: mockSettings,
      });

    const juniorResult = runForSeniority(25000, "junior");
    const seniorResult = runForSeniority(65000, "senior");

    expect(juniorResult.freelancerCost).toBe(250000);
    expect(seniorResult.freelancerCost).toBe(650000);
    expect(seniorResult.internalCost).toBeGreaterThan(juniorResult.internalCost);
  });

  // 5. Margin calculations
  it("5. Margin calculations — supports Floor (25%), Target (35%), Premium (45%), and custom decimal margins", () => {
    const baseItem: EngineCalculationInput = {
      items: [
        {
          deliverableId: "item",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 10,
          mtbHourlyRateCop: 140000,
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: mockSettings,
    };

    const floorResult = calculateQuoteV1({ ...baseItem, marginTier: "floor" });
    const targetResult = calculateQuoteV1({ ...baseItem, marginTier: "target" });
    const premiumResult = calculateQuoteV1({ ...baseItem, marginTier: "premium" });
    const customResult = calculateQuoteV1({ ...baseItem, marginTier: 0.5 }); // 50% margin

    expect(floorResult.margin).toBe(0.25);
    expect(targetResult.margin).toBe(0.35);
    expect(premiumResult.margin).toBe(0.45);
    expect(customResult.margin).toBe(0.5);

    // Higher margin tier produces higher recommended price for same cost base
    expect(premiumResult.recommendedPrice).toBeGreaterThan(targetResult.recommendedPrice);
    expect(targetResult.recommendedPrice).toBeGreaterThan(floorResult.recommendedPrice);
  });

  // 6. Contingency
  it("6. Contingency — applies Small (10%), Medium (8%), and Large (7%) contingency tiers correctly", () => {
    const baseItem: EngineCalculationInput = {
      items: [
        {
          deliverableId: "item",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 10,
          mtbHourlyRateCop: 100000, // direct cost = 1,000,000 COP
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: mockSettings,
    };

    const smallResult = calculateQuoteV1({ ...baseItem, contingencyTier: "small" }); // 10% = 100,000
    const mediumResult = calculateQuoteV1({ ...baseItem, contingencyTier: "medium" }); // 8% = 80,000
    const largeResult = calculateQuoteV1({ ...baseItem, contingencyTier: "large" }); // 7% = 70,000

    expect(smallResult.contingency).toBe(100000);
    expect(mediumResult.contingency).toBe(80000);
    expect(largeResult.contingency).toBe(70000);
  });

  // 7. Urgency
  it("7. Urgency — applies Normal (1.00), Urgent (1.15), Very Urgent (1.30), and Critical (1.50) urgency multipliers", () => {
    const baseItem: EngineCalculationInput = {
      items: [
        {
          deliverableId: "item",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 10,
          mtbHourlyRateCop: 140000,
          freelancerHours: 10,
          freelancerHourlyRateCop: 100000,
        },
      ],
      settings: mockSettings,
      marginTier: "target",
    };

    const normal = calculateQuoteV1({ ...baseItem, urgency: "normal" });
    const urgent = calculateQuoteV1({ ...baseItem, urgency: "urgent" });
    const critical = calculateQuoteV1({ ...baseItem, urgency: "critical" });

    expect(normal.urgencyAdjustment).toBe(0);
    expect(urgent.recommendedPrice).toBe(Math.round(normal.recommendedPrice * 1.15));
    expect(critical.recommendedPrice).toBe(Math.round(normal.recommendedPrice * 1.5));
  });

  // 8. External costs
  it("8. External costs — remain separate from internal costs and do not automatically apply MTB margin", () => {
    const input: EngineCalculationInput = {
      items: [
        {
          deliverableId: "dev",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 10,
          mtbHourlyRateCop: 140000,
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: mockSettings,
      marginTier: "target",
      externalCosts: [
        {
          description: "AWS Cloud Infrastructure",
          amountCop: 500000,
          applyMargin: false, // Default requirement: no margin applied automatically
        },
        {
          description: "Stock Assets with margin rule",
          amountCop: 130000,
          applyMargin: true, // 130k / (1 - 0.35) = 200,000
        },
      ],
    };

    const result = calculateQuoteV1(input);

    expect(result.externalCost).toBe(500000 + 200000); // 700,000 COP
    expect(result.totalCost).toBe(result.internalCost + result.externalCost);
  });

  // 9. Minimum project value
  it("9. Minimum project value — applies configured minimum project value when calculated price is below floor", () => {
    const input: EngineCalculationInput = {
      items: [
        {
          deliverableId: "small-fix",
          quantity: 1,
          complexity: "basic",
          mtbLaborHours: 1,
          mtbHourlyRateCop: 140000,
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: {
        ...mockSettings,
        min_project_value_cop: 3000000, // 3M COP floor
      },
    };

    const result = calculateQuoteV1(input);

    expect(result.recommendedPrice).toBeLessThan(3000000);
    expect(result.calculatedPrice).toBe(3000000);
    expect(result.metadata.appliedMinProjectValue).toBe(true);
  });

  // 10. Manual adjustment
  it("10. Manual adjustment — supports manual_adjustment and final_price overrides while preserving calculated_price", () => {
    const baseInput: EngineCalculationInput = {
      items: [
        {
          deliverableId: "item",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 20,
          mtbHourlyRateCop: 140000,
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: mockSettings,
    };

    // Case A: Specify manual_adjustment explicitly
    const resultWithAdjustment = calculateQuoteV1({
      ...baseInput,
      manualAdjustmentCop: -500000,
    });
    expect(resultWithAdjustment.manualAdjustment).toBe(-500000);
    expect(resultWithAdjustment.finalPrice).toBe(
      resultWithAdjustment.calculatedPrice - 500000
    );

    // Case B: Specify final_price explicitly
    const resultWithFinalPrice = calculateQuoteV1({
      ...baseInput,
      finalPriceCop: 10000000,
    });
    expect(resultWithFinalPrice.finalPrice).toBe(10000000);
    expect(resultWithFinalPrice.manualAdjustment).toBe(
      10000000 - resultWithFinalPrice.calculatedPrice
    );
    expect(resultWithFinalPrice.calculatedPrice).toBe(
      resultWithAdjustment.calculatedPrice
    );
  });

  // 11. Snapshot generation
  it("11. Snapshot generation — generates complete reproducible pricing snapshot containing all inputs", () => {
    const input: EngineCalculationInput = {
      category: "Bespoke Web Systems",
      service: "Full-Stack Development",
      items: [
        {
          deliverableId: "api-dev",
          quantity: 1,
          complexity: "advanced",
          mtbLaborHours: 15,
          mtbHourlyRateCop: 175000,
          freelancerHours: 20,
          freelancerHourlyRateCop: 120000,
        },
      ],
      settings: mockSettings,
      urgency: "urgent",
      marginTier: "premium",
    };

    const result = calculateQuoteV1(input);

    expect(result.snapshot).toBeDefined();
    expect(result.snapshot.engineVersion).toBe("V1");
    expect(result.snapshot.inputs.category).toBe("Bespoke Web Systems");
    expect(result.snapshot.inputs.marginTier).toBe("premium");
    expect(result.snapshot.settingsSnapshot.id).toBe("test-settings-001");
    expect(result.snapshot.results.recommendedPriceCop).toBe(
      result.recommendedPrice
    );
  });

  // 12. Historical pricing stability
  it("12. Historical pricing stability — stored snapshot preserves exact pricing even if global rates change later", () => {
    // 1. Create original quote at time T0
    const originalInput: EngineCalculationInput = {
      items: [
        {
          deliverableId: "arch-doc",
          quantity: 1,
          complexity: "standard",
          mtbLaborHours: 10,
          mtbHourlyRateCop: 140000,
          freelancerHours: 0,
          freelancerHourlyRateCop: 0,
        },
      ],
      settings: { ...mockSettings, default_margin: 0.35 },
    };

    const originalResult = calculateQuoteV1(originalInput);
    const historicalSnapshot = originalResult.snapshot;

    // 2. Simulate 6 months later: global MTB internal rate increases to 200,000 COP and margin to 45%
    const newFutureSettings: PricingSettings = {
      ...mockSettings,
      default_margin: 0.45,
      mtb_standard_rate_cop: 200000,
    };

    // 3. Recalculating from the historical snapshot's stored inputs and settingsSnapshot reproduces the EXACT same numbers
    const recalculatedHistoricalQuote = calculateQuoteV1({
      ...historicalSnapshot.inputs,
      settings: historicalSnapshot.settingsSnapshot,
    });

    expect(recalculatedHistoricalQuote.recommendedPrice).toBe(
      originalResult.recommendedPrice
    );
    expect(recalculatedHistoricalQuote.internalCost).toBe(
      originalResult.internalCost
    );
    expect(recalculatedHistoricalQuote.margin).toBe(0.35); // Original 35%, not future 45%
  });
});
