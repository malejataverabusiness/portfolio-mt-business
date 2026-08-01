// =============================================================================
// MTB Quote — Pricing Configuration Types
// =============================================================================

/** A rate card defining the base price for a deliverable */
export interface RateCard {
  id: string;
  deliverable_id: string;
  /** Base rate in the configured currency */
  base_rate: number;
  /** Pricing model: "fixed" per unit or "hourly" */
  pricing_model: "fixed" | "hourly";
  /** Estimated hours if pricing_model is "fixed" (used for range calculations) */
  estimated_hours_low: number;
  estimated_hours_high: number;
  /** Currency code (e.g., "USD", "COP") */
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Complexity tier multiplier.
 * Applied based on user-selected complexity during quote creation.
 */
export type ComplexityTier = "basic" | "standard" | "advanced" | "enterprise";

/** A pricing rule that modifies the base rate */
export interface PricingRule {
  id: string;
  name: string;
  name_es: string;
  description: string;
  description_es: string;
  /** Type of rule */
  rule_type: "complexity_multiplier" | "volume_discount" | "urgency_surcharge" | "bundle_discount";
  /** JSON configuration for the rule */
  config: PricingRuleConfig;
  /** Higher priority rules are applied first */
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Discriminated union for pricing rule configurations */
export type PricingRuleConfig =
  | ComplexityMultiplierConfig
  | VolumeDiscountConfig
  | UrgencySurchargeConfig
  | BundleDiscountConfig;

export interface ComplexityMultiplierConfig {
  type: "complexity_multiplier";
  multipliers: Record<ComplexityTier, number>;
  // e.g., { basic: 0.7, standard: 1.0, advanced: 1.4, enterprise: 2.0 }
}

export interface VolumeDiscountConfig {
  type: "volume_discount";
  /** Discount tiers based on total line item count */
  tiers: { min_items: number; discount_percent: number }[];
}

export interface UrgencySurchargeConfig {
  type: "urgency_surcharge";
  /** Surcharge based on days until deadline */
  tiers: { max_days: number; surcharge_percent: number }[];
}

export interface BundleDiscountConfig {
  type: "bundle_discount";
  /** Discount when specific service combinations are selected */
  required_service_ids: string[];
  discount_percent: number;
}

/** Margin profile applied to the final calculation */
export interface MarginProfile {
  id: string;
  name: string;
  /** Minimum margin percentage */
  min_margin_percent: number;
  /** Target margin percentage */
  target_margin_percent: number;
  /** Maximum margin percentage */
  max_margin_percent: number;
  /** Which services this margin applies to (null = all) */
  service_ids: string[] | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Insert/Update variants */
export type RateCardInsert = Omit<RateCard, "id" | "created_at" | "updated_at">;
export type RateCardUpdate = Partial<Omit<RateCard, "id">> & { id: string };
export type PricingRuleInsert = Omit<PricingRule, "id" | "created_at" | "updated_at">;
export type PricingRuleUpdate = Partial<Omit<PricingRule, "id">> & { id: string };
export type MarginProfileInsert = Omit<MarginProfile, "id" | "created_at" | "updated_at">;
export type MarginProfileUpdate = Partial<Omit<MarginProfile, "id">> & { id: string };
