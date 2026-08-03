"use server";

// =============================================================================
// MTB Quote V1 — Admin Server Actions (Phase 7: Full Quote Management & Audit)
// =============================================================================
// Authenticated actions for administrators to inspect quotes, modify deliverables,
// recalculate pricing, generate immutable pricing snapshots, and track audit history.

import { createClient } from "../supabase/server";
import type {
  QuoteStatus,
  QuoteOverrideInput,
  PricingSettings,
  Role,
  Deliverable,
  Service,
  Category,
  Client,
  ComplexityLevel,
} from "../types";
import { calculateQuoteV1 } from "../engine/calculator";
import { generateReferenceNumber } from "../utils";

/**
 * Helper to enforce admin user authentication for all administrative server actions.
 */
export async function requireAdminAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized: Admin authentication required");
  }

  return { supabase, user };
}

/**
 * Summary metrics for the Admin Dashboard overview.
 */
export async function getAdminDashboardMetrics() {
  const { supabase } = await requireAdminAuth();

  const [quotesRes, recentQuotesRes] = await Promise.all([
    supabase
      .from("quotes")
      .select("id, status, final_price, calculated_price, created_at"),
    supabase
      .from("quotes")
      .select("*, clients(*)")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const quotes = quotesRes.data || [];
  const recentQuotes = recentQuotesRes.data || [];

  const totalQuotes = quotes.length;
  const draftCount = quotes.filter((q) => q.status === "draft").length;
  const reviewCount = quotes.filter((q) => q.status === "under_review").length;
  const approvedCount = quotes.filter((q) => q.status === "approved").length;
  const acceptedCount = quotes.filter((q) => q.status === "accepted").length;

  const totalQuotedValue = quotes.reduce(
    (acc, q) => acc + (q.final_price || 0),
    0
  );
  const acceptedRevenue = quotes
    .filter((q) => q.status === "accepted")
    .reduce((acc, q) => acc + (q.final_price || 0), 0);

  return {
    totalQuotes,
    draftCount,
    reviewCount,
    approvedCount,
    acceptedCount,
    totalQuotedValue,
    acceptedRevenue,
    recentQuotes,
  };
}

/**
 * Search, filter, and sort quotes for admin management table.
 */
export async function getAdminQuotes(options?: {
  search?: string;
  status?: QuoteStatus | "all";
}) {
  const supabase = await createClient();

  let query = supabase.from("quotes").select("*, clients(*)");

  if (options?.status && options.status !== "all") {
    query = query.eq("status", options.status);
  }

  if (options?.search && options.search.trim() !== "") {
    const term = `%${options.search.trim()}%`;
    query = query.or(`reference_number.ilike.${term}`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load quotes: ${error.message}`);
  }

  return data || [];
}

/**
 * Retrieves full financial details, items, deliverables, and audit logs for admin inspection.
 */
export async function getAdminQuoteDetails(quoteId: string) {
  const supabase = await createClient();

  const [quoteRes, auditRes] = await Promise.all([
    supabase
      .from("quotes")
      .select(
        `
        *,
        clients (*),
        quote_items (*, deliverables(*))
      `
      )
      .eq("id", quoteId)
      .single(),
    supabase
      .from("audit_logs")
      .select("*")
      .eq("quote_id", quoteId)
      .order("created_at", { ascending: false }),
  ]);

  if (quoteRes.error || !quoteRes.data) {
    throw new Error(
      `Failed to load quote details: ${quoteRes.error?.message || "Unknown error"}`
    );
  }

  return {
    ...quoteRes.data,
    audit_logs: auditRes.data || [],
  };
}

/**
 * Full admin quote update: scope items, pricing overrides, notes, status transition,
 * immutable snapshot generation, and audit log recording.
 */
export async function updateAdminQuoteFull(
  quoteId: string,
  payload: {
    items?: Array<{ deliverable_id: string; quantity: number; complexity: ComplexityLevel }>;
    manual_adjustment?: number;
    external_costs_total?: number;
    notes?: string | null;
    internal_notes?: string | null;
    status?: QuoteStatus;
  }
) {
  const supabase = await createClient();

  // 1. Fetch current quote
  const { data: currentQuote, error: fetchErr } = await supabase
    .from("quotes")
    .select("*, quote_items(*)")
    .eq("id", quoteId)
    .single();

  if (fetchErr || !currentQuote) {
    throw new Error("Quote not found");
  }

  // 2. Fetch default settings
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

  // 3. Resolve items to calculate
  type AdminItemInput = { deliverable_id: string; quantity: number; complexity: ComplexityLevel };
  const itemsToCalculate: AdminItemInput[] =
    payload.items ||
    currentQuote.quote_items.map((it: AdminItemInput) => ({
      deliverable_id: it.deliverable_id,
      quantity: it.quantity,
      complexity: it.complexity,
    }));

  const mtbHourlyRateCop = defaultSettings.mtb_standard_rate_cop || 140000;
  const freelancerHourlyRateCop = 110000;

  const engineItems = itemsToCalculate.map((it: AdminItemInput) => ({
    deliverableId: it.deliverable_id,
    quantity: it.quantity,
    complexity: it.complexity,
    mtbLaborHours: 20 * 0.7,
    mtbHourlyRateCop,
    freelancerHours: 20 * 0.3,
    freelancerHourlyRateCop,
  }));

  const manualAdj = payload.manual_adjustment ?? currentQuote.manual_adjustment ?? 0;
  const extCosts = payload.external_costs_total ?? currentQuote.external_costs_total ?? 0;
  const newStatus = payload.status ?? currentQuote.status;

  // 4. Run calculation engine
  const calculation = calculateQuoteV1({
    items: engineItems,
    settings: defaultSettings,
    manualAdjustmentCop: manualAdj,
    externalCostsTotalCop: extCosts,
  });

  // 5. Generate immutable pricing snapshot when finalized
  const isFinalized = ["submitted", "sent", "approved", "accepted", "adjusted"].includes(newStatus);
  const snapshotData = isFinalized ? calculation.snapshot : currentQuote.snapshot;

  // 6. Update master quote row
  const { data: updatedQuote, error: updateErr } = await supabase
    .from("quotes")
    .update({
      cost_base: calculation.costBaseCop,
      recommended_price: calculation.recommendedPriceCop,
      calculated_price: calculation.calculatedPriceCop,
      manual_adjustment: manualAdj,
      external_costs_total: extCosts,
      final_price: calculation.finalPriceCop,
      status: newStatus,
      notes: payload.notes !== undefined ? payload.notes : currentQuote.notes,
      internal_notes: payload.internal_notes !== undefined ? payload.internal_notes : currentQuote.internal_notes,
      snapshot: snapshotData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", quoteId)
    .select()
    .single();

  if (updateErr) {
    throw new Error(`Failed to update quote: ${updateErr.message}`);
  }

  // 7. Update quote items if provided
  if (payload.items) {
    await supabase.from("quote_items").delete().eq("quote_id", quoteId);
    const itemsToInsert = calculation.items.map((it) => ({
      quote_id: quoteId,
      deliverable_id: it.deliverableId,
      quantity: it.quantity,
      complexity: it.complexity,
      calculated_cost: it.costBaseCop,
      recommended_price: it.recommendedPriceCop,
      adjusted_price: null,
    }));
    await supabase.from("quote_items").insert(itemsToInsert);
  }

  // 8. Record audit logs for modified fields
  const auditEntries = [];
  if (payload.status && payload.status !== currentQuote.status) {
    auditEntries.push({
      quote_id: quoteId,
      action: "STATUS_CHANGE",
      field_changed: "status",
      old_value: currentQuote.status,
      new_value: payload.status,
    });
  }
  if (payload.manual_adjustment !== undefined && payload.manual_adjustment !== currentQuote.manual_adjustment) {
    auditEntries.push({
      quote_id: quoteId,
      action: "PRICING_OVERRIDE",
      field_changed: "manual_adjustment",
      old_value: String(currentQuote.manual_adjustment),
      new_value: String(payload.manual_adjustment),
    });
  }
  if (payload.external_costs_total !== undefined && payload.external_costs_total !== currentQuote.external_costs_total) {
    auditEntries.push({
      quote_id: quoteId,
      action: "PRICING_OVERRIDE",
      field_changed: "external_costs_total",
      old_value: String(currentQuote.external_costs_total),
      new_value: String(payload.external_costs_total),
    });
  }

  if (auditEntries.length > 0) {
    await supabase.from("audit_logs").insert(auditEntries);
  }

  return updatedQuote;
}

/**
 * Overrides quote pricing (legacy wrapper calling updateAdminQuoteFull).
 */
export async function overrideQuotePricing(
  quoteId: string,
  overrides: QuoteOverrideInput
) {
  return updateAdminQuoteFull(quoteId, {
    manual_adjustment: overrides.manual_adjustment,
    external_costs_total: overrides.external_costs_total,
    notes: overrides.notes,
    internal_notes: overrides.internal_notes,
  });
}

/**
 * Transitions a quote through its lifecycle states.
 */
export async function updateQuoteStatus(quoteId: string, status: QuoteStatus) {
  return updateAdminQuoteFull(quoteId, { status });
}

/**
 * Duplicates an existing quote into a new draft quote with a unique reference number.
 */
export async function duplicateQuote(quoteId: string) {
  const supabase = await createClient();

  const { data: sourceQuote, error: quoteErr } = await supabase
    .from("quotes")
    .select("*, quote_items(*)")
    .eq("id", quoteId)
    .single();

  if (quoteErr || !sourceQuote) {
    throw new Error("Source quote not found for duplication");
  }

  const newRefNumber = generateReferenceNumber();

  const { data: newQuote, error: createErr } = await supabase
    .from("quotes")
    .insert({
      reference_number: newRefNumber,
      client_id: sourceQuote.client_id,
      status: "draft",
      currency: sourceQuote.currency,
      cost_base: sourceQuote.cost_base,
      recommended_price: sourceQuote.recommended_price,
      calculated_price: sourceQuote.calculated_price,
      manual_adjustment: sourceQuote.manual_adjustment,
      external_costs_total: sourceQuote.external_costs_total,
      final_price: sourceQuote.final_price,
      valid_for_days: sourceQuote.valid_for_days,
      notes: `Cloned from ${sourceQuote.reference_number}. ${sourceQuote.notes || ""}`.trim(),
      internal_notes: sourceQuote.internal_notes,
    })
    .select()
    .single();

  if (createErr || !newQuote) {
    throw new Error(`Failed to duplicate quote: ${createErr?.message}`);
  }

  if (sourceQuote.quote_items && sourceQuote.quote_items.length > 0) {
    const itemsToInsert = sourceQuote.quote_items.map((item: { deliverable_id: string; quantity: number; complexity: ComplexityLevel; calculated_cost: number; recommended_price: number; adjusted_price: number | null }) => ({
      quote_id: newQuote.id,
      deliverable_id: item.deliverable_id,
      quantity: item.quantity,
      complexity: item.complexity,
      calculated_cost: item.calculated_cost,
      recommended_price: item.recommended_price,
      adjusted_price: item.adjusted_price,
    }));

    await supabase.from("quote_items").insert(itemsToInsert);
  }

  await supabase.from("audit_logs").insert({
    quote_id: newQuote.id,
    action: "CREATE",
    field_changed: "reference_number",
    old_value: null,
    new_value: newRefNumber,
  });

  return newQuote;
}

/**
 * Deletes a quote record and its items.
 */
export async function deleteQuote(quoteId: string) {
  const supabase = await createClient();

  await supabase.from("quote_items").delete().eq("quote_id", quoteId);
  const { error } = await supabase.from("quotes").delete().eq("id", quoteId);

  if (error) {
    throw new Error(`Failed to delete quote: ${error.message}`);
  }

  return true;
}

/**
 * Roles & Rate Cards Management
 */
export async function getRolesAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("roles")
    .select("*, role_rates(*)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch roles: ${error.message}`);
  }

  return data || [];
}

export async function createRoleAdmin(roleData: {
  name: string;
  name_es: string;
  seniority: string;
  is_mtb_internal: boolean;
  hourly_rate_cop: number;
}) {
  const supabase = await createClient();

  const { data: role, error: roleErr } = await supabase
    .from("roles")
    .insert({
      name: roleData.name,
      name_es: roleData.name_es,
      seniority: roleData.seniority,
      is_mtb_internal: roleData.is_mtb_internal,
      is_active: true,
    })
    .select()
    .single();

  if (roleErr || !role) {
    throw new Error(`Failed to create role: ${roleErr?.message}`);
  }

  if (roleData.hourly_rate_cop > 0) {
    await supabase.from("role_rates").insert({
      role_id: role.id,
      hourly_rate_cop: roleData.hourly_rate_cop,
      currency: "COP",
      is_active: true,
    });
  }

  return role;
}

export async function updateRoleAdmin(
  roleId: string,
  updates: Partial<Role>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("roles")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", roleId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update role: ${error.message}`);
  }

  return data;
}

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
  return data;
}

