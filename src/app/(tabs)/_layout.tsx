import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';
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
      <Tabs.Screen name="index" options={{ title: 'Pacientes', tabBarIcon: icono('paw') }} />
      <Tabs.Screen name="visitas" options={{ title: 'Visitas', tabBarIcon: icono('map') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icono('person') }} />
    </Tabs>
  );
}
