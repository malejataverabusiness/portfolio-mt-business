-- =============================================================================
-- MTB Quote V1 — Comprehensive Initial Pricing Seed (seed_v1.sql)
-- =============================================================================
-- Seeds all 25 roles (24 external + 1 MTB internal) across seniority levels,
-- their COP hourly rates, categories, and configurable pricing settings.
-- Completely idempotent: running more than once will update existing records
-- without creating duplicate rows.
-- =============================================================================

-- Ensure schema check constraints, unique constraints, and columns for idempotent conflict resolution
ALTER TABLE roles DROP CONSTRAINT IF EXISTS roles_seniority_check;
ALTER TABLE roles ADD CONSTRAINT roles_seniority_check CHECK (seniority IN ('junior', 'mid', 'senior', 'standard', 'advanced', 'expert'));

ALTER TABLE role_rates DROP CONSTRAINT IF EXISTS uq_role_rates_role_rate;
ALTER TABLE role_rates ADD CONSTRAINT uq_role_rates_role_rate UNIQUE(role_id, hourly_rate_cop);

ALTER TABLE quotes ADD COLUMN IF NOT EXISTS snapshot JSONB DEFAULT NULL;

CREATE TABLE IF NOT EXISTS audit_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id      UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  user_id       UUID DEFAULT NULL,
  action        TEXT NOT NULL DEFAULT 'UPDATE',
  field_changed TEXT NOT NULL,
  old_value     TEXT,
  new_value     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proposals (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id          UUID REFERENCES quotes(id) ON DELETE SET NULL,
  proposal_number   TEXT NOT NULL UNIQUE,
  title             TEXT NOT NULL,
  client_name       TEXT NOT NULL,
  client_email      TEXT,
  client_company    TEXT,
  template_id       TEXT NOT NULL DEFAULT 'standard',
  version           INT NOT NULL DEFAULT 1,
  status            TEXT NOT NULL DEFAULT 'draft',
  currency          TEXT NOT NULL DEFAULT 'COP',
  total_investment  DECIMAL(14,2) NOT NULL DEFAULT 0,
  valid_until       TIMESTAMPTZ,
  content           JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proposal_versions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id      UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  version_number   INT NOT NULL,
  total_investment DECIMAL(14,2) NOT NULL DEFAULT 0,
  content_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by       UUID DEFAULT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS actual_costs (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id                 UUID NOT NULL UNIQUE REFERENCES quotes(id) ON DELETE CASCADE,
  actual_hours             DECIMAL(10,2) NOT NULL DEFAULT 0,
  actual_freelancer_cost   DECIMAL(14,2) NOT NULL DEFAULT 0,
  actual_duration_weeks    INT NOT NULL DEFAULT 0,
  actual_other_costs       DECIMAL(14,2) NOT NULL DEFAULT 0,
  project_outcome          TEXT NOT NULL DEFAULT 'completed',
  notes                    TEXT,
  recorded_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pricing_settings
  ADD COLUMN IF NOT EXISTS mtb_standard_rate_cop DECIMAL(14,2) NOT NULL DEFAULT 140000.00,
  ADD COLUMN IF NOT EXISTS mtb_advanced_rate_cop DECIMAL(14,2) NOT NULL DEFAULT 175000.00,
  ADD COLUMN IF NOT EXISTS mtb_expert_rate_cop   DECIMAL(14,2) NOT NULL DEFAULT 200000.00,
  ADD COLUMN IF NOT EXISTS margin_floor          DECIMAL(5,4) NOT NULL DEFAULT 0.2500,
  ADD COLUMN IF NOT EXISTS margin_target         DECIMAL(5,4) NOT NULL DEFAULT 0.3500,
  ADD COLUMN IF NOT EXISTS margin_premium        DECIMAL(5,4) NOT NULL DEFAULT 0.4500,
  ADD COLUMN IF NOT EXISTS contingency_small     DECIMAL(5,4) NOT NULL DEFAULT 0.1000,
  ADD COLUMN IF NOT EXISTS contingency_medium    DECIMAL(5,4) NOT NULL DEFAULT 0.0800,
  ADD COLUMN IF NOT EXISTS contingency_large     DECIMAL(5,4) NOT NULL DEFAULT 0.0700,
  ADD COLUMN IF NOT EXISTS urgency_normal        DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  ADD COLUMN IF NOT EXISTS urgency_urgent        DECIMAL(4,2) NOT NULL DEFAULT 1.15,
  ADD COLUMN IF NOT EXISTS urgency_very_urgent   DECIMAL(4,2) NOT NULL DEFAULT 1.30,
  ADD COLUMN IF NOT EXISTS urgency_critical      DECIMAL(4,2) NOT NULL DEFAULT 1.50,
  ADD COLUMN IF NOT EXISTS consulting_min_cop    DECIMAL(14,2) NOT NULL DEFAULT 280000.00;

ALTER TABLE pricing_settings DROP CONSTRAINT IF EXISTS chk_mtb_standard_rate_floor;
ALTER TABLE pricing_settings ADD CONSTRAINT chk_mtb_standard_rate_floor CHECK (mtb_standard_rate_cop >= 140000.00);

-- 1. SEED CATEGORIES
INSERT INTO categories (name, name_es, slug, display_order, is_active)
VALUES
  ('E-Commerce & Retail', 'Comercio Electrónico y Retail', 'ecommerce-retail', 1, true),
  ('Bespoke Web Systems', 'Sistemas Web a la Medida', 'bespoke-web-systems', 2, true),
  ('Data & Business Intelligence', 'Data e Inteligencia de Negocios', 'data-bi', 3, true),
  ('Digital Marketing & Content', 'Marketing Digital y Contenidos', 'digital-marketing', 4, true),
  ('Brand Identity & UI/UX', 'Identidad de Marca y UI/UX', 'brand-uiux', 5, true),
  ('Mobile & Custom Apps', 'Aplicaciones Móviles y Custom', 'mobile-apps', 6, true)
ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    name_es = EXCLUDED.name_es,
    display_order = EXCLUDED.display_order,
    is_active = true,
    updated_at = NOW();

-- 2. SEED ALL 25 ROLES (24 EXTERNAL + 1 MTB INTERNAL)
INSERT INTO roles (name, name_es, seniority, is_mtb_internal, is_active)
VALUES
  -- 1. Community Manager
  ('Community Manager', 'Community Manager', 'junior', false, true),
  ('Community Manager', 'Community Manager', 'mid', false, true),
  ('Community Manager', 'Community Manager', 'senior', false, true),
  -- 2. Social Media Manager
  ('Social Media Manager', 'Gerente de Redes Sociales', 'junior', false, true),
  ('Social Media Manager', 'Gerente de Redes Sociales', 'mid', false, true),
  ('Social Media Manager', 'Gerente de Redes Sociales', 'senior', false, true),
  -- 3. Content Manager
  ('Content Manager', 'Gerente de Contenidos', 'junior', false, true),
  ('Content Manager', 'Gerente de Contenidos', 'mid', false, true),
  ('Content Manager', 'Gerente de Contenidos', 'senior', false, true),
  -- 4. Marketing Strategist
  ('Marketing Strategist', 'Estratega de Marketing', 'junior', false, true),
  ('Marketing Strategist', 'Estratega de Marketing', 'mid', false, true),
  ('Marketing Strategist', 'Estratega de Marketing', 'senior', false, true),
  -- 5. Paid Media Specialist
  ('Paid Media Specialist', 'Especialista en Pauta Digital (Paid Media)', 'junior', false, true),
  ('Paid Media Specialist', 'Especialista en Pauta Digital (Paid Media)', 'mid', false, true),
  ('Paid Media Specialist', 'Especialista en Pauta Digital (Paid Media)', 'senior', false, true),
  -- 6. Marketing Analyst
  ('Marketing Analyst', 'Analista de Marketing', 'junior', false, true),
  ('Marketing Analyst', 'Analista de Marketing', 'mid', false, true),
  ('Marketing Analyst', 'Analista de Marketing', 'senior', false, true),
  -- 7. Account Manager
  ('Account Manager', 'Ejecutivo de Cuenta', 'junior', false, true),
  ('Account Manager', 'Ejecutivo de Cuenta', 'mid', false, true),
  ('Account Manager', 'Ejecutivo de Cuenta', 'senior', false, true),
  -- 8. Project Manager
  ('Project Manager', 'Gerente de Proyectos (PM)', 'junior', false, true),
  ('Project Manager', 'Gerente de Proyectos (PM)', 'mid', false, true),
  ('Project Manager', 'Gerente de Proyectos (PM)', 'senior', false, true),
  -- 9. Graphic Designer
  ('Graphic Designer', 'Diseñador Gráfico', 'junior', false, true),
  ('Graphic Designer', 'Diseñador Gráfico', 'mid', false, true),
  ('Graphic Designer', 'Diseñador Gráfico', 'senior', false, true),
  -- 10. Copywriter
  ('Copywriter', 'Redactor Creativo (Copywriter)', 'junior', false, true),
  ('Copywriter', 'Redactor Creativo (Copywriter)', 'mid', false, true),
  ('Copywriter', 'Redactor Creativo (Copywriter)', 'senior', false, true),
  -- 11. Video Editor
  ('Video Editor', 'Editor de Video', 'junior', false, true),
  ('Video Editor', 'Editor de Video', 'mid', false, true),
  ('Video Editor', 'Editor de Video', 'senior', false, true),
  -- 12. Motion Designer
  ('Motion Designer', 'Diseñador de Motion Graphics', 'junior', false, true),
  ('Motion Designer', 'Diseñador de Motion Graphics', 'mid', false, true),
  ('Motion Designer', 'Diseñador de Motion Graphics', 'senior', false, true),
  -- 13. Videographer
  ('Videographer', 'Camarógrafo / Videógrafo', 'junior', false, true),
  ('Videographer', 'Camarógrafo / Videógrafo', 'mid', false, true),
  ('Videographer', 'Camarógrafo / Videógrafo', 'senior', false, true),
  -- 14. Photographer
  ('Photographer', 'Fotógrafo', 'junior', false, true),
  ('Photographer', 'Fotógrafo', 'mid', false, true),
  ('Photographer', 'Fotógrafo', 'senior', false, true),
  -- 15. Producer
  ('Producer', 'Productor Audiovisual', 'junior', false, true),
  ('Producer', 'Productor Audiovisual', 'mid', false, true),
  ('Producer', 'Productor Audiovisual', 'senior', false, true),
  -- 16. UI Designer
  ('UI Designer', 'Diseñador de Interfaces (UI)', 'junior', false, true),
  ('UI Designer', 'Diseñador de Interfaces (UI)', 'mid', false, true),
  ('UI Designer', 'Diseñador de Interfaces (UI)', 'senior', false, true),
  -- 17. UX Designer
  ('UX Designer', 'Diseñador de Experiencia de Usuario (UX)', 'junior', false, true),
  ('UX Designer', 'Diseñador de Experiencia de Usuario (UX)', 'mid', false, true),
  ('UX Designer', 'Diseñador de Experiencia de Usuario (UX)', 'senior', false, true),
  -- 18. Product Designer
  ('Product Designer', 'Diseñador de Producto', 'junior', false, true),
  ('Product Designer', 'Diseñador de Producto', 'mid', false, true),
  ('Product Designer', 'Diseñador de Producto', 'senior', false, true),
  -- 19. Frontend Developer
  ('Frontend Developer', 'Desarrollador Frontend', 'junior', false, true),
  ('Frontend Developer', 'Desarrollador Frontend', 'mid', false, true),
  ('Frontend Developer', 'Desarrollador Frontend', 'senior', false, true),
  -- 20. Backend Developer
  ('Backend Developer', 'Desarrollador Backend', 'junior', false, true),
  ('Backend Developer', 'Desarrollador Backend', 'mid', false, true),
  ('Backend Developer', 'Desarrollador Backend', 'senior', false, true),
  -- 21. Full-Stack Developer
  ('Full-Stack Developer', 'Desarrollador Full-Stack', 'junior', false, true),
  ('Full-Stack Developer', 'Desarrollador Full-Stack', 'mid', false, true),
  ('Full-Stack Developer', 'Desarrollador Full-Stack', 'senior', false, true),
  -- 22. WordPress/CMS Developer
  ('WordPress/CMS Developer', 'Desarrollador WordPress / CMS', 'junior', false, true),
  ('WordPress/CMS Developer', 'Desarrollador WordPress / CMS', 'mid', false, true),
  ('WordPress/CMS Developer', 'Desarrollador WordPress / CMS', 'senior', false, true),
  -- 23. React Native Developer
  ('React Native Developer', 'Desarrollador React Native (Móvil)', 'junior', false, true),
  ('React Native Developer', 'Desarrollador React Native (Móvil)', 'mid', false, true),
  ('React Native Developer', 'Desarrollador React Native (Móvil)', 'senior', false, true),
  -- 24. AI/Automation Specialist
  ('AI/Automation Specialist', 'Especialista en IA y Automatización', 'junior', false, true),
  ('AI/Automation Specialist', 'Especialista en IA y Automatización', 'mid', false, true),
  ('AI/Automation Specialist', 'Especialista en IA y Automatización', 'senior', false, true),
  -- 25. MTB Internal Engineer
  ('MTB Internal Engineer', 'Ingeniero Interno MTB', 'standard', true, true),
  ('MTB Internal Engineer', 'Ingeniero Interno MTB', 'advanced', true, true),
  ('MTB Internal Engineer', 'Ingeniero Interno MTB', 'expert', true, true)
ON CONFLICT (name, seniority, is_mtb_internal) DO UPDATE
SET is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- 3. SEED ALL 75 ROLE RATES IN COP / HOUR
WITH rates_data(role_name, role_seniority, rate_cop) AS (
  VALUES
    -- 1. Community Manager
    ('Community Manager', 'junior', 30000.00),
    ('Community Manager', 'mid', 45000.00),
    ('Community Manager', 'senior', 65000.00),
    -- 2. Social Media Manager
    ('Social Media Manager', 'junior', 40000.00),
    ('Social Media Manager', 'mid', 65000.00),
    ('Social Media Manager', 'senior', 100000.00),
    -- 3. Content Manager
    ('Content Manager', 'junior', 40000.00),
    ('Content Manager', 'mid', 65000.00),
    ('Content Manager', 'senior', 100000.00),
    -- 4. Marketing Strategist
    ('Marketing Strategist', 'junior', 60000.00),
    ('Marketing Strategist', 'mid', 100000.00),
    ('Marketing Strategist', 'senior', 140000.00),
    -- 5. Paid Media Specialist
    ('Paid Media Specialist', 'junior', 40000.00),
    ('Paid Media Specialist', 'mid', 70000.00),
    ('Paid Media Specialist', 'senior', 110000.00),
    -- 6. Marketing Analyst
    ('Marketing Analyst', 'junior', 40000.00),
    ('Marketing Analyst', 'mid', 70000.00),
    ('Marketing Analyst', 'senior', 110000.00),
    -- 7. Account Manager
    ('Account Manager', 'junior', 45000.00),
    ('Account Manager', 'mid', 70000.00),
    ('Account Manager', 'senior', 100000.00),
    -- 8. Project Manager
    ('Project Manager', 'junior', 50000.00),
    ('Project Manager', 'mid', 80000.00),
    ('Project Manager', 'senior', 120000.00),
    -- 9. Graphic Designer
    ('Graphic Designer', 'junior', 25000.00),
    ('Graphic Designer', 'mid', 40000.00),
    ('Graphic Designer', 'senior', 65000.00),
    -- 10. Copywriter
    ('Copywriter', 'junior', 25000.00),
    ('Copywriter', 'mid', 40000.00),
    ('Copywriter', 'senior', 65000.00),
    -- 11. Video Editor
    ('Video Editor', 'junior', 30000.00),
    ('Video Editor', 'mid', 50000.00),
    ('Video Editor', 'senior', 80000.00),
    -- 12. Motion Designer
    ('Motion Designer', 'junior', 40000.00),
    ('Motion Designer', 'mid', 65000.00),
    ('Motion Designer', 'senior', 100000.00),
    -- 13. Videographer
    ('Videographer', 'junior', 60000.00),
    ('Videographer', 'mid', 100000.00),
    ('Videographer', 'senior', 160000.00),
    -- 14. Photographer
    ('Photographer', 'junior', 50000.00),
    ('Photographer', 'mid', 90000.00),
    ('Photographer', 'senior', 150000.00),
    -- 15. Producer
    ('Producer', 'junior', 50000.00),
    ('Producer', 'mid', 80000.00),
    ('Producer', 'senior', 130000.00),
    -- 16. UI Designer
    ('UI Designer', 'junior', 35000.00),
    ('UI Designer', 'mid', 60000.00),
    ('UI Designer', 'senior', 100000.00),
    -- 17. UX Designer
    ('UX Designer', 'junior', 40000.00),
    ('UX Designer', 'mid', 70000.00),
    ('UX Designer', 'senior', 110000.00),
    -- 18. Product Designer
    ('Product Designer', 'junior', 50000.00),
    ('Product Designer', 'mid', 80000.00),
    ('Product Designer', 'senior', 130000.00),
    -- 19. Frontend Developer
    ('Frontend Developer', 'junior', 40000.00),
    ('Frontend Developer', 'mid', 70000.00),
    ('Frontend Developer', 'senior', 120000.00),
    -- 20. Backend Developer
    ('Backend Developer', 'junior', 45000.00),
    ('Backend Developer', 'mid', 75000.00),
    ('Backend Developer', 'senior', 130000.00),
    -- 21. Full-Stack Developer
    ('Full-Stack Developer', 'junior', 50000.00),
    ('Full-Stack Developer', 'mid', 85000.00),
    ('Full-Stack Developer', 'senior', 140000.00),
    -- 22. WordPress/CMS Developer
    ('WordPress/CMS Developer', 'junior', 35000.00),
    ('WordPress/CMS Developer', 'mid', 60000.00),
    ('WordPress/CMS Developer', 'senior', 100000.00),
    -- 23. React Native Developer
    ('React Native Developer', 'junior', 50000.00),
    ('React Native Developer', 'mid', 90000.00),
    ('React Native Developer', 'senior', 150000.00),
    -- 24. AI/Automation Specialist
    ('AI/Automation Specialist', 'junior', 50000.00),
    ('AI/Automation Specialist', 'mid', 90000.00),
    ('AI/Automation Specialist', 'senior', 150000.00),
    -- 25. MTB Internal Engineer
    ('MTB Internal Engineer', 'standard', 140000.00),
    ('MTB Internal Engineer', 'advanced', 175000.00),
    ('MTB Internal Engineer', 'expert', 200000.00)
)
INSERT INTO role_rates (role_id, hourly_rate_cop, currency, is_active)
SELECT r.id, rd.rate_cop, 'COP', true
FROM rates_data rd
JOIN roles r ON r.name = rd.role_name AND r.seniority = rd.role_seniority
ON CONFLICT (role_id, hourly_rate_cop) DO UPDATE
SET is_active = true,
    updated_at = NOW();

-- 4. SEED CONFIGURABLE MTB INTERNAL RATES, MARGINS, CONTINGENCY & URGENCY SETTINGS
-- Using deterministic ID so repeated runs update the active settings row cleanly.
INSERT INTO pricing_settings (
  id,
  default_margin,
  default_contingency,
  account_mgmt_rate,
  project_mgmt_rate,
  min_project_value_cop,
  mtb_standard_rate_cop,
  mtb_advanced_rate_cop,
  mtb_expert_rate_cop,
  margin_floor,
  margin_target,
  margin_premium,
  contingency_small,
  contingency_medium,
  contingency_large,
  urgency_normal,
  urgency_urgent,
  urgency_very_urgent,
  urgency_critical,
  consulting_min_cop,
  is_active
)
VALUES (
  '00000000-0000-0000-0000-000000000001'::UUID,
  0.3500,       -- default target margin 35%
  0.1000,       -- default small contingency 10%
  0.1000,       -- account mgmt rate 10%
  0.1000,       -- project mgmt rate 10%
  3000000.00,   -- min project value 3M COP
  140000.00,    -- MTB Standard (Minimum floor 140k COP/hr)
  175000.00,    -- MTB Advanced
  200000.00,    -- MTB Expert
  0.2500,       -- Margin floor 25%
  0.3500,       -- Margin target 35%
  0.4500,       -- Margin premium 45%
  0.1000,       -- Contingency Small 10%
  0.0800,       -- Contingency Medium 8%
  0.0700,       -- Contingency Large 7%
  1.00,         -- Urgency Normal 1.00
  1.15,         -- Urgency Urgent 1.15
  1.30,         -- Urgency Very Urgent 1.30
  1.50,         -- Urgency Critical 1.50
  280000.00,    -- Consulting Minimum 280,000 COP
  true
)
ON CONFLICT (id) DO UPDATE
SET
  default_margin        = EXCLUDED.default_margin,
  default_contingency   = EXCLUDED.default_contingency,
  account_mgmt_rate     = EXCLUDED.account_mgmt_rate,
  project_mgmt_rate     = EXCLUDED.project_mgmt_rate,
  min_project_value_cop = EXCLUDED.min_project_value_cop,
  mtb_standard_rate_cop = EXCLUDED.mtb_standard_rate_cop,
  mtb_advanced_rate_cop = EXCLUDED.mtb_advanced_rate_cop,
  mtb_expert_rate_cop   = EXCLUDED.mtb_expert_rate_cop,
  margin_floor          = EXCLUDED.margin_floor,
  margin_target         = EXCLUDED.margin_target,
  margin_premium        = EXCLUDED.margin_premium,
  contingency_small     = EXCLUDED.contingency_small,
  contingency_medium    = EXCLUDED.contingency_medium,
  contingency_large     = EXCLUDED.contingency_large,
  urgency_normal        = EXCLUDED.urgency_normal,
  urgency_urgent        = EXCLUDED.urgency_urgent,
  urgency_very_urgent   = EXCLUDED.urgency_very_urgent,
  urgency_critical      = EXCLUDED.urgency_critical,
  consulting_min_cop    = EXCLUDED.consulting_min_cop,
  is_active             = true,
  updated_at            = NOW();

-- 5. SEED SERVICES — Linked to Categories by slug lookup
-- Each category gets 2-3 relevant services.
INSERT INTO services (name, name_es, slug, description, description_es, icon, display_order, is_active, category_id)
VALUES
  -- E-Commerce & Retail (slug: ecommerce-retail)
  ('E-Commerce Store', 'Tienda E-Commerce', 'ecommerce-store',
   'Full e-commerce store setup and launch', 'Configuración y lanzamiento completo de tienda en línea',
   'shopping_cart', 1, true,
   (SELECT id FROM categories WHERE slug = 'ecommerce-retail')),
  ('E-Commerce Optimization', 'Optimización de E-Commerce', 'ecommerce-optimization',
   'Performance and conversion optimization for existing stores', 'Optimización de rendimiento y conversión para tiendas existentes',
   'trending_up', 2, true,
   (SELECT id FROM categories WHERE slug = 'ecommerce-retail')),

  -- Bespoke Web Systems (slug: bespoke-web-systems)
  ('Corporate Website', 'Sitio Web Corporativo', 'corporate-website',
   'Professional corporate website design and development', 'Diseño y desarrollo de sitio web corporativo profesional',
   'language', 1, true,
   (SELECT id FROM categories WHERE slug = 'bespoke-web-systems')),
  ('Custom Web Application', 'Aplicación Web a la Medida', 'custom-web-app',
   'Bespoke web application or SaaS platform', 'Aplicación web o plataforma SaaS a la medida',
   'code', 2, true,
   (SELECT id FROM categories WHERE slug = 'bespoke-web-systems')),
  ('Landing Page', 'Landing Page', 'landing-page',
   'High-conversion landing page design and development', 'Diseño y desarrollo de landing page de alta conversión',
   'web', 3, true,
   (SELECT id FROM categories WHERE slug = 'bespoke-web-systems')),

  -- Data & Business Intelligence (slug: data-bi)
  ('Data Dashboard', 'Dashboard de Datos', 'data-dashboard',
   'Custom analytics dashboard and data visualization', 'Dashboard de analítica personalizado y visualización de datos',
   'analytics', 1, true,
   (SELECT id FROM categories WHERE slug = 'data-bi')),
  ('BI Implementation', 'Implementación de BI', 'bi-implementation',
   'Business intelligence platform setup and reporting', 'Configuración de plataforma de inteligencia de negocios y reportes',
   'bar_chart', 2, true,
   (SELECT id FROM categories WHERE slug = 'data-bi')),

  -- Digital Marketing & Content (slug: digital-marketing)
  ('Social Media Management', 'Gestión de Redes Sociales', 'social-media-management',
   'Full social media strategy, content creation, and community management', 'Estrategia completa de redes sociales, creación de contenido y gestión de comunidad',
   'campaign', 1, true,
   (SELECT id FROM categories WHERE slug = 'digital-marketing')),
  ('Marketing Campaign', 'Campaña de Marketing', 'marketing-campaign',
   'Integrated digital marketing campaign with paid media', 'Campaña de marketing digital integrada con pauta',
   'ads_click', 2, true,
   (SELECT id FROM categories WHERE slug = 'digital-marketing')),
  ('Content Strategy', 'Estrategia de Contenido', 'content-strategy',
   'Content planning, production, and editorial calendar', 'Planificación de contenido, producción y calendario editorial',
   'edit_note', 3, true,
   (SELECT id FROM categories WHERE slug = 'digital-marketing')),

  -- Brand Identity & UI/UX (slug: brand-uiux)
  ('Brand Identity', 'Identidad de Marca', 'brand-identity',
   'Complete brand identity design including logo, guidelines, and collateral', 'Diseño completo de identidad de marca incluyendo logo, lineamientos y material',
   'palette', 1, true,
   (SELECT id FROM categories WHERE slug = 'brand-uiux')),
  ('UI/UX Design', 'Diseño UI/UX', 'uiux-design',
   'User interface and user experience design for digital products', 'Diseño de interfaz y experiencia de usuario para productos digitales',
   'design_services', 2, true,
   (SELECT id FROM categories WHERE slug = 'brand-uiux')),

  -- Mobile & Custom Apps (slug: mobile-apps)
  ('Mobile App Development', 'Desarrollo de App Móvil', 'mobile-app-development',
   'Native or cross-platform mobile application development', 'Desarrollo de aplicación móvil nativa o multiplataforma',
   'smartphone', 1, true,
   (SELECT id FROM categories WHERE slug = 'mobile-apps')),
  ('App Redesign & Optimization', 'Rediseño y Optimización de App', 'app-redesign',
   'Redesign and performance optimization of existing mobile apps', 'Rediseño y optimización de rendimiento de apps existentes',
   'phone_android', 2, true,
   (SELECT id FROM categories WHERE slug = 'mobile-apps'))

ON CONFLICT (slug) DO UPDATE
SET name = EXCLUDED.name,
    name_es = EXCLUDED.name_es,
    description = EXCLUDED.description,
    description_es = EXCLUDED.description_es,
    icon = EXCLUDED.icon,
    display_order = EXCLUDED.display_order,
    is_active = true,
    category_id = EXCLUDED.category_id,
    updated_at = NOW();

-- 6. SEED DELIVERABLES — Linked to Services by slug lookup
-- Each service gets 1-3 representative deliverables.
INSERT INTO deliverables (service_id, name, name_es, slug, description, description_es, unit, unit_es, default_quantity, display_order, is_active)
VALUES
  -- E-Commerce Store
  ((SELECT id FROM services WHERE slug = 'ecommerce-store'),
   'Full Store Setup', 'Configuración Completa de Tienda', 'full-store-setup',
   'Complete store configuration, product catalog, and checkout flow', 'Configuración completa de tienda, catálogo de productos y flujo de checkout',
   'project', 'proyecto', 1, 1, true),
  ((SELECT id FROM services WHERE slug = 'ecommerce-store'),
   'Product Page Template', 'Plantilla de Página de Producto', 'product-page-template',
   'Custom product page template design and development', 'Diseño y desarrollo de plantilla de página de producto',
   'page', 'página', 1, 2, true),

  -- E-Commerce Optimization
  ((SELECT id FROM services WHERE slug = 'ecommerce-optimization'),
   'Conversion Audit & Optimization', 'Auditoría y Optimización de Conversión', 'conversion-audit',
   'Full conversion funnel audit and optimization recommendations', 'Auditoría completa de embudo de conversión y recomendaciones de optimización',
   'project', 'proyecto', 1, 1, true),

  -- Corporate Website
  ((SELECT id FROM services WHERE slug = 'corporate-website'),
   'Corporate Website Project', 'Proyecto de Sitio Corporativo', 'corporate-website-project',
   'Multi-page corporate website with responsive design', 'Sitio web corporativo multi-página con diseño responsivo',
   'project', 'proyecto', 1, 1, true),

  -- Custom Web Application
  ((SELECT id FROM services WHERE slug = 'custom-web-app'),
   'Web Application MVP', 'MVP de Aplicación Web', 'web-app-mvp',
   'Minimum viable product for a web application or SaaS', 'Producto mínimo viable para aplicación web o SaaS',
   'project', 'proyecto', 1, 1, true),

  -- Landing Page
  ((SELECT id FROM services WHERE slug = 'landing-page'),
   'Landing Page Design & Dev', 'Diseño y Desarrollo de Landing Page', 'landing-page-design',
   'High-conversion landing page with A/B testing setup', 'Landing page de alta conversión con configuración de A/B testing',
   'page', 'página', 1, 1, true),

  -- Data Dashboard
  ((SELECT id FROM services WHERE slug = 'data-dashboard'),
   'Custom Dashboard', 'Dashboard Personalizado', 'custom-dashboard',
   'Interactive data dashboard with real-time metrics', 'Dashboard de datos interactivo con métricas en tiempo real',
   'project', 'proyecto', 1, 1, true),

  -- BI Implementation
  ((SELECT id FROM services WHERE slug = 'bi-implementation'),
   'BI Platform Setup', 'Configuración de Plataforma BI', 'bi-platform-setup',
   'Business intelligence platform setup with automated reporting', 'Configuración de plataforma de BI con reportes automatizados',
   'project', 'proyecto', 1, 1, true),

  -- Social Media Management
  ((SELECT id FROM services WHERE slug = 'social-media-management'),
   'Monthly Social Media Package', 'Paquete Mensual de Redes Sociales', 'monthly-social-media',
   'Monthly content creation, scheduling, and community management', 'Creación de contenido mensual, programación y gestión de comunidad',
   'month', 'mes', 1, 1, true),

  -- Marketing Campaign
  ((SELECT id FROM services WHERE slug = 'marketing-campaign'),
   'Integrated Campaign', 'Campaña Integrada', 'integrated-campaign',
   'Full digital marketing campaign including paid media management', 'Campaña de marketing digital completa incluyendo gestión de pauta',
   'campaign', 'campaña', 1, 1, true),

  -- Content Strategy
  ((SELECT id FROM services WHERE slug = 'content-strategy'),
   'Content Strategy & Calendar', 'Estrategia de Contenido y Calendario', 'content-strategy-calendar',
   'Editorial strategy, content calendar, and production guidelines', 'Estrategia editorial, calendario de contenido y lineamientos de producción',
   'project', 'proyecto', 1, 1, true),

  -- Brand Identity
  ((SELECT id FROM services WHERE slug = 'brand-identity'),
   'Full Brand Identity Package', 'Paquete Completo de Identidad de Marca', 'full-brand-identity',
   'Logo, brand guidelines, typography, color palette, and brand collateral', 'Logo, manual de marca, tipografía, paleta de colores y material de marca',
   'project', 'proyecto', 1, 1, true),

  -- UI/UX Design
  ((SELECT id FROM services WHERE slug = 'uiux-design'),
   'UI/UX Design Project', 'Proyecto de Diseño UI/UX', 'uiux-design-project',
   'Complete UI/UX design including research, wireframes, and high-fidelity prototypes', 'Diseño UI/UX completo incluyendo investigación, wireframes y prototipos de alta fidelidad',
   'project', 'proyecto', 1, 1, true),

  -- Mobile App Development
  ((SELECT id FROM services WHERE slug = 'mobile-app-development'),
   'Mobile App MVP', 'MVP de App Móvil', 'mobile-app-mvp',
   'Cross-platform mobile application MVP with core features', 'MVP de aplicación móvil multiplataforma con funcionalidades core',
   'project', 'proyecto', 1, 1, true),

  -- App Redesign
  ((SELECT id FROM services WHERE slug = 'app-redesign'),
   'App Redesign Project', 'Proyecto de Rediseño de App', 'app-redesign-project',
   'Complete redesign and optimization of an existing mobile application', 'Rediseño completo y optimización de aplicación móvil existente',
   'project', 'proyecto', 1, 1, true)

ON CONFLICT (service_id, slug) DO UPDATE
SET name = EXCLUDED.name,
    name_es = EXCLUDED.name_es,
    description = EXCLUDED.description,
    description_es = EXCLUDED.description_es,
    unit = EXCLUDED.unit,
    unit_es = EXCLUDED.unit_es,
    default_quantity = EXCLUDED.default_quantity,
    display_order = EXCLUDED.display_order,
    is_active = true,
    updated_at = NOW();

-- 7. VERIFICATION QUERIES (FOR ADMIN / CONSOLE INSPECTION)
-- Run these queries after seed to confirm data integrity:
-- 
-- Check total distinct job titles (Expected: 25):
--   SELECT COUNT(DISTINCT name) AS total_job_titles FROM roles WHERE is_active = true;
-- 
-- Check total role_rates entries (Expected: 75):
--   SELECT COUNT(*) AS total_rates FROM role_rates WHERE is_active = true;
-- 
-- Check pricing settings:
--   SELECT id, mtb_standard_rate_cop, margin_floor, margin_target, margin_premium,
--          contingency_small, contingency_medium, contingency_large,
--          urgency_normal, urgency_urgent, urgency_very_urgent, urgency_critical,
--          consulting_min_cop
--   FROM pricing_settings WHERE is_active = true;
--
-- Check services per category (Expected: 2-3 per category):
--   SELECT c.name AS category, COUNT(s.id) AS services
--   FROM categories c LEFT JOIN services s ON s.category_id = c.id
--   WHERE c.is_active = true GROUP BY c.name ORDER BY c.display_order;
--
  -- Check deliverables per service (Expected: 1-2 per service):
  SELECT s.name AS service, COUNT(d.id) AS deliverables
  FROM services s LEFT JOIN deliverables d ON d.service_id = s.id
  WHERE s.is_active = true GROUP BY s.name ORDER BY s.display_order;

-- =============================================================================
-- 8. SEED SCOPE QUESTIONS & ANSWER OPTIONS
-- =============================================================================
-- Service-specific scope questions that describe project size and requirements.
-- NEVER re-classify the service type the user already selected.

-- Helper: use DO blocks so we can use variables for service lookups
DO $$
DECLARE
  v_srv_id UUID;
  v_q_id UUID;
BEGIN

-- Clear any previously inserted scope questions to prevent duplicates on re-run
TRUNCATE scope_questions CASCADE;

-- =====================================================================
-- E-COMMERCE STORE
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'ecommerce-store';

-- Q1: Product Catalog Size
INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Product Catalog Size', 'Tamaño del Catálogo de Productos', 'select', true, 1, 8)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Up to 50 products', 'Hasta 50 productos', 'up_to_50', 1, 1.0, 0),
  (v_q_id, '50 – 250 products', '50 – 250 productos', '50_250', 2, 1.3, 10),
  (v_q_id, '250 – 1,000 products', '250 – 1,000 productos', '250_1000', 3, 1.6, 25),
  (v_q_id, '1,000+ products', '1,000+ productos', '1000_plus', 4, 2.0, 50);

-- Q2: Product Variations
INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Product Variations', 'Variaciones de Producto', 'select', true, 2, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, 'Simple (size/color only)', 'Simple (talla/color)', 'simple', 1, 1.0, 0, NULL),
  (v_q_id, 'Moderate (multiple attributes)', 'Moderado (múltiples atributos)', 'moderate', 2, 1.3, 8, NULL),
  (v_q_id, 'Complex (custom configurations)', 'Complejo (configuraciones personalizadas)', 'complex', 3, 1.8, 20, 'advanced');

-- Q3: Platform
INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Platform Preference', 'Plataforma Preferida', 'select', false, 3, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Shopify', 'Shopify', 'shopify', 1, 1.0, 0),
  (v_q_id, 'WooCommerce', 'WooCommerce', 'woocommerce', 2, 1.0, 5),
  (v_q_id, 'Custom Development', 'Desarrollo a la Medida', 'custom', 3, 1.0, 40),
  (v_q_id, 'Not sure yet', 'No estoy seguro', 'not_sure', 4, 1.0, 0);

