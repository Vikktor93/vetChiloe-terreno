// tipo del paciente, igual a lo que entrega la api
export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string | null; // la api entrega una ruta o null
};
