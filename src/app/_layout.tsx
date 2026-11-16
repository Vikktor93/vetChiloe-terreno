import { Stack } from 'expo-router';
import { Colores } from '@/constants/colores';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primario },
        headerTintColor: Colores.tarjeta,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: Colores.fondo },
      }}
    >
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}