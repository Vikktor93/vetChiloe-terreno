import { useState } from "react";
import { View, TextInput, FlatList, StyleSheet } from "react-native";
import TarjetaPaciente from "@/components/TarjetaPaciente";
import { pacientesMock } from "@/data/pacientesMock";
import {
  Colores,
  Espacio,
  Radio,
  TAMANO_TACTIL,
  Tipografia,
} from "@/constants/tema";

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
        placeholderTextColor={Colores.textoSecundario}
        accessibilityLabel="Buscar paciente por nombre"
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  buscador: {
    ...Tipografia.cuerpo,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta,
    borderRadius: Radio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
    color: Colores.texto,
    paddingHorizontal: Espacio.m,
    marginBottom: Espacio.m,
  },
  lista: { gap: Espacio.m },
});
