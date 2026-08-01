-- =============================================================================
-- MTB Quote V1 — Database Migration (002_pricing_v1.sql)
-- =============================================================================
-- Extends the initial schema with the formal V1 Product & Technical Architecture:
-- categories, roles, role_rates (COP), service_components, pricing_settings,
-- clients, and expanded V1 quote columns with strict RLS policies.

-- =============================================================================
-- 1. CATEGORIES — Top-level groupings for services
-- =============================================================================
CREATE TABLE IF NOT EXISTS categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  name_es       TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active categories" ON categories;
CREATE POLICY "Public can read active categories"
  ON categories FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (auth.role() = 'authenticated');

-- Add category_id to services table if not already present
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES categories(id) ON DELETE SET NULL;

-- =============================================================================
-- 2. ROLES — Job roles for labor cost calculations
-- =============================================================================
CREATE TABLE IF NOT EXISTS roles (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  name_es         TEXT NOT NULL,
  seniority       TEXT NOT NULL CHECK (seniority IN ('junior', 'mid', 'senior', 'standard', 'advanced', 'expert')),
  is_mtb_internal BOOLEAN NOT NULL DEFAULT true,
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(name, seniority, is_mtb_internal)
);

ALTER TABLE roles DROP CONSTRAINT IF EXISTS roles_seniority_check;
ALTER TABLE roles ADD CONSTRAINT roles_seniority_check CHECK (seniority IN ('junior', 'mid', 'senior', 'standard', 'advanced', 'expert'));

ALTER TABLE roles ENABLE ROW LEVEL SECURITY;

-- NEVER readable by public users
DROP POLICY IF EXISTS "Only admins can read roles" ON roles;
CREATE POLICY "Only admins can read roles"
  ON roles FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage roles" ON roles;
CREATE POLICY "Admins can manage roles"
  ON roles FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 3. ROLE RATES — Billing rates per role in COP
-- =============================================================================
CREATE TABLE IF NOT EXISTS role_rates (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role_id         UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  hourly_rate_cop DECIMAL(14,2) NOT NULL CHECK (hourly_rate_cop >= 0),
  currency        TEXT NOT NULL DEFAULT 'COP',
  effective_date  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active       BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(role_id, hourly_rate_cop)
);

ALTER TABLE role_rates ENABLE ROW LEVEL SECURITY;

-- STRICT PRIVACY: Internal billing rates are NEVER readable by public
DROP POLICY IF EXISTS "Only admins can read role rates" ON role_rates;
CREATE POLICY "Only admins can read role rates"
  ON role_rates FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage role rates" ON role_rates;
CREATE POLICY "Admins can manage role rates"
  ON role_rates FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 4. SERVICE COMPONENTS — Internal labor hour breakdown per deliverable
