import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import { Colores, Espacio, Radio, TAMANO_TACTIL, Tipografia } from '@/constants/tema';
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
        accessibilityLabel={`Ver ficha de ${paciente.nombre}, ${paciente.especie}, ${paciente.edad} años`}
        accessibilityHint="Abre la ficha clínica"
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
    gap: Espacio.m,
    padding: Espacio.m,
    minHeight: TAMANO_TACTIL,
    borderRadius: Radio.m,
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
    borderRadius: Radio.completo,
    backgroundColor: Colores.borde,
  },
  info: {
    flex: 1,
  },
  nombre: {
    ...Tipografia.subtitulo,
    color: Colores.primario,
  },
  detalle: {
    ...Tipografia.cuerpo,
    color: Colores.texto,
  },
  atencion: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
  },
});
