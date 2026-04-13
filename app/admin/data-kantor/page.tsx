"use client";

import ImageUpload from "@/components/ImageUpload";
import { supabase } from "@/lib/supabase";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const payload = { ...form, updated_at: new Date().toISOString() };

    const { error } = id ? await supabase.from("profil_kantor").update(payload).eq("id", id) : await supabase.from("profil_kantor").insert([payload]);

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
    <div className="h-full flex flex-col gap-4">
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-dongker">Data Kantor</h1>
          <p className="text-xs text-dongker/50 mt-0.5">Perubahan otomatis tampil di seluruh halaman website.</p>
        </div>
        <div className="flex items-center gap-3">
          {success && <span className="text-xs text-green-700 bg-green-50 border border-green-200 px-3 py-1.5">Data berhasil disimpan.</span>}
          {error && <span className="text-xs text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 max-w-xs truncate">{error}</span>}
          <button type="submit" form="data-kantor-form" disabled={loading} className="inline-flex items-center gap-2 btn-primary text-sm disabled:opacity-50">
            {loading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {loading ? "Menyimpan..." : "Simpan Semua"}
          </button>
        </div>
      </div>

      {/* ── FORM ── */}
      <form id="data-kantor-form" onSubmit={handleSubmit} className="flex-1 min-h-0 grid grid-cols-[2fr_3fr] gap-5">
        {/* ── KOLOM KIRI: Profil Notaris ── */}
        <div className="bg-cream-light border border-cream-dark flex flex-col min-h-0">
          <div className="px-5 py-3 border-b border-cream-dark shrink-0">
            <p className="text-[9px] text-gold tracking-[0.2em] uppercase font-medium">Profil Notaris</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4 p-5 overflow-hidden">
            {/* Foto — natural size, full width */}
            <div className="shrink-0">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Foto Notaris</label>
              <ImageUpload value={form.foto_url} onChange={(url) => setForm((p) => ({ ...p, foto_url: url }))} folder="profil" />
            </div>

            {/* Nama */}
            <div className="shrink-0">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Nama Notaris *</label>
              <input
                name="nama_notaris"
                value={form.nama_notaris}
                onChange={handleChange}
                required
                className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors"
              />
            </div>

            {/* Gelar */}
            <div className="shrink-0">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Gelar</label>
              <input
                name="gelar"
                value={form.gelar}
                onChange={handleChange}
                placeholder="cth: Shut., S.H., M.Kn."
                className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors"
              />
            </div>

            {/* Latar Belakang */}
            <div className="flex-1 min-h-0 flex flex-col">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2 shrink-0">Latar Belakang</label>
              <textarea
                name="latar_belakang"
                value={form.latar_belakang}
                onChange={handleChange}
                className="flex-1 min-h-0 w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors resize-none"
              />
            </div>

            {/* Riwayat */}
            <div className="flex-1 min-h-0 flex flex-col">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2 shrink-0">
                Riwayat Pendidikan & Karir
                <span className="ml-1.5 text-dongker/30 normal-case font-normal">(satu baris = satu item)</span>
              </label>
              <textarea
                name="riwayat"
                value={form.riwayat}
                onChange={handleChange}
                placeholder="Tulis satu riwayat per baris"
                className="flex-1 min-h-0 w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors resize-none"
              />
            </div>
          </div>
        </div>

        {/* ── KOLOM KANAN: Info Kantor ── */}
        <div className="bg-cream-light border border-cream-dark flex flex-col min-h-0">
          <div className="px-5 py-3 border-b border-cream-dark shrink-0">
            <p className="text-[9px] text-gold tracking-[0.2em] uppercase font-medium">Informasi Kantor</p>
          </div>

          <div className="flex-1 min-h-0 flex flex-col gap-4 p-5 overflow-hidden">
            {/* Alamat */}
            <div className="shrink-0">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Alamat Kantor</label>
              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                rows={3}
                className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors resize-none"
              />
            </div>

            {/* Telepon + HP */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Telepon</label>
                <input
                  name="telepon"
                  value={form.telepon}
                  onChange={handleChange}
                  placeholder="cth: (0267) 8634232"
                  className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">HP / WhatsApp</label>
                <input
                  name="hp"
                  value={form.hp}
                  onChange={handleChange}
                  placeholder="cth: 0812 9151 9609"
                  className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
            </div>

            {/* Email + Jam */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Email</label>
                <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors" />
              </div>
              <div>
                <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2">Jam Operasional</label>
                <input
                  name="jam_operasional"
                  value={form.jam_operasional}
                  onChange={handleChange}
                  placeholder="cth: Senin – Jumat: 08.00 – 16.00"
                  className="w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors"
                />
              </div>
            </div>

            {/* GMaps */}
            <div className="flex-1 min-h-0 flex flex-col">
              <label className="text-xs text-dongker/50 tracking-wider uppercase block mb-2 shrink-0">
                URL Google Maps
                <span className="ml-1.5 text-dongker/30 normal-case font-normal">(iframe src)</span>
              </label>
              <textarea
                name="gmaps_embed"
                value={form.gmaps_embed}
                onChange={handleChange}
                placeholder="Paste URL dari Google Maps → Share → Embed → salin bagian src='...' saja"
                className="flex-1 min-h-0 w-full border border-cream-dark bg-cream text-dongker text-sm px-4 py-2.5 focus:outline-none focus:border-dongker transition-colors resize-none font-mono text-xs"
              />
              <p className="text-[10px] text-dongker/30 mt-1.5 shrink-0">Google Maps → Share → Embed a map → copy URL di dalam src=&quot;...&quot;</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
