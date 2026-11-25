import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Animacion } from '@/constants/tema';

// Achica levemente el elemento mientras se presiona. withTiming respeta "reducir movimiento" del sistema.
export function usePresionAnimada() {
  const escala = useSharedValue(1);
  const estilo = useAnimatedStyle(() => ({ transform: [{ scale: escala.value }] }));
  return {
    estilo,
    onPressIn: () => escala.set(withTiming(Animacion.escalaPresion, { duration: Animacion.rapida })),
    onPressOut: () => escala.set(withTiming(1, { duration: Animacion.rapida })),
  };
}
