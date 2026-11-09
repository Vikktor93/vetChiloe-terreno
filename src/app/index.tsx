import { View, Text, FlatList, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { pacientesMock } from '@/data/pacientesMock';

export default function Index() {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>vetChiloé Terreno</Text>
      <Text style={styles.subtitulo}>La clínica, ahora en terreno</Text>
      
      <FlatList
        data={pacientesMock}
        keyExtractor={(item) => item.id.toString()}
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
    padding: 16, 
    backgroundColor: '#FAF5F7', // Fondo rosado pastel ultra suave
    paddingTop: 60, // Espaciado superior cómodo para la pantalla
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9E4B6C', // Rosa Berry sobrio (mismo tono del nombre en la tarjeta)
    marginBottom: 4,
  },
  subtitulo: { 
    fontSize: 15, 
    color: '#7D6A73', // Gris cálido afín a la paleta
    marginBottom: 20, 
  },
  listaContenido: {
    gap: 12,
    paddingBottom: 24,
  },
});