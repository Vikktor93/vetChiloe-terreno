import { useState } from "react";
import { View, TextInput, FlatList, StyleSheet } from "react-native";
import TarjetaPaciente from "@/components/TarjetaPaciente";
import { pacientesMock } from "@/data/pacientesMock";
import { Colores } from "@/constants/colores";
export default function Pacientes() {
  const [busqueda, setBusqueda] = useState("");
  const filtrados = pacientesMock.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );
  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente…"
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{ gap: 12 }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 16, backgroundColor: Colores.fondo },
  buscador: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colores.borde,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
});
