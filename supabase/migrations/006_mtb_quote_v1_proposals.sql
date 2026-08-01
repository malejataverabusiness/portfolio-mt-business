-- =============================================================================
-- MTB Quote V1 — Migration 006: Commercial Proposals & Proposal Versioning
-- =============================================================================

-- 1. CREATE PROPOSALS TABLE
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
  status            TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'declined')),
  currency          TEXT NOT NULL DEFAULT 'COP',
  total_investment  DECIMAL(14,2) NOT NULL DEFAULT 0,
  valid_until       TIMESTAMPTZ,
  content           JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. CREATE PROPOSAL VERSIONS TABLE FOR HISTORICAL IMMUTABLE SNAPSHOTS
CREATE TABLE IF NOT EXISTS proposal_versions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id      UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  version_number   INT NOT NULL,
  total_investment DECIMAL(14,2) NOT NULL DEFAULT 0,
  content_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by       UUID DEFAULT NULL,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_proposals_quote_id ON proposals(quote_id);
CREATE INDEX IF NOT EXISTS idx_proposal_versions_proposal_id ON proposal_versions(proposal_id);

-- RLS Security
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposal_versions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage proposals" ON proposals;
CREATE POLICY "Admins can manage proposals"
  ON proposals FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Admins can manage proposal versions" ON proposal_versions;
CREATE POLICY "Admins can manage proposal versions"
  ON proposal_versions FOR ALL
  USING (true);
