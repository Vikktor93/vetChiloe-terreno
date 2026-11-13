import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores } from '@/constants/colores';

export default function FichaPacienteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const paciente = pacientesMock.find((p) => p.id.toString() === id);

  if (!paciente) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.error}>Paciente no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.contenedor} contentContainerStyle={styles.contenido}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <Image source={{ uri: paciente.foto }} style={styles.foto} resizeMode="cover" />
      <View style={styles.card}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
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
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: Colores.fondo },
  contenido: { padding: 16, gap: 16 },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colores.fondo },
  error: { fontSize: 16, color: Colores.alerta, fontWeight: 'bold' },
  foto: { width: '100%', height: 220, borderRadius: 16 },
  card: {
    backgroundColor: Colores.tarjeta,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  nombre: { fontSize: 24, fontWeight: 'bold', color: Colores.primario },
  atencion: { fontSize: 14, color: Colores.textoSecundario, marginTop: 2 },
  separador: { height: 1, backgroundColor: Colores.borde, marginVertical: 12 },
  etiqueta: { fontSize: 12, color: Colores.textoSecundario, marginTop: 8, textTransform: 'uppercase' },
  valor: { fontSize: 16, color: Colores.texto, fontWeight: '500', marginTop: 2 },
});
