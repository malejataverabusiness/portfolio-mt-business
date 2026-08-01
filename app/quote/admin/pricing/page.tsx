import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Configuration",
  robots: { index: false, follow: false },
};

export default function AdminPricingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          Pricing Configuration
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage rate cards, pricing rules, and margin profiles.
        </p>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Rate Cards",
            desc: "Base rates for each deliverable. These are the foundation of all pricing calculations.",
            icon: "payments",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            title: "Pricing Rules",
            desc: "Complexity multipliers, volume discounts, urgency surcharges, and bundle discounts.",
            icon: "rule",
            color: "text-cold-purple",
            bg: "bg-cold-purple/10",
          },
          {
            title: "Margin Profiles",
            desc: "Target margin ranges applied to final calculations.",
            icon: "trending_up",
            color: "text-petite-orchid",
            bg: "bg-petite-orchid/10",
          },
        ].map((section) => (
          <div
            key={section.title}
            className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl ${section.bg} flex items-center justify-center`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${section.color}`}
                >
                  {section.icon}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {section.title}
              </h2>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              {section.desc}
            </p>
            <div className="flex items-center justify-center py-8 border border-dashed border-slate-200 rounded-xl">
              <p className="text-xs text-slate-400 font-medium">
                Connect database to configure
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
