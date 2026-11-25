import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Paciente } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: '/paciente/[id]', params: { id: paciente.id } })
      }
      accessibilityRole="button"
      accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
      accessibilityHint="Abre la ficha clínica"
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
      <Image source={{ uri: paciente.foto }} style={styles.foto} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.dato}>{paciente.especie} · {paciente.edad} años</Text>
        <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    minHeight: TAMANO_TACTIL,
    flexDirection: 'row', alignItems: 'center',
    gap: Espacio.m, padding: Espacio.m, borderRadius: Radio.m,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1, borderColor: Colores.borde,
  },
  presionada: { opacity: 0.7 },
  foto: { width: 64, height: 64, borderRadius: 32 },
  info: { flex: 1 },
  nombre: { ...Tipografia.subtitulo, color: Colores.primario },
  dato: { ...Tipografia.cuerpo, color: Colores.texto },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
});