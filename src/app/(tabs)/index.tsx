import { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';
import {
  Colores,
  Espaciado,
  Radios,
  Tipografia,
} from '@/constants/tema';

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = pacientesMock.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente por nombre..."
        placeholderTextColor={Colores.textoSecundario}
        accessibilityLabel="Buscar paciente por nombre"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.listaContenido}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: Espaciado.lg,
    backgroundColor: Colores.fondo,
  },
  buscador: {
    backgroundColor: Colores.tarjeta,
    color: Colores.texto,
    borderRadius: Radios.md,
    borderWidth: 1,
    borderColor: Colores.borde,
    paddingHorizontal: Espaciado.lg,
    paddingVertical: Espaciado.md,
    fontSize: Tipografia.cuerpo,
    marginBottom: Espaciado.lg,
  },
  listaContenido: {
    gap: Espaciado.md,
    paddingBottom: Espaciado.xxl,
  },
});