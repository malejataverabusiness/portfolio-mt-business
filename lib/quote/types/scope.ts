// =============================================================================
// MTB Quote V1 — Scope Question & Answer Types
// =============================================================================

/** A service-specific scope question */
export interface ScopeQuestion {
  id: string;
  service_id: string;
  label: string;
  label_es: string;
  description?: string;
  description_es?: string;
  question_type: "select" | "multi_select" | "number" | "boolean";
  is_required: boolean;
  display_order: number;
  is_active: boolean;
  conditional_on_question_id?: string | null;
  conditional_on_value?: string | null;
  hours_modifier: number;
  options: QuestionOption[];
}

/** An answer option for a scope question */
export interface QuestionOption {
  id: string;
  question_id: string;
  label: string;
  label_es: string;
  value: string;
  display_order: number;
  is_active: boolean;
  hours_multiplier: number;
  complexity_modifier?: string | null;
  additional_hours: number;
}

/** Structured scope answers keyed by question ID */
export type ScopeAnswers = Record<string, string | string[] | number | boolean>;
