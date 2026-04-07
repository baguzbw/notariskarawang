"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import { supabase } from "@/lib/supabase";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setChecking(false);
      }
    });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="h-screen bg-dongker flex items-center justify-center">
        <p className="text-cream/40 text-sm">Memeriksa sesi...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
