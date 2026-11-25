import Boton from "@/components/Boton";
import { Colores, Espacio, Radio, Tipografia } from "@/constants/tema";
import { pacientesMock } from "@/data/pacientesMock";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams } from "expo-router";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const {id} = useLocalSearchParams<{id: string}>();
  const paciente = pacientesMock.find((p) => p.id === Number(id));

  if (!paciente) {
    return <Text style={styles.vacio}>Paciente no encontrado</Text>;
  }

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{title: paciente.nombre}} />
      <ScrollView contentContainerStyle={styles.contenedor}>
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

      {/* accion principal fija abajo, en la zona del pulgar */}
      <View
        style={[styles.acciones, {paddingBottom: insets.bottom + Espacio.m}]}
      >
        <Boton
          titulo="Registrar visita"
          onPress={() => {
            // vibracion breve para confirmar el toque
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            Alert.alert("Próximamente", "Disponible en el Tópico 05");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {flex: 1, backgroundColor: Colores.fondo},
  contenedor: {padding: Espacio.l, gap: Espacio.m},
  foto: {width: "100%", height: 260, borderRadius: Radio.l},
  nombre: {...Tipografia.titulo, color: Colores.primarioOscuro},
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colores.tarjeta,
    padding: Espacio.m,
    borderRadius: Radio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  etiqueta: {...Tipografia.cuerpo, color: Colores.textoSecundario},
  valor: {...Tipografia.cuerpo, fontWeight: "600", color: Colores.texto},
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
    color: Colores.texto,
  },
});
