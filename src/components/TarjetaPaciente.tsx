import { View, Text, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import Presionable from '@/components/Presionable';
import { Paciente } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = { paciente: Paciente };

const TAMANO_FOTO = 64;

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <Presionable
      onPress={() => router.push(`/paciente/${paciente.id}`)}
      vibracion="seleccion"
      fondo={{ normal: Colores.tarjeta, activo: Colores.tarjetaActiva }}
      borde={{ normal: Colores.borde, activo: Colores.acento }}
      accessibilityRole="button"
      accessibilityLabel={`Ver ficha de ${paciente.nombre}, ${paciente.especie}, ${paciente.edad} años`}
      accessibilityHint="Abre la ficha clínica"
      style={styles.tarjeta}>
      <Image
        source={{ uri: paciente.foto }}
        style={styles.foto}
        accessibilityIgnoresInvertColors
      />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.detalle}>
          {paciente.especie} · {paciente.edad} años
        </Text>
        <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
      </View>
    </Presionable>
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
    borderWidth: 1,
  },
  foto: {
    width: TAMANO_FOTO,
    height: TAMANO_FOTO,
    borderRadius: Radio.completo,
    borderWidth: 2,
    borderColor: Colores.primarioOscuro,
    backgroundColor: Colores.esqueleto,
  },
  info: { flex: 1 },
  nombre: { ...Tipografia.subtitulo, color: Colores.acento },
  detalle: { ...Tipografia.cuerpo, color: Colores.texto },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
});
