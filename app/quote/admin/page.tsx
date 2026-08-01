"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminDashboardMetrics } from "@/lib/quote/actions/admin";
import { formatCopCurrency } from "@/lib/quote/utils";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/lib/quote/constants";

interface DashboardMetrics {
  totalQuotes: number;
  draftCount: number;
  reviewCount: number;
  approvedCount: number;
  acceptedCount: number;
  totalQuotedValue: number;
  acceptedRevenue: number;
  recentQuotes: Array<{
    id: string;
    reference_number: string;
    status: string;
    final_price: number;
    created_at: string;
    clients?: { name?: string; email?: string; company?: string } | null;
  }>;
}

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAdminDashboardMetrics();
        setMetrics(data as unknown as DashboardMetrics);
      } catch (err) {
        console.error("Failed to load dashboard metrics", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Overview of live quote activity, revenues, and pending estimates.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/quote/admin/quotes"
            className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">request_quote</span>
            Manage All Quotes
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Quotes",
            value: loading ? "..." : (metrics?.totalQuotes ?? 0),
            icon: "request_quote",
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
          {
            label: "Pending / Review",
            value: loading ? "..." : (metrics?.reviewCount ?? 0) + (metrics?.draftCount ?? 0),
            icon: "pending_actions",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Accepted Quotes",
            value: loading ? "..." : (metrics?.acceptedCount ?? 0),
            icon: "check_circle",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Accepted Revenue",
            value: loading
              ? "..."
              : formatCopCurrency(metrics?.acceptedRevenue ?? 0),
            icon: "payments",
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}
              >
                <span className={`material-symbols-outlined text-xl ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight truncate">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Quotes Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Recent Quotes</h2>
            <p className="text-xs text-slate-500">
              Latest client submissions and manual adjustments
            </p>
          </div>
          <Link
            href="/quote/admin/quotes"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            Loading recent quotes...
          </div>
        ) : !metrics?.recentQuotes || metrics.recentQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-3xl text-slate-300">
                inbox
              </span>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              No quotes submitted yet. They will appear here when clients create estimates.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-medium">
                  <th className="pb-3 px-2">REFERENCE</th>
                  <th className="pb-3 px-2">CLIENT</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2 text-right">FINAL VALUE (COP)</th>
                  <th className="pb-3 px-2 text-right">DATE</th>
                  <th className="pb-3 px-2 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {metrics.recentQuotes.map((q) => {
                  const statusKey = q.status as keyof typeof QUOTE_STATUS_LABELS;
                  const label =
                    QUOTE_STATUS_LABELS[statusKey]?.en || q.status;
                  const badgeColor =
                    QUOTE_STATUS_COLORS[q.status] || "bg-slate-100 text-slate-700";

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      <td className="py-3.5 px-2 font-mono font-bold text-slate-900">
                        {q.reference_number}
                      </td>
                      <td className="py-3.5 px-2 text-slate-700 font-medium">
                        {q.clients?.name || "Anonymous Client"}
                        {q.clients?.company && (
                          <span className="block text-[11px] text-slate-400 font-normal">
                            {q.clients.company}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-2">
                        <span
                          className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${badgeColor}`}
                        >
                          {label}
                        </span>
                      </td>
                      <td className="py-3.5 px-2 text-right font-bold text-slate-900">
                        {formatCopCurrency(q.final_price || 0)}
                      </td>
                      <td className="py-3.5 px-2 text-right text-slate-400">
                        {new Date(q.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        <Link
                          href={`/quote/admin/quotes?id=${q.id}`}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-[11px] transition-all"
                        >
                          View / Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Global Pricing Settings",
            desc: "Configure target margins, contingency tiers & urgency factors",
            icon: "tune",
            href: "/quote/admin/pricing",
          },
          {
            title: "Rate Cards & Roles",
            desc: "Manage junior, mid, senior and internal MTB hourly rates",
            icon: "sell",
            href: "/quote/admin/rates",
          },
          {
            title: "Services & Deliverables",
            desc: "Manage deliverable catalog, hours baselines & categories",
            icon: "inventory_2",
            href: "/quote/admin/deliverables",
          },
        ].map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-slate-900 transition-colors">
                {action.icon}
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {action.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {action.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
