-- =============================================================================
-- MTB Quote — Seed Data
-- =============================================================================
-- Initial services, deliverables, rate cards, pricing rules, and margin profiles.
-- Run after 001_initial_schema.sql.

-- =============================================================================
-- SERVICES
-- =============================================================================
INSERT INTO services (name, name_es, slug, description, description_es, icon, display_order) VALUES
  ('Frontend Development', 'Desarrollo Frontend', 'frontend-development',
   'High-performance web applications built with React, Next.js, and TypeScript.',
   'Aplicaciones web de alto rendimiento construidas con React, Next.js y TypeScript.',
   'code', 1),
  ('UI/UX Design', 'Diseño UI/UX', 'ui-ux-design',
   'User-centered interface design, prototyping, and design systems.',
   'Diseño de interfaces centrado en el usuario, prototipado y sistemas de diseño.',
   'palette', 2),
  ('E-Commerce', 'E-Commerce', 'e-commerce',
   'Custom online stores, product catalogs, and shopping experiences.',
   'Tiendas en línea personalizadas, catálogos de productos y experiencias de compra.',
   'shopping_cart', 3),
  ('SEO & Web Performance', 'SEO y Rendimiento Web', 'seo-performance',
   'Technical SEO audits, Core Web Vitals optimization, and search visibility.',
   'Auditorías de SEO técnico, optimización de Core Web Vitals y visibilidad en búsquedas.',
   'speed', 4),
  ('Consulting & Strategy', 'Consultoría y Estrategia', 'consulting-strategy',
   'Technical consulting, architecture reviews, and digital strategy.',
   'Consultoría técnica, revisiones de arquitectura y estrategia digital.',
   'psychology', 5);

