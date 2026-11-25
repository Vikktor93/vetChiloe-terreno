import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Colores,
  Espaciado,
  Tamanos,
  Tipografia,
} from '@/constants/tema';

export default function Visitas() {
  return (
    <View style={styles.contenedor}>
      <Ionicons
        name="map-outline"
        size={Tamanos.iconoPantalla}
        color={Colores.primario}
      />
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
    padding: Espaciado.xl,
  },
  titulo: {
    fontSize: Tipografia.encabezado,
    fontWeight: 'bold',
    color: Colores.texto,
  },
  texto: {
    fontSize: Tipografia.cuerpo,
    color: Colores.textoSecundario,
  },
});