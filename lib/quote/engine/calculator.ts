import "server-only";

// =============================================================================
// MTB Quote V1 — Server-Only Computational Pricing Engine (Phase 4)
// =============================================================================
// NEVER import this file into a client component.
// Executes the authoritative MTB Quote V1 mathematical pricing formula:
//
// 1. Internal Labor = Freelancer Costs + MTB Labor
// 2. Internal Cost Base = Internal Labor + Account Mgmt + Project Mgmt + Contingency
// 3. Recommended Price = (Internal Cost Base / (1 - Margin)) * Urgency + External Costs
// 4. Minimum Project Value Threshold check -> Calculated Price
// 5. Manual Adjustment / Final Price override
// 6. Customer-Facing Range & Complete Historical Snapshot Generation
// =============================================================================

import type { ComplexityLevel, PricingSettings } from "../types";
import type {
  EngineItemInput,
  EngineCalculationInput,
  CalculatedItemResult,
  EngineCalculationResult,
  CalculationMetadata,
  PricingSnapshot,
  MarginTier,
  ContingencyTier,
  UrgencyTier,
} from "./types";
import { generateCustomerFacingRange } from "./formatters";

const DEFAULT_COMPLEXITY_MULTIPLIERS: Record<ComplexityLevel, number> = {
  basic: 0.7,
  standard: 1.0,
  advanced: 1.4,
  enterprise: 2.0,
};

/**
 * Resolves the numeric margin percentage based on string tier or number.
 */
function resolveMarginRate(
  tier: MarginTier | undefined,
  settings: PricingSettings
): number {
  if (typeof tier === "number") return tier;
  if (tier === "floor") return settings.margin_floor ?? 0.25;
  if (tier === "target") return settings.margin_target ?? 0.35;
  if (tier === "premium") return settings.margin_premium ?? 0.45;
  return settings.default_margin || 0.35;
}

/**
 * Resolves the numeric contingency percentage based on string tier or number.
 */
function resolveContingencyRate(
  tier: ContingencyTier | undefined,
  settings: PricingSettings
): number {
  if (typeof tier === "number") return tier;
  if (tier === "small") return settings.contingency_small ?? 0.1;
  if (tier === "medium") return settings.contingency_medium ?? 0.08;
  if (tier === "large") return settings.contingency_large ?? 0.07;
  return settings.default_contingency || 0.1;
}

/**
 * Resolves the urgency multiplier based on string tier or number.
 */
function resolveUrgencyMultiplier(
  urgency: UrgencyTier | undefined,
  settings: PricingSettings
): number {
  if (typeof urgency === "number") return urgency;
  if (urgency === "normal") return settings.urgency_normal ?? 1.0;
  if (urgency === "urgent") return settings.urgency_urgent ?? 1.15;
  if (urgency === "very_urgent") return settings.urgency_very_urgent ?? 1.3;
  if (urgency === "critical") return settings.urgency_critical ?? 1.5;
  return settings.urgency_normal ?? 1.0;
}

/**
 * Executes the authoritative MTB Quote V1 mathematical pricing pipeline.
 */
