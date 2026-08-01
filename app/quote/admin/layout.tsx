"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/quote/AdminSidebar";
import { createClient } from "@/lib/quote/supabase/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/quote/admin/login";
  const [loading, setLoading] = useState(!isLoginPage);

  useEffect(() => {
    if (isLoginPage) return;

    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // Redirection to login for unauthorized access
        router.push("/quote/admin/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isLoginPage, router]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/quote/admin/login");
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-medium text-slate-500">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar language="en" onSignOut={handleSignOut} />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
