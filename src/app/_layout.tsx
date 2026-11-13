import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colores } from '@/constants/colores';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colores.tarjeta },
          headerTintColor: Colores.texto,
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="paciente/[id]" options={{ title: 'Ficha del Paciente' }} />
      </Stack>
    </>
  );
}
