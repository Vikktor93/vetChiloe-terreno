import { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  PawPrint,
  Plus,
  Search,
} from "lucide-react-native";
import * as Haptics from "expo-haptics";
import { colors, fontSize, layout, radius, shadow, spacing } from "../../../constants/tema";
import { pacientesMock } from "../../../data/pacientesMocks";
import TarjetaPaciente from "../../../components/TarjetaPaciente"

const filtros = ["Todos", "Perros", "Gatos", "Otros"];

const especiesPorFiltro = {
  Perros: "Canino",
  Gatos: "Felino",
};

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroActivo, setFiltroActivo] = useState("Todos");

  const vibrarAlAgregarPaciente = () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch((error) => {
      console.error("No se pudo ejecutar la respuesta háptica al agregar paciente.", error);
    });
  };

  const pacientesFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase();
    const especie = especiesPorFiltro[filtroActivo];

    return pacientesMock.filter((paciente) => {
      const coincideFiltro =
        filtroActivo === "Todos" ||
        (especie
          ? paciente.especie === especie
          : !Object.values(especiesPorFiltro).includes(paciente.especie));
      const coincideBusqueda =
        !termino ||
        [
          paciente.nombre,
          paciente.especie,
          paciente.diagnostico,
          paciente.numero_atencion,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(termino);

      return coincideFiltro && coincideBusqueda;
    });
  }, [busqueda, filtroActivo]);

  return (
    <SafeAreaView edges={["top"]} style={styles.contenedor}>
      <FlatList
        data={pacientesFiltrados}
        keyExtractor={(paciente) => paciente.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        ListHeaderComponent={
          <View>
            <View style={styles.encabezado}>
              <View>
                <Text style={styles.titulo}>Pacientes</Text>
                <Text style={styles.subtitulo}>
                  {pacientesMock.length} pacientes registrados
                </Text>
              </View>
            </View>

            <View style={styles.busqueda}>
              <Search size={20} color={colors.petroleo} />
              <TextInput
                value={busqueda}
                onChangeText={setBusqueda}
                placeholder="Buscar paciente"
                placeholderTextColor={colors.textMuted}
                style={styles.campoBusqueda}
                accessibilityLabel="Buscar paciente"
                returnKeyType="search"
              />
            </View>

            <FlatList
              horizontal
              data={filtros}
              keyExtractor={(filtro) => filtro}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filtros}
              renderItem={({ item }) => {
                const activo = item === filtroActivo;
                return (
                  <Pressable
                    onPress={() => setFiltroActivo(item)}
                    style={[styles.chip, activo && styles.chipActivo]}
                    accessibilityRole="button"
                    accessibilityLabel={item}
                    accessibilityState={{ selected: activo }}
                  >
                    {item === "Todos" && (
                      <PawPrint
                        size={14}
                        color={activo ? colors.blanco : colors.petroleo}
                      />
                    )}
                    <Text
                      style={[
                        styles.textoChip,
                        activo && styles.textoChipActivo,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
            />
          </View>
        }
        ListEmptyComponent={
          <Text style={styles.sinResultados}>
            No se encontraron pacientes.
          </Text>
        }
      />
      <Pressable
        style={({ hovered, pressed }) => [
          shadow,
          styles.botonAgregar,
          layout.fab,
          (hovered || pressed) && styles.botonAgregarHover,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Agregar paciente"
        onPress={vibrarAlAgregarPaciente}
      >
        <Plus size={24} color={colors.blanco} />
      </Pressable>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.crema,
  },
  lista: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: 88 + spacing.xl,
  },
  encabezado: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  titulo: {
    color: colors.petroleo,
    fontSize: fontSize.titleXL,
    fontWeight: "700",
  },
  subtitulo: {
    color: colors.textMuted,
    fontSize: fontSize.caption,
    marginTop: spacing.xs,
  },
  botonAgregar: {
    zIndex: 10,
  },
  botonAgregarHover: {
    backgroundColor: colors.petroleo,
  },
  busqueda: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.blanco,
    borderColor: colors.petroleo,
    borderWidth: 1,
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  campoBusqueda: {
    flex: 1,
    color: colors.petroleo,
    fontSize: fontSize.caption,
    paddingVertical: 10,
  },
  filtros: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  chip: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.blanco,
    borderColor: colors.petroleo,
    borderWidth: 1,
    borderRadius: radius.pill,
  },
  chipActivo: {
    backgroundColor: colors.verde,
    borderColor: colors.verde,
  },
  textoChip: {
    color: colors.petroleo,
    fontSize: fontSize.caption,
  },
  textoChipActivo: {
    color: colors.blanco,
  },
  separador: {
    height: spacing.md,
  },
  sinResultados: {
    paddingVertical: spacing.xxl,
    color: colors.textMuted,
    textAlign: "center",
    fontSize: fontSize.body,
  },
});