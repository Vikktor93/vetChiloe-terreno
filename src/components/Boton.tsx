import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    ViewStyle,
} from 'react-native';

import { Colores, Espacio, Radio, TamañoTexto } from '@/constants/tema';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario' | 'peligro';
  deshabilitado?: boolean;
  cargando?: boolean;
  estilo?: ViewStyle;
};

export default function Boton({
  titulo,
  onPress,
  variante = 'primario',
  deshabilitado = false,
  cargando = false,
  estilo,
}: Props) {
  const bloqueado = deshabilitado || cargando;

  const estilos = {
    primario: {
      fondo: Colores.primario,
      texto: '#FFFFFF',
      borde: Colores.primario,
    },
    secundario: {
      fondo: Colores.tarjeta,
      texto: Colores.primario,
      borde: Colores.primario,
    },
    peligro: {
      fondo: Colores.alerta,
      texto: '#FFFFFF',
      borde: Colores.alerta,
    },
  };

  const colores = estilos[variante];

  return (
    <Pressable
      onPress={onPress}
      disabled={bloqueado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: bloqueado, busy: cargando }}
      style={({ pressed }) => [
        styles.boton,
        {
          backgroundColor: colores.fondo,
          borderColor: colores.borde,
          opacity: bloqueado ? 0.5 : pressed ? 0.75 : 1,
        },
        estilo,
      ]}
    >
      {cargando ? (
        <ActivityIndicator color={colores.texto} />
      ) : (
        <Text style={[styles.texto, { color: colores.texto }]}>
          {titulo}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 48,
    paddingHorizontal: Espacio.l,
    paddingVertical: Espacio.m,
    borderRadius: Radio.medio,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: TamañoTexto.cuerpo,
    fontWeight: '600',
    textAlign: 'center',
  },
});
