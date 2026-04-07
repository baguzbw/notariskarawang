import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Pencil } from "lucide-react";
import DeleteProsedurButton from "./DeleteButton";

export const revalidate = 0;

export default async function AdminProsedurPage() {
  const { data: langkah } = await supabase
    .from("prosedur")
    .select("id, judul, urutan")
    .order("urutan", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-dongker">Alur Pelayanan</h1>
          <p className="text-sm text-dongker/50 mt-1">
            {langkah?.length ?? 0} langkah
          </p>
        </div>
        <Link
          href="/admin/prosedur/tambah"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <PlusCircle size={16} /> Tambah Langkah
        </Link>
      </div>

      <div className="bg-cream-light border border-cream-dark overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cream-dark bg-cream-dark/40">
              <th className="text-left px-6 py-4 font-semibold text-dongker w-16">No</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Judul Langkah</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {langkah && langkah.length > 0 ? (
              langkah.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/20"
                >
                  <td className="px-6 py-4 text-dongker/40">{item.urutan}</td>
                  <td className="px-6 py-4 text-dongker font-medium">{item.judul}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/prosedur/edit/${item.id}`}
                        className="text-dongker/50 hover:text-dongker transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteProsedurButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-dongker/30">
                  Belum ada alur pelayanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-dongker/5 border-l-4 border-gold p-4">
        <p className="text-xs text-dongker/50">
          Urutan tampil ditentukan oleh kolom <strong>No</strong>. Atur nomor urutan saat tambah atau edit langkah.
        </p>
      </div>
    </div>
  );
}
