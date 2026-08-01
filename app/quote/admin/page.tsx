import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Overview of quotes, pricing, and activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Active Quotes",
            value: "—",
            icon: "request_quote",
            color: "text-cold-purple",
            bg: "bg-cold-purple/10",
          },
          {
            label: "Pending Review",
            value: "—",
            icon: "pending_actions",
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Accepted This Month",
            value: "—",
            icon: "check_circle",
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Total Revenue Est.",
            value: "—",
            icon: "payments",
            color: "text-petite-orchid",
            bg: "bg-petite-orchid/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${stat.color}`}
                >
                  {stat.icon}
                </span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">
              {stat.value}
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Quotes Placeholder */}
      <div className="bg-white/70 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Recent Quotes
        </h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-slate-300">
              inbox
            </span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            No quotes yet. They&apos;ll appear here when clients submit estimates.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Configure Pricing",
            desc: "Set up rate cards, rules, and margins",
            icon: "tune",
            href: "/quote/admin/pricing",
          },
          {
            title: "Manage Services",
            desc: "Add or edit services and deliverables",
            icon: "category",
            href: "/quote/admin/services",
          },
          {
            title: "View Public Quoter",
            desc: "See what clients experience",
            icon: "visibility",
            href: "/quote",
          },
        ].map((action) => (
          <a
            key={action.title}
            href={action.href}
            className="bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 shadow-sm hover:shadow-md hover:bg-white/80 transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-xl text-slate-400 group-hover:text-slate-700 transition-colors">
                {action.icon}
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {action.title}
              </h3>
            </div>
            <p className="text-xs text-slate-500">{action.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
