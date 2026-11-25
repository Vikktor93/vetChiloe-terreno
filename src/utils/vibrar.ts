import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Vibraciones cortas de la app. Una sola fuente para que todo se sienta igual.
// En web no hay motor de vibración: no hace nada.
const disponible = Platform.OS === 'ios' || Platform.OS === 'android';

const seguro = (accion: () => Promise<void>) => {
  if (!disponible) return;
  accion().catch(() => {}); // si el teléfono no vibra, la app sigue igual
};

export const vibrar = {
  /** Toque leve: tarjetas, pestañas, botones secundarios. */
  seleccion: () => seguro(() => Haptics.selectionAsync()),
  /** Toque firme: botón principal. */
  toque: () => seguro(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  /** Acción importante confirmada (Registrar visita). */
  exito: () => seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  /** Algo falló (no se cargaron los datos). */
  error: () => seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
};

export type TipoVibracion = 'seleccion' | 'toque' | 'ninguna';
