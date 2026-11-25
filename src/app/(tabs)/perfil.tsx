import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores, Espacio, Tipografia } from '@/constants/tema';

const TAMANO_AVATAR = 96;

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={48} color={Colores.textoSobrePrimario} />
      </View>
      <Text style={styles.nombre}>José Guanel</Text>
      <Text style={styles.texto}>Médico/a veterinario/a · vetChiloé Terreno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1, alignItems: 'center', paddingTop: Espacio.xl + Espacio.m,
    gap: Espacio.s, backgroundColor: Colores.fondo,
  },
  avatar: {
    width: TAMANO_AVATAR, height: TAMANO_AVATAR, borderRadius: TAMANO_AVATAR / 2,
    backgroundColor: Colores.primario,
    alignItems: 'center', justifyContent: 'center',
  },
  nombre: { ...Tipografia.titulo, color: Colores.texto },
  texto: { ...Tipografia.cuerpo, color: Colores.textoSecundario },
});
