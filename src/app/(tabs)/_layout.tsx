import { ColorValue } from 'react-native';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/tema';
import { vibrar } from '@/utils/haptics';

type Icono = keyof typeof Ionicons.glyphMap;
const icono = (nombre: Icono) =>
  function IconoPestana({ color, size }: { color: ColorValue; size: number }) {
    // Tabs entrega un ColorValue amplio; Ionicons solo tipa string, y el color real siempre es string.
    return <Ionicons name={nombre} size={size} color={color as string} />;
  };

export default function TabsLayout() {
  return (
    <Tabs screenListeners={{ tabPress: vibrar.seleccion }} screenOptions={{
      headerStyle: { backgroundColor: Colores.primario },
      headerTintColor: Colores.textoSobrePrimario,
      tabBarActiveTintColor: Colores.primario,
    }}>
      <Tabs.Screen name="index" options={{ title: 'Pacientes', tabBarIcon: icono('paw') }} />
      <Tabs.Screen name="visitas" options={{ title: 'Visitas', tabBarIcon: icono('map') }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: icono('person') }} />
    </Tabs>
  );
}
