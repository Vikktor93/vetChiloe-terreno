import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// La vibración es solo una confirmación extra: en web, emuladores o equipos sin motor no debe romper nada.
function seguro(accion: () => Promise<void>) {
  if (Platform.OS === 'web') return;
  try {
    accion().catch(() => {});
  } catch {}
}

export const vibrar = {
  toque: () => seguro(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  fuerte: () => seguro(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)),
  seleccion: () => seguro(Haptics.selectionAsync),
  exito: () => seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  error: () => seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
};
