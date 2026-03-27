import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Award, BookOpen, Briefcase } from "lucide-react";

const riwayat = [
  { tahun: "—", keterangan: "Lulus S1 Hukum (SH)" },
  { tahun: "—", keterangan: "Lulus S2 Kenotariatan (M.Kn)" },
  { tahun: "—", keterangan: "Diangkat sebagai Notaris oleh Menteri Hukum dan HAM RI" },
  { tahun: "—", keterangan: "Mendapatkan sertifikasi sebagai PPAT di wilayah Kab. Karawang" },
];

const organisasi = [
  "Ikatan Notaris Indonesia (INI)",
  "Ikatan Pejabat Pembuat Akta Tanah (IPPAT)",
];

export default function ProfilNotarisPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Tentang Notaris</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Profil Notaris</h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                <div className="bg-dongker/10 aspect-3/4 flex items-center justify-center mb-6 border border-cream-dark">
                  <span className="text-dongker/20 text-sm">Foto Notaris</span>
                </div>
                <h2 className="text-xl font-semibold text-dongker mb-1">
                  Norman Tuah Hamonangan Sinaga Shut, SH, M.Kn
                </h2>
                <p className="text-sm text-gold mb-4">Notaris & PPAT</p>
                <div className="space-y-2 text-sm text-dongker/70">
                  <p><span className="font-medium text-dongker">Wilayah Jabatan:</span> Kabupaten Karawang</p>
                  <p><span className="font-medium text-dongker">Telepon:</span> (0267) 8634232</p>
                  <p><span className="font-medium text-dongker">HP:</span> 0812 9151 9609</p>
                  <p><span className="font-medium text-dongker">Email:</span> normantuahhsinaga@yahoo.co.id</p>
                  <p><span className="font-medium text-dongker">Alamat:</span> Ruko Perumahan Green Garden Blok AA No.1, Kel. Nagasari, Kec. Karawang Barat, Kab. Karawang</p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <BookOpen size={18} className="text-gold" />
                    <h3 className="text-xl font-semibold text-dongker">Latar Belakang</h3>
                  </div>
                  <p className="text-dongker/70 leading-relaxed">
                    Norman Tuah Hamonangan Sinaga, Shut, SH, M.Kn merupakan Notaris dan PPAT
                    yang berkedudukan di Kabupaten Karawang. Beliau menempuh pendidikan hukum
                    hingga jenjang Magister Kenotariatan dan telah resmi diangkat sebagai Notaris
                    oleh Menteri Hukum dan Hak Asasi Manusia Republik Indonesia. Kantor berlokasi
                    di Ruko Perumahan Green Garden Blok AA No.1, Karawang Barat.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Briefcase size={18} className="text-gold" />
                    <h3 className="text-xl font-semibold text-dongker">Riwayat Pendidikan & Karir</h3>
                  </div>
                  <div className="space-y-3">
                    {riwayat.map((item, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                        <span className="text-sm text-dongker/70">{item.keterangan}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Award size={18} className="text-gold" />
                    <h3 className="text-xl font-semibold text-dongker">Keanggotaan Organisasi</h3>
                  </div>
                  <ul className="space-y-2">
                    {organisasi.map((org) => (
                      <li key={org} className="flex items-center gap-2 text-sm text-dongker/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {org}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}