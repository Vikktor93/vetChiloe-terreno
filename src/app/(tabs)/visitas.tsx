import { View, Text, StyleSheet } from 'react-native';
import { Colores } from '@/constants/colores';

export default function VisitasScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Visitas en Terreno</Text>
      <Text style={styles.subtitulo}>Próximamente: registro de atenciones rurales.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: Colores.fondo, justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold', color: Colores.primario, marginBottom: 8 },
  subtitulo: { fontSize: 15, color: Colores.textoSecundario, textAlign: 'center' },
});
