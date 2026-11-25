import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';
import { vibrar } from '@/utils/haptics';
import { usePresionAnimada } from '@/hooks/usePresionAnimada';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
  cargando?: boolean;
  // Vibración al presionar; por defecto media (primario) o suave (secundario).
  vibracion?: () => void;
};

export default function Boton({ titulo, onPress, variante = 'primario',
  deshabilitado = false, cargando = false,
  vibracion = variante === 'primario' ? vibrar.fuerte : vibrar.toque }: Props) {
  const primario = variante === 'primario';
  const { estilo, onPressIn, onPressOut } = usePresionAnimada();
  return (
    <Animated.View style={estilo}>
      <Pressable
        onPress={() => { vibracion(); onPress(); }}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={deshabilitado || cargando}
        accessibilityRole="button"
        accessibilityLabel={titulo}
        accessibilityState={{ disabled: deshabilitado, busy: cargando }}
        style={({ pressed }) => [
          styles.base,
          primario ? styles.primario : styles.secundario,
          pressed && styles.presionado,
          deshabilitado && styles.deshabilitado,
        ]}>
        {cargando
          ? <ActivityIndicator color={primario ? Colores.textoSobrePrimario : Colores.primario} />
          : <Text style={[styles.texto, !primario && styles.textoSec]}>{titulo}</Text>}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: TAMANO_TACTIL, borderRadius: Radio.m,
    paddingHorizontal: Espacio.l,
    alignItems: 'center', justifyContent: 'center',
  },
  primario: { backgroundColor: Colores.primario },
  secundario: { borderWidth: 2, borderColor: Colores.primario },
  presionado: { opacity: 0.7 },
  deshabilitado: { opacity: 0.4 },
  texto: { ...Tipografia.subtitulo, color: Colores.textoSobrePrimario },
  textoSec: { color: Colores.primario },
});
