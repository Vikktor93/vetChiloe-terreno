import type Ionicons from '@expo/vector-icons/Ionicons';

import type { TonoAviso } from '@/components/Aviso';
import type { ErrorApi } from '@/services/api';

type Mensaje = {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  mensaje: string;
  tono: TonoAviso;
};

// Traduce un error de la API a un aviso claro para quien está en terreno.
export function mensajeDeError(error: ErrorApi): Mensaje {
  switch (error.tipo) {
    case 'sin-conexion':
      return {
        icono: 'cloud-offline-outline',
        titulo: 'Sin conexión',
        mensaje:
          'No pudimos comunicarnos con la clínica. Revisa tu señal o Wi-Fi e inténtalo de nuevo.',
        tono: 'advertencia',
      };
    case 'tiempo':
      return {
        icono: 'hourglass-outline',
        titulo: 'El servidor no responde',
        mensaje:
          'La clínica está tardando demasiado. Puede estar despertando: espera unos segundos y reintenta.',
        tono: 'advertencia',
      };
    case 'servidor':
      return {
        icono: 'server-outline',
        titulo: 'Problema en el servidor',
        mensaje:
          'El servidor de la clínica tuvo un error al buscar los datos. No es tu teléfono: reintenta en un momento.',
        tono: 'error',
      };
    case 'no-encontrado':
      return {
        icono: 'search-outline',
        titulo: 'No encontrado',
        mensaje: 'Este registro ya no existe o fue eliminado.',
        tono: 'info',
      };
    case 'configuracion':
      return {
        icono: 'construct-outline',
        titulo: 'Falta configurar la app',
        mensaje: 'No está definida la dirección de la API (EXPO_PUBLIC_API_URL).',
        tono: 'error',
      };
  }
}
