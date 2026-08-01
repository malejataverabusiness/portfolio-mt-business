// =============================================================================
// MTB Quote — Quote Domain Types
// =============================================================================

import type { ComplexityTier } from "./pricing";

/** Status of a quote through its lifecycle */
export type QuoteStatus =
  | "draft"        // Submitted by public user, not yet reviewed
  | "under_review" // Admin is reviewing
  | "adjusted"     // Admin has made adjustments
  | "approved"     // Admin approved final version
  | "sent"         // Proposal sent to client
  | "accepted"     // Client accepted
  | "declined"     // Client declined
  | "expired";     // Quote validity period passed

/** Information about the client requesting a quote */
export interface QuoteClientInfo {
  name: string;
  email: string;
  company: string;
  phone?: string;
  /** How they found MTB Labs */
  referral_source?: string;
}

/** A single line item in a quote */
export interface QuoteLineItem {
  id: string;
  quote_id: string;
  deliverable_id: string;
  /** Snapshot of deliverable name at time of quote */
  deliverable_name: string;
  deliverable_name_es: string;
  /** Service name for grouping */
  service_name: string;
  service_name_es: string;
  quantity: number;
  unit: string;
  unit_es: string;
  /** The complexity tier selected for this line item */
  complexity: ComplexityTier;
  /** Calculated prices (server-generated) */
  price_low: number;
  price_mid: number;
  price_high: number;
  /** Admin-adjusted price (null = use calculated) */
  adjusted_price: number | null;
  notes: string;
  display_order: number;
  created_at: string;
}

/** The master quote record */
export interface Quote {
  id: string;
  /** Short human-readable reference (e.g., "MTB-Q-2026-0042") */
  reference_number: string;
  status: QuoteStatus;
  client_info: QuoteClientInfo;
  /** Overall project complexity/scope description from client */
  project_description: string;
  /** Desired timeline in days (null = flexible) */
  timeline_days: number | null;
  /** Currency for all prices */
  currency: string;
  /** Aggregated totals */
  total_low: number;
  total_mid: number;
  total_high: number;
  /** Admin-adjusted total (null = use calculated) */
  adjusted_total: number | null;
  /** Confidence score: 0–100. Lower when client input is incomplete */
  confidence_score: number;
  /** Admin notes (internal, never shown to client) */
  admin_notes: string;
  /** Validity period in days from creation */
  valid_for_days: number;
  /** Language preference of the client */
  language: "en" | "es";
  created_at: string;
  updated_at: string;
  expires_at: string;
}

/** Immutable snapshot of pricing data at the time of quote creation */
export interface QuoteSnapshot {
  id: string;
  quote_id: string;
  /** Complete JSON of all rate cards, rules, and margins used */
  pricing_data: {
    rate_cards: Record<string, { base_rate: number; pricing_model: string; currency: string }>;
    pricing_rules: { name: string; rule_type: string; config: unknown }[];
    margin_profiles: { name: string; target_margin_percent: number }[];
    calculated_at: string;
  };
  created_at: string;
}

/** A revision record tracking admin changes to a quote */
export interface QuoteRevision {
  id: string;
  quote_id: string;
  admin_user_id: string;
  /** What changed */
  change_type: "status_change" | "price_adjustment" | "line_item_change" | "notes_update";
  /** Previous value (JSON) */
  previous_value: unknown;
  /** New value (JSON) */
  new_value: unknown;
  reason: string;
  created_at: string;
}

/** Audit log entry for admin actions */
export interface AuditLogEntry {
  id: string;
  admin_user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  details: unknown;
  ip_address: string;
  created_at: string;
}

// ---------------------------------------------------------------------------
// Public-facing types (safe to send to the browser)
// ---------------------------------------------------------------------------

/** The result shown to the public user after submitting a quote */
export interface PublicQuoteResult {
  id: string;
  reference_number: string;
  status: QuoteStatus;
  client_name: string;
  project_description: string;
  currency: string;
  /** Only low and high — mid is internal */
  estimate_low: number;
  estimate_high: number;
  /** Human-readable confidence label */
  confidence_label: "approximate" | "estimated" | "detailed";
  line_items: PublicLineItem[];
  valid_until: string;
  created_at: string;
}

/** Public-safe line item (no internal pricing details) */
export interface PublicLineItem {
  deliverable_name: string;
  service_name: string;
  quantity: number;
  unit: string;
  price_low: number;
  price_high: number;
}

// ---------------------------------------------------------------------------
// Form input types (what the public quoter form sends)
// ---------------------------------------------------------------------------

/** A single item selected in the public quoter */
export interface QuoteFormItem {
  deliverable_id: string;
  quantity: number;
  complexity: ComplexityTier;
  notes: string;
}

/** The full payload from the public quoter form */
export interface QuoteFormPayload {
  client_info: QuoteClientInfo;
  project_description: string;
  timeline_days: number | null;
  items: QuoteFormItem[];
  language: "en" | "es";
}

// ---------------------------------------------------------------------------
// Insert/Update variants
// ---------------------------------------------------------------------------

export type QuoteInsert = Omit<Quote, "id" | "reference_number" | "total_low" | "total_mid" | "total_high" | "confidence_score" | "created_at" | "updated_at" | "expires_at">;
export type QuoteUpdate = Partial<Omit<Quote, "id" | "reference_number" | "created_at">> & { id: string };
