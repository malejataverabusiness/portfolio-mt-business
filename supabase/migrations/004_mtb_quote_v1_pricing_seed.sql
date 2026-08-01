-- =============================================================================
-- MTB Quote V1 — Migration 004: Comprehensive Initial Pricing Seed
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

-- 5. VERIFICATION QUERIES (FOR ADMIN / CONSOLE INSPECTION)
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
