"use client";

import { useEffect, useState } from "react";
import {
  getPublicServiceCatalog,
  getServiceScopeQuestions,
  calculatePublicEstimatePreview,
  submitPublicQuoteRequest,
  type CatalogResponse,
} from "@/lib/quote/actions/public";
import type {
  Category,
  Service,
  Deliverable,
  ComplexityLevel,
  ScopeQuestion,
  ScopeAnswers,
} from "@/lib/quote/types";

interface PublicQuoterWizardProps {
  language?: "en" | "es";
  clientType?: "empresa" | "persona_natural" | null;
}

function getComplexityTierDetails(
  tier: "basic" | "standard" | "advanced" | "enterprise",
  serviceSlug: string | undefined,
  answers: ScopeAnswers,
  language: "en" | "es"
) {
  const isEs = language === "es";

  let title = tier === "basic" ? (isEs ? "Básico (MVP)" : "Basic (MVP)")
    : tier === "standard" ? (isEs ? "Estándar" : "Standard")
    : tier === "advanced" ? (isEs ? "Avanzado" : "Advanced")
    : (isEs ? "Empresarial" : "Enterprise");

  let desc = tier === "basic"
    ? (isEs ? "Esencial, rápido y enfocado en solución limpia con requerimientos básicos." : "Essential, fast, and focused on clean solution with base requirements.")
    : tier === "standard"
    ? (isEs ? "Funcionalidades típicas de negocio, gestión de contenidos e interacciones intermedias." : "Standard business features, CMS management, and intermediate UI interactions.")
    : tier === "advanced"
    ? (isEs ? "Personalización profunda, integraciones API de terceros y rendimiento optimizado." : "Deep customization, 3rd party API integrations, and performance tuning.")
    : (isEs ? "Arquitectura a medida a gran escala, integraciones multi-sistema y máxima seguridad." : "Full-scale custom architecture, multi-system API integration, and peak security.");

  let bullets: string[] = [];

  if (serviceSlug === "landing-page") {
    if (tier === "basic") {
      bullets = isEs ? [
        "1 Página de aterrizaje 100% responsiva (Móvil, Tablet, Desktop)",
        "Estructura limpia orientada a conversión rápida (HTML/React)",
        "Formulario sencillo de captura de contactos / leads",
        "Indexación básica en buscadores (Google SEO Meta Tags)",
        "Despliegue en producción y enlace a tu dominio web"
      ] : [
        "100% responsive single landing page (Mobile, Tablet, Desktop)",
        "Clean high-performance conversion structure (HTML/React)",
        "Simple contact / lead capture form",
        "Basic Google SEO indexing & meta tag setup",
        "Production deployment & custom domain connection"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo incluido en el paquete Básico +",
        "Animaciones e interacciones dinámicas de interfaz",
        "Integración con Google Analytics 4 y Meta Pixel",
        "Formulario avanzado con validación interactiva",
        "Optimización Core Web Vitals (Velocidad de carga < 1.5s)"
      ] : [
        "Everything in Basic +",
        "Dynamic UI micro-animations and motion transitions",
        "Google Analytics 4 & Meta Pixel integration",
        "Advanced form validation and instant user feedback",
        "Core Web Vitals performance tuning (< 1.5s load)"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo incluido en el paquete Estándar +",
        "Conexión directa a CRM / Email Marketing (Mailchimp, HubSpot, WhatsApp API)",
        "Configuración de variante para A/B Testing",
        "Soporte bilingüe (Español e Inglés)",
        "CMS ligero para editar textos e imágenes fácilmente"
      ] : [
        "Everything in Standard +",
        "Direct CRM / Email Marketing sync (HubSpot, Mailchimp, WhatsApp API)",
        "A/B Testing variant configuration",
        "Bilingual / Multi-language localization",
        "Lightweight CMS for easy text and image editing"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo incluido en el paquete Avanzado +",
        "Arquitectura Headless / Serverless dedicada",
        "Despliegue global en CDN Edge de alta velocidad",
        "Integración de Webhooks personalizados en servidor",
        "Soporte y acompañamiento prioritario de lanzamiento"
      ] : [
        "Everything in Advanced +",
        "Dedicated Headless / Serverless architecture",
        "Global Edge CDN deployment infrastructure",
        "Custom server-side Webhook & API pipeline",
        "Priority launch support and dedicated team sign-off"
      ];
    }
  } else if (serviceSlug === "brand-identity") {
    if (tier === "basic") {
      bullets = isEs ? [
        "Diseño de Logotipo principal (concepto limpio + revisiones)",
        "Paleta de colores primaria y guía tipográfica básica",
        "Entregables en formatos vectoriales y web (SVG, PNG, PDF)",
        "Guía esencial de uso de marca (Brand One-Sheet)"
      ] : [
        "Primary Logo design (clean concept + revisions)",
        "Primary color palette & core typography guidance",
        "Deliverables in vector & web formats (SVG, PNG, PDF)",
        "Essential Brand One-Sheet usage guide"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo incluido en el paquete Básico +",
        "Logotipo principal + variaciones (isotipo, versión horizontal/vertical)",
        "Manual de Identidad de Marca (usos correctos, espaciados)",
        "Plantillas iniciales para Redes Sociales (artes editables en Figma/Canva)",
        "Papelería corporativa esencial (tarjeta digital, firma de correo)"
      ] : [
        "Everything in Basic +",
        "Primary logo + variations (icon mark, stacked/horizontal layout)",
        "Full Brand Identity Guidelines Manual (spacing, clear space)",
        "Initial Social Media post templates (editable Figma/Canva)",
        "Essential digital stationery (digital card, email signature)"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo incluido en el paquete Estándar +",
        "Sistema de identidad visual completo (patrones de marca, texturas e iconografía)",
        "Pack ampliado de plantillas para redes sociales y banners publicitarios",
        "Kit de papelería corporativa física e impresa (membretes, carpetas)",
        "Manual de Marca extendido con tono de voz e historia de marca"
      ] : [
        "Everything in Standard +",
        "Full visual identity system (brand patterns, textures & icons)",
        "Expanded social media templates & ad banner suite",
        "Print stationery collateral kit (letterheads, folders, badges)",
        "Extended Brand Guidelines with voice & brand story"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo incluido en el paquete Avanzado +",
        "Sistema de diseño de marca corporativo multimarca o sub-marcas",
        "Animación de marca y motion logo (Logo Animation 2D/3D)",
        "Guía de aplicaciones físicas, empaques, merch y señalética",
        "Brand Portal / Drive centralizado con licencias y vectores"
      ] : [
        "Everything in Advanced +",
        "Multi-brand corporate design architecture & sub-brand system",
        "2D/3D Logo Motion Animation & brand stingers",
        "Physical collateral, packaging, merch & signage guidelines",
        "Centralized Brand Portal with licensed assets & vectors"
      ];
    }
  } else if (serviceSlug === "uiux-design") {
    if (tier === "basic") {
      bullets = isEs ? [
        "Wireframes de baja/alta fidelidad para 3 a 5 pantallas principales",
        "Mapa de navegación y flujo de usuario básico",
        "Guía de estilos UI esencial (colores, botones, fuentes)",
        "Archivo entregable en Figma listo para revisión"
      ] : [
        "Low/High fidelity wireframes for 3 to 5 key screens",
        "User flow navigation map",
        "Essential UI style guide (colors, buttons, typography)",
        "Figma source deliverable ready for review"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Prototipo interactivo navegable y testeable en Figma",
        "Sistema de diseño UI (Design System) con componentes reutilizables",
        "Diseño adaptativo para Móvil y Desktop",
        "Handover técnico organizado para desarrolladores"
      ] : [
        "Everything in Basic +",
        "Interactive clickable prototype in Figma",
        "UI Design System with reusable UI components & variants",
        "Responsive layout design (Mobile & Desktop)",
        "Organized developer handover specifications"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Arquitectura de información completa y User Journeys detallados",
        "Diseño UI/UX para 15+ pantallas o módulos complejos",
        "Micro-interacciones y especificaciones de animación",
        "Pruebas de usabilidad iniciales con usuarios"
      ] : [
        "Everything in Standard +",
        "Full Information Architecture & detailed User Journey maps",
        "UI/UX design for 15+ screens or complex user flows",
        "Micro-interaction specifications & motion transitions",
        "Initial usability user testing validation"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Design System corporativo multiplataforma (Web, iOS, Android)",
        "Auditoría de accesibilidad completa (WCAG / AA Compliance)",
        "Investigación cualitativa/cuantitativa y pruebas A/B de usabilidad",
        "Acompañamiento en sprint de diseño y QA visual de desarrollo"
      ] : [
        "Everything in Advanced +",
        "Cross-platform corporate Design System (Web, iOS, Android)",
        "Full Accessibility Audit (WCAG AA Compliance)",
        "Qualitative & Quantitative UX Research & A/B testing",
        "Design sprint facilitation & developer visual QA"
      ];
    }
  } else if (serviceSlug === "content-strategy" || serviceSlug === "social-media-management") {
    if (tier === "basic") {
      bullets = isEs ? [
        "Plan de contenido básico mensual (8 a 10 publicaciones)",
        "Redacción de textos/copys optimizados para redes",
        "Calendario editorial mensual",
        "Diseño de piezas gráficas estáticas básicas"
      ] : [
        "Basic monthly content plan (8 to 10 posts)",
        "Social media copy writing & hashtag selection",
        "Monthly editorial calendar schedule",
        "Basic static graphic design posts"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Gestión activa de 2 canales (ej. Instagram y LinkedIn/Facebook)",
        "Producción de 15 a 20 piezas (gráficas dinámicas + carruseles)",
        "Estrategia de palabras clave y temas de tendencia",
        "Reporte mensual de rendimiento y alcance"
      ] : [
        "Everything in Basic +",
        "Active management of 2 channels (e.g., Instagram & LinkedIn)",
        "15 to 20 content pieces (carousels & motion graphics)",
        "Keyword & trending topic content strategy",
        "Monthly reach & engagement performance report"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Edición y producción de Reels / Shorts / TikToks",
        "Gestión de 3+ redes sociales con atención a comunidad básica",
        "Configuración y supervisión de pauta publicitaria (Ads)",
        "Reporte analítico avanzado con recomendaciones tácticas"
      ] : [
        "Everything in Standard +",
        "Reels / Shorts / TikTok video editing & production",
        "Management of 3+ channels with community interaction",
        "Paid ad campaign setup & oversight (Ads Manager)",
        "Advanced analytics reporting with tactical recommendations"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Equipo de contenido dedicado (Community Manager + Diseñador + Copywriter)",
        "Estrategia multicanal 360°, influencer marketing y PR digital",
        "Monitoreo de reputación de marca y gestión de crisis",
        "Producción audiovisual presencial o de estudio de alto impacto"
      ] : [
        "Everything in Advanced +",
        "Dedicated content squad (Community Manager + Designer + Copywriter)",
        "360° multi-channel strategy, influencer partnerships & digital PR",
        "Brand reputation monitoring & crisis management",
        "High-impact video production & studio content creation"
      ];
    }
  } else if (serviceSlug === "marketing-campaign") {
    if (tier === "basic") {
      bullets = isEs ? [
        "Configuración inicial de campaña publicitaria en 1 canal (Meta o Google)",
        "Segmentación de audiencia inicial y palabras clave",
        "3 a 5 artes gráficos y copys publicitarios",
        "Reporte final de resultados de campaña"
      ] : [
        "Campaign setup on 1 channel (Meta or Google Ads)",
        "Initial target audience & keyword segmentation",
        "3 to 5 ad creatives and copy variations",
        "Final campaign performance report"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Estrategia multicanal (Meta Ads + Google Ads)",
        "Instalación de píxel de conversión y seguimiento de eventos",
        "Pruebas A/B de anuncios y copys (8 a 12 variaciones)",
        "Optimización semanal de presupuesto para máximo ROI"
      ] : [
        "Everything in Basic +",
        "Multi-channel strategy (Meta Ads + Google Ads)",
        "Conversion pixel & event tracking setup",
        "A/B testing for ad creatives and copies (8-12 variations)",
        "Weekly budget optimization for peak ROI"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Embudo de ventas completo (Lead Magnet + Retargeting)",
        "Diseño de Landing Page orientada a conversión de campaña",
        "Integración con CRM para seguimiento de leads",
        "Reportes semanales en vivo y optimización diaria"
      ] : [
        "Everything in Standard +",
        "Full sales funnel architecture (Lead Magnet + Retargeting)",
        "Dedicated conversion landing page design",
        "CRM lead capture integration & automated follow-up",
        "Live weekly analytics dashboards & daily ad tuning"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Gestión de campañas de alto presupuesto publicitario",
        "Modelos de atribución multicanal avanzados y analítica BI",
        "Estrategia omnicanal con influencers, PR y retargeting masivo",
        "Equipo de Growth Hacking y Performance dedicado"
      ] : [
        "Everything in Advanced +",
        "High-budget ad spend management & scaling",
        "Advanced multi-touch attribution modeling & BI analytics",
        "Omnichannel campaign scaling with influencer & PR synergy",
        "Dedicated Growth Hacking & Performance team"
      ];
    }
  } else if (serviceSlug === "corporate-website") {
    if (tier === "basic") {
      bullets = isEs ? [
        "Sitio web corporativo de 1 a 5 secciones principales",
        "Diseño responsivo moderno optimizado para móviles",
        "Formulario de contacto y mapa interactivo",
        "SEO Técnico esencial (meta tags, sitemap, robots.txt)"
      ] : [
        "1 to 5 core corporate site sections",
        "Modern responsive design optimized for mobile",
        "Contact form and interactive map location",
        "Essential technical SEO (meta tags, sitemap, robots.txt)"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "CMS de gestión de contenidos (WordPress o Headless)",
        "Blog corporativo o centro de noticias",
        "Animaciones UI interactivas y componentes de marca",
        "Integración con Google Analytics 4 y Search Console"
      ] : [
        "Everything in Basic +",
        "Content Management System (WordPress or Headless)",
        "Corporate blog or news section",
        "Interactive UI animations & branded components",
        "Google Analytics 4 & Search Console integration"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Soporte multi-idioma nativo",
        "Zona de clientes / Portal con inicio de sesión seguro",
        "Integración con CRM (HubSpot, Salesforce, Zoho)",
        "Score de rendimiento web de alto nivel (>90 en Lighthouse)"
      ] : [
        "Everything in Standard +",
        "Native multi-language localization",
        "Client Portal / Secure user login area",
        "CRM integration (HubSpot, Salesforce, Zoho)",
        "Top-tier performance tuning (>90 Lighthouse score)"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Integración bidireccional con ERP/CRM corporativo vía API",
        "Arquitectura multi-región y alta disponibilidad",
        "Cumplimiento de seguridad, GDPR y auditoría RLS",
        "Garantía y SLA de soporte corporativo dedicado"
      ] : [
        "Everything in Advanced +",
        "Bi-directional corporate ERP/CRM API integration",
        "Multi-region high availability architecture",
        "Enterprise security compliance & RLS audit",
        "Dedicated SLA support guarantee"
      ];
    }
  } else if (serviceSlug === "ecommerce-store" || serviceSlug === "ecommerce-optimization") {
    if (tier === "basic") {
      bullets = isEs ? [
        "Tienda online básica (hasta 50 productos)",
        "1 Pasarela de pagos integrada (Stripe, MercadoPago o PayU)",
        "Checkout responsivo rápido optimizado para móviles",
        "Configuración inicial de tarifas de envío"
      ] : [
        "Basic online store setup (up to 50 products)",
        "1 Integrated payment gateway (Stripe, MercadoPago, PayU)",
        "Fast responsive checkout optimized for mobile",
        "Basic shipping rates configuration"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Catálogo ampliado con variaciones (talla, color, opciones)",
        "Múltiples métodos de pago (Tarjetas, PSE, Nequi, Daviplata)",
        "Sistema de cupones de descuento y carrito abandonado",
        "Integración con píxeles de venta (Meta, Google Shopping)"
      ] : [
        "Everything in Basic +",
        "Expanded catalog with variants (size, color, options)",
        "Multiple payment methods (Credit cards, local transfers)",
        "Discount coupons & abandoned cart recovery emails",
        "Sales pixel integration (Meta, Google Shopping)"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Integración con empresas de envío en tiempo real",
        "Sincronización con sistema contable / inventario externo",
        "Filtros de búsqueda avanzada de productos (Facet search)",
        "Dashboard avanzado de rendimiento de ventas"
      ] : [
        "Everything in Standard +",
        "Real-time multi-carrier shipping integration",
        "External ERP / Inventory / Accounting sync",
        "Advanced faceted product search and filter system",
        "Advanced sales & conversion analytics dashboard"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Arquitectura Marketplace multi-vendedor o B2B wholesale",
        "Checkout Headless ultrarrápido preparado para alto tráfico",
        "Personalización de producto con vista interactiva",
        "Soporte prioritario 24/7 en campañas de alto pico"
      ] : [
        "Everything in Advanced +",
        "Multi-vendor Marketplace or B2B Wholesale architecture",
        "Ultra-fast Headless Checkout for flash-sale traffic",
        "Custom product preview / interactive viewer",
        "Priority 24/7 support during high-peak campaigns"
      ];
    }
  } else if (serviceSlug === "custom-web-app" || serviceSlug === "data-dashboard" || serviceSlug === "bi-implementation") {
    if (tier === "basic") {
      bullets = isEs ? [
        "MVP Web con 5 a 10 pantallas principales",
        "Autenticación estándar (Correo y contraseña)",
        "Panel de control para 1 rol de usuario (Admin)",
        "Base de datos relacional y APIs REST esenciales"
      ] : [
        "Web App MVP with 5 to 10 main screens",
        "Standard authentication (Email & password)",
        "Admin control panel for 1 user role",
        "Relational database & essential REST APIs"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Hasta 3 tipos de usuarios con roles y permisos",
        "Integración con 1 o 2 APIs externas (Pagos, Notificaciones)",
        "Tablas avanzadas con filtros y exportación (Excel/PDF)",
        "Diseño de interfaz a medida con componentes reutilizables"
      ] : [
        "Everything in Basic +",
        "Up to 3 user roles with permission scopes",
        "Integration with 1 or 2 external APIs (Payments, SMS/Email)",
        "Advanced tables with filtering, search, and Excel/PDF export",
        "Custom UI design with reusable component design system"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Funcionalidades en tiempo real (WebSockets / Instant updates)",
        "Autenticación SSO / Social Login (Google, Apple, Microsoft)",
        "Automatizaciones en segundo plano y tareas programadas",
        "Reportes y gráficos de analítica personalizados"
      ] : [
        "Everything in Standard +",
        "Real-time features (WebSockets / Instant updates)",
        "SSO / Social Login authentication (Google, Apple, Microsoft)",
        "Background task automations & scheduled cron jobs",
        "Custom analytics charts and performance reporting"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Arquitectura multi-tenant para plataforma SaaS comercializable",
        "Integración de modelos de IA / LLMs o análisis predictivo",
        "Infraestructura distribuida con alta disponibilidad",
        "Documentación técnica de API y guías de desarrollador"
      ] : [
        "Everything in Advanced +",
        "Multi-tenant architecture for scalable commercial SaaS",
        "AI / LLM model integration or predictive analytics engine",
        "Distributed high-availability server architecture",
        "Complete technical API documentation and developer portal"
      ];
    }
  } else if (serviceSlug === "mobile-app-development" || serviceSlug === "app-redesign") {
    if (tier === "basic") {
      bullets = isEs ? [
        "App Móvil MVP (iOS o Android) de 5 a 10 pantallas",
        "Registro e inicio de sesión por correo",
        "Interfaz intuitiva siguiendo guías de diseño móvil",
        "Integración con API backend existente"
      ] : [
        "Mobile App MVP (iOS or Android) with 5 to 10 screens",
        "Email registration and login",
        "Intuitive mobile UI adhering to iOS/Android design guidelines",
        "Integration with existing backend API"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Desarrollo Multiplataforma (iOS y Android en 1 sola base)",
        "Sistema de Notificaciones Push nativas",
        "Integración de pasarela de pagos in-app",
        "Publicación en App Store y Google Play Store"
      ] : [
        "Everything in Basic +",
        "Cross-platform build (iOS & Android from single codebase)",
        "Native Push Notifications system",
        "In-app payment gateway integration",
        "App Store & Google Play Store publishing guidance"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Soporte de modo Offline con sincronización al reconectar",
        "Geolocalización, mapas y sensores nativos (Cámara, GPS)",
        "Autenticación biométrica (FaceID / TouchID)",
        "Analítica en tiempo real de uso del usuario"
      ] : [
        "Everything in Standard +",
        "Offline support with auto-sync on reconnect",
        "Geolocation, maps, and native hardware sensors (Camera, GPS)",
        "Biometric authentication (FaceID / TouchID)",
        "Real-time user engagement analytics tracking"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Backend dedicado serverless de alto rendimiento incluido",
        "Arquitectura modular para crecimiento empresarial",
        "Pruebas de estrés y seguridad in-app",
        "Mantenimiento post-lanzamiento dedicado"
      ] : [
        "Everything in Advanced +",
        "High-performance dedicated serverless backend included",
        "Enterprise scalable modular code architecture",
        "In-app security & load stress testing",
        "Dedicated post-launch SLA maintenance"
      ];
    }
  } else {
    if (tier === "basic") {
      bullets = isEs ? [
        "Entregable esencial enfocado en patrones estándar",
        "Personalización visual limpia adaptada a tu marca",
        "Formulario o canal de interacción básica",
        "Entrega rápida y despliegue inicial"
      ] : [
        "Essential deliverable focused on standard patterns",
        "Clean visual styling adapted to your brand identity",
        "Basic interaction channel or contact form",
        "Fast delivery and initial setup deployment"
      ];
    } else if (tier === "standard") {
      bullets = isEs ? [
        "Todo lo del paquete Básico +",
        "Funcionalidades típicas completas de negocio",
        "Micro-animaciones UI e interacciones mejoradas",
        "Integraciones de analítica de tráfico",
        "Optimización de rendimiento y experiencia"
      ] : [
        "Everything in Basic +",
        "Complete standard business feature set",
        "Enhanced UI micro-animations & user flows",
        "Traffic analytics integration",
        "Performance and UX optimization"
      ];
    } else if (tier === "advanced") {
      bullets = isEs ? [
        "Todo lo del paquete Estándar +",
        "Personalización a medida e integraciones API avanzadas",
        "Funciones automatizadas y paneles de administración",
        "Soporte bilingüe o configuraciones complejas",
        "Alto estándar de velocidad y optimización de código"
      ] : [
        "Everything in Standard +",
        "Custom tailoring and advanced API integrations",
        "Automated workflows & admin control dashboards",
        "Bilingual or multi-option setup",
        "Top-tier performance & code optimization standards"
      ];
    } else {
      bullets = isEs ? [
        "Todo lo del paquete Avanzado +",
        "Arquitectura completa a la medida de nivel empresarial",
        "Alta disponibilidad, redundancia y seguridad RLS",
        "Integración multi-sistema e infraestructura escalable",
        "SLA y garantía de acompañamiento técnico dedicado"
      ] : [
        "Everything in Advanced +",
        "Full-scale custom enterprise-grade architecture",
        "High availability, redundancy, and RLS security",
        "Multi-system API pipeline & scalable cloud setup",
        "Dedicated SLA support and technical sign-off"
      ];
    }
  }

  return { title, desc, bullets };
}

