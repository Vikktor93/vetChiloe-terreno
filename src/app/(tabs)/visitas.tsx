import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores, Espaciado, Tipografia } from '@/constants/tema';

export default function Visitas() {
  return (
    <View style={styles.contenedor}>
      <Ionicons name="map-outline" size={48} color={Colores.primario} />
      <Text style={styles.titulo}>Visitas a predios</Text>
      <Text style={styles.texto}>Disponible en el Tópico 05</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espaciado.sm,
    backgroundColor: Colores.fondo,
    padding: 20,
  },
  titulo: {
    fontSize: Tipografia.encabezado, // 22 (o 20 si prefieres mantenerlo)
    fontWeight: 'bold',
    color: Colores.texto,
  },
  texto: {
    fontSize: Tipografia.cuerpo, // 14
    color: Colores.textoSecundario,
  },
});