"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

export default function EditKegiatanPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [gambarUrl, setGambarUrl] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.from("info_kegiatan").select("*").eq("id", id).single().then(({ data }) => {
      if (data) {
        setJudul(data.judul);
        setDeskripsi(data.deskripsi);
        setGambarUrl(data.gambar_url || "");
        setTanggal(data.tanggal_kegiatan || "");
        setLokasi(data.lokasi || "");
      }
      setFetching(false);
    });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.from("info_kegiatan")
      .update({ judul, deskripsi, gambar_url: gambarUrl, tanggal_kegiatan: tanggal || null, lokasi, updated_at: new Date().toISOString() })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/kegiatan");
    }
  }

  if (fetching) return <p className="text-dongker/40 text-sm">Memuat data...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/kegiatan" className="text-dongker/40 hover:text-dongker transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-semibold text-dongker">Edit Kegiatan</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Judul *</label>
          <input value={judul} onChange={(e) => setJudul(e.target.value)} required
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors" />
        </div>

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Deskripsi *</label>
          <textarea value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} required rows={6}
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y" />
        </div>

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Gambar</label>
          <ImageUpload value={gambarUrl} onChange={setGambarUrl} folder="kegiatan" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Tanggal Kegiatan</label>
            <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)}
              className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors" />
          </div>
          <div>
            <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Lokasi</label>
            <input value={lokasi} onChange={(e) => setLokasi(e.target.value)}
              className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors" />
          </div>
        </div>

        <div className="flex gap-4">
          <button type="submit" disabled={loading} className="btn-primary text-sm disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <Link href="/admin/kegiatan" className="btn-outline text-sm">Batal</Link>
        </div>
      </form>
    </div>
  );
}