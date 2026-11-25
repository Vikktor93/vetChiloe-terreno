import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colores } from '@/constants/tema';
import { Paciente } from '@/data/pacientesMock';
import { Link } from 'expo-router';

type Props = {
  paciente: Paciente;
};

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <Link
      href={{
        pathname: '/paciente/[id]' as any,
        params: { id: paciente.id },
      }}
      asChild
    >
      <Pressable
        style={({ pressed }) => [
          styles.tarjeta,
          pressed && styles.presionada,
        ]}
      >
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
        />

        <View style={styles.info}>
          <Text style={styles.nombre}>
            {paciente.nombre}
          </Text>

          <Text style={styles.detalle}>
            {paciente.especie} · {paciente.edad} años
          </Text>

          <Text style={styles.atencion}>
            N° {paciente.numero_atencion}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colores.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colores.borde,
    padding: 12,
    gap: 12,
  },

  presionada: {
    opacity: 0.7,
  },

  foto: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    gap: 4,
  },

  nombre: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colores.texto,
  },

  detalle: {
    fontSize: 14,
    color: Colores.textoSecundario,
  },

  atencion: {
    fontSize: 13,
    fontWeight: '600',
    color: Colores.primario,
  },
});
