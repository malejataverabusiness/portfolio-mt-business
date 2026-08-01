"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/quote/supabase/client";

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side auth guard for admin routes.
 * SUPPLEMENTS (does not replace) the server-side middleware protection.
 */
export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user && pathname !== "/quote/admin/login") {
        router.push(
          `/quote/admin/login?redirectTo=${encodeURIComponent(pathname)}`
        );
      } else {
        setAuthorized(true);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (!authorized && pathname !== "/quote/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
          <span className="material-symbols-outlined animate-spin text-xl">
            progress_activity
          </span>
          Verifying authorization...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
