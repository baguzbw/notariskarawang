import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { FileText, Calendar, PlusCircle } from "lucide-react";

export default async function AdminDashboardPage() {
  const [{ count: totalArtikel }, { count: totalKegiatan }] = await Promise.all([
    supabase.from("artikel_hukum").select("*", { count: "exact", head: true }),
    supabase.from("info_kegiatan").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Total Artikel",
      value: totalArtikel ?? 0,
      icon: FileText,
      href: "/admin/artikel",
      add: "/admin/artikel/tambah",
    },
    {
      label: "Total Kegiatan",
      value: totalKegiatan ?? 0,
      icon: Calendar,
      href: "/admin/kegiatan",
      add: "/admin/kegiatan/tambah",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-dongker mb-2">
        Dashboard
      </h1>
      <p className="font-sans text-sm text-dongker/50 mb-8">
        Selamat datang di panel admin Kantor Notaris.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        {stats.map(({ label, value, icon: Icon, href, add }) => (
          <div key={label} className="bg-cream-light border border-cream-dark p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-dongker flex items-center justify-center">
                <Icon size={18} className="text-gold" />
              </div>
              <Link
                href={add}
                className="flex items-center gap-1 font-sans text-xs text-dongker/50 hover:text-dongker transition-colors"
              >
                <PlusCircle size={13} /> Tambah
              </Link>
            </div>
            <p className="font-serif text-3xl font-bold text-dongker mb-1">
              {value}
            </p>
            <Link
              href={href}
              className="font-sans text-sm text-dongker/50 hover:text-dongker transition-colors"
            >
              {label} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
