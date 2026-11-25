import { useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import Boton from '@/components/Boton';
import { usePacientes } from '@/hooks/usePacientes';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

export default function Pacientes() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');
  const filtrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  if (cargando && pacientes.length === 0) {
    return (
      <ActivityIndicator style={styles.centro}
        size="large" color={Colores.primario} />
    );
  }
  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensaje}>No se pudieron cargar los pacientes.</Text>
        <Boton titulo="Reintentar" onPress={recargar} />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente..."
        placeholderTextColor={Colores.textoSecundario}
        accessibilityLabel="Buscar paciente por nombre"
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{ gap: Espacio.m }}
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={
          <Text style={styles.mensaje}>
            {pacientes.length > 0 ? 'Sin resultados' : 'No hay pacientes.'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  centro: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: Espacio.m, padding: Espacio.m, backgroundColor: Colores.fondo,
  },
  buscador: {
    ...Tipografia.cuerpo,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta, borderRadius: Radio.m,
    borderWidth: 1, borderColor: Colores.borde, color: Colores.texto,
    paddingHorizontal: Espacio.m, paddingVertical: Espacio.s,
    marginBottom: Espacio.m,
  },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
});
