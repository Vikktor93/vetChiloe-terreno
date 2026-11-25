import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colores } from '@/constants/tema';
import { vibrar } from '@/utils/vibrar';

export default function TabsLayout() {
  return (
    <Tabs
      // Vibración leve al cambiar de pestaña
      screenListeners={{ tabPress: () => vibrar.seleccion() }}
      screenOptions={{
        animation: 'shift',
        headerStyle: { backgroundColor: Colores.tarjeta },
        headerTintColor: Colores.texto,
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: Colores.tarjeta,
          borderTopColor: Colores.borde,
        },
        tabBarActiveTintColor: Colores.acento,
        tabBarInactiveTintColor: Colores.textoSecundario,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pacientes',
          tabBarIcon: ({ color, size }) => <Ionicons name="paw" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="visitas"
        options={{
          title: 'Visitas',
          tabBarIcon: ({ color, size }) => <Ionicons name="clipboard" size={size} color={color as string} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color as string} />,
        }}
      />
    </Tabs>
  );
}
