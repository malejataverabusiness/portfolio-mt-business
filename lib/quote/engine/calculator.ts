import "server-only";

// =============================================================================
// MTB Quote V1 — Server-Only Computational Pricing Engine
// =============================================================================
// NEVER import this file into a client component.
// Executes the 5-step mathematical pricing formula:
// 1. Internal MTB Labor vs Freelancer Cost
// 2. Cost Base Calculation (Direct + Account Mgmt + Project Mgmt + Contingency)
// 3. Recommended Price = Cost Base / (1 - Target Margin)
// 4. Manual Overrides & External Costs
// 5. Customer-Facing Range Formatting

import type { ComplexityLevel, PricingSettings } from "../types";
import type {
  EngineItemInput,
  EngineCalculationInput,
  CalculatedItemResult,
  EngineCalculationResult,
} from "./types";
import { generateCustomerFacingRange } from "./formatters";

const DEFAULT_COMPLEXITY_MULTIPLIERS: Record<ComplexityLevel, number> = {
  basic: 0.7,
  standard: 1.0,
  advanced: 1.4,
  enterprise: 2.0,
};

/**
 * Executes the formal MTB Quote V1 mathematical pricing pipeline.
 */
export function calculateQuoteV1(
  input: EngineCalculationInput
): EngineCalculationResult {
  const {
    items,
    settings,
    complexityMultipliers = DEFAULT_COMPLEXITY_MULTIPLIERS,
    manualAdjustmentCop = 0,
    externalCostsTotalCop = 0,
  } = input;

  let mtbLaborTotalCop = 0;
  let freelancerCostTotalCop = 0;

  const itemResults: CalculatedItemResult[] = items.map((item) => {
    const complexityMult = complexityMultipliers[item.complexity] || 1.0;

    // Step 1: Calculate Labor Costs
    const mtbLaborCostCop =
      item.mtbLaborHours * item.mtbHourlyRateCop * item.quantity * complexityMult;
    const freelancerCostCop =
      item.freelancerHours *
      item.freelancerHourlyRateCop *
      item.quantity *
      complexityMult;

    const directCostCop = mtbLaborCostCop + freelancerCostCop;

    // Step 2: Apply item-level overhead and contingency
    const accountMgmt = directCostCop * settings.account_mgmt_rate;
    const projectMgmt = directCostCop * settings.project_mgmt_rate;
    const contingency = directCostCop * settings.default_contingency;

    const costBaseCop = directCostCop + accountMgmt + projectMgmt + contingency;

    // Step 3: Margin Formula: Recommended Price = Cost Base / (1 - Margin)
    const marginDivisor = Math.max(0.01, 1 - settings.default_margin);
    const recommendedPriceCop = costBaseCop / marginDivisor;

    mtbLaborTotalCop += mtbLaborCostCop;
    freelancerCostTotalCop += freelancerCostCop;

    return {
      deliverableId: item.deliverableId,
      quantity: item.quantity,
      complexity: item.complexity,
      mtbLaborCostCop: Math.round(mtbLaborCostCop),
      freelancerCostCop: Math.round(freelancerCostCop),
      directCostCop: Math.round(directCostCop),
      costBaseCop: Math.round(costBaseCop),
      recommendedPriceCop: Math.round(recommendedPriceCop),
    };
  });

  // Aggregate Direct Cost
  const directCostTotalCop = mtbLaborTotalCop + freelancerCostTotalCop;

  // Aggregate Overhead & Contingency
  const accountMgmtCostCop = directCostTotalCop * settings.account_mgmt_rate;
  const projectMgmtCostCop = directCostTotalCop * settings.project_mgmt_rate;
  const contingencyCostCop = directCostTotalCop * settings.default_contingency;

  // Step 2: Aggregate Cost Base
  const costBaseCop =
    directCostTotalCop +
    accountMgmtCostCop +
    projectMgmtCostCop +
    contingencyCostCop;

  // Step 3: Recommended Price Formula: Cost Base / (1 - Target Margin)
  const marginDivisor = Math.max(0.01, 1 - settings.default_margin);
  let recommendedPriceCop = costBaseCop / marginDivisor;

  // Ensure minimum project value threshold is met
  if (recommendedPriceCop < settings.min_project_value_cop) {
    recommendedPriceCop = settings.min_project_value_cop;
  }

  const calculatedPriceCop = Math.round(recommendedPriceCop);

  // Step 4: Final Price (with manual override and external costs)
  const finalPriceCop =
    calculatedPriceCop + manualAdjustmentCop + externalCostsTotalCop;

  // Step 5: Customer-facing estimate range
  const customerRange = generateCustomerFacingRange(calculatedPriceCop);

  return {
    items: itemResults,
    mtbLaborTotalCop: Math.round(mtbLaborTotalCop),
    freelancerCostTotalCop: Math.round(freelancerCostTotalCop),
    directCostTotalCop: Math.round(directCostTotalCop),
    accountMgmtCostCop: Math.round(accountMgmtCostCop),
    projectMgmtCostCop: Math.round(projectMgmtCostCop),
    contingencyCostCop: Math.round(contingencyCostCop),
    costBaseCop: Math.round(costBaseCop),
    recommendedPriceCop: Math.round(recommendedPriceCop),
    calculatedPriceCop,
    manualAdjustmentCop,
    externalCostsTotalCop,
    finalPriceCop,
    customerRange,
    snapshotTimestamp: new Date().toISOString(),
  };
}
