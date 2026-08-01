"use client";

import type { ProposalContent } from "@/lib/quote/types";

interface StandardProposalTemplateProps {
  content: ProposalContent;
  proposalNumber: string;
  version: number;
}

export default function StandardProposalTemplate({
  content,
  proposalNumber,
  version,
}: StandardProposalTemplateProps) {
  const {
    mtbInfo,
    clientInfo,
    projectObjective,
    projectScope,
    services,
    deliverables,
    estimatedTimeline,
    investment,
    paymentTerms,
    includedRevisions,
    exclusions,
    externalCostsNotice,
    termsAndConditions,
    proposalValidityDays,
    scopeDisclaimer,
  } = content;

  return (
    <div className="bg-white text-slate-900 font-sans p-8 md:p-12 max-w-4xl mx-auto space-y-10 border border-slate-200 shadow-xl rounded-2xl print:shadow-none print:border-none print:p-0">
      {/* 1 & 2. HEADER: MTB LABS & CLIENT INFO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">
              M
            </div>
            <h1 className="text-xl font-black tracking-tight">{mtbInfo.companyName}</h1>
          </div>
          <p className="text-xs text-slate-500 font-medium">{mtbInfo.tagline}</p>
          <p className="text-[11px] text-slate-400 font-mono">{mtbInfo.contactEmail} • {mtbInfo.website}</p>
        </div>

        <div className="text-right space-y-1 text-xs">
          <div className="inline-block px-3 py-1 bg-slate-100 rounded-md font-mono font-bold text-slate-900 text-sm">
            {proposalNumber} (v{version})
          </div>
          <p className="text-slate-500 pt-1">
            Prepared for: <span className="font-bold text-slate-900">{clientInfo.name}</span>
          </p>
          {clientInfo.company && (
            <p className="text-slate-500 font-semibold">{clientInfo.company}</p>
          )}
          <p className="text-slate-400">{clientInfo.email}</p>
        </div>
      </div>

      {/* 3. PROJECT OBJECTIVE */}
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
          01. Project Objective
        </h2>
        <p className="text-sm font-medium text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
          {projectObjective}
        </p>
      </div>

      {/* 4. PROJECT SCOPE OVERVIEW */}
      <div className="space-y-2">
        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
          02. Project Scope Overview
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">{projectScope}</p>
      </div>

      {/* 5 & 6. SERVICES & DELIVERABLES TABLE */}
      <div className="space-y-3">
        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
          03. Services & Deliverables
        </h2>

        {/* Services List */}
        <div className="flex flex-wrap gap-2 mb-3">
          {services.map((srv, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-md bg-purple-50 text-purple-800 font-semibold text-xs border border-purple-100"
            >
              {srv}
            </span>
          ))}
        </div>

        {/* Deliverables Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
              <tr>
                <th className="py-3 px-4">DELIVERABLE ITEM</th>
                <th className="py-3 px-4">SPECIFICATION</th>
                <th className="py-3 px-4 text-center">QTY</th>
                <th className="py-3 px-4 text-right">COMPLEXITY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliverables.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-4 font-bold text-slate-900">{item.name}</td>
                  <td className="py-3 px-4 text-slate-500">{item.description}</td>
                  <td className="py-3 px-4 text-center font-bold font-mono">
                    {item.quantity}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold uppercase text-slate-700">
                      {item.complexity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 7. ESTIMATED TIMELINE */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
            04. Estimated Timeline & Milestones
          </h2>
          <span className="text-xs font-bold text-slate-700 font-mono">
            {estimatedTimeline.durationWeeks} Weeks Total Duration
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {estimatedTimeline.milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{m.name}</span>
                <span className="font-mono text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                  Week {m.week}
                </span>
              </div>
              <p className="text-slate-500 text-[11px]">{m.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 8. INVESTMENT TOTAL */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-2 flex flex-col md:flex-row md:items-center justify-between shadow-lg">
        <div>
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
            05. Total Commercial Investment
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            All-inclusive total investment for specified scope and deliverables.
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl md:text-4xl font-mono font-black text-white">
            {investment.formattedTotal}
          </div>
          <span className="text-[11px] text-slate-400 font-mono uppercase">
            COP (Colombian Pesos)
          </span>
        </div>
      </div>

      {/* 9 & 10. PAYMENT TERMS & INCLUDED REVISIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900">06. Payment Terms</h3>
          <ul className="space-y-1 text-slate-600 list-disc list-inside">
            {paymentTerms.map((term, idx) => (
              <li key={idx}>{term}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h3 className="font-bold text-slate-900">07. Included Revisions</h3>
          <p className="text-slate-600">
            Includes <span className="font-bold text-slate-900">{includedRevisions} comprehensive revision rounds</span> per deliverable sprint prior to sign-off.
          </p>
        </div>
      </div>

      {/* 11 & 12. EXCLUSIONS & EXTERNAL COSTS */}
      <div className="space-y-3 text-xs">
        <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400">
          08. Scope Exclusions & External Costs
        </h2>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
          <ul className="space-y-1 text-slate-600 list-disc list-inside">
            {exclusions.map((exc, idx) => (
              <li key={idx}>{exc}</li>
            ))}
          </ul>
          {externalCostsNotice && (
            <p className="text-[11px] text-slate-500 font-medium pt-2 border-t border-slate-200">
              Note: {externalCostsNotice}
            </p>
          )}
        </div>
      </div>

      {/* 13, 14 & 15. TERMS, VALIDITY & DISCLAIMER */}
      <div className="space-y-4 text-xs pt-4 border-t border-slate-200">
        <div>
          <h2 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
            09. Terms & Conditions
          </h2>
          <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
            {termsAndConditions.map((tc, idx) => (
              <li key={idx}>{tc}</li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
          <span className="font-bold block mb-0.5">Scope Disclaimer & Proposal Validity</span>
          {scopeDisclaimer} (Valid for {proposalValidityDays} days from issuance).
        </div>
      </div>
    </div>
  );
}
