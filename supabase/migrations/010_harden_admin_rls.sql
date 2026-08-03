-- =============================================================================
-- MTB Quote V1 — Migration 010: Hardened RLS for Audit, Proposals & Analytics
-- =============================================================================
-- Remediates security vulnerabilities in migrations 005, 006, and 007 by replacing
-- overly permissive USING (true) policies with strict authenticated admin checks.

-- 1. HARDEN AUDIT LOGS TABLE RLS
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can view and create audit logs" ON audit_logs;
DROP POLICY IF EXISTS "Admins can manage audit logs" ON audit_logs;

CREATE POLICY "Only authenticated admins can access audit logs"
  ON audit_logs FOR ALL
  USING (auth.role() = 'authenticated');

-- 2. HARDEN PROPOSALS TABLE RLS
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage proposals" ON proposals;

CREATE POLICY "Only authenticated admins can manage proposals"
  ON proposals FOR ALL
  USING (auth.role() = 'authenticated');

-- 3. HARDEN PROPOSAL VERSIONS TABLE RLS
ALTER TABLE proposal_versions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage proposal versions" ON proposal_versions;

CREATE POLICY "Only authenticated admins can manage proposal versions"
  ON proposal_versions FOR ALL
  USING (auth.role() = 'authenticated');

-- 4. HARDEN ACTUAL COSTS TABLE RLS
ALTER TABLE actual_costs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage actual costs" ON actual_costs;

CREATE POLICY "Only authenticated admins can manage actual costs"
  ON actual_costs FOR ALL
  USING (auth.role() = 'authenticated');
