import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colores, Espaciado, Radios, Tipografia } from '@/constants/tema';

type VarianteBoton = 'primario' | 'secundario' | 'alerta';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: VarianteBoton;
  deshabilitado?: boolean;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

export default function Boton({
  titulo,
  onPress,
  variante = 'primario',
  deshabilitado = false,
  accessibilityLabel,
  style,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? titulo}
      accessibilityState={{ disabled: deshabilitado }}
      style={({ pressed }) => [
        styles.base,
        styles[variante],
        pressed && !deshabilitado && styles.presionado,
        deshabilitado && styles.deshabilitado,
        style,
      ]}
    >
      <Text
        style={[
          styles.textoBase,
          variante === 'secundario' ? styles.textoSecundario : styles.textoClaro,
        ]}
      >
        {titulo}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48, // Área táctil ergonómica para terreno
    paddingVertical: Espaciado.md,
    paddingHorizontal: Espaciado.lg,
    borderRadius: Radios.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  primario: {
    backgroundColor: Colores.primario,
    borderColor: Colores.primario,
  },
  secundario: {
    backgroundColor: Colores.tarjeta,
    borderColor: Colores.primario,
  },
  alerta: {
    backgroundColor: Colores.alerta,
    borderColor: Colores.alerta,
  },
  presionado: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  deshabilitado: {
    backgroundColor: Colores.deshabilitado,
    borderColor: Colores.deshabilitado,
  },
  textoBase: {
    fontSize: Tipografia.subtitulo, // 16 (>= 14)
    fontWeight: '700',
  },
  textoClaro: {
    color: Colores.blanco,
  },
  textoSecundario: {
    color: Colores.primario,
  },
});