import TarjetaPaciente from "@/components/TarjetaPaciente";
import {
  Colores,
  Espacio,
  Radio,
  TAMANO_TACTIL,
  Tipografia,
} from "@/constants/tema";
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
        accessibilityLabel="Buscar paciente por nombre"
      />
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({item}) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo},
  subtitulo: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    marginBottom: Espacio.m,
  },
  buscador: {
    ...Tipografia.cuerpo,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta,
    borderRadius: Radio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
    paddingHorizontal: Espacio.m,
    color: Colores.texto,
    marginBottom: Espacio.m,
  },
  lista: {gap: Espacio.m, paddingBottom: Espacio.m},
});
