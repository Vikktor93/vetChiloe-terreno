import { Paciente } from '@/data/pacientesMock';

// Capa de servicios: las pantallas no saben de URLs ni de fetch.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

class ErrorApi extends Error {
  constructor(public status: number, ruta: string) {
    super(`Error ${status} en ${ruta}`);
  }
}

async function pedir<T>(ruta: string): Promise<T> {
  if (!API_URL) {
    throw new Error('Falta EXPO_PUBLIC_API_URL en el archivo .env');
  }
  const respuesta = await fetch(`${API_URL}${ruta}`);
  // fetch NO lanza error con 404/500: hay que revisar respuesta.ok
  if (!respuesta.ok) {
    throw new ErrorApi(respuesta.status, ruta);
  }
  return respuesta.json() as Promise<T>;
}

export const obtenerPacientes = () => pedir<Paciente[]>('/api/pacientes');

// GET /api/pacientes/:id
// Respaldo: si la API todavía no tiene la ruta por id (responde 404),
// se busca el paciente en la lista completa.
export async function obtenerPaciente(id: string): Promise<Paciente> {
  try {
    return await pedir<Paciente>(`/api/pacientes/${id}`);
  } catch (e) {
    if (!(e instanceof ErrorApi) || e.status !== 404) throw e;
    const paciente = (await obtenerPacientes()).find((p) => p.id.toString() === id);
    if (!paciente) throw new Error('Paciente no encontrado');
    return paciente;
  }
}
