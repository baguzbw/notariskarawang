import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Pencil } from "lucide-react";
import DeletePersyaratanButton from "./DeleteButton";

export const revalidate = 0;

export default async function AdminPersyaratanPage() {
  const { data: groups } = await supabase
    .from("persyaratan")
    .select("id, nama_layanan, urutan, persyaratan_item(id)")
    .order("urutan", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-dongker">Persyaratan</h1>
          <p className="text-sm text-dongker/50 mt-1">
            {groups?.length ?? 0} kategori layanan
          </p>
        </div>
        <Link
          href="/admin/persyaratan/tambah"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <PlusCircle size={16} /> Tambah Kategori
        </Link>
      </div>

      <div className="bg-cream-light border border-cream-dark overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cream-dark bg-cream-dark/40">
              <th className="text-left px-6 py-4 font-semibold text-dongker w-16">No</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Nama Layanan</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker hidden md:table-cell">
                Jumlah Syarat
              </th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {groups && groups.length > 0 ? (
              groups.map((g) => (
                <tr
                  key={g.id}
                  className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/20"
                >
                  <td className="px-6 py-4 text-dongker/40">{g.urutan}</td>
                  <td className="px-6 py-4 text-dongker font-medium">{g.nama_layanan}</td>
                  <td className="px-6 py-4 text-dongker/50 hidden md:table-cell">
                    {g.persyaratan_item?.length ?? 0} item
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/persyaratan/edit/${g.id}`}
                        className="text-dongker/50 hover:text-dongker transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeletePersyaratanButton id={g.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-dongker/30">
                  Belum ada persyaratan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
