import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

import { Colores } from '@/constants/tema';

type Icono = keyof typeof Ionicons.glyphMap;

const icono = (nombre: Icono) =>
  function IconoPestana({ color, size }: { color: ColorValue | null; size: number }) {
    return (
      <Ionicons
        name={nombre}
        size={size}
        color={typeof color === 'number' ? Colores.primario : color ?? Colores.primario}
      />
    );
  };

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primario },
        headerTintColor: Colores.textoSobrePrimario,
        tabBarActiveTintColor: Colores.primario,
        tabBarStyle: {
          backgroundColor: Colores.tarjeta,
          borderTopColor: Colores.borde,
        },
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