-- =============================================================================
CREATE TABLE IF NOT EXISTS service_components (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id  UUID NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
  role_id         UUID NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
  estimated_hours DECIMAL(8,2) NOT NULL CHECK (estimated_hours >= 0),
  is_mtb_labor    BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE service_components ENABLE ROW LEVEL SECURITY;

-- STRICT PRIVACY: Internal hour breakdown is NEVER readable by public
DROP POLICY IF EXISTS "Only admins can read service components" ON service_components;
CREATE POLICY "Only admins can read service components"
  ON service_components FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage service components" ON service_components;
CREATE POLICY "Admins can manage service components"
  ON service_components FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 5. PRICING SETTINGS — Global financial constants for margin formula
-- =============================================================================
CREATE TABLE IF NOT EXISTS pricing_settings (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  default_margin        DECIMAL(5,4) NOT NULL DEFAULT 0.3500, -- Target 35%
  default_contingency   DECIMAL(5,4) NOT NULL DEFAULT 0.1000, -- Small 10%
  account_mgmt_rate     DECIMAL(5,4) NOT NULL DEFAULT 0.1000, -- 10%
  project_mgmt_rate     DECIMAL(5,4) NOT NULL DEFAULT 0.1000, -- 10%
  min_project_value_cop DECIMAL(14,2) NOT NULL DEFAULT 3000000.00, -- 3M COP
  -- MTB Internal Rates (Floor 140,000 COP/hr enforced by check constraint)
  mtb_standard_rate_cop DECIMAL(14,2) NOT NULL DEFAULT 140000.00 CHECK (mtb_standard_rate_cop >= 140000.00),
  mtb_advanced_rate_cop DECIMAL(14,2) NOT NULL DEFAULT 175000.00,
  mtb_expert_rate_cop   DECIMAL(14,2) NOT NULL DEFAULT 200000.00,
  -- Margins (Floor 25%, Target 35%, Premium 45%)
  margin_floor          DECIMAL(5,4) NOT NULL DEFAULT 0.2500,
  margin_target         DECIMAL(5,4) NOT NULL DEFAULT 0.3500,
  margin_premium        DECIMAL(5,4) NOT NULL DEFAULT 0.4500,
  -- Contingency (Small 10%, Medium 8%, Large 7%)
  contingency_small     DECIMAL(5,4) NOT NULL DEFAULT 0.1000,
  contingency_medium    DECIMAL(5,4) NOT NULL DEFAULT 0.0800,
  contingency_large     DECIMAL(5,4) NOT NULL DEFAULT 0.0700,
  -- Urgency Multipliers
  urgency_normal        DECIMAL(4,2) NOT NULL DEFAULT 1.00,
  urgency_urgent        DECIMAL(4,2) NOT NULL DEFAULT 1.15,
  urgency_very_urgent   DECIMAL(4,2) NOT NULL DEFAULT 1.30,
  urgency_critical      DECIMAL(4,2) NOT NULL DEFAULT 1.50,
  -- Other Settings
  consulting_min_cop    DECIMAL(14,2) NOT NULL DEFAULT 280000.00, -- 280,000 COP
  is_active             BOOLEAN NOT NULL DEFAULT true,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pricing_settings ENABLE ROW LEVEL SECURITY;

-- STRICT PRIVACY: Target margins and overhead % NEVER readable by public
DROP POLICY IF EXISTS "Only admins can read pricing settings" ON pricing_settings;
CREATE POLICY "Only admins can read pricing settings"
  ON pricing_settings FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage pricing settings" ON pricing_settings;
CREATE POLICY "Admins can manage pricing settings"
  ON pricing_settings FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 6. CLIENTS — Client profile directory
-- =============================================================================
CREATE TABLE IF NOT EXISTS clients (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  company         TEXT NOT NULL DEFAULT '',
  phone           TEXT DEFAULT '',
  referral_source TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert client profiles" ON clients;
CREATE POLICY "Public can insert client profiles"
  ON clients FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only admins can read client profiles" ON clients;
CREATE POLICY "Only admins can read client profiles"
  ON clients FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage client profiles" ON clients;
CREATE POLICY "Admins can manage client profiles"
  ON clients FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 7. EXPAND QUOTES TABLE — Add V1 COP Financial Fields & Client Reference
-- =============================================================================
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS cost_base DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS recommended_price DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS calculated_price DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS manual_adjustment DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS external_costs_total DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS final_price DECIMAL(14,2) NOT NULL DEFAULT 0;

-- Ensure default currency is COP for V1
ALTER TABLE quotes
  ALTER COLUMN currency SET DEFAULT 'COP';

-- =============================================================================
-- 8. QUOTE ITEMS (V1 compatibility table / alias for quote_line_items)
-- =============================================================================
CREATE TABLE IF NOT EXISTS quote_items (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id          UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  deliverable_id    UUID NOT NULL REFERENCES deliverables(id),
  quantity          INT NOT NULL DEFAULT 1,
  complexity        TEXT NOT NULL DEFAULT 'standard' CHECK (complexity IN ('basic', 'standard', 'advanced', 'enterprise')),
  calculated_cost   DECIMAL(14,2) NOT NULL DEFAULT 0,
  recommended_price DECIMAL(14,2) NOT NULL DEFAULT 0,
  adjusted_price    DECIMAL(14,2) DEFAULT NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE quote_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert quote items" ON quote_items;
CREATE POLICY "Public can insert quote items"
  ON quote_items FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public can read quote items" ON quote_items;
CREATE POLICY "Public can read quote items"
  ON quote_items FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins can manage quote items" ON quote_items;
CREATE POLICY "Admins can manage quote items"
  ON quote_items FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 9. FUTURE-PROOFING TABLES (Reserved for Roadmap)
-- =============================================================================
CREATE TABLE IF NOT EXISTS projects (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id      UUID REFERENCES quotes(id) ON DELETE SET NULL,
  client_id     UUID REFERENCES clients(id) ON DELETE SET NULL,
  title         TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'active',
  contract_cop  DECIMAL(14,2) NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS proposals (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id      UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  content_json  JSONB NOT NULL DEFAULT '{}',
  status        TEXT NOT NULL DEFAULT 'draft',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS freelancers (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  default_role_id   UUID REFERENCES roles(id),
  hourly_rate_cop   DECIMAL(14,2) NOT NULL DEFAULT 0,
  is_active         BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS actual_costs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id    UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  role_id       UUID REFERENCES roles(id),
  freelancer_id UUID REFERENCES freelancers(id),
  hours_logged  DECIMAL(8,2) NOT NULL DEFAULT 0,
  cost_cop      DECIMAL(14,2) NOT NULL DEFAULT 0,
  notes         TEXT DEFAULT '',
  logged_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_name     TEXT NOT NULL,
  metric_value    DECIMAL(14,4) NOT NULL,
  period_start    TIMESTAMPTZ NOT NULL,
  period_end      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_versions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id        UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  version_number  INT NOT NULL DEFAULT 1,
  snapshot_json   JSONB NOT NULL,
  reason          TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id   UUID NOT NULL,
  action_type     TEXT NOT NULL,
  entity_type     TEXT NOT NULL,
  entity_id       TEXT NOT NULL,
  previous_value  JSONB DEFAULT '{}',
  new_value       JSONB DEFAULT '{}',
  ip_address      TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE freelancers ENABLE ROW LEVEL SECURITY;
ALTER TABLE actual_costs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- All future-proofing tables are admin-only
DROP POLICY IF EXISTS "Admins can manage projects" ON projects;
CREATE POLICY "Admins can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage proposals" ON proposals;
CREATE POLICY "Admins can manage proposals" ON proposals FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage freelancers" ON freelancers;
CREATE POLICY "Admins can manage freelancers" ON freelancers FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage actual_costs" ON actual_costs;
CREATE POLICY "Admins can manage actual_costs" ON actual_costs FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage analytics" ON analytics;
CREATE POLICY "Admins can manage analytics" ON analytics FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage quote_versions" ON quote_versions;
CREATE POLICY "Admins can manage quote_versions" ON quote_versions FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage audit_logs" ON audit_logs;
CREATE POLICY "Admins can manage audit_logs" ON audit_logs FOR ALL USING (auth.role() = 'authenticated');

-- =============================================================================
-- TRIGGERS for updated_at on new tables
-- =============================================================================
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_roles_updated_at ON roles;
CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_role_rates_updated_at ON role_rates;
CREATE TRIGGER update_role_rates_updated_at
  BEFORE UPDATE ON role_rates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_service_components_updated_at ON service_components;
CREATE TRIGGER update_service_components_updated_at
  BEFORE UPDATE ON service_components
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pricing_settings_updated_at ON pricing_settings;
CREATE TRIGGER update_pricing_settings_updated_at
  BEFORE UPDATE ON pricing_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_clients_updated_at ON clients;
CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
