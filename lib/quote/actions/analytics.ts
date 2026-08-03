"use server";

// =============================================================================
// MTB Quote V1 — Analytics & Calibration Server Actions (Phase 11)
// =============================================================================
// Collects historical project execution actuals (hours, costs, duration, outcome)
// and computes Estimated vs Actual variance metrics for administrative review.
// NEVER automatically alters pricing rates or formulas.

import { createClient } from "../supabase/server";
import { requireAdminAuth } from "./admin";
import type {
  ActualCostRecord,
  AnalyticsSummary,
  QuoteVarianceComparison,
  ServiceVarianceMetric,
} from "../types";

/**
 * Saves or updates actual execution costs and metrics for a completed/in-progress quote.
 */
export async function recordActualCosts(
  quoteId: string,
  actualData: {
    actual_hours: number;
    actual_freelancer_cost: number;
    actual_duration_weeks: number;
    actual_other_costs?: number;
    project_outcome: ActualCostRecord["project_outcome"];
    notes?: string;
  }
) {
  const { supabase } = await requireAdminAuth();

  const payload = {
    quote_id: quoteId,
    actual_hours: Number(actualData.actual_hours) || 0,
    actual_freelancer_cost: Number(actualData.actual_freelancer_cost) || 0,
    actual_duration_weeks: Number(actualData.actual_duration_weeks) || 0,
    actual_other_costs: Number(actualData.actual_other_costs) || 0,
    project_outcome: actualData.project_outcome,
    notes: actualData.notes || "",
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("actual_costs")
    .upsert(payload, { onConflict: "quote_id" })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to record actual costs: ${error.message}`);
  }

  return data;
}

/**
 * Fetches recorded actual costs for a single quote.
 */
export async function getQuoteActuals(quoteId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("actual_costs")
    .select("*")
    .eq("quote_id", quoteId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching quote actuals:", error);
    return null;
  }

  return data as ActualCostRecord | null;
}

/**
 * Computes executive analytics and calibration metrics across all historical quotes.
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = await createClient();

  // 1. Fetch quotes and actual_costs in parallel to avoid PostgREST schema cache join failures
  const [quotesRes, actualsRes] = await Promise.all([
    supabase.from("quotes").select("*, clients(*), quote_items(*, deliverables(*))"),
    supabase.from("actual_costs").select("*"),
  ]);

  if (quotesRes.error) {
    throw new Error(`Failed to load analytics data: ${quotesRes.error.message}`);
  }

  const quoteList = quotesRes.data || [];
  const actualsMap = new Map<string, any>();
  if (actualsRes.data) {
    actualsRes.data.forEach((ac: any) => {
      if (ac.quote_id) actualsMap.set(ac.quote_id, ac);
    });
  }

  const comparisons: QuoteVarianceComparison[] = [];
  const serviceStatsMap = new Map<
    string,
    { count: number; totalEstPrice: number; totalFinalPrice: number; totalManualAdj: number }
  >();

  let totalManualAdjSum = 0;
  let totalEstToFinalDiffSum = 0;
  let totalEstToFinalPctSum = 0;
  let totalRealizedMarginSum = 0;
  let trackedCount = 0;
  let completedCount = 0;
  let underestimatedCount = 0;
  let overestimatedCount = 0;

  for (const q of quoteList) {
    const costBase = Number(q.cost_base) || 0;
    const recPrice = Number(q.recommended_price) || 0;
    const calcPrice = Number(q.calculated_price) || 0;
    const manualAdj = Number(q.manual_adjustment) || 0;
    const finalPrice = Number(q.final_price) || calcPrice;
    const actuals = actualsMap.get(q.id) || q.actual_costs;

    totalManualAdjSum += manualAdj;
    const estToFinalDiff = finalPrice - recPrice;
    totalEstToFinalDiffSum += estToFinalDiff;

    if (recPrice > 0) {
      totalEstToFinalPctSum += (estToFinalDiff / recPrice) * 100;
    }

    // Grouping by service for calibration analysis
    const primaryItem = q.quote_items?.[0];
    const serviceName = primaryItem?.deliverables?.name || "General Software Services";

    const sStat = serviceStatsMap.get(serviceName) || {
      count: 0,
      totalEstPrice: 0,
      totalFinalPrice: 0,
      totalManualAdj: 0,
    };
    sStat.count += 1;
    sStat.totalEstPrice += recPrice;
    sStat.totalFinalPrice += finalPrice;
    sStat.totalManualAdj += manualAdj;
    serviceStatsMap.set(serviceName, sStat);

    if (actuals) {
      trackedCount += 1;
      if (actuals.project_outcome === "completed" || actuals.project_outcome === "on_budget") {
        completedCount += 1;
      }

      const estHours = 20; // baseline estimated hours per item
      const estFreelancerCost = costBase * 0.3; // estimated freelancer cost portion
      const estDurationWeeks = 4; // default baseline duration

      const actualHours = Number(actuals.actual_hours) || 0;
      const actualFreelancerCost = Number(actuals.actual_freelancer_cost) || 0;
      const actualDurationWeeks = Number(actuals.actual_duration_weeks) || 0;
      const actualTotalCost = actualFreelancerCost + (Number(actuals.actual_other_costs) || 0);

      const realizedMargin =
        finalPrice > 0 ? (finalPrice - actualTotalCost) / finalPrice : 0;
      totalRealizedMarginSum += realizedMargin;

      if (actualHours > estHours || actualFreelancerCost > estFreelancerCost) {
        underestimatedCount += 1;
      } else if (actualHours < estHours * 0.8) {
        overestimatedCount += 1;
      }

      comparisons.push({
        quote_id: q.id,
        reference_number: q.reference_number,
        client_name: q.clients?.name || "Client",
        status: q.status,
        estimated_cost_base: costBase,
        recommended_price: recPrice,
        manual_adjustment: manualAdj,
        final_price: finalPrice,
        estimated_hours: estHours,
        estimated_freelancer_cost: estFreelancerCost,
        estimated_duration_weeks: estDurationWeeks,
        actual_hours: actualHours,
        actual_freelancer_cost: actualFreelancerCost,
        actual_duration_weeks: actualDurationWeeks,
        actual_total_cost: actualTotalCost,
        project_outcome: actuals.project_outcome,
        hours_variance: actualHours - estHours,
        freelancer_cost_variance: actualFreelancerCost - estFreelancerCost,
        duration_variance: actualDurationWeeks - estDurationWeeks,
        estimate_vs_final_diff: estToFinalDiff,
        realized_margin: realizedMargin,
      });
    }
  }

  const serviceMetrics: ServiceVarianceMetric[] = Array.from(serviceStatsMap.entries()).map(
    ([name, stat]) => {
      const avgEst = stat.count > 0 ? stat.totalEstPrice / stat.count : 0;
      const avgFinal = stat.count > 0 ? stat.totalFinalPrice / stat.count : 0;
      const avgAdj = stat.count > 0 ? stat.totalManualAdj / stat.count : 0;
      const diff = avgFinal - avgEst;

      let varianceStatus: ServiceVarianceMetric["variance_status"] = "balanced";
      if (diff > avgEst * 0.1) varianceStatus = "underestimated";
      else if (diff < -avgEst * 0.1) varianceStatus = "overestimated";

      return {
        service_name: name,
        quote_count: stat.count,
        avg_estimated_price: avgEst,
        avg_final_price: avgFinal,
        avg_manual_adj: avgAdj,
        variance_status: varianceStatus,
      };
    }
  );

  const totalQuotes = quoteList.length;

  return {
    total_quotes_tracked: totalQuotes,
    total_completed_projects: completedCount,
    avg_manual_adjustment_cop: totalQuotes > 0 ? totalManualAdjSum / totalQuotes : 0,
    avg_estimate_to_final_diff_cop: totalQuotes > 0 ? totalEstToFinalDiffSum / totalQuotes : 0,
    avg_estimate_to_final_diff_pct: totalQuotes > 0 ? totalEstToFinalPctSum / totalQuotes : 0,
    avg_realized_margin_pct: trackedCount > 0 ? (totalRealizedMarginSum / trackedCount) * 100 : 35,
    underestimated_services_count: underestimatedCount,
    overestimated_services_count: overestimatedCount,
    service_metrics: serviceMetrics,
    quote_comparisons: comparisons,
  };
}
