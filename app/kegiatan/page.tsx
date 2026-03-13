import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import { Calendar, MapPin } from "lucide-react";

export const revalidate = 60;

export default async function KegiatanPage() {
  const { data: kegiatan } = await supabase.from("info_kegiatan").select("*").eq("published", true).order("tanggal_kegiatan", { ascending: false });

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-sans text-gold text-xs tracking-[0.2em] uppercase mb-3">Aktivitas Kantor</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Info Kegiatan</h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {kegiatan && kegiatan.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {kegiatan.map((item) => (
                  <div key={item.id} className="bg-cream-light border border-cream-dark p-6 hover:shadow-md transition-shadow">
                    {item.gambar_url && <img src={item.gambar_url} alt={item.judul} className="w-full h-48 object-cover mb-4" />}
                    <h2 className="font-serif text-xl font-semibold text-dongker mb-3">{item.judul}</h2>
                    <p className="font-sans text-sm text-dongker/60 leading-relaxed mb-4">{item.deskripsi}</p>
                    <div className="flex flex-wrap gap-4">
                      {item.tanggal_kegiatan && (
                        <div className="flex items-center gap-2 text-dongker/40">
                          <Calendar size={13} />
                          <span className="font-sans text-xs">
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
                          <span className="font-sans text-xs">{item.lokasi}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-sans text-dongker/40">Belum ada kegiatan yang dipublikasikan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