export function calculateQuoteV1(
  input: EngineCalculationInput
): EngineCalculationResult {
  const {
    items,
    settings,
    complexityMultipliers = DEFAULT_COMPLEXITY_MULTIPLIERS,
  } = input;

  // 1. Resolve configurable tier values
  const marginRate = resolveMarginRate(input.marginTier, settings);
  const contingencyRate = resolveContingencyRate(input.contingencyTier, settings);
  const urgencyMultiplier = resolveUrgencyMultiplier(input.urgency, settings);

  const accountMgmtRateCop = settings.account_mgmt_rate_cop ?? 70000;
  const projectMgmtRateCop = settings.project_mgmt_rate_cop ?? 80000;

  let mtbLaborTotalCop = 0;
  let freelancerCostTotalCop = 0;
  let accountMgmtTotalCop = 0;
  let projectMgmtTotalCop = 0;
  let contingencyTotalCop = 0;

  const marginDivisor = Math.max(0.01, 1 - marginRate);

  // 2. Calculate item-level costs
  const itemResults: CalculatedItemResult[] = items.map((item) => {
    const complexityMult = complexityMultipliers[item.complexity] || 1.0;

    const mtbLaborCostCop =
      item.mtbLaborHours * item.mtbHourlyRateCop * item.quantity * complexityMult;
    const freelancerCostCop =
      item.freelancerHours *
      item.freelancerHourlyRateCop *
      item.quantity *
      complexityMult;

    const directCostCop = mtbLaborCostCop + freelancerCostCop;

    // Determine Account Management & Project Management cost for this item
    let accountMgmtCostCop = 0;
    let projectMgmtCostCop = 0;

    if (item.accountMgmtHours !== undefined) {
      accountMgmtCostCop = item.accountMgmtHours * accountMgmtRateCop;
    } else if (input.useManagementHourlyRates) {
      const totalLaborHours =
        (item.mtbLaborHours + item.freelancerHours) * item.quantity * complexityMult;
      accountMgmtCostCop =
        totalLaborHours * settings.account_mgmt_rate * accountMgmtRateCop;
    } else {
      accountMgmtCostCop = directCostCop * settings.account_mgmt_rate;
    }

    if (item.projectMgmtHours !== undefined) {
      projectMgmtCostCop = item.projectMgmtHours * projectMgmtRateCop;
    } else if (input.useManagementHourlyRates) {
      const totalLaborHours =
        (item.mtbLaborHours + item.freelancerHours) * item.quantity * complexityMult;
      projectMgmtCostCop =
        totalLaborHours * settings.project_mgmt_rate * projectMgmtRateCop;
    } else {
      projectMgmtCostCop = directCostCop * settings.project_mgmt_rate;
    }

    const contingencyCostCop = directCostCop * contingencyRate;
    const costBaseCop =
      directCostCop +
      accountMgmtCostCop +
      projectMgmtCostCop +
      contingencyCostCop;

    const itemRecommendedPriceCop = costBaseCop / marginDivisor;

    mtbLaborTotalCop += mtbLaborCostCop;
    freelancerCostTotalCop += freelancerCostCop;
    accountMgmtTotalCop += accountMgmtCostCop;
    projectMgmtTotalCop += projectMgmtCostCop;
    contingencyTotalCop += contingencyCostCop;

    return {
      deliverableId: item.deliverableId,
      quantity: item.quantity,
      complexity: item.complexity,
      seniority: item.seniority,
      assignedRole: item.assignedRole,
      mtbLaborCostCop: Math.round(mtbLaborCostCop),
      freelancerCostCop: Math.round(freelancerCostCop),
      directCostCop: Math.round(directCostCop),
      accountMgmtCostCop: Math.round(accountMgmtCostCop),
      projectMgmtCostCop: Math.round(projectMgmtCostCop),
      contingencyCostCop: Math.round(contingencyCostCop),
      costBaseCop: Math.round(costBaseCop),
      recommendedPriceCop: Math.round(itemRecommendedPriceCop),
    };
  });

  // 3. Aggregate Internal Cost Base
  const directCostTotalCop = Math.round(mtbLaborTotalCop + freelancerCostTotalCop);
  const accountMgmtCostCop = Math.round(accountMgmtTotalCop);
  const projectMgmtCostCop = Math.round(projectMgmtTotalCop);
  const contingencyCostCop = Math.round(contingencyTotalCop);

  const internalCostBaseCop =
    directCostTotalCop +
    accountMgmtCostCop +
    projectMgmtCostCop +
    contingencyCostCop;

  // 4. Calculate Internal Recommended Price & Urgency Adjustment
  const internalBaseBeforeUrgency = internalCostBaseCop / marginDivisor;
  const internalBaseWithUrgency = internalBaseBeforeUrgency * urgencyMultiplier;
  const urgencyAdjustmentCop = Math.round(
    internalBaseWithUrgency - internalBaseBeforeUrgency
  );

  // 5. Calculate External Costs
  // Per requirement: "Do not automatically apply MTB margin to external costs unless an explicit pricing rule says so."
  let externalCostsTotalCop = 0;
  if (input.externalCosts && input.externalCosts.length > 0) {
    externalCostsTotalCop = input.externalCosts.reduce((acc, ext) => {
      if (ext.applyMargin) {
        return acc + ext.amountCop / marginDivisor;
      }
      return acc + ext.amountCop;
    }, 0);
  } else if (input.externalCostsTotalCop !== undefined) {
    externalCostsTotalCop = input.externalCostsTotalCop;
  }
  externalCostsTotalCop = Math.round(externalCostsTotalCop);

  // Recommended Price = Internal Recommended (with Urgency) + External Costs
  const recommendedPriceCop = Math.round(
    internalBaseWithUrgency + externalCostsTotalCop
  );

  // 6. Check Minimum Project Value Threshold
  let calculatedPriceCop = recommendedPriceCop;
  let appliedMinProjectValue = false;
  const minThresholdCop = settings.min_project_value_cop || 0;

  if (calculatedPriceCop < minThresholdCop) {
    calculatedPriceCop = Math.round(minThresholdCop);
    appliedMinProjectValue = true;
  }

  // 7. Manual Adjustment & Final Price
  let manualAdjustmentCop = 0;
  let finalPriceCop = calculatedPriceCop;

  if (input.finalPriceCop !== undefined) {
    finalPriceCop = Math.round(input.finalPriceCop);
    manualAdjustmentCop = Math.round(finalPriceCop - calculatedPriceCop);
  } else if (input.manualAdjustmentCop !== undefined) {
    manualAdjustmentCop = Math.round(input.manualAdjustmentCop);
    finalPriceCop = calculatedPriceCop + manualAdjustmentCop;
  }

  // 8. Total Cost & Effective Margin
  const totalCostCop = internalCostBaseCop + externalCostsTotalCop;
  const effectiveMargin =
    finalPriceCop > 0 ? (finalPriceCop - totalCostCop) / finalPriceCop : 0;

  // 9. Customer-Facing Range
  const customerRange = generateCustomerFacingRange(calculatedPriceCop);

  const timestamp = new Date().toISOString();

  const metadata: CalculationMetadata = {
    engineVersion: "V1",
    appliedMinProjectValue,
    marginRate,
    contingencyRate,
    urgencyMultiplier,
    accountMgmtRateCop,
    projectMgmtRateCop,
    mtbLaborPercentage:
      totalCostCop > 0 ? Math.round(mtbLaborTotalCop) / totalCostCop : 0,
    freelancerPercentage:
      totalCostCop > 0 ? Math.round(freelancerCostTotalCop) / totalCostCop : 0,
    overheadPercentage:
      totalCostCop > 0
        ? (accountMgmtCostCop + projectMgmtCostCop + contingencyCostCop) /
          totalCostCop
        : 0,
    externalPercentage:
      totalCostCop > 0 ? externalCostsTotalCop / totalCostCop : 0,
  };

  const snapshot: PricingSnapshot = {
    engineVersion: "V1",
    timestamp,
    inputs: input,
    settingsSnapshot: { ...settings },
    results: {
      internalCostBaseCop,
      recommendedPriceCop,
      externalCostsTotalCop,
      manualAdjustmentCop,
      finalPriceCop,
      effectiveMargin,
    },
  };

  return {
    items: itemResults,
    detailedCostBreakdown: itemResults,

    mtbLaborTotalCop: Math.round(mtbLaborTotalCop),
    mtbLaborCost: Math.round(mtbLaborTotalCop),

    freelancerCostTotalCop: Math.round(freelancerCostTotalCop),
    freelancerCost: Math.round(freelancerCostTotalCop),

    directCostTotalCop,

    accountMgmtCostCop,
    accountManagementCost: accountMgmtCostCop,

    projectMgmtCostCop,
    projectManagementCost: projectMgmtCostCop,

    contingencyCostCop,
    contingency: contingencyCostCop,

    costBaseCop: internalCostBaseCop,
    internalCost: internalCostBaseCop,

    externalCostsTotalCop,
    externalCost: externalCostsTotalCop,

    totalCostCop,
    totalCost: totalCostCop,

    margin: marginRate,
    effectiveMargin,

    recommendedPriceCop,
    recommendedPrice: recommendedPriceCop,

    calculatedPriceCop,
    calculatedPrice: calculatedPriceCop,

    urgencyAdjustmentCop,
    urgencyAdjustment: urgencyAdjustmentCop,

    manualAdjustmentCop,
    manualAdjustment: manualAdjustmentCop,

    finalPriceCop,
    finalPrice: finalPriceCop,

    customerRange,
    metadata,
    snapshot,
    snapshotTimestamp: timestamp,
  };
}