-- Q4: Payment Methods
INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Payment Methods', 'Métodos de Pago', 'select', true, 4, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'One payment method', 'Un método de pago', 'one', 1, 1.0, 0),
  (v_q_id, 'Multiple payment methods', 'Múltiples métodos', 'multiple', 2, 1.3, 6),
  (v_q_id, 'Marketplace / multi-party', 'Marketplace / multi-parte', 'marketplace', 3, 2.0, 20),
  (v_q_id, 'Not sure yet', 'No estoy seguro', 'not_sure', 4, 1.0, 0);

-- Q5: Shipping Integration
INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Shipping Integration', 'Integración de Envíos', 'select', false, 5, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'No shipping integration', 'Sin integración de envíos', 'none', 1, 1.0, 0),
  (v_q_id, 'One shipping carrier', 'Un transportador', 'one', 2, 1.0, 4),
  (v_q_id, 'Multiple carriers', 'Múltiples transportadores', 'multiple', 3, 1.5, 12),
  (v_q_id, 'Advanced logistics', 'Logística avanzada', 'advanced', 4, 2.0, 25);

-- Q6: External Integrations
INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'External Integrations', 'Integraciones Externas', 'select', false, 6, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, 'None', 'Ninguna', 'none', 1, 1.0, 0, NULL),
  (v_q_id, '1 – 2 integrations', '1 – 2 integraciones', '1_2', 2, 1.0, 8, NULL),
  (v_q_id, '3 – 5 integrations', '3 – 5 integraciones', '3_5', 3, 1.3, 20, 'advanced'),
  (v_q_id, '5+ integrations', '5+ integraciones', '5_plus', 4, 1.6, 35, 'enterprise');

