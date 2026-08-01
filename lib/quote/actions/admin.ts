"use server";

// =============================================================================
// MTB Quote V1 — Admin Server Actions
// =============================================================================
// Authenticated actions for administrators to inspect quotes, apply manual
// overrides, update COP hourly rates, and manage global margin settings.

import { createClient } from "../supabase/server";
import type {
  QuoteStatus,
  QuoteOverrideInput,
  PricingSettings,
} from "../types";

/**
 * Retrieves full financial details for an admin quote inspection.
 */
export async function getAdminQuoteDetails(quoteId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select(
      `
      *,
      clients (*),
      quote_items (*)
    `
    )
    .eq("id", quoteId)
    .single();

  if (error || !data) {
    throw new Error(`Failed to load quote details: ${error?.message || "Unknown error"}`);
  }

  return data;
}

/**
 * Overrides quote pricing (manual adjustments or external costs) while
 * preserving the calculated_price as required by MTB Quote V1 architecture.
 */
export async function overrideQuotePricing(
  quoteId: string,
  overrides: QuoteOverrideInput
) {
  const supabase = await createClient();

  // 1. Fetch current quote
  const { data: currentQuote, error: fetchErr } = await supabase
    .from("quotes")
    .select("calculated_price, manual_adjustment, external_costs_total, status")
    .eq("id", quoteId)
    .single();

  if (fetchErr || !currentQuote) {
    throw new Error("Quote not found");
  }

  const manualAdjustment =
    overrides.manual_adjustment ?? currentQuote.manual_adjustment;
  const externalCostsTotal =
    overrides.external_costs_total ?? currentQuote.external_costs_total;

  // Final Price = calculated_price + manual_adjustment + external_costs_total
  const finalPrice =
    currentQuote.calculated_price + manualAdjustment + externalCostsTotal;

  // 2. Update quote
  const { data, error } = await supabase
    .from("quotes")
    .update({
      manual_adjustment: manualAdjustment,
      external_costs_total: externalCostsTotal,
      final_price: finalPrice,
      status: currentQuote.status === "draft" ? "adjusted" : currentQuote.status,
      notes: overrides.notes,
      internal_notes: overrides.internal_notes,
    })
    .eq("id", quoteId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update override pricing: ${error.message}`);
  }

  return data;
}

/**
 * Transitions a quote through its lifecycle states.
 */
export async function updateQuoteStatus(quoteId: string, status: QuoteStatus) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .update({ status })
    .eq("id", quoteId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update quote status: ${error.message}`);
  }

  return data;
}

/**
 * Updates hourly billing rate for a role in COP without altering existing quotes.
 */
export async function updateRoleRate(roleId: string, hourlyRateCop: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("role_rates")
    .insert({
      role_id: roleId,
      hourly_rate_cop: hourlyRateCop,
      currency: "COP",
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update role rate: ${error.message}`);
  }

  return data;
}

/**
 * Updates global financial constants (target margin %, contingency, overhead %).
 */
export async function updatePricingSettings(settings: Partial<PricingSettings>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pricing_settings")
    .update(settings)
    .eq("is_active", true)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update pricing settings: ${error.message}`);
  }

  return data;
}
