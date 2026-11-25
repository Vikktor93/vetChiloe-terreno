import { Paciente } from "@/data/pacientesMock";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function pedir<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} en ${ruta}`);
  }
  return respuesta.json() as Promise<T>;
}

export const obtenerPacientes = () => pedir<Paciente[]>("/api/pacientes");

export const obtenerPaciente = (id: string) =>
  pedir<Paciente>(`/api/pacientes/${id}`);