-- =============================================================================
-- DELIVERABLES — Frontend Development
-- =============================================================================
INSERT INTO deliverables (service_id, name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
SELECT s.id, d.name, d.name_es, d.slug, d.description, d.description_es, d.unit, d.unit_es, d.default_quantity, d.display_order
FROM services s,
(VALUES
  ('Landing Page', 'Landing Page', 'landing-page',
   'Single-page marketing or product landing page.',
   'Página de aterrizaje de marketing o producto.',
   'page', 'página', 1, 1),
  ('Multi-page Website', 'Sitio Web Multi-página', 'multi-page-website',
   'Complete website with multiple routes and navigation.',
   'Sitio web completo con múltiples rutas y navegación.',
   'project', 'proyecto', 1, 2),
  ('Web Application (SPA/SSR)', 'Aplicación Web (SPA/SSR)', 'web-application',
   'Interactive web application with dynamic functionality.',
   'Aplicación web interactiva con funcionalidad dinámica.',
   'project', 'proyecto', 1, 3),
  ('Component Library', 'Librería de Componentes', 'component-library',
   'Reusable UI component library with documentation.',
   'Librería de componentes UI reutilizables con documentación.',
   'project', 'proyecto', 1, 4),
  ('API Integration', 'Integración de API', 'api-integration',
   'Connect frontend to REST/GraphQL APIs.',
   'Conectar frontend con APIs REST/GraphQL.',
   'integration', 'integración', 1, 5)
) AS d(name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
WHERE s.slug = 'frontend-development';

-- =============================================================================
-- DELIVERABLES — UI/UX Design
-- =============================================================================
INSERT INTO deliverables (service_id, name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
SELECT s.id, d.name, d.name_es, d.slug, d.description, d.description_es, d.unit, d.unit_es, d.default_quantity, d.display_order
FROM services s,
(VALUES
  ('UX Research & Wireframing', 'Investigación UX y Wireframes', 'ux-research',
   'User research, personas, user flows, and low-fidelity wireframes.',
   'Investigación de usuarios, personas, flujos de usuario y wireframes de baja fidelidad.',
   'project', 'proyecto', 1, 1),
  ('High-Fidelity UI Design', 'Diseño UI de Alta Fidelidad', 'ui-design',
   'Pixel-perfect mockups and interactive prototypes.',
   'Mockups pixel-perfect y prototipos interactivos.',
   'screen', 'pantalla', 5, 2),
  ('Design System', 'Sistema de Diseño', 'design-system',
   'Complete design system with tokens, components, and documentation.',
   'Sistema de diseño completo con tokens, componentes y documentación.',
   'project', 'proyecto', 1, 3),
  ('Brand Identity', 'Identidad de Marca', 'brand-identity',
   'Logo design, color palette, typography, and brand guidelines.',
   'Diseño de logo, paleta de colores, tipografía y guías de marca.',
   'project', 'proyecto', 1, 4)
) AS d(name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
WHERE s.slug = 'ui-ux-design';

-- =============================================================================
-- DELIVERABLES — E-Commerce
-- =============================================================================
INSERT INTO deliverables (service_id, name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
SELECT s.id, d.name, d.name_es, d.slug, d.description, d.description_es, d.unit, d.unit_es, d.default_quantity, d.display_order
FROM services s,
(VALUES
  ('Online Store Setup', 'Configuración de Tienda Online', 'store-setup',
   'Complete e-commerce storefront with product catalog and checkout.',
   'Tienda en línea completa con catálogo de productos y checkout.',
   'project', 'proyecto', 1, 1),
  ('Payment Integration', 'Integración de Pagos', 'payment-integration',
   'Payment gateway integration (Stripe, PayPal, etc.).',
   'Integración de pasarela de pagos (Stripe, PayPal, etc.).',
   'integration', 'integración', 1, 2),
  ('Product Management (PIM)', 'Gestión de Productos (PIM)', 'pim',
   'Product information management system.',
   'Sistema de gestión de información de productos.',
   'project', 'proyecto', 1, 3)
) AS d(name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
WHERE s.slug = 'e-commerce';

-- =============================================================================
-- DELIVERABLES — SEO & Performance
-- =============================================================================
INSERT INTO deliverables (service_id, name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
SELECT s.id, d.name, d.name_es, d.slug, d.description, d.description_es, d.unit, d.unit_es, d.default_quantity, d.display_order
FROM services s,
(VALUES
  ('Technical SEO Audit', 'Auditoría SEO Técnica', 'seo-audit',
   'Comprehensive technical SEO analysis and recommendations.',
   'Análisis SEO técnico completo y recomendaciones.',
   'audit', 'auditoría', 1, 1),
  ('Core Web Vitals Optimization', 'Optimización de Core Web Vitals', 'cwv-optimization',
   'Performance optimization targeting LCP, INP, and CLS.',
   'Optimización de rendimiento enfocada en LCP, INP y CLS.',
   'project', 'proyecto', 1, 2),
  ('GEO/AEO Optimization', 'Optimización GEO/AEO', 'geo-aeo',
   'AI search engine and generative engine optimization.',
   'Optimización para motores de búsqueda con IA y motores generativos.',
   'project', 'proyecto', 1, 3)
) AS d(name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
WHERE s.slug = 'seo-performance';

-- =============================================================================
-- DELIVERABLES — Consulting & Strategy
-- =============================================================================
INSERT INTO deliverables (service_id, name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
SELECT s.id, d.name, d.name_es, d.slug, d.description, d.description_es, d.unit, d.unit_es, d.default_quantity, d.display_order
FROM services s,
(VALUES
  ('Architecture Review', 'Revisión de Arquitectura', 'architecture-review',
   'Codebase and architecture assessment with recommendations.',
   'Evaluación de código y arquitectura con recomendaciones.',
   'session', 'sesión', 1, 1),
  ('Technical Consulting (Hourly)', 'Consultoría Técnica (Por Hora)', 'technical-consulting',
   'Expert consulting sessions on specific technical challenges.',
   'Sesiones de consultoría experta sobre desafíos técnicos específicos.',
   'hour', 'hora', 4, 2),
  ('Webmaster Retainer', 'Retainer Webmaster', 'webmaster-retainer',
   'Ongoing website management, maintenance, and support.',
   'Gestión, mantenimiento y soporte continuo del sitio web.',
   'month', 'mes', 1, 3)
) AS d(name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order)
WHERE s.slug = 'consulting-strategy';

-- =============================================================================
-- RATE CARDS — Base pricing for all deliverables
-- Note: These are STARTER rates. Adjust via admin UI.
-- =============================================================================
INSERT INTO rate_cards (deliverable_id, base_rate, pricing_model, estimated_hours_low, estimated_hours_high, currency)
SELECT d.id, r.base_rate, r.pricing_model, r.hours_low, r.hours_high, 'USD'
FROM deliverables d
JOIN services s ON d.service_id = s.id
JOIN (VALUES
  -- Frontend Development
  ('frontend-development', 'landing-page',     1500, 'fixed',  12, 24),
  ('frontend-development', 'multi-page-website', 4000, 'fixed',  40, 80),
  ('frontend-development', 'web-application',   8000, 'fixed',  80, 160),
  ('frontend-development', 'component-library', 5000, 'fixed',  50, 100),
  ('frontend-development', 'api-integration',   2000, 'fixed',  16, 40),
  -- UI/UX Design
  ('ui-ux-design', 'ux-research',      3000, 'fixed',  30, 60),
  ('ui-ux-design', 'ui-design',         800, 'fixed',   6, 12),
  ('ui-ux-design', 'design-system',    6000, 'fixed',  60, 120),
  ('ui-ux-design', 'brand-identity',   3500, 'fixed',  30, 60),
  -- E-Commerce
  ('e-commerce', 'store-setup',        6000, 'fixed',  60, 120),
  ('e-commerce', 'payment-integration', 2000, 'fixed',  16, 32),
  ('e-commerce', 'pim',               4000, 'fixed',  40, 80),
  -- SEO & Performance
  ('seo-performance', 'seo-audit',         2500, 'fixed',  20, 40),
  ('seo-performance', 'cwv-optimization',  3000, 'fixed',  24, 48),
  ('seo-performance', 'geo-aeo',           2000, 'fixed',  16, 32),
  -- Consulting
  ('consulting-strategy', 'architecture-review',    1500, 'fixed',  8, 16),
  ('consulting-strategy', 'technical-consulting',    150, 'hourly',  1,  1),
  ('consulting-strategy', 'webmaster-retainer',     2000, 'fixed', 20, 40)
) AS r(service_slug, deliverable_slug, base_rate, pricing_model, hours_low, hours_high)
ON s.slug = r.service_slug AND d.slug = r.deliverable_slug;

-- =============================================================================
-- PRICING RULES
-- =============================================================================

-- Complexity multiplier (applied to all deliverables)
INSERT INTO pricing_rules (name, name_es, description, description_es, rule_type, config, priority) VALUES
  ('Complexity Multiplier', 'Multiplicador de Complejidad',
   'Adjusts price based on project complexity tier.',
   'Ajusta el precio según el nivel de complejidad del proyecto.',
   'complexity_multiplier',
   '{"type": "complexity_multiplier", "multipliers": {"basic": 0.7, "standard": 1.0, "advanced": 1.4, "enterprise": 2.0}}',
   10);

-- Volume discount
INSERT INTO pricing_rules (name, name_es, description, description_es, rule_type, config, priority) VALUES
  ('Volume Discount', 'Descuento por Volumen',
   'Discount applied when multiple deliverables are selected.',
   'Descuento aplicado cuando se seleccionan múltiples entregables.',
   'volume_discount',
   '{"type": "volume_discount", "tiers": [{"min_items": 3, "discount_percent": 5}, {"min_items": 5, "discount_percent": 10}, {"min_items": 8, "discount_percent": 15}]}',
   20);

-- Urgency surcharge
INSERT INTO pricing_rules (name, name_es, description, description_es, rule_type, config, priority) VALUES
  ('Rush Delivery Surcharge', 'Recargo por Entrega Urgente',
   'Additional charge for expedited timelines.',
   'Cargo adicional por plazos expeditos.',
   'urgency_surcharge',
   '{"type": "urgency_surcharge", "tiers": [{"max_days": 7, "surcharge_percent": 50}, {"max_days": 14, "surcharge_percent": 25}, {"max_days": 30, "surcharge_percent": 10}]}',
   30);

-- =============================================================================
-- MARGIN PROFILES
-- =============================================================================
INSERT INTO margin_profiles (name, min_margin_percent, target_margin_percent, max_margin_percent) VALUES
  ('Default', 15.00, 30.00, 50.00);
