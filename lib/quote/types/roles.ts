// =============================================================================
// MTB Quote V1 — Role & Role Rate Domain Types
// =============================================================================

export type SeniorityLevel = "standard" | "advanced" | "expert";

export interface Role {
  id: string;
  name: string;
  name_es: string;
  seniority: SeniorityLevel;
  is_mtb_internal: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoleRate {
  id: string;
  role_id: string;
  hourly_rate_cop: number;
  currency: "COP";
  effective_date: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RoleWithRate extends Role {
  current_rate_cop: number;
}
