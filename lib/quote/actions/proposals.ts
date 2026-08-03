"use server";

// =============================================================================
// MTB Quote V1 — Proposals Server Actions (Phase 8)
// =============================================================================
// Authenticated server actions for converting quotes into commercial proposals,
// editing proposal fields, generating version snapshots, and managing status.

import { createClient } from "../supabase/server";
import { requireAdminAuth } from "./admin";
import type { ProposalContent, ProposalRecord, ProposalStatus } from "../types";
import { formatCopCurrency } from "../utils";

/**
 * Converts a reviewed/approved quote into a structured commercial proposal.
 */
export async function createProposalFromQuote(
  quoteId: string,
  templateId: string = "standard"
) {
  const { supabase } = await requireAdminAuth();

  // 1. Fetch source quote and client info
  const { data: quote, error: quoteErr } = await supabase
    .from("quotes")
    .select("*, clients(*), quote_items(*, deliverables(*))")
    .eq("id", quoteId)
    .single();

  if (quoteErr || !quote) {
    throw new Error("Quote not found for proposal conversion");
  }

  const proposalNumber = `PROP-${new Date().getFullYear()}-${Math.floor(
    Math.random() * 9000 + 1000
  )}`;

  const clientName = quote.clients?.name || "Valued Client";
  const clientEmail = quote.clients?.email || "";
  const clientCompany = quote.clients?.company || "Company";

  // 2. Build structured proposal content (Client-Safe, zero internal rates)
  const deliverables = (quote.quote_items || []).map((it: { deliverables?: { name?: string; description?: string } | null; deliverable_id: string; quantity: number; complexity: string }) => ({
    name: it.deliverables?.name || it.deliverable_id,
    description: it.deliverables?.description || "High-quality engineering deliverable",
    quantity: it.quantity,
    complexity: it.complexity,
  }));

  const initialContent: ProposalContent = {
    mtbInfo: {
      companyName: "MTB Labs / MT Business Consulting",
      tagline: "High-Performance Software Engineering & Design Systems",
      contactEmail: "contact@mtblabs.co",
      website: "https://mtblabs.co",
    },
    clientInfo: {
      name: clientName,
      email: clientEmail,
      company: clientCompany,
      phone: quote.clients?.phone || "",
    },
    projectObjective:
      "Design, engineer, and deploy a bespoke digital platform tailored to scale business operations and drive customer conversion.",
    projectScope:
      "Comprehensive end-to-end execution including discovery, architecture design, UI/UX prototyping, full-stack development, and deployment.",
    services: [
      "Digital Product Architecture & Consulting",
      "UI/UX Visual Design & Component Library",
      "Full-Stack Web System Engineering",
    ],
    deliverables,
    estimatedTimeline: {
      durationWeeks: 6,
      milestones: [
        { name: "Phase 1: Discovery & Architecture", week: 1, description: "System blueprint and data model approval" },
        { name: "Phase 2: UI/UX Prototyping", week: 3, description: "Interactive user flows and design system" },
        { name: "Phase 3: Core System Engineering", week: 5, description: "Backend APIs & Frontend interface build" },
        { name: "Phase 4: QA, Testing & Launch", week: 6, description: "Deployment and production handover" },
      ],
    },
    investment: {
      totalCop: quote.final_price || quote.calculated_price || 0,
      formattedTotal: formatCopCurrency(quote.final_price || quote.calculated_price || 0),
    },
    paymentTerms: [
      "50% initial deposit upon proposal acceptance & kickoff",
      "50% final balance upon production deployment & sign-off",
    ],
    includedRevisions: 2,
    exclusions: [
      "Third-party API subscription costs (e.g. AWS, Stripe, Twilio)",
      "Domain registration and SSL certificates beyond standard provisioning",
    ],
    externalCostsNotice:
      "Any third-party infrastructure licenses or cloud hosting fees are paid directly to the provider.",
    termsAndConditions: [
      "Proposal is valid for 30 calendar days from issuance.",
      "Work commences upon receipt of signed proposal and initial deposit.",
      "Any scope additions outside this document will be quoted via formal change order.",
    ],
    proposalValidityDays: 30,
    scopeDisclaimer:
      "This proposal is based on initial requirements. Final deliverables are governed by the approved sprint technical specifications.",
  };

  // 3. Insert proposal row
  const { data: proposal, error: createErr } = await supabase
    .from("proposals")
    .insert({
      quote_id: quoteId,
      proposal_number: proposalNumber,
      title: `Commercial Proposal — ${clientCompany}`,
      client_name: clientName,
      client_email: clientEmail,
      client_company: clientCompany,
      template_id: templateId,
      version: 1,
      status: "draft",
      currency: "COP",
      total_investment: quote.final_price || 0,
      valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      content: initialContent,
    })
    .select()
    .single();

  if (createErr || !proposal) {
    throw new Error(`Failed to create proposal: ${createErr?.message}`);
  }

  // 4. Save Version 1 snapshot
  await supabase.from("proposal_versions").insert({
    proposal_id: proposal.id,
    version_number: 1,
    total_investment: quote.final_price || 0,
    content_snapshot: initialContent,
  });

  return proposal;
}

