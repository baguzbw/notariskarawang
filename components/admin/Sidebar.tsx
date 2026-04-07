"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  LayoutDashboard, FileText, Calendar,
  LogOut, Briefcase, Settings, ClipboardList, GitBranch,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artikel", label: "Artikel Hukum", icon: FileText },
  { href: "/admin/kegiatan", label: "Info Kegiatan", icon: Calendar },
  { href: "/admin/layanan", label: "Layanan", icon: Briefcase },
  { href: "/admin/persyaratan", label: "Persyaratan", icon: ClipboardList },
  { href: "/admin/prosedur", label: "Alur Pelayanan", icon: GitBranch },
  { href: "/admin/data-kantor", label: "Data Kantor", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="w-60 bg-dongker-dark text-cream min-h-screen flex flex-col shrink-0">
      <div className="p-6 border-b border-dongker-light/30">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-gold flex items-center justify-center">
            <span className="text-gold font-bold text-xs">N</span>
          </div>
          <span className="text-sm font-semibold text-cream">Panel Admin</span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm transition-colors rounded-sm
                ${active
                  ? "bg-dongker-light text-cream"
                  : "text-cream/60 hover:text-cream hover:bg-dongker-light/50"
                }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-dongker-light/30">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm text-cream/60 hover:text-cream hover:bg-dongker-light/50 transition-colors rounded-sm"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
