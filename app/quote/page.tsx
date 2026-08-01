"use client";

import { useState } from "react";
import Link from "next/link";
import PublicQuoterWizard from "@/components/quote/PublicQuoterWizard";

export default function QuotePage() {
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [wizardStarted, setWizardStarted] = useState(false);

  const t = {
    title: language === "en" ? "Get Your Project Estimate" : "Obtén Tu Estimación de Proyecto",
    subtitle:
      language === "en"
        ? "Tell us about your project and get an instant estimate range for web design, UI/UX, e-commerce, and software services."
        : "Cuéntanos sobre tu proyecto y obtén un rango de estimación instantáneo para servicios de diseño web, UI/UX, e-commerce y software.",
    cta: language === "en" ? "Start Estimate Wizard" : "Comenzar Cotización",
    backToPortfolio: language === "en" ? "Back to Portfolio" : "Volver al Portafolio",
    step1: language === "en" ? "Select Category" : "Seleccionar Categoría",
    step1Desc: language === "en" ? "Choose from our active backend service catalog" : "Elige entre nuestro catálogo activo de servicios",
    step2: language === "en" ? "Answer Scope Questions" : "Detallar Alcance",
    step2Desc: language === "en" ? "Configure dynamic questions tailored to your service" : "Responde preguntas dinámicas adaptadas a tu necesidad",
    step3: language === "en" ? "Instant Estimate" : "Estimación Instantánea",
    step3Desc: language === "en" ? "Receive your personalized $X – $Y COP estimate range" : "Recibe tu rango de estimación personalizado en COP",
    disclaimer:
      language === "en"
        ? "Estimates are approximate and subject to review. Final pricing is confirmed after a detailed discovery consultation."
        : "Las estimaciones son aproximadas y sujetas a revisión. Los precios finales se confirman después de una consulta detallada.",
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-8 bg-gradient-to-br from-slate-50 via-white to-purple-50/20 text-slate-900">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-6xl flex items-center justify-between py-4 border-b border-slate-200/60 mb-8">
        <Link
          href="/"
          aria-label={t.backToPortfolio}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded-lg p-1 transition-colors group"
        >
          <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform" aria-hidden="true">
            arrow_back
          </span>
          <span className="text-xs font-semibold">{t.backToPortfolio}</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div
            role="group"
            aria-label="Language selector"
            className="flex items-center gap-1 bg-white/80 backdrop-blur-md rounded-full p-1 border border-slate-200/80 shadow-sm"
          >
            <button
              onClick={() => setLanguage("en")}
              aria-label="Switch language to English"
              aria-pressed={language === "en"}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                language === "en"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage("es")}
              aria-label="Cambiar idioma a Español"
              aria-pressed={language === "es"}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                language === "es"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ES
            </button>
          </div>

          <Link
            href="/quote/admin"
            aria-label="Access Admin Portal"
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <span className="material-symbols-outlined text-sm" aria-hidden="true">lock</span>
            Admin
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl my-auto">
        {!wizardStarted ? (
          <div className="text-center space-y-8 py-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 shadow-sm">
              <span className="material-symbols-outlined text-purple-600 text-lg" aria-hidden="true">
                request_quote
              </span>
              <span className="text-xs font-bold tracking-widest text-slate-700 uppercase">
                MTB Quote V1
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tighter text-slate-900">
              {t.title}
            </h1>

            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>

            {/* How It Works 3-Step Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-8">
              {[
                { num: "01", icon: "category", title: t.step1, desc: t.step1Desc },
                { num: "02", icon: "tune", title: t.step2, desc: t.step2Desc },
                { num: "03", icon: "calculate", title: t.step3, desc: t.step3Desc },
              ].map((step) => (
                <div
                  key={step.num}
                  className="relative bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group"
                >
                  <span className="absolute top-4 right-4 text-4xl font-black text-slate-100 group-hover:text-purple-500/10 transition-colors" aria-hidden="true">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">
                      {step.icon}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mb-1">{step.title}</h2>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* Start CTA Button */}
            <button
              onClick={() => setWizardStarted(true)}
              aria-label={t.cta}
              className="group relative px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg shadow-xl hover:bg-slate-800 hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/30"
            >
              <span className="flex items-center gap-3">
                {t.cta}
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  arrow_forward
                </span>
              </span>
            </button>

            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {t.disclaimer}
            </p>
          </div>
        ) : (
          /* Active Interactive Wizard Component */
          <div className="py-4">
            <PublicQuoterWizard language={language} />
          </div>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-6xl flex items-center justify-between py-6 border-t border-slate-200/60 text-xs text-slate-400 mt-12">
        <span>© {new Date().getFullYear()} MTB Labs. All rights reserved.</span>
        <span className="font-mono text-[11px] tracking-widest uppercase">
          MTB Quote Estimation Engine V1
        </span>
      </footer>
    </div>
  );
}
