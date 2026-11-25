import { Paciente } from '@/data/pacientesMock';
import { ErrorApi } from '@/services/errores';

// Capa de servicios: las pantallas no saben de URLs ni de fetch.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Render (plan gratis) puede tardar ~50 s en despertar: esperamos hasta 60 s.
const TIEMPO_MAXIMO = 60_000;

/**
 * Modo demostración (para capturas y pruebas): en .env pon
 *   EXPO_PUBLIC_SIMULAR=servidor | sin-conexion | tiempo | vacio | lento
 * y reinicia con `npx expo start -c`. Déjalo vacío para usar la API real.
 */
const SIMULAR = process.env.EXPO_PUBLIC_SIMULAR?.trim() ?? '';

const esperar = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function simular<T>(ruta: string): Promise<T | undefined> {
  if (!SIMULAR) return undefined;
  await esperar(1200); // que se alcance a ver la carga
  switch (SIMULAR) {
    case 'servidor':
      throw new ErrorApi('servidor', `Error 500 en ${ruta} (simulado)`, 500);
    case 'sin-conexion':
      throw new ErrorApi('sin-conexion', 'Network request failed (simulado)');
    case 'tiempo':
      throw new ErrorApi('tiempo', `Sin respuesta en ${TIEMPO_MAXIMO / 1000} s (simulado)`);
    case 'vacio':
      if (ruta === '/api/pacientes') return [] as T;
      throw new ErrorApi('no-encontrado', `Error 404 en ${ruta} (simulado)`, 404);
    case 'lento':
      await esperar(4000);
      return undefined; // después sigue con la API real
    default:
      return undefined;
  }
}

async function pedir<T>(ruta: string): Promise<T> {
  const simulado = await simular<T>(ruta);
  if (simulado !== undefined) return simulado;

  if (!API_URL) {
    throw new ErrorApi('configuracion', 'Falta EXPO_PUBLIC_API_URL en el archivo .env');
  }

  const control = new AbortController();
  const temporizador = setTimeout(() => control.abort(), TIEMPO_MAXIMO);

  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, { signal: control.signal });
  } catch (e) {
    // fetch solo lanza error cuando NO hubo respuesta: sin red, DNS, servidor caído...
    if (control.signal.aborted) {
      throw new ErrorApi('tiempo', `Sin respuesta en ${TIEMPO_MAXIMO / 1000} s (${ruta})`);
    }
    throw new ErrorApi('sin-conexion', e instanceof Error ? e.message : 'Network request failed');
  } finally {
    clearTimeout(temporizador);
  }

  // fetch NO lanza error con 404/500: hay que revisar respuesta.ok
  if (!respuesta.ok) {
    const tipo = respuesta.status === 404 ? 'no-encontrado' : respuesta.status >= 500 ? 'servidor' : 'desconocido';
    throw new ErrorApi(tipo, `Error ${respuesta.status} en ${ruta}`, respuesta.status);
  }

  try {
    return (await respuesta.json()) as T;
  } catch {
    throw new ErrorApi('respuesta', `La respuesta de ${ruta} no es JSON válido`);
  }
}

export const obtenerPacientes = () => pedir<Paciente[]>('/api/pacientes');

// GET /api/pacientes/:id
// Respaldo: si la API todavía no tiene la ruta por id (responde 404),
// se busca el paciente en la lista completa.
export async function obtenerPaciente(id: string): Promise<Paciente> {
  try {
    return await pedir<Paciente>(`/api/pacientes/${id}`);
  } catch (e) {
    if (!(e instanceof ErrorApi) || e.tipo !== 'no-encontrado') throw e;
    const paciente = (await obtenerPacientes()).find((p) => p.id.toString() === id);
    if (!paciente) throw new ErrorApi('no-encontrado', `No existe un paciente con id ${id}`, 404);
    return paciente;
  }
}
