import { Colores } from "@/constants/colores";
import { Paciente } from "@/data/pacientesMock";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {paciente: Paciente};

export default function TarjetaPaciente({paciente}: Props) {
  return (
    <Link
      href={{pathname: "/paciente/[id]", params: {id: paciente.id}}}
      asChild
    >
      <Pressable>
        {/* el estilo va en un View adentro, porque Link asChild no pasa bien el style de Pressable */}
        {({pressed}) => (
          <View style={[styles.tarjeta, pressed && styles.presionada]}>
            <Image source={paciente.foto} style={styles.foto} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{paciente.nombre}</Text>
              <Text style={styles.datos}>
                {paciente.especie} · {paciente.edad} años
              </Text>
              <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  presionada: {opacity: 0.7},
  foto: {width: 64, height: 64, borderRadius: 32},
  info: {flex: 1},
  nombre: {fontSize: 18, fontWeight: "bold", color: Colores.primarioOscuro},
  datos: {color: Colores.texto},
  atencion: {color: Colores.textoSecundario, fontSize: 12},
});
