import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Colores,
  Espaciado,
  Radios,
  Tamanos,
  Tipografia,
} from '@/constants/tema';

export default function Perfil() {
  return (
    <View style={styles.contenedor}>
      <View style={styles.avatar}>
        <Ionicons
          name="person"
          size={Tamanos.iconoPantalla}
          color={Colores.tarjeta}
        />
      </View>
      <Text style={styles.nombre}>Carla Vargas</Text>
      <Text style={styles.texto}>Médico/a veterinario/a · Terreno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Espaciado.seccion,
    gap: Espaciado.sm,
    backgroundColor: Colores.fondo,
  },
  avatar: {
    width: Tamanos.avatarPerfil,
    height: Tamanos.avatarPerfil,
    borderRadius: Radios.circular,
    backgroundColor: Colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Espaciado.sm,
  },
  nombre: {
    fontSize: Tipografia.encabezado,
    fontWeight: 'bold',
    color: Colores.texto,
  },
  texto: {
    fontSize: Tipografia.cuerpo,
    color: Colores.textoSecundario,
  },
});