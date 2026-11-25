import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BotonRegistrarVisita from "../../components/BotonRegistrarVisita";
import {
  colors,
  spacing,
  typography,
} from "../../constants/tema";

export default function Visitas() {
  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.contenedor}>
      <View style={styles.contenido}>
        <Text style={styles.titulo}>Visitas</Text>
      </View>
      <View style={styles.barraAccion}>
        <BotonRegistrarVisita />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colors.crema,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  titulo: {
    ...typography.titleXL,
    color: colors.petroleo,
  },
  barraAccion: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
