// =============================================================================
// MTB Quote V1 — Analytics & Calibration Domain Types (Phase 11)
// =============================================================================

export type ProjectOutcome =
  | "on_budget"
  | "over_budget"
  | "under_budget"
  | "completed"
  | "cancelled"
  | "in_progress";

export interface ActualCostRecord {
  id?: string;
  quote_id: string;
  actual_hours: number;
  actual_freelancer_cost: number;
  actual_duration_weeks: number;
  actual_other_costs: number;
  project_outcome: ProjectOutcome;
  notes?: string;
  recorded_at?: string;
  updated_at?: string;
}

export interface QuoteVarianceComparison {
  quote_id: string;
  reference_number: string;
  client_name: string;
  status: string;
  // Estimated metrics
  estimated_cost_base: number;
  recommended_price: number;
  manual_adjustment: number;
  final_price: number;
  estimated_hours: number;
  estimated_freelancer_cost: number;
  estimated_duration_weeks: number;
  // Actual recorded metrics
  actual_hours: number;
  actual_freelancer_cost: number;
  actual_duration_weeks: number;
  actual_total_cost: number;
  project_outcome: ProjectOutcome;
  // Variance metrics
  hours_variance: number; // actual - estimated
  freelancer_cost_variance: number; // actual - estimated
  duration_variance: number; // actual - estimated
  estimate_vs_final_diff: number; // final_price - recommended_price
  realized_margin: number; // (final_price - actual_total_cost) / final_price
}

export interface ServiceVarianceMetric {
  service_name: string;
  quote_count: number;
  avg_estimated_price: number;
  avg_final_price: number;
  avg_manual_adj: number;
  variance_status: "underestimated" | "overestimated" | "balanced";
}

export interface AnalyticsSummary {
  total_quotes_tracked: number;
  total_completed_projects: number;
  avg_manual_adjustment_cop: number;
  avg_estimate_to_final_diff_cop: number;
  avg_estimate_to_final_diff_pct: number;
  avg_realized_margin_pct: number;
  underestimated_services_count: number;
  overestimated_services_count: number;
  service_metrics: ServiceVarianceMetric[];
  quote_comparisons: QuoteVarianceComparison[];
}
