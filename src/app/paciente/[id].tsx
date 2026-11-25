import Boton from "@/components/Boton";
import FotoPaciente from "@/components/FotoPaciente";
import { Colores, Espacio, Radio, Tipografia } from "@/constants/tema";
import { Paciente } from "@/data/pacientesMock";
import { obtenerPaciente } from "@/services/api";
import * as Haptics from "expo-haptics";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator, Alert, ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const {id} = useLocalSearchParams<{id: string}>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // si el usuario sale antes de que responda, no se actualiza el estado
    let activo = true;
    obtenerPaciente(id)
      .then((p) => activo && setPaciente(p))
      .catch((e) => activo && setError(e.message));
    return () => {
      activo = false;
    };
  }, [id]);

  if (error) {
    return (
      <Text style={styles.vacio}>
        No se pudo cargar la ficha. Revisa tu conexión.
      </Text>
    );
  }
  if (!paciente) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colores.primarioOscuro} />
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{title: paciente.nombre}} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <FotoPaciente paciente={paciente} style={styles.foto} />
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <View
          style={styles.diagnostico}
          accessible
          accessibilityLabel={`Diagnóstico: ${paciente.diagnostico}`}
        >
          <Text style={styles.diagnosticoEtiqueta}>Diagnóstico</Text>
          <Text style={styles.diagnosticoTexto}>{paciente.diagnostico}</Text>
        </View>
        {[
          ["Especie", paciente.especie],
          ["Edad", `${paciente.edad} años`],
          ["N° de atención", paciente.numero_atencion],
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
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colores.fondo,
  },
  contenedor: {padding: Espacio.l, gap: Espacio.m},
  foto: {width: "100%", height: 260, borderRadius: Radio.l},
  nombre: {...Tipografia.titulo, color: Colores.primarioOscuro},
  // el diagnostico va destacado en naranja, es lo primero que se mira
  diagnostico: {
    backgroundColor: Colores.acento,
    padding: Espacio.m,
    borderRadius: Radio.m,
    gap: Espacio.xs,
  },
  diagnosticoEtiqueta: {...Tipografia.etiqueta, color: Colores.acentoOscuro},
  diagnosticoTexto: {...Tipografia.subtitulo, color: Colores.acentoOscuro},
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
    flex: 1,
    padding: Espacio.l,
    textAlign: "center",
    color: Colores.texto,
    backgroundColor: Colores.fondo,
  },
});
