"use client";

import { useState } from "react";
import StandardProposalTemplate from "./templates/StandardProposalTemplate";
import { saveProposalVersion, updateProposalStatus } from "@/lib/quote/actions/proposals";
import type { ProposalRecord, ProposalContent, ProposalStatus } from "@/lib/quote/types";

interface ProposalEditorModalProps {
  proposal: ProposalRecord;
  onClose: () => void;
  onRefresh: () => void;
}

export default function ProposalEditorModal({
  proposal,
  onClose,
  onRefresh,
}: ProposalEditorModalProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "editor" | "versions">("preview");
  const [content, setContent] = useState<ProposalContent>(proposal.content);
  const [investmentInput, setInvestmentInput] = useState<number>(proposal.total_investment);
  const [status, setStatus] = useState<ProposalStatus>(proposal.status);
  const [saving, setSaving] = useState(false);

  const handleSaveNewVersion = async () => {
    setSaving(true);
    try {
      await saveProposalVersion(proposal.id, content, Number(investmentInput));
      alert("New proposal version saved successfully!");
      onRefresh();
    } catch (err) {
      alert(`Error saving version: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (newStatus: ProposalStatus) => {
    setSaving(true);
    try {
      await updateProposalStatus(proposal.id, newStatus);
      setStatus(newStatus);
      onRefresh();
    } catch (err) {
      alert(`Failed to update status: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 md:p-6 overflow-y-auto">
      <div className="w-full max-w-5xl bg-slate-100 rounded-3xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        {/* Top Control Header */}
        <div className="px-6 py-4 bg-white border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-slate-900 bg-slate-100 px-3 py-1 rounded-lg text-xs">
              {proposal.proposal_number} (v{proposal.version})
            </span>
            <span
              className={`px-2.5 py-0.5 rounded-md text-xs font-semibold uppercase ${
                status === "accepted"
                  ? "bg-emerald-100 text-emerald-800"
                  : status === "sent"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-slate-200 text-slate-700"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "preview"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Preview & PDF
            </button>
            <button
              onClick={() => setActiveTab("editor")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "editor"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Edit Content
            </button>
            <button
              onClick={() => setActiveTab("versions")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "versions"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Versions ({proposal.proposal_versions?.length || 1})
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPdf}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-all shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>

        {/* Status Transition Bar */}
        <div className="px-6 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-2 text-xs print:hidden">
          <span className="text-slate-500 font-semibold">Change Status:</span>
          {(["draft", "sent", "accepted", "declined"] as const).map((st) => (
            <button
              key={st}
              disabled={saving}
              onClick={() => handleStatusChange(st)}
              className={`px-2.5 py-0.5 rounded text-[11px] font-semibold transition-all ${
                status === st
                  ? "bg-slate-900 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: PREVIEW & PDF */}
          {activeTab === "preview" && (
            <div className="space-y-4">
              <StandardProposalTemplate
                content={content}
                proposalNumber={proposal.proposal_number}
                version={proposal.version}
              />
            </div>
          )}

          {/* TAB 2: EDITABLE PROPOSAL FIELDS */}
          {activeTab === "editor" && (
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6 text-xs">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Edit Proposal Content & Save New Version
                </h3>
                <p className="text-slate-500 text-xs">
                  Modifying fields will save a new version snapshot (v{proposal.version + 1}) without overwriting previously issued versions.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Project Objective
                  </label>
                  <textarea
                    rows={3}
                    value={content.projectObjective}
                    onChange={(e) =>
                      setContent({ ...content, projectObjective: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Project Scope Overview
                  </label>
                  <textarea
                    rows={3}
                    value={content.projectScope}
                    onChange={(e) =>
                      setContent({ ...content, projectScope: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Total Investment Amount (COP)
                  </label>
                  <input
                    type="number"
                    value={investmentInput}
                    onChange={(e) => setInvestmentInput(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Included Revision Rounds
                  </label>
                  <input
                    type="number"
                    value={content.includedRevisions}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        includedRevisions: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Scope Disclaimer & Validity Notice
                  </label>
                  <textarea
                    rows={3}
                    value={content.scopeDisclaimer}
                    onChange={(e) =>
                      setContent({ ...content, scopeDisclaimer: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setContent(proposal.content)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-medium"
                >
                  Reset Changes
                </button>
                <button
                  disabled={saving}
                  onClick={handleSaveNewVersion}
                  className="px-6 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-sm"
                >
                  {saving ? "Saving New Version..." : `Save Version v${proposal.version + 1}`}
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: PROPOSAL VERSIONS HISTORY */}
          {activeTab === "versions" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-4 text-xs">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-200 pb-2">
                Historical Proposal Versions
              </h3>
              <p className="text-slate-500 text-xs">
                Every version saved is preserved permanently to ensure audit compliance.
              </p>

              <div className="space-y-3">
                {proposal.proposal_versions?.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        Version {v.version_number}
                      </span>
                      <p className="text-slate-400 text-[11px]">
                        Saved on {new Date(v.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 text-sm">
                        {v.content_snapshot.investment.formattedTotal}
                      </span>
                      <button
                        onClick={() => {
                          setContent(v.content_snapshot);
                          setActiveTab("preview");
                        }}
                        className="block mt-1 text-[11px] text-purple-600 hover:underline font-semibold"
                      >
                        Load Version Preview
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
