import React from "react";
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  CalendarPlus,
  MapPin,
  PencilLine,
  UserRound,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotonRegistrarVisita from "../../../components/BotonRegistrarVisita";
import Skeleton from "react-native-reanimated-skeleton";
import {
  colors,
  radius,
  skeleton,
  spacing,
  typography,
  touchTarget,
} from "../../../constants/tema";
import { usePacientes } from "../../../hooks/usePaciente";

export default function PacienteDetalle() {
  const { id } = useLocalSearchParams();
  const pacienteId = Array.isArray(id) ? id[0] : id;
  const { pacientes, cargando, recargando, error, recargar } = usePacientes();
  const paciente = pacientes.find(
    (item) => item.id.toString() === pacienteId,
  );

  if (cargando) {
    return (
      <SafeAreaView edges={["top"]} style={styles.contenedor}>
        <Skeleton
          isLoading
          containerStyle={skeleton.styles.ficha}
          layout={skeleton.layouts.ficha}
          boneColor={skeleton.boneColor}
          highlightColor={skeleton.highlightColor}
        />
      </SafeAreaView>
    );
  }

  if (error || !paciente) {
    return (
      <SafeAreaView edges={["top"]} style={styles.contenedor}>
        <Text style={styles.sinResultados}>
          {error || "Paciente no encontrado."}
        </Text>
        {error && (
          <Pressable
            onPress={recargar}
            accessibilityRole="button"
            style={styles.botonReintentar}
          >
            <Text style={styles.textoReintentar}>Reintentar</Text>
          </Pressable>
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.contenedor}>
      <View style={styles.encabezado}>
        <Pressable
          onPress={() => router.back()}
          style={({ hovered, pressed }) => [
            styles.botonVolver,
            (hovered || pressed) && styles.botonVolverHover,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Volver"
          hitSlop={8}
        >
          <ArrowLeft size={22} color={colors.petroleo} />
        </Pressable>
        <Text style={styles.titulo}>Ficha del paciente</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContenido}
        refreshControl={
          <RefreshControl
            refreshing={recargando}
            onRefresh={recargar}
            tintColor={colors.petroleo}
            colors={[colors.petroleo]}
          />
        }
      >
        <View style={styles.tarjeta}>
          <View style={styles.hero}>
            <View style={styles.decoracionArriba} />
            <View style={styles.decoracionDerecha} />
            <View style={styles.badgeAtencion}>
              <Text style={styles.textoBadgeAtencion}>{paciente.numero_atencion}</Text>
            </View>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: paciente.foto }}
                style={styles.avatar}
                resizeMode="cover"
                accessibilityLabel={`Foto de ${paciente.nombre}`}
              />
            </View>
            <View style={styles.heroPie}>
              <Text style={styles.nombre}>{paciente.nombre}</Text>
              <Text style={styles.raza}>{paciente.especie} · {paciente.edad}</Text>
            </View>
          </View>

          <View style={styles.datosRapidos}>
            <View style={styles.datoRapido}>
              <Text style={styles.valorDato}>{paciente.especie}</Text>
            </View>
            <View style={[styles.datoRapido, styles.datoSeparado]}>
              <Text style={styles.valorDato}>{paciente.edad}</Text>
            </View>
            <View style={[styles.datoRapido, styles.datoSeparado]}>
              <Text style={styles.valorDato}>{paciente.numero_atencion}</Text>
            </View>
          </View>

          <View style={styles.informacion}>
            <View style={styles.filaInfo}>
              <View style={styles.iconoVerde}>
                <UserRound size={17} color={colors.verde} />
              </View>
              <View style={styles.textoFila}>
                <Text style={styles.etiqueta}>Especie</Text>
                <Text style={styles.valorInfo}>{paciente.especie}</Text>
              </View>
            </View>

            <View style={styles.filaInfo}>
              <View style={styles.iconoVerde}>
                <MapPin size={17} color={colors.verde} />
              </View>
              <View style={styles.textoFila}>
                <Text style={styles.etiqueta}>Edad</Text>
                <Text style={styles.valorInfo}>{paciente.edad}</Text>
              </View>
            </View>

            <View style={[styles.filaInfo, styles.filaDestacada]}>
              <View style={styles.iconoBlanco}>
                <CalendarPlus size={17} color={colors.verde} />
              </View>
              <View style={styles.textoFila}>
                <Text style={styles.etiqueta}>Diagnóstico</Text>
                <Text style={styles.valorInfo}>{paciente.diagnostico}</Text>
              </View>
            </View>

          </View>
          <View style={styles.accionRegistrar}>
            <BotonRegistrarVisita
              accessibilityLabel={`Registrar visita para ${paciente.nombre}`}
            />
          </View>
        </View>
        <Pressable
          style={({ hovered, pressed }) => [
            styles.botonSecundario,
            (hovered || pressed) && styles.botonSecundarioHover,
          ]}
          onPress={() => {}}
          accessibilityRole="button"
          accessibilityLabel={`Volver a la ficha de ${paciente.nombre}`}
        >
          <PencilLine size={18} color={colors.petroleo} />
          <Text style={styles.textoBotonSecundario}>Volver a la ficha</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.crema,
  },
  encabezado: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
  },
  botonVolver: {
    ...touchTarget,
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.blanco,
  },
  botonVolverHover: {
    backgroundColor: colors.lima,
  },
  titulo: {
    ...typography.titleL,
    color: colors.petroleo,
  },
  scrollContenido: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
  },
  tarjeta: {
    borderRadius: radius.md,
    backgroundColor: colors.blanco,
    overflow: "hidden",
  },
  hero: {
    height: 190,
    backgroundColor: colors.petroleo,
  },
  decoracionArriba: {
    position: "absolute",
    top: -76,
    left: -8,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.lima,
  },
  decoracionDerecha: {
    position: "absolute",
    top: -44,
    right: -28,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.lima,
  },
  badgeAtencion: {
    position: "absolute",
    zIndex: 3,
    top: 12,
    left: 12,
    minHeight: 24,
    justifyContent: "center",
    borderRadius: radius.sm,
    backgroundColor: colors.lima,
    paddingHorizontal: spacing.sm,
  },
  textoBadgeAtencion: {
    ...typography.label,
    color: colors.petroleo,
  },
  avatarContainer: {
    position: "absolute",
    zIndex: 2,
    top: 24,
    alignSelf: "center",
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: colors.blanco,
    backgroundColor: colors.blanco,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  heroPie: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 66,
    alignItems: "center",
    backgroundColor: colors.petroleo,
  },
  nombre: {
    marginTop: spacing.md,
    ...typography.titleM,
    color: colors.blanco,
  },
  raza: {
    marginTop: 2,
    ...typography.caption,
    color: colors.blanco,
  },
  datosRapidos: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.blanco,
  },
  datoRapido: {
    flex: 1,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  datoSeparado: {
    borderLeftWidth: 1,
    borderLeftColor: "#A5C4C1",
  },
  valorDato: {
    ...typography.captionSemi,
    color: colors.petroleo,
  },
  informacion: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  filaInfo: {
    minHeight: 48,
    marginBottom: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: radius.pill,
    backgroundColor: "#D9F5D8",
    paddingHorizontal: spacing.sm,
  },
  filaDestacada: {
    backgroundColor: colors.lima,
  },
  iconoVerde: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A9DCA5",
  },
  iconoBlanco: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blanco,
  },
  textoFila: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  etiqueta: {
    ...typography.caption,
    color: colors.petroleo,
  },
  valorInfo: {
    ...typography.caption,
    color: colors.petroleo,
  },
  botonSecundario: {
    alignSelf: "center",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    marginTop: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.petroleo,
    backgroundColor: colors.blanco,
    paddingHorizontal: spacing.md,
  },
  botonSecundarioHover: {
    backgroundColor: colors.lima,
  },
  textoBotonSecundario: {
    ...typography.label,
    color: colors.petroleo,
  },
  accionRegistrar: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sinResultados: {
    marginTop: spacing.xxl,
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
  },
  botonReintentar: {
    minHeight: 44,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  textoReintentar: {
    ...typography.label,
    color: colors.petroleo,
  },
});