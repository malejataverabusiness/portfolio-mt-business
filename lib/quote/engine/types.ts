import "server-only";

// =============================================================================
// MTB Quote V1 — Pricing Engine Types
// =============================================================================
// Internal types used exclusively by the server-side pricing engine.
// NEVER import this file into a client component.

import type { ComplexityLevel, PricingSettings } from "../types";

export interface EngineItemInput {
  deliverableId: string;
  quantity: number;
  complexity: ComplexityLevel;
  mtbLaborHours: number;
  mtbHourlyRateCop: number;
  freelancerHours: number;
  freelancerHourlyRateCop: number;
}

export interface EngineCalculationInput {
  items: EngineItemInput[];
  settings: PricingSettings;
  complexityMultipliers?: Record<ComplexityLevel, number>;
  manualAdjustmentCop?: number;
  externalCostsTotalCop?: number;
}

export interface CalculatedItemResult {
  deliverableId: string;
  quantity: number;
  complexity: ComplexityLevel;
  mtbLaborCostCop: number;
  freelancerCostCop: number;
  directCostCop: number;
  costBaseCop: number;
  recommendedPriceCop: number;
}

export interface CustomerFacingRange {
  lowCop: number;
  highCop: number;
  formattedRange: string;
}

export interface EngineCalculationResult {
  items: CalculatedItemResult[];
  mtbLaborTotalCop: number;
  freelancerCostTotalCop: number;
  directCostTotalCop: number;
  accountMgmtCostCop: number;
  projectMgmtCostCop: number;
  contingencyCostCop: number;
  costBaseCop: number;
  recommendedPriceCop: number;
  calculatedPriceCop: number;
  manualAdjustmentCop: number;
  externalCostsTotalCop: number;
  finalPriceCop: number;
  customerRange: CustomerFacingRange;
  snapshotTimestamp: string;
}
