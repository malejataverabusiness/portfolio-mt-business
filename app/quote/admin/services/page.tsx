import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services & Deliverables",
  robots: { index: false, follow: false },
};

export default function AdminServicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-slate-900">
            Services & Deliverables
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your service catalog and individual deliverables.
          </p>
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-12 shadow-sm text-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-4xl text-slate-300">
            category
          </span>
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-2">
          Connect database to manage services
        </h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          After connecting your Supabase database and running the seed data, your service catalog will appear here.
        </p>
      </div>
    </div>
  );
}
