import { View, Text, FlatList, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';

export default function Index() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.subtitulo}>La clínica verChiloé, ahora en terreno</Text>
      <FlatList
        data={pacientesMock}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: '#F6F2FC' },
  subtitulo: { fontSize: 16, color: '#555', marginBottom: 16 },
});