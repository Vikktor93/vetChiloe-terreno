import { Colores } from "@/constants/tema";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {backgroundColor: Colores.primarioOscuro},
        headerTintColor: Colores.textoClaro,
      }}
    >
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="paciente/[id]" options={{title: "Ficha"}} />
    </Stack>
  );
}
