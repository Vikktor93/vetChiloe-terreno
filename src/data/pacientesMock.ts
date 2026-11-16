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
    especie: "Felino",
    edad: 4,
    diagnostico: "Control Anual",
    foto: "https://res.cloudinary.com/shwf6ab7/image/upload/v1794412354/cat.jpg",
  },
  {
    id: 2,
    nombre: "Max",
    numero_atencion: "A-002",
    especie: "Felino",
    edad: 2,
    diagnostico: "Vacunación",
    foto: "https://res.cloudinary.com/shwf6ab7/image/upload/v1794412357/cat3.jpg",
  },
  {
    id: 3,
    nombre: "Bella",
    numero_atencion: "A-003",
    especie: "Aviar",
    edad: 2,
    diagnostico: "Chequeo Dental",
    foto: "https://res.cloudinary.com/shwf6ab7/image/upload/v1794412353/loro.jpg",
  },
];
