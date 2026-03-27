import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const langkah = [
  {
    no: "01",
    judul: "Konsultasi Awal",
    deskripsi:
      "Hubungi kantor melalui telepon atau datang langsung untuk konsultasi awal. Sampaikan kebutuhan dan tujuan Anda. Konsultasi awal tidak dipungut biaya.",
  },
  {
    no: "02",
    judul: "Persiapan Dokumen",
    deskripsi:
      "Setelah konsultasi, Anda akan mendapatkan daftar dokumen yang perlu disiapkan. Lengkapi seluruh persyaratan sesuai jenis layanan yang dipilih.",
  },
  {
    no: "03",
    judul: "Penyerahan Dokumen",
    deskripsi:
      "Datang ke kantor untuk menyerahkan dokumen lengkap. Staf kami akan melakukan pengecekan kelengkapan dan keabsahan dokumen.",
  },
  {
    no: "04",
    judul: "Proses Pembuatan Akta",
    deskripsi:
      "Notaris akan menyusun konsep akta berdasarkan dokumen dan kesepakatan para pihak. Proses ini membutuhkan waktu 1–5 hari kerja tergantung jenis layanan.",
  },
  {
    no: "05",
    judul: "Penandatanganan Akta",
    deskripsi:
      "Para pihak yang berkepentingan datang ke kantor untuk membacakan dan menandatangani akta di hadapan Notaris. Seluruh pihak wajib hadir.",
  },
  {
    no: "06",
    judul: "Penyerahan Dokumen Final",
    deskripsi:
      "Setelah ditandatangani, akta resmi diserahkan kepada para pihak. Proses selesai dan akta memiliki kekuatan hukum penuh.",
  },
];

export default function ProsedurPage() {
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
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-cream-dark hidden sm:block" />

              <div className="space-y-8">
                {langkah.map((item) => (
                  <div key={item.no} className="flex gap-6 relative">
                    {/* Number */}
                    <div className="w-16 h-16 bg-dongker text-cream flex items-center justify-center shrink-0 font-bold text-xl relative z-10">
                      {item.no}
                    </div>
                    {/* Content */}
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

            {/* Note */}
            <div className="mt-12 bg-dongker/5 border-l-4 border-gold p-6">
              <p className="text-sm text-dongker/70 leading-relaxed">
                <strong className="text-dongker">Catatan:</strong> Estimasi waktu proses dapat
                berbeda tergantung kompleksitas kasus dan kelengkapan dokumen. Untuk informasi
                lebih lanjut, silakan hubungi kantor kami.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}