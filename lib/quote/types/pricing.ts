// =============================================================================
// MTB Quote V1 — Pricing & Configuration Domain Types
// =============================================================================

export interface PricingSettings {
  id: string;
  default_margin: number; // e.g. 0.3000 (30%)
  default_contingency: number; // e.g. 0.1000 (10%)
  account_mgmt_rate: number; // e.g. 0.1000 (10%)
  project_mgmt_rate: number; // e.g. 0.1000 (10%)
  min_project_value_cop: number; // e.g. 3000000 (3M COP)
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceComponent {
  id: string;
  deliverable_id: string;
  role_id: string;
  estimated_hours: number;
  is_mtb_labor: boolean;
  created_at: string;
  updated_at: string;
}

export type RuleType =
  | "complexity_multiplier"
  | "volume_discount"
  | "urgency_surcharge"
  | "custom_adjustment";

export interface ComplexityMultiplierConfig {
  type: "complexity_multiplier";
  multipliers: {
    basic: number;
    standard: number;
    advanced: number;
    enterprise: number;
  };
}

export interface VolumeDiscountConfig {
  type: "volume_discount";
  tiers: {
    min_items: number;
    discount_percent: number;
  }[];
}

export interface UrgencySurchargeConfig {
  type: "urgency_surcharge";
  surcharges: {
    rush_weeks: number;
    surcharge_percent: number;
  }[];
}

export type PricingRuleConfig =
  | ComplexityMultiplierConfig
  | VolumeDiscountConfig
  | UrgencySurchargeConfig
  | Record<string, unknown>;

export interface PricingRule {
  id: string;
  name: string;
  name_es: string;
  description: string;
  description_es: string;
  rule_type: RuleType;
  config: PricingRuleConfig;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MarginProfile {
  id: string;
  name: string;
  name_es: string;
  target_margin_pct: number;
  min_margin_pct: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  referral_source?: string;
  created_at: string;
  updated_at: string;
}
