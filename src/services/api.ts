import { Paciente } from '@/data/pacientesMock';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

async function pedir<T>(ruta: string): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`);
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} en ${ruta}`);
  }
  return respuesta.json() as Promise<T>;
}

export const obtenerPacientes = () =>
  pedir<Paciente[]>('/api/pacientes');

// La API de la web no tiene GET /api/pacientes/:id: se busca el paciente en la lista.
export async function obtenerPaciente(id: string): Promise<Paciente> {
  const paciente = (await obtenerPacientes()).find((p) => String(p.id) === id);
  if (!paciente) throw new Error('Paciente no encontrado');
  return paciente;
}
