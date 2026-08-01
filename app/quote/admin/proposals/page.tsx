"use client";

import { useEffect, useState } from "react";
import {
  getAdminProposals,
  getProposalDetails,
  createProposalFromQuote,
  deleteProposal,
} from "@/lib/quote/actions/proposals";
import { getAdminQuotes } from "@/lib/quote/actions/admin";
import ProposalEditorModal from "@/components/quote/proposals/ProposalEditorModal";
import { formatCopCurrency } from "@/lib/quote/utils";
import type { ProposalRecord, ProposalStatus } from "@/lib/quote/types";

export default function AdminProposalsPage() {
  const [proposals, setProposals] = useState<ProposalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProposal, setSelectedProposal] = useState<ProposalRecord | null>(null);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [approvedQuotes, setApprovedQuotes] = useState<
    Array<{ id: string; reference_number: string; final_price: number; clients?: { name?: string; company?: string } | null }>
  >([]);
  const [selectedQuoteId, setSelectedQuoteId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAdminProposals(search);
      setProposals(data as unknown as ProposalRecord[]);
    } catch (err) {
      console.error("Error loading proposals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [search]);

  const handleOpenConvertModal = async () => {
    try {
      const quotes = await getAdminQuotes();
      const eligible = quotes.filter((q) =>
        ["adjusted", "approved", "sent", "accepted", "draft", "submitted"].includes(q.status)
      );
      setApprovedQuotes(eligible as unknown as typeof approvedQuotes);
      if (eligible.length > 0) setSelectedQuoteId(eligible[0].id);
      setShowConvertModal(true);
    } catch (err) {
      alert(`Error loading quotes: ${(err as Error).message}`);
    }
  };

  const handleConvertQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuoteId) return alert("Select a quote to convert");

    setActionLoading(true);
    try {
      const prop = await createProposalFromQuote(selectedQuoteId);
      setShowConvertModal(false);
      const details = await getProposalDetails(prop.id);
      setSelectedProposal(details);
      await loadData();
    } catch (err) {
      alert(`Error creating proposal: ${(err as Error).message}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleInspectProposal = async (id: string) => {
    try {
      const details = await getProposalDetails(id);
      setSelectedProposal(details);
    } catch (err) {
      alert(`Error loading proposal: ${(err as Error).message}`);
    }
  };

  const handleDeleteProposal = async (id: string) => {
    if (!confirm("Are you sure you want to delete this proposal permanently?")) return;
    try {
      await deleteProposal(id);
      if (selectedProposal?.id === id) setSelectedProposal(null);
      await loadData();
    } catch (err) {
      alert(`Error deleting proposal: ${(err as Error).message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Commercial Proposal Generator
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Convert reviewed quotes into commercial proposals, manage version history, and generate PDFs.
          </p>
        </div>
        <button
          onClick={handleOpenConvertModal}
          className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-sm flex items-center gap-2 self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-sm">note_add</span>
          Convert Quote to Proposal
        </button>
      </div>

      {/* Search */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-2.5 text-slate-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search proposals by number (e.g. PROP-2026), client, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          />
        </div>
      </div>

      {/* Proposals Table */}
      <div className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading proposals database...
          </div>
        ) : proposals.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">
            No proposals generated yet. Click &quot;Convert Quote to Proposal&quot; to begin.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="pb-3 px-2">PROPOSAL REF</th>
                  <th className="pb-3 px-2">CLIENT / COMPANY</th>
                  <th className="pb-3 px-2">VERSION</th>
                  <th className="pb-3 px-2">STATUS</th>
                  <th className="pb-3 px-2 text-right">TOTAL INVESTMENT</th>
                  <th className="pb-3 px-2 text-right">ISSUED DATE</th>
                  <th className="pb-3 px-2 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {proposals.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-2 font-mono font-bold text-slate-900">
                      {p.proposal_number}
                    </td>
                    <td className="py-3.5 px-2 text-slate-700 font-medium">
                      {p.client_name}
                      {p.client_company && (
                        <span className="block text-[11px] text-slate-400 font-normal">
                          {p.client_company}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-2">
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold text-[11px]">
                        v{p.version}
                      </span>
                    </td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold uppercase ${
                          p.status === "accepted"
                            ? "bg-emerald-100 text-emerald-800"
                            : p.status === "sent"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right font-mono font-bold text-slate-900 text-sm">
                      {formatCopCurrency(p.total_investment || 0)}
                    </td>
                    <td className="py-3.5 px-2 text-right text-slate-400">
                      {new Date(p.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-2 text-right space-x-1">
                      <button
                        onClick={() => handleInspectProposal(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-semibold text-[11px] hover:bg-slate-800 shadow-sm"
                      >
                        Preview / Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProposal(p.id)}
                        className="p-1.5 rounded-lg bg-slate-100 text-red-600 hover:bg-red-50 text-xs inline-flex items-center"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Convert Quote Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                Convert Quote to Commercial Proposal
              </h2>
              <button
                onClick={() => setShowConvertModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            </div>

            <form onSubmit={handleConvertQuote} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Target Quote
                </label>
                <select
                  value={selectedQuoteId}
                  onChange={(e) => setSelectedQuoteId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-medium"
                >
                  {approvedQuotes.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.reference_number} — {q.clients?.name || "Client"} (
                      {formatCopCurrency(q.final_price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-purple-50 rounded-xl border border-purple-200/60 text-[11px] text-purple-900 leading-relaxed">
                This will structure a commercial proposal with zero internal rates, freelancer costs, or margins exposed to the client.
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowConvertModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 shadow-sm"
                >
                  {actionLoading ? "Generating Proposal..." : "Generate Proposal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Proposal Editor & Preview Modal */}
      {selectedProposal && (
        <ProposalEditorModal
          proposal={selectedProposal}
          onClose={() => setSelectedProposal(null)}
          onRefresh={() => handleInspectProposal(selectedProposal.id)}
        />
      )}
    </div>
  );
}
