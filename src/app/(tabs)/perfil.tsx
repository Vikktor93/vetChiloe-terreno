import { Colores, Espacio, Tipografia } from "@/constants/tema";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar} accessibilityLabel="Foto de perfil">
        <Ionicons name="person" size={48} color={Colores.textoClaro} />
      </View>
      <Text style={styles.nombre} accessibilityRole="header">
        Valentina Calderón
      </Text>
      <Text style={styles.texto}>Médica veterinaria · Terreno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: "center",
    paddingTop: Espacio.xl,
    gap: Espacio.s,
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
  nombre: {...Tipografia.titulo, color: Colores.texto},
  texto: {...Tipografia.cuerpo, color: Colores.textoSecundario},
});
