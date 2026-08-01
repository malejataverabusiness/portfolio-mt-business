// =============================================================================
// MTB Quote V1 — Category Domain Types
// =============================================================================

export interface Category {
  id: string;
  name: string;
  name_es: string;
  slug: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CategoryWithServices extends Category {
  services: {
    id: string;
    name: string;
    name_es: string;
    slug: string;
    deliverables_count?: number;
  }[];
}
