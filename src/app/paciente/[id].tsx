import { Colores } from "@/constants/colores";
import { pacientesMock } from "@/data/pacientesMock";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function FichaPaciente() {
  const {id} = useLocalSearchParams<{id: string}>();
  const paciente = pacientesMock.find((p) => p.id === Number(id));

  if (!paciente) {
    return <Text style={styles.vacio}>Paciente no encontrado</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Stack.Screen options={{title: paciente.nombre}} />
      <Image source={paciente.foto} style={styles.foto} />
      <Text style={styles.nombre}>{paciente.nombre}</Text>
      {[
        ["Especie", paciente.especie],
        ["Edad", `${paciente.edad} años`],
        ["N° de atención", paciente.numero_atencion],
        ["Diagnóstico", paciente.diagnostico],
      ].map(([etiqueta, valor]) => (
        <View key={etiqueta} style={styles.fila}>
          <Text style={styles.etiqueta}>{etiqueta}</Text>
          <Text style={styles.valor}>{valor}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 20,
    gap: 12,
    backgroundColor: Colores.fondo,
  },
  foto: {width: "100%", height: 260, borderRadius: 16},
  nombre: {fontSize: 26, fontWeight: "bold", color: Colores.primarioOscuro},
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colores.tarjeta,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  etiqueta: {color: Colores.textoSecundario},
  valor: {fontWeight: "600", color: Colores.texto},
  vacio: {padding: 20, textAlign: "center", color: Colores.texto},
});
