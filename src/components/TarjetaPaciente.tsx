import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Presionable from '@/components/Presionable';
import { Paciente } from '@/data/pacientesMock';
import { formatearEdad } from '@/utils/formato';
import {
  Colores,
  Curvas,
  Espacio,
  Movimiento,
  Radio,
  Tipografia,
  TAMANO_TACTIL,
} from '@/constants/tema';

type Props = { paciente: Paciente };

const TAMANO_FOTO = 60;

export default function TarjetaPaciente({ paciente }: Props) {
  const reducir = useReducedMotion();
  // 0 = reposo, 1 = bajo el dedo o el puntero
  const activo = useSharedValue(0);
  const animar = (destino: number, duracion: number) => {
    activo.set(withTiming(destino, { duration: duracion, easing: Curvas.salida }));
  };

  // La flecha avanza un poco: anticipa que la tarjeta lleva a otra pantalla.
  const estiloFlecha = useAnimatedStyle(() => ({
    transform: [{ translateX: reducir ? 0 : interpolate(activo.value, [0, 1], [0, 4]) }],
    opacity: interpolate(activo.value, [0, 1], [0.6, 1]),
  }));

  // El anillo de la foto se enciende.
  const estiloAnillo = useAnimatedStyle(() => ({ opacity: activo.value }));

  return (
    <Presionable
      onPress={() => router.push(`/paciente/${paciente.id}`)}
      onPressIn={() => animar(1, Movimiento.presion)}
      onPressOut={() => animar(0, Movimiento.soltar)}
      onHoverIn={() => animar(1, Movimiento.hover)}
      onHoverOut={() => animar(0, Movimiento.hover)}
      vibracion="seleccion"
      fondo={{ normal: Colores.tarjeta, activo: Colores.tarjetaActiva }}
      borde={{ normal: Colores.borde, activo: Colores.acento }}
      accessibilityRole="button"
      accessibilityLabel={`Ver ficha de ${paciente.nombre}, ${paciente.especie}, ${formatearEdad(paciente.edad)}`}
      accessibilityHint="Abre la ficha clínica"
      style={styles.tarjeta}>
      <View style={styles.marcoFoto}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityIgnoresInvertColors
        />
        <Animated.View style={[styles.anillo, estiloAnillo]} pointerEvents="none" />
      </View>

      <View style={styles.info}>
        <View style={styles.filaNombre}>
          <Text style={styles.nombre} numberOfLines={1}>
            {paciente.nombre}
          </Text>
          <View style={styles.etiquetaEspecie}>
            <Ionicons name="paw" size={12} color={Colores.acento} />
            <Text style={styles.textoEspecie}>{paciente.especie}</Text>
          </View>
        </View>
        <Text style={styles.detalle} numberOfLines={1}>
          {formatearEdad(paciente.edad)} · {paciente.diagnostico}
        </Text>
        <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
      </View>

      <Animated.View style={estiloFlecha}>
        <Ionicons name="chevron-forward" size={22} color={Colores.acento} />
      </Animated.View>
    </Presionable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.m,
    padding: Espacio.m,
    minHeight: TAMANO_TACTIL,
    borderRadius: Radio.l,
    borderWidth: 1,
  },
  marcoFoto: { width: TAMANO_FOTO + 6, height: TAMANO_FOTO + 6, alignItems: 'center', justifyContent: 'center' },
  foto: {
    width: TAMANO_FOTO,
    height: TAMANO_FOTO,
    borderRadius: Radio.completo,
    backgroundColor: Colores.esqueleto,
  },
  anillo: {
    ...StyleSheet.absoluteFill,
    borderRadius: Radio.completo,
    borderWidth: 2,
    borderColor: Colores.acento,
  },
  info: { flex: 1, gap: 2 },
  filaNombre: { flexDirection: 'row', alignItems: 'center', gap: Espacio.s },
  nombre: { ...Tipografia.subtitulo, color: Colores.texto, flexShrink: 1 },
  etiquetaEspecie: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.xs,
    paddingHorizontal: Espacio.s,
    paddingVertical: 2,
    borderRadius: Radio.completo,
    backgroundColor: Colores.acentoSuave,
  },
  textoEspecie: { ...Tipografia.etiqueta, fontWeight: '600', color: Colores.acento },
  detalle: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
});
