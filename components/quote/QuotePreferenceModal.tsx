"use client";

import { useState, useEffect } from "react";

export type ClientType = "empresa" | "persona_natural";
export type Language = "en" | "es";

interface QuotePreferenceModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm: (preferences: { language: Language; clientType: ClientType }) => void;
  initialLanguage?: Language;
  initialClientType?: ClientType | null;
}

export default function QuotePreferenceModal({
  isOpen,
  onClose,
  onConfirm,
  initialLanguage,
  initialClientType,
}: QuotePreferenceModalProps) {
  const [language, setLanguage] = useState<Language>("es");
  const [clientType, setClientType] = useState<ClientType>("empresa");

  // Auto-detect browser language on mount if no initialLanguage specified
  useEffect(() => {
    if (initialLanguage) {
      setLanguage(initialLanguage);
    } else if (typeof window !== "undefined") {
      const browserLang =
        navigator.language || (navigator as { userLanguage?: string }).userLanguage || "";
      if (browserLang.toLowerCase().startsWith("es")) {
        setLanguage("es");
      } else {
        setLanguage("en");
      }
    }
  }, [initialLanguage]);

  useEffect(() => {
    if (initialClientType) {
      setClientType(initialClientType);
    }
  }, [initialClientType]);

  if (!isOpen) return null;

  const isEs = language === "es";

  const t = {
    badge: isEs ? "Configuración Inicial" : "Initial Setup",
    title: isEs ? "¡Bienvenido a MTB Quote Engine!" : "Welcome to MTB Quote Engine!",
    subtitle: isEs
      ? "Personaliza tu experiencia eligiendo tu tipo de proyecto e idioma de preferencia."
      : "Customize your experience by selecting your project type and preferred language.",
    clientTypeLabel: isEs ? "¿Para quién es este proyecto?" : "Who is this project for?",
    empresaTitle: isEs ? "Empresa / Negocio" : "Company / Business",
    empresaDesc: isEs
      ? "Marcas corporativas, PyMEs, startups u organizaciones."
      : "Corporate brands, SMEs, startups, or organization projects.",
    personaTitle: isEs ? "Persona Natural" : "Individual / Personal",
    personaDesc: isEs
      ? "Proyectos personales, independientes o profesionales."
      : "Personal, freelance, or individual professional projects.",
    languageLabel: isEs ? "Idioma" : "Language",
    detectedTag: isEs ? "Detectado del navegador" : "Detected from browser",
    confirmBtn: isEs ? "Confirmar y Comenzar" : "Confirm & Start",
    footerNote: isEs
      ? "Podrás cambiar estas opciones en cualquier momento desde la barra superior."
      : "You can change these options anytime from the top navigation bar.",
  };

  const handleConfirm = () => {
    onConfirm({ language, clientType });
    if (onClose) onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preference-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/65 backdrop-blur-xl animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/20 rounded-3xl overflow-hidden p-6 sm:p-8 space-y-6 text-slate-900 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Close & Language Pill */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-900 text-xs font-bold">
            <span className="material-symbols-outlined text-sm text-purple-700">tune</span>
            <span>{t.badge}</span>
          </div>

          {/* Segmented Language Toggle Pill */}
          <div
            role="group"
            aria-label={t.languageLabel}
            className="flex items-center p-1 bg-slate-100/90 rounded-full border border-slate-200/80 shadow-inner"
          >
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                language === "es"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇪🇸</span>
              <span>ES</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                language === "en"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>🇺🇸</span>
              <span>EN</span>
            </button>
          </div>
        </div>

        {/* Modal Title & Subtitle */}
        <div className="space-y-2">
          <h2
            id="preference-modal-title"
            className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900"
          >
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Section: Client Type Selection Cards */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
            {t.clientTypeLabel}
          </label>

          <div className="grid grid-cols-1 gap-3">
            {/* Empresa Card */}
            <button
              type="button"
              onClick={() => setClientType("empresa")}
              className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                clientType === "empresa"
                  ? "border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-md scale-[1.01]"
                  : "border-slate-200/90 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-100/80"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  clientType === "empresa"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-200/80 text-slate-700 group-hover:bg-slate-300/80"
                }`}
              >
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                  domain
                </span>
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-slate-900">{t.empresaTitle}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.empresaDesc}</p>
              </div>

              {/* Radio Indicator */}
              <div className="absolute top-4 right-4">
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    clientType === "empresa"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {clientType === "empresa" && (
                    <span className="material-symbols-outlined text-xs font-bold">check</span>
                  )}
                </span>
              </div>
            </button>

            {/* Persona Natural Card */}
            <button
              type="button"
              onClick={() => setClientType("persona_natural")}
              className={`group relative flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                clientType === "persona_natural"
                  ? "border-slate-900 bg-white ring-2 ring-slate-900/10 shadow-md scale-[1.01]"
                  : "border-slate-200/90 hover:border-slate-400 bg-slate-50/70 hover:bg-slate-100/80"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  clientType === "persona_natural"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-200/80 text-slate-700 group-hover:bg-slate-300/80"
                }`}
              >
                <span className="material-symbols-outlined text-2xl" aria-hidden="true">
                  person
                </span>
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-extrabold text-slate-900">{t.personaTitle}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{t.personaDesc}</p>
              </div>

              {/* Radio Indicator */}
              <div className="absolute top-4 right-4">
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    clientType === "persona_natural"
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {clientType === "persona_natural" && (
                    <span className="material-symbols-outlined text-xs font-bold">check</span>
                  )}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Primary Action CTA Button */}
        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="w-full py-4 bg-slate-900 hover:bg-slate-800 active:scale-[0.99] text-white rounded-2xl font-extrabold text-base shadow-xl shadow-slate-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.confirmBtn}</span>
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              arrow_forward
            </span>
          </button>

          <p className="text-[11px] text-center text-slate-400 leading-normal flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-xs text-slate-400">info</span>
            <span>{t.footerNote}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
