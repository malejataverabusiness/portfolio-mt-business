// =============================================================================
// MTB Quote V1 — Quote Domain Types
// =============================================================================

import type { Service, Deliverable } from "./service";

export type QuoteStatus =
  | "draft"
  | "under_review"
  | "adjusted"
  | "approved"
  | "sent"
  | "accepted"
  | "declined"
  | "expired";

export type ComplexityLevel = "basic" | "standard" | "advanced" | "enterprise";

export interface QuoteItem {
  id: string;
  quote_id: string;
  deliverable_id: string;
  quantity: number;
  complexity: ComplexityLevel;
  calculated_cost: number; // COP
  recommended_price: number; // COP
  adjusted_price?: number | null; // COP override
  created_at?: string;
  deliverable?: Deliverable;
}

export interface Quote {
  id: string;
  reference_number: string;
  client_id?: string | null;
  status: QuoteStatus;
  currency: "COP";
  cost_base: number; // Direct + Account Mgmt + Project Mgmt + Contingency (COP)
  recommended_price: number; // Cost Base / (1 - Target Margin) (COP)
  calculated_price: number; // COP
  manual_adjustment: number; // COP
  external_costs_total: number; // COP (travel, licenses, etc.)
  final_price: number; // calculated_price + manual_adjustment + external_costs_total (COP)
  valid_for_days: number;
  notes?: string | null;
  internal_notes?: string | null;
  created_at: string;
  updated_at: string;
  items?: QuoteItem[];
}

export interface QuoteOverrideInput {
  manual_adjustment?: number;
  external_costs_total?: number;
  notes?: string;
  internal_notes?: string;
}

export interface PublicQuoteInputItem {
  deliverable_id: string;
  quantity: number;
  complexity: ComplexityLevel;
}

export interface PublicQuoteInput {
  client_name?: string;
  client_email?: string;
  client_company?: string;
  client_phone?: string;
  items: PublicQuoteInputItem[];
  notes?: string;
}

export interface PublicQuoteResult {
  quote_id: string;
  reference_number: string;
  currency: "COP";
  low_estimate_cop: number; // e.g. 6000000
  high_estimate_cop: number; // e.g. 6800000
  formatted_range: string; // e.g. "$6.0M – $6.8M COP"
  valid_until: string;
}
