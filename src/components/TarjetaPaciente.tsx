import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Paciente } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = { paciente: Paciente };

const TAMANO_FOTO = 64;

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    <Link href={{ pathname: '/paciente/[id]', params: { id: paciente.id } }} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
        style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
        <Image source={{ uri: paciente.foto }} style={styles.foto} />
        <View style={styles.info}>
          <Text style={styles.nombre}>{paciente.nombre}</Text>
          <Text style={styles.detalle}>{paciente.especie} · {paciente.edad} años</Text>
          <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center',
    gap: Espacio.m, padding: Espacio.m, borderRadius: Radio.m,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1, borderColor: Colores.borde,
  },
  presionada: { opacity: 0.7 },
  foto: { width: TAMANO_FOTO, height: TAMANO_FOTO, borderRadius: TAMANO_FOTO / 2 },
  info: { flex: 1 },
  nombre: { ...Tipografia.subtitulo, color: Colores.primario },
  detalle: { ...Tipografia.cuerpo, color: Colores.texto },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
});
