import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Calendar, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArtikelDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: artikel } = await supabase
    .from("artikel_hukum")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!artikel) notFound();

  const paragraphs = artikel.konten
    .split("\n")
    .filter((p: string) => p.trim() !== "");

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4 leading-tight">
              {artikel.judul}
            </h1>
            <div className="w-16 h-0.5 bg-gold mb-4" />
            <div className="flex items-center gap-2 text-cream/50">
              <Calendar size={13} />
              <span className="font-sans text-xs">
                {new Date(artikel.created_at).toLocaleDateString("id-ID", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-cream py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2">
                {artikel.thumbnail_url && (
                  <img
                    src={artikel.thumbnail_url}
                    alt={artikel.judul}
                    className="w-full h-64 object-cover mb-8"
                  />
                )}
                <div className="space-y-4">
                  {paragraphs.map((para: string, i: number) => (
                    <p key={i} className="font-sans text-base text-dongker/80 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-cream-light border border-cream-dark p-6 sticky top-24">
                  <h3 className="font-serif text-base font-semibold text-dongker mb-3">
                    Butuh Konsultasi?
                  </h3>
                  <div className="w-8 h-0.5 bg-gold mb-4" />
                  <p className="font-sans text-sm text-dongker/60 leading-relaxed mb-4">
                    Untuk pertanyaan hukum terkait artikel ini, hubungi kantor kami.
                  </p>
                  <p className="font-sans text-sm font-medium text-dongker mb-1">
                    (0267) 8634232
                  </p>
                  <p className="font-sans text-xs text-dongker/40 mb-4">
                    0812 9151 9609
                  </p>
                  <Link href="/prosedur" className="btn-primary text-sm w-full text-center block">
                    Lihat Prosedur
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-cream-dark">
              <Link href="/artikel" className="inline-flex items-center gap-2 font-sans text-sm text-dongker/60 hover:text-dongker transition-colors">
                <ArrowLeft size={16} />
                Kembali ke Artikel
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
