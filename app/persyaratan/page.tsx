import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckSquare } from "lucide-react";

const syaratData = [
  {
    layanan: "Akta Jual Beli Tanah",
    syarat: [
      "KTP Penjual dan Pembeli (asli & fotokopi)",
      "Kartu Keluarga (KK) Penjual dan Pembeli",
      "Sertifikat Tanah/Bangunan asli",
      "Bukti pembayaran PBB 5 tahun terakhir",
      "BPHTB yang sudah dibayar",
      "Surat persetujuan suami/istri (jika sudah menikah)",
      "NPWP Penjual dan Pembeli",
    ],
  },
  {
    layanan: "Pendirian PT (Perseroan Terbatas)",
    syarat: [
      "KTP seluruh pendiri/pemegang saham",
      "NPWP seluruh pendiri",
      "Surat pernyataan domisili perusahaan",
      "Rencana nama PT (minimal 3 pilihan)",
      "Akta pendirian atau SK Kemenkumham sebelumnya (jika perubahan)",
      "Susunan direksi dan komisaris",
      "Besaran modal dasar dan modal disetor",
    ],
  },
  {
    layanan: "Surat Kuasa Notariil",
    syarat: [
      "KTP pemberi kuasa (asli & fotokopi)",
      "KTP penerima kuasa (asli & fotokopi)",
      "Dokumen objek yang dikuasakan",
      "Menjelaskan tujuan dan lingkup kuasa secara jelas",
    ],
  },
  {
    layanan: "Akta Perjanjian",
    syarat: [
      "KTP para pihak (asli & fotokopi)",
      "Dokumen pendukung objek perjanjian",
      "Draft atau pokok-pokok perjanjian",
      "Jika badan usaha: akta perusahaan dan NPWP",
    ],
  },
];

export default function PersyaratanPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">
              Dokumen Yang Dibutuhkan
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Persyaratan
            </h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-dongker/60 mb-12 max-w-2xl">
              Berikut adalah dokumen yang perlu disiapkan untuk setiap layanan.
              Pastikan semua dokumen dalam kondisi lengkap dan valid sebelum datang ke kantor.
            </p>
            <div className="space-y-8">
              {syaratData.map((item) => (
                <div
                  key={item.layanan}
                  className="bg-cream-light border border-cream-dark p-8"
                >
                  <h2 className="text-xl font-semibold text-dongker mb-5">
                    {item.layanan}
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.syarat.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <CheckSquare size={16} className="text-gold mt-0.5 shrink-0" />
                        <span className="text-sm text-dongker/70">{s}</span>
                      </li>
                    ))}
                  </ul>
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