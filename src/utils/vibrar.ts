import * as Haptics from 'expo-haptics';

// Vibraciones breves para confirmar acciones. Si el dispositivo no tiene
// motor de vibración (o es la web), simplemente no pasa nada.
const seguro = (accion: () => Promise<void>) => {
  accion().catch(() => {});
};

export const vibrar = {
  toque: () => seguro(() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)),
  seleccion: () => seguro(() => Haptics.selectionAsync()),
  exito: () =>
    seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)),
  aviso: () =>
    seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning)),
  error: () =>
    seguro(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)),
};
