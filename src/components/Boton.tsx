import { Colors, Spacing } from '@/constants/tema';
import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Variante = 'principal' | 'secundaria' | 'peligro';

type Props = {
  children: string;
  onPress?: () => void;
  variante?: Variante;
  deshabilitado?: boolean;
  cargando?: boolean;
  accessibilityLabel?: string;
  icono?: ReactNode;
};

export default function Boton({
  children,
  onPress,
  variante = 'principal',
  deshabilitado = false,
  cargando = false,
  accessibilityLabel,
  icono,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? children}
      accessibilityState={{ disabled: deshabilitado, busy: cargando }}
      disabled={deshabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        styles.boton,
        variante === 'principal' && styles.principal,
        variante === 'secundaria' && styles.secundaria,
        variante === 'peligro' && styles.peligro,
        pressed && !deshabilitado && styles.presionado,
        deshabilitado && styles.deshabilitado,
      ]}
    >
      {cargando ? (
        <ActivityIndicator color={variante === 'secundaria' ? Colors.primary : '#FFFFFF'} />
      ) : (
        <View style={styles.contenido}>
          {icono}
          <Text style={[styles.texto, variante === 'secundaria' && styles.textoSecundario]}>
            {children}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    borderRadius: 8,
  },
  principal: { backgroundColor: Colors.primary },
  secundaria: { backgroundColor: Colors.primarySoft, borderWidth: 1, borderColor: Colors.border },
  peligro: { backgroundColor: Colors.danger },
  presionado: { opacity: 0.82, transform: [{ scale: 0.99 }] },
  deshabilitado: { backgroundColor: Colors.disabled, borderColor: Colors.disabled },
  contenido: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.sm },
  texto: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  textoSecundario: { color: Colors.primary },
});