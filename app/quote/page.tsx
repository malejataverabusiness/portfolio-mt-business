"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
  const [language, setLanguage] = useState<"en" | "es">("en");

  const t = {
    title: language === "en" ? "Get Your Project Estimate" : "Obtén Tu Estimación de Proyecto",
    subtitle:
      language === "en"
        ? "Tell us about your project and get an instant estimate range for web design, UI/UX, and frontend development services."
        : "Cuéntanos sobre tu proyecto y obtén un rango de estimación instantáneo para servicios de diseño web, UI/UX y desarrollo frontend.",
    cta: language === "en" ? "Start Estimate" : "Comenzar Estimación",
    backToPortfolio: language === "en" ? "Back to Portfolio" : "Volver al Portafolio",
    step1: language === "en" ? "Select Services" : "Seleccionar Servicios",
    step1Desc: language === "en" ? "Choose the services and deliverables you need" : "Elige los servicios y entregables que necesitas",
    step2: language === "en" ? "Configure Details" : "Configurar Detalles",
    step2Desc: language === "en" ? "Set complexity, quantity, and timeline" : "Define complejidad, cantidad y cronograma",
    step3: language === "en" ? "Get Estimate" : "Obtener Estimación",
    step3Desc: language === "en" ? "Receive your personalized estimate range" : "Recibe tu rango de estimación personalizado",
    disclaimer:
      language === "en"
        ? "Estimates are approximate and subject to review. Final pricing is confirmed after a detailed consultation."
        : "Las estimaciones son aproximadas y sujetas a revisión. Los precios finales se confirman después de una consulta detallada.",
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          <span className="text-sm font-medium">{t.backToPortfolio}</span>
        </Link>
        <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md rounded-full p-1 border border-white/40 shadow-sm">
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              language === "en"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("es")}
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

      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center mb-16 mt-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm mb-8">
          <span className="material-symbols-outlined text-petite-orchid text-lg">
            request_quote
          </span>
          <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
            MTB Quote
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-slate-900 mb-6">
          {t.title}
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* How It Works Steps */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { num: "01", icon: "category", title: t.step1, desc: t.step1Desc },
          { num: "02", icon: "tune", title: t.step2, desc: t.step2Desc },
          { num: "03", icon: "calculate", title: t.step3, desc: t.step3Desc },
        ].map((step) => (
          <div
            key={step.num}
            className="relative bg-white/50 backdrop-blur-md border border-white/50 rounded-2xl p-8 shadow-sm hover:shadow-md hover:bg-white/70 transition-all group"
          >
            <span className="absolute top-4 right-4 text-5xl font-black text-slate-100 group-hover:text-petite-orchid/10 transition-colors">
              {step.num}
            </span>
            <div className="w-12 h-12 rounded-xl bg-white/80 border border-white/60 shadow-sm flex items-center justify-center mb-5">
              <span className="material-symbols-outlined text-2xl text-cold-purple">
                {step.icon}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <button
        disabled
        className="group relative px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <span className="flex items-center gap-3">
          {t.cta}
          <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </span>
      </button>

      {/* Disclaimer */}
      <p className="mt-8 text-xs text-slate-500 max-w-md text-center leading-relaxed">
        {t.disclaimer}
      </p>

      {/* Powered By */}
      <div className="mt-12 flex items-center gap-2 text-slate-400">
        <span className="text-[10px] font-medium tracking-widest uppercase">
          Powered by MTB Labs
        </span>
      </div>
    </div>
  );
}
