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
  ScopeQuestion,
  ScopeAnswers,
} from "../types";
import { calculateQuoteV1, generateCustomerFacingRange } from "../engine";
import { generateReferenceNumber } from "../utils";

export interface CatalogResponse {
  categories: Category[];
  services: Service[];
  deliverables: Deliverable[];
}

/**
  * Fetches active scope questions with options for a specific service.
  */
export async function getServiceScopeQuestions(
  serviceId: string
): Promise<ScopeQuestion[]> {
  if (!serviceId) return [];

  const supabase = await createClient();

  const { data: questions, error } = await supabase
    .from("scope_questions")
    .select("*, options:question_options(*)")
    .eq("service_id", serviceId)
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error || !questions) {
    console.error("Error fetching scope questions:", error);
    return [];
  }

  // Deduplicate questions by label and options by value
  const seenQuestionLabels = new Set<string>();
  const formatted: ScopeQuestion[] = [];

  for (const q of questions) {
    const labelKey = (q.label || "").trim().toLowerCase();
    if (seenQuestionLabels.has(labelKey)) continue;
    seenQuestionLabels.add(labelKey);

    const rawOptions = q.options || [];
    const seenOptionValues = new Set<string>();
    const cleanOptions = [];

    for (const o of rawOptions) {
      if (!o.is_active) continue;
      const optKey = (o.value || "").trim().toLowerCase();
      if (seenOptionValues.has(optKey)) continue;
      seenOptionValues.add(optKey);
      cleanOptions.push(o);
    }

    cleanOptions.sort((a: any, b: any) => a.display_order - b.display_order);

    formatted.push({
      ...q,
      options: cleanOptions,
    });
  }

  return formatted;
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
 * Helper to compute total additional hours & complexity escalation from scope answers.
 */
async function processScopeAnswers(
  serviceId: string | undefined,
  answers: ScopeAnswers | undefined
): Promise<{ additionalHours: number; suggestedComplexity?: ComplexityLevel }> {
  if (!serviceId || !answers || Object.keys(answers).length === 0) {
    return { additionalHours: 0 };
  }

  const questions = await getServiceScopeQuestions(serviceId);
  let totalAdditionalHours = 0;
  const complexityHierarchy: ComplexityLevel[] = [
    "basic",
    "standard",
    "advanced",
    "enterprise",
  ];
  let highestComplexityIndex = -1;

  for (const q of questions) {
    const val = answers[q.id];
    if (val === undefined || val === null || val === "") continue;

    if (q.question_type === "select" || q.question_type === "boolean") {
      const option = q.options.find((o) => o.value === String(val));
      if (option) {
        totalAdditionalHours += (Number(option.additional_hours) || 0) + (Number(q.hours_modifier) || 0) * (Number(option.hours_multiplier) || 1);
        if (option.complexity_modifier) {
          const idx = complexityHierarchy.indexOf(option.complexity_modifier as ComplexityLevel);
          if (idx > highestComplexityIndex) highestComplexityIndex = idx;
        }
      }
    } else if (q.question_type === "multi_select" && Array.isArray(val)) {
      for (const itemVal of val) {
        const option = q.options.find((o) => o.value === String(itemVal));
        if (option) {
          totalAdditionalHours += (Number(option.additional_hours) || 0) + (Number(q.hours_modifier) || 0) * (Number(option.hours_multiplier) || 1);
          if (option.complexity_modifier) {
            const idx = complexityHierarchy.indexOf(option.complexity_modifier as ComplexityLevel);
            if (idx > highestComplexityIndex) highestComplexityIndex = idx;
          }
        }
      }
    }
  }

  return {
    additionalHours: totalAdditionalHours,
    suggestedComplexity:
      highestComplexityIndex >= 0 ? complexityHierarchy[highestComplexityIndex] : undefined,
  };
}

/**
 * Calculates a public estimate preview range (COP) without creating a quote record yet.
 * Executes server-only COP pricing math.
 */
