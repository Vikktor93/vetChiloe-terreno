import { Paciente } from '@/types/paciente';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error(
    'Falta configurar EXPO_PUBLIC_API_URL en el archivo .env'
  );
}

async function solicitar<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`);

  if (!respuesta.ok) {
    throw new Error(
      `Error ${respuesta.status}: no se pudo completar la solicitud`
    );
  }

  return respuesta.json() as Promise<T>;
}

export async function obtenerPacientes(): Promise<Paciente[]> {
  return solicitar<Paciente[]>('/api/pacientes');
}

export async function obtenerPaciente(
  id: number
): Promise<Paciente> {
  return solicitar<Paciente>(`/api/pacientes/${id}`);
}
