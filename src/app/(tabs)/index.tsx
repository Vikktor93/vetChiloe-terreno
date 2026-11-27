import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState('');
  const filtrados = pacientesMock.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.contenedor}>
      <View style={styles.buscador}>
        <Ionicons name="search" size={20} color={Colores.textoSecundario} />
        <TextInput
          style={styles.campo}
          placeholder="Buscar paciente…"
          placeholderTextColor={Colores.textoSecundario}
          value={busqueda}
          onChangeText={setBusqueda}
          accessibilityLabel="Buscar paciente por nombre"
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{ gap: Espacio.m, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        // Reto opcional: se muestra cuando el filtro no encuentra pacientes
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Ionicons name="search-outline" size={48} color={Colores.textoSecundario} />
            <Text style={styles.vacioTitulo}>Sin resultados</Text>
            <Text style={styles.vacioTexto}>No hay pacientes que coincidan con «{busqueda}».</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  buscador: {
    flexDirection: 'row', alignItems: 'center', gap: Espacio.s,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta, borderRadius: Radio.m,
    borderWidth: 1, borderColor: Colores.borde,
    paddingHorizontal: Espacio.m, marginBottom: Espacio.m,
  },
  campo: { ...Tipografia.cuerpo, flex: 1, minHeight: TAMANO_TACTIL, color: Colores.texto },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Espacio.s, paddingTop: Espacio.xl },
  vacioTitulo: { ...Tipografia.subtitulo, color: Colores.texto },
  vacioTexto: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
});
