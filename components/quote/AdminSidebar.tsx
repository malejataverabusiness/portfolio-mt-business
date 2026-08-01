"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/quote/constants";

interface AdminSidebarProps {
  language?: "en" | "es";
  onSignOut?: () => void;
}

export default function AdminSidebar({ language = "en", onSignOut }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 flex flex-col min-h-screen">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-slate-200/40">
        <Link href="/quote/admin" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-white text-lg">
              request_quote
            </span>
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-slate-900 leading-tight">
              MTB Quote
            </h1>
            <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
              Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/quote/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  isActive ? "text-white" : "text-slate-400"
                }`}
              >
                {item.icon}
              </span>
              {item.label[language]}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-slate-200/40 space-y-2">
        <Link
          href="/quote"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-all"
        >
          <span className="material-symbols-outlined text-xl text-slate-400">
            visibility
          </span>
          {language === "en" ? "View Public Quoter" : "Ver Cotizador Público"}
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100/80 hover:text-slate-900 transition-all"
        >
          <span className="material-symbols-outlined text-xl text-slate-400">
            home
          </span>
          {language === "en" ? "Back to Portfolio" : "Volver al Portafolio"}
        </Link>
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">logout</span>
            {language === "en" ? "Sign Out" : "Cerrar Sesión"}
          </button>
        )}
      </div>
    </aside>
  );
}
