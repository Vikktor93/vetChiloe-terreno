import { ImageSourcePropType } from "react-native";

export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: ImageSourcePropType; // imagen guardada en assets/pacientes
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: "Poi",
    numero_atencion: "A-001",
    especie: "Pingüino de Humboldt",
    edad: 3,
    diagnostico: "Control anual",
    foto: require("@/assets/pacientes/poi.jpg"),
  },
  {
    id: 2,
    nombre: "Abeguin",
    numero_atencion: "A-002",
    especie: "Pingüino Adelia",
    edad: 5,
    diagnostico: "Revisión de plumaje",
    foto: require("@/assets/pacientes/abeguin.jpg"),
  },
  {
    id: 3,
    nombre: "Raneguin",
    numero_atencion: "A-003",
    especie: "Pingüino Barbijo",
    edad: 2,
    diagnostico: "Herida en la aleta",
    foto: require("@/assets/pacientes/raneguin.jpg"),
  },
  {
    id: 4,
    nombre: "Scott",
    numero_atencion: "A-004",
    especie: "Pingüino Emperador",
    edad: 6,
    diagnostico: "Vacunación",
    foto: require("@/assets/pacientes/scott.jpg"),
  },
  {
    id: 5,
    nombre: "Michi",
    numero_atencion: "A-005",
    especie: "Gato",
    edad: 4,
    diagnostico: "Control dental",
    foto: require("@/assets/pacientes/michi.jpg"),
  },
];
