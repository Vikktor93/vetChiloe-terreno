import { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated';
import Aparecer from '@/components/Aparecer';
import Boton from '@/components/Boton';
import Presionable from '@/components/Presionable';
import { FichaEsqueleto } from '@/components/Esqueleto';
import { vibrar } from '@/utils/vibrar';
import { Paciente } from '@/data/pacientesMock';
import { obtenerPaciente } from '@/services/api';
import { formatearEdad } from '@/utils/formato';
import { describirError, type ErrorApp } from '@/services/errores';
import MensajeEstado from '@/components/MensajeEstado';
import {
  Colores,
  Encabezado,
  Espacio,
  Radio,
  Tipografia,
  TAMANO_TACTIL,
} from '@/constants/tema';

type Resultado = { id: string; paciente?: Paciente; error?: ErrorApp };

const ALTO_FOTO = Encabezado.alturaFoto;

/** Botón circular "volver", flotando sobre la foto. */
function BotonVolver({ top }: { top: number }) {
  return (
    <Presionable
      onPress={() => router.back()}
      hitSlop={8}
      fondo={{ normal: Colores.vidrio, activo: Colores.tarjetaActiva }}
      borde={{ normal: 'rgba(255, 255, 255, 0.12)', activo: Colores.acento }}
      accessibilityRole="button"
      accessibilityLabel="Volver a la lista de pacientes"
      style={[styles.volver, { top: top + Espacio.s }]}>
      <Ionicons name="arrow-back" size={22} color={Colores.texto} />
    </Presionable>
  );
}

/** Dato corto con ícono (especie, edad, atención). */
function Chip({ icono, etiqueta, valor }: { icono: keyof typeof Ionicons.glyphMap; etiqueta: string; valor: string }) {
  return (
    <View style={styles.chip} accessible accessibilityLabel={`${etiqueta}: ${valor}`}>
      <View style={styles.chipIcono}>
        <Ionicons name={icono} size={18} color={Colores.acento} />
      </View>
      <Text style={styles.chipEtiqueta}>{etiqueta}</Text>
      <Text style={styles.chipValor} numberOfLines={2}>
        {valor}
      </Text>
    </View>
  );
}

export default function FichaPacienteScreen() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const reducir = useReducedMotion();
  const { id } = useLocalSearchParams<{ id: string }>();
  // Guardamos el resultado junto al id al que corresponde.
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [intento, setIntento] = useState(0);

  // GET /api/pacientes/:id cada vez que cambia el id (o se reintenta)
  useEffect(() => {
    let activo = true;
    obtenerPaciente(id)
      .then((p) => activo && setResultado({ id, paciente: p }))
      .catch((e) => {
        if (!activo) return;
        setResultado({ id, error: describirError(e) });
        vibrar.error();
      });
    return () => {
      activo = false;
    };
  }, [id, intento]);

  // ---- Animaciones ligadas al scroll (corren en el hilo de UI) ----
  const scrollY = useSharedValue(0);
  const alHacerScroll = useAnimatedScrollHandler((e) => {
    scrollY.set(e.contentOffset.y);
  });

  // Foto: parallax al subir (va a la mitad de velocidad) y se agranda al tirar hacia abajo.
  const estiloFoto = useAnimatedStyle(() => {
    if (reducir) return {};
    const y = scrollY.value;
    return {
      transform: [
        { translateY: y < 0 ? y / 2 : y * 0.5 },
        { scale: interpolate(y, [-ALTO_FOTO, 0], [2, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  // Nombre sobre la foto: se desvanece y sube mientras la foto se va.
  const estiloTituloFoto = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, ALTO_FOTO * 0.45], [1, 0], Extrapolation.CLAMP),
    transform: [
      { translateY: reducir ? 0 : interpolate(scrollY.value, [0, ALTO_FOTO], [0, -40], Extrapolation.CLAMP) },
    ],
  }));

  // Barra superior: aparece cuando la foto ya casi no se ve.
  const estiloBarra = useAnimatedStyle(() => {
    const p = interpolate(
      scrollY.value,
      [ALTO_FOTO - 140, ALTO_FOTO - 80],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity: p };
  });
  const estiloTituloBarra = useAnimatedStyle(() => {
    const p = interpolate(scrollY.value, [ALTO_FOTO - 100, ALTO_FOTO - 60], [0, 1], Extrapolation.CLAMP);
    return { opacity: p, transform: [{ translateY: reducir ? 0 : (1 - p) * 8 }] };
  });

  // Si el resultado es de otro id, todavía estamos cargando.
  const actual = resultado?.id === id ? resultado : null;
  const paciente = actual?.paciente;
  const error = actual?.error;

  const reintentar = () => {
    setResultado(null);
    setIntento((n) => n + 1);
  };

  if (error) {
    return (
      <View style={styles.pantalla}>
        <Stack.Screen options={{ headerShown: false }} />
        <BotonVolver top={insets.top} />
        <View style={styles.centrado}>
          <MensajeEstado
            tipo={error.tipo}
            titulo={error.titulo}
            mensaje={error.mensaje}
            detalle={error.detalle}
            // Si el paciente no existe, reintentar no sirve: mejor volver.
            accion={
              error.tipo === 'no-encontrado'
                ? { titulo: 'Volver a la lista', onPress: () => router.back() }
                : { titulo: 'Reintentar', onPress: reintentar }
            }
            accionSecundaria={
              error.tipo === 'no-encontrado'
                ? undefined
                : { titulo: 'Volver', onPress: () => router.back() }
            }
          />
        </View>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={[styles.pantalla, { paddingTop: insets.top }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <FichaEsqueleto />
        <BotonVolver top={insets.top} />
      </View>
    );
  }

  const registrarVisita = () => {
    vibrar.exito();
    Alert.alert('Próximamente', 'Disponible en el Tópico 05');
  };

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ headerShown: false, title: paciente.nombre }} />

      <Animated.ScrollView
        onScroll={alHacerScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: Espacio.xl }}
        showsVerticalScrollIndicator={false}>
        {/* Foto con parallax + degradado para leer el nombre encima */}
        <View style={styles.marcoFoto}>
          <Animated.Image
            source={{ uri: paciente.foto }}
            style={[styles.foto, estiloFoto]}
            resizeMode="cover"
            accessibilityLabel={`Foto de ${paciente.nombre}`}
          />
          <LinearGradient
            colors={Colores.sombraFoto}
            locations={[0.35, 0.7, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          <Animated.View style={[styles.tituloFoto, estiloTituloFoto]}>
            <Aparecer orden={0} desde={16}>
              <Text style={styles.nombre} accessibilityRole="header">
                {paciente.nombre}
              </Text>
              <Text style={styles.atencion}>Atención N° {paciente.numero_atencion}</Text>
            </Aparecer>
          </Animated.View>
        </View>

        <View style={styles.cuerpo}>
          {/* Datos rápidos en chips */}
          <Aparecer orden={1} style={styles.chips}>
            <Chip icono="paw" etiqueta="Especie" valor={paciente.especie} />
            <Chip icono="calendar-outline" etiqueta="Edad" valor={formatearEdad(paciente.edad)} />
          </Aparecer>

          {/* Diagnóstico */}
          <Aparecer orden={2} style={styles.tarjeta}>
            <View style={styles.tarjetaCabecera}>
              <Ionicons name="medkit-outline" size={20} color={Colores.acento} />
              <Text style={styles.tarjetaTitulo}>Diagnóstico / Motivo</Text>
            </View>
            <Text style={styles.diagnostico}>{paciente.diagnostico}</Text>
          </Aparecer>
        </View>
      </Animated.ScrollView>

      {/* Barra superior que aparece al hacer scroll */}
      <Animated.View
        pointerEvents="none"
        style={[styles.barra, { paddingTop: insets.top, height: insets.top + 64 }, estiloBarra]}>
        <Animated.Text style={[styles.barraTitulo, estiloTituloBarra]} numberOfLines={1}>
          {paciente.nombre}
        </Animated.Text>
      </Animated.View>

      <BotonVolver top={insets.top} />

      {/* Acción principal fija abajo: zona del pulgar */}
      <Aparecer
        orden={3}
        desde={24}
        style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton
          titulo="Registrar visita"
          onPress={registrarVisita}
          accessibilityHint={`Registra una visita para ${paciente.nombre}`}
        />
      </Aparecer>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Espacio.l,
    gap: Espacio.m,
  },

  marcoFoto: { height: ALTO_FOTO, overflow: 'visible' },
  foto: { width: '100%', height: ALTO_FOTO, backgroundColor: Colores.esqueleto },
  tituloFoto: { position: 'absolute', left: Espacio.m, right: Espacio.m, bottom: Espacio.m },
  nombre: { fontSize: Encabezado.tituloGrande, fontWeight: '800', color: Colores.texto, letterSpacing: -0.5 },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario, marginTop: Espacio.xs },

  volver: {
    position: 'absolute',
    left: Espacio.m,
    zIndex: 20,
    width: TAMANO_TACTIL,
    height: TAMANO_TACTIL,
    borderRadius: Radio.completo,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barra: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: TAMANO_TACTIL + Espacio.l,
    backgroundColor: Colores.tarjeta,
    borderBottomWidth: 1,
    borderColor: Colores.borde,
  },
  barraTitulo: { ...Tipografia.subtitulo, color: Colores.texto },

  cuerpo: { padding: Espacio.m, gap: Espacio.m, backgroundColor: Colores.fondo },
  chips: { flexDirection: 'row', gap: Espacio.s },
  chip: {
    flex: 1,
    padding: Espacio.m,
    gap: Espacio.xs,
    borderRadius: Radio.l,
    borderWidth: 1,
    borderColor: Colores.borde,
    backgroundColor: Colores.tarjeta,
  },
  chipIcono: {
    width: 32,
    height: 32,
    borderRadius: Radio.completo,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colores.acentoSuave,
    marginBottom: Espacio.xs,
  },
  chipEtiqueta: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
  chipValor: { ...Tipografia.cuerpo, fontWeight: '700', color: Colores.texto },
  tarjeta: {
    padding: Espacio.m,
    gap: Espacio.s,
    borderRadius: Radio.l,
    borderWidth: 1,
    borderColor: Colores.borde,
    backgroundColor: Colores.tarjeta,
  },
  tarjetaCabecera: { flexDirection: 'row', alignItems: 'center', gap: Espacio.s },
  tarjetaTitulo: { ...Tipografia.etiqueta, fontWeight: '700', color: Colores.textoSecundario, textTransform: 'uppercase', letterSpacing: 0.5 },
  diagnostico: { ...Tipografia.cuerpo, color: Colores.texto, lineHeight: 24 },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});
