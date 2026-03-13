"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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

  return (
    <header className="bg-dongker text-cream shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 border-2 border-gold flex items-center justify-center">
              <span className="font-serif text-gold font-bold text-sm">N</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-sans text-cream/80 hover:text-cream hover:bg-dongker-light transition-colors duration-150 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-cream"
            onClick={() => setOpen(!open)}
          >
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
              className="block px-6 py-3 text-sm font-sans text-cream/80 hover:text-cream hover:bg-dongker-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
