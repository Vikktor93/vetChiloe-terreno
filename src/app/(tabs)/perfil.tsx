import { View, Text, StyleSheet } from 'react-native';
import { Colores, Espacio, Tipografia } from '@/constants/tema';

export default function PerfilScreen() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo} accessibilityRole="header">
        Perfil del Veterinario
      </Text>
      <Text style={styles.subtitulo}>vetChiloé · Atención Rural</Text>
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
  subtitulo: { ...Tipografia.cuerpo, color: Colores.textoSecundario },
});
