import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Paciente } from '@/data/pacientesMock';
import { Colores } from '@/constants/colores';

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  return (
    // router.push en vez de <Link asChild>: Link reemplaza el «style» del Pressable
    // y se pierde la función ({ pressed }) => [...], así la tarjeta quedaría sin estilos.
    <Pressable
      onPress={() => router.push({ pathname: '/paciente/[id]', params: { id: paciente.id } })}
      style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
      <Image source={{ uri: paciente.foto }} style={styles.foto} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{paciente.nombre}</Text>
        <Text style={styles.detalle}>{paciente.especie} · {paciente.edad} años</Text>
        <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colores.tarjeta, padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: Colores.borde,
  },
  presionada: { opacity: 0.7 },
  foto: { width: 64, height: 64, borderRadius: 32 }, // una imagen remota SIEMPRE necesita width/height
  info: { flex: 1 },
  nombre: { fontSize: 18, fontWeight: 'bold', color: Colores.primario },
  detalle: { color: Colores.texto },
  atencion: { color: Colores.textoSecundario, fontSize: 12 },
});
