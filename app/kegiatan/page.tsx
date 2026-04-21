import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

const PER_PAGE = 6;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function KegiatanPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1"));
  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  const { data: kegiatan, count } = await supabase
    .from("info_kegiatan")
    .select("*", { count: "exact" })
    .order("tanggal_kegiatan", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / PER_PAGE);

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Aktivitas Kantor</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Info Kegiatan</h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {kegiatan && kegiatan.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {kegiatan.map((item) => (
                    <div key={item.id} className="group bg-cream-light border border-cream-dark overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      {/* Gambar full-bleed */}
                      {item.gambar_url && (
                        <div className="relative h-52 overflow-hidden bg-dongker">
                          <img
                            src={item.gambar_url}
                            alt={item.judul}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-dongker/50 via-transparent to-transparent" />
                          {item.tanggal_kegiatan && (
                            <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-cream/90">
                              <Calendar size={11} className="text-gold" />
                              <span className="text-xs">
                                {new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Konten */}
                      <div className="p-6">
                        <div className="w-8 h-0.5 bg-gold mb-4" />
                        <h2 className="text-xl font-semibold text-dongker mb-3 leading-snug group-hover:text-dongker-light transition-colors">
                          {item.judul}
                        </h2>
                        <p className="text-sm text-dongker/60 leading-relaxed mb-4">{item.deskripsi}</p>
                        <div className="flex flex-wrap gap-4 pt-4 border-t border-cream-dark">
                          {!item.gambar_url && item.tanggal_kegiatan && (
                            <div className="flex items-center gap-2 text-dongker/40">
                              <Calendar size={13} />
                              <span className="text-xs">
                                {new Date(item.tanggal_kegiatan).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                          )}
                          {item.lokasi && (
                            <div className="flex items-center gap-2 text-dongker/40">
                              <MapPin size={13} />
                              <span className="text-xs">{item.lokasi}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5">
                    <Link
                      href={page <= 1 ? "#" : `/kegiatan?page=${page - 1}`}
                      className={`flex items-center gap-1 px-4 py-2.5 text-sm border transition-colors
                        ${page <= 1
                          ? "border-cream-dark text-dongker/20 pointer-events-none"
                          : "border-cream-dark text-dongker hover:bg-dongker hover:text-cream hover:border-dongker"
                        }`}
                    >
                      <ChevronLeft size={14} /> Sebelumnya
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                      const isNear = Math.abs(p - page) <= 1 || p === 1 || p === totalPages;
                      if (!isNear) {
                        if ((p === 2 && page > 3) || (p === totalPages - 1 && page < totalPages - 2)) {
                          return <span key={p} className="text-sm text-dongker/30 w-6 text-center">…</span>;
                        }
                        return null;
                      }
                      return (
                        <Link
                          key={p}
                          href={`/kegiatan?page=${p}`}
                          className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors
                            ${p === page
                              ? "bg-dongker text-cream border-dongker font-semibold"
                              : "border-cream-dark text-dongker hover:bg-dongker-light hover:text-cream hover:border-dongker-light"
                            }`}
                        >
                          {p}
                        </Link>
                      );
                    })}

                    <Link
                      href={page >= totalPages ? "#" : `/kegiatan?page=${page + 1}`}
                      className={`flex items-center gap-1 px-4 py-2.5 text-sm border transition-colors
                        ${page >= totalPages
                          ? "border-cream-dark text-dongker/20 pointer-events-none"
                          : "border-cream-dark text-dongker hover:bg-dongker hover:text-cream hover:border-dongker"
                        }`}
                    >
                      Berikutnya <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-dongker/40">Belum ada kegiatan yang dipublikasikan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
