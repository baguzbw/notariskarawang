"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";
import { Save, Loader2 } from "lucide-react";

export default function DataKantorPage() {
  const [form, setForm] = useState({
    nama_notaris: "",
    gelar: "",
    foto_url: "",
    latar_belakang: "",
    riwayat: "",
    alamat: "",
    telepon: "",
    hp: "",
    email: "",
    jam_operasional: "",
    gmaps_embed: "",
  });
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase
      .from("profil_kantor")
      .select("*")
      .single()
      .then(({ data }) => {
        if (data) {
          setId(data.id);
          setForm({
            nama_notaris: data.nama_notaris || "",
            gelar: data.gelar || "",
            foto_url: data.foto_url || "",
            latar_belakang: data.latar_belakang || "",
            riwayat: data.riwayat || "",
            alamat: data.alamat || "",
            telepon: data.telepon || "",
            hp: data.hp || "",
            email: data.email || "",
            jam_operasional: data.jam_operasional || "",
            gmaps_embed: data.gmaps_embed || "",
          });
        }
        setFetching(false);
      });
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const payload = { ...form, updated_at: new Date().toISOString() };

    const { error } = id
      ? await supabase.from("profil_kantor").update(payload).eq("id", id)
      : await supabase.from("profil_kantor").insert([payload]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="flex items-center gap-2 text-dongker/40">
        <Loader2 size={16} className="animate-spin" />
        <span className="text-sm">Memuat data...</span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-dongker">Data Kantor</h1>
        <p className="text-sm text-dongker/50 mt-1">
          Perubahan akan otomatis tampil di seluruh halaman website.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
        {error && (
          <div className="bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-700">Data berhasil disimpan.</p>
          </div>
        )}

        {/* ── PROFIL NOTARIS ── */}
        <div>
          <p className="text-xs text-gold tracking-[0.2em] uppercase mb-5 font-medium">
            Profil Notaris
          </p>
          <div className="space-y-5">
            <div>
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                Foto Notaris
              </label>
              <ImageUpload
                value={form.foto_url}
                onChange={(url) => setForm((p) => ({ ...p, foto_url: url }))}
                folder="profil"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                  Nama Notaris *
                </label>
                <input
                  name="nama_notaris"
                  value={form.nama_notaris}
                  onChange={handleChange}
                  required
                  className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                  Gelar
                </label>
                <input
                  name="gelar"
                  value={form.gelar}
                  onChange={handleChange}
                  placeholder="cth: Shut., S.H., M.Kn."
                  className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                Latar Belakang
              </label>
              <textarea
                name="latar_belakang"
                value={form.latar_belakang}
                onChange={handleChange}
                rows={5}
                className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y"
              />
            </div>

            <div>
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                Riwayat Pendidikan & Karir
              </label>
              <textarea
                name="riwayat"
                value={form.riwayat}
                onChange={handleChange}
                rows={5}
                placeholder="Tulis satu riwayat per baris"
                className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y"
              />
              <p className="text-xs text-dongker/30 mt-1">
                Satu baris = satu item riwayat.
              </p>
            </div>
          </div>
        </div>

        <div className="h-px bg-cream-dark" />

        {/* ── INFO KANTOR ── */}
        <div>
          <p className="text-xs text-gold tracking-[0.2em] uppercase mb-5 font-medium">
            Informasi Kantor
          </p>
          <div className="space-y-5">
            <div>
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                Alamat Kantor
              </label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                rows={3}
                className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                  Telepon
                </label>
                <input
                  name="telepon"
                  value={form.telepon}
                  onChange={handleChange}
                  placeholder="cth: (0267) 8634232"
                  className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                  HP / WhatsApp
                </label>
                <input
                  name="hp"
                  value={form.hp}
                  onChange={handleChange}
                  placeholder="cth: 0812 9151 9609"
                  className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                  Jam Operasional
                </label>
                <input
                  name="jam_operasional"
                  value={form.jam_operasional}
                  onChange={handleChange}
                  placeholder="cth: Senin – Jumat: 08.00 – 16.00 WIB"
                  className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">
                URL Google Maps (iframe src)
              </label>
              <textarea
                name="gmaps_embed"
                value={form.gmaps_embed}
                onChange={handleChange}
                rows={3}
                placeholder="Paste URL dari Google Maps → Share → Embed → salin bagian src='...' saja"
                className="w-full border border-cream-dark bg-cream-light text-dongker text-sm px-4 py-3 focus:outline-none focus:border-dongker transition-colors resize-y font-mono text-xs"
              />
              <p className="text-xs text-dongker/30 mt-1">
                Buka Google Maps → Share → Embed a map → copy hanya URL di dalam src=&quot;...&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 btn-primary disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {loading ? "Menyimpan..." : "Simpan Semua Perubahan"}
        </button>
      </form>
    </div>
  );
}
