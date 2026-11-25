import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Aviso, { type AccionAviso } from '@/components/Aviso';
import Boton from '@/components/Boton';
import FotoPaciente from '@/components/FotoPaciente';
import { Colores, Duracion, Espacio, Radio, Tipografia } from '@/constants/tema';
import { useDemora } from '@/hooks/useDemora';
import { aErrorApi, type ErrorApi, obtenerPaciente } from '@/services/api';
import { formatearEdad, type Paciente } from '@/types/paciente';
import { mensajeDeError } from '@/utils/mensajesError';
import { vibrar } from '@/utils/vibrar';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [error, setError] = useState<ErrorApi | null>(null);
  const [intento, setIntento] = useState(0);
  const demorado = useDemora(!paciente && !error);

  useEffect(() => {
    let activo = true; // evita actualizar si se sale de la pantalla antes de la respuesta
    obtenerPaciente(id)
      .then((p) => {
        if (activo) setPaciente(p);
      })
      .catch((e) => {
        if (!activo) return;
        setError(aErrorApi(e));
        vibrar.error();
      });
    return () => {
      activo = false;
    };
  }, [id, intento]);

  const reintentar = useCallback(() => {
    setError(null);
    setPaciente(null);
    setIntento((n) => n + 1);
  }, []);

  if (error) {
    const noEncontrado = error.tipo === 'no-encontrado';
    const volver: AccionAviso = {
      titulo: 'Volver a la lista',
      onPress: () => router.back(),
      variante: noEncontrado ? 'primario' : 'secundario',
    };
    return (
      <ScrollView contentContainerStyle={styles.centro}>
        <Stack.Screen options={{ title: 'Ficha' }} />
        <Aviso
          {...mensajeDeError(error)}
          titulo={noEncontrado ? 'Paciente no encontrado' : mensajeDeError(error).titulo}
          detalle={error.message}
          acciones={
            noEncontrado ? [volver] : [{ titulo: 'Reintentar', onPress: reintentar }, volver]
          }
        />
      </ScrollView>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.centro}>
        <Stack.Screen options={{ title: 'Ficha' }} />
        <ActivityIndicator
          size="large"
          color={Colores.primario}
          accessibilityLabel="Cargando ficha"
        />
        <Text style={styles.cargando}>Cargando ficha...</Text>
        {demorado ? (
          <Animated.Text entering={FadeIn.duration(Duracion.lenta)} style={styles.cargandoTexto}>
            El servidor está despertando. Puede tardar hasta un minuto.
          </Animated.Text>
        ) : null}
      </View>
    );
  }

  const detalles = [
    { etiqueta: 'Especie', valor: paciente.especie },
    { etiqueta: 'Raza', valor: paciente.raza },
    { etiqueta: 'Edad', valor: formatearEdad(paciente.edad) },
    { etiqueta: 'Peso', valor: paciente.peso != null ? `${paciente.peso} kg` : undefined },
    { etiqueta: 'N° de atención', valor: paciente.numero_atencion },
    { etiqueta: 'Diagnóstico', valor: paciente.diagnostico || 'Sin diagnóstico' },
    { etiqueta: 'Dueño/a', valor: paciente['dueño'] },
    { etiqueta: 'Teléfono', valor: paciente.telefono },
  ].filter((d): d is { etiqueta: string; valor: string } => !!d.valor);

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Animated.View entering={FadeIn.duration(Duracion.lenta)}>
          <FotoPaciente paciente={paciente} estilo={styles.foto} tamanoIcono={96} />
        </Animated.View>
        <Animated.Text
          entering={FadeInDown.duration(Duracion.normal)}
          style={styles.nombre}
          accessibilityRole="header"
        >
          {paciente.nombre}
        </Animated.Text>
        {detalles.map(({ etiqueta, valor }, indice) => (
          <Animated.View
            key={etiqueta}
            entering={FadeInDown.delay(100 + indice * 50).duration(Duracion.normal)}
            style={styles.fila}
            accessible
            accessibilityLabel={`${etiqueta}: ${valor}`}
          >
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </Animated.View>
        ))}
      </ScrollView>
      <Animated.View
        entering={SlideInDown.duration(Duracion.normal)}
        style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}
      >
        <Boton
          titulo="Registrar visita"
          vibracion="exito"
          accessibilityHint={`Registra una visita de ${paciente.nombre}`}
          onPress={() => Alert.alert('Próximamente', 'Disponible en el Tópico 05')}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: Colores.fondo,
  },
  contenedor: {
    flexGrow: 1,
    padding: Espacio.l,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  foto: {
    width: '100%',
    height: 260,
    borderRadius: Radio.l,
    backgroundColor: Colores.borde,
  },
  nombre: {
    ...Tipografia.titulo,
    color: Colores.primario,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colores.tarjeta,
    padding: Espacio.m,
    borderRadius: Radio.m,
  },
  etiqueta: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
  },
  valor: {
    ...Tipografia.cuerpo,
    flexShrink: 1,
    marginLeft: Espacio.m,
    color: Colores.texto,
    fontWeight: '600',
  },
  centro: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espacio.m,
    padding: Espacio.l,
    backgroundColor: Colores.fondo,
  },
  cargando: {
    ...Tipografia.subtitulo,
    color: Colores.texto,
  },
  cargandoTexto: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    textAlign: 'center',
  },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});
