import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export default async function ProsedurPage() {
  const { data: langkah } = await supabase
    .from("prosedur")
    .select("*")
    .order("urutan", { ascending: true });

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">
              Bagaimana Cara Kerja Kami
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Alur Pelayanan
            </h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {langkah && langkah.length > 0 ? (
              <>
                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-px bg-cream-dark hidden sm:block" />
                  <div className="space-y-8">
                    {langkah.map((item) => (
                      <div key={item.id} className="flex gap-6 relative">
                        <div className="w-16 h-16 bg-dongker text-cream flex items-center justify-center shrink-0 font-bold text-xl relative z-10">
                          {String(item.urutan).padStart(2, "0")}
                        </div>
                        <div className="flex-1 bg-cream-light border border-cream-dark p-6 hover:shadow-md transition-shadow">
                          <h3 className="text-lg font-semibold text-dongker mb-2">
                            {item.judul}
                          </h3>
                          <p className="text-sm text-dongker/60 leading-relaxed">
                            {item.deskripsi}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 bg-dongker/5 border-l-4 border-gold p-6">
                  <p className="text-sm text-dongker/70 leading-relaxed">
                    <strong className="text-dongker">Catatan:</strong> Estimasi waktu
                    proses dapat berbeda tergantung kompleksitas kasus dan kelengkapan
                    dokumen. Untuk informasi lebih lanjut, silakan hubungi kantor kami.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-dongker/40">Belum ada alur pelayanan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
