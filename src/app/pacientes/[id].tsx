import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import Boton from "@/components/Boton";
import { obtenerPaciente } from "@/services/api";
import type { Paciente } from "@/types/paciente";
import {
  Colores,
  Espacio,
  Radio,
  TAMANO_TACTIL,
  Tipografia,
} from "@/constants/tema";

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let activo = true;

    obtenerPaciente(id)
      .then((datos) => {
        if (activo) setPaciente(datos);
      })
      .catch((e: unknown) => {
        if (activo) {
          setError(
            e instanceof Error ? e.message : "No se pudo cargar el paciente.",
          );
        }
      });

    return () => {
      activo = false;
    };
  }, [id, intento]);

  if (error !== null) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.vacio}>{error}</Text>
        <Boton
          titulo="Reintentar"
          onPress={() => {
            setError(null);
            setIntento((n) => n + 1);
          }}
        />
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator
          size="large"
          color={Colores.primario}
          accessibilityLabel="Cargando ficha del paciente"
        />
      </View>
    );
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
        {paciente.foto ? (
          <Image source={{ uri: paciente.foto }} style={styles.foto} />
        ) : (
          <View style={[styles.foto, styles.fotoVacia]}>
            <Ionicons
              name="paw"
              size={TAMANO_TACTIL}
              color={Colores.textoSecundario}
            />
          </View>
        )}
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
  fotoVacia: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Espacio.m,
    padding: Espacio.m,
    backgroundColor: Colores.fondo,
  },
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
