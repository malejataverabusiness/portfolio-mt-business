import "server-only";

// =============================================================================
// MTB Quote V1 — Server-Only Pricing Formatters
// =============================================================================
// NEVER import this file into a client component.
// Contains COP currency formatting and public estimate range rounding.

/**
 * Formats an exact COP number as standard currency string.
 * Example: 6247391 => "$6,247,391 COP"
 */
export function formatCopCurrency(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(rounded);

  return `${formatted} COP`;
}

import type { CustomerFacingRange } from "./types";

/**
 * Converts a recommended price in COP into a rounded, customer-facing range.
 * Example: 6400000 => "$5.8M – $7.0M COP" (rounded to nearest 100k COP)
 */
export function generateCustomerFacingRange(
  recommendedPriceCop: number
): CustomerFacingRange {
  // Low estimate = 90% of recommended price, rounded to nearest 100,000 COP
  const lowCop = Math.round((recommendedPriceCop * 0.9) / 100000) * 100000;
  // High estimate = 110% of recommended price, rounded to nearest 100,000 COP
  const highCop = Math.round((recommendedPriceCop * 1.1) / 100000) * 100000;

  const formatMillions = (val: number): string => {
    if (val >= 1000000) {
      const millions = val / 1000000;
      return `$${millions.toFixed(1)}M`;
    }
    const thousands = val / 1000;
    return `$${thousands.toFixed(0)}k`;
  };

  const lowStr = formatMillions(lowCop);
  const highStr = formatMillions(highCop);

  return {
    lowCop,
    highCop,
    formattedRange: `${lowStr} – ${highStr} COP`,
  };
}
