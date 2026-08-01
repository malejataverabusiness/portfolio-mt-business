"use client";

import { useEffect, useState } from "react";
import {
  getAdminQuotes,
  getAdminQuoteDetails,
  updateAdminQuoteFull,
  duplicateQuote,
  deleteQuote,
  getDeliverablesAdmin,
} from "@/lib/quote/actions/admin";
import { formatCopCurrency } from "@/lib/quote/utils";
import { QUOTE_STATUS_LABELS, QUOTE_STATUS_COLORS } from "@/lib/quote/constants";
import type { QuoteStatus, ComplexityLevel, Deliverable } from "@/lib/quote/types";

interface AuditLogEntry {
  id: string;
  action: string;
  field_changed: string;
  old_value: string | null;
  new_value: string | null;
  created_at: string;
}

interface AdminQuoteItem {
  id: string;
  reference_number: string;
  status: QuoteStatus;
  currency: string;
  cost_base: number;
  recommended_price: number;
  calculated_price: number;
  manual_adjustment: number;
  external_costs_total: number;
  final_price: number;
  valid_for_days: number;
  notes?: string;
  internal_notes?: string;
  snapshot?: Record<string, unknown> | null;
  created_at: string;
  clients?: {
    name?: string;
    email?: string;
    company?: string;
    phone?: string;
  } | null;
  quote_items?: Array<{
    id: string;
    deliverable_id: string;
    quantity: number;
    complexity: ComplexityLevel;
    calculated_cost: number;
    recommended_price: number;
    deliverables?: { name?: string; name_es?: string } | null;
  }>;
  audit_logs?: AuditLogEntry[];
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<AdminQuoteItem[]>([]);
  const [deliverablesCatalog, setDeliverablesCatalog] = useState<Deliverable[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | "all">("all");
  const [selectedQuote, setSelectedQuote] = useState<AdminQuoteItem | null>(null);
  const [activeDrawerTab, setActiveDrawerTab] = useState<"overview" | "scope" | "overrides" | "actuals" | "audit">("overview");
  const [actionLoading, setActionLoading] = useState(false);

  // Editable form state for active drawer quote
  const [editableItems, setEditableItems] = useState<
    Array<{ deliverable_id: string; quantity: number; complexity: ComplexityLevel }>
  >([]);
  const [manualAdj, setManualAdj] = useState(0);
  const [externalCosts, setExternalCosts] = useState(0);
  const [notes, setNotes] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  const loadQuotes = async () => {
    setLoading(true);
    try {
      const data = await getAdminQuotes({ search, status: statusFilter });
      setQuotes(data as unknown as AdminQuoteItem[]);
    } catch (err) {
      console.error("Failed to load quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
    getDeliverablesAdmin().then((delivs) =>
      setDeliverablesCatalog(delivs as unknown as Deliverable[])
    );
  }, [search, statusFilter]);

  // Keyboard Escape listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedQuote) {
        setSelectedQuote(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedQuote]);

  const handleOpenDetail = async (quote: AdminQuoteItem) => {
    setSelectedQuote(quote);
    setActiveDrawerTab("overview");
    setManualAdj(quote.manual_adjustment || 0);
    setExternalCosts(quote.external_costs_total || 0);
    setNotes(quote.notes || "");
    setInternalNotes(quote.internal_notes || "");

    try {
      const fullDetails = await getAdminQuoteDetails(quote.id);
      const detailObj = fullDetails as unknown as AdminQuoteItem;
      setSelectedQuote(detailObj);

      if (detailObj.quote_items) {
        setEditableItems(
          detailObj.quote_items.map((it) => ({
            deliverable_id: it.deliverable_id,
            quantity: it.quantity,
            complexity: it.complexity,
          }))
        );
      }
    } catch (err) {
      console.error("Error loading quote details:", err);
    }
  };

  const handleSaveFullQuote = async () => {
    if (!selectedQuote) return;
    setActionLoading(true);
    try {
      await updateAdminQuoteFull(selectedQuote.id, {
        items: editableItems,
        manual_adjustment: Number(manualAdj),
        external_costs_total: Number(externalCosts),
        notes,
        internal_notes: internalNotes,
        status: selectedQuote.status,
      });

      alert("Quote scope and pricing updated successfully!");
      const refreshed = await getAdminQuoteDetails(selectedQuote.id);
      setSelectedQuote(refreshed as unknown as AdminQuoteItem);
      await loadQuotes();
    } catch (err) {
      alert(`Error updating quote: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleStatusChange = async (quoteId: string, newStatus: QuoteStatus) => {
    setActionLoading(true);
    try {
      await updateAdminQuoteFull(quoteId, {
        status: newStatus,
      });
      if (selectedQuote?.id === quoteId) {
        const refreshed = await getAdminQuoteDetails(quoteId);
        setSelectedQuote(refreshed as unknown as AdminQuoteItem);
      }
      await loadQuotes();
    } catch (err) {
      alert(`Failed to update status: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDuplicate = async (quoteId: string) => {
    if (!confirm("Are you sure you want to duplicate this quote?")) return;
    setActionLoading(true);
    try {
      const newQuote = await duplicateQuote(quoteId);
      alert(`Quote duplicated as ${newQuote.reference_number}`);
      await loadQuotes();
    } catch (err) {
      alert(`Failed to duplicate: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (quoteId: string) => {
    if (!confirm("Are you sure you want to delete this quote permanently?")) return;
    setActionLoading(true);
    try {
      await deleteQuote(quoteId);
      if (selectedQuote?.id === quoteId) setSelectedQuote(null);
      await loadQuotes();
    } catch (err) {
      alert(`Failed to delete quote: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddItemToScope = () => {
    if (deliverablesCatalog.length === 0) return;
    setEditableItems([
      ...editableItems,
      {
        deliverable_id: deliverablesCatalog[0].id,
        quantity: 1,
        complexity: "standard",
      },
    ]);
  };

  const handleRemoveItemFromScope = (index: number) => {
    setEditableItems(editableItems.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Quote Management & Audit Console
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review client answers, modify scope deliverables, apply manual pricing overrides, and store immutable snapshots.
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Status Filters */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <label htmlFor="quoteSearch" className="sr-only">
            Search Quotes
          </label>
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-lg" aria-hidden="true">
            search
          </span>
          <input
            id="quoteSearch"
            type="text"
            placeholder="Search by reference number (e.g. MTB-Q-2026)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" role="group" aria-label="Status filter">
          {(
            [
              "all",
              "draft",
              "submitted",
              "under_review",
              "adjusted",
              "approved",
              "sent",
              "accepted",
              "declined",
              "expired",
            ] as const
          ).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              aria-pressed={statusFilter === st}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                statusFilter === st
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st === "all"
                ? "All Quotes"
                : QUOTE_STATUS_LABELS[st as keyof typeof QUOTE_STATUS_LABELS]?.en || st}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Master Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading quotes database...
          </div>
        ) : quotes.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No quotes found matching your filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider sticky top-0 bg-slate-50/90 backdrop-blur-md">
                  <th className="pb-3 px-2">REFERENCE</th>
                  <th className="pb-3 px-2">CLIENT</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2 text-right">COST BASE</th>
                  <th className="pb-3 px-2 text-right">REC. PRICE</th>
                  <th className="pb-3 px-2 text-right">FINAL QUOTED</th>
                  <th className="pb-3 px-2 text-right">SNAPSHOT</th>
                  <th className="pb-3 px-2 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map((q) => {
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
                      <td className="py-3.5 px-2 text-right text-slate-600 font-mono">
                        {formatCopCurrency(q.cost_base || 0)}
                      </td>
                      <td className="py-3.5 px-2 text-right text-slate-600 font-mono">
                        {formatCopCurrency(q.recommended_price || 0)}
                      </td>
                      <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900 text-sm">
                        {formatCopCurrency(q.final_price || 0)}
                      </td>
                      <td className="py-3.5 px-2 text-right">
                        {q.snapshot ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-[11px] font-semibold">
                            <span className="material-symbols-outlined text-xs" aria-hidden="true">lock</span>
                            Stored
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Draft</span>
                        )}
                      </td>
                      <td className="py-3.5 px-2 text-right space-x-1">
                        <button
                          onClick={() => handleOpenDetail(q)}
                          aria-label={`Inspect quote ${q.reference_number}`}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-[11px] hover:bg-slate-800 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                        >
                          Inspect & Edit
                        </button>
                        <button
                          onClick={() => handleDuplicate(q.id)}
                          aria-label={`Duplicate quote ${q.reference_number}`}
                          title="Duplicate Quote"
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                        >
                          <span className="material-symbols-outlined text-sm" aria-hidden="true">
                            content_copy
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Admin Quote Inspection & Scope Modification Drawer */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Inspection Drawer for ${selectedQuote.reference_number}`}
            className="w-full max-w-3xl bg-white h-full overflow-y-auto p-6 md:p-8 shadow-2xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold font-mono text-slate-900">
                      {selectedQuote.reference_number}
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase ${
                        QUOTE_STATUS_COLORS[selectedQuote.status] ||
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {selectedQuote.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Client: <span className="font-semibold text-slate-900">{selectedQuote.clients?.name || "Anonymous"}</span> ({selectedQuote.clients?.email || "No email"})
                  </p>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  aria-label="Close drawer"
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">close</span>
                </button>
              </div>

              {/* Status Lifecycle Transition Buttons */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Transition Lifecycle Status (Finalizing status generates immutable snapshot)
                </label>
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Status transitions">
                  {(
                    [
                      "draft",
                      "submitted",
                      "under_review",
                      "adjusted",
                      "approved",
                      "sent",
                      "accepted",
                      "declined",
                      "expired",
                    ] as const
                  ).map((st) => (
                    <button
                      key={st}
                      disabled={actionLoading}
                      onClick={() => handleStatusChange(selectedQuote.id, st)}
                      aria-pressed={selectedQuote.status === st}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                        selectedQuote.status === st
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {QUOTE_STATUS_LABELS[st]?.en || st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Drawer Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200" role="tablist">
                {[
                  { id: "overview", label: "Overview & Pricing" },
                  { id: "scope", label: "Scope & Deliverables" },
                  { id: "overrides", label: "Overrides & Notes" },
                  { id: "actuals", label: "Actual Costs & Calibration" },
                  { id: "audit", label: "Snapshot & Audit Logs" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    role="tab"
                    aria-selected={activeDrawerTab === tab.id}
                    onClick={() => setActiveDrawerTab(tab.id as typeof activeDrawerTab)}
                    className={`px-3 py-2 text-xs font-bold transition-all border-b-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      activeDrawerTab === tab.id
                        ? "border-slate-900 text-slate-900"
                        : "border-transparent text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB 1: OVERVIEW & ADMIN-ONLY FINANCIAL BREAKDOWN */}
              {activeDrawerTab === "overview" && (
                <div className="space-y-6 text-xs animate-fade-in">
                  <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-200/60">
                    <h3 className="font-bold text-slate-900 text-sm mb-1">
                      Internal Cost & Margin Analysis (Admin Only)
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      These internal cost breakdowns and margins are strictly isolated from client views.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[11px]">Internal Cost Base</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {formatCopCurrency(selectedQuote.cost_base || 0)}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[11px]">Recommended Price</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {formatCopCurrency(selectedQuote.recommended_price || 0)}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[11px]">Calculated Price</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {formatCopCurrency(selectedQuote.calculated_price || 0)}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[11px]">Manual Adjustment</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {formatCopCurrency(selectedQuote.manual_adjustment || 0)}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[11px]">External Costs</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        {formatCopCurrency(selectedQuote.external_costs_total || 0)}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900 text-white rounded-xl shadow-sm">
                      <span className="text-slate-300 block text-[11px]">Final Quoted Price</span>
                      <span className="text-base font-bold font-mono text-white">
                        {formatCopCurrency(selectedQuote.final_price || 0)}
                      </span>
                    </div>
                  </div>

                  {/* Items Summary Table */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900">Current Scope Deliverables</h3>
                    <div className="border border-slate-200 rounded-xl overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-400">
                          <tr>
                            <th className="py-2 px-3">DELIVERABLE</th>
                            <th className="py-2 px-3 text-center">QTY</th>
                            <th className="py-2 px-3">COMPLEXITY</th>
                            <th className="py-2 px-3 text-right">REC. PRICE</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {selectedQuote.quote_items?.map((it) => (
                            <tr key={it.id}>
                              <td className="py-2 px-3 font-semibold text-slate-900">
                                {it.deliverables?.name || it.deliverable_id}
                              </td>
                              <td className="py-2 px-3 text-center font-bold">
                                {it.quantity}
                              </td>
                              <td className="py-2 px-3">
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-semibold uppercase">
                                  {it.complexity}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                                {formatCopCurrency(it.recommended_price || 0)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SCOPE & DELIVERABLES EDITOR */}
              {activeDrawerTab === "scope" && (
                <div className="space-y-4 text-xs animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Modify Scope & Deliverables
                      </h3>
                      <p className="text-slate-500 text-[11px]">
                        Add, remove, or adjust quantities and complexity. Pricing recalculates automatically.
                      </p>
                    </div>
                    <button
                      onClick={handleAddItemToScope}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">add</span>
                      Add Item
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editableItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3"
                      >
                        <div className="flex-1">
                          <label htmlFor={`deliv_${idx}`} className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Deliverable
                          </label>
                          <select
                            id={`deliv_${idx}`}
                            value={item.deliverable_id}
                            onChange={(e) => {
                              const updated = [...editableItems];
                              updated[idx].deliverable_id = e.target.value;
                              setEditableItems(updated);
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                          >
                            {deliverablesCatalog.map((d) => (
                              <option key={d.id} value={d.id}>
                                {d.name} ({d.estimated_hours}h base)
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="w-24">
                          <label htmlFor={`qty_${idx}`} className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Quantity
                          </label>
                          <input
                            id={`qty_${idx}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const updated = [...editableItems];
                              updated[idx].quantity = Number(e.target.value);
                              setEditableItems(updated);
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                          />
                        </div>

                        <div className="w-32">
                          <label htmlFor={`cmplx_${idx}`} className="block text-[11px] font-semibold text-slate-500 mb-1">
                            Complexity
                          </label>
                          <select
                            id={`cmplx_${idx}`}
                            value={item.complexity}
                            onChange={(e) => {
                              const updated = [...editableItems];
                              updated[idx].complexity = e.target.value as ComplexityLevel;
                              setEditableItems(updated);
                            }}
                            className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                          >
                            <option value="basic">Basic (0.7x)</option>
                            <option value="standard">Standard (1.0x)</option>
                            <option value="advanced">Advanced (1.4x)</option>
                            <option value="enterprise">Enterprise (2.0x)</option>
                          </select>
                        </div>

                        <button
                          onClick={() => handleRemoveItemFromScope(idx)}
                          aria-label="Remove deliverable item"
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg self-end md:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                        >
                          <span className="material-symbols-outlined text-base" aria-hidden="true">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      disabled={actionLoading}
                      onClick={handleSaveFullQuote}
                      className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-slate-900"
                    >
                      {actionLoading ? "Recalculating..." : "Save Scope & Recalculate"}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: PRICING OVERRIDES & NOTES */}
              {activeDrawerTab === "overrides" && (
                <div className="space-y-4 text-xs animate-fade-in">
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-200/60 space-y-3">
                    <div>
                      <label htmlFor="manualAdjInput" className="block font-semibold text-slate-700 mb-1">
                        Manual Price Adjustment (COP)
                      </label>
                      <input
                        id="manualAdjInput"
                        type="number"
                        value={manualAdj}
                        onChange={(e) => setManualAdj(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-slate-900 font-bold focus-visible:ring-2 focus-visible:ring-slate-900"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Calculated price: {formatCopCurrency(selectedQuote.calculated_price || 0)}. Override modifies final price.
                      </p>
                    </div>

                    <div>
                      <label htmlFor="externalCostsInput" className="block font-semibold text-slate-700 mb-1">
                        External Costs Total (COP)
                      </label>
                      <input
                        id="externalCostsInput"
                        type="number"
                        value={externalCosts}
                        onChange={(e) => setExternalCosts(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg font-mono text-slate-900 font-bold focus-visible:ring-2 focus-visible:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="publicNotesInput" className="block font-semibold text-slate-700 mb-1">
                        Public Client Notes
                      </label>
                      <textarea
                        id="publicNotesInput"
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                      />
                    </div>

                    <div>
                      <label htmlFor="internalNotesInput" className="block font-semibold text-slate-700 mb-1">
                        Internal Admin Notes (Private)
                      </label>
                      <textarea
                        id="internalNotesInput"
                        rows={2}
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        disabled={actionLoading}
                        onClick={handleSaveFullQuote}
                        className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900"
                      >
                        {actionLoading ? "Saving..." : "Save Overrides & Notes"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: IMMUTABLE PRICING SNAPSHOT & AUDIT LOGS */}
              {activeDrawerTab === "audit" && (
                <div className="space-y-6 text-xs animate-fade-in">
                  {/* Historical Snapshot View */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Immutable Pricing Snapshot
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Stored at the moment of submission or quote finalization to protect historical pricing stability.
                    </p>
                    {selectedQuote.snapshot ? (
                      <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] overflow-x-auto max-h-60">
                        {JSON.stringify(selectedQuote.snapshot, null, 2)}
                      </pre>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 italic text-[11px]">
                        No pricing snapshot stored yet. Finalizing status (e.g. Sent, Approved, Accepted) creates a snapshot automatically.
                      </div>
                    )}
                  </div>

                  {/* Audit Logs History Table */}
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Audit History Log
                    </h3>
                    {selectedQuote.audit_logs && selectedQuote.audit_logs.length > 0 ? (
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200 text-slate-400">
                            <tr>
                              <th className="py-2 px-3">ACTION</th>
                              <th className="py-2 px-3">FIELD</th>
                              <th className="py-2 px-3">OLD VALUE</th>
                              <th className="py-2 px-3">NEW VALUE</th>
                              <th className="py-2 px-3 text-right">DATE</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {selectedQuote.audit_logs.map((log) => (
                              <tr key={log.id}>
                                <td className="py-2 px-3 font-semibold text-slate-900">
                                  {log.action}
                                </td>
                                <td className="py-2 px-3 font-mono text-purple-700">
                                  {log.field_changed}
                                </td>
                                <td className="py-2 px-3 text-slate-500 truncate max-w-[100px]">
                                  {log.old_value || "—"}
                                </td>
                                <td className="py-2 px-3 font-bold text-slate-900 truncate max-w-[100px]">
                                  {log.new_value || "—"}
                                </td>
                                <td className="py-2 px-3 text-right text-slate-400 text-[11px]">
                                  {new Date(log.created_at).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 italic text-[11px]">
                        No audit log entries recorded for this quote yet.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between mt-6">
              <button
                disabled={actionLoading}
                onClick={() => handleDelete(selectedQuote.id)}
                className="text-xs font-semibold text-red-600 hover:text-red-800 flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                <span className="material-symbols-outlined text-sm" aria-hidden="true">delete</span>
                Delete Permanently
              </button>
              <div className="flex items-center gap-2">
                <a
                  href="/quote/admin/proposals"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600"
                >
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">description</span>
                  Convert to Proposal
                </a>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  Close Drawer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
