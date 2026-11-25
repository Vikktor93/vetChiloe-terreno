import type { Paciente } from '@/data/pacientesMock';

const apiBaseUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');

type PacienteApi = Omit<Paciente, 'edad' | 'foto'> & {
  edad: number | string;
  foto?: string;
  imagen?: string;
};

function normalizarPaciente(paciente: PacienteApi): Paciente {
  const edad = typeof paciente.edad === 'string'
    ? paciente.edad.replace(/\s*años?.*$/i, '').trim()
    : String(paciente.edad);

  return {
    ...paciente,
    edad: Number.parseInt(edad, 10) || 0,
    foto: paciente.foto ?? paciente.imagen ?? '',
  };
}

async function get<T>(path: string): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error('Configura EXPO_PUBLIC_API_URL en el archivo .env.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  let response: Response;
  try {
    response = await fetch(`${apiBaseUrl}${path}`, { signal: controller.signal });
  } catch (causa) {
    if (causa instanceof Error && causa.name === 'AbortError') {
      throw new Error('La API tardó demasiado en responder. Revisa tu conexión y vuelve a intentar.');
    }
    throw new Error('No fue posible conectar con la API. Revisa la URL y tu conexión.');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`La API respondió con el código ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export async function obtenerPacientes(): Promise<Paciente[]> {
  const pacientes = await get<PacienteApi[]>('/api/pacientes');
  return pacientes.map(normalizarPaciente);
}

export async function obtenerPaciente(id: string | number): Promise<Paciente> {
  const paciente = await get<PacienteApi>(`/api/pacientes/${encodeURIComponent(String(id))}`);
  return normalizarPaciente(paciente);
}