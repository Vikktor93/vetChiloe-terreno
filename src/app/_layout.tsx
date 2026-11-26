import { useState } from 'react';
import { Platform, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colores } from '@/constants/colores';
import SplashHuellas from '@/components/SplashHuellas';

export default function RootLayout() {
  // true mientras se muestra la animación de huellas al abrir la app.
  // Solo en el teléfono: en la versión web no se usa.
  const [mostrarSplash, setMostrarSplash] = useState(Platform.OS !== 'web');

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colores.primario },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="paciente/[id]" options={{ title: 'Ficha' }} />
      </Stack>
      {mostrarSplash && <SplashHuellas alTerminar={() => setMostrarSplash(false)} />}
    </View>
  );
}
