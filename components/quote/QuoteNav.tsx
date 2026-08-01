"use client";

import Link from "next/link";

interface QuoteNavProps {
  language: "en" | "es";
  onLanguageChange: (lang: "en" | "es") => void;
}

export default function QuoteNav({ language, onLanguageChange }: QuoteNavProps) {
  const backText =
    language === "en" ? "Back to Portfolio" : "Volver al Portafolio";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
      >
        <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
          arrow_back
        </span>
        <span className="text-sm font-medium">{backText}</span>
      </Link>
      <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full p-1 border border-white/40 shadow-sm">
        <button
          onClick={() => onLanguageChange("en")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === "en"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => onLanguageChange("es")}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === "es"
              ? "bg-slate-900 text-white shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          ES
        </button>
      </div>
    </nav>
  );
}
