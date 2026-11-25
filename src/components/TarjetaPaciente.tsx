import FotoPaciente from "@/components/FotoPaciente";
import { Colores, Espacio, Radio, Tipografia } from "@/constants/tema";
import { Paciente } from "@/data/pacientesMock";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {paciente: Paciente};

export default function TarjetaPaciente({paciente}: Props) {
  return (
    <Link
      href={{pathname: "/paciente/[id]", params: {id: paciente.id}}}
      asChild
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
        accessibilityHint="Abre la ficha clínica"
      >
        {/* el estilo va en un View adentro, porque Link asChild no pasa bien el style de Pressable */}
        {({pressed}) => (
          <View style={[styles.tarjeta, pressed && styles.presionada]}>
            <FotoPaciente paciente={paciente} style={styles.foto} />
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
    gap: Espacio.m,
    padding: Espacio.m,
    borderRadius: Radio.m,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  presionada: {opacity: 0.7},
  foto: {width: 64, height: 64, borderRadius: 32},
  info: {flex: 1},
  nombre: {...Tipografia.subtitulo, color: Colores.primarioOscuro},
  datos: {...Tipografia.cuerpo, color: Colores.texto},
  atencion: {...Tipografia.etiqueta, color: Colores.textoSecundario},
});
