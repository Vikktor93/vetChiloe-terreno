import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colores,
  Espacio,
  Radio,
  TamañoTexto,
} from '@/constants/tema';

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
        accessibilityRole="button"
        accessibilityLabel={`Ver ficha de ${paciente.nombre}, ${paciente.especie}, ${paciente.edad} años`}
        style={({ pressed }) => [
          styles.tarjeta,
          pressed && styles.presionada,
        ]}
      >
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Fotografía de ${paciente.nombre}`}
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
    borderRadius: Radio.medio,
    borderWidth: 1,
    borderColor: Colores.borde,
    padding: Espacio.m,
    gap: Espacio.m,
    minHeight: 100,
  },

  presionada: {
    opacity: 0.7,
  },

  foto: {
    width: 75,
    height: 75,
    borderRadius: Radio.pequeño,
  },

  info: {
    flex: 1,
    gap: Espacio.xs,
  },

  nombre: {
    fontSize: TamañoTexto.cuerpo,
    fontWeight: 'bold',
    color: Colores.texto,
  },

  detalle: {
    fontSize: TamañoTexto.pequeño,
    color: Colores.textoSecundario,
  },

  atencion: {
    fontSize: TamañoTexto.pequeño,
    fontWeight: '600',
    color: Colores.primario,
  },
});
