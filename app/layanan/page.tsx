import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Scale, Home, Users, FileSignature, Landmark, ScrollText, Building } from "lucide-react";

const layanan = [
  {
    icon: FileText,
    nama: "Akta Jual Beli",
    deskripsi:
      "Pembuatan akta jual beli tanah dan/atau bangunan yang sah secara hukum sebagai bukti perpindahan hak atas properti.",
  },
  {
    icon: Scale,
    nama: "Akta Perjanjian",
    deskripsi:
      "Penyusunan dan legalisasi berbagai jenis perjanjian termasuk perjanjian kerjasama, sewa-menyewa, dan lainnya.",
  },
  {
    icon: Home,
    nama: "Akta PPAT",
    deskripsi:
      "Layanan sebagai Pejabat Pembuat Akta Tanah meliputi balik nama sertifikat, hibah tanah, dan pemisahan/penggabungan bidang tanah.",
  },
  {
    icon: Users,
    nama: "Akta Pendirian PT/CV",
    deskripsi:
      "Pendirian badan usaha berbadan hukum (PT) maupun tidak berbadan hukum (CV, Firma) beserta pengesahannya.",
  },
  {
    icon: FileSignature,
    nama: "Legalisasi & Waarmerking",
    deskripsi:
      "Pengesahan tanda tangan dan legalisasi dokumen untuk keperluan hukum baik di dalam maupun luar negeri.",
  },
  {
    icon: Landmark,
    nama: "Akta Wasiat",
    deskripsi:
      "Pembuatan akta wasiat (testament) sesuai ketentuan hukum perdata Indonesia dengan kerahasiaan terjaga.",
  },
  {
    icon: ScrollText,
    nama: "Surat Kuasa",
    deskripsi:
      "Pembuatan surat kuasa notariil untuk berbagai keperluan hukum yang memerlukan kewenangan pihak lain.",
  },
  {
    icon: Building,
    nama: "Akta Risalah RUPS",
    deskripsi:
      "Pencatatan dan pembuatan risalah Rapat Umum Pemegang Saham (RUPS) sesuai ketentuan hukum perusahaan.",
  },
];

export default function LayananPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-sans text-gold text-xs tracking-[0.2em] uppercase mb-3">
              Apa Yang Kami Tawarkan
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Daftar Layanan
            </h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {layanan.map(({ icon: Icon, nama, deskripsi }) => (
                <div
                  key={nama}
                  className="bg-cream-light border border-cream-dark p-6 hover:shadow-lg hover:border-gold/30 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 bg-dongker flex items-center justify-center mb-4 group-hover:bg-dongker-light transition-colors">
                    <Icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-dongker mb-2">
                    {nama}
                  </h3>
                  <p className="font-sans text-sm text-dongker/60 leading-relaxed">
                    {deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
