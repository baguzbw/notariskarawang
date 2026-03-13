import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";
import DeleteArtikelButton from "./DeleteButton";

export const revalidate = 0;

export default async function AdminArtikelPage() {
  const { data: artikels } = await supabase
    .from("artikel_hukum")
    .select("id, judul, kategori, published, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-dongker">Artikel Hukum</h1>
          <p className="font-sans text-sm text-dongker/50 mt-1">
            {artikels?.length ?? 0} artikel
          </p>
        </div>
        <Link href="/admin/artikel/tambah" className="btn-primary inline-flex items-center gap-2 text-sm">
          <PlusCircle size={16} /> Tambah Artikel
        </Link>
      </div>

      <div className="bg-cream-light border border-cream-dark overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead>
            <tr className="border-b border-cream-dark bg-cream-dark/40">
              <th className="text-left px-6 py-4 font-semibold text-dongker">Judul</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker hidden md:table-cell">Kategori</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker hidden md:table-cell">Status</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {artikels && artikels.length > 0 ? (
              artikels.map((a) => (
                <tr key={a.id} className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/20">
                  <td className="px-6 py-4 text-dongker font-medium line-clamp-2">
                    {a.judul}
                  </td>
                  <td className="px-6 py-4 text-dongker/50 hidden md:table-cell">
                    {a.kategori || "—"}
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`inline-block px-2 py-0.5 text-xs font-medium ${
                      a.published
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {a.published ? "Dipublikasikan" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/artikel/edit/${a.id}`}
                        className="text-dongker/50 hover:text-dongker transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteArtikelButton id={a.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-dongker/30">
                  Belum ada artikel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
