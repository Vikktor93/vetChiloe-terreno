import { Stack } from "expo-router";
import { Colores } from "@/constants/tema";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primario },
        headerTintColor: Colores.tarjeta,
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="pacientes/[id]" options={{ title: "Ficha" }} />
    </Stack>
  );
}
