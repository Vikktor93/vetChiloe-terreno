export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string;
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: "Luna",
    numero_atencion: "A-001",
    especie: "Canino",
    edad: 4,
    diagnostico: "Control Anual",
    foto: ".assets/pets/Hannita.webp",
  },
  {
    id: 2,
    nombre: "Max",
    numero_atencion: "A-002",
    especie: "Felino",
    edad: 2,
    diagnostico: "Vacunación",
    foto: ".asset/pets/Charkicito.webp",
  },
  {
    id: 3,
    nombre: "Bella",
    numero_atencion: "A-003",
    especie: "Canino",
    edad: 5,
    diagnostico: "Chequeo Dental",
    foto: "https://example.com/bella.jpg",
  },
];