-- =====================================================================
-- E-COMMERCE OPTIMIZATION
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'ecommerce-optimization';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Current Monthly Revenue', 'Facturación Mensual Actual', 'select', false, 1, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Under $10M COP', 'Menos de $10M COP', 'under_10m', 1, 1.0, 0),
  (v_q_id, '$10M – $50M COP', '$10M – $50M COP', '10m_50m', 2, 1.2, 5),
  (v_q_id, '$50M+ COP', '$50M+ COP', '50m_plus', 3, 1.5, 15);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Optimization Focus Areas', 'Áreas de Enfoque de Optimización', 'multi_select', true, 2, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Conversion rate', 'Tasa de conversión', 'conversion', 1, 1.0, 6),
  (v_q_id, 'Page speed', 'Velocidad de carga', 'speed', 2, 1.0, 8),
  (v_q_id, 'SEO', 'SEO', 'seo', 3, 1.0, 10),
  (v_q_id, 'UX/UI improvements', 'Mejoras de UX/UI', 'ux_ui', 4, 1.0, 12),
  (v_q_id, 'Checkout flow', 'Flujo de checkout', 'checkout', 5, 1.0, 8);

-- =====================================================================
-- CORPORATE WEBSITE
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'corporate-website';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Approximate Number of Pages', 'Número Aproximado de Páginas', 'select', true, 1, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 – 5 pages', '1 – 5 páginas', '1_5', 1, 1.0, 0),
  (v_q_id, '5 – 15 pages', '5 – 15 páginas', '5_15', 2, 1.3, 10),
  (v_q_id, '15 – 30 pages', '15 – 30 páginas', '15_30', 3, 1.6, 25),
  (v_q_id, '30+ pages', '30+ páginas', '30_plus', 4, 2.0, 45);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Content Management System', 'Sistema de Gestión de Contenidos', 'select', false, 2, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'WordPress', 'WordPress', 'wordpress', 1, 1.0, 0),
  (v_q_id, 'Headless CMS', 'CMS Headless', 'headless', 2, 1.0, 15),
  (v_q_id, 'Custom CMS', 'CMS a la Medida', 'custom', 3, 1.0, 30),
  (v_q_id, 'No CMS needed', 'No necesita CMS', 'none', 4, 1.0, 0);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Multilingual Support', 'Soporte Multiidioma', 'boolean', false, 3, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 15),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

