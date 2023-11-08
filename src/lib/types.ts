export type Emocion = {
  id: number;
  created_at: string;
  nombre: string;
}

export type Cita = {
  id: number;
  created_at: string;
  fecha: Date;
  usuario: number;
  doctor: number;
  motivo: string;
  emociones: string;
};