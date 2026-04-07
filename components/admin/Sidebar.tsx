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
    <aside className="w-56 bg-dongker-dark flex flex-col shrink-0 relative">
      {/* Subtle top gold accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* Logo / Brand */}
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 border border-gold/60 flex items-center justify-center">
              <span className="text-gold font-bold text-sm">N</span>
            </div>
          </div>
          <div>
            <p className="text-cream text-xs font-semibold leading-tight">Panel Admin</p>
            <p className="text-cream/30 text-[10px] tracking-widest uppercase leading-tight mt-0.5">Notaris</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 h-px bg-dongker-light/20" />

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[9px] text-cream/20 tracking-[0.2em] uppercase px-2 pb-2 pt-1">Menu</p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`
                relative flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150 group
                ${active
                  ? "text-cream"
                  : "text-cream/40 hover:text-cream/80"
                }
              `}
            >
              {/* Active indicator bar */}
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-gold" />
              )}

              {/* Active background */}
              {active && (
                <span className="absolute inset-0 bg-dongker-light/40" />
              )}

              {/* Hover background */}
              {!active && (
                <span className="absolute inset-0 bg-dongker-light/0 group-hover:bg-dongker-light/20 transition-colors duration-150" />
              )}

              <Icon
                size={15}
                className={`relative z-10 shrink-0 transition-colors ${
                  active ? "text-gold" : "text-cream/30 group-hover:text-cream/60"
                }`}
              />
              <span className="relative z-10 font-medium text-[13px] tracking-wide">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-5 h-px bg-dongker-light/20" />

      {/* Logout */}
      <div className="px-3 py-4">
        <button
          onClick={handleLogout}
          className="relative flex items-center gap-3 w-full px-3 py-2.5 text-cream/30 hover:text-red-400 transition-colors duration-150 group"
        >
          <span className="absolute inset-0 bg-dongker-light/0 group-hover:bg-red-500/5 transition-colors duration-150" />
          <LogOut size={15} className="relative z-10 shrink-0" />
          <span className="relative z-10 text-[13px] font-medium tracking-wide">Keluar</span>
        </button>
      </div>

      {/* Bottom gold accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </aside>
  );
}