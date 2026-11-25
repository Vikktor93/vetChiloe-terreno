import { Alert, Pressable, StyleSheet, Text } from "react-native";
import { Plus } from "lucide-react-native";
import * as Haptics from "expo-haptics";
import {
  colors,
  radius,
  spacing,
  typography,
} from "../constants/tema";

export default function BotonRegistrarVisita({
  accessibilityLabel = "Registrar visita",
}) {
  const alPresionar = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((error) => {
      console.error(
        "No se pudo ejecutar la respuesta háptica al registrar visita.",
        error,
      );
    });
    Alert.alert("Módulo próximamente disponible");
  };

  return (
    <Pressable
      style={({ hovered, pressed }) => [
        styles.boton,
        (hovered || pressed) && styles.botonPresionado,
      ]}
      onPress={alPresionar}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
    >
      <Plus size={24} color={colors.blanco} />
      <Text style={styles.texto}>Registrar visita</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.verde,
  },
  botonPresionado: {
    backgroundColor: colors.petroleo,
  },
  texto: {
    ...typography.button,
    color: colors.blanco,
  },
});
