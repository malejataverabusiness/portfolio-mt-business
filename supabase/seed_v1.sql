-- =============================================================================
-- MTB Quote V1 — Seed Data (seed_v1.sql)
-- =============================================================================
-- Inserts initial V1 entities: Categories, Roles, COP Hourly Rates,
-- Service Components, and Default Pricing Settings.

-- 1. CATEGORIES
INSERT INTO categories (name, name_es, slug, display_order)
VALUES
  ('E-Commerce & Retail', 'Comercio Electrónico y Retail', 'ecommerce-retail', 1),
  ('Bespoke Web Systems', 'Sistemas Web a la Medida', 'bespoke-web-systems', 2),
  ('Data & Business Intelligence', 'Data e Inteligencia de Negocios', 'data-bi', 3)
ON CONFLICT (slug) DO NOTHING;

-- 2. ROLES (MTB Internal vs Freelancers)
INSERT INTO roles (name, name_es, seniority, is_mtb_internal)
VALUES
  ('MTB Internal Engineer', 'Ingeniero Interno MTB', 'standard', true),
  ('MTB Senior Architect', 'Arquitecto Senior MTB', 'advanced', true),
  ('MTB Principal Director', 'Director Principal MTB', 'expert', true),
  ('External UX Specialist', 'Especialista UX Externo', 'standard', false),
  ('External Full-Stack Dev', 'Desarrollador Full-Stack Externo', 'standard', false)
ON CONFLICT (name, seniority, is_mtb_internal) DO NOTHING;

-- 3. ROLE RATES (COP / Hour)
-- Minimum MTB Internal Rate: 140,000 COP/hour
DO $$
DECLARE
  role_std_id UUID;
  role_adv_id UUID;
  role_exp_id UUID;
  role_ux_id UUID;
  role_dev_id UUID;
BEGIN
  SELECT id INTO role_std_id FROM roles WHERE name = 'MTB Internal Engineer' AND seniority = 'standard' LIMIT 1;
  SELECT id INTO role_adv_id FROM roles WHERE name = 'MTB Senior Architect' AND seniority = 'advanced' LIMIT 1;
  SELECT id INTO role_exp_id FROM roles WHERE name = 'MTB Principal Director' AND seniority = 'expert' LIMIT 1;
  SELECT id INTO role_ux_id FROM roles WHERE name = 'External UX Specialist' AND seniority = 'standard' LIMIT 1;
  SELECT id INTO role_dev_id FROM roles WHERE name = 'External Full-Stack Dev' AND seniority = 'standard' LIMIT 1;

  IF role_std_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM role_rates WHERE role_id = role_std_id AND is_active = true) THEN
    INSERT INTO role_rates (role_id, hourly_rate_cop, currency) VALUES (role_std_id, 140000.00, 'COP');
  END IF;

  IF role_adv_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM role_rates WHERE role_id = role_adv_id AND is_active = true) THEN
    INSERT INTO role_rates (role_id, hourly_rate_cop, currency) VALUES (role_adv_id, 175000.00, 'COP');
  END IF;

  IF role_exp_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM role_rates WHERE role_id = role_exp_id AND is_active = true) THEN
    INSERT INTO role_rates (role_id, hourly_rate_cop, currency) VALUES (role_exp_id, 200000.00, 'COP');
  END IF;

  IF role_ux_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM role_rates WHERE role_id = role_ux_id AND is_active = true) THEN
    INSERT INTO role_rates (role_id, hourly_rate_cop, currency) VALUES (role_ux_id, 90000.00, 'COP');
  END IF;

  IF role_dev_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM role_rates WHERE role_id = role_dev_id AND is_active = true) THEN
    INSERT INTO role_rates (role_id, hourly_rate_cop, currency) VALUES (role_dev_id, 110000.00, 'COP');
  END IF;
END $$;

-- 4. PRICING SETTINGS (Default 30% margin, 10% contingency, 10% account mgmt, 10% project mgmt)
INSERT INTO pricing_settings (
  default_margin,
  default_contingency,
  account_mgmt_rate,
  project_mgmt_rate,
  min_project_value_cop,
  is_active
)
SELECT 0.3000, 0.1000, 0.1000, 0.1000, 3000000.00, true
WHERE NOT EXISTS (SELECT 1 FROM pricing_settings WHERE is_active = true);
