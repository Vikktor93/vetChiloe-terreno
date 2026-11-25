import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Curvas, Movimiento, Resortes } from '@/constants/tema';
import { vibrar, type TipoVibracion } from '@/utils/vibrar';

const PressableAnimado = Animated.createAnimatedComponent(Pressable);

type Colores2 = { normal: string; activo: string };

type Props = Omit<PressableProps, 'style'> & {
  style?: StyleProp<ViewStyle>;
  /** Fondo en reposo y cuando está bajo el dedo/puntero. */
  fondo?: Colores2;
  /** Borde en reposo y cuando está bajo el dedo/puntero. */
  borde?: Colores2;
  /** Vibración al tocar (en el momento en que el dedo toca, no al soltar). */
  vibracion?: TipoVibracion;
};

/**
 * Base de todo lo tocable en la app:
 * - Presión: se encoge a 0,97 en 120 ms con curva ease-out fuerte (respuesta inmediata)
 *   y al soltar vuelve con un resorte (rebote mínimo).
 * - Hover: con puntero (tablet con mouse o web) crece apenas y cambia de color.
 *   En el teléfono no existe hover, así que nunca queda "pegado".
 * - Vibración al tocar.
 * - Con "Reducir movimiento" activado: sin escalas, solo cambio de color/opacidad.
 */
export default function Presionable({
  style,
  fondo,
  borde,
  vibracion = 'seleccion',
  onPressIn,
  onPressOut,
  onHoverIn,
  onHoverOut,
  children,
  ...resto
}: Props) {
  const reducir = useReducedMotion();
  const presion = useSharedValue(0);
  const hover = useSharedValue(0);

  const animar = (valor: typeof presion, destino: number, duracion: number) => {
    valor.set(withTiming(destino, { duration: duracion, easing: Curvas.salida }));
  };

  const estiloAnimado = useAnimatedStyle(() => {
    // El resorte al soltar puede pasar de 0 (rebote): el color no debe hacerlo.
    const activo = Math.min(1, Math.max(presion.value, hover.value, 0));
    const escala = reducir
      ? 1
      : interpolate(presion.value, [-1, 0, 1], [2 - Movimiento.escalaPresion, 1, Movimiento.escalaPresion]) *
        interpolate(hover.value, [0, 1], [1, Movimiento.escalaHover]);

    return {
      transform: [{ scale: escala }],
      // Sin escala (reducir movimiento), la presión se nota con opacidad.
      ...(reducir && { opacity: interpolate(presion.value, [0, 1], [1, 0.8]) }),
      ...(fondo && {
        backgroundColor: interpolateColor(activo, [0, 1], [fondo.normal, fondo.activo]),
      }),
      ...(borde && {
        borderColor: interpolateColor(activo, [0, 1], [borde.normal, borde.activo]),
      }),
    };
  });

  return (
    <PressableAnimado
      {...resto}
      onPressIn={(e) => {
        animar(presion, 1, Movimiento.presion);
        if (vibracion !== 'ninguna') vibrar[vibracion]();
        onPressIn?.(e);
      }}
      onPressOut={(e) => {
        // Vuelve con un resorte: pequeño rebote, como un botón físico.
        presion.set(reducir
          ? withTiming(0, { duration: Movimiento.soltar, easing: Curvas.salida })
          : withSpring(0, Resortes.soltar));
        onPressOut?.(e);
      }}
      onHoverIn={(e) => {
        animar(hover, 1, Movimiento.hover);
        onHoverIn?.(e);
      }}
      onHoverOut={(e) => {
        animar(hover, 0, Movimiento.hover);
        onHoverOut?.(e);
      }}
      style={[style, estiloAnimado]}>
      {children}
    </PressableAnimado>
  );
}
