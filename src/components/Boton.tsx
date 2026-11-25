import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';

import { Colores, Espacio, Radio, TAMANO_TACTIL, Tipografia } from '@/constants/tema';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
  cargando?: boolean;
  accessibilityHint?: string;
};

export default function Boton({
  titulo,
  onPress,
  variante = 'primario',
  deshabilitado = false,
  cargando = false,
  accessibilityHint,
}: Props) {
  const primario = variante === 'primario';
  const inactivo = deshabilitado || cargando;

  return (
    <Pressable
      onPress={onPress}
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
    opacity: 0.7,
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
