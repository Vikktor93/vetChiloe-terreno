import type { Paciente } from "@/types/paciente";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "";

async function pedir<T>(ruta: string): Promise<T> {
  if (!API_URL) {
    throw new Error(
      "La aplicación no está configurada. Contacta al administrador.",
    );
  }

  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`);
  } catch {
    throw new Error(
      "Sin conexión. Revisa tu conexión a internet e inténtalo de nuevo.",
    );
  }

  if (!respuesta.ok) {
    throw new Error(
      "No pudimos obtener los datos. Inténtalo de nuevo en un momento.",
    );
  }

  return (await respuesta.json()) as T;
}

export function obtenerPacientes(): Promise<Paciente[]> {
  return pedir<Paciente[]>("/api/pacientes");
}

export function obtenerPaciente(id: number | string): Promise<Paciente> {
  return pedir<Paciente>(`/api/pacientes/${id}`);
}
