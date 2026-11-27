import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/tema';

// Posición de cada huella: forman un camino en diagonal, como pasos de una mascota.
const HUELLAS = [
  { x: -52, y: 120, giro: '-20deg' },
  { x: 28, y: 60, giro: '15deg' },
  { x: -27, y: 0, giro: '-20deg' },
  { x: 53, y: -60, giro: '15deg' },
  { x: -2, y: -120, giro: '-20deg' },
];

type Props = { alTerminar: () => void };

export default function SplashHuellas({ alTerminar }: Props) {
  // Un valor animado por huella (0 = invisible, 1 = visible), uno para el logo y otro para la pantalla.
  const huellas = useRef(HUELLAS.map(() => new Animated.Value(0))).current;
  const logo = useRef(new Animated.Value(0)).current;
  const pantalla = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Las huellas aparecen una tras otra, cada 180 ms.
      Animated.stagger(
        180,
        huellas.map((valor) =>
          Animated.timing(valor, { toValue: 1, duration: 250, useNativeDriver: true })
        )
      ),
      Animated.delay(200),
      // 2. Las huellas se desvanecen y aparece el logo de vetChiloé.
      Animated.parallel([
        ...huellas.map((valor) =>
          Animated.timing(valor, { toValue: 0, duration: 300, useNativeDriver: true })
        ),
        Animated.spring(logo, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
      Animated.delay(700),
      // 3. La pantalla violeta se desvanece y deja ver la app.
      Animated.timing(pantalla, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start(() => alTerminar());
  }, [huellas, logo, pantalla, alTerminar]);

  return (
    <Animated.View style={[styles.fondo, { opacity: pantalla }]} pointerEvents="none">
      <View>
        {HUELLAS.map((h, i) => (
          <Animated.View
            key={i}
            style={[
              styles.huella,
              {
                opacity: huellas[i],
                transform: [
                  { translateX: h.x },
                  { translateY: h.y },
                  { rotate: h.giro },
                  { scale: huellas[i].interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }) },
                ],
              },
            ]}>
            <Ionicons name="paw" size={56} color={Colores.sobrePrimario} />
          </Animated.View>
        ))}
      </View>
      <Animated.Image
        source={require('@/assets/images/logo.png')}
        accessibilityLabel="vetChiloé"
        style={[
          styles.logo,
          {
            opacity: logo,
            transform: [{ scale: logo.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) }],
          },
        ]}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fondo: {
    position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
    backgroundColor: Colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  huella: { position: 'absolute', marginLeft: -28, marginTop: -28 },
  logo: { position: 'absolute', width: 240, height: 240 },
});
