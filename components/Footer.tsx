import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getProfilKantor } from "@/lib/profil";

export default async function Footer() {
  const profil = await getProfilKantor();

  const alamat = profil?.alamat ?? "Ruko Perumahan Green Garden Blok AA No.1, Kel. Nagasari, Kec. Karawang Barat, Kab. Karawang";
  const telepon = profil?.telepon ?? "(0267) 8634232";
  const hp = profil?.hp ?? "0812 9151 9609";
  const email = profil?.email ?? "normantuahhsinaga@yahoo.co.id";
  const jam = profil?.jam_operasional ?? "Senin – Jumat: 08.00 – 16.00 WIB";
  const nama = profil?.nama_notaris ?? "Norman Tuah H. Sinaga";

  return (
    <footer className="bg-dongker-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border-2 border-gold flex items-center justify-center">
                <span className="text-gold font-bold text-sm">N</span>
              </div>
              <div>
                <span className="font-semibold text-sm text-cream block leading-tight">
                  {nama}
                </span>
                <span className="text-xs text-cream/40">Notaris / PPAT</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-cream/60">
              Memberikan layanan kenotariatan yang profesional, akurat, dan terpercaya
              untuk kebutuhan hukum Anda di wilayah Karawang.
            </p>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-base">Navigasi</h4>
            <ul className="space-y-2">
              {[
                { href: "/layanan", label: "Daftar Layanan" },
                { href: "/persyaratan", label: "Persyaratan" },
                { href: "/prosedur", label: "Alur Pelayanan" },
                { href: "/artikel", label: "Artikel Hukum" },
                { href: "/kegiatan", label: "Info Kegiatan" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-cream/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-cream font-semibold mb-4 text-base">Kontak</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-cream/60">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                {alamat}
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <Phone size={16} className="shrink-0 text-gold" />
                {telepon} / {hp}
              </li>
              <li className="flex items-center gap-3 text-sm text-cream/60">
                <Mail size={16} className="shrink-0 text-gold" />
                {email}
              </li>
              <li className="flex items-start gap-3 text-sm text-cream/60">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                {jam}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-dongker-light/40 text-center">
          <p className="text-xs text-cream/30">
            © {new Date().getFullYear()} Kantor Notaris & PPAT {nama}. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
