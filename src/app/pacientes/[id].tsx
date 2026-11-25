import { View, ScrollView, Text, Image, Alert, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import Boton from "@/components/Boton";
import { pacientesMock } from "@/data/pacientesMock";
import { Colores, Espacio, Radio, Tipografia } from "@/constants/tema";

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const paciente = pacientesMock.find((p) => p.id === Number(id));

  if (!paciente) {
    return <Text style={styles.vacio}>Paciente no encontrado</Text>;
  }

  const registrarVisita = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch((error) =>
      console.warn("Haptics no disponible:", error),
    );
    Alert.alert("Próximamente", "Disponible en el Tópico 05");
  };

  return (
    <View style={styles.pantalla}>
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Stack.Screen options={{ title: paciente.nombre }} />
        <Image source={{ uri: paciente.foto }} style={styles.foto} />
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
      <View
        style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}
      >
        <Boton titulo="Registrar visita" onPress={registrarVisita} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  contenedor: {
    flexGrow: 1,
    padding: Espacio.m,
    gap: Espacio.m,
  },
  foto: { width: "100%", height: 260, borderRadius: Radio.l },
  nombre: { ...Tipografia.titulo, color: Colores.primario },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colores.tarjeta,
    padding: Espacio.m,
    borderRadius: Radio.m,
  },
  etiqueta: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
  valor: { ...Tipografia.cuerpoFuerte, color: Colores.texto },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
  vacio: {
    ...Tipografia.cuerpo,
    padding: Espacio.l,
    textAlign: "center",
    color: Colores.textoSecundario,
  },
});
