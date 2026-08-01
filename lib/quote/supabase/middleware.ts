// =============================================================================
// MTB Quote — Supabase Middleware Helper
// =============================================================================
// Refreshes the Supabase auth session on every request to /quote/admin/*.
// Called from the root middleware.ts.

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session — this will extend expiry if valid
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is not authenticated and trying to access admin pages
  // (but not the login page itself), redirect to login
  const isAdminRoute = request.nextUrl.pathname.startsWith("/quote/admin");
  const isLoginPage = request.nextUrl.pathname === "/quote/admin/login";

  if (!user && isAdminRoute && !isLoginPage) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/quote/admin/login";
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If user is authenticated and on the login page, redirect to dashboard
  if (user && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/quote/admin";
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}
