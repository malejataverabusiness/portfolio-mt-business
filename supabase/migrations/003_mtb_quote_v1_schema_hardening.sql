-- =============================================================================
-- MTB Quote V1 — Schema Hardening, Indexes, RLS & Users Table (003)
-- =============================================================================
-- Completes the Phase 2 database implementation by adding:
-- 1. The users entity (admin & staff accounts linked to auth.users)
-- 2. Performance indexes across all foreign keys and lookup columns
-- 3. Hardened RLS policies blocking public access to internal rates, notes,
--    margins, and other users' quotes.
-- 4. Secure Database Function for public quote lookup (no leakage of margins).

-- =============================================================================
-- 1. USERS TABLE (Admin & Staff Accounts)
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  full_name   TEXT NOT NULL DEFAULT '',
  role        TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'manager', 'editor')),
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can read users table" ON users;
CREATE POLICY "Only admins can read users table"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Admins can manage users table" ON users;
CREATE POLICY "Admins can manage users table"
  ON users FOR ALL
  USING (auth.role() = 'authenticated');

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 2. COMPREHENSIVE INDEXES FOR PERFORMANCE & FK LOOKUPS
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_services_category_id ON services(category_id);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_deliverables_service_id ON deliverables(service_id);
CREATE INDEX IF NOT EXISTS idx_deliverables_slug ON deliverables(slug);
CREATE INDEX IF NOT EXISTS idx_deliverables_active ON deliverables(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_roles_seniority ON roles(seniority, is_mtb_internal);
CREATE INDEX IF NOT EXISTS idx_roles_active ON roles(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_role_rates_role_id_date ON role_rates(role_id, effective_date DESC);
CREATE INDEX IF NOT EXISTS idx_role_rates_active ON role_rates(role_id) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_service_components_deliverable_id ON service_components(deliverable_id);
CREATE INDEX IF NOT EXISTS idx_service_components_role_id ON service_components(role_id);

CREATE INDEX IF NOT EXISTS idx_pricing_rules_active_priority ON pricing_rules(priority) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_pricing_settings_active ON pricing_settings(is_active) WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_company ON clients(company);

CREATE INDEX IF NOT EXISTS idx_quotes_reference_number ON quotes(reference_number);
CREATE INDEX IF NOT EXISTS idx_quotes_client_id ON quotes(client_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_quote_items_quote_id ON quote_items(quote_id);
CREATE INDEX IF NOT EXISTS idx_quote_items_deliverable_id ON quote_items(deliverable_id);

-- Roadmap table indexes
CREATE INDEX IF NOT EXISTS idx_projects_quote_id ON projects(quote_id);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON projects(client_id);
CREATE INDEX IF NOT EXISTS idx_proposals_quote_id ON proposals(quote_id);
CREATE INDEX IF NOT EXISTS idx_freelancers_role_id ON freelancers(default_role_id);
CREATE INDEX IF NOT EXISTS idx_actual_costs_project_id ON actual_costs(project_id);
CREATE INDEX IF NOT EXISTS idx_actual_costs_role_id ON actual_costs(role_id);
CREATE INDEX IF NOT EXISTS idx_actual_costs_freelancer_id ON actual_costs(freelancer_id);
CREATE INDEX IF NOT EXISTS idx_quote_versions_quote_id ON quote_versions(quote_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_admin ON audit_logs(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- =============================================================================
-- 3. HARDENED ROW-LEVEL SECURITY (RLS) POLICIES
-- =============================================================================
-- Drop open/overly permissive public SELECT policies on quotes & quote_items
DROP POLICY IF EXISTS "Public can read own quote" ON quotes;
DROP POLICY IF EXISTS "Public can read quote items" ON quote_items;

-- A. QUOTES TABLE HARDENING
-- Only authenticated admins or the authenticated client owner can read the row directly.
DROP POLICY IF EXISTS "Admins or quote owners can read quotes" ON quotes;
CREATE POLICY "Admins or quote owners can read quotes"
  ON quotes FOR SELECT
  USING (
    auth.role() = 'authenticated'
    OR (client_id IS NOT NULL AND client_id = auth.uid())
  );

-- B. QUOTE ITEMS TABLE HARDENING
DROP POLICY IF EXISTS "Admins or quote owners can read quote items" ON quote_items;
CREATE POLICY "Admins or quote owners can read quote items"
  ON quote_items FOR SELECT
  USING (
    auth.role() = 'authenticated'
    OR EXISTS (
      SELECT 1 FROM quotes
      WHERE quotes.id = quote_items.quote_id
      AND quotes.client_id IS NOT NULL
      AND quotes.client_id = auth.uid()
    )
  );

-- =============================================================================
-- 4. SECURE FUNCTION FOR PUBLIC QUOTE RETRIEVAL BY REFERENCE NUMBER
-- =============================================================================
-- Allows public quoter clients to load their shareable estimate summary without
-- exposing internal_notes, cost_base, calculated_price, manual_adjustment, or margins.
CREATE OR REPLACE FUNCTION get_public_quote_summary(ref_num TEXT)
RETURNS TABLE (
  id UUID,
  reference_number TEXT,
  status TEXT,
  currency TEXT,
  final_price DECIMAL(14,2),
  valid_for_days INT,
  created_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    q.id,
    q.reference_number,
    q.status,
    q.currency,
    q.final_price,
    q.valid_for_days,
    q.created_at,
    (q.created_at + (q.valid_for_days || ' days')::INTERVAL)::TIMESTAMPTZ AS expires_at
  FROM quotes q
  WHERE q.reference_number = ref_num
  LIMIT 1;
$$;

GRANT EXECUTE ON FUNCTION get_public_quote_summary(TEXT) TO anon, authenticated;
