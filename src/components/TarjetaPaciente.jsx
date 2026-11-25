import React from "react";
import { Image, View, Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import {
  colors,
  fontSize,
  radius,
  spacing,
} from "../constants/tema";
import { ChevronRight, Stethoscope } from "lucide-react-native";

export default function TarjetaPaciente({ paciente }) {
  return (
    <Pressable
      onPress={() => router.push(`/(tabs)/pacientes/${paciente.id}`)}
      style={styles.tarjeta}
      accessibilityRole="button"
      accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
    >
      <Image
        source={{ uri: paciente.foto }}
        style={styles.imagen}
        resizeMode="cover"
        accessibilityLabel={`Foto de ${paciente.nombre}`}
      />
      <View style={styles.informacion}>
        <Text style={styles.nombre} numberOfLines={1}>
          {paciente.nombre}
        </Text>
        <Text style={styles.detalle} numberOfLines={1}>
          {paciente.especie} · {paciente.edad} años
        </Text>
        <View style={styles.diagnostico}>
          <Stethoscope size={16} color={colors.verde} />
          <Text style={styles.detalle} numberOfLines={1}>
            {paciente.diagnostico}
          </Text>
        </View>
      </View>
      <View style={styles.lateral}>
        <View style={styles.badge}>
          <Text style={styles.textoBadge}>{paciente.numero_atencion}</Text>
        </View>
        <ChevronRight size={22} color={colors.petroleo} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    minHeight: 96,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.blanco,
    borderColor: colors.petroleo,
    borderWidth: 1,
    borderRadius: radius.md,
  },
  imagen: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 28,
    backgroundColor: colors.lima,
  },
  informacion: {
    flex: 1,
    gap: spacing.xs,
  },
  nombre: {
    color: colors.petroleo,
    fontSize: fontSize.body,
    fontWeight: "700",
  },
  detalle: {
    flexShrink: 1,
    color: colors.textMuted,
    fontSize: fontSize.caption,
  },
  diagnostico: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  lateral: {
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingVertical: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.lima,
  },
  textoBadge: {
    color: colors.petroleo,
    fontSize: fontSize.caption,
    fontWeight: "700",
  },
});
