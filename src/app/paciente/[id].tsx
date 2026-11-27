import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, View, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Boton from '@/components/Boton';
import FotoPaciente from '@/components/FotoPaciente';
import { obtenerPaciente } from '@/services/api';
import { formatearEdad, type Paciente } from '@/types/paciente';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // los hooks van antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0); // cambia para volver a pedir

  useEffect(() => {
    let activo = true; // evita actualizar la pantalla si el usuario ya volvió atrás
    setError(null);
    obtenerPaciente(id)
      .then((p) => activo && setPaciente(p))
      .catch((e: Error) => activo && setError(e.message));
    return () => { activo = false; };
  }, [id, intento]);

  if (error) {
    const noExiste = error.startsWith('Error 404');
    return (
      <View style={styles.centro}>
        <Stack.Screen options={{ title: 'Ficha' }} />
        <Text style={styles.vacio}>
          {noExiste ? 'Paciente no encontrado' : 'No se pudo cargar la ficha. Revisa tu conexión.'}
        </Text>
        {!noExiste && <Boton titulo="Reintentar" icono="refresh" onPress={() => setIntento((n) => n + 1)} />}
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colores.primario} />
      </View>
    );
  }

  function registrarVisita() {
    // Reto opcional: vibración breve al tocar la acción principal
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Próximamente', 'El registro de visitas estará disponible en una próxima actualización.');
  }

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <FotoPaciente uri={paciente.foto} nombre={paciente.nombre} style={styles.foto} tamanoIcono={72} />
        <Text style={styles.nombre} accessibilityRole="header">{paciente.nombre}</Text>
        {[
          ['Especie', paciente.especie],
          ['Edad', formatearEdad(paciente.edad)],
          ['N° de atención', paciente.numero_atencion],
          ['Diagnóstico', paciente.diagnostico ?? 'Sin diagnóstico'],
        ].map(([etiqueta, valor]) => (
          <View key={etiqueta} style={styles.fila} accessible accessibilityLabel={`${etiqueta}: ${valor}`}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Acción principal fija abajo: en la zona del pulgar */}
      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton titulo="Registrar visita" icono="clipboard-outline" onPress={registrarVisita} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  centro: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: Espacio.m, padding: Espacio.l, backgroundColor: Colores.fondo,
  },
  contenedor: { padding: Espacio.l, gap: Espacio.m },
  foto: { width: '100%', height: 260, borderRadius: Radio.l },
  nombre: { ...Tipografia.titulo, fontSize: 26, color: Colores.primario },
  fila: {
    flexDirection: 'row', justifyContent: 'space-between', gap: Espacio.m,
    backgroundColor: Colores.tarjeta, padding: Espacio.m, borderRadius: Radio.m,
  },
  etiqueta: { ...Tipografia.cuerpo, color: Colores.textoSecundario },
  valor: { ...Tipografia.cuerpo, fontWeight: '600', color: Colores.texto, flexShrink: 1, textAlign: 'right' },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
  vacio: { ...Tipografia.cuerpo, padding: Espacio.l, textAlign: 'center', color: Colores.texto },
});
