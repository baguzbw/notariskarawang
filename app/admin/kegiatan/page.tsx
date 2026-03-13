import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Pencil } from "lucide-react";
import DeleteKegiatanButton from "./DeleteButton";

export const revalidate = 0;

export default async function AdminKegiatanPage() {
  const { data: kegiatan } = await supabase
    .from("info_kegiatan")
    .select("id, judul, tanggal_kegiatan, lokasi, published")
    .order("tanggal_kegiatan", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-dongker">Info Kegiatan</h1>
          <p className="font-sans text-sm text-dongker/50 mt-1">
            {kegiatan?.length ?? 0} kegiatan
          </p>
        </div>
        <Link href="/admin/kegiatan/tambah" className="btn-primary inline-flex items-center gap-2 text-sm">
          <PlusCircle size={16} /> Tambah Kegiatan
        </Link>
      </div>

      <div className="bg-cream-light border border-cream-dark overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-cream-dark bg-cream-dark/40">
              <th className="text-left px-6 py-4 font-semibold text-dongker">Judul</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker hidden md:table-cell">Tanggal</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker hidden md:table-cell">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {kegiatan && kegiatan.length > 0 ? (
              kegiatan.map((k) => (
                <tr key={k.id} className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/20">
                  <td className="px-6 py-4 text-dongker font-medium">{k.judul}</td>
                  <td className="px-6 py-4 text-dongker/50 hidden md:table-cell">
                    {k.tanggal_kegiatan
                      ? new Date(k.tanggal_kegiatan).toLocaleDateString("id-ID")
                      : "—"}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium ${
                      k.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {k.published ? "Dipublikasikan" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/admin/kegiatan/edit/${k.id}`} className="text-dongker/50 hover:text-dongker transition-colors">
                        <Pencil size={15} />
                      </Link>
                      <DeleteKegiatanButton id={k.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-dongker/30">
                  Belum ada kegiatan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
