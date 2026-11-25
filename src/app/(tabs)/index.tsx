import Boton from "@/components/Boton";
import TarjetaPaciente from "@/components/TarjetaPaciente";
import {
  Colores,
  Espacio,
  Radio,
  TAMANO_TACTIL,
  Tipografia,
} from "@/constants/tema";
import { usePacientes } from "@/hooks/usePacientes";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Pacientes() {
  const {pacientes, cargando, error, recargar} = usePacientes();
  const [busqueda, setBusqueda] = useState("");
  const filtrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // primera carga: render puede tardar casi un minuto si estaba dormido
  if (cargando && pacientes.length === 0) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colores.primarioOscuro} />
        <Text style={styles.mensaje}>Cargando pacientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensaje}>No se pudieron cargar los pacientes.</Text>
        <Text style={styles.detalle}>
          Revisa tu conexión e intenta de nuevo.
        </Text>
        <Boton titulo="Reintentar" onPress={recargar} />
      </View>
    );
  }

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
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={
          <Text style={styles.mensaje}>
            {busqueda ? "Sin resultados" : "No hay pacientes registrados."}
          </Text>
        }
      />

      {/* boton flotante abajo a la derecha, en la zona del pulgar */}
      <Pressable
        style={({pressed}) => [styles.fab, pressed && styles.fabPresionado]}
        onPress={() =>
          Alert.alert(
            "Próximamente",
            "Agregar paciente estará disponible pronto",
          )
        }
        accessibilityRole="button"
        accessibilityLabel="Agregar paciente"
      >
        <Ionicons name="add" size={32} color={Colores.textoClaro} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo},
  centro: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Espacio.m,
    padding: Espacio.l,
    backgroundColor: Colores.fondo,
  },
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
  // espacio extra abajo para que el boton flotante no tape la ultima tarjeta
  lista: {gap: Espacio.m, paddingBottom: 80},
  mensaje: {...Tipografia.cuerpo, color: Colores.texto, textAlign: "center"},
  detalle: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: Espacio.l,
    bottom: Espacio.l,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colores.primarioOscuro,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  fabPresionado: {opacity: 0.7},
});
