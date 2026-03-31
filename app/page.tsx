import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { supabase } from "@/lib/supabase";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  Zap,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 3600;

const keunggulan = [
  { icon: ShieldCheck, label: "Terdaftar Resmi", sub: "Kemenkumham RI" },
  { icon: Award, label: "Wilayah Karawang", sub: "Melayani seluruh Kab. Karawang" },
  { icon: Zap, label: "Proses Transparan", sub: "Tanpa biaya tersembunyi" },
  { icon: HeartHandshake, label: "Konsultasi Awal", sub: "Tanpa dipungut biaya" },
];

export default async function HomePage() {
  const { data: layananPreview } = await supabase
    .from("layanan")
    .select("id, nama, deskripsi")
    .order("urutan", { ascending: true })
    .limit(4);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dongker text-cream relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
            <div className="max-w-3xl">
              <div className="inline-block border border-gold/40 px-4 py-1.5 mb-8">
                <span className="text-gold text-xs tracking-[0.25em] uppercase">
                  Notaris & PPAT Resmi — Karawang
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15] text-cream">
                Norman Tuah <br />
                <span className="block mt-2">Hamonangan Sinaga</span>
              </h1>
              <p className="text-gold text-sm md:text-base mt-4 font-semibold tracking-[0.2em] uppercase">
                Shut, SH, M.Kn
              </p>
              <div className="w-16 h-0.5 bg-gold mt-4 mb-8" />
              <p className="text-cream/70 text-lg leading-relaxed mb-10 max-w-xl">
                Melayani kebutuhan kenotariatan dan pertanahan masyarakat Karawang
                dengan standar hukum yang akurat, transparan, dan terpercaya.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/layanan" className="btn-primary inline-flex items-center gap-2">
                  Lihat Layanan <ArrowRight size={16} />
                </Link>
                <Link
                  href="/profil-notaris"
                  className="border border-cream/30 text-cream px-6 py-3 font-medium tracking-wide hover:border-gold hover:text-gold transition-colors inline-block"
                >
                  Profil Notaris
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Info strip */}
        <section className="bg-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-dongker-dark" />
                <span className="text-sm font-semibold text-dongker-dark">
                  (0267) 8634232 / 0812 9151 9609
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-dongker-dark" />
                <span className="text-sm font-semibold text-dongker-dark">
                  normantuahhsinaga@yahoo.co.id
                </span>
              </div>
              <span className="text-sm text-dongker-dark font-medium">
                Senin – Jumat: 08.00 – 16.00 WIB
              </span>
            </div>
          </div>
        </section>

        {/* Layanan */}
        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">
                Yang Kami Tawarkan
              </p>
              <h2 className="section-title mb-4">Layanan Kenotariatan</h2>
              <div className="divider-gold mx-auto" />
            </div>

            {layananPreview && layananPreview.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {layananPreview.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative bg-cream-light border border-cream-dark p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group overflow-hidden"
                  >
                    <span className="absolute -top-3 -right-1 font-serif text-8xl font-bold text-dongker/[0.06] select-none leading-none group-hover:text-gold/10 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-8 h-0.5 bg-gold mb-5" />
                    <h3 className="text-base font-semibold text-dongker mb-2 relative z-10">
                      {item.nama}
                    </h3>
                    <p className="text-sm text-dongker/60 leading-relaxed relative z-10">
                      {item.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-dongker/30 py-10">Belum ada layanan.</p>
            )}

            <div className="text-center mt-10">
              <Link href="/layanan" className="btn-outline inline-flex items-center gap-2">
                Semua Layanan <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Keunggulan */}
        <section className="bg-dongker text-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Mengapa Kami</p>
                <h2 className="text-3xl md:text-4xl font-semibold mb-4 leading-tight">
                  Pengalaman & Integritas
                  <br />
                  <em className="font-normal">dalam Setiap Akta</em>
                </h2>
                <div className="w-16 h-0.5 bg-gold mb-6" />
                <p className="text-cream/60 leading-relaxed mb-8">
                  Kantor Notaris & PPAT Norman Tuah Hamonangan Sinaga telah dipercaya
                  melayani masyarakat Karawang dalam berbagai kebutuhan hukum
                  pertanahan dan kenotariatan.
                </p>
                <Link href="/prosedur" className="btn-primary inline-flex items-center gap-2">
                  Lihat Alur Pelayanan <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {keunggulan.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="border border-dongker-light p-5">
                    <Icon size={18} className="text-gold mb-3" />
                    <p className="text-sm font-semibold text-cream mb-1">{label}</p>
                    <p className="text-xs text-cream/40">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
