import { Colores } from "@/constants/colores";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colores.fondo,
  },
  titulo: {fontSize: 20, fontWeight: "bold", color: Colores.texto},
  texto: {color: Colores.textoSecundario},
});
