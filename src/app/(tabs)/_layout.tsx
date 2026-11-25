import { Colores, Tipografia } from "@/constants/tema";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { ColorValue } from "react-native";

type Icono = keyof typeof Ionicons.glyphMap;
// tabs entrega el color como ColorValue, pero aca siempre es un string
const icono =
  (nombre: Icono) =>
  ({color, size}: {color: ColorValue; size: number}) => (
    <Ionicons name={nombre} size={size} color={color as string} />
  );

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {backgroundColor: Colores.primarioOscuro},
        headerTintColor: Colores.textoClaro,
        tabBarActiveTintColor: Colores.primarioOscuro,
        tabBarInactiveTintColor: Colores.textoSecundario,
        tabBarLabelStyle: {...Tipografia.etiqueta},
        tabBarStyle: {
          backgroundColor: Colores.tarjeta,
          borderTopColor: Colores.borde,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{title: "Pacientes", tabBarIcon: icono("paw")}}
      />
      <Tabs.Screen
        name="visitas"
        options={{title: "Visitas", tabBarIcon: icono("map")}}
      />
      <Tabs.Screen
        name="perfil"
        options={{title: "Perfil", tabBarIcon: icono("person")}}
      />
    </Tabs>
  );
}