export default function PublicQuoterWizard({ language = "en", clientType }: PublicQuoterWizardProps) {
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

  // Reset scroll position to top whenever changing steps or category
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step, selectedCategory]);

  // Dynamic scope questions state
  const [scopeQuestions, setScopeQuestions] = useState<ScopeQuestion[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [scopeAnswers, setScopeAnswers] = useState<ScopeAnswers>({});

  const [complexity, setComplexity] = useState<ComplexityLevel>("basic");
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

  // Fetch scope questions when service is selected
  useEffect(() => {
    if (!selectedService) {
      setScopeQuestions([]);
      setScopeAnswers({});
      return;
    }

    const loadQuestions = async () => {
      setLoadingQuestions(true);
      try {
        const questions = await getServiceScopeQuestions(selectedService.id);
        setScopeQuestions(questions);

        // Initialize default answers
        const initialAnswers: ScopeAnswers = {};
        questions.forEach((q) => {
          if (q.question_type === "multi_select") {
            initialAnswers[q.id] = [];
          } else if (q.question_type === "boolean") {
            initialAnswers[q.id] = "false";
          } else if (q.options.length > 0) {
            initialAnswers[q.id] = q.options[0].value;
          }
        });
        setScopeAnswers(initialAnswers);
      } catch (err) {
        console.error("Failed to load scope questions:", err);
      } finally {
        setLoadingQuestions(false);
      }
    };

    loadQuestions();
  }, [selectedService]);

  const isScopeStepValid = () => {
    const visibleRequiredQuestions = scopeQuestions.filter((q) => {
      if (!q.is_required) return false;
      if (!q.conditional_on_question_id) return true;
      const parentVal = scopeAnswers[q.conditional_on_question_id];
      return String(parentVal) === String(q.conditional_on_value);
    });

    for (const q of visibleRequiredQuestions) {
      const val = scopeAnswers[q.id];
      if (val === undefined || val === null) return false;
      if (q.question_type === "multi_select") {
        if (!Array.isArray(val) || val.length === 0) return false;
      } else {
        if (String(val).trim() === "") return false;
      }
    }
    return true;
  };

  const availableServices = catalog?.services.filter(
    (s) => s.category_id === selectedCategory?.id
  ) || [];

  const handleCalculateEstimate = async () => {
    setCalculating(true);
    try {
      const deliverable =
        catalog?.deliverables.find(
          (d) => d.service_id === selectedService?.id || d.is_active
        ) || catalog?.deliverables[0];

      const delivId = deliverable?.id || "deliv-default";

      const preview = await calculatePublicEstimatePreview({
        service_id: selectedService?.id,
        scope_answers: scopeAnswers,
        items: [
          {
            deliverable_id: delivId,
            quantity: 1,
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
        catalog?.deliverables.find((d) => d.service_id === selectedService?.id || d.is_active) ||
        catalog?.deliverables[0];
      const delivId = deliverable?.id || "deliv-default";

      const res = await submitPublicQuoteRequest({
        client_name: clientName,
        client_email: clientEmail,
        client_company: clientCompany,
        client_phone: clientPhone,
        service_id: selectedService?.id,
        scope_answers: scopeAnswers,
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

          {/* Interactive Breadcrumb Bar (Migas de Pan / Resumen de Selección) */}
          {step > 1 && (
            <nav aria-label="Breadcrumb" className="bg-white/80 border border-slate-200/80 backdrop-blur-md rounded-2xl p-3 flex flex-wrap items-center gap-2 text-xs shadow-xs animate-fade-in">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">tune</span>
                {language === "es" ? "Cotizando:" : "Quoting:"}
              </span>

              {/* Step 1 Selection: Category */}
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all shadow-2xs group cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    step === 1
                      ? "bg-slate-900 text-white border-slate-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  title={language === "es" ? "Cambiar categoría" : "Change category"}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step === 1 ? "text-slate-300" : "text-slate-400 group-hover:text-slate-600"}`}>
                    {language === "es" ? "Categoría:" : "Cat:"}
                  </span>
                  <span className={step === 1 ? "font-bold text-white" : "font-bold text-slate-900"}>{selectedCategory.name}</span>
                  {step > 1 && <span className="material-symbols-outlined text-xs text-slate-400 group-hover:text-slate-600" aria-hidden="true">edit</span>}
                </button>
              )}

              {/* Separator icon */}
              {selectedService && <span className="material-symbols-outlined text-slate-300 text-xs" aria-hidden="true">chevron_right</span>}

              {/* Step 2 Selection: Service */}
              {selectedService && (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all shadow-2xs group cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    step === 2
                      ? "bg-slate-900 text-white border-slate-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  title={language === "es" ? "Cambiar servicio" : "Change service"}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step === 2 ? "text-slate-300" : "text-slate-400 group-hover:text-slate-600"}`}>
                    {language === "es" ? "Servicio:" : "Srv:"}
                  </span>
                  <span className={step === 2 ? "font-bold text-white" : "font-bold text-slate-900"}>{selectedService.name}</span>
                  {step > 2 && <span className="material-symbols-outlined text-xs text-slate-400 group-hover:text-slate-600" aria-hidden="true">edit</span>}
                </button>
              )}

              {/* Separator icon */}
              {step >= 4 && <span className="material-symbols-outlined text-slate-300 text-xs" aria-hidden="true">chevron_right</span>}

              {/* Step 3 Selection: Scope Summary */}
              {step >= 4 && (
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all shadow-2xs group cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900 ${
                    step === 3
                      ? "bg-slate-900 text-white border-slate-900 font-bold"
                      : "bg-slate-50 border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-100"
                  }`}
                  title={language === "es" ? "Editar preguntas de alcance" : "Edit scope details"}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${step === 3 ? "text-slate-300" : "text-slate-400 group-hover:text-slate-600"}`}>
                    {language === "es" ? "Alcance:" : "Scope:"}
                  </span>
                  <span className={step === 3 ? "font-bold text-white" : "font-bold text-slate-900"}>
                    {Object.keys(scopeAnswers).length > 0
                      ? `${Object.keys(scopeAnswers).length} ${language === "es" ? "detalles" : "details"}`
                      : (language === "es" ? "Requisitos base" : "Base scope")}
                  </span>
                  {step > 3 && <span className="material-symbols-outlined text-xs text-slate-400 group-hover:text-slate-600" aria-hidden="true">edit</span>}
                </button>
              )}

              {/* Separator icon */}
              {step >= 5 && <span className="material-symbols-outlined text-slate-300 text-xs" aria-hidden="true">chevron_right</span>}

              {/* Step 4 Selection: Complexity & Urgency */}
              {step >= 5 && (
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold hover:border-slate-300 hover:bg-slate-100 transition-all shadow-2xs group cursor-pointer focus-visible:ring-2 focus-visible:ring-slate-900"
                  title={language === "es" ? "Cambiar complejidad" : "Change complexity"}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-600">
                    {language === "es" ? "Complejidad:" : "Complexity:"}
                  </span>
                  <span className="font-bold text-slate-900 capitalize">
                    {complexity} ({urgency === "normal" ? (language === "es" ? "Estándar" : "Normal") : urgency})
                  </span>
                  <span className="material-symbols-outlined text-xs text-slate-400 group-hover:text-slate-600" aria-hidden="true">edit</span>
                </button>
              )}
            </nav>
          )}
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
                      setSelectedService(null);
                    }
                  }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedService(null);
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

          <div className="flex items-center justify-between pt-4">
            {!selectedCategory ? (
              <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">info</span>
                {language === "es" ? "Selecciona una categoría para continuar" : "Please select a category to proceed"}
              </span>
            ) : (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                <span className="material-symbols-outlined text-sm" aria-hidden="true">check_circle</span>
                {language === "es" ? "Categoría seleccionada" : "Category selected"}
              </span>
            )}
            <button
              onClick={() => setStep(2)}
              disabled={!selectedCategory}
              className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-slate-900"
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

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Back" : "Atrás"}
            </button>

            <div className="flex items-center gap-3">
              {!selectedService ? (
                <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">info</span>
                  {language === "es" ? "Selecciona un servicio para continuar" : "Please select a service to proceed"}
                </span>
              ) : (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">check_circle</span>
                  {language === "es" ? "Servicio seleccionado" : "Service selected"}
                </span>
              )}
              <button
                onClick={() => setStep(3)}
                disabled={!selectedService}
                className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                {language === "en" ? "Next: Scope Details" : "Siguiente: Detalles"}
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
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
            {selectedService && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-slate-900/5 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200/50">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">{selectedCategory?.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-900 font-bold">{selectedService.name}</span>
              </div>
            )}
            <p className="text-sm text-slate-500 mt-1">
              {language === "en"
                ? `Answer a few questions tailored to ${selectedService?.name || "your selected service"}.`
                : `Responde algunas preguntas específicas para ${selectedService?.name_es || selectedService?.name || "tu servicio"}.`}
            </p>
          </div>

          {/* DYNAMIC SCOPE QUESTIONNAIRE */}
          {loadingQuestions ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <span className="material-symbols-outlined animate-spin text-2xl mb-2 block">
                progress_activity
              </span>
              {language === "en" ? "Loading questions..." : "Cargando preguntas..."}
            </div>
          ) : scopeQuestions.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 text-xs text-slate-500 text-center py-8">
              <span className="material-symbols-outlined text-3xl text-slate-300 mb-2 block">
                assignment
              </span>
              {language === "en"
                ? "No specific scope questions required for this service. General requirements will be reviewed during project discovery."
                : "No se requieren preguntas específicas para este servicio. Los requisitos generales se definirán en la reunión de alineación."}
            </div>
          ) : (
            <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/80 text-xs">
              {scopeQuestions
                .filter((q) => {
                  if (!q.conditional_on_question_id) return true;
                  const parentVal = scopeAnswers[q.conditional_on_question_id];
                  return String(parentVal) === String(q.conditional_on_value);
                })
                .map((q) => {
                  const qLabel = language === "en" ? q.label : q.label_es || q.label;
                  const currentAnswer = scopeAnswers[q.id];

                  return (
                    <div key={q.id} className="space-y-2">
                      <label className="block font-bold text-slate-900">
                        {qLabel}
                        {q.is_required && <span className="text-red-500 ml-1">*</span>}
                      </label>

                      {/* QUESTION TYPE: SELECT */}
                      {q.question_type === "select" && (
                        <select
                          value={String(currentAnswer || "")}
                          onChange={(e) =>
                            setScopeAnswers({ ...scopeAnswers, [q.id]: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                        >
                          {q.options.map((opt) => (
                            <option key={opt.id} value={opt.value}>
                              {language === "en" ? opt.label : opt.label_es || opt.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* QUESTION TYPE: MULTI_SELECT */}
                      {q.question_type === "multi_select" && (
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) => {
                            const selectedList = Array.isArray(currentAnswer)
                              ? (currentAnswer as string[])
                              : [];
                            const active = selectedList.includes(opt.value);
                            const optLabel =
                              language === "en" ? opt.label : opt.label_es || opt.label;

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => {
                                  const updated = active
                                    ? selectedList.filter((v) => v !== opt.value)
                                    : [...selectedList, opt.value];
                                  setScopeAnswers({ ...scopeAnswers, [q.id]: updated });
                                }}
                                aria-pressed={active}
                                className={`px-3 py-1.5 rounded-xl font-semibold transition-all focus-visible:ring-2 focus-visible:ring-slate-900 flex items-center gap-1.5 ${
                                  active
                                    ? "bg-slate-900 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                <span>{optLabel}</span>
                                {active && (
                                  <span
                                    className="material-symbols-outlined text-xs"
                                    aria-hidden="true"
                                  >
                                    check
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* QUESTION TYPE: BOOLEAN */}
                      {q.question_type === "boolean" && (
                        <div className="flex items-center gap-3">
                          {[
                            { value: "true", label: language === "en" ? "Yes" : "Sí" },
                            { value: "false", label: language === "en" ? "No" : "No" },
                          ].map((bOpt) => {
                            const active = String(currentAnswer) === bOpt.value;
                            return (
                              <button
                                key={bOpt.value}
                                type="button"
                                onClick={() =>
                                  setScopeAnswers({ ...scopeAnswers, [q.id]: bOpt.value })
                                }
                                aria-pressed={active}
                                className={`px-5 py-2 rounded-xl font-semibold transition-all focus-visible:ring-2 focus-visible:ring-slate-900 ${
                                  active
                                    ? "bg-slate-900 text-white shadow-sm"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                              >
                                {bOpt.label}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* QUESTION TYPE: NUMBER */}
                      {q.question_type === "number" && (
                        <input
                          type="number"
                          value={Number(currentAnswer || 0)}
                          onChange={(e) =>
                            setScopeAnswers({
                              ...scopeAnswers,
                              [q.id]: Number(e.target.value),
                            })
                          }
                          className="w-full md:w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-900"
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          )}

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-medium text-xs hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              {language === "en" ? "Back" : "Atrás"}
            </button>

            <div className="flex items-center gap-3">
              {!isScopeStepValid() ? (
                <span className="text-xs text-amber-600 font-semibold flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">warning</span>
                  {language === "es" ? "Responde las preguntas obligatorias (*)" : "Please answer all required questions (*)"}
                </span>
              ) : (
                <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <span className="material-symbols-outlined text-sm" aria-hidden="true">check_circle</span>
                  {language === "es" ? "Alcance definido" : "Scope defined"}
                </span>
              )}
              <button
                onClick={() => setStep(4)}
                disabled={!isScopeStepValid()}
                className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all shadow-md flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                {language === "en" ? "Next: Complexity & Urgency" : "Siguiente: Complejidad"}
                <span className="material-symbols-outlined text-base" aria-hidden="true">arrow_forward</span>
              </button>
            </div>
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
            {selectedService && (
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-slate-900/5 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200/50">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">{selectedCategory?.name}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-900 font-bold">{selectedService.name}</span>
              </div>
            )}
            <p className="text-sm text-slate-500 mt-1">
              {language === "en"
                ? `Select your technical depth and urgency tier for ${selectedService?.name || "this project"}.`
                : `Selecciona el nivel técnico y la urgencia del proyecto para ${selectedService?.name_es || selectedService?.name || "este servicio"}.`}
            </p>
          </div>

          {/* Complexity Options */}
          <div className="space-y-3">
            <label className="block font-bold text-slate-900 text-xs uppercase tracking-wider">
              {language === "en" ? "Technical Complexity" : "Complejidad Técnica"}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label="Complexity level">
              {(["basic", "standard", "advanced", "enterprise"] as const).map((tierId) => {
                const isSelected = complexity === tierId;
                const info = getComplexityTierDetails(tierId, selectedService?.slug, scopeAnswers, language);

                return (
                  <div
                    key={tierId}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setComplexity(tierId);
                      }
                    }}
                    onClick={() => setComplexity(tierId)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/20 scale-[1.01]"
                        : "bg-white/80 border-slate-200/80 text-slate-900 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <h3 className="font-bold text-base">{info.title}</h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSelected
                              ? "bg-white/20 text-white"
                              : tierId === "basic"
                              ? "bg-emerald-100 text-emerald-800"
                              : tierId === "standard"
                              ? "bg-blue-100 text-blue-800"
                              : tierId === "advanced"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tierId === "basic"
                            ? (language === "es" ? "Económico" : "Starter")
                            : tierId === "standard"
                            ? (language === "es" ? "Recomendado" : "Popular")
                            : tierId === "advanced"
                            ? (language === "es" ? "Avanzado" : "Advanced")
                            : (language === "es" ? "Empresarial" : "Enterprise")}
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                        {info.desc}
                      </p>

                      <ul className="mt-4 space-y-2 border-t pt-3 border-slate-200/20 text-xs">
                        {info.bullets.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span
                              className={`material-symbols-outlined text-sm shrink-0 mt-0.5 ${
                                isSelected ? "text-emerald-400" : "text-emerald-600"
                              }`}
                              aria-hidden="true"
                            >
                              check_circle
                            </span>
                            <span className={isSelected ? "text-slate-200 font-medium" : "text-slate-700"}>
                              {b}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
