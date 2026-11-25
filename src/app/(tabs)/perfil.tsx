import { Colores, Espacio, Tamano, Tipografia } from "@/constants/tema";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar} accessibilityLabel="Foto de perfil">
        <Ionicons
          name="person"
          size={Tamano.icono}
          color={Colores.textoClaro}
        />
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
    width: Tamano.avatar,
    height: Tamano.avatar,
    borderRadius: Tamano.avatar / 2,
    backgroundColor: Colores.primarioOscuro,
    alignItems: "center",
    justifyContent: "center",
  },
  nombre: {...Tipografia.titulo, color: Colores.texto},
  texto: {...Tipografia.cuerpo, color: Colores.textoSecundario},
});
