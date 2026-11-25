import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { vibrar } from '@/utils/haptics';
import { usePresionAnimada } from '@/hooks/usePresionAnimada';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Paciente, textoEdad } from '@/data/pacientesMock';
import FotoPaciente from '@/components/FotoPaciente';
import {
  Colores, ColoresEspecie, Espacio, Radio, Sombra, Tamano, Tipografia, TAMANO_TACTIL,
} from '@/constants/tema';

type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
  const tinte = ColoresEspecie[paciente.especie.toLowerCase()] ?? ColoresEspecie.otro;
  const datos = [textoEdad(paciente.edad), paciente.peso != null && `${paciente.peso} kg`]
    .filter(Boolean).join(' · ');
  const { estilo, onPressIn, onPressOut } = usePresionAnimada();

  return (
    <Animated.View style={estilo}>
      <Link href={{ pathname: '/paciente/[id]', params: { id: paciente.id } }} asChild>
        <Pressable
          onPress={vibrar.toque}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          accessibilityRole="button"
          accessibilityLabel={`Ver ficha de ${paciente.nombre}`}
          style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}>
          <FotoPaciente uri={paciente.foto} style={styles.foto} tamanoIcono={Tamano.iconoFotoLista} />
          <View style={styles.info}>
            <Text style={styles.nombre} numberOfLines={1}>{paciente.nombre}</Text>
            <Text style={styles.atencion}>N° de atención {paciente.numero_atencion}</Text>
            <View style={styles.fila}>
              <View style={[styles.chip, { backgroundColor: tinte.fondo }]}>
                <Text style={[styles.chipTexto, { color: tinte.texto }]}>{paciente.especie}</Text>
              </View>
              <Text style={styles.detalle}>{datos}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={Tamano.icono} color={Colores.textoSecundario} />
        </Pressable>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', alignItems: 'center',
    gap: Espacio.m, padding: Espacio.m, borderRadius: Radio.l,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1, borderColor: Colores.borde,
    ...Sombra,
  },
  presionada: { borderColor: Colores.primario, backgroundColor: Colores.primarioSuave },
  foto: { width: Tamano.fotoLista, height: Tamano.fotoLista, borderRadius: Radio.l },
  info: { flex: 1, gap: Espacio.xs },
  nombre: { ...Tipografia.subtitulo, fontWeight: '700', color: Colores.texto },
  atencion: { ...Tipografia.etiqueta, fontWeight: '600', color: Colores.textoSecundario },
  fila: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: Espacio.s },
  chip: { paddingHorizontal: Espacio.s + Espacio.xs, paddingVertical: Espacio.xs / 2, borderRadius: Radio.pildora },
  chipTexto: { ...Tipografia.etiqueta, fontWeight: '600' },
  detalle: { ...Tipografia.cuerpo, color: Colores.texto },
});
