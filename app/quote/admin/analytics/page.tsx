"use client";

import { useEffect, useState } from "react";
import { getAnalyticsSummary } from "@/lib/quote/actions/analytics";
import { formatCopCurrency } from "@/lib/quote/utils";
import type { AnalyticsSummary } from "@/lib/quote/types";

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAnalyticsSummary();
      setSummary(data);
    } catch (err) {
      console.error("Failed to load analytics summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          Analytics & Calibration Foundation
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Historical project performance tracking, Estimated vs Actual comparisons, and calibration insights to improve future estimation accuracy.
        </p>
      </div>

      {/* Mandatory Calibration Governance Notice */}
      <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/80 text-purple-900 text-xs leading-relaxed flex items-start gap-3">
        <span className="material-symbols-outlined text-purple-700 text-lg mt-0.5" aria-hidden="true">
          insights
        </span>
        <div>
          <strong className="block mb-0.5 font-bold">
            Explicit Administrative Decision Policy
          </strong>
          This system collects real-world project execution data to identify cost deviations.
          <span className="font-bold"> Pricing formulas and rate cards are NEVER modified automatically.</span> All pricing adjustments remain explicit administrative decisions.
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm">
          Loading analytics & variance metrics...
        </div>
      ) : summary ? (
        <>
          {/* Executive KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Average Manual Adjustment
              </span>
              <div className="text-2xl font-mono font-black text-slate-900">
                {formatCopCurrency(summary.avg_manual_adjustment_cop)}
              </div>
              <p className="text-[11px] text-slate-500">
                Mean override applied during quote adjustments
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Avg Estimate vs Final Diff
              </span>
              <div className="text-2xl font-mono font-black text-slate-900">
                {formatCopCurrency(summary.avg_estimate_to_final_diff_cop)}
              </div>
              <p className="text-[11px] text-slate-500 font-mono font-semibold">
                ({summary.avg_estimate_to_final_diff_pct > 0 ? "+" : ""}
                {summary.avg_estimate_to_final_diff_pct.toFixed(1)}% variance)
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Realized Gross Margin
              </span>
              <div className="text-2xl font-mono font-black text-emerald-600">
                {summary.avg_realized_margin_pct.toFixed(1)}%
              </div>
              <p className="text-[11px] text-slate-500">
                Target floor: 35.0% default margin
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl border border-slate-200/60 shadow-sm space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Service Calibration Status
              </span>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold font-mono">
                  {summary.underestimated_services_count} Underestimated
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold font-mono">
                  {summary.overestimated_services_count} Overestimated
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Based on historical hours & costs
              </p>
            </div>
          </div>

          {/* Service-Level Variance Calibration Breakdown */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Service Calibration & Deviation Analysis
            </h2>
            <p className="text-xs text-slate-500">
              Identifies which services consistently require manual adjustments or exhibit cost deviations.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="pb-3 px-2">SERVICE CATEGORY</th>
                    <th className="pb-3 px-2 text-center">QUOTES</th>
                    <th className="pb-3 px-2 text-right">AVG ESTIMATED PRICE</th>
                    <th className="pb-3 px-2 text-right">AVG FINAL PRICE</th>
                    <th className="pb-3 px-2 text-right">AVG MANUAL ADJ</th>
                    <th className="pb-3 px-2 text-right">CALIBRATION STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {summary.service_metrics.map((s, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-2 font-bold text-slate-900">
                        {s.service_name}
                      </td>
                      <td className="py-3.5 px-2 text-center font-mono font-semibold">
                        {s.quote_count}
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono text-slate-600">
                        {formatCopCurrency(s.avg_estimated_price)}
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900">
                        {formatCopCurrency(s.avg_final_price)}
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono text-purple-700 font-semibold">
                        {formatCopCurrency(s.avg_manual_adj)}
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase ${
                            s.variance_status === "underestimated"
                              ? "bg-amber-100 text-amber-800"
                              : s.variance_status === "overestimated"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {s.variance_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Estimated vs Actual Historical Comparison Table */}
          <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Estimated vs. Actual Project Performance
                </h2>
                <p className="text-xs text-slate-500">
                  Comparing estimated labor hours, freelancer costs, and duration against actual recorded execution metrics.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {summary.quote_comparisons.length} Projects Tracked
              </span>
            </div>

            {summary.quote_comparisons.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs italic bg-slate-50 rounded-xl border border-slate-200">
                No actual project costs logged yet. Log actual hours and costs inside the Quote Inspection Drawer to populate this view.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="pb-3 px-2">REF & CLIENT</th>
                      <th className="pb-3 px-2 text-center">EST VS ACT HOURS</th>
                      <th className="pb-3 px-2 text-right">EST VS ACT FREELANCER COST</th>
                      <th className="pb-3 px-2 text-right">FINAL PRICE</th>
                      <th className="pb-3 px-2 text-right">REALIZED MARGIN</th>
                      <th className="pb-3 px-2 text-right">OUTCOME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {summary.quote_comparisons.map((c) => (
                      <tr key={c.quote_id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-2">
                          <span className="font-mono font-bold text-slate-900 block">
                            {c.reference_number}
                          </span>
                          <span className="text-[11px] text-slate-400">
                            {c.client_name}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-center font-mono">
                          <span className="text-slate-500">{c.estimated_hours}h</span>
                          <span className="text-slate-300 mx-1">→</span>
                          <span className="font-bold text-slate-900">{c.actual_hours}h</span>
                          <span
                            className={`block text-[10px] ${
                              c.hours_variance > 0
                                ? "text-red-500"
                                : c.hours_variance < 0
                                ? "text-emerald-600"
                                : "text-slate-400"
                            }`}
                          >
                            ({c.hours_variance > 0 ? "+" : ""}{c.hours_variance}h)
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right font-mono">
                          <span className="text-slate-500 block text-[11px]">
                            Est: {formatCopCurrency(c.estimated_freelancer_cost)}
                          </span>
                          <span className="font-bold text-slate-900 block">
                            Act: {formatCopCurrency(c.actual_freelancer_cost)}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900 text-sm">
                          {formatCopCurrency(c.final_price)}
                        </td>
                        <td className="py-3.5 px-2 text-right font-mono font-bold text-emerald-600">
                          {(c.realized_margin * 100).toFixed(1)}%
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                              c.project_outcome === "on_budget" || c.project_outcome === "completed"
                                ? "bg-emerald-100 text-emerald-800"
                                : c.project_outcome === "over_budget"
                                ? "bg-red-100 text-red-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {c.project_outcome.replace("_", " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
