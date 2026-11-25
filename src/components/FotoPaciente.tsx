import { Image, View, ImageStyle, StyleProp } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/tema';

type Props = { uri: string; style: StyleProp<ImageStyle>; tamanoIcono: number };

// Si el paciente se registró en la web sin foto, se muestra una huella (igual que la web).
export default function FotoPaciente({ uri, style, tamanoIcono }: Props) {
  if (uri) return <Image source={{ uri }} style={[{ backgroundColor: Colores.primarioSuave }, style]} />;
  return (
    <View style={[style as object, { backgroundColor: Colores.primarioSuave, alignItems: 'center', justifyContent: 'center' }]}>
      <Ionicons name="paw" size={tamanoIcono} color={Colores.primarioOscuro} />
    </View>
  );
}
