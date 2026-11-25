import Boton from '@/components/Boton';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { Colors, Spacing } from '@/constants/tema';
import { usePacientes } from '@/hooks/usePacientes';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';


export default function Index() {
  const { pacientes, cargando, refrescando, error, reintentar, actualizar } = usePacientes();

  return (
    <View style={styles.contenedor}>
      <FlatList
        data={pacientes}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        ListHeaderComponent={(
          <View style={styles.encabezado}>
            <Text style={styles.titulo}>Pacientes</Text>
            <Text style={styles.subtitulo}>Fichas clínicas recientes</Text>
            {error && pacientes.length > 0 && (
              <View style={styles.mensajeError}>
                <Text style={styles.textoError}>{error}</Text>
                <Boton variante="secundaria" onPress={reintentar}>Reintentar</Boton>
              </View>
            )}
          </View>
        )}
        contentContainerStyle={styles.lista}
        refreshControl={(
          <RefreshControl
            refreshing={refrescando}
            onRefresh={actualizar}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        )}
        ListEmptyComponent={(
          <View style={styles.estado}>
            {cargando ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : error ? (
              <>
                <Text style={styles.textoEstado}>{error}</Text>
                <Boton onPress={reintentar}>Reintentar</Boton>
              </>
            ) : (
              <Text style={styles.textoEstado}>Aún no hay pacientes registrados.</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, paddingHorizontal: Spacing.md, backgroundColor: Colors.background },
  lista: { gap: Spacing.sm, paddingBottom: Spacing.xl },
  encabezado: { paddingTop: Spacing.lg, paddingBottom: Spacing.md },
  titulo: { fontSize: 26, fontWeight: '700', color: Colors.text },
  subtitulo: { fontSize: 16, color: Colors.textSecondary, marginTop: Spacing.xs },
  estado: { alignItems: 'center', gap: Spacing.md, paddingVertical: Spacing.xl },
  textoEstado: { color: Colors.textSecondary, fontSize: 16, textAlign: 'center' },
  mensajeError: { gap: Spacing.sm, marginTop: Spacing.md },
  textoError: { color: Colors.danger, fontSize: 15 },
});


