import { useEffect, type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { Curvas, Movimiento } from '@/constants/tema';

type Props = {
  children: ReactNode;
  /** Posición en la secuencia: cada paso agrega un pequeño retraso (escalonado). */
  orden?: number;
  /** Distancia desde donde sube al aparecer (px). */
  desde?: number;
  style?: StyleProp<ViewStyle>;
};

// Pasado este número, los elementos aparecen sin esperar más.
const MAX_ORDEN = 8;

/**
 * Entrada suave al montar: opacidad 0 -> 1 y sube unos pixeles.
 * Solo anima transform y opacity (no cambia el tamaño), así no
 * altera cómo las listas miden sus filas.
 * Con "Reducir movimiento": solo aparece con opacidad, sin desplazarse.
 */
export default function Aparecer({ children, orden = 0, desde = 12, style }: Props) {
  const reducir = useReducedMotion();
  const progreso = useSharedValue(0);

  useEffect(() => {
    progreso.value = withDelay(
      Math.min(orden, MAX_ORDEN) * Movimiento.escalonado,
      withTiming(1, { duration: Movimiento.entrada, easing: Curvas.salida })
    );
  }, [orden, progreso]);

  const estilo = useAnimatedStyle(() => ({
    opacity: progreso.value,
    transform: [{ translateY: reducir ? 0 : (1 - progreso.value) * desde }],
  }));

  return <Animated.View style={[style, estilo]}>{children}</Animated.View>;
}
