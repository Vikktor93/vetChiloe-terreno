import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { Colores } from '@/constants/colores';
import type { Paciente } from '@/data/pacientesMock';

type Props = {
  paciente: Paciente;
};

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <Link
      href={{ pathname: '/paciente/[id]', params: { id: paciente.id } }}
      asChild
    >
      <Pressable
        style={({ pressed }) => [
          styles.tarjeta,
          pressed && styles.presionada,
        ]}
        accessibilityRole="button"
        accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
      >
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <View style={styles.info}>
          <Text style={styles.nombre}>{paciente.nombre}</Text>
          <Text style={styles.detalle}>
            {paciente.especie} · {paciente.edad} años
          </Text>
          <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  presionada: {
    opacity: 0.7,
  },
  foto: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F2F0F5',
  },
  info: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colores.primario,
  },
  detalle: {
    color: Colores.texto,
  },
  atencion: {
    color: Colores.textoSecundario,
    fontSize: 12,
  },
});