export async function getRoleRatesAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("role_rates")
    .select("*, roles(name, seniority)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch role rates: ${error.message}`);
  }

  return (data || []).map((r: any) => ({
    id: r.id,
    role_id: r.role_id,
    seniority: r.roles?.seniority || r.seniority || "standard",
    rate_cop: Number(r.hourly_rate_cop ?? r.rate_cop ?? 0),
    is_active: r.is_active,
    roles: r.roles,
  }));
}

export async function updateRoleRateAdmin(rateId: string, rateCop: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("role_rates")
    .update({ hourly_rate_cop: rateCop, updated_at: new Date().toISOString() })
    .eq("id", rateId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update role rate: ${error.message}`);
  }

  return data;
}

/**
 * Deliverables Management
 */
export async function getDeliverablesAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deliverables")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch deliverables: ${error.message}`);
  }

  return data || [];
}

export async function createDeliverableAdmin(deliv: {
  name: string;
  name_es?: string;
  description?: string;
  deliverable_type?: string;
  default_complexity?: string;
  estimated_hours?: number;
  unit_of_measure?: string;
  is_active?: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deliverables")
    .insert({
      name: deliv.name,
      name_es: deliv.name_es || deliv.name,
      description: deliv.description || "",
      deliverable_type: deliv.deliverable_type || "asset",
      default_complexity: deliv.default_complexity || "standard",
      estimated_hours: deliv.estimated_hours || 10,
      unit_of_measure: deliv.unit_of_measure || "unit",
      is_active: deliv.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create deliverable: ${error.message}`);
  }

  return data;
}

export async function updateDeliverableAdmin(
  id: string,
  updates: Partial<Deliverable>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("deliverables")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update deliverable: ${error.message}`);
  }

  return data;
}

/**
 * Services & Categories Management
 */
export async function getServicesAdmin() {
  const supabase = await createClient();

  const [categoriesRes, servicesRes, componentsRes] = await Promise.all([
    supabase.from("categories").select("*").order("display_order", { ascending: true }),
    supabase.from("services").select("*").order("name", { ascending: true }),
    supabase.from("service_components").select("*"),
  ]);

  return {
    categories: categoriesRes.data || [],
    services: servicesRes.data || [],
    components: componentsRes.data || [],
  };
}

export async function createServiceAdmin(serv: {
  category_id: string;
  name: string;
  name_es?: string;
  description?: string;
  is_active?: boolean;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .insert({
      category_id: serv.category_id,
      name: serv.name,
      name_es: serv.name_es || serv.name,
      description: serv.description || "",
      is_active: serv.is_active ?? true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create service: ${error.message}`);
  }

  return data;
}

export async function updateServiceAdmin(
  id: string,
  updates: Partial<Service>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("services")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update service: ${error.message}`);
  }

  return data;
}

export async function createCategoryAdmin(cat: {
  name: string;
  name_es?: string;
  slug: string;
  display_order?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .insert({
      name: cat.name,
      name_es: cat.name_es || cat.name,
      slug: cat.slug,
      display_order: cat.display_order || 1,
      is_active: true,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create category: ${error.message}`);
  }

  return data;
}

export async function updateCategoryAdmin(
  id: string,
  updates: Partial<Category>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }

  return data;
}

/**
 * Global Pricing Settings Management
 */
export async function getPricingSettingsAdmin() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("pricing_settings")
    .select("*")
    .eq("is_active", true)
    .limit(1)
    .single();

  return data as PricingSettings | null;
}

export async function updatePricingSettings(
  settings: Partial<PricingSettings>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("pricing_settings")
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq("is_active", true)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update pricing settings: ${error.message}`);
  }

  return data;
}

/**
 * Clients Management
 */
export async function getClientsAdmin() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select("*, quotes(*)")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch clients: ${error.message}`);
  }

  return data || [];
}

export async function createClientAdmin(clientData: {
  name: string;
  email?: string;
  company?: string;
  phone?: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: clientData.name,
      email: clientData.email || "",
      company: clientData.company || "",
      phone: clientData.phone || "",
      referral_source: "admin_manual",
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create client: ${error.message}`);
  }

  return data;
}

export async function updateClientAdmin(
  id: string,
  updates: Partial<Client>
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update client: ${error.message}`);
  }

  return data;
}
