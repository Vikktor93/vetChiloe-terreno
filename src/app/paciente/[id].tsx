import { useRef, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Ionicons from '@expo/vector-icons/Ionicons';
import { pacientesMock } from '@/data/pacientesMock';
import {
  Colores,
  Espaciado,
  Radios,
  Tamanos,
  Tipografia,
} from '@/constants/tema';
import Boton from '@/components/Boton';

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const paciente = pacientesMock.find((p) => p.id === Number(id));

  const [visitaIniciada, setVisitaIniciada] = useState(false);
  const animacionToast = useRef(new Animated.Value(0)).current;

  if (!paciente) {
    return <Text style={styles.vacio}>Paciente no encontrado</Text>;
  }

  const registrarVisita = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setVisitaIniciada(true);

    Animated.spring(animacionToast, {
      toValue: 1,
      useNativeDriver: true,
      friction: 7,
      tension: 60,
    }).start();

    setTimeout(() => {
      Animated.timing(animacionToast, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setVisitaIniciada(false));
    }, 3200);
  };

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />

      <ScrollView contentContainerStyle={styles.contenedor}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <Text style={styles.nombre}>{paciente.nombre}</Text>

        {[
          ['Especie', paciente.especie],
          ['Edad', `${paciente.edad} años`],
          ['N° de atención', String(paciente.numero_atencion)],
          ['Diagnóstico', paciente.diagnostico],
        ].map(([etiqueta, valor]) => (
          <View key={etiqueta} style={styles.fila}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </View>
        ))}
      </ScrollView>

      {visitaIniciada && (
        <Animated.View
          accessibilityLiveRegion="polite"
          style={[
            styles.toast,
            {
              opacity: animacionToast,
              transform: [
                {
                  translateY: animacionToast.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, 0],
                  }),
                },
                {
                  scale: animacionToast.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.toastIcono}>
            <Ionicons
              name="checkmark-circle"
              size={Tamanos.iconoToast}
              color={Colores.blanco}
            />
          </View>
          <View style={styles.toastTextos}>
            <Text style={styles.toastTitulo}>¡Visita iniciada!</Text>
            <Text style={styles.toastSubtitulo}>
              Atendiendo en terreno a {paciente.nombre}
            </Text>
          </View>
        </Animated.View>
      )}

      <View
        style={[
          styles.zonaPulgar,
          { paddingBottom: Math.max(insets.bottom, Espaciado.lg) + Espaciado.md },
        ]}
      >
        <Boton
          titulo="Registrar visita"
          icono="clipboard-outline"
          onPress={registrarVisita}
          accessibilityLabel={`Registrar visita para ${paciente.nombre}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: Colores.fondo,
  },
  contenedor: {
    flexGrow: 1,
    padding: Espaciado.xl,
    paddingBottom: Espaciado.xxxl,
    gap: Espaciado.md,
  },
  foto: {
    width: '100%',
    height: Tamanos.fotoFicha,
    borderRadius: Radios.lg,
  },
  nombre: {
    fontSize: Tipografia.destacado,
    fontWeight: 'bold',
    color: Colores.primario,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colores.tarjeta,
    padding: Espaciado.tarjeta,
    borderRadius: Radios.md,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  etiqueta: {
    fontSize: Tipografia.cuerpo,
    color: Colores.textoSecundario,
  },
  valor: {
    fontSize: Tipografia.cuerpo,
    fontWeight: '600',
    color: Colores.texto,
  },
  vacio: {
    padding: Espaciado.xl,
    textAlign: 'center',
    fontSize: Tipografia.cuerpo,
    color: Colores.textoSecundario,
  },
  toast: {
    marginHorizontal: Espaciado.lg,
    marginBottom: Espaciado.md,
    padding: Espaciado.tarjeta,
    borderRadius: Radios.lg,
    backgroundColor: Colores.primarioOscuro,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espaciado.md,
    shadowColor: Colores.primarioOscuro,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  toastIcono: {
    width: Tamanos.iconoPantalla,
    height: Tamanos.iconoPantalla,
    borderRadius: Radios.circular,
    backgroundColor: Colores.primario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastTextos: {
    flex: 1,
  },
  toastTitulo: {
    fontSize: Tipografia.cuerpo,
    fontWeight: 'bold',
    color: Colores.blanco,
  },
  toastSubtitulo: {
    fontSize: Tipografia.pequeno,
    color: Colores.fondo,
    marginTop: Espaciado.xs,
  },
  zonaPulgar: {
    paddingHorizontal: Espaciado.xl,
    paddingTop: Espaciado.tarjeta,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderTopColor: Colores.borde,
  },
});