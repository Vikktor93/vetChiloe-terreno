import { useEffect } from 'react';
import { View, StyleSheet, type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Colores, Curvas, Espacio, Movimiento, Radio, TAMANO_TACTIL } from '@/constants/tema';

type BloqueProps = {
  ancho?: DimensionValue;
  alto: number;
  radio?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Bloque gris que "respira" mientras llegan los datos.
 * Muestra la forma del contenido antes de que exista, así la pantalla
 * no salta cuando aparece la información real.
 */
export function Bloque({ ancho = '100%', alto, radio = Radio.s, style }: BloqueProps) {
  const reducir = useReducedMotion();
  const pulso = useSharedValue(0);

  useEffect(() => {
    if (reducir) return;
    pulso.value = withRepeat(
      withTiming(1, { duration: Movimiento.pulso, easing: Curvas.respiracion }),
      -1,
      true
    );
    return () => cancelAnimation(pulso);
  }, [reducir, pulso]);

  const estilo = useAnimatedStyle(() => ({
    opacity: reducir ? 0.7 : 0.45 + pulso.value * 0.5,
  }));

  return (
    <Animated.View
      style={[{ width: ancho, height: alto, borderRadius: radio }, styles.bloque, style, estilo]}
    />
  );
}

/** Esqueleto con la misma forma que TarjetaPaciente. */
export function TarjetaEsqueleto() {
  return (
    <View style={styles.tarjeta}>
      <Bloque ancho={64} alto={64} radio={Radio.completo} />
      <View style={styles.lineas}>
        <Bloque ancho="45%" alto={18} />
        <Bloque ancho="65%" alto={16} />
        <Bloque ancho="35%" alto={14} />
      </View>
    </View>
  );
}

/** Lista de carga: varias tarjetas esqueleto. */
export function ListaEsqueleto({ cantidad = 5 }: { cantidad?: number }) {
  return (
    <View
      style={styles.lista}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Cargando pacientes">
      {Array.from({ length: cantidad }, (_, i) => (
        <TarjetaEsqueleto key={i} />
      ))}
    </View>
  );
}

/** Esqueleto con la forma de la ficha del paciente. */
export function FichaEsqueleto() {
  return (
    <View
      style={styles.ficha}
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel="Cargando ficha del paciente">
      <Bloque alto={220} radio={Radio.l} />
      <View style={styles.tarjetaFicha}>
        <Bloque ancho="50%" alto={28} />
        <Bloque ancho="35%" alto={14} />
        <View style={styles.separador} />
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.campo}>
            <Bloque ancho="25%" alto={14} />
            <Bloque ancho="60%" alto={18} />
          </View>
        ))}
      </View>
      <Bloque alto={TAMANO_TACTIL} radio={Radio.m} style={styles.boton} />
    </View>
  );
}

const styles = StyleSheet.create({
  bloque: { backgroundColor: Colores.esqueleto },
  lista: { gap: Espacio.m },
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.m,
    padding: Espacio.m,
    borderRadius: Radio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
    backgroundColor: Colores.tarjeta,
  },
  lineas: { flex: 1, gap: Espacio.s },
  ficha: { flex: 1, padding: Espacio.m, gap: Espacio.m, backgroundColor: Colores.fondo },
  tarjetaFicha: {
    gap: Espacio.s,
    padding: Espacio.m,
    borderRadius: Radio.l,
    borderWidth: 1,
    borderColor: Colores.borde,
    backgroundColor: Colores.tarjeta,
  },
  separador: { height: 1, backgroundColor: Colores.borde, marginVertical: Espacio.s },
  campo: { gap: Espacio.xs, marginTop: Espacio.xs },
  boton: { marginTop: 'auto' },
});
