"use server";

// =============================================================================
// MTB Quote V1 — Public Quoter Server Actions
// =============================================================================
// Mediates public client interactions: catalog loading, calculation, submission.
// NEVER returns internal hourly rates or exact cost breakdowns to clients.

import { createClient } from "../supabase/server";
import type {
  Category,
  Service,
  Deliverable,
  PublicQuoteInput,
  PublicQuoteResult,
  PricingSettings,
  ComplexityLevel,
} from "../types";
import { calculateQuoteV1, generateCustomerFacingRange } from "../engine";
import { generateReferenceNumber } from "../utils";

export interface CatalogResponse {
  categories: Category[];
  services: Service[];
  deliverables: Deliverable[];
}

/**
 * Fetches the active catalog for public quoter clients.
 * Excludes all internal rates, role hours, and margin settings.
 */
export async function getPublicServiceCatalog(): Promise<CatalogResponse> {
  const supabase = await createClient();

  const [categoriesRes, servicesRes, deliverablesRes] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("id", { ascending: true }),
    supabase
      .from("deliverables")
      .select("*")
      .order("id", { ascending: true }),
  ]);

  return {
    categories: categoriesRes.data || [],
    services: servicesRes.data || [],
    deliverables: deliverablesRes.data || [],
  };
}

/**
 * Submits a public quote request, executes the server-only COP pricing math,
 * stores the quote in draft status, and returns a rounded customer range.
 */
export async function submitPublicQuoteRequest(
  payload: PublicQuoteInput
): Promise<PublicQuoteResult> {
  const supabase = await createClient();

  // 1. Fetch default pricing settings
  const { data: settingsData } = await supabase
    .from("pricing_settings")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .single();

  const defaultSettings: PricingSettings = settingsData || {
    id: "default",
    default_margin: 0.3,
    default_contingency: 0.1,
    account_mgmt_rate: 0.1,
    project_mgmt_rate: 0.1,
    min_project_value_cop: 3000000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // 2. Resolve default hourly rates for MTB Internal Engineer (140,000 COP) and Freelancer (110,000 COP)
  // In full production, this joins `service_components` and `role_rates`.
  // Here we use the formal V1 baseline minimums for public quote calculations.
  const mtbHourlyRateCop = 140000;
  const freelancerHourlyRateCop = 110000;

  const engineItems = payload.items.map((item) => {
    // Standard estimated hours baseline per deliverable quantity
    const baseHours = 20;
    return {
      deliverableId: item.deliverable_id,
      quantity: item.quantity,
      complexity: item.complexity as ComplexityLevel,
      mtbLaborHours: baseHours * 0.7,
      mtbHourlyRateCop,
      freelancerHours: baseHours * 0.3,
      freelancerHourlyRateCop,
    };
  });

  // 3. Execute pricing formula
  const result = calculateQuoteV1({
    items: engineItems,
    settings: defaultSettings,
  });

  // 4. Create client profile if name/email provided
  let clientId: string | null = null;
  if (payload.client_email && payload.client_name) {
    const { data: clientData } = await supabase
      .from("clients")
      .insert({
        name: payload.client_name,
        email: payload.client_email,
        company: payload.client_company || "",
        phone: payload.client_phone || "",
        referral_source: "public_quoter",
      })
      .select("id")
      .single();

    if (clientData) {
      clientId = clientData.id;
    }
  }

  // 5. Generate reference number
  const referenceNumber = generateReferenceNumber();

  // 6. Store master quote record
  const { data: quoteData, error: quoteError } = await supabase
    .from("quotes")
    .insert({
      reference_number: referenceNumber,
      client_id: clientId,
      status: "draft",
      currency: "COP",
      cost_base: result.costBaseCop,
      recommended_price: result.recommendedPriceCop,
      calculated_price: result.calculatedPriceCop,
      manual_adjustment: 0,
      external_costs_total: 0,
      final_price: result.finalPriceCop,
      valid_for_days: 30,
      notes: payload.notes || null,
    })
    .select("id")
    .single();

  if (quoteError || !quoteData) {
    throw new Error(
      `Failed to create quote record: ${quoteError?.message || "Unknown error"}`
    );
  }

  // 7. Store quote items
  const itemsToInsert = result.items.map((it) => ({
    quote_id: quoteData.id,
    deliverable_id: it.deliverableId,
    quantity: it.quantity,
    complexity: it.complexity,
    calculated_cost: it.costBaseCop,
    recommended_price: it.recommendedPriceCop,
    adjusted_price: null,
  }));

  await supabase.from("quote_items").insert(itemsToInsert);

  // 8. Return customer-safe range summary
  return {
    quote_id: quoteData.id,
    reference_number: referenceNumber,
    currency: "COP",
    low_estimate_cop: result.customerRange.lowCop,
    high_estimate_cop: result.customerRange.highCop,
    formatted_range: result.customerRange.formattedRange,
    valid_until: new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
  };
}

/**
 * Retrieves a customer-facing quote summary by its unique reference number.
 */
export async function getPublicQuoteByReference(ref: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("quotes")
    .select(
      "id, reference_number, status, currency, final_price, valid_for_days, created_at"
    )
    .eq("reference_number", ref)
    .single();

  if (error || !data) {
    return null;
  }

  const range = generateCustomerFacingRange(data.final_price);

  return {
    ...data,
    formatted_range: range.formattedRange,
  };
}
