import { Colores } from "@/constants/colores";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={48} color="#fff" />
      </View>
      <Text style={styles.nombre}>Valentina Calderón</Text>
      <Text style={styles.texto}>Médica veterinaria · Terreno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    gap: 8,
    backgroundColor: Colores.fondo,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colores.primario,
    alignItems: "center",
    justifyContent: "center",
  },
  nombre: {fontSize: 22, fontWeight: "bold", color: Colores.texto},
  texto: {color: Colores.textoSecundario},
});
