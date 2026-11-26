import { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores } from '@/constants/colores';

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState('');
  const filtrados = pacientesMock.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente…"
        placeholderTextColor={Colores.textoSecundario}
        value={busqueda}
        onChangeText={setBusqueda}
      />
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{ gap: 12, flexGrow: 1 }}
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
  contenedor: { flex: 1, padding: 16, backgroundColor: Colores.fondo },
  buscador: {
    backgroundColor: '#fff', borderRadius: 12,
    borderWidth: 1, borderColor: Colores.borde,
    paddingHorizontal: 16, paddingVertical: 12,
    fontSize: 16, marginBottom: 16, color: Colores.texto,
  },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingTop: 48 },
  vacioTitulo: { fontSize: 18, fontWeight: 'bold', color: Colores.texto },
  vacioTexto: { color: Colores.textoSecundario, textAlign: 'center' },
});
