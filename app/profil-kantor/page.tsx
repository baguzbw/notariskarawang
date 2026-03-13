import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";

export default function ProfilKantorPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-dongker text-cream py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="font-sans text-gold text-xs tracking-[0.2em] uppercase mb-3">Tentang Kantor</p>
            <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Profil Kantor</h1>
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
                    <h2 className="font-serif text-2xl font-semibold text-dongker">Tentang Kantor</h2>
                  </div>
                  <p className="font-sans text-dongker/70 leading-relaxed mb-4">
                    Kantor Notaris & PPAT Norman Tuah Hamonangan Sinaga, Shut, SH, M.Kn berlokasi
                    di Ruko Perumahan Green Garden Blok AA No.1, Kelurahan Nagasari, Kecamatan
                    Karawang Barat, Kabupaten Karawang.
                  </p>
                  <p className="font-sans text-dongker/70 leading-relaxed">
                    Kantor kami melayani berbagai kebutuhan kenotariatan dan pertanahan masyarakat
                    dengan standar profesional tinggi, menjunjung nilai kejujuran, keakuratan, dan
                    transparansi dalam setiap pelayanan.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-semibold text-dongker mb-4">Informasi Kontak</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <MapPin size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-medium text-dongker">Alamat</p>
                        <p className="font-sans text-sm text-dongker/60">
                          Ruko Perumahan Green Garden Blok AA No.1,<br />
                          Kel. Nagasari, Kec. Karawang Barat,<br />
                          Kab. Karawang
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-medium text-dongker">Telepon / HP</p>
                        <p className="font-sans text-sm text-dongker/60">(0267) 8634232</p>
                        <p className="font-sans text-sm text-dongker/60">0812 9151 9609</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-medium text-dongker">Email</p>
                        <p className="font-sans text-sm text-dongker/60">normantuahhsinaga@yahoo.com</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock size={18} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-medium text-dongker">Jam Operasional</p>
                        <p className="font-sans text-sm text-dongker/60">Senin – Jumat: 08.00 – 16.00 WIB</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl font-semibold text-dongker mb-4">Lokasi Kantor</h3>
                <div className="w-full aspect-video border border-cream-dark overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0!2d107.3!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwN8KwMTgnMDAuMCJF!5e0!3m2!1sid!2sid!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Lokasi Kantor Notaris"
                  />
                </div>
                <p className="font-sans text-xs text-dongker/40 mt-2">
                  Ruko Perumahan Green Garden Blok AA No.1, Karawang Barat
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
