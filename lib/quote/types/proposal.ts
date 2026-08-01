// =============================================================================
// MTB Quote V1 — Proposal Domain Types (Phase 8)
// =============================================================================

export type ProposalStatus = "draft" | "sent" | "accepted" | "declined";

export interface ProposalItem {
  name: string;
  description: string;
  quantity: number;
  complexity: string;
}

export interface ProposalContent {
  mtbInfo: {
    companyName: string;
    tagline: string;
    contactEmail: string;
    website: string;
  };
  clientInfo: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  projectObjective: string;
  projectScope: string;
  services: string[];
  deliverables: ProposalItem[];
  estimatedTimeline: {
    durationWeeks: number;
    milestones: Array<{ name: string; week: number; description: string }>;
  };
  investment: {
    totalCop: number;
    formattedTotal: string;
  };
  paymentTerms: string[];
  includedRevisions: number;
  exclusions: string[];
  externalCostsNotice?: string;
  termsAndConditions: string[];
  proposalValidityDays: number;
  scopeDisclaimer: string;
}

export interface ProposalVersion {
  id: string;
  proposal_id: string;
  version_number: number;
  total_investment: number;
  content_snapshot: ProposalContent;
  created_at: string;
}

export interface ProposalRecord {
  id: string;
  quote_id?: string | null;
  proposal_number: string;
  title: string;
  client_name: string;
  client_email: string;
  client_company: string;
  template_id: string;
  version: number;
  status: ProposalStatus;
  currency: string;
  total_investment: number;
  valid_until: string;
  content: ProposalContent;
  created_at: string;
  updated_at: string;
  proposal_versions?: ProposalVersion[];
}
