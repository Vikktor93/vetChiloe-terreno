import { Tabs } from "expo-router";
import { ColorValue } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colores } from "@/constants/tema";

type Icono = keyof typeof Ionicons.glyphMap;

const icono = (nombre: Icono) => {
  const IconoTab = ({
    color,
    size,
  }: {
    color: ColorValue | null;
    size: number;
  }) => (
    <Ionicons
      name={nombre}
      size={size}
      color={typeof color === "string" ? color : Colores.primario}
    />
  );
  IconoTab.displayName = `IconoTab(${nombre})`;
  return IconoTab;
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colores.primario },
        headerTintColor: Colores.tarjeta,
        tabBarActiveTintColor: Colores.primario,
        tabBarInactiveTintColor: Colores.textoSecundario,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Pacientes", tabBarIcon: icono("paw") }}
      />
      <Tabs.Screen
        name="visitas"
        options={{ title: "Visitas", tabBarIcon: icono("map") }}
      />
      <Tabs.Screen
        name="perfil"
        options={{ title: "Perfil", tabBarIcon: icono("person") }}
      />
    </Tabs>
  );
}
