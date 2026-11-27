import { View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import FotoPaciente from '@/components/FotoPaciente';
import { formatearEdad, type Paciente } from '@/types/paciente';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  const edad = formatearEdad(paciente.edad);
  return (
    // router.push en vez de <Link asChild>: Link reemplaza el «style» del Pressable
    // y se pierde la función ({ pressed }) => [...], así la tarjeta quedaría sin estilos.
    <Pressable
      onPress={() => router.push({ pathname: '/paciente/[id]', params: { id: paciente.id } })}
      accessibilityRole="button"
      accessibilityLabel={`Ver ficha de ${paciente.nombre}, ${paciente.especie}, ${edad}`}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
      <FotoPaciente uri={paciente.foto} nombre={paciente.nombre} style={styles.foto} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.detalle}>{paciente.especie} - {edad}</Text>
        <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center', gap: Espacio.m,
    backgroundColor: Colores.tarjeta, padding: Espacio.m, borderRadius: Radio.m,
    borderWidth: 1, borderColor: Colores.borde,
  },
  presionada: { opacity: 0.7 },
  foto: { width: 64, height: 64, borderRadius: 32 }, // una imagen remota SIEMPRE necesita width/height
  info: { flex: 1 },
  nombre: { ...Tipografia.subtitulo, color: Colores.primario },
  detalle: { ...Tipografia.cuerpo, color: Colores.texto },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario }, // antes 12: mínimo 14
});
