"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim() + "-" + Date.now();
}

export default function TambahArtikelPage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [konten, setKonten] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const slug = slugify(judul);

    const { error } = await supabase.from("artikel_hukum").insert([{
      judul,
      slug,
      konten,
      thumbnail_url: thumbnailUrl,
      published: true,
    }]);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/artikel");
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/artikel" className="text-dongker/40 hover:text-dongker transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="font-serif text-3xl font-semibold text-dongker">Tambah Artikel</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="font-sans text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label className="font-sans text-xs text-dongker/50 tracking-wider uppercase block mb-2">Judul *</label>
          <input
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            className="w-full border border-cream-dark bg-cream-light text-dongker font-sans text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
          />
        </div>

        <div>
          <label className="font-sans text-xs text-dongker/50 tracking-wider uppercase block mb-2">Gambar Thumbnail</label>
          <ImageUpload value={thumbnailUrl} onChange={setThumbnailUrl} folder="artikel" />
        </div>

        <div>
          <label className="font-sans text-xs text-dongker/50 tracking-wider uppercase block mb-2">Isi Artikel *</label>
          <textarea
            value={konten}
            onChange={(e) => setKonten(e.target.value)}
            required
            rows={16}
            placeholder="Tulis isi artikel di sini. Tekan Enter untuk paragraf baru."
            className="w-full border border-cream-dark bg-cream-light text-dongker font-sans text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y"
          />
          <p className="font-sans text-xs text-dongker/30 mt-1">Enter = paragraf baru di halaman publik.</p>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary text-sm disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan & Publikasikan"}
          </button>
          <Link href="/admin/artikel" className="btn-outline text-sm">Batal</Link>
        </div>
      </form>
    </div>
  );
}
