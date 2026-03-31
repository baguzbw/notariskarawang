import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export const revalidate = 3600;

export default async function LayananPage() {
  const { data: layanan } = await supabase
    .from("layanan")
    .select("*")
    .order("urutan", { ascending: true });

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">
              Apa Yang Kami Tawarkan
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Daftar Layanan
            </h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {layanan && layanan.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {layanan.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative bg-cream-light border border-cream-dark p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group overflow-hidden"
                  >
                    <span className="absolute -top-3 -right-1 font-serif text-8xl font-bold text-dongker/[0.06] select-none leading-none group-hover:text-gold/10 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-8 h-0.5 bg-gold mb-5" />
                    <h3 className="text-base font-semibold text-dongker mb-3 leading-snug relative z-10">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-dongker/55 leading-relaxed relative z-10">
                      {item.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-dongker/40">Belum ada layanan.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
