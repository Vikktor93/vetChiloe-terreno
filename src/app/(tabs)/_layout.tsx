import { Tabs } from 'expo-router';
import { ColorValue, Image, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/tema';

type Icono = keyof typeof Ionicons.glyphMap;

// En SDK 58, Tabs entrega el color como ColorValue (más amplio que string).
// Las pestañas siempre envían un texto como '#6A43A8', por eso se indica «as string».
const icono = (nombre: Icono) => ({ color, size }: { color: ColorValue; size: number }) =>
  <Ionicons name={nombre} size={size} color={color as string} />;

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: Colores.primario },
      headerTintColor: Colores.sobrePrimario,
      tabBarActiveTintColor: Colores.primario,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pacientes',
          tabBarIcon: icono('paw'),
          // Logo de vetChiloé a la izquierda del título, sobre un círculo
          // blanco para que el morado del logo contraste con el encabezado
          headerLeft: () => (
            <View style={{
              width: 36, height: 36, borderRadius: 18, marginLeft: 16,
              backgroundColor: Colores.sobrePrimario,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Image
                source={require('@/assets/images/logo-isotipo.png')}
                style={{ width: 26, height: 26 }}
                accessibilityLabel="vetChiloé"
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="visitas" options={{ title: 'Visitas', tabBarIcon: icono('map') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icono('person') }} />
    </Tabs>
  );
}
