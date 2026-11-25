import { Pressable, Text, StyleSheet, ViewStyle, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Colores,
  Espaciado,
  Radios,
  Tamanos,
  Tipografia,
} from '@/constants/tema';

type VarianteBoton = 'primario' | 'secundario' | 'alerta';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: VarianteBoton;
  deshabilitado?: boolean;
  icono?: keyof typeof Ionicons.glyphMap;
  accessibilityLabel?: string;
  style?: ViewStyle;
};

export default function Boton({
  titulo,
  onPress,
  variante = 'primario',
  deshabilitado = false,
  icono,
  accessibilityLabel,
  style,
}: Props) {
  const colorTexto =
    variante === 'secundario' ? Colores.primario : Colores.blanco;

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
      <View style={styles.contenido}>
        {icono && (
          <Ionicons
            name={icono}
            size={Tamanos.iconoBoton}
            color={colorTexto}
          />
        )}
        <Text style={[styles.textoBase, { color: colorTexto }]}>{titulo}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: Tamanos.botonMinimo,
    paddingVertical: Espaciado.md,
    paddingHorizontal: Espaciado.xxl,
    borderRadius: Radios.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    shadowColor: Colores.primarioOscuro,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  contenido: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espaciado.sm,
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
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  deshabilitado: {
    backgroundColor: Colores.deshabilitado,
    borderColor: Colores.deshabilitado,
    elevation: 0,
  },
  textoBase: {
    fontSize: Tipografia.subtitulo,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});