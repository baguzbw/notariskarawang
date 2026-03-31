"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EditLayananPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [urutan, setUrutan] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("layanan")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setNama(data.nama);
          setDeskripsi(data.deskripsi);
          setUrutan(data.urutan?.toString() || "");
        }
        setFetching(false);
      });
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase
      .from("layanan")
      .update({
        nama,
        deskripsi,
        urutan: urutan ? parseInt(urutan) : 99,
      })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/layanan");
    }
  }

  if (fetching) return <p className="text-dongker/40 text-sm">Memuat data...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/layanan"
          className="text-dongker/40 hover:text-dongker transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-semibold text-dongker">Edit Layanan</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
            Nama Layanan *
          </label>
          <input
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
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
            rows={4}
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y"
          />
        </div>

        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
            Urutan Tampil
          </label>
          <input
            type="number"
            value={urutan}
            onChange={(e) => setUrutan(e.target.value)}
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <Link href="/admin/layanan" className="btn-outline text-sm">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
