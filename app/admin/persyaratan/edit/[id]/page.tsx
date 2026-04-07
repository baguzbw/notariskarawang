"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";

type Item = { id?: string; isi: string; urutan: number };

export default function EditPersyaratanPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [namaLayanan, setNamaLayanan] = useState("");
  const [urutan, setUrutan] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("persyaratan")
      .select("*, persyaratan_item(id, isi, urutan)")
      .eq("id", id)
      .single()
      .then(({ data }) => {
        if (data) {
          setNamaLayanan(data.nama_layanan);
          setUrutan(data.urutan?.toString() || "");
          const sorted = [...(data.persyaratan_item ?? [])].sort(
            (a, b) => a.urutan - b.urutan
          );
          setItems(sorted.length > 0 ? sorted : [{ isi: "", urutan: 1 }]);
        }
        setFetching(false);
      });
  }, [id]);

  function addItem() {
    setItems((prev) => [...prev, { isi: "", urutan: prev.length + 1 }]);
  }

  function addMultiple(count: number) {
    setItems((prev) => [
      ...prev,
      ...Array(count)
        .fill(null)
        .map((_, i) => ({ isi: "", urutan: prev.length + i + 1 })),
    ]);
  }

  function removeItem(index: number) {
    const item = items[index];
    if (item.id) setDeletedIds((prev) => [...prev, item.id!]);
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function updateItem(index: number, value: string) {
    setItems((prev) =>
      prev.map((v, i) => (i === index ? { ...v, isi: value } : v))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const validItems = items.filter((v) => v.isi.trim() !== "");
    if (validItems.length === 0) {
      setError("Tambahkan minimal 1 persyaratan.");
      return;
    }

    setLoading(true);

    // Update group
    const { error: groupError } = await supabase
      .from("persyaratan")
      .update({
        nama_layanan: namaLayanan,
        urutan: urutan ? parseInt(urutan) : 99,
      })
      .eq("id", id);

    if (groupError) {
      setError(groupError.message);
      setLoading(false);
      return;
    }

    // Delete removed items
    if (deletedIds.length > 0) {
      await supabase.from("persyaratan_item").delete().in("id", deletedIds);
    }

    // Upsert all valid items
    const toUpsert = validItems.map((item, i) => ({
      ...(item.id ? { id: item.id } : {}),
      persyaratan_id: id,
      isi: item.isi.trim(),
      urutan: i + 1,
    }));

    const { error: itemError } = await supabase
      .from("persyaratan_item")
      .upsert(toUpsert);

    if (itemError) {
      setError(itemError.message);
      setLoading(false);
      return;
    }

    router.push("/admin/persyaratan");
  }

  if (fetching) return <p className="text-dongker/40 text-sm">Memuat data...</p>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/admin/persyaratan"
          className="text-dongker/40 hover:text-dongker transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-semibold text-dongker">Edit Persyaratan</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Nama Layanan */}
        <div>
          <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
            Nama Layanan *
          </label>
          <input
            value={namaLayanan}
            onChange={(e) => setNamaLayanan(e.target.value)}
            required
            className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
          />
        </div>

        {/* Urutan */}
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

        {/* Items */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs text-dongker/50 tracking-wider uppercase">
              Daftar Persyaratan ({items.length} item)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-dongker/30">Tambah:</span>
              {[1, 3, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => addMultiple(n)}
                  className="text-xs px-2 py-1 border border-cream-dark text-dongker/50 hover:border-dongker hover:text-dongker transition-colors"
                >
                  +{n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item.id ?? `new-${index}`} className="flex items-center gap-2">
                <span className="text-xs text-dongker/30 w-6 text-right shrink-0 font-mono">
                  {index + 1}.
                </span>
                <input
                  value={item.isi}
                  onChange={(e) => updateItem(index, e.target.value)}
                  placeholder={`Persyaratan ke-${index + 1}`}
                  className="flex-1 border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-400/50 hover:text-red-500 transition-colors shrink-0"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="mt-3 inline-flex items-center gap-1.5 text-xs text-dongker/40 hover:text-dongker transition-colors"
          >
            <Plus size={13} /> Tambah satu item lagi
          </button>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-sm disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <Link href="/admin/persyaratan" className="btn-outline text-sm">
            Batal
          </Link>
        </div>
      </form>
    </div>
  );
}
