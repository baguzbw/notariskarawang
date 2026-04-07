"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TambahProsedurPage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [urutan, setUrutan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.from("prosedur").insert([{
      judul,
      deskripsi,
      urutan: urutan ? parseInt(urutan) : 99,
    }]);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/prosedur");
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/prosedur"
          className="text-dongker/40 hover:text-dongker transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-semibold text-dongker">Tambah Langkah</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
            Urutan / Nomor Langkah *
          </label>
          <input
            type="number"
            value={urutan}
            onChange={(e) => setUrutan(e.target.value)}
            required
            placeholder="cth: 1, 2, 3..."
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
          />
          <p className="text-xs text-dongker/30 mt-1">
            Angka kecil tampil lebih dulu di halaman publik.
          </p>
        </div>

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
            Judul Langkah *
          </label>
          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            placeholder="cth: Konsultasi Awal"
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
            Deskripsi *
          </label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
            rows={5}
            placeholder="Jelaskan apa yang dilakukan pada langkah ini..."
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Langkah"}
          </button>
          <Link href="/admin/prosedur" className="btn-outline text-sm">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
