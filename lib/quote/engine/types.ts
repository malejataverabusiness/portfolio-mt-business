// =============================================================================
// MTB Quote — Pricing Engine Types
// =============================================================================
// Internal types used exclusively by the server-side pricing engine.
// These types should NEVER be imported by client components.

import "server-only";

import type { ComplexityTier, RateCard, PricingRule, MarginProfile } from "../types";

/** Input to the pricing engine for a single line item */
export interface CalculationInput {
  deliverable_id: string;
  deliverable_name: string;
  deliverable_name_es: string;
  service_name: string;
  service_name_es: string;
  quantity: number;
  unit: string;
  unit_es: string;
  complexity: ComplexityTier;
}

/** Output from the pricing engine for a single line item */
export interface CalculationLineResult {
  deliverable_id: string;
  deliverable_name: string;
  deliverable_name_es: string;
  service_name: string;
  service_name_es: string;
  quantity: number;
  unit: string;
  unit_es: string;
  complexity: ComplexityTier;
  /** Base price before rules and margins */
  base_price: number;
  /** Price after pricing rules applied */
  ruled_price_low: number;
  ruled_price_mid: number;
  ruled_price_high: number;
  /** Final price after margins */
  final_price_low: number;
  final_price_mid: number;
  final_price_high: number;
  /** Which pricing rules were applied */
  rules_applied: string[];
}

/** Full calculation result from the pricing engine */
export interface CalculationResult {
  line_items: CalculationLineResult[];
  subtotal_low: number;
  subtotal_mid: number;
  subtotal_high: number;
  total_low: number;
  total_mid: number;
  total_high: number;
  currency: string;
  confidence_score: number;
  /** Factors that reduced confidence */
  confidence_factors: string[];
  /** Pricing data snapshot for immutability */
  pricing_snapshot: {
    rate_cards: Record<string, Pick<RateCard, "base_rate" | "pricing_model" | "currency">>;
    pricing_rules: Pick<PricingRule, "name" | "rule_type" | "config">[];
    margin_profiles: Pick<MarginProfile, "name" | "target_margin_percent">[];
    calculated_at: string;
  };
}

/** Configuration loaded from database for the pricing engine */
export interface PricingEngineConfig {
  rate_cards: RateCard[];
  pricing_rules: PricingRule[];
  margin_profiles: MarginProfile[];
}