export async function calculatePublicEstimatePreview(
  payload: PublicQuoteInput & { service_id?: string; scope_answers?: ScopeAnswers }
) {
  if (!payload || !Array.isArray(payload.items) || payload.items.length === 0) {
    throw new Error("Invalid request: At least one deliverable item is required.");
  }

  const supabase = await createClient();

  const { data: settingsData } = await supabase
    .from("pricing_settings")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .single();

  const defaultSettings: PricingSettings = settingsData || {
    id: "default",
    default_margin: 0.35,
    default_contingency: 0.1,
    account_mgmt_rate: 0.1,
    project_mgmt_rate: 0.1,
    min_project_value_cop: 3000000,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const mtbHourlyRateCop = 140000;
  const freelancerHourlyRateCop = 110000;

  const { additionalHours, suggestedComplexity } = await processScopeAnswers(
    payload.service_id,
    payload.scope_answers
  );

  // Fetch deliverable & service details for dynamic baseline hours
  let serviceSlug = "";
  if (payload.service_id) {
    const { data: srvData } = await supabase
      .from("services")
      .select("slug")
      .eq("id", payload.service_id)
      .maybeSingle();
    if (srvData) serviceSlug = srvData.slug;
  }

  // Service-specific baseline hours mapping
  const BASELINE_HOURS_BY_SLUG: Record<string, number> = {
    "landing-page": 8,
    "content-strategy": 10,
    "social-media-management": 12,
    "ecommerce-optimization": 15,
    "marketing-campaign": 15,
    "brand-identity": 18,
    "uiux-design": 20,
    "corporate-website": 25,
    "app-redesign": 25,
    "data-dashboard": 30,
    "bi-implementation": 35,
    "ecommerce-store": 40,
    "custom-web-app": 45,
    "mobile-app-development": 50,
  };

  const serviceBaseHours = BASELINE_HOURS_BY_SLUG[serviceSlug] ?? 15;

  // For small services (landing page, content strategy, etc.), adjust minimum project value floor
  const isSmallService = ["landing-page", "content-strategy", "social-media-management", "ecommerce-optimization"].includes(serviceSlug);
  const effectiveSettings = {
    ...defaultSettings,
    min_project_value_cop: isSmallService
      ? Math.min(defaultSettings.min_project_value_cop, 1500000)
      : defaultSettings.min_project_value_cop,
  };

  const engineItems = payload.items.map((item) => {
    const baseHours = serviceBaseHours + additionalHours;
    const finalComplexity = suggestedComplexity
      ? (["basic", "standard", "advanced", "enterprise"].indexOf(suggestedComplexity) >
         ["basic", "standard", "advanced", "enterprise"].indexOf(item.complexity)
          ? suggestedComplexity
          : item.complexity)
      : item.complexity;

    return {
      deliverableId: item.deliverable_id,
      quantity: item.quantity,
      complexity: finalComplexity as ComplexityLevel,
      mtbLaborHours: baseHours * 0.7,
      mtbHourlyRateCop,
      freelancerHours: baseHours * 0.3,
      freelancerHourlyRateCop,
    };
  });

  const result = calculateQuoteV1({
    items: engineItems,
    settings: effectiveSettings,
  });

  return {
    low_estimate_cop: result.customerRange.lowCop,
    high_estimate_cop: result.customerRange.highCop,
    formatted_range: result.customerRange.formattedRange,
  };
}

/**
 * Submits a public quote request, executes the server-only COP pricing math,
 * stores the quote in draft status, and returns a rounded customer range.
 */
export async function submitPublicQuoteRequest(
  payload: PublicQuoteInput & { service_id?: string; scope_answers?: ScopeAnswers }
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

  const mtbHourlyRateCop = 140000;
  const freelancerHourlyRateCop = 110000;

  const { additionalHours, suggestedComplexity } = await processScopeAnswers(
    payload.service_id,
    payload.scope_answers
  );

  let serviceSlug = "";
  if (payload.service_id) {
    const { data: srvData } = await supabase
      .from("services")
      .select("slug")
      .eq("id", payload.service_id)
      .maybeSingle();
    if (srvData) serviceSlug = srvData.slug;
  }

  const BASELINE_HOURS_BY_SLUG: Record<string, number> = {
    "landing-page": 8,
    "content-strategy": 10,
    "social-media-management": 12,
    "ecommerce-optimization": 15,
    "marketing-campaign": 15,
    "brand-identity": 18,
    "uiux-design": 20,
    "corporate-website": 25,
    "app-redesign": 25,
    "data-dashboard": 30,
    "bi-implementation": 35,
    "ecommerce-store": 40,
    "custom-web-app": 45,
    "mobile-app-development": 50,
  };

  const serviceBaseHours = BASELINE_HOURS_BY_SLUG[serviceSlug] ?? 15;
  const isSmallService = ["landing-page", "content-strategy", "social-media-management", "ecommerce-optimization"].includes(serviceSlug);
  const effectiveSettings = {
    ...defaultSettings,
    min_project_value_cop: isSmallService
      ? Math.min(defaultSettings.min_project_value_cop, 1500000)
      : defaultSettings.min_project_value_cop,
  };

  const engineItems = payload.items.map((item) => {
    const baseHours = serviceBaseHours + additionalHours;
    const finalComplexity = suggestedComplexity
      ? (["basic", "standard", "advanced", "enterprise"].indexOf(suggestedComplexity) >
         ["basic", "standard", "advanced", "enterprise"].indexOf(item.complexity)
          ? suggestedComplexity
          : item.complexity)
      : item.complexity;

    return {
      deliverableId: item.deliverable_id,
      quantity: item.quantity,
      complexity: finalComplexity as ComplexityLevel,
      mtbLaborHours: baseHours * 0.7,
      mtbHourlyRateCop,
      freelancerHours: baseHours * 0.3,
      freelancerHourlyRateCop,
    };
  });

  // 3. Execute pricing formula
  const result = calculateQuoteV1({
    items: engineItems,
    settings: effectiveSettings,
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

  // 6. Store master quote record with scope_data
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
      scope_data: payload.scope_answers || null,
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

  // Prefer calling secure definer RPC to respect hardened RLS
  const { data: rpcData } = await supabase.rpc("get_public_quote_summary", {
    ref_num: ref,
  });

  let quoteSummary = rpcData && rpcData.length > 0 ? rpcData[0] : null;

  if (!quoteSummary) {
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
    quoteSummary = data;
  }

  const range = generateCustomerFacingRange(quoteSummary.final_price);

  return {
    ...quoteSummary,
    formatted_range: range.formattedRange,
  };
}
