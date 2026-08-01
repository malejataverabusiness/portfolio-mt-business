-- =============================================================================
-- MTB Quote V1 — Migration 009: Fix actual_costs schema and relationships
-- =============================================================================

-- Ensure actual_costs table has quote_id column and foreign key to quotes
ALTER TABLE actual_costs
  ADD COLUMN IF NOT EXISTS quote_id UUID UNIQUE REFERENCES quotes(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS actual_hours DECIMAL(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS actual_freelancer_cost DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS actual_duration_weeks INT NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS actual_other_costs DECIMAL(14,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS project_outcome TEXT NOT NULL DEFAULT 'completed';

CREATE INDEX IF NOT EXISTS idx_actual_costs_quote_id ON actual_costs(quote_id);
