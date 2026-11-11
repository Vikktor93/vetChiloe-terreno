export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string; // url de la imagen
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: "Luna",
    numero_atencion: "A-001",
    especie: "Canino",
    edad: 4,
    diagnostico: "Control anual",
    foto: "https://picsum.photos/id/237/200",
  },
  {
    id: 2,
    nombre: "Toby",
    numero_atencion: "A-002",
    especie: "Canino",
    edad: 7,
    diagnostico: "Vacunación",
    foto: "https://picsum.photos/id/1025/200",
  },
  {
    id: 3,
    nombre: "Copito",
    numero_atencion: "A-003",
    especie: "Canino",
    edad: 2,
    diagnostico: "Revisión de piel",
    foto: "https://picsum.photos/id/1062/200",
  },
];