-- =====================================================================
-- CUSTOM WEB APPLICATION
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'custom-web-app';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of User Types', 'Tipos de Usuario', 'select', true, 1, 8)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, '1 user type', '1 tipo de usuario', '1', 1, 1.0, 0, NULL),
  (v_q_id, '2 user types', '2 tipos de usuario', '2', 2, 1.3, 10, NULL),
  (v_q_id, '3+ user types', '3+ tipos de usuario', '3_plus', 3, 1.6, 25, 'advanced');

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Screens / Views', 'Número de Pantallas / Vistas', 'select', true, 2, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '5 – 10 screens', '5 – 10 pantallas', '5_10', 1, 1.0, 0),
  (v_q_id, '10 – 20 screens', '10 – 20 pantallas', '10_20', 2, 1.3, 15),
  (v_q_id, '20 – 40 screens', '20 – 40 pantallas', '20_40', 3, 1.6, 35),
  (v_q_id, '40+ screens', '40+ pantallas', '40_plus', 4, 2.0, 60);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Authentication', 'Autenticación', 'select', true, 3, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, 'Standard (email/password)', 'Estándar (email/contraseña)', 'standard', 1, 1.0, 0, NULL),
  (v_q_id, 'Social login + email', 'Login social + email', 'social', 2, 1.0, 6, NULL),
  (v_q_id, 'SSO / Enterprise auth', 'SSO / Autenticación empresarial', 'sso', 3, 1.5, 20, 'enterprise');

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'API Integrations', 'Integraciones API', 'select', false, 4, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'None', 'Ninguna', 'none', 1, 1.0, 0),
  (v_q_id, '1 – 2 integrations', '1 – 2 integraciones', '1_2', 2, 1.0, 8),
  (v_q_id, '3 – 5 integrations', '3 – 5 integraciones', '3_5', 3, 1.3, 20),
  (v_q_id, '5+ integrations', '5+ integraciones', '5_plus', 4, 1.6, 35);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Real-time Features', 'Funcionalidades en Tiempo Real', 'boolean', false, 5, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 20),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

