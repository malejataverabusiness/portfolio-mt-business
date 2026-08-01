// =============================================================================
// MTB Quote — Service & Deliverable Types
// =============================================================================

/** A top-level service category offered by MTB Labs */
export interface Service {
  id: string;
  name: string;
  name_es: string;
  slug: string;
  description: string;
  description_es: string;
  icon: string; // Material Symbols icon name
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** An individual deliverable within a service */
export interface Deliverable {
  id: string;
  service_id: string;
  name: string;
  name_es: string;
  slug: string;
  description: string;
  description_es: string;
  /** Unit of measurement: "project", "page", "hour", "component", etc. */
  unit: string;
  unit_es: string;
  /** Default quantity when added to a quote */
  default_quantity: number;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/** Public-safe view of a service with its deliverables */
export interface ServiceWithDeliverables extends Service {
  deliverables: Deliverable[];
}

/** Insert types (omit server-generated fields) */
export type ServiceInsert = Omit<Service, "id" | "created_at" | "updated_at">;
export type DeliverableInsert = Omit<Deliverable, "id" | "created_at" | "updated_at">;

/** Update types (all fields optional except id) */
export type ServiceUpdate = Partial<Omit<Service, "id">> & { id: string };
export type DeliverableUpdate = Partial<Omit<Deliverable, "id">> & { id: string };
