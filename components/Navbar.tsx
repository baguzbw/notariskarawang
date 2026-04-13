"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/profil-notaris", label: "Profil Notaris" },
  { href: "/profil-kantor", label: "Profil Kantor" },
  { href: "/layanan", label: "Layanan" },
  { href: "/persyaratan", label: "Persyaratan" },
  { href: "/prosedur", label: "Prosedur" },
  { href: "/artikel", label: "Artikel Hukum" },
  { href: "/kegiatan", label: "Kegiatan" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="bg-dongker text-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-gold flex items-center justify-center">
              <span className="text-gold font-bold text-sm">N</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`relative px-3 py-2 text-sm transition-colors duration-150 rounded-sm ${isActive(link.href) ? "text-gold" : "text-cream/70 hover:text-cream hover:bg-dongker-light"}`}>
                {link.label}
                {isActive(link.href) && <span className="absolute bottom-0 left-3 right-3 h-px bg-gold" />}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button className="lg:hidden p-2 text-cream" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="lg:hidden bg-dongker-dark border-t border-dongker-light">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-6 py-3 text-sm transition-colors ${isActive(link.href) ? "text-gold bg-dongker-light/30 border-l-2 border-gold" : "text-cream/70 hover:text-cream hover:bg-dongker-light"}`}
            >
              {link.label}
              {isActive(link.href) && <span className="w-1.5 h-1.5 rounded-full bg-gold" />}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
