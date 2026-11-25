import { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Aparecer from '@/components/Aparecer';
import Presionable from '@/components/Presionable';
import { Colores, Curvas, Espacio, Movimiento, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = {
  valor: string;
  onCambiar: (texto: string) => void;
  editable?: boolean;
};

/** Campo de búsqueda: el borde se ilumina al escribir y aparece un botón para borrar. */
export default function Buscador({ valor, onCambiar, editable = true }: Props) {
  const enfoque = useSharedValue(0);
  const [enfocado, setEnfocado] = useState(false);

  const estiloCaja = useAnimatedStyle(() => ({
    borderColor: interpolateColor(enfoque.value, [0, 1], [Colores.borde, Colores.acento]),
    backgroundColor: interpolateColor(enfoque.value, [0, 1], [Colores.tarjeta, Colores.tarjetaActiva]),
  }));

  const cambiarEnfoque = (activo: boolean) => {
    setEnfocado(activo);
    enfoque.set(withTiming(activo ? 1 : 0, { duration: Movimiento.hover, easing: Curvas.salida }));
  };

  return (
    <Animated.View style={[styles.caja, estiloCaja]}>
      <Ionicons
        name="search"
        size={20}
        color={enfocado ? Colores.acento : Colores.textoSecundario}
      />
      <TextInput
        value={valor}
        onChangeText={onCambiar}
        onFocus={() => cambiarEnfoque(true)}
        onBlur={() => cambiarEnfoque(false)}
        placeholder="Buscar por nombre o especie"
        placeholderTextColor={Colores.textoSecundario}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        editable={editable}
        accessibilityLabel="Buscar paciente por nombre o especie"
        style={styles.input}
      />
      {valor.length > 0 && (
        <Aparecer desde={0}>
          <Presionable
            onPress={() => onCambiar('')}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Borrar búsqueda"
            style={styles.borrar}>
            <Ionicons name="close-circle" size={22} color={Colores.textoSecundario} />
          </Presionable>
        </Aparecer>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  caja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.s,
    minHeight: TAMANO_TACTIL,
    paddingHorizontal: Espacio.m,
    borderRadius: Radio.l,
    borderWidth: 1,
  },
  input: {
    ...Tipografia.cuerpo,
    flex: 1,
    minHeight: TAMANO_TACTIL,
    color: Colores.texto,
  },
  borrar: {
    minWidth: 32,
    minHeight: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radio.completo,
  },
});
