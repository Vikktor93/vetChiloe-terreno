import { View, Text, Image, StyleSheet } from 'react-native';
import { Paciente } from '@/data/pacientesMock';

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <View style={styles.tarjeta}>
      <Image source={{ uri: paciente.foto }} style={styles.foto} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.detalle}>{paciente.especie} - {paciente.edad} años</Text>
        <Text style={styles.atencion}>N° de atención: {paciente.numero_atencion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: '#fff', padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#E4DCF2',
  },
  foto: { width: 64, height: 64, borderRadius: 32 }, // una imagen remota SIEMPRE necesita width/height
  info: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#6A43A8' },
  detalle: { color: '#444' },
  atencion: { color: '#888', fontSize: 12 },
});