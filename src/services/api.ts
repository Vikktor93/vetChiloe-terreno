import type { Paciente } from '@/types/paciente';

// Las variables EXPO_PUBLIC_ quedan dentro de la app: nunca pongas claves secretas.
const API_URL = process.env.EXPO_PUBLIC_API_URL;

// Render gratis puede tardar cerca de un minuto en despertar.
const TIEMPO_MAXIMO_MS = 75_000;

export type TipoError =
  | 'sin-conexion' // no hay internet o el servidor no existe
  | 'tiempo' // el servidor no respondió a tiempo
  | 'servidor' // la API respondió 5xx (por ejemplo, la base de datos caída)
  | 'no-encontrado' // 404
  | 'configuracion'; // falta la URL en .env

export class ErrorApi extends Error {
  constructor(
    public tipo: TipoError,
    mensaje: string,
    public status?: number,
  ) {
    super(mensaje);
    this.name = 'ErrorApi';
  }
}

export function aErrorApi(e: unknown): ErrorApi {
  if (e instanceof ErrorApi) return e;
  return new ErrorApi('sin-conexion', e instanceof Error ? e.message : 'Error desconocido');
}

async function pedir<T>(ruta: string): Promise<T> {
  if (!API_URL) {
    throw new ErrorApi('configuracion', 'Falta EXPO_PUBLIC_API_URL en el archivo .env');
  }

  const controlador = new AbortController();
  const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO_MS);

  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, { signal: controlador.signal });
  } catch (e) {
    if (controlador.signal.aborted) {
      throw new ErrorApi('tiempo', 'El servidor tardó demasiado en responder.');
    }
    throw new ErrorApi(
      'sin-conexion',
      e instanceof Error ? e.message : 'No se pudo conectar con el servidor.',
    );
  } finally {
    clearTimeout(temporizador);
  }

  // Un 404 o 500 no lanza error solo: hay que revisar respuesta.ok.
  if (!respuesta.ok) {
    const tipo: TipoError = respuesta.status === 404 ? 'no-encontrado' : 'servidor';
    throw new ErrorApi(tipo, `Error ${respuesta.status} en ${ruta}`, respuesta.status);
  }
  return respuesta.json() as Promise<T>;
}

// La API de vetChiloé web envuelve las respuestas: { pacientes: [...] } y { paciente: {...} }.
export const obtenerPacientes = async () =>
  (await pedir<{ pacientes: Paciente[] }>('/api/pacientes')).pacientes;

export const obtenerPaciente = async (id: string) =>
  (await pedir<{ paciente: Paciente }>(`/api/pacientes/${encodeURIComponent(id)}`)).paciente;
