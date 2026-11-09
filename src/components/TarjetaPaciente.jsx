import { Image, StyleSheet, Text, View } from "react-native";
import { pacientesMock } from "../data/pacientesMocks";

const pacientes = pacientesMock;

function TarjetaPaciente({ paciente = pacientes }) {
  return (
    <View style={styles.tarjeta}>
      <Image style={styles.imagen} source={{ uri: paciente.foto }} />
      <View styles={styles.informacion}>
        <Text style={styles.textos}> {paciente.nombre}</Text>
        <Text style={styles.textos}> {paciente.edad}</Text>
        <Text style={styles.textos}> {paciente.numero_atencion}</Text>
      </View>
    </View>
  );
}

export default TarjetaPaciente;

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F5F2EB",
    borderColor: "#D4AF37",
    borderWidth: 2,
    borderRadius: 25,
  },
  textos: {
    color: "#2F3136",
  },
  imagen: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  informacion: {
    flexDirection: "row",
    width: "full",
  },
});
