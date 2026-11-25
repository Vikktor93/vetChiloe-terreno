import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Paciente } from "@/data/pacientesMock";
import {
  Colores,
  Espacio,
  Radio,
  TAMANO_TACTIL,
  Tipografia,
} from "@/constants/tema";

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <Link
      href={{ pathname: "/pacientes/[id]", params: { id: paciente.id } }}
      asChild
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
        accessibilityHint="Abre la ficha clínica del paciente"
        style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}
      >
        <Image source={{ uri: paciente.foto }} style={styles.foto} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{paciente.nombre}</Text>
          <Text style={styles.detalle}>
            {paciente.especie} · {paciente.edad} años
          </Text>
          <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    minHeight: TAMANO_TACTIL,
    flexDirection: "row",
    alignItems: "center",
    gap: Espacio.s,
    padding: Espacio.m,
    borderRadius: Radio.m,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  foto: { width: TAMANO_TACTIL, height: TAMANO_TACTIL, borderRadius: Radio.m },
  info: { flex: 1, gap: Espacio.xs },
  nombre: { ...Tipografia.subtitulo, color: Colores.primario },
  detalle: { ...Tipografia.cuerpo, color: Colores.texto },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
  presionada: { opacity: 0.7 },
});
