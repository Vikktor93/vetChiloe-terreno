import { View, Text, StyleSheet } from 'react-native';
import { Colores, Espacio, Tipografia } from '@/constants/tema';

export default function VisitasScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo} accessibilityRole="header">
        Visitas en Terreno
      </Text>
      <Text style={styles.subtitulo}>Próximamente: registro de atenciones rurales.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: Espacio.m,
    backgroundColor: Colores.fondo,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: { ...Tipografia.titulo, color: Colores.acento, marginBottom: Espacio.s },
  subtitulo: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
});
