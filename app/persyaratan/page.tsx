import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { CheckSquare } from "lucide-react";

export const revalidate = 3600;

export default async function PersyaratanPage() {
  const { data: groups } = await supabase
    .from("persyaratan")
    .select("id, nama_layanan, urutan, persyaratan_item(id, isi, urutan)")
    .order("urutan", { ascending: true });

  const data = groups?.map((g) => ({
    ...g,
    persyaratan_item: [...(g.persyaratan_item ?? [])].sort(
      (a, b) => a.urutan - b.urutan
    ),
  }));

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">
              Dokumen Yang Dibutuhkan
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Persyaratan</h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-dongker/60 mb-12 max-w-2xl">
              Berikut adalah dokumen yang perlu disiapkan untuk setiap layanan.
              Pastikan semua dokumen dalam kondisi lengkap dan valid sebelum datang ke kantor.
            </p>
            {data && data.length > 0 ? (
              <div className="space-y-8">
                {data.map((item) => (
                  <div key={item.id} className="bg-cream-light border border-cream-dark p-8">
                    <h2 className="text-xl font-semibold text-dongker mb-5">
                      {item.nama_layanan}
                    </h2>
                    {item.persyaratan_item.length > 0 ? (
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.persyaratan_item.map((s) => (
                          <li key={s.id} className="flex items-start gap-3">
                            <CheckSquare size={16} className="text-gold mt-0.5 shrink-0" />
                            <span className="text-sm text-dongker/70">{s.isi}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-dongker/30">Belum ada item persyaratan.</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-dongker/40">Belum ada persyaratan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
