"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
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

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/quote/admin/login");
  };

  // Login page renders without the sidebar chrome
  if (isLoginPage) {
    return <>{children}</>;
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
