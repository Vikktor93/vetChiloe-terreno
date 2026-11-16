import TarjetaPaciente from "@/components/TarjetaPaciente";
import { Colores } from "@/constants/colores";
import { pacientesMock } from "@/data/pacientesMock";
import { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState("");
  const filtrados = pacientesMock.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.subtitulo}>La clínica, ahora en terreno</Text>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente..."
        placeholderTextColor={Colores.textoSecundario}
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({item}) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{gap: 12}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {flex: 1, padding: 16, backgroundColor: Colores.fondo},
  subtitulo: {fontSize: 16, color: Colores.textoSecundario, marginBottom: 12},
  buscador: {
    backgroundColor: Colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colores.borde,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colores.texto,
    marginBottom: 16,
  },
});
