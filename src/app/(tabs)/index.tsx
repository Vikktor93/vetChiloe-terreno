import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import TarjetaPaciente from '@/components/TarjetaPaciente';
import { Colores, Espacio, Radio, TAMANO_TACTIL, Tipografia } from '@/constants/tema';
import { pacientesMock } from '@/data/pacientesMock';

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState('');
  const pacientesFiltrados = pacientesMock.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()),
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
        data={pacientesFiltrados}
        keyExtractor={(paciente) => paciente.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.sinResultados}>No se encontraron pacientes.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  subtitulo: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    marginBottom: Espacio.m,
  },
  buscador: {
    backgroundColor: Colores.tarjeta,
    borderRadius: Radio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
    minHeight: TAMANO_TACTIL,
    paddingHorizontal: Espacio.m,
    paddingVertical: Espacio.s,
    ...Tipografia.cuerpo,
    color: Colores.texto,
    marginBottom: Espacio.m,
  },
  lista: {
    gap: Espacio.m,
    paddingBottom: Espacio.m,
  },
  sinResultados: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    textAlign: 'center',
    padding: Espacio.m,
  },
});