/**
 * Fetch all commercial proposals for admin table.
 */
export async function getAdminProposals(search?: string) {
  const supabase = await createClient();

  let query = supabase.from("proposals").select("*");

  if (search && search.trim() !== "") {
    const term = `%${search.trim()}%`;
    query = query.or(`proposal_number.ilike.${term},client_name.ilike.${term},client_company.ilike.${term}`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load proposals: ${error.message}`);
  }

  return data || [];
}

/**
 * Retrieve full details and version history for a proposal.
 */
export async function getProposalDetails(proposalId: string) {
  const supabase = await createClient();

  const [propRes, versionsRes] = await Promise.all([
    supabase.from("proposals").select("*").eq("id", proposalId).single(),
    supabase
      .from("proposal_versions")
      .select("*")
      .eq("proposal_id", proposalId)
      .order("version_number", { ascending: false }),
  ]);

  if (propRes.error || !propRes.data) {
    throw new Error(`Proposal not found: ${propRes.error?.message}`);
  }

  return {
    ...propRes.data,
    proposal_versions: versionsRes.data || [],
  } as ProposalRecord;
}

/**
 * Saves a new proposal version without overwriting previously issued versions.
 */
export async function saveProposalVersion(
  proposalId: string,
  newContent: ProposalContent,
  newInvestmentCop?: number
) {
  const supabase = await createClient();

  // 1. Fetch current proposal
  const { data: current, error: fetchErr } = await supabase
    .from("proposals")
    .select("version, total_investment")
    .eq("id", proposalId)
    .single();

  if (fetchErr || !current) {
    throw new Error("Proposal not found for version update");
  }

  const newVersionNum = current.version + 1;
  const investment = newInvestmentCop ?? newContent.investment.totalCop;

  // Update formatted total in content
  newContent.investment.totalCop = investment;
  newContent.investment.formattedTotal = formatCopCurrency(investment);

  // 2. Insert new version record
  await supabase.from("proposal_versions").insert({
    proposal_id: proposalId,
    version_number: newVersionNum,
    total_investment: investment,
    content_snapshot: newContent,
  });

  // 3. Update master proposal record
  const { data: updated, error: updateErr } = await supabase
    .from("proposals")
    .update({
      version: newVersionNum,
      total_investment: investment,
      content: newContent,
      updated_at: new Date().toISOString(),
    })
    .eq("id", proposalId)
    .select()
    .single();

  if (updateErr) {
    throw new Error(`Failed to save proposal version: ${updateErr.message}`);
  }

  return updated;
}

/**
 * Updates proposal lifecycle status (draft, sent, accepted, declined).
 */
export async function updateProposalStatus(
  proposalId: string,
  status: ProposalStatus
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("proposals")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", proposalId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update proposal status: ${error.message}`);
  }

  return data;
}

/**
 * Deletes a proposal record and its versions.
 */
export async function deleteProposal(proposalId: string) {
  const supabase = await createClient();

  await supabase.from("proposal_versions").delete().eq("proposal_id", proposalId);
  const { error } = await supabase.from("proposals").delete().eq("id", proposalId);

  if (error) {
    throw new Error(`Failed to delete proposal: ${error.message}`);
  }

  return true;
}
