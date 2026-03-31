import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { PlusCircle, Pencil } from "lucide-react";
import DeleteLayananButton from "./DeleteButton";

export const revalidate = 0;

export default async function AdminLayananPage() {
  const { data: layanan } = await supabase
    .from("layanan")
    .select("id, nama, urutan")
    .order("urutan", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-dongker">Layanan</h1>
          <p className="text-sm text-dongker/50 mt-1">
            {layanan?.length ?? 0} layanan
          </p>
        </div>
        <Link
          href="/admin/layanan/tambah"
          className="btn-primary inline-flex items-center gap-2 text-sm"
        >
          <PlusCircle size={16} /> Tambah Layanan
        </Link>
      </div>

      <div className="bg-cream-light border border-cream-dark overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-cream-dark bg-cream-dark/40">
              <th className="text-left px-6 py-4 font-semibold text-dongker w-16">No</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Nama Layanan</th>
              <th className="text-left px-6 py-4 font-semibold text-dongker">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {layanan && layanan.length > 0 ? (
              layanan.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-cream-dark last:border-0 hover:bg-cream-dark/20"
                >
                  <td className="px-6 py-4 text-dongker/40 text-sm">{item.urutan}</td>
                  <td className="px-6 py-4 text-dongker font-medium">{item.nama}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/layanan/edit/${item.id}`}
                        className="text-dongker/50 hover:text-dongker transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteLayananButton id={item.id} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-dongker/30">
                  Belum ada layanan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
