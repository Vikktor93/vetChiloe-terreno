import { Colores, Espacio, Tipografia } from "@/constants/tema";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function Visitas() {
  return (
    <View style={styles.contenedor}>
      {/* el icono es decorativo, el lector de pantalla lo salta */}
      <Ionicons
        name="map-outline"
        size={64}
        color={Colores.primario}
        accessibilityElementsHidden
        importantForAccessibility="no"
      />
      <Text style={styles.titulo} accessibilityRole="header">
        Visitas a predios
      </Text>
      <Text style={styles.texto}>Disponible en el Tópico 05</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Espacio.s,
    backgroundColor: Colores.fondo,
  },
  titulo: {...Tipografia.titulo, color: Colores.texto},
  texto: {...Tipografia.cuerpo, color: Colores.textoSecundario},
});
