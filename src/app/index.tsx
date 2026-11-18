import { FlatList, StyleSheet, View } from 'react-native';
import { pacientesMock } from '@/data/pacientesMock'; // <-- Pon aquí el nombre exacto de tu archivo
import TarjetaPaciente from '@/components/TarjetaPaciente';

export default function Index() {
  return (
    <View style={styles.container}>
      <FlatList
        data={pacientesMock} // <-- Y aquí el mismo nombre
        keyExtractor={(item, index) => (item.id ? String(item.id) : String(index))}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F5FA' },
  lista: { padding: 16, gap: 12 },
});