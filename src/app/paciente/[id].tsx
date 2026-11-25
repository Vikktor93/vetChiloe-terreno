import Boton from '@/components/Boton';
import { Colors, Spacing } from '@/constants/tema';
import type { Paciente } from '@/data/pacientesMock';
import { obtenerPaciente } from '@/services/api';
import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pacienteId = Array.isArray(id) ? id[0] : id;

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setPaciente(await obtenerPaciente(pacienteId));
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : 'Ocurrió un error inesperado.');
    } finally {
      setCargando(false);
    }
  }, [pacienteId]);

  useEffect(() => {
    void Promise.resolve().then(cargar);
  }, [cargar]);

  if (cargando) {
    return (
      <View style={styles.contenedorVacio}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error || !paciente) {
    return (
      <View style={styles.contenedorVacio}>
        <Text style={styles.texto}>{error ?? 'No encontramos esta ficha clínica.'}</Text>
        {error && <Boton onPress={cargar}>Reintentar</Boton>}
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <ScrollView contentContainerStyle={styles.contenido}>
        <View style={styles.perfil}>
          <View style={styles.avatar} accessible={false}>
            <Text style={styles.inicial}>{paciente.nombre.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.nombre}>{paciente.nombre}</Text>
          <Text style={styles.subtitulo}>{paciente.especie} · {paciente.edad} años</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Identificación</Text>
          <View style={styles.fila}>
            <Text style={styles.etiqueta}>Número de atención</Text>
            <Text style={styles.valor}>{paciente.numero_atencion}</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.etiqueta}>Especie</Text>
            <Text style={styles.valor}>{paciente.especie}</Text>
          </View>
          <View style={styles.fila}>
            <Text style={styles.etiqueta}>Edad</Text>
            <Text style={styles.valor}>{paciente.edad} años</Text>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>Antecedentes recientes</Text>
          <Text style={styles.valor}>{paciente.diagnostico}</Text>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.pie}>
        <Boton
          accessibilityLabel={`Registrar visita para ${paciente.nombre}`}
          onPress={() => Alert.alert('Registrar visita', 'El formulario de registro aún no está disponible.')}
        >
          Registrar visita
        </Boton>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colors.background },
  contenido: { padding: Spacing.md, paddingBottom: Spacing.xl, gap: Spacing.md },
  perfil: { alignItems: 'center', paddingVertical: Spacing.lg },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primarySoft },
  inicial: { color: Colors.primary, fontSize: 32, fontWeight: '700' },
  nombre: { color: Colors.text, fontSize: 24, fontWeight: '700', marginTop: Spacing.md },
  subtitulo: { color: Colors.textSecondary, fontSize: 16, marginTop: Spacing.xs },
  seccion: { gap: Spacing.md, padding: Spacing.md, borderRadius: 8, backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border },
  tituloSeccion: { color: Colors.text, fontSize: 17, fontWeight: '700' },
  fila: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.md },
  etiqueta: { color: Colors.textSecondary, fontSize: 14, flex: 1 },
  valor: { color: Colors.text, fontSize: 15, flexShrink: 1 },
  pie: { paddingHorizontal: Spacing.md, paddingTop: Spacing.sm, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border },
  contenedorVacio: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.lg, backgroundColor: Colors.background },
  texto: { color: Colors.textSecondary, fontSize: 16, textAlign: 'center' },
});