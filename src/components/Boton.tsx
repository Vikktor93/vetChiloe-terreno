import { Colores, Espacio, Radio, TAMANO_TACTIL, Tipografia } from '@/constants/tema';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
  cargando?: boolean;
};

export default function Boton({
  titulo, onPress, variante = 'primario',
  deshabilitado = false, cargando = false,
}: Props) {
  const primario = variante === 'primario';
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado || cargando}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: deshabilitado || cargando, busy: cargando }}
      style={({ pressed }) => [
        styles.base,
        primario ? styles.primario : styles.secundario,
        pressed && styles.presionado,
        (deshabilitado || cargando) && styles.deshabilitado,
      ]}>
      {cargando
        ? <ActivityIndicator color={primario ? Colores.tarjeta : Colores.primario} />
        : <Text style={[styles.texto, !primario && styles.textoSec]}>{titulo}</Text>}
    </Pressable>
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
  texto: { ...Tipografia.subtitulo, color: Colores.tarjeta },
  textoSec: { color: Colores.primario },
});