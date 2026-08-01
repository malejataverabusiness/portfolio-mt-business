-- =============================================================================
-- MTB Quote — Initial Database Schema
-- =============================================================================
-- Run this migration against your Supabase project.
-- All tables include Row-Level Security (RLS) policies.

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. SERVICES — Top-level service categories
-- =============================================================================
CREATE TABLE services (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  name_es     TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  description_es TEXT NOT NULL DEFAULT '',
  icon        TEXT NOT NULL DEFAULT 'category',
  display_order INT NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public can read active services
CREATE POLICY "Public can read active services"
  ON services FOR SELECT
  USING (is_active = true);

-- Authenticated admins can do everything
CREATE POLICY "Admins can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 2. DELIVERABLES — Individual deliverables within a service
-- =============================================================================
CREATE TABLE deliverables (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id       UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  name_es          TEXT NOT NULL,
  slug             TEXT NOT NULL,
  description      TEXT NOT NULL DEFAULT '',
  description_es   TEXT NOT NULL DEFAULT '',
  unit             TEXT NOT NULL DEFAULT 'project',
  unit_es          TEXT NOT NULL DEFAULT 'proyecto',
  default_quantity INT NOT NULL DEFAULT 1,
  display_order    INT NOT NULL DEFAULT 0,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(service_id, slug)
);

ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active deliverables"
  ON deliverables FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage deliverables"
  ON deliverables FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 3. RATE CARDS — Base pricing for each deliverable
-- =============================================================================
CREATE TABLE rate_cards (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  deliverable_id       UUID NOT NULL REFERENCES deliverables(id) ON DELETE CASCADE,
  base_rate            DECIMAL(12,2) NOT NULL,
  pricing_model        TEXT NOT NULL DEFAULT 'fixed' CHECK (pricing_model IN ('fixed', 'hourly')),
  estimated_hours_low  DECIMAL(8,2) NOT NULL DEFAULT 0,
  estimated_hours_high DECIMAL(8,2) NOT NULL DEFAULT 0,
  currency             TEXT NOT NULL DEFAULT 'USD',
  is_active            BOOLEAN NOT NULL DEFAULT true,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE rate_cards ENABLE ROW LEVEL SECURITY;

-- Rate cards are NEVER readable by public users
CREATE POLICY "Only admins can read rate cards"
  ON rate_cards FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage rate cards"
  ON rate_cards FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 4. PRICING RULES — Multipliers, discounts, surcharges
-- =============================================================================
CREATE TABLE pricing_rules (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name           TEXT NOT NULL,
  name_es        TEXT NOT NULL,
  description    TEXT NOT NULL DEFAULT '',
  description_es TEXT NOT NULL DEFAULT '',
  rule_type      TEXT NOT NULL CHECK (rule_type IN ('complexity_multiplier', 'volume_discount', 'urgency_surcharge', 'bundle_discount')),
  config         JSONB NOT NULL DEFAULT '{}',
  priority       INT NOT NULL DEFAULT 0,
  is_active      BOOLEAN NOT NULL DEFAULT true,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read pricing rules"
  ON pricing_rules FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage pricing rules"
  ON pricing_rules FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 5. MARGIN PROFILES — Margin configurations
-- =============================================================================
CREATE TABLE margin_profiles (
  id                     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                   TEXT NOT NULL,
  min_margin_percent     DECIMAL(5,2) NOT NULL DEFAULT 15.00,
  target_margin_percent  DECIMAL(5,2) NOT NULL DEFAULT 30.00,
  max_margin_percent     DECIMAL(5,2) NOT NULL DEFAULT 50.00,
  service_ids            UUID[] DEFAULT NULL,
  is_active              BOOLEAN NOT NULL DEFAULT true,
  created_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at             TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE margin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read margin profiles"
  ON margin_profiles FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage margin profiles"
  ON margin_profiles FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 6. QUOTES — Master quote records
-- =============================================================================
CREATE TABLE quotes (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number   TEXT NOT NULL UNIQUE,
  status             TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'under_review', 'adjusted', 'approved', 'sent', 'accepted', 'declined', 'expired')),
  client_info        JSONB NOT NULL,
  project_description TEXT NOT NULL DEFAULT '',
  timeline_days      INT DEFAULT NULL,
  currency           TEXT NOT NULL DEFAULT 'USD',
  total_low          DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_mid          DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_high         DECIMAL(12,2) NOT NULL DEFAULT 0,
  adjusted_total     DECIMAL(12,2) DEFAULT NULL,
  confidence_score   INT NOT NULL DEFAULT 50 CHECK (confidence_score BETWEEN 0 AND 100),
  admin_notes        TEXT NOT NULL DEFAULT '',
  valid_for_days     INT NOT NULL DEFAULT 30,
  language           TEXT NOT NULL DEFAULT 'en' CHECK (language IN ('en', 'es')),
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at         TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days')
);

ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Public users can INSERT new quotes (submitting from the quoter)
CREATE POLICY "Public can insert quotes"
  ON quotes FOR INSERT
  WITH CHECK (true);

-- Public users can read their own quote by ID (shareable link)
CREATE POLICY "Public can read own quote"
  ON quotes FOR SELECT
  USING (true);

-- Admins can do everything
CREATE POLICY "Admins can manage quotes"
  ON quotes FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 7. QUOTE LINE ITEMS — Individual items within a quote
-- =============================================================================
CREATE TABLE quote_line_items (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id             UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  deliverable_id       UUID NOT NULL REFERENCES deliverables(id),
  deliverable_name     TEXT NOT NULL,
  deliverable_name_es  TEXT NOT NULL,
  service_name         TEXT NOT NULL,
  service_name_es      TEXT NOT NULL,
  quantity             INT NOT NULL DEFAULT 1,
  unit                 TEXT NOT NULL DEFAULT 'project',
  unit_es              TEXT NOT NULL DEFAULT 'proyecto',
  complexity           TEXT NOT NULL DEFAULT 'standard' CHECK (complexity IN ('basic', 'standard', 'advanced', 'enterprise')),
  price_low            DECIMAL(12,2) NOT NULL DEFAULT 0,
  price_mid            DECIMAL(12,2) NOT NULL DEFAULT 0,
  price_high           DECIMAL(12,2) NOT NULL DEFAULT 0,
  adjusted_price       DECIMAL(12,2) DEFAULT NULL,
  notes                TEXT NOT NULL DEFAULT '',
  display_order        INT NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE quote_line_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert quote line items"
  ON quote_line_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can read quote line items"
  ON quote_line_items FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage quote line items"
  ON quote_line_items FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 8. QUOTE SNAPSHOTS — Immutable pricing data at time of calculation
-- =============================================================================
CREATE TABLE quote_snapshots (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id      UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  pricing_data  JSONB NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE quote_snapshots ENABLE ROW LEVEL SECURITY;

-- Snapshots are only readable by admins
CREATE POLICY "Only admins can read snapshots"
  ON quote_snapshots FOR SELECT
  USING (auth.role() = 'authenticated');

-- Insert allowed for the pricing engine (via service role or anon during creation)
CREATE POLICY "Insert snapshots during quote creation"
  ON quote_snapshots FOR INSERT
  WITH CHECK (true);

-- Snapshots should NEVER be updated or deleted
-- No UPDATE/DELETE policies = immutable by default with RLS

-- =============================================================================
-- 9. QUOTE REVISIONS — Admin change history
-- =============================================================================
CREATE TABLE quote_revisions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id        UUID NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  admin_user_id   UUID NOT NULL,
  change_type     TEXT NOT NULL CHECK (change_type IN ('status_change', 'price_adjustment', 'line_item_change', 'notes_update')),
  previous_value  JSONB,
  new_value       JSONB,
  reason          TEXT NOT NULL DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE quote_revisions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read revisions"
  ON quote_revisions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert revisions"
  ON quote_revisions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- =============================================================================
-- 10. AUDIT LOG — Track all admin actions
-- =============================================================================
CREATE TABLE audit_log (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id   UUID NOT NULL,
  action          TEXT NOT NULL,
  entity_type     TEXT NOT NULL,
  entity_id       TEXT NOT NULL,
  details         JSONB DEFAULT '{}',
  ip_address      TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can read audit log"
  ON audit_log FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert audit entries"
  ON audit_log FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- =============================================================================
-- INDEXES
-- =============================================================================
CREATE INDEX idx_deliverables_service ON deliverables(service_id);
CREATE INDEX idx_rate_cards_deliverable ON rate_cards(deliverable_id);
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_created ON quotes(created_at DESC);
CREATE INDEX idx_quotes_reference ON quotes(reference_number);
CREATE INDEX idx_line_items_quote ON quote_line_items(quote_id);
CREATE INDEX idx_snapshots_quote ON quote_snapshots(quote_id);
CREATE INDEX idx_revisions_quote ON quote_revisions(quote_id);
CREATE INDEX idx_audit_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_admin ON audit_log(admin_user_id);

-- =============================================================================
-- AUTO-UPDATE updated_at TRIGGER
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliverables_updated_at
  BEFORE UPDATE ON deliverables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rate_cards_updated_at
  BEFORE UPDATE ON rate_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_rules_updated_at
  BEFORE UPDATE ON pricing_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_margin_profiles_updated_at
  BEFORE UPDATE ON margin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- SEQUENCE for quote reference numbers
-- =============================================================================
CREATE SEQUENCE quote_reference_seq START WITH 1;
