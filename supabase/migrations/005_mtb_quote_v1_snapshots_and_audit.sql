-- =============================================================================
-- MTB Quote V1 — Migration 005: Pricing Snapshots & Audit Logs
-- =============================================================================

-- 1. ADD SNAPSHOT COLUMN TO QUOTES TABLE
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS snapshot JSONB DEFAULT NULL;

-- 2. CREATE AUDIT LOGS TABLE FOR HISTORICAL CHANGE TRACKING
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

-- Index for fast lookup per quote
CREATE INDEX IF NOT EXISTS idx_audit_logs_quote_id ON audit_logs(quote_id);

-- RLS Security
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view and create audit logs" ON audit_logs;
CREATE POLICY "Admins can view and create audit logs"
  ON audit_logs FOR ALL
  USING (true);
