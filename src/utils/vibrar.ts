import { Platform, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';

// Vibraciones cortas de la app. Una sola fuente para que todo se sienta igual.
//
// iOS: motor háptico (Taptic Engine) vía expo-haptics: toques finos y nítidos.
// Android: expo-haptics usa intensidad 30/255, que en muchos teléfonos
// no se siente. Por eso en Android usamos Vibration de React Native, que
// vibra a intensidad completa; con pulsos muy cortos se siente como un "tic".
// En web no hay motor de vibración: no hace nada.

const esIOS = Platform.OS === 'ios';
const esAndroid = Platform.OS === 'android';

// Patrones Android en ms: [espera, vibra, espera, vibra, ...]
const ANDROID = {
  seleccion: 18,
  toque: 30,
  exito: [0, 30, 70, 45],
  error: [0, 50, 60, 50, 60, 50],
};

const ios = (accion: () => Promise<void>) => {
  accion().catch(() => {}); // si el teléfono no vibra, la app sigue igual
};

export const vibrar = {
  /** Toque leve: tarjetas, pestañas, botones secundarios. */
  seleccion: () => {
    if (esIOS) ios(() => Haptics.selectionAsync());
    else if (esAndroid) Vibration.vibrate(ANDROID.seleccion);
  },
  /** Toque firme: botón principal. */
  toque: () => {
    if (esIOS) ios(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium));
    else if (esAndroid) Vibration.vibrate(ANDROID.toque);
  },
  /** Acción importante confirmada (Registrar visita). */
  exito: () => {
    if (esIOS) ios(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
    else if (esAndroid) Vibration.vibrate(ANDROID.exito);
  },
  /** Algo falló (no se cargaron los datos). */
  error: () => {
    if (esIOS) ios(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error));
    else if (esAndroid) Vibration.vibrate(ANDROID.error);
  },
};

export type TipoVibracion = 'seleccion' | 'toque' | 'ninguna';
