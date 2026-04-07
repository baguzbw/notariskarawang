import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export const revalidate = 60;

const PER_PAGE = 7;

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function ArtikelPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || "1"));
  const from = (page - 1) * PER_PAGE;
  const to = from + PER_PAGE - 1;

  const { data: artikels, count } = await supabase
    .from("artikel_hukum")
    .select("id, judul, slug, thumbnail_url, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  const totalPages = Math.ceil((count || 0) / PER_PAGE);
  const featured = page === 1 ? artikels?.[0] : null;
  const rest = page === 1 ? artikels?.slice(1) : artikels;

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Edukasi Hukum</p>
                <h1 className="text-4xl md:text-5xl font-semibold mb-4">Artikel Hukum</h1>
                <div className="w-16 h-0.5 bg-gold" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {artikels && artikels.length > 0 ? (
              <>
                {featured && (
                  <Link href={`/artikel/${featured.slug}`} className="group block mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 border border-cream-dark hover:shadow-xl transition-shadow duration-300">
                      <div className="relative overflow-hidden min-h-72 bg-dongker">
                        {featured.thumbnail_url ? (
                          <img src={featured.thumbnail_url} alt={featured.judul}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-12 h-0.5 bg-gold mx-auto mb-3" />
                              <span className="text-cream/20 text-sm">Artikel Hukum</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-gold px-3 py-1 z-10">
                          <span className="text-xs font-bold text-dongker-dark tracking-widest uppercase">Terbaru</span>
                        </div>
                      </div>
                      <div className="bg-cream-light p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-dongker/30 mb-4">
                          <Calendar size={13} />
                          <span className="text-xs">
                            {new Date(featured.created_at).toLocaleDateString("id-ID", {
                              day: "numeric", month: "long", year: "numeric",
                            })}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-dongker mb-5 leading-snug group-hover:text-dongker-light transition-colors">
                          {featured.judul}
                        </h2>
                        <div className="w-10 h-0.5 bg-gold mb-6" />
                        <div className="flex items-center gap-2 text-sm font-semibold text-dongker group-hover:gap-3 transition-all">
                          Baca Selengkapnya <ArrowRight size={15} />
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {rest && rest.length > 0 && (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <p className="text-xs text-dongker/40 tracking-widest uppercase whitespace-nowrap">
                        {page === 1 ? "Artikel Lainnya" : `Halaman ${page}`}
                      </p>
                      <div className="h-px bg-cream-dark flex-1" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                      {rest.map((artikel) => (
                        <Link key={artikel.id} href={`/artikel/${artikel.slug}`}
                          className="group block bg-cream-light border border-cream-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden">
                          <div className="aspect-video bg-dongker overflow-hidden">
                            {artikel.thumbnail_url ? (
                              <img src={artikel.thumbnail_url} alt={artikel.judul}
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-8 h-px bg-gold/30" />
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <div className="flex items-center gap-2 text-dongker/30 mb-3">
                              <Calendar size={11} />
                              <span className="text-xs">
                                {new Date(artikel.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric", month: "short", year: "numeric",
                                })}
                              </span>
                            </div>
                            <h3 className="text-[15px] font-semibold text-dongker mb-4 leading-snug group-hover:text-dongker-light transition-colors line-clamp-3">
                              {artikel.judul}
                            </h3>
                            <div className="flex items-center gap-1.5 text-gold text-xs font-semibold">
                              Baca <ArrowRight size={12} />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}

                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-1.5">
                    <Link href={page <= 1 ? "#" : `/artikel?page=${page - 1}`}
                      className={`flex items-center gap-1 px-4 py-2.5 text-sm border transition-colors
                        ${page <= 1 ? "border-cream-dark text-dongker/20 pointer-events-none"
                          : "border-cream-dark text-dongker hover:bg-dongker hover:text-cream hover:border-dongker"}`}>
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
                        <Link key={p} href={`/artikel?page=${p}`}
                          className={`w-10 h-10 flex items-center justify-center text-sm border transition-colors
                            ${p === page ? "bg-dongker text-cream border-dongker font-semibold"
                              : "border-cream-dark text-dongker hover:bg-dongker-light hover:text-cream hover:border-dongker-light"}`}>
                          {p}
                        </Link>
                      );
                    })}
                    <Link href={page >= totalPages ? "#" : `/artikel?page=${page + 1}`}
                      className={`flex items-center gap-1 px-4 py-2.5 text-sm border transition-colors
                        ${page >= totalPages ? "border-cream-dark text-dongker/20 pointer-events-none"
                          : "border-cream-dark text-dongker hover:bg-dongker hover:text-cream hover:border-dongker"}`}>
                      Berikutnya <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32">
                <div className="w-12 h-0.5 bg-gold/30 mx-auto mb-6" />
                <p className="text-xl text-dongker/20">Belum ada artikel.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