-- =====================================================================
-- LANDING PAGE
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'landing-page';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Landing Pages', 'Número de Landing Pages', 'select', true, 1, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 landing page', '1 landing page', '1', 1, 1.0, 0),
  (v_q_id, '2 – 3 landing pages', '2 – 3 landing pages', '2_3', 2, 1.5, 8),
  (v_q_id, '4+ landing pages', '4+ landing pages', '4_plus', 3, 2.0, 20);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'A/B Testing Required', 'Requiere A/B Testing', 'boolean', false, 2, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 8),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

-- =====================================================================
-- DATA DASHBOARD
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'data-dashboard';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Dashboards', 'Número de Dashboards', 'select', true, 1, 10)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 dashboard', '1 dashboard', '1', 1, 1.0, 0),
  (v_q_id, '2 – 3 dashboards', '2 – 3 dashboards', '2_3', 2, 1.4, 15),
  (v_q_id, '4+ dashboards', '4+ dashboards', '4_plus', 3, 2.0, 35);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Data Sources', 'Número de Fuentes de Datos', 'select', true, 2, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 source', '1 fuente', '1', 1, 1.0, 0),
  (v_q_id, '2 – 3 sources', '2 – 3 fuentes', '2_3', 2, 1.2, 8),
  (v_q_id, '4+ sources', '4+ fuentes', '4_plus', 3, 1.6, 20);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Real-time Data Required', 'Datos en Tiempo Real', 'boolean', false, 3, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 25, 'advanced'),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0, NULL);

