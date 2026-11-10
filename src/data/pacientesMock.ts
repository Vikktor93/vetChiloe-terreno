export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string; // URL de la imagen
};
export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: "Luna",
    numero_atencion: "A-001",
    especie: "Canino",
    edad: 4,
    diagnostico: "Control anual",
    foto: "https://…",
  },
  // + 2 pacientes más, copiados de pacientesMock.js (web)
];
