// =============================================================================
// MTB Quote — Constants
// =============================================================================

/** Default currency for quotes */
export const DEFAULT_CURRENCY = "USD";

/** Default number of days a quote is valid */
export const DEFAULT_VALIDITY_DAYS = 30;

/** Default language */
export const DEFAULT_LANGUAGE: "en" | "es" = "en";

/** Quote reference number prefix */
export const QUOTE_REF_PREFIX = "MTB-Q";

/** Complexity tier labels (bilingual) */
export const COMPLEXITY_LABELS = {
  basic: { en: "Basic", es: "Básico" },
  standard: { en: "Standard", es: "Estándar" },
  advanced: { en: "Advanced", es: "Avanzado" },
  enterprise: { en: "Enterprise", es: "Empresarial" },
} as const;

/** Complexity tier descriptions (bilingual) */
export const COMPLEXITY_DESCRIPTIONS = {
  basic: {
    en: "Simple scope, standard patterns, minimal customization",
    es: "Alcance simple, patrones estándar, personalización mínima",
  },
  standard: {
    en: "Moderate scope, some customization, typical requirements",
    es: "Alcance moderado, algo de personalización, requisitos típicos",
  },
  advanced: {
    en: "Complex scope, significant customization, advanced integrations",
    es: "Alcance complejo, personalización significativa, integraciones avanzadas",
  },
  enterprise: {
    en: "Full-scale, custom architecture, multi-system integration",
    es: "Escala completa, arquitectura personalizada, integración multi-sistema",
  },
} as const;

/** Quote status labels (bilingual) */
export const QUOTE_STATUS_LABELS = {
  draft: { en: "Draft", es: "Borrador" },
  submitted: { en: "Submitted", es: "Enviado" },
  under_review: { en: "Under Review", es: "En Revisión" },
  adjusted: { en: "Adjusted", es: "Ajustado" },
  approved: { en: "Approved", es: "Aprobado" },
  sent: { en: "Sent", es: "Enviado" },
  accepted: { en: "Accepted", es: "Aceptado" },
  declined: { en: "Declined", es: "Rechazado" },
  expired: { en: "Expired", es: "Expirado" },
} as const;

/** Quote status colors for UI badges */
export const QUOTE_STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-200 text-slate-700",
  submitted: "bg-sky-100 text-sky-800",
  under_review: "bg-amber-100 text-amber-800",
  adjusted: "bg-blue-100 text-blue-800",
  approved: "bg-emerald-100 text-emerald-800",
  sent: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
  expired: "bg-gray-100 text-gray-500",
};

/** Confidence score thresholds for public labels */
export const CONFIDENCE_THRESHOLDS = {
  approximate: { max: 50, label: { en: "Approximate Estimate", es: "Estimación Aproximada" } },
  estimated: { max: 80, label: { en: "Estimated Range", es: "Rango Estimado" } },
  detailed: { max: 100, label: { en: "Detailed Estimate", es: "Estimación Detallada" } },
} as const;

/** Admin sidebar navigation items */
export const ADMIN_NAV_ITEMS = [
  { href: "/quote/admin", label: { en: "Dashboard", es: "Panel" }, icon: "dashboard" },
  { href: "/quote/admin/quotes", label: { en: "Quotes", es: "Cotizaciones" }, icon: "request_quote" },
  { href: "/quote/admin/roles", label: { en: "Roles", es: "Roles" }, icon: "badge" },
  { href: "/quote/admin/rates", label: { en: "Rate Cards", es: "Matriz Tarifas" }, icon: "sell" },
  { href: "/quote/admin/deliverables", label: { en: "Deliverables", es: "Entregables" }, icon: "inventory_2" },
  { href: "/quote/admin/services", label: { en: "Services & Categories", es: "Servicios y Cat." }, icon: "category" },
  { href: "/quote/admin/pricing", label: { en: "Global Settings", es: "Config. Precios" }, icon: "tune" },
  { href: "/quote/admin/clients", label: { en: "Clients", es: "Clientes" }, icon: "group" },
  { href: "/quote/admin/analytics", label: { en: "Analytics & Calibration", es: "Analítica y Calibración" }, icon: "analytics" },
] as const;
