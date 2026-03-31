import { supabase } from "./supabase";

export type ProfilKantor = {
  id: string;
  nama_notaris: string;
  gelar: string;
  foto_url: string | null;
  latar_belakang: string;
  riwayat: string;
  alamat: string;
  telepon: string;
  hp: string;
  email: string;
  jam_operasional: string;
  gmaps_embed: string | null;
};

export async function getProfilKantor(): Promise<ProfilKantor | null> {
  const { data } = await supabase
    .from("profil_kantor")
    .select("*")
    .single();
  return data;
}
