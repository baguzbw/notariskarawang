"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LayoutDashboard, FileText, Calendar, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/artikel", label: "Artikel Hukum", icon: FileText },
  { href: "/admin/kegiatan", label: "Info Kegiatan", icon: Calendar },
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
      {/* Logo */}
      <div className="p-6 border-b border-dongker-light/30">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border border-gold flex items-center justify-center">
            <span className="font-serif text-gold font-bold text-xs">N</span>
          </div>
          <span className="font-serif text-sm font-semibold text-cream">
            Panel Admin
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm font-sans transition-colors rounded-sm
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

      {/* Logout */}
      <div className="p-4 border-t border-dongker-light/30">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-sans text-cream/60 hover:text-cream hover:bg-dongker-light/50 transition-colors rounded-sm"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
