import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dongker flex flex-col relative overflow-hidden">
      {/* hatching bg */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "repeating-linear-gradient(45deg, #C9A84C 0, #C9A84C 1px, transparent 0, transparent 50%)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* minimal header */}
      <header className="relative z-10 px-8 py-6 border-b border-dongker-light/30">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-gold flex items-center justify-center">
            <span className="text-gold font-bold text-sm">N</span>
          </div>
        </Link>
      </header>

      {/* main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[clamp(7rem,20vw,14rem)] font-bold leading-none text-dongker-light/30 select-none tracking-tighter">404</p>

          <div className="relative -mt-12 mx-auto max-w-sm border border-dongker-light/40 bg-dongker-dark/80 px-10 py-10">
            <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gold" />
            <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gold" />
            <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gold" />
            <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gold" />

            <div className="w-8 h-0.5 bg-gold mx-auto mb-6" />

            <h1 className="text-xl font-semibold text-cream mb-3 leading-snug">Halaman tidak ditemukan</h1>
            <p className="text-sm text-cream/40 leading-relaxed mb-8">Halaman yang Anda cari tidak tersedia atau telah dipindahkan.</p>

            <Link href="/" className="inline-flex items-center gap-2 border border-gold/50 text-gold text-sm px-6 py-2.5 hover:bg-gold hover:text-dongker-dark transition-colors duration-200">
              <ArrowLeft size={14} />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      {/* minimal footer */}
      <footer className="relative z-10 px-8 py-4 border-t border-dongker-light/20 text-center">
        <p className="text-xs text-cream/20">© {new Date().getFullYear()} Kantor Notaris & PPAT Norman Tuah H. Sinaga</p>
      </footer>
    </div>
  );
}
