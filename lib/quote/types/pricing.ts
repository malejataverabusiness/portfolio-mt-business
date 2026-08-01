// =============================================================================
// MTB Quote V1 — Pricing & Configuration Domain Types
// =============================================================================

export interface PricingSettings {
  id: string;
  default_margin: number; // e.g. 0.3500 (35%)
  default_contingency: number; // e.g. 0.1000 (10%)
  account_mgmt_rate: number; // e.g. 0.1000 (10%)
  project_mgmt_rate: number; // e.g. 0.1000 (10%)
  min_project_value_cop: number; // e.g. 3000000 (3M COP)
  // Management Hourly Rates (COP/hour)
  account_mgmt_rate_cop?: number; // default 70000
  project_mgmt_rate_cop?: number; // default 80000
  // MTB Internal Rates (COP/hour)
  mtb_standard_rate_cop?: number; // Floor 140,000
  mtb_advanced_rate_cop?: number; // 175,000
  mtb_expert_rate_cop?: number;   // 200,000
  // Margins
  margin_floor?: number;   // 0.25
  margin_target?: number;  // 0.35
  margin_premium?: number; // 0.45
  // Contingency
  contingency_small?: number;  // 0.10
  contingency_medium?: number; // 0.08
  contingency_large?: number;  // 0.07
  // Urgency
  urgency_normal?: number;      // 1.00
  urgency_urgent?: number;      // 1.15
  urgency_very_urgent?: number; // 1.30
  urgency_critical?: number;    // 1.50
  // Other Settings
  consulting_min_cop?: number;  // 280,000
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
