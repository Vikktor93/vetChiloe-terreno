import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, type ImageStyle, StyleSheet, View } from 'react-native';

import { Colores } from '@/constants/tema';
import { fotoValida, type Paciente } from '@/types/paciente';

type Props = {
  paciente: Paciente;
  estilo: ImageStyle;
  tamanoIcono: number;
};

// Muestra la foto del paciente o una huella si no tiene una imagen válida.
export default function FotoPaciente({ paciente, estilo, tamanoIcono }: Props) {
  if (fotoValida(paciente.foto)) {
    return (
      <Image
        source={{ uri: paciente.foto }}
        style={estilo}
        accessibilityLabel={`Foto de ${paciente.nombre}`}
      />
    );
  }

  return (
    <View
      style={[estilo, styles.sinFoto]}
      accessible
      accessibilityLabel={`${paciente.nombre} no tiene foto`}
    >
      <Ionicons name="paw" size={tamanoIcono} color={Colores.primario} />
    </View>
  );
}

const styles = StyleSheet.create({
  sinFoto: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colores.borde,
  },
});
