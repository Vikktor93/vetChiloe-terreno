import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={48}
          color={Colores.textoSobrePrimario}
          accessibilityLabel="Icono de perfil"
        />
      </View>
      <Text style={styles.nombre} accessibilityRole="header">Tu nombre</Text>
      <Text style={styles.texto}>Médico/a veterinario/a · Terreno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Espacio.xl + Espacio.m,
    gap: Espacio.s,
    backgroundColor: Colores.fondo,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radio.completo,
    backgroundColor: Colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nombre: {
    ...Tipografia.titulo,
    color: Colores.texto,
  },
  texto: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
  },
});