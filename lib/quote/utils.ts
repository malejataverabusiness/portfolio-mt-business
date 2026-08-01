// =============================================================================
// MTB Quote — Utility Functions
// =============================================================================

import { CONFIDENCE_THRESHOLDS, QUOTE_REF_PREFIX } from "./constants";
import type { PublicQuoteResult } from "./types";

/**
 * Format a currency value.
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a price range (e.g., "$2,000 – $4,500").
 */
export function formatPriceRange(
  low: number,
  high: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  const formattedLow = formatCurrency(low, currency, locale);
  const formattedHigh = formatCurrency(high, currency, locale);
  if (low === high) return formattedLow;
  return `${formattedLow} – ${formattedHigh}`;
}

/**
 * Map a numeric confidence score to a human-readable label.
 */
export function getConfidenceLabel(
  score: number,
  language: "en" | "es" = "en"
): string {
  if (score <= CONFIDENCE_THRESHOLDS.approximate.max) {
    return CONFIDENCE_THRESHOLDS.approximate.label[language];
  }
  if (score <= CONFIDENCE_THRESHOLDS.estimated.max) {
    return CONFIDENCE_THRESHOLDS.estimated.label[language];
  }
  return CONFIDENCE_THRESHOLDS.detailed.label[language];
}

/**
 * Map a numeric confidence score to its category key.
 */
export function getConfidenceCategory(
  score: number
): PublicQuoteResult["confidence_label"] {
  if (score <= CONFIDENCE_THRESHOLDS.approximate.max) return "approximate";
  if (score <= CONFIDENCE_THRESHOLDS.estimated.max) return "estimated";
  return "detailed";
}

/**
 * Generate a human-readable quote reference number.
 * Format: MTB-Q-YYYY-NNNN
 */
export function generateReferenceNumber(sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const padded = String(sequenceNumber).padStart(4, "0");
  return `${QUOTE_REF_PREFIX}-${year}-${padded}`;
}

/**
 * Calculate the expiration date given creation date and validity days.
 */
export function calculateExpirationDate(
  createdAt: Date | string,
  validForDays: number
): Date {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + validForDays);
  return date;
}

/**
 * Check if a quote has expired.
 */
export function isQuoteExpired(expiresAt: string | Date): boolean {
  return new Date(expiresAt) < new Date();
}

/**
 * Get bilingual text based on language preference.
 */
export function t<T extends string>(
  translations: { en: T; es: T },
  language: "en" | "es"
): T {
  return translations[language];
}

/**
 * Truncate text with ellipsis.
 */
export function truncate(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Format a date for display.
 */
export function formatDate(
  date: string | Date,
  language: "en" | "es" = "en"
): string {
  const locale = language === "es" ? "es-CO" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Format a date with time for display.
 */
export function formatDateTime(
  date: string | Date,
  language: "en" | "es" = "en"
): string {
  const locale = language === "es" ? "es-CO" : "en-US";
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}
