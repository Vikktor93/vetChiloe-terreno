import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Paciente } from '@/data/pacientesMock';
import { Colores } from '@/constants/colores';

type Props = {
  paciente: Paciente;
};

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <Link href={`/paciente/${paciente.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.tarjeta, pressed && styles.presionada]}>
            <Image source={{ uri: paciente.foto }} style={styles.foto} />
            <View style={styles.info}>
              <Text style={styles.nombre}>{paciente.nombre}</Text>
              <Text style={styles.detalles}>
                {paciente.especie} · {paciente.edad} años
              </Text>
            </View>
            <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
    shadowColor: Colores.primarioOscuro,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  presionada: {
    opacity: 0.85,
    backgroundColor: Colores.fondo,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colores.fondo,
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colores.primario,
  },
  detalles: {
    fontSize: 14,
    color: Colores.textoSecundario,
    marginTop: 2,
  },
  atencion: {
    fontSize: 12,
    fontWeight: '600',
    color: Colores.primario,
    backgroundColor: Colores.fondo,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
});