import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ArrowRight, CheckCircle, FileText, Home, Mail, Phone, Scale, Users } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: FileText, label: "Akta Jual Beli", desc: "Pengesahan transaksi properti secara hukum" },
  { icon: Scale, label: "Akta Perjanjian", desc: "Pembuatan dan legalisasi perjanjian" },
  { icon: Home, label: "PPAT", desc: "Pejabat Pembuat Akta Tanah resmi" },
  { icon: Users, label: "Akta Perusahaan", desc: "Pendirian dan perubahan badan usaha" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dongker text-cream relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative">
            <div className="max-w-3xl">
              <div className="inline-block border border-gold/40 px-4 py-1.5 mb-8">
                <span className="text-gold text-xs tracking-[0.25em] uppercase">Notaris & PPAT Resmi — Karawang</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.15]">
                Norman Tuah <br />
                <span className="italic font-light text-6xl md:text-7xl block mt-2">
                  Hamonangan Sinaga
                </span>
              </h1>
              <p className="text-gold-light/80 text-sm md:text-base mt-6 tracking-widest uppercase">
                Shut, SH, M.Kn
              </p>
              <div className="w-16 h-0.5 bg-gold mt-2" />
              <p className="text-cream/70 text-lg leading-relaxed mt-8 mb-10 max-w-xl">
                Melayani kebutuhan kenotariatan dan pertanahan masyarakat Karawang dengan standar hukum yang akurat, transparan, dan terpercaya.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/layanan" className="btn-primary inline-flex items-center gap-2">
                  Lihat Layanan <ArrowRight size={16} />
                </Link>
                <Link href="/profil-notaris" className="border border-cream/30 text-cream px-6 py-3 font-medium tracking-wide hover:border-gold hover:text-gold transition-colors inline-block">
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
                <span className="text-sm font-semibold text-dongker-dark">(0267) 8634232 / 0812 9151 9609</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={15} className="text-dongker-dark" />
                <span className="text-sm font-semibold text-dongker-dark">normantuahhsinaga@yahoo.co.id</span>
              </div>
              <span className="text-sm text-dongker-dark font-medium">Senin – Jumat: 08.00 – 16.00 WIB</span>
            </div>
          </div>
        </section>

        {/* Layanan */}
        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Yang Kami Tawarkan</p>
              <h2 className="section-title mb-4">Layanan Kenotariatan</h2>
              <div className="divider-gold mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="bg-cream-light border border-cream-dark p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
                  <div className="w-10 h-10 bg-dongker flex items-center justify-center mb-4">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="text-base font-semibold text-dongker mb-2">{label}</h3>
                  <p className="text-sm text-dongker/60 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
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
                <p className="text-cream/60 leading-relaxed mb-8">Kantor Notaris & PPAT Norman Tuah Hamonangan Sinaga telah dipercaya melayani masyarakat Karawang dalam berbagai kebutuhan hukum pertanahan dan kenotariatan.</p>
                <Link href="/prosedur" className="btn-primary inline-flex items-center gap-2">
                  Lihat Alur Pelayanan <ArrowRight size={16} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Terdaftar Resmi", sub: "Kemenkumham RI" },
                  { label: "Wilayah Karawang", sub: "Melayani seluruh Kab. Karawang" },
                  { label: "Proses Transparan", sub: "Tanpa biaya tersembunyi" },
                  { label: "Konsultasi Awal", sub: "Tanpa dipungut biaya" },
                ].map((item) => (
                  <div key={item.label} className="border border-dongker-light p-5">
                    <CheckCircle size={18} className="text-gold mb-3" />
                    <p className="text-sm font-semibold text-cream mb-1">{item.label}</p>
                    <p className="text-xs text-cream/40">{item.sub}</p>
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