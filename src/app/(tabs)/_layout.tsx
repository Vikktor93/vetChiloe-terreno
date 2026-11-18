import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ColorValue } from 'react-native';

import { Colores } from '@/constants/colores';

type Icono = keyof typeof Ionicons.glyphMap;

const icono = (nombre: Icono) =>
  ({ color, size }: { color: ColorValue | null; size: number }) => (
    <Ionicons
      name={nombre}
      size={size}
      color={typeof color === 'number' ? Colores.primario : color ?? Colores.primario}
    />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primario },
        headerTintColor: '#fff',
        tabBarActiveTintColor: Colores.primario,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Pacientes', tabBarIcon: icono('paw') }}
      />
      <Tabs.Screen
        name="visitas"
        options={{ title: 'Visitas', tabBarIcon: icono('calendar') }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: 'Perfil', tabBarIcon: icono('person') }}
      />
    </Tabs>
  );
}