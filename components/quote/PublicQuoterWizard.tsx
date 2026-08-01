"use client";

import { useEffect, useState } from "react";
import {
  getPublicServiceCatalog,
  calculatePublicEstimatePreview,
  submitPublicQuoteRequest,
  type CatalogResponse,
} from "@/lib/quote/actions/public";
import type { Category, Service, Deliverable, ComplexityLevel } from "@/lib/quote/types";

interface PublicQuoterWizardProps {
  language?: "en" | "es";
}

export default function PublicQuoterWizard({ language = "en" }: PublicQuoterWizardProps) {
  // Wizard state
  const [step, setStep] = useState(1);
  const [catalog, setCatalog] = useState<CatalogResponse | null>(null);
  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [catalogError, setCatalogError] = useState(false);

  // User selections
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Dynamic answers
  const [platforms, setPlatforms] = useState<string[]>(["Instagram", "Meta Ads"]);
  const [postsCount, setPostsCount] = useState<number>(8);
  const [reelsCount, setReelsCount] = useState<number>(4);
  const [pageCount, setPageCount] = useState<number>(10);
  const [websiteType, setWebsiteType] = useState<string>("Corporate Site");
  const [designScope, setDesignScope] = useState<string[]>([
    "UI Visual Design",
    "Wireframes",
  ]);
  const [complexity, setComplexity] = useState<ComplexityLevel>("standard");
  const [urgency, setUrgency] = useState<string>("normal");

  // Calculated estimate state
  const [estimateResult, setEstimateResult] = useState<{
    low_estimate_cop: number;
    high_estimate_cop: number;
    formatted_range: string;
  } | null>(null);

  // Lead capture state
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [projectNotes, setProjectNotes] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    referenceNumber: string;
  } | null>(null);

  // Load catalog on mount
  const fetchCatalog = async () => {
    setLoadingCatalog(true);
    setCatalogError(false);
    try {
      const data = await getPublicServiceCatalog();
      setCatalog(data);
      if (data.categories.length > 0) {
        setSelectedCategory(data.categories[0]);
      }
    } catch (err) {
      console.error("Failed to load catalog:", err);
      setCatalogError(true);
    } finally {
      setLoadingCatalog(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const availableServices = catalog?.services.filter(
    (s) => s.category_id === selectedCategory?.id
  ) || [];

  const handleCalculateEstimate = async () => {
    setCalculating(true);
    try {
      const deliverable =
        catalog?.deliverables.find(
          (d) => d.id === selectedService?.id || d.is_active
        ) || catalog?.deliverables[0];

      const delivId = deliverable?.id || "deliv-default";
      let quantity = 1;
      if (postsCount > 10 || pageCount > 15) quantity = 2;

      const preview = await calculatePublicEstimatePreview({
        items: [
          {
            deliverable_id: delivId,
            quantity,
            complexity,
          },
        ],
      });

      setEstimateResult(preview);
      setStep(5);
    } catch (err) {
      console.error("Error calculating estimate preview:", err);
      alert(
        language === "en"
          ? "Failed to calculate estimate. Please try again."
          : "Error al calcular estimación. Intenta de nuevo."
      );
    } finally {
      setCalculating(false);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) {
      return alert(
        language === "en"
          ? "Please provide your name and email."
          : "Por favor ingresa tu nombre y correo."
      );
    }

    setSubmitting(true);
    try {
      const deliverable =
        catalog?.deliverables.find((d) => d.is_active) ||
        catalog?.deliverables[0];
      const delivId = deliverable?.id || "deliv-default";

      const res = await submitPublicQuoteRequest({
        client_name: clientName,
        client_email: clientEmail,
        client_company: clientCompany,
        client_phone: clientPhone,
        items: [
          {
            deliverable_id: delivId,
            quantity: 1,
            complexity,
          },
        ],
        notes: `Category: ${selectedCategory?.name}, Service: ${
          selectedService?.name
        }. ${projectNotes}`.trim(),
      });

      setSubmissionSuccess({ referenceNumber: res.reference_number });
      setStep(6);
    } catch (err) {
      console.error("Failed to submit quote request:", err);
      alert(`Error: ${(err as Error).message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingCatalog) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20 text-center space-y-4">
        <div className="w-10 h-10 border-3 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="text-sm font-medium text-slate-500">
          {language === "en"
            ? "Loading service catalog..."
            : "Cargando catálogo de servicios..."}
        </p>
      </div>
    );
  }

  if (catalogError) {
    return (
      <div className="w-full max-w-lg mx-auto py-16 text-center space-y-4 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-red-200 shadow-sm">
        <span className="material-symbols-outlined text-4xl text-red-500" aria-hidden="true">
          error_outline
        </span>
        <h2 className="text-lg font-bold text-slate-900">
          {language === "en" ? "Catalog Unavailable" : "Catálogo No Disponible"}
        </h2>
        <p className="text-xs text-slate-500">
          {language === "en"
            ? "Unable to connect to the pricing backend. Please verify your connection."
            : "No se pudo conectar con la base de datos de precios. Verifica tu conexión."}
        </p>
        <button
          onClick={fetchCatalog}
          className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          {language === "en" ? "Retry Connection" : "Reintentar Conexión"}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Wizard Progress Bar */}
      {step <= 5 && (
        <section
          role="region"
          aria-label={
            language === "en"
              ? "Quote Wizard Progress"
              : "Progreso de Estimación"
          }
          className="space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>
              {language === "en" ? `Step 0${step} of 05` : `Paso 0${step} de 05`}
            </span>
            <span className="text-slate-900 font-bold">
              {step === 1 && (language === "en" ? "Category" : "Categoría")}
              {step === 2 && (language === "en" ? "Service" : "Servicio")}
              {step === 3 && (language === "en" ? "Scope Questions" : "Preguntas de Alcance")}
              {step === 4 && (language === "en" ? "Complexity & Urgency" : "Complejidad y Entrega")}
              {step === 5 && (language === "en" ? "Your Estimate" : "Tu Estimación")}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-500 ease-out"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </section>
      )}

      {/* STEP 1: CATEGORY SELECTION */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900">
              {language === "en"
                ? "What type of project do you need?"
                : "¿Qué tipo de proyecto necesitas?"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {language === "en"
                ? "Select a primary category to start tailoring your estimate."
                : "Selecciona una categoría principal para comenzar tu estimación."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" role="radiogroup" aria-label="Project categories">
            {catalog?.categories.map((cat) => {
              const isSelected = selectedCategory?.id === cat.id;
              return (
                <div
                  key={cat.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedCategory(cat);
                      const firstService = catalog.services.find(
                        (s) => s.category_id === cat.id
                      );
                      setSelectedService(firstService || null);
                    }
                  }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    const firstService = catalog.services.find(
                      (s) => s.category_id === cat.id
                    );
                    setSelectedService(firstService || null);
                  }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]"
                      : "bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 hover:bg-white text-slate-900"
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? "bg-white/10 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      <span className="material-symbols-outlined text-xl" aria-hidden="true">
                        {cat.slug.includes("ecommerce")
                          ? "shopping_cart"
                          : cat.slug.includes("web")
                          ? "language"
                          : cat.slug.includes("data")
                          ? "analytics"
                          : cat.slug.includes("marketing")
                          ? "campaign"
                          : cat.slug.includes("brand")
                          ? "palette"
                          : "smartphone"}
                      </span>
                    </div>
                    <h3 className="font-bold text-base tracking-tight">
                      {language === "es" ? cat.name_es : cat.name}
                    </h3>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs font-semibold">
                    <span className={isSelected ? "text-slate-300" : "text-slate-400"}>
                      {language === "en" ? "Select Category" : "Seleccionar"}
                    </span>
                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform" aria-hidden="true">
                      arrow_forward
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              disabled={!selectedCategory}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Next: Select Service" : "Siguiente: Servicio"}
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SERVICE SELECTION */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_back</span>
              {language === "en" ? "Back to Categories" : "Volver a Categorías"}
            </button>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900">
              {language === "en"
                ? `Select service for ${selectedCategory?.name}`
                : `Selecciona el servicio para ${selectedCategory?.name_es}`}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {language === "en"
                ? "Choose the specific service scope you want estimated."
                : "Elige el paquete de servicio específico a cotizar."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="radiogroup" aria-label="Services">
            {availableServices.length === 0 ? (
              <div className="col-span-2 py-12 text-center text-slate-500 bg-white/80 rounded-2xl border border-slate-200">
                {language === "en"
                  ? "No specific services found in this category. Continue to scope details."
                  : "No se encontraron servicios específicos en esta categoría. Continúa a los detalles."}
              </div>
            ) : (
              availableServices.map((srv) => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedService(srv);
                      }
                    }}
                    onClick={() => setSelectedService(srv)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer space-y-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md"
                        : "bg-white/80 backdrop-blur-sm border-slate-200/80 hover:border-slate-300 text-slate-900"
                    }`}
                  >
                    <h3 className="font-bold text-lg">
                      {language === "es" ? srv.name_es : srv.name}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {srv.description ||
                        (language === "en"
                          ? "Comprehensive service tailored for MTB Labs standards."
                          : "Servicio integral diseñado bajo estándares MTB Labs.")}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Back" : "Atrás"}
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Next: Scope Details" : "Siguiente: Detalles"}
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DYNAMIC SERVICE QUESTIONS */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <button
              onClick={() => setStep(2)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_back</span>
              {language === "en" ? "Back to Services" : "Volver a Servicios"}
            </button>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900">
              {language === "en"
                ? "Define Scope & Requirements"
                : "Define el Alcance y Requisitos"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {language === "en"
                ? "Answer a few questions tailored to your selected service."
                : "Responde algunas preguntas específicas para tu servicio."}
            </p>
          </div>

          {/* DYNAMIC QUESTION SET A: Digital Marketing & Social Media */}
          {selectedCategory?.slug.includes("marketing") ||
          selectedService?.name.toLowerCase().includes("social") ? (
            <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <label className="block font-bold text-slate-900 mb-2">
                  {language === "en" ? "Target Platforms" : "Plataformas Objetivo"}
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Instagram",
                    "TikTok",
                    "LinkedIn",
                    "Meta Ads",
                    "YouTube",
                  ].map((plat) => {
                    const active = platforms.includes(plat);
                    return (
                      <button
                        key={plat}
                        type="button"
                        onClick={() =>
                          setPlatforms(
                            active
                              ? platforms.filter((p) => p !== plat)
                              : [...platforms, plat]
                          )
                        }
                        aria-pressed={active}
                        className={`px-3 py-1.5 rounded-xl font-semibold transition-all focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          active
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        {plat}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postsSelect" className="block font-bold text-slate-900 mb-2">
                    {language === "en" ? "Monthly Static Posts" : "Publicaciones Mensuales"}
                  </label>
                  <select
                    id="postsSelect"
                    value={postsCount}
                    onChange={(e) => setPostsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <option value={4}>4 posts / month</option>
                    <option value={8}>8 posts / month</option>
                    <option value={12}>12 posts / month</option>
                    <option value={20}>20+ posts / month</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reelsSelect" className="block font-bold text-slate-900 mb-2">
                    {language === "en"
                      ? "Monthly Reels / Short Video"
                      : "Reels / Videos Cortos Mensuales"}
                  </label>
                  <select
                    id="reelsSelect"
                    value={reelsCount}
                    onChange={(e) => setReelsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <option value={2}>2 Reels / month</option>
                    <option value={4}>4 Reels / month</option>
                    <option value={8}>8 Reels / month</option>
                    <option value={15}>15+ Reels / month</option>
                  </select>
                </div>
              </div>
            </div>
          ) : selectedCategory?.slug.includes("brand") ||
            selectedCategory?.slug.includes("uiux") ? (
            /* DYNAMIC QUESTION SET B: UX/UI & Brand Design */
            <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 text-xs">
              <div>
                <label className="block font-bold text-slate-900 mb-2">
                  {language === "en"
                    ? "Design Scope Included"
                    : "Alcance de Diseño Requerido"}
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "UX Research & Discovery",
                    "Wireframes & User Flows",
                    "UI Visual Design",
                    "Design System & UI Kit",
                    "Interactive Prototype",
                  ].map((item) => {
                    const active = designScope.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          setDesignScope(
                            active
                              ? designScope.filter((i) => i !== item)
                              : [...designScope, item]
                          )
                        }
                        aria-pressed={active}
                        className={`p-3 rounded-xl font-semibold text-left transition-all flex items-center justify-between focus-visible:ring-2 focus-visible:ring-slate-900 ${
                          active
                            ? "bg-slate-900 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        <span>{item}</span>
                        {active && (
                          <span className="material-symbols-outlined text-sm" aria-hidden="true">
                            check
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* DYNAMIC QUESTION SET C: Web Systems & E-Commerce */
            <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="systemTypeSelect" className="block font-bold text-slate-900 mb-2">
                    {language === "en" ? "System Type" : "Tipo de Sistema"}
                  </label>
                  <select
                    id="systemTypeSelect"
                    value={websiteType}
                    onChange={(e) => setWebsiteType(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <option value="Landing Page">Landing Page</option>
                    <option value="Corporate Site">Corporate Website</option>
                    <option value="Full E-Commerce Store">
                      Full E-Commerce Store
                    </option>
                    <option value="Custom Web Portal">
                      Custom Web Portal / SaaS
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="pageCountSelect" className="block font-bold text-slate-900 mb-2">
                    {language === "en"
                      ? "Approximate Pages / Views"
                      : "Páginas / Vistas Aproximadas"}
                  </label>
                  <select
                    id="pageCountSelect"
                    value={pageCount}
                    onChange={(e) => setPageCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  >
                    <option value={5}>1 – 5 pages</option>
                    <option value={10}>5 – 15 pages</option>
                    <option value={25}>15 – 30 pages</option>
                    <option value={50}>30+ custom views</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Back" : "Atrás"}
            </button>
            <button
              onClick={() => setStep(4)}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Next: Complexity & Urgency" : "Siguiente: Complejidad"}
              <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: COMPLEXITY & TIMELINE */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <button
              onClick={() => setStep(3)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 mb-2 focus-visible:ring-2 focus-visible:ring-slate-900 rounded-md"
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">arrow_back</span>
              {language === "en" ? "Back to Scope" : "Volver al Alcance"}
            </button>
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-slate-900">
              {language === "en"
                ? "Complexity & Project Timeline"
                : "Complejidad y Tiempo de Entrega"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {language === "en"
                ? "Select your technical depth and urgency tier."
                : "Selecciona el nivel técnico y la urgencia del proyecto."}
            </p>
          </div>

          {/* Complexity Options */}
          <div className="space-y-3">
            <label className="block font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === "en" ? "Technical Complexity" : "Complejidad Técnica"}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Complexity level">
              {[
                { id: "basic", title: "Basic", desc: "Standard patterns, minimal custom logic" },
                { id: "standard", title: "Standard", desc: "Moderate scope, typical business features" },
                { id: "advanced", title: "Advanced", desc: "Custom integrations, high performance needs" },
                { id: "enterprise", title: "Enterprise", desc: "Full-scale custom architecture & multi-system API" },
              ].map((c) => {
                const isSelected = complexity === c.id;
                return (
                  <div
                    key={c.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setComplexity(c.id as ComplexityLevel);
                      }
                    }}
                    onClick={() => setComplexity(c.id as ComplexityLevel)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white/80 border-slate-200/80 text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <h3 className="font-bold text-sm mb-1">{c.title}</h3>
                    <p className={`text-xs ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {c.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline / Urgency */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <label className="block font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === "en" ? "Desired Timeline" : "Tiempo de Entrega Deseado"}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="radiogroup" aria-label="Timeline urgency">
              {[
                { id: "normal", title: "Standard Delivery", subtitle: "Regular timeline" },
                { id: "urgent", title: "Express Delivery", subtitle: "Priority queue (+15%)" },
                { id: "critical", title: "Rush / Critical", subtitle: "Dedicated sprint (+50%)" },
              ].map((u) => {
                const isSelected = urgency === u.id;
                return (
                  <div
                    key={u.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setUrgency(u.id);
                      }
                    }}
                    onClick={() => setUrgency(u.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                        : "bg-white/80 border-slate-200/80 text-slate-900 hover:border-slate-300"
                    }`}
                  >
                    <h3 className="font-bold text-sm">{u.title}</h3>
                    <span className={`text-[11px] block mt-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {u.subtitle}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Back" : "Atrás"}
            </button>
            <button
              disabled={calculating}
              onClick={handleCalculateEstimate}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {calculating
                ? language === "en"
                  ? "Calculating..."
                  : "Calculando..."
                : language === "en"
                ? "Calculate Estimate Range"
                : "Calcular Rango de Estimación"}
              <span className="material-symbols-outlined text-base" aria-hidden="true">calculate</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: INSTANT ESTIMATE RESULT & PRESENTATION */}
      {step === 5 && estimateResult && (
        <div className="space-y-8 animate-fade-in">
          {/* Hero Result Banner */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" aria-hidden="true"></div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-slate-200 border border-white/10">
              <span className="material-symbols-outlined text-sm text-emerald-400" aria-hidden="true">
                check_circle
              </span>
              {language === "en" ? "Instant Estimate Generated" : "Estimación Generada"}
            </div>

            <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold">
              {language === "en" ? "Estimated Investment Range" : "Rango Estimado de Inversión"}
            </h2>

            <div className="text-4xl md:text-6xl font-black tracking-tight font-mono text-white">
              {estimateResult.formatted_range}
            </div>

            <p className="text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
              {language === "en"
                ? "This rounded range reflects MTB's baseline allocation for your selected scope and complexity level."
                : "Este rango redondeado refleja la asignación estándar de MTB para el alcance y nivel técnico seleccionado."}
            </p>
          </div>

          {/* Scope Summary & Main Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === "en" ? "Selected Scope Summary" : "Resumen del Alcance"}
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-semibold text-slate-900">{selectedCategory?.name}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-semibold text-slate-900">{selectedService?.name || "Standard Package"}</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Complexity:</span>
                  <span className="font-semibold text-slate-900 uppercase">{complexity}</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {language === "en" ? "Main Price Factors" : "Factores Principales"}
              </h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600" aria-hidden="true">check</span>
                  <span>Engineered technical baseline & architecture</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600" aria-hidden="true">check</span>
                  <span>Senior oversight & project management</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-600" aria-hidden="true">check</span>
                  <span>QA testing & deployment support</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Prominent Standard Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed flex items-start gap-3">
            <span className="material-symbols-outlined text-amber-600 text-lg mt-0.5" aria-hidden="true">
              info
            </span>
            <div>
              <strong className="block mb-0.5">
                {language === "en" ? "Important Disclaimer" : "Aviso Importante"}
              </strong>
              {language === "en"
                ? "The result is an initial estimate based on the information provided. The final investment is subject to validation of the project's actual scope and requirements."
                : "El resultado es una estimación inicial basada en la información proporcionada. La inversión final está sujeta a la validación del alcance y requerimientos reales del proyecto."}
            </div>
          </div>

          {/* Lead Capture Form CTA */}
          <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {language === "en"
                  ? "Request Formal Proposal & Consultation"
                  : "Solicitar Propuesta Formal y Consulta"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {language === "en"
                  ? "Provide your contact details to receive a detailed breakdown and schedule a discovery call with MTB."
                  : "Ingresa tus datos de contacto para recibir el desglose detallado y agendar una llamada con MTB."}
              </p>
            </div>

            <form onSubmit={handleSubmitLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="leadName" className="block font-bold text-slate-700 mb-1">
                    {language === "en" ? "Full Name *" : "Nombre Completo *"}
                  </label>
                  <input
                    id="leadName"
                    type="text"
                    required
                    placeholder="e.g. Maria Alejandra"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="leadEmail" className="block font-bold text-slate-700 mb-1">
                    {language === "en" ? "Email Address *" : "Correo Electrónico *"}
                  </label>
                  <input
                    id="leadEmail"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="leadCompany" className="block font-bold text-slate-700 mb-1">
                    {language === "en" ? "Company / Brand" : "Empresa / Marca"}
                  </label>
                  <input
                    id="leadCompany"
                    type="text"
                    placeholder="Company Name"
                    value={clientCompany}
                    onChange={(e) => setClientCompany(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  />
                </div>

                <div>
                  <label htmlFor="leadPhone" className="block font-bold text-slate-700 mb-1">
                    {language === "en" ? "Phone (Optional)" : "Teléfono (Opcional)"}
                  </label>
                  <input
                    id="leadPhone"
                    type="text"
                    placeholder="+57 300 000 0000"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="leadNotes" className="block font-bold text-slate-700 mb-1">
                  {language === "en" ? "Additional Comments / Goals" : "Comentarios / Objetivos"}
                </label>
                <textarea
                  id="leadNotes"
                  rows={2}
                  placeholder={
                    language === "en"
                      ? "Tell us more about your target launch date, integrations, or specific goals..."
                      : "Cuéntanos más sobre tus fechas, integraciones u objetivos..."
                  }
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                />
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  {language === "en" ? "Recalculate" : "Recalcular"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-3.5 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-slate-900"
                >
                  {submitting
                    ? language === "en"
                      ? "Submitting..."
                      : "Enviando..."
                    : language === "en"
                    ? "Submit Request & Get Reference"
                    : "Enviar Solicitud y Obtener Referencia"}
                  <span className="material-symbols-outlined text-base" aria-hidden="true">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STEP 6: SUCCESS CONFIRMATION SCREEN */}
      {step === 6 && submissionSuccess && (
        <div className="w-full max-w-xl mx-auto py-12 text-center space-y-6 animate-fade-in bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">check</span>
          </div>

          <div>
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest block mb-1">
              {language === "en" ? "Quote Reference Number" : "Número de Referencia"}
            </span>
            <div className="text-2xl font-mono font-black text-slate-900 bg-slate-100 py-2 px-4 rounded-xl inline-block">
              {submissionSuccess.referenceNumber}
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-600">
            <h2 className="text-lg font-bold text-slate-900">
              {language === "en"
                ? "Request Received Successfully!"
                : "¡Solicitud Recibida Con Éxito!"}
            </h2>
            <p className="leading-relaxed">
              {language === "en"
                ? `Thank you ${clientName}. We have saved your estimate request under draft status in our backend. An MTB specialist will reach out to ${clientEmail} shortly.`
                : `Gracias ${clientName}. Hemos guardado tu solicitud en estado borrador. Un especialista de MTB se pondrá en contacto a ${clientEmail} pronto.`}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setStep(1);
                setEstimateResult(null);
                setSubmissionSuccess(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Calculate Another Quote" : "Cotizar Otro Proyecto"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