-- =====================================================================
-- BI IMPLEMENTATION
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'bi-implementation';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Reports', 'Número de Reportes', 'select', true, 1, 8)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 – 5 reports', '1 – 5 reportes', '1_5', 1, 1.0, 0),
  (v_q_id, '5 – 15 reports', '5 – 15 reportes', '5_15', 2, 1.3, 12),
  (v_q_id, '15+ reports', '15+ reportes', '15_plus', 3, 1.8, 30);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Data Migration Required', 'Requiere Migración de Datos', 'boolean', false, 2, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 20),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Training Required', 'Requiere Capacitación', 'boolean', false, 3, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 10),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

-- =====================================================================
-- SOCIAL MEDIA MANAGEMENT
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'social-media-management';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Target Platforms', 'Plataformas Objetivo', 'multi_select', true, 1, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Instagram', 'Instagram', 'instagram', 1, 1.0, 5),
  (v_q_id, 'TikTok', 'TikTok', 'tiktok', 2, 1.0, 8),
  (v_q_id, 'LinkedIn', 'LinkedIn', 'linkedin', 3, 1.0, 4),
  (v_q_id, 'Facebook', 'Facebook', 'facebook', 4, 1.0, 3),
  (v_q_id, 'YouTube', 'YouTube', 'youtube', 5, 1.0, 10),
  (v_q_id, 'X (Twitter)', 'X (Twitter)', 'twitter', 6, 1.0, 3);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Monthly Static Posts', 'Publicaciones Estáticas Mensuales', 'select', true, 2, 3)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '4 posts / month', '4 publicaciones / mes', '4', 1, 1.0, 0),
  (v_q_id, '8 posts / month', '8 publicaciones / mes', '8', 2, 1.3, 6),
  (v_q_id, '12 posts / month', '12 publicaciones / mes', '12', 3, 1.6, 12),
  (v_q_id, '20+ posts / month', '20+ publicaciones / mes', '20_plus', 4, 2.0, 24);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Monthly Reels / Short Videos', 'Reels / Videos Cortos Mensuales', 'select', true, 3, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '2 reels / month', '2 reels / mes', '2', 1, 1.0, 0),
  (v_q_id, '4 reels / month', '4 reels / mes', '4', 2, 1.3, 8),
  (v_q_id, '8 reels / month', '8 reels / mes', '8', 3, 1.6, 18),
  (v_q_id, '15+ reels / month', '15+ reels / mes', '15_plus', 4, 2.0, 35);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Community Management', 'Gestión de Comunidad', 'boolean', false, 4, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 15),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

