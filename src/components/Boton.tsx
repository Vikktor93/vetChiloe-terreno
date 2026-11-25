import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Colores, Espacio, Radio, TAMANO_TACTIL, Tipografia } from '@/constants/tema';
import { vibrar } from '@/utils/vibrar';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
  cargando?: boolean;
  accessibilityHint?: string;
  // Tipo de vibración al tocar: 'toque' por defecto, 'exito' para acciones importantes.
  vibracion?: keyof typeof vibrar;
};

export default function Boton({
  titulo,
  onPress,
  variante = 'primario',
  deshabilitado = false,
  cargando = false,
  accessibilityHint,
  vibracion = 'toque',
}: Props) {
  const primario = variante === 'primario';
  const inactivo = deshabilitado || cargando;

  // Animación: el botón se "hunde" un poco mientras el dedo está encima.
  const escala = useSharedValue(1);
  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [{ scale: escala.get() }],
  }));

  return (
    <Animated.View style={estiloAnimado}>
      <Pressable
        onPress={() => {
          vibrar[vibracion]();
          onPress();
        }}
        onPressIn={() => {
          escala.set(withSpring(0.96, { damping: 15, stiffness: 300 }));
        }}
        onPressOut={() => {
          escala.set(withSpring(1, { damping: 12, stiffness: 250 }));
        }}
        disabled={inactivo}
        hitSlop={Espacio.s}
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: inactivo, busy: cargando }}
        style={({ pressed }) => [
          styles.base,
          primario ? styles.primario : styles.secundario,
          pressed && styles.presionado,
          deshabilitado && styles.deshabilitado,
        ]}
      >
        {cargando ? (
          <ActivityIndicator
            color={primario ? Colores.textoSobrePrimario : Colores.primario}
          />
        ) : (
          <Text style={[styles.texto, !primario && styles.textoSecundario]}>
            {titulo}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: TAMANO_TACTIL,
    minWidth: TAMANO_TACTIL,
    borderRadius: Radio.m,
    paddingHorizontal: Espacio.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primario: {
    backgroundColor: Colores.primario,
  },
  secundario: {
    borderWidth: 2,
    borderColor: Colores.primario,
    backgroundColor: Colores.tarjeta,
  },
  presionado: {
    opacity: 0.85,
  },
  deshabilitado: {
    opacity: 0.4,
  },
  texto: {
    ...Tipografia.subtitulo,
    color: Colores.textoSobrePrimario,
  },
  textoSecundario: {
    color: Colores.primario,
  },
});
