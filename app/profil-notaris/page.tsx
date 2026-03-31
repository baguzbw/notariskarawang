import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProfilKantor } from "@/lib/profil";
import { BookOpen, Briefcase } from "lucide-react";

export const revalidate = 3600;

export default async function ProfilNotarisPage() {
  const profil = await getProfilKantor();

  const nama = profil?.nama_notaris ?? "Norman Tuah Hamonangan Sinaga";
  const gelar = profil?.gelar ?? "Shut., S.H., M.Kn.";
  const foto = profil?.foto_url ?? null;
  const latarBelakang = profil?.latar_belakang ?? "";
  const riwayatLines = profil?.riwayat
    ? profil.riwayat.split("\n").filter((l) => l.trim() !== "")
    : [];
  const telepon = profil?.telepon ?? "(0267) 8634232";
  const hp = profil?.hp ?? "0812 9151 9609";
  const email = profil?.email ?? "normantuahhsinaga@yahoo.co.id";
  const alamat = profil?.alamat ?? "";

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
              {/* Sidebar */}
              <div className="lg:col-span-1">
                {foto ? (
                  <img
                    src={foto}
                    alt={nama}
                    className="w-full aspect-[3/4] object-cover mb-6 border border-cream-dark"
                  />
                ) : (
                  <div className="bg-dongker/10 aspect-[3/4] flex items-center justify-center mb-6 border border-cream-dark">
                    <span className="text-dongker/20 text-sm">Foto Notaris</span>
                  </div>
                )}
                <h2 className="text-xl font-semibold text-dongker mb-1">{nama}</h2>
                <p className="text-sm text-gold mb-4">{gelar} — Notaris & PPAT</p>
                <div className="space-y-2 text-sm text-dongker/70">
                  <p><span className="font-medium text-dongker">Wilayah Jabatan:</span> Kabupaten Karawang</p>
                  <p><span className="font-medium text-dongker">Telepon:</span> {telepon}</p>
                  <p><span className="font-medium text-dongker">HP:</span> {hp}</p>
                  <p><span className="font-medium text-dongker">Email:</span> {email}</p>
                  {alamat && (
                    <p><span className="font-medium text-dongker">Alamat:</span> {alamat}</p>
                  )}
                </div>
              </div>

              {/* Detail */}
              <div className="lg:col-span-2 space-y-10">
                {latarBelakang && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <BookOpen size={18} className="text-gold" />
                      <h3 className="text-xl font-semibold text-dongker">Latar Belakang</h3>
                    </div>
                    <p className="text-dongker/70 leading-relaxed">{latarBelakang}</p>
                  </div>
                )}

                {riwayatLines.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Briefcase size={18} className="text-gold" />
                      <h3 className="text-xl font-semibold text-dongker">
                        Riwayat Pendidikan & Karir
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {riwayatLines.map((item, i) => (
                        <div key={i} className="flex gap-4 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0" />
                          <span className="text-sm text-dongker/70">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
