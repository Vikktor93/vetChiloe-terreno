import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Aparecer from '@/components/Aparecer';
import Boton from '@/components/Boton';
import type { TipoError } from '@/services/errores';
import { Colores, Espacio, Radio, Resortes, Tipografia } from '@/constants/tema';

export type TipoEstado = TipoError | 'vacio' | 'sin-resultados';

type Icono = keyof typeof Ionicons.glyphMap;

// Cada estado tiene su ícono y su color: el usuario distingue de un vistazo
// si es un problema (rojo) o simplemente no hay datos (rosa/neutro).
const ESTILO: Record<TipoEstado, { icono: Icono; color: string; fondo: string }> = {
  'sin-conexion': { icono: 'cloud-offline-outline', color: Colores.alerta, fondo: 'rgba(255, 77, 109, 0.12)' },
  tiempo: { icono: 'hourglass-outline', color: Colores.alerta, fondo: 'rgba(255, 77, 109, 0.12)' },
  servidor: { icono: 'server-outline', color: Colores.alerta, fondo: 'rgba(255, 77, 109, 0.12)' },
  'no-encontrado': { icono: 'help-circle-outline', color: Colores.acento, fondo: Colores.acentoSuave },
  respuesta: { icono: 'code-slash-outline', color: Colores.alerta, fondo: 'rgba(255, 77, 109, 0.12)' },
  configuracion: { icono: 'construct-outline', color: Colores.alerta, fondo: 'rgba(255, 77, 109, 0.12)' },
  desconocido: { icono: 'alert-circle-outline', color: Colores.alerta, fondo: 'rgba(255, 77, 109, 0.12)' },
  vacio: { icono: 'paw-outline', color: Colores.acento, fondo: Colores.acentoSuave },
  'sin-resultados': { icono: 'search-outline', color: Colores.textoSecundario, fondo: Colores.tarjetaActiva },
};

type Props = {
  tipo: TipoEstado;
  titulo: string;
  mensaje: string;
  /** Detalle técnico (código HTTP, ruta): chico, para quien da soporte. */
  detalle?: string;
  accion?: { titulo: string; onPress: () => void; cargando?: boolean };
  accionSecundaria?: { titulo: string; onPress: () => void };
};

/**
 * Pantalla de estado (error, vacío, sin resultados).
 * Dice qué pasó, por qué y qué hacer: primera heurística de Nielsen.
 * El ícono entra con un pequeño resorte y, si es un error, "tiembla" una vez.
 */
export default function MensajeEstado({ tipo, titulo, mensaje, detalle, accion, accionSecundaria }: Props) {
  const reducir = useReducedMotion();
  const estilo = ESTILO[tipo];
  const esError = estilo.color === Colores.alerta;

  const escala = useSharedValue(reducir ? 1 : 0.6);
  const giro = useSharedValue(0);

  useEffect(() => {
    if (reducir) return;
    escala.set(withSpring(1, Resortes.soltar));
    if (esError) {
      // Sacudida corta: "esto no funcionó"
      giro.set(
        withSequence(
          withTiming(-8, { duration: 70 }),
          withTiming(8, { duration: 70 }),
          withTiming(-5, { duration: 70 }),
          withTiming(0, { duration: 70 })
        )
      );
    }
  }, [reducir, esError, escala, giro, tipo]);

  const estiloIcono = useAnimatedStyle(() => ({
    transform: [{ scale: escala.value }, { rotate: `${giro.value}deg` }],
  }));

  return (
    <Aparecer desde={8} style={styles.contenedor}>
      <View accessible accessibilityRole={esError ? 'alert' : 'text'} style={styles.textos}>
        <Animated.View style={[styles.circulo, { backgroundColor: estilo.fondo }, estiloIcono]}>
          <Ionicons name={estilo.icono} size={40} color={estilo.color} />
        </Animated.View>
        <Text style={[styles.titulo, esError && { color: Colores.alerta }]}>{titulo}</Text>
        <Text style={styles.mensaje}>{mensaje}</Text>
        {detalle ? (
          <View style={styles.detalle}>
            <Text style={styles.textoDetalle}>{detalle}</Text>
          </View>
        ) : null}
      </View>

      {(accion || accionSecundaria) && (
        <View style={styles.acciones}>
          {accion && (
            <Boton titulo={accion.titulo} onPress={accion.onPress} cargando={accion.cargando} />
          )}
          {accionSecundaria && (
            <Boton
              titulo={accionSecundaria.titulo}
              onPress={accionSecundaria.onPress}
              variante="secundario"
            />
          )}
        </View>
      )}
    </Aparecer>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    paddingVertical: Espacio.xl,
    paddingHorizontal: Espacio.l,
    gap: Espacio.l,
  },
  textos: { alignItems: 'center', gap: Espacio.s },
  circulo: {
    width: 88,
    height: 88,
    borderRadius: Radio.completo,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Espacio.s,
  },
  titulo: { ...Tipografia.subtitulo, color: Colores.texto, textAlign: 'center' },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center', lineHeight: 22 },
  detalle: {
    marginTop: Espacio.s,
    paddingHorizontal: Espacio.m,
    paddingVertical: Espacio.xs,
    borderRadius: Radio.s,
    borderWidth: 1,
    borderColor: Colores.borde,
    backgroundColor: Colores.tarjeta,
  },
  textoDetalle: { ...Tipografia.etiqueta, color: Colores.textoSecundario, fontFamily: 'monospace' },
  acciones: { alignSelf: 'stretch', gap: Espacio.s },
});