-- =====================================================================
-- MARKETING CAMPAIGN
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'marketing-campaign';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Campaign Platforms', 'Plataformas de Campaña', 'multi_select', true, 1, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Meta Ads (Facebook/Instagram)', 'Meta Ads', 'meta_ads', 1, 1.0, 8),
  (v_q_id, 'Google Ads', 'Google Ads', 'google_ads', 2, 1.0, 10),
  (v_q_id, 'TikTok Ads', 'TikTok Ads', 'tiktok_ads', 3, 1.0, 8),
  (v_q_id, 'LinkedIn Ads', 'LinkedIn Ads', 'linkedin_ads', 4, 1.0, 6),
  (v_q_id, 'Email Marketing', 'Email Marketing', 'email', 5, 1.0, 6);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Campaigns', 'Número de Campañas', 'select', true, 2, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 campaign', '1 campaña', '1', 1, 1.0, 0),
  (v_q_id, '2 – 3 campaigns', '2 – 3 campañas', '2_3', 2, 1.4, 10),
  (v_q_id, '4+ campaigns', '4+ campañas', '4_plus', 3, 2.0, 25);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Landing Page Required', 'Requiere Landing Page', 'boolean', false, 3, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 15),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

-- =====================================================================
-- CONTENT STRATEGY
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'content-strategy';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Channels', 'Número de Canales', 'select', true, 1, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 – 2 channels', '1 – 2 canales', '1_2', 1, 1.0, 0),
  (v_q_id, '3 – 4 channels', '3 – 4 canales', '3_4', 2, 1.3, 8),
  (v_q_id, '5+ channels', '5+ canales', '5_plus', 3, 1.6, 18);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Content Calendar Depth', 'Profundidad del Calendario', 'select', true, 2, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 month plan', 'Plan de 1 mes', '1_month', 1, 1.0, 0),
  (v_q_id, '3 month plan', 'Plan de 3 meses', '3_months', 2, 1.4, 10),
  (v_q_id, '6+ month plan', 'Plan de 6+ meses', '6_months', 3, 1.8, 20);

