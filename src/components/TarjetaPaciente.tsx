import { View, Text, Image, StyleSheet } from 'react-native';
import { Paciente } from '@/data/pacientesMock';

type Props = {
  paciente: Paciente;
};

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <View style={styles.tarjeta}>
      <Image 
        source={{ uri: paciente.foto }} 
        style={styles.foto} 
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.detalles}>
          {paciente.especie} · {paciente.edad} años
        </Text>
      </View>
      <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F3E8EE', // Borde rosado muy tenue
    // Sombra sutil para darle elevación sin recargar
    shadowColor: '#9E6B7B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FBEFF4', // Fondo mientras carga la imagen
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9E4B6C', // Rosa palo oscuro / Berry sobrio
  },
  detalles: {
    fontSize: 14,
    color: '#6E5D65', // Gris neutro con matiz cálido
    marginTop: 2,
  },
  atencion: {
    fontSize: 12,
    fontWeight: '600',
    color: '#C27B9B', // Rosa viejo suave para el número de atención
    backgroundColor: '#FDF2F7', // Fondo tipo badge suave
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
});