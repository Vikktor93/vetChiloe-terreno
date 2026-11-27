import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
  cargando?: boolean;
  icono?: keyof typeof Ionicons.glyphMap; // opcional: ícono a la izquierda del texto
};

export default function Boton({ titulo, onPress, variante = 'primario',
  deshabilitado = false, cargando = false, icono }: Props) {
  const primario = variante === 'primario';
  return (
    <Pressable
      onPress={onPress}
      disabled={deshabilitado || cargando}
      accessibilityRole="button"
      accessibilityState={{ disabled: deshabilitado, busy: cargando }}
      style={({ pressed }) => [
        styles.base,
        primario ? styles.primario : styles.secundario,
        pressed && styles.presionado,
        deshabilitado && styles.deshabilitado,
      ]}>
      {cargando
        ? <ActivityIndicator color={primario ? Colores.sobrePrimario : Colores.primario} />
        : (
          <>
            {icono && (
              <Ionicons name={icono} size={22}
                color={primario ? Colores.sobrePrimario : Colores.primario} />
            )}
            <Text style={[styles.texto, !primario && styles.textoSec]}>{titulo}</Text>
          </>
        )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: TAMANO_TACTIL, borderRadius: Radio.m,
    paddingHorizontal: Espacio.l,
    flexDirection: 'row', gap: Espacio.s,
    alignItems: 'center', justifyContent: 'center' },
  primario: { backgroundColor: Colores.primario },
  secundario: { borderWidth: 2, borderColor: Colores.primario },
  presionado: { opacity: 0.7 },
  deshabilitado: { opacity: 0.4 },
  texto: { ...Tipografia.subtitulo, color: Colores.sobrePrimario },
  textoSec: { color: Colores.primario },
});
