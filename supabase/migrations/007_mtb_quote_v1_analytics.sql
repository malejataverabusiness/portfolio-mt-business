-- =============================================================================
-- MTB Quote V1 — Migration 007: Analytics & Calibration Foundation
-- =============================================================================

-- 1. CREATE ACTUAL COSTS TABLE FOR HISTORICAL ESTIMATE VS ACTUAL COMPARISONS
CREATE TABLE IF NOT EXISTS actual_costs (
  id                       UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_id                 UUID NOT NULL UNIQUE REFERENCES quotes(id) ON DELETE CASCADE,
  actual_hours             DECIMAL(10,2) NOT NULL DEFAULT 0,
  actual_freelancer_cost   DECIMAL(14,2) NOT NULL DEFAULT 0,
  actual_duration_weeks    INT NOT NULL DEFAULT 0,
  actual_other_costs       DECIMAL(14,2) NOT NULL DEFAULT 0,
  project_outcome          TEXT NOT NULL DEFAULT 'completed' CHECK (project_outcome IN ('on_budget', 'over_budget', 'under_budget', 'completed', 'cancelled', 'in_progress')),
  notes                    TEXT,
  recorded_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for analytics lookup speed
CREATE INDEX IF NOT EXISTS idx_actual_costs_quote_id ON actual_costs(quote_id);

-- RLS Security
ALTER TABLE actual_costs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can manage actual costs" ON actual_costs;
CREATE POLICY "Admins can manage actual costs"
  ON actual_costs FOR ALL
  USING (true);
