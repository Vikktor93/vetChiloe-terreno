import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { TarjetaPaciente } from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>ATENCIÓN VETERINARIA</Text>
          <Text style={styles.title}>vetChiloé</Text>
          <Text style={styles.subtitle}>en Terreno</Text>
          <Text style={styles.description}>
            Tus pacientes, siempre a mano.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Pacientes de ejemplo</Text>
            <Text style={styles.sectionSubtitle}>Atenciones recientes</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{pacientesMock.length}</Text>
          </View>
        </View>

        <View style={styles.patientList}>
          {pacientesMock.map((paciente) => (
            <TarjetaPaciente
              key={paciente.id}
              nombre={paciente.nombre}
              especie={paciente.especie}
              foto={paciente.foto}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F8F5',
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 36,
  },
  header: {
    backgroundColor: '#174C3C',
    borderRadius: 24,
    padding: 24,
    marginBottom: 30,
  },
  eyebrow: {
    color: '#B9D9C9',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  subtitle: {
    color: '#D5E9DD',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 1,
  },
  description: {
    color: '#D5E9DD',
    fontSize: 14,
    marginTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#18352B',
    fontSize: 20,
    fontWeight: '700',
  },
  sectionSubtitle: {
    color: '#718078',
    fontSize: 13,
    marginTop: 4,
  },
  countBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCEBE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#174C3C',
    fontSize: 14,
    fontWeight: '700',
  },
  patientList: {
    gap: 12,
  },
});
