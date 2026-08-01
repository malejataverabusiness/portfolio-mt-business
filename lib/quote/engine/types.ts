import "server-only";

// =============================================================================
// MTB Quote V1 — Pricing Engine Types (Phase 4)
// =============================================================================
// Authoritative server-side pricing engine interfaces.
// NEVER import this file into a client component.

import type { ComplexityLevel, PricingSettings } from "../types";

export type SeniorityLevel =
  | "junior"
  | "mid"
  | "senior"
  | "standard"
  | "advanced"
  | "expert";

export type MarginTier = "floor" | "target" | "premium" | number;
export type ContingencyTier = "small" | "medium" | "large" | number;
export type UrgencyTier =
  | "normal"
  | "urgent"
  | "very_urgent"
  | "critical"
  | number;

export interface EngineItemInput {
  deliverableId: string;
  quantity: number;
  complexity: ComplexityLevel;
  seniority?: SeniorityLevel;
  assignedRole?: string;
  estimatedHours?: number;
  mtbLaborHours: number;
  mtbHourlyRateCop: number;
  freelancerHours: number;
  freelancerHourlyRateCop: number;
  accountMgmtHours?: number;
  projectMgmtHours?: number;
}

export interface ExternalCostItem {
  description: string;
  amountCop: number;
  applyMargin?: boolean; // Default false unless explicit pricing rule says so
}

export interface EngineCalculationInput {
  category?: string;
  service?: string;
  items: EngineItemInput[];
  settings: PricingSettings;
  complexityMultipliers?: Record<ComplexityLevel, number>;
  projectSize?: string;
  urgency?: UrgencyTier;
  marginTier?: MarginTier;
  contingencyTier?: ContingencyTier;
  externalCosts?: ExternalCostItem[];
  externalCostsTotalCop?: number;
  manualAdjustmentCop?: number;
  finalPriceCop?: number;
  useManagementHourlyRates?: boolean; // When true, uses 70k/80k COP/hour rates
}

export interface CalculatedItemResult {
  deliverableId: string;
  quantity: number;
  complexity: ComplexityLevel;
  seniority?: SeniorityLevel;
  assignedRole?: string;
  mtbLaborCostCop: number;
  freelancerCostCop: number;
  directCostCop: number;
  accountMgmtCostCop: number;
  projectMgmtCostCop: number;
  contingencyCostCop: number;
  costBaseCop: number;
  recommendedPriceCop: number;
}

export interface CustomerFacingRange {
  lowCop: number;
  highCop: number;
  formattedRange: string;
}

export interface CalculationMetadata {
  engineVersion: "V1";
  appliedMinProjectValue: boolean;
  marginRate: number;
  contingencyRate: number;
  urgencyMultiplier: number;
  accountMgmtRateCop: number;
  projectMgmtRateCop: number;
  mtbLaborPercentage: number;
  freelancerPercentage: number;
  overheadPercentage: number;
  externalPercentage: number;
}

export interface PricingSnapshot {
  engineVersion: "V1";
  timestamp: string;
  inputs: EngineCalculationInput;
  settingsSnapshot: PricingSettings;
  results: {
    internalCostBaseCop: number;
    recommendedPriceCop: number;
    externalCostsTotalCop: number;
    manualAdjustmentCop: number;
    finalPriceCop: number;
    effectiveMargin: number;
  };
}

export interface EngineCalculationResult {
  // Detailed items & alias
  items: CalculatedItemResult[];
  detailedCostBreakdown: CalculatedItemResult[];

  // Internal costs
  mtbLaborTotalCop: number;
  mtbLaborCost: number;
  freelancerCostTotalCop: number;
  freelancerCost: number;
  directCostTotalCop: number;
  accountMgmtCostCop: number;
  accountManagementCost: number;
  projectMgmtCostCop: number;
  projectManagementCost: number;
  contingencyCostCop: number;
  contingency: number;

  // Cost base (internal cost)
  costBaseCop: number;
  internalCost: number;

  // External costs
  externalCostsTotalCop: number;
  externalCost: number;

  // Total cost
  totalCostCop: number;
  totalCost: number;

  // Pricing outputs
  margin: number;
  effectiveMargin: number;
  recommendedPriceCop: number;
  recommendedPrice: number;
  calculatedPriceCop: number;
  calculatedPrice: number;
  urgencyAdjustmentCop: number;
  urgencyAdjustment: number;
  manualAdjustmentCop: number;
  manualAdjustment: number;
  finalPriceCop: number;
  finalPrice: number;

  // Presentation & Audit
  customerRange: CustomerFacingRange;
  metadata: CalculationMetadata;
  snapshot: PricingSnapshot;
  snapshotTimestamp: string;
}
