import { Paciente } from '@/data/pacientesMock';
import { Image, StyleSheet, Text, View } from 'react-native';

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <View style={styles.tarjeta}>
      <Image source={{ uri: paciente.foto }} style={styles.foto} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text>{paciente.especie} · {paciente.edad} años</Text>
        <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, padding: 12, borderRadius: 12,
    backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#E4DCF2',
  },
  foto: { width: 64, height: 64, borderRadius: 32 },
  info: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: '#6A43A8' },
  atencion: { color: '#888', fontSize: 12 },
});
