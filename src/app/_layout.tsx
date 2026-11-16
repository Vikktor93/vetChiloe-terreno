import { Stack } from "expo-router";
import { Colores } from "@/constants/colores";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primario },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="paciente/[id]" options={{ title: "Ficha" }} />
    </Stack>
  );
}
