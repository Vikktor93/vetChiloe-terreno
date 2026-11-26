import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/colores';

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Ionicons name="person" size={48} color="#fff" />
      </View>
      <Text style={styles.nombre}>Victor Saldivia Vera</Text>
      <Text style={styles.texto}>Médico/a veterinario/a · Terreno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', paddingTop: 48, gap: 8, backgroundColor: Colores.fondo },
  avatar: {
    width: 96, height: 96, borderRadius: 48,
    backgroundColor: Colores.primario,
    alignItems: 'center', justifyContent: 'center',
  },
  nombre: { fontSize: 22, fontWeight: 'bold', color: Colores.texto },
  texto: { color: Colores.textoSecundario },
});
