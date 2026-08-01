// =============================================================================
// MTB Labs — Root Middleware
// =============================================================================
// SCOPED EXCLUSIVELY to /quote/admin/* routes.
// Does NOT affect the portfolio, project pages, or any other routes.

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/quote/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Only match /quote/admin and its sub-routes
    "/quote/admin/:path*",
  ],
};
