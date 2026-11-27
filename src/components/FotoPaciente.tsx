import { Image, StyleSheet, View, type ImageStyle, type StyleProp } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/tema';

type Props = {
  uri: string | null;
  nombre: string;
  style: StyleProp<ImageStyle>; // tamaño y borde: lo decide quien la usa
  tamanoIcono?: number;
};

// Foto del paciente o, si no tiene, una huella sobre fondo violeta claro
export default function FotoPaciente({ uri, nombre, style, tamanoIcono = 28 }: Props) {
  if (uri) {
    return <Image source={{ uri }} style={style} accessibilityLabel={`Foto de ${nombre}`} />;
  }
  return (
    <View style={[styles.sinFoto, style]} accessibilityLabel={`${nombre} no tiene foto`}>
      <Ionicons name="paw" size={tamanoIcono} color={Colores.primario} />
    </View>
  );
}

const styles = StyleSheet.create({
  sinFoto: { backgroundColor: Colores.borde, alignItems: 'center', justifyContent: 'center' },
});
