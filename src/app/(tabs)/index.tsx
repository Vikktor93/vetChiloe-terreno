import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TarjetaPaciente from "@/components/TarjetaPaciente";
import Boton from "@/components/Boton";
import { usePacientes } from "@/hooks/usePacientes";
import {
  Colores,
  Espacio,
  Radio,
  TAMANO_TACTIL,
  Tipografia,
} from "@/constants/tema";

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState("");
  const { pacientes, cargando, error, recargar } = usePacientes();

  const termino = busqueda.trim().toLowerCase();
  const filtrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(termino),
  );

  if (cargando && pacientes.length === 0) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator
          size="large"
          color={Colores.primario}
          accessibilityLabel="Cargando pacientes"
        />
        <Text style={styles.aviso}>Cargando pacientes…</Text>
      </View>
    );
  }

  if (error !== null && pacientes.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.error}>{error}</Text>
        <Boton titulo="Reintentar" onPress={recargar} />
      </View>
    );
  }

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
      {error !== null && (
        <View style={styles.banda}>
          <Text style={styles.error}>{error}</Text>
          <Boton titulo="Reintentar" onPress={recargar} />
        </View>
      )}
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={
          <Text style={styles.aviso}>
            {termino ? "Sin resultados" : "No hay pacientes"}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  centrado: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Espacio.m,
    padding: Espacio.m,
    backgroundColor: Colores.fondo,
  },
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
  banda: { gap: Espacio.s, marginBottom: Espacio.m },
  aviso: {
    ...Tipografia.cuerpo,
    textAlign: "center",
    color: Colores.textoSecundario,
  },
  error: {
    ...Tipografia.cuerpoFuerte,
    textAlign: "center",
    color: Colores.alerta,
  },
});
