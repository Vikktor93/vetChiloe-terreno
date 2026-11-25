import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Boton from '@/components/Boton';
import { Paciente } from '@/data/pacientesMock';
import { obtenerPaciente } from '@/services/api';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

type Resultado = { id: string; paciente?: Paciente; error?: string };

export default function FichaPacienteScreen() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  // Guardamos el resultado junto al id al que corresponde.
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [intento, setIntento] = useState(0);

  // GET /api/pacientes/:id cada vez que cambia el id (o se reintenta)
  useEffect(() => {
    let activo = true;
    obtenerPaciente(id)
      .then((p) => activo && setResultado({ id, paciente: p }))
      .catch(
        (e) =>
          activo &&
          setResultado({ id, error: e instanceof Error ? e.message : 'Error desconocido' })
      );
    return () => {
      activo = false;
    };
  }, [id, intento]);

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
      <View style={styles.centrado}>
        <Stack.Screen options={{ title: 'Ficha del Paciente' }} />
        <Text style={styles.error} accessibilityRole="alert">
          No se pudo cargar la ficha.
        </Text>
        <Text style={styles.detalleError}>{error}</Text>
        <Boton titulo="Reintentar" onPress={reintentar} />
        <Boton titulo="Volver" variante="secundario" onPress={() => router.back()} />
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={Colores.acento} />
        <Text style={styles.mensaje}>Cargando ficha...</Text>
      </View>
    );
  }

  const registrarVisita = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Próximamente', 'Disponible en el Tópico 05');
  };

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <ScrollView contentContainerStyle={styles.contenido}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          resizeMode="cover"
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <View style={styles.card}>
          <Text style={styles.nombre} accessibilityRole="header">
            {paciente.nombre}
          </Text>
          <Text style={styles.atencion}>Atención N° {paciente.numero_atencion}</Text>
          <View style={styles.separador} />
          <Text style={styles.etiqueta}>Especie</Text>
          <Text style={styles.valor}>{paciente.especie}</Text>
          <Text style={styles.etiqueta}>Edad</Text>
          <Text style={styles.valor}>{paciente.edad} años</Text>
          <Text style={styles.etiqueta}>Diagnóstico / Motivo</Text>
          <Text style={styles.valor}>{paciente.diagnostico}</Text>
        </View>
      </ScrollView>

      {/* Acción principal fija abajo: zona del pulgar */}
      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton
          titulo="Registrar visita"
          onPress={registrarVisita}
          accessibilityHint={`Registra una visita para ${paciente.nombre}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  contenido: { padding: Espacio.m, gap: Espacio.m },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Espacio.l,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
  error: { ...Tipografia.subtitulo, color: Colores.alerta, textAlign: 'center' },
  detalleError: { ...Tipografia.etiqueta, color: Colores.textoSecundario, textAlign: 'center' },
  foto: { width: '100%', height: 220, borderRadius: Radio.l },
  card: {
    backgroundColor: Colores.tarjeta,
    borderRadius: Radio.l,
    padding: Espacio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  nombre: { ...Tipografia.titulo, color: Colores.acento },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario, marginTop: Espacio.xs },
  separador: { height: 1, backgroundColor: Colores.borde, marginVertical: Espacio.m },
  etiqueta: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
    marginTop: Espacio.s,
    textTransform: 'uppercase',
  },
  valor: { ...Tipografia.cuerpo, fontWeight: '500', color: Colores.texto, marginTop: Espacio.xs },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});
