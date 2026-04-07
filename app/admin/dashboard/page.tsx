export const revalidate = 0;

import { getProfilKantor } from "@/lib/profil";
import { supabase } from "@/lib/supabase";
import { AlertCircle, ArrowRight, Briefcase, Calendar, CheckCircle2, ClipboardList, Clock, FileText, GitBranch, Mail, MapPin, Phone, PlusCircle, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [
    { count: totalArtikelPublished },
    { count: totalArtikelDraft },
    { count: totalKegiatanPublished },
    { count: totalKegiatanDraft },
    { count: totalLayanan },
    { count: totalPersyaratan },
    { count: totalProsedur },
    { data: recentArtikel },
    { data: recentKegiatan },
    profil,
  ] = await Promise.all([
    supabase.from("artikel_hukum").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("artikel_hukum").select("*", { count: "exact", head: true }).eq("published", false),
    supabase.from("info_kegiatan").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("info_kegiatan").select("*", { count: "exact", head: true }).eq("published", false),
    supabase.from("layanan").select("*", { count: "exact", head: true }),
    supabase.from("persyaratan").select("*", { count: "exact", head: true }),
    supabase.from("prosedur").select("*", { count: "exact", head: true }),
    supabase.from("artikel_hukum").select("id, judul, published, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("info_kegiatan").select("id, judul, published, tanggal_kegiatan").order("created_at", { ascending: false }).limit(3),
    getProfilKantor(),
  ]);

  const totalArtikel = (totalArtikelPublished ?? 0) + (totalArtikelDraft ?? 0);
  const totalKegiatan = (totalKegiatanPublished ?? 0) + (totalKegiatanDraft ?? 0);
  const namaNotaris = profil?.nama_notaris ?? "Admin";
  const firstName = namaNotaris.split(" ")[0];
  const totalDraft = (totalArtikelDraft ?? 0) + (totalKegiatanDraft ?? 0);

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const stats = [
    {
      label: "Artikel Hukum",
      total: totalArtikel,
      published: totalArtikelPublished ?? 0,
      draft: totalArtikelDraft ?? 0,
      icon: FileText,
      href: "/admin/artikel",
      add: "/admin/artikel/tambah",
      hasDraftStatus: true,
    },
    {
      label: "Info Kegiatan",
      total: totalKegiatan,
      published: totalKegiatanPublished ?? 0,
      draft: totalKegiatanDraft ?? 0,
      icon: Calendar,
      href: "/admin/kegiatan",
      add: "/admin/kegiatan/tambah",
      hasDraftStatus: true,
    },
    {
      label: "Layanan",
      total: totalLayanan ?? 0,
      published: totalLayanan ?? 0,
      draft: 0,
      icon: Briefcase,
      href: "/admin/layanan",
      add: "/admin/layanan/tambah",
      hasDraftStatus: false,
    },
    {
      label: "Persyaratan",
      total: totalPersyaratan ?? 0,
      published: totalPersyaratan ?? 0,
      draft: 0,
      icon: ClipboardList,
      href: "/admin/persyaratan",
      add: "/admin/persyaratan/tambah",
      hasDraftStatus: false,
    },
    {
      label: "Alur Pelayanan",
      total: totalProsedur ?? 0,
      published: totalProsedur ?? 0,
      draft: 0,
      icon: GitBranch,
      href: "/admin/prosedur",
      add: "/admin/prosedur/tambah",
      hasDraftStatus: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* ── HEADER ── */}
      <div className="bg-dongker text-cream p-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative">
          <p className="text-gold text-xs tracking-[0.25em] uppercase mb-1">Panel Administrasi</p>
          <h1 className="text-3xl font-semibold text-cream mb-1">Selamat datang, {firstName}.</h1>
          <p className="text-cream/40 text-sm">{dateStr}</p>
        </div>
      </div>

      {/* ── STAT CARDS ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp size={15} className="text-gold" />
          <h2 className="text-xs text-dongker/50 tracking-[0.2em] uppercase font-medium">Ringkasan Konten</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {stats.map(({ label, total, published, draft, icon: Icon, href, add, hasDraftStatus }) => (
            <div key={label} className="bg-cream-light border border-cream-dark p-5 group relative overflow-hidden hover:border-dongker/40 transition-colors">
              <span className="absolute -bottom-2 -right-1 font-bold text-7xl text-dongker/[0.04] select-none leading-none">{total}</span>
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 bg-dongker flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-gold" />
                </div>
                <Link href={add} className="text-dongker/30 hover:text-dongker transition-colors" title={`Tambah ${label}`}>
                  <PlusCircle size={14} />
                </Link>
              </div>
              <p className="text-4xl font-bold text-dongker mb-1 relative z-10">{total}</p>
              <Link href={href} className="text-xs text-dongker/50 hover:text-dongker transition-colors inline-flex items-center gap-1 group-hover:gap-1.5 relative z-10">
                {label} <ArrowRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* ── RECENT CONTENT + DATA KANTOR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Artikel — 2/3 width */}
        <div className="lg:col-span-2 bg-cream-light border border-cream-dark">
          <div className="flex items-center justify-between px-6 py-4 border-b border-cream-dark">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-gold" />
              <h3 className="text-sm font-semibold text-dongker">Artikel Terbaru</h3>
            </div>
            <Link href="/admin/artikel" className="text-xs text-dongker/40 hover:text-dongker transition-colors inline-flex items-center gap-1">
              Lihat semua <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-cream-dark">
            {recentArtikel && recentArtikel.length > 0 ? (
              recentArtikel.map((a) => (
                <div key={a.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-cream-dark/20 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.published ? "bg-emerald-500" : "bg-amber-400"}`} />
                    <span className="text-sm text-dongker font-medium truncate">{a.judul}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs text-dongker/30 hidden sm:block">{new Date(a.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-10 text-center text-sm text-dongker/30">Belum ada artikel.</div>
            )}
          </div>
        </div>

        {/* Right column — 1/3 width */}
        <div className="space-y-4">
          {/* Recent Kegiatan */}
          <div className="bg-cream-light border border-cream-dark">
            <div className="flex items-center justify-between px-5 py-4 border-b border-cream-dark">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-gold" />
                <h3 className="text-sm font-semibold text-dongker">Kegiatan Terbaru</h3>
              </div>
              <Link href="/admin/kegiatan" className="text-xs text-dongker/40 hover:text-dongker transition-colors inline-flex items-center gap-1">
                Lihat semua <ArrowRight size={11} />
              </Link>
            </div>
            <div className="divide-y divide-cream-dark">
              {recentKegiatan && recentKegiatan.length > 0 ? (
                recentKegiatan.map((k) => (
                  <div key={k.id} className="flex items-center gap-3 px-5 py-3 hover:bg-cream-dark/20 transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${k.published ? "bg-emerald-500" : "bg-amber-400"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-dongker font-medium truncate">{k.judul}</p>
                      {k.tanggal_kegiatan && (
                        <p className="text-xs text-dongker/30 flex items-center gap-1 mt-0.5">
                          <Clock size={10} />
                          {new Date(k.tanggal_kegiatan).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-5 py-6 text-center text-sm text-dongker/30">Belum ada kegiatan.</div>
              )}
            </div>
          </div>

          {/* Data Kantor — same card style */}
          <div className="bg-cream-light border border-cream-dark">
            <div className="flex items-center gap-2 px-5 py-4 border-b border-cream-dark">
              <Settings size={14} className="text-gold" />
              <h3 className="text-sm font-semibold text-dongker">Data Kantor</h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              {profil?.alamat && (
                <div className="flex items-start gap-2.5">
                  <MapPin size={13} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-xs text-dongker/60 leading-relaxed line-clamp-2">{profil.alamat}</p>
                </div>
              )}
              {(profil?.telepon || profil?.hp) && (
                <div className="flex items-center gap-2.5">
                  <Phone size={13} className="text-gold shrink-0" />
                  <p className="text-xs text-dongker/60">
                    {profil?.telepon}
                    {profil?.telepon && profil?.hp ? " / " : ""}
                    {profil?.hp}
                  </p>
                </div>
              )}
              {profil?.email && (
                <div className="flex items-center gap-2.5">
                  <Mail size={13} className="text-gold shrink-0" />
                  <p className="text-xs text-dongker/60 truncate">{profil.email}</p>
                </div>
              )}
              {!profil?.alamat && !profil?.telepon && !profil?.email && <p className="text-xs text-dongker/30">Data kantor belum diisi.</p>}
            </div>
            <div className="px-5 pb-5">
              <Link href="/admin/data-kantor" className="w-full btn-primary text-sm inline-flex items-center justify-center gap-2">
                Edit Data Kantor <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
