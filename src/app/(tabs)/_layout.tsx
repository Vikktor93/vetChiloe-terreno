import { Tabs } from 'expo-router';
import { ColorValue } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colores } from '@/constants/colores';

type Icono = keyof typeof Ionicons.glyphMap;

const icono = (nombre: Icono) => 
  ({ color, size }: { color: ColorValue; size: number }) => (
    <Ionicons name={nombre} size={size} color={color as string} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colores.primario,
        tabBarInactiveTintColor: Colores.textoSecundario,
        tabBarStyle: {
          backgroundColor: Colores.tarjeta,
          borderTopColor: Colores.borde,
        },
        headerStyle: {
          backgroundColor: Colores.primario,
        },
        headerTintColor: Colores.tarjeta,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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