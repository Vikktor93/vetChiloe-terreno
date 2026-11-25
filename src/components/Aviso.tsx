import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import Boton from '@/components/Boton';
import { Colores, Duracion, Espacio, Radio, Tipografia } from '@/constants/tema';

type Icono = keyof typeof Ionicons.glyphMap;
export type TonoAviso = 'info' | 'advertencia' | 'error';

export type AccionAviso = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  cargando?: boolean;
};

type Props = {
  icono: Icono;
  titulo: string;
  mensaje: string;
  detalle?: string;
  tono?: TonoAviso;
  acciones?: AccionAviso[];
};

const tonos: Record<TonoAviso, { color: string; fondo: string }> = {
  info: { color: Colores.primario, fondo: Colores.primarioSuave },
  advertencia: { color: Colores.advertencia, fondo: Colores.advertenciaSuave },
  error: { color: Colores.alerta, fondo: Colores.alertaSuave },
};

// Aviso grande para estados vacíos y errores: ícono, título, explicación
// y acciones claras, en vez de una línea de texto suelta.
export default function Aviso({
  icono,
  titulo,
  mensaje,
  detalle,
  tono = 'info',
  acciones = [],
}: Props) {
  const { color, fondo } = tonos[tono];

  return (
    <Animated.View
      entering={FadeInDown.duration(Duracion.lenta)}
      style={styles.tarjeta}
      accessibilityRole={tono === 'error' ? 'alert' : 'summary'}
      accessibilityLiveRegion="polite"
    >
      <View style={[styles.circulo, { backgroundColor: fondo }]}>
        <Ionicons name={icono} size={48} color={color} />
      </View>
      <Text style={styles.titulo} accessibilityRole="header">
        {titulo}
      </Text>
      <Text style={styles.mensaje}>{mensaje}</Text>
      {detalle ? (
        <Text style={[styles.detalle, { backgroundColor: fondo }]}>{detalle}</Text>
      ) : null}
      {acciones.length > 0 ? (
        <View style={styles.acciones}>
          {acciones.map((accion) => (
            <Boton key={accion.titulo} {...accion} />
          ))}
        </View>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: Espacio.m,
    padding: Espacio.l,
    borderRadius: Radio.l,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  circulo: {
    width: 96,
    height: 96,
    borderRadius: Radio.completo,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    ...Tipografia.titulo,
    color: Colores.texto,
    textAlign: 'center',
  },
  mensaje: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    textAlign: 'center',
    lineHeight: 24,
  },
  detalle: {
    ...Tipografia.etiqueta,
    color: Colores.texto,
    textAlign: 'center',
    paddingHorizontal: Espacio.m,
    paddingVertical: Espacio.s,
    borderRadius: Radio.s,
    overflow: 'hidden',
  },
  acciones: {
    alignSelf: 'stretch',
    gap: Espacio.s,
    marginTop: Espacio.s,
  },
});
