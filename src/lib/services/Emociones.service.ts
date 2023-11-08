import { supabase } from "$lib/supabaseClient";
import type { Emocion } from "$lib/types";

export class EmocionesService {
  static async getAllEmociones() {
    const { data, error } = await supabase
      .from("emociones")
      .select("*");
    
    if (error) {
      throw error;
    }

    return data as Emocion[];
  }
}