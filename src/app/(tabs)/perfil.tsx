import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colores, Espacio, Radio, TAMANO_TACTIL, Tipografia } from "@/constants/tema";

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={TAMANO_TACTIL} color={Colores.tarjeta} />
      </View>
      <Text style={styles.nombre}>Tu nombre</Text>
      <Text style={styles.texto}>Médico/a veterinario/a · Terreno</Text>
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
    padding: Espacio.l,
    borderRadius: Radio.l,
    backgroundColor: Colores.primario,
    alignItems: "center",
    justifyContent: "center",
  },
  nombre: { ...Tipografia.titulo, color: Colores.texto },
  texto: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    textAlign: "center",
  },
});
