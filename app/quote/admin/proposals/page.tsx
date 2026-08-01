import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposals",
  robots: { index: false, follow: false },
};

export default function AdminProposalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          Proposals
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Generate and manage client proposals from approved quotes.
        </p>
      </div>

      {/* Empty State */}
      <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-12 shadow-sm text-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-slate-300">
            description
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          No proposals yet
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Proposals are generated from approved quotes. Once you approve a quote, you&apos;ll be able to create a formal proposal here.
        </p>
      </div>
    </div>
  );
}
