import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProfilKantor } from "@/lib/profil";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";

export const revalidate = 3600;

export default async function ProfilKantorPage() {
  const profil = await getProfilKantor();

  const alamat = profil?.alamat ?? "Ruko Perumahan Green Garden Blok AA No.1, Kel. Nagasari, Kec. Karawang Barat, Kab. Karawang";
  const telepon = profil?.telepon ?? "(0267) 8634232";
  const hp = profil?.hp ?? "0812 9151 9609";
  const email = profil?.email ?? "normantuahhsinaga@yahoo.co.id";
  const jam = profil?.jam_operasional ?? "Senin – Jumat: 08.00 – 16.00 WIB";
  const gmaps = profil?.gmaps_embed ?? null;
  const nama = profil?.nama_notaris ?? "Norman Tuah Hamonangan Sinaga";

  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">Tentang Kantor</p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">Profil Kantor</h1>
            <div className="w-16 h-0.5 bg-gold" />
          </div>
        </section>

        <section className="bg-cream py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Building2 size={18} className="text-gold" />
                    <h2 className="text-2xl font-semibold text-dongker">Tentang Kantor</h2>
                  </div>
                  <p className="text-dongker/70 leading-relaxed mb-4">
                    Kantor Notaris & PPAT {nama} melayani berbagai kebutuhan
                    kenotariatan dan pertanahan masyarakat dengan standar profesional
                    tinggi, menjunjung nilai kejujuran, keakuratan, dan transparansi
                    dalam setiap pelayanan.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-dongker mb-4">Informasi Kontak</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-dongker">Alamat</p>
                        <p className="text-sm text-dongker/60">{alamat}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-dongker">Telepon / HP</p>
                        <p className="text-sm text-dongker/60">{telepon}</p>
                        <p className="text-sm text-dongker/60">{hp}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-dongker">Email</p>
                        <p className="text-sm text-dongker/60">{email}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-dongker">Jam Operasional</p>
                        <p className="text-sm text-dongker/60">{jam}</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-dongker mb-4">Lokasi Kantor</h3>
                <div className="w-full aspect-video border border-cream-dark overflow-hidden">
                  {gmaps ? (
                    <iframe
                      src={gmaps}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Lokasi Kantor Notaris"
                    />
                  ) : (
                    <div className="w-full h-full bg-dongker/10 flex items-center justify-center">
                      <p className="text-sm text-dongker/30">Peta belum dikonfigurasi</p>
                    </div>
                  )}
                </div>
                <p className="text-xs text-dongker/40 mt-2">{alamat}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
