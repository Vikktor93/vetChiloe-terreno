import { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

export default function PacientesScreen() {
  const [busqueda, setBusqueda] = useState('');

  const pacientesFiltrados = pacientesMock.filter(
    (p) =>
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.especie.toLowerCase().includes(busqueda.toLowerCase())
  );

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
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  subtitulo: { ...Tipografia.cuerpo, color: Colores.textoSecundario, marginBottom: Espacio.m },
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
  lista: { gap: Espacio.m, paddingBottom: Espacio.m },
});
