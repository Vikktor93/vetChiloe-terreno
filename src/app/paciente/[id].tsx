import { View, Text, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Boton from '@/components/Boton';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  const paciente = pacientesMock.find((p) => p.id.toString() === id);

  if (!paciente) {
    return (
      <View style={styles.vacio}>
        <Text style={styles.texto}>Paciente no encontrado.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colores.fondo }}>
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Image source={{ uri: paciente.foto }} style={styles.foto} />
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.texto}>
          {paciente.especie} · {paciente.edad} años
        </Text>
        <Text style={styles.etiqueta}>N° {paciente.numero_atencion}</Text>
      </ScrollView>

      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton
          titulo="Registrar visita"
          onPress={() => Alert.alert('Próximamente', 'Disponible en el Tópico 05')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: 'center', padding: Espacio.l, gap: Espacio.s },
  foto: { width: 160, height: 160, borderRadius: 80 },
  nombre: { ...Tipografia.titulo, color: Colores.texto },
  texto: { ...Tipografia.cuerpo, color: Colores.texto },
  etiqueta: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colores.fondo },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});