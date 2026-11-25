import { Colores } from "@/constants/tema";
import { Paciente } from "@/data/pacientesMock";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, ImageStyle, StyleSheet, View } from "react-native";

type Props = {paciente: Paciente; style: ImageStyle};

// fotos locales por especie, sirven sin conexion
function fotoPorEspecie(especie: string) {
  const texto = especie.toLowerCase();
  if (texto.includes("gato")) return require("@/assets/pacientes/michi.jpg");
  if (texto.includes("ping")) return require("@/assets/pacientes/poi.jpg");
  return null;
}

export default function FotoPaciente({paciente, style}: Props) {
  const foto = paciente.foto ?? "";

  // si la api trae una foto de verdad (url o subida) se usa esa
  if (foto.startsWith("http") || foto.startsWith("data:")) {
    return <Image source={{uri: foto}} style={style} />;
  }

  const local = fotoPorEspecie(paciente.especie);
  if (local) {
    return <Image source={local} style={style} />;
  }

  // si no hay ninguna, una patita
  return (
    <View style={[style, styles.sinFoto]}>
      <Ionicons name="paw" size={32} color={Colores.acentoOscuro} />
    </View>
  );
}

const styles = StyleSheet.create({
  sinFoto: {
    backgroundColor: Colores.acento,
    alignItems: "center",
    justifyContent: "center",
  },
});