-- =====================================================================
-- BRAND IDENTITY
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'brand-identity';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Brand Scope', 'Alcance de Marca', 'multi_select', true, 1, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Logo design', 'Diseño de logo', 'logo', 1, 1.0, 10),
  (v_q_id, 'Color palette & typography', 'Paleta de colores y tipografía', 'color_typo', 2, 1.0, 6),
  (v_q_id, 'Brand guidelines manual', 'Manual de marca', 'guidelines', 3, 1.0, 15),
  (v_q_id, 'Social media templates', 'Plantillas de redes sociales', 'social_templates', 4, 1.0, 10),
  (v_q_id, 'Stationery & print collateral', 'Papelería y material impreso', 'stationery', 5, 1.0, 8);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Brand Applications', 'Número de Aplicaciones de Marca', 'select', false, 2, 3)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '1 – 3 applications', '1 – 3 aplicaciones', '1_3', 1, 1.0, 0),
  (v_q_id, '4 – 8 applications', '4 – 8 aplicaciones', '4_8', 2, 1.3, 8),
  (v_q_id, '8+ applications', '8+ aplicaciones', '8_plus', 3, 1.6, 18);

-- =====================================================================
-- UI/UX DESIGN
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'uiux-design';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Screens to Design', 'Número de Pantallas a Diseñar', 'select', true, 1, 6)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '5 – 10 screens', '5 – 10 pantallas', '5_10', 1, 1.0, 0),
  (v_q_id, '10 – 20 screens', '10 – 20 pantallas', '10_20', 2, 1.3, 12),
  (v_q_id, '20 – 40 screens', '20 – 40 pantallas', '20_40', 3, 1.6, 28),
  (v_q_id, '40+ screens', '40+ pantallas', '40_plus', 4, 2.0, 50);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Design Scope', 'Alcance de Diseño', 'multi_select', true, 2, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'UX Research & Discovery', 'Investigación UX', 'ux_research', 1, 1.0, 12),
  (v_q_id, 'Wireframes & User Flows', 'Wireframes y Flujos', 'wireframes', 2, 1.0, 8),
  (v_q_id, 'UI Visual Design', 'Diseño Visual UI', 'ui_design', 3, 1.0, 10),
  (v_q_id, 'Design System / UI Kit', 'Sistema de Diseño / UI Kit', 'design_system', 4, 1.0, 20),
  (v_q_id, 'Interactive Prototype', 'Prototipo Interactivo', 'prototype', 5, 1.0, 12);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Target Platforms', 'Plataformas Objetivo', 'multi_select', true, 3, 3)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Desktop Web', 'Web Desktop', 'desktop', 1, 1.0, 0),
  (v_q_id, 'Mobile Web (Responsive)', 'Web Móvil (Responsive)', 'mobile_web', 2, 1.0, 8),
  (v_q_id, 'iOS App', 'App iOS', 'ios', 3, 1.0, 10),
  (v_q_id, 'Android App', 'App Android', 'android', 4, 1.0, 10);

-- =====================================================================
-- MOBILE APP DEVELOPMENT
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'mobile-app-development';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Target Platforms', 'Plataformas Objetivo', 'select', true, 1, 10)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'iOS only', 'Solo iOS', 'ios', 1, 1.0, 0),
  (v_q_id, 'Android only', 'Solo Android', 'android', 2, 1.0, 0),
  (v_q_id, 'iOS + Android (cross-platform)', 'iOS + Android (multiplataforma)', 'cross_platform', 3, 1.4, 20);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Screens', 'Número de Pantallas', 'select', true, 2, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '5 – 10 screens', '5 – 10 pantallas', '5_10', 1, 1.0, 0),
  (v_q_id, '10 – 20 screens', '10 – 20 pantallas', '10_20', 2, 1.3, 15),
  (v_q_id, '20 – 40 screens', '20 – 40 pantallas', '20_40', 3, 1.6, 35),
  (v_q_id, '40+ screens', '40+ pantallas', '40_plus', 4, 2.0, 60);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Authentication', 'Autenticación', 'select', true, 3, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Email/password', 'Email/contraseña', 'email', 1, 1.0, 0),
  (v_q_id, 'Social login', 'Login social', 'social', 2, 1.0, 6),
  (v_q_id, 'Phone / OTP', 'Teléfono / OTP', 'otp', 3, 1.0, 8),
  (v_q_id, 'Multiple methods', 'Múltiples métodos', 'multiple', 4, 1.3, 12);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Backend Requirements', 'Requisitos de Backend', 'select', true, 4, 8)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, 'Existing backend / API', 'Backend / API existente', 'existing', 1, 1.0, 0, NULL),
  (v_q_id, 'New backend required', 'Requiere backend nuevo', 'new', 2, 1.5, 40, 'advanced'),
  (v_q_id, 'Not sure yet', 'No estoy seguro', 'not_sure', 3, 1.0, 10, NULL);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Push Notifications', 'Notificaciones Push', 'boolean', false, 5, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 10),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Offline Functionality', 'Funcionalidad Offline', 'boolean', false, 6, 0)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours, complexity_modifier) VALUES
  (v_q_id, 'Yes', 'Sí', 'true', 1, 1.0, 20, 'advanced'),
  (v_q_id, 'No', 'No', 'false', 2, 1.0, 0, NULL);

-- =====================================================================
-- APP REDESIGN
-- =====================================================================
SELECT id INTO v_srv_id FROM services WHERE slug = 'app-redesign';

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Redesign Scope', 'Alcance del Rediseño', 'multi_select', true, 1, 5)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, 'Visual refresh only', 'Solo actualización visual', 'visual', 1, 1.0, 0),
  (v_q_id, 'UX flow improvements', 'Mejoras de flujo UX', 'ux_flows', 2, 1.0, 12),
  (v_q_id, 'New features', 'Nuevas funcionalidades', 'new_features', 3, 1.0, 20),
  (v_q_id, 'Performance optimization', 'Optimización de rendimiento', 'performance', 4, 1.0, 15),
  (v_q_id, 'Full rebuild', 'Reconstrucción completa', 'full_rebuild', 5, 1.0, 40);

INSERT INTO scope_questions (service_id, label, label_es, question_type, is_required, display_order, hours_modifier)
VALUES (v_srv_id, 'Number of Screens to Redesign', 'Pantallas a Rediseñar', 'select', true, 2, 4)
RETURNING id INTO v_q_id;
INSERT INTO question_options (question_id, label, label_es, value, display_order, hours_multiplier, additional_hours) VALUES
  (v_q_id, '5 – 10 screens', '5 – 10 pantallas', '5_10', 1, 1.0, 0),
  (v_q_id, '10 – 20 screens', '10 – 20 pantallas', '10_20', 2, 1.3, 10),
  (v_q_id, '20+ screens', '20+ pantallas', '20_plus', 3, 1.6, 25);

END $$;
