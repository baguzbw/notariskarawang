"use client";

import { supabase } from "@/lib/supabase";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteKegiatanButton({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Hapus kegiatan ini?")) return;
    await supabase.from("info_kegiatan").delete().eq("id", id);
    router.refresh();
  }

  return (
    <button onClick={handleDelete} className="text-red-400/60 hover:text-red-500 transition-colors">
      <Trash2 size={15} />
    </button>
  );
}
