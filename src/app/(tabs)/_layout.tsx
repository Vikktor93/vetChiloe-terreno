import { Colores } from '@/constants/tema';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

type Icono = keyof typeof Ionicons.glyphMap;

const icono = (nombre: Icono) => {
  return ({
    color,
    size,
  }: {
    focused: boolean;
    color: ColorValue;
    size: number;
  }) => (
    <Ionicons
      name={nombre}
      size={size}
      color={typeof color === 'string' ? color : '#000000'}
    />
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Colores.primario,
        },
        headerTintColor: '#fff',
        tabBarActiveTintColor: Colores.primario,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pacientes',
          tabBarIcon: icono('paw'),
        }}
      />

      <Tabs.Screen
        name="visitas"
        options={{
          title: 'Visitas',
          tabBarIcon: icono('map'),
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: icono('person'),
        }}
      />
    </Tabs>
  );
}
