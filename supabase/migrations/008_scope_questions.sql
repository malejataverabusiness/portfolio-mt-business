-- =============================================================================
-- MTB Quote V1 — Migration 008: Scope Questions & Answer Options
-- =============================================================================
-- Introduces data-driven, service-specific scope questionnaires.
-- Each service can have its own set of scope questions with answer options.
-- Supports conditional questions, pricing modifiers, and complexity suggestions.

-- =============================================================================
-- 1. SCOPE QUESTIONS — Service-specific scope/requirement questions
-- =============================================================================
CREATE TABLE IF NOT EXISTS scope_questions (
  id                         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id                 UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  label                      TEXT NOT NULL,
  label_es                   TEXT NOT NULL,
  description                TEXT NOT NULL DEFAULT '',
  description_es             TEXT NOT NULL DEFAULT '',
  question_type              TEXT NOT NULL DEFAULT 'select'
    CHECK (question_type IN ('select', 'multi_select', 'number', 'boolean')),
  is_required                BOOLEAN NOT NULL DEFAULT false,
  display_order              INT NOT NULL DEFAULT 0,
  is_active                  BOOLEAN NOT NULL DEFAULT true,
  conditional_on_question_id UUID REFERENCES scope_questions(id) ON DELETE SET NULL,
  conditional_on_value       TEXT DEFAULT NULL,
  hours_modifier             DECIMAL(8,2) NOT NULL DEFAULT 0,
  created_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                 TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(service_id, label)
);

CREATE INDEX IF NOT EXISTS idx_scope_questions_service ON scope_questions(service_id);
CREATE INDEX IF NOT EXISTS idx_scope_questions_conditional ON scope_questions(conditional_on_question_id);

ALTER TABLE scope_questions ENABLE ROW LEVEL SECURITY;

-- Public can read active scope questions (no sensitive data)
DROP POLICY IF EXISTS "Public can read active scope questions" ON scope_questions;
CREATE POLICY "Public can read active scope questions"
  ON scope_questions FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage scope questions" ON scope_questions;
CREATE POLICY "Admins can manage scope questions"
  ON scope_questions FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 2. QUESTION OPTIONS — Answer choices for scope questions
-- =============================================================================
CREATE TABLE IF NOT EXISTS question_options (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id         UUID NOT NULL REFERENCES scope_questions(id) ON DELETE CASCADE,
  label               TEXT NOT NULL,
  label_es            TEXT NOT NULL,
  value               TEXT NOT NULL,
  display_order       INT NOT NULL DEFAULT 0,
  is_active           BOOLEAN NOT NULL DEFAULT true,
  hours_multiplier    DECIMAL(6,2) NOT NULL DEFAULT 1.0,
  complexity_modifier TEXT DEFAULT NULL
    CHECK (complexity_modifier IS NULL OR complexity_modifier IN ('basic', 'standard', 'advanced', 'enterprise')),
  additional_hours    DECIMAL(8,2) NOT NULL DEFAULT 0,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(question_id, value)
);

CREATE INDEX IF NOT EXISTS idx_question_options_question ON question_options(question_id);

ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;

-- Public can read active options (no sensitive data)
DROP POLICY IF EXISTS "Public can read active question options" ON question_options;
CREATE POLICY "Public can read active question options"
  ON question_options FOR SELECT
  USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage question options" ON question_options;
CREATE POLICY "Admins can manage question options"
  ON question_options FOR ALL
  USING (auth.role() = 'authenticated');

-- =============================================================================
-- 3. ADD scope_data JSONB COLUMN TO quotes
-- =============================================================================
ALTER TABLE quotes
  ADD COLUMN IF NOT EXISTS scope_data JSONB DEFAULT NULL;

-- =============================================================================
-- 4. TRIGGERS
-- =============================================================================
DROP TRIGGER IF EXISTS update_scope_questions_updated_at ON scope_questions;
CREATE TRIGGER update_scope_questions_updated_at
  BEFORE UPDATE ON scope_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_question_options_updated_at ON question_options;
CREATE TRIGGER update_question_options_updated_at
  BEFORE UPDATE ON question_options
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
