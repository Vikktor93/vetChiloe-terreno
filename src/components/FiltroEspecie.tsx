import { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, type LayoutRectangle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Presionable from '@/components/Presionable';
import { Colores, Espacio, Radio, Resortes, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = {
  opciones: string[];
  valor: string;
  onCambiar: (opcion: string) => void;
  /** Cantidad de pacientes por opción (se muestra al lado del nombre). */
  conteo?: Record<string, number>;
};

/**
 * Filtros en "chips". Una píldora rosa se desliza (con resorte) hasta la
 * opción elegida: muestra de dónde viene y hacia dónde va la selección.
 */
export default function FiltroEspecie({ opciones, valor, onCambiar, conteo }: Props) {
  const reducir = useReducedMotion();
  const [medidas, setMedidas] = useState<Record<string, LayoutRectangle>>({});
  const x = useSharedValue(0);
  const ancho = useSharedValue(0);
  const [lista, setLista] = useState(false);

  const medida = medidas[valor];
  useEffect(() => {
    if (!medida) return;
    // La primera vez se ubica sin animar; después se desliza.
    if (!lista || reducir) {
      x.set(medida.x);
      ancho.set(medida.width);
    } else {
      x.set(withSpring(medida.x, Resortes.deslizar));
      ancho.set(withSpring(medida.width, Resortes.deslizar));
    }
  }, [medida, lista, reducir, x, ancho]);

  const estiloPildora = useAnimatedStyle(() => ({
    width: ancho.value,
    transform: [{ translateX: x.value }],
    opacity: ancho.value > 0 ? 1 : 0,
  }));

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.fila}
      accessibilityRole="tablist">
      <View style={styles.pista}>
        <Animated.View style={[styles.pildora, estiloPildora]} />
        {opciones.map((opcion) => {
          const activa = opcion === valor;
          return (
            <Presionable
              key={opcion}
              onPress={() => {
                setLista(true);
                onCambiar(opcion);
              }}
              onLayout={(e) => {
                const rect = e.nativeEvent.layout;
                setMedidas((m) => ({ ...m, [opcion]: rect }));
              }}
              hitSlop={4} // 40 de alto + 4 arriba y abajo = 48 de área táctil
              accessibilityRole="tab"
              accessibilityState={{ selected: activa }}
              accessibilityLabel={`Filtrar: ${opcion}`}
              style={styles.chip}>
              <Text style={[styles.texto, activa && styles.textoActivo]}>
                {opcion}
                {conteo?.[opcion] !== undefined && (
                  <Text style={[styles.conteo, activa && styles.textoActivo]}>
                    {'  '}
                    {conteo[opcion]}
                  </Text>
                )}
              </Text>
            </Presionable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fila: { paddingVertical: Espacio.xs },
  pista: { flexDirection: 'row', gap: Espacio.s },
  pildora: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: Radio.completo,
    backgroundColor: Colores.primario,
  },
  chip: {
    minHeight: 40,
    minWidth: TAMANO_TACTIL,
    paddingHorizontal: Espacio.m,
    borderRadius: Radio.completo,
    borderWidth: 1,
    borderColor: Colores.borde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: { ...Tipografia.etiqueta, fontWeight: '600', color: Colores.textoSecundario },
  textoActivo: { color: Colores.textoSobrePrimario },
  conteo: { ...Tipografia.etiqueta, color: Colores.textoSecundario, fontWeight: '400' },
});
