import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores, Espacio, Tipografia } from '@/constants/tema';

export default function Visitas() {
  return (
    <View style={styles.contenedor}>
      <Ionicons name="map-outline" size={64} color={Colores.primario} />
      <Text style={styles.titulo}>Visitas a predios</Text>
      <Text style={styles.texto}>Disponible en el Tópico 05</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: Espacio.s, backgroundColor: Colores.fondo,
  },
  titulo: { ...Tipografia.subtitulo, color: Colores.texto },
  texto: { ...Tipografia.cuerpo, color: Colores.textoSecundario },
});