import { Paciente } from '@/data/pacientesMock';

// Capa de servicios: las pantallas no saben de URLs ni de fetch.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function pedir<T>(ruta: string): Promise<T> {
  if (!API_URL) {
    throw new Error('Falta EXPO_PUBLIC_API_URL en el archivo .env');
  }
  const respuesta = await fetch(`${API_URL}${ruta}`);
  // fetch NO lanza error con 404/500: hay que revisar respuesta.ok
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} en ${ruta}`);
  }
  return respuesta.json() as Promise<T>;
}

export const obtenerPacientes = () => pedir<Paciente[]>('/api/pacientes');

export const obtenerPaciente = (id: string) => pedir<Paciente>(`/api/pacientes/${id}`);
