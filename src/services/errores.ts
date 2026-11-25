// Tipos de falla al hablar con la API y el mensaje que ve el usuario.
// La pantalla no muestra "Error 503 en /api/pacientes": muestra qué pasó,
// por qué y qué puede hacer. El detalle técnico va abajo, chico.

export type TipoError =
  | 'sin-conexion'   // el teléfono no llega al servidor (sin señal, URL mala, API caída)
  | 'tiempo'         // el servidor no respondió a tiempo (Render dormido)
  | 'servidor'       // la API respondió 5xx: falló adentro (base de datos, código)
  | 'no-encontrado'  // 404: el recurso no existe
  | 'respuesta'      // la API respondió algo que no es JSON válido
  | 'configuracion'  // falta la URL en .env
  | 'desconocido';

export class ErrorApi extends Error {
  constructor(
    public tipo: TipoError,
    public detalle: string,
    public status?: number
  ) {
    super(detalle);
  }
}

export type ErrorApp = {
  tipo: TipoError;
  titulo: string;
  mensaje: string;
  detalle: string;
};

const TEXTOS: Record<TipoError, { titulo: string; mensaje: string }> = {
  'sin-conexion': {
    titulo: 'Sin conexión con la clínica',
    mensaje: 'No pudimos llegar al servidor. Revisa tu señal o datos móviles e intenta de nuevo.',
  },
  tiempo: {
    titulo: 'El servidor está tardando',
    mensaje: 'La API puede estar despertando (tarda cerca de un minuto). Espera un momento y reintenta.',
  },
  servidor: {
    titulo: 'El servidor tuvo un problema',
    mensaje: 'La API de vetChiloé no está operativa en este momento. No es tu teléfono: intenta en unos minutos.',
  },
  'no-encontrado': {
    titulo: 'No encontramos este paciente',
    mensaje: 'Puede que haya sido eliminado o que el enlace no sea correcto.',
  },
  respuesta: {
    titulo: 'Respuesta inesperada',
    mensaje: 'El servidor respondió algo que la app no entiende. Avísale al equipo de la clínica.',
  },
  configuracion: {
    titulo: 'Falta configurar la app',
    mensaje: 'No hay una dirección de API configurada. Revisa EXPO_PUBLIC_API_URL en el archivo .env.',
  },
  desconocido: {
    titulo: 'Algo salió mal',
    mensaje: 'Ocurrió un error inesperado. Intenta de nuevo.',
  },
};

/** Convierte cualquier error en un mensaje claro para la pantalla. */
export function describirError(e: unknown): ErrorApp {
  const tipo: TipoError = e instanceof ErrorApi ? e.tipo : 'desconocido';
  const detalle = e instanceof Error ? e.message : String(e);
  return { tipo, ...TEXTOS[tipo], detalle };
}
