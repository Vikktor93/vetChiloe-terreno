import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

import TarjetaPaciente from '@/components/TarjetaPaciente';
import { Colores } from '@/constants/colores';
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
    padding: 16,
    backgroundColor: Colores.fondo,
  },
  subtitulo: {
    fontSize: 16,
    color: Colores.textoSecundario,
    marginBottom: 16,
  },
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
  lista: {
    gap: 12,
  },
  sinResultados: {
    color: Colores.textoSecundario,
    textAlign: 'center',
    padding: 16,
  },
});
