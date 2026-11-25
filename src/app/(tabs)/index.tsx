import { useState } from 'react';
import { View, Text, FlatList, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import Boton from '@/components/Boton';
import { usePacientes } from '@/hooks/usePacientes';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

export default function PacientesScreen() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');

  const texto = busqueda.trim().toLowerCase();
  const pacientesFiltrados = pacientes.filter(
    (p) => p.nombre.toLowerCase().includes(texto) || p.especie.toLowerCase().includes(texto)
  );

  // Estado 1: cargando (primera vez; Render puede tardar en despertar)
  if (cargando && pacientes.length === 0) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colores.acento} />
        <Text style={styles.mensaje}>Cargando pacientes...</Text>
      </View>
    );
  }

  // Estado 2: error con Reintentar
  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.error} accessibilityRole="alert">
          No se pudieron cargar los pacientes.
        </Text>
        <Text style={styles.detalleError}>{error}</Text>
        <Boton titulo="Reintentar" onPress={recargar} />
      </View>
    );
  }

  // Estado 3: datos (con vacío, sin resultados y deslizar para actualizar)
  return (
    <View style={styles.contenedor}>
      <Text style={styles.subtitulo}>La clínica, ahora en terreno</Text>
      <TextInput
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Buscar paciente..."
        placeholderTextColor={Colores.textoSecundario}
        autoCapitalize="none"
        accessibilityLabel="Buscar paciente por nombre o especie"
        style={styles.buscador}
      />
      <FlatList
        data={pacientesFiltrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={
          <Text style={styles.mensaje}>
            {pacientes.length === 0
              ? 'No hay pacientes registrados.'
              : `Sin resultados para «${busqueda.trim()}».`}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Espacio.l,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  subtitulo: { ...Tipografia.cuerpo, color: Colores.textoSecundario, marginBottom: Espacio.m },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
  error: { ...Tipografia.subtitulo, color: Colores.alerta, textAlign: 'center' },
  detalleError: { ...Tipografia.etiqueta, color: Colores.textoSecundario, textAlign: 'center' },
  buscador: {
    ...Tipografia.cuerpo,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
    borderRadius: Radio.m,
    paddingHorizontal: Espacio.m,
    marginBottom: Espacio.m,
    color: Colores.texto,
  },
  lista: { gap: Espacio.m, paddingBottom: Espacio.m, flexGrow: 1 },
});
