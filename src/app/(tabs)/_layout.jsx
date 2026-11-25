import { Tabs } from "expo-router";
import { ClipboardList, Dog, MapPin, User } from "lucide-react-native";
import { colors, fontSize } from "../../constants/tema";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.petroleo,
        tabBarActiveTintColor: colors.verde,
        tabBarActiveBackgroundColor: colors.lima,
        tabBarStyle: {
          backgroundColor: colors.blanco,
          borderTopColor: colors.petroleo,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.caption,
          fontWeight: "700",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <MapPin color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="visitas"
        options={{
          title: "visitas",
          tabBarIcon: ({ color, focused }) => (
            <ClipboardList color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="pacientes"
        options={{
          tabBarIcon: ({ color, focused }) => <Dog color={color} size={24} />,
          title: "pacientes",
        }}
      />

      <Tabs.Screen
        name="perfil"
        options={{
          title: "perfil",
          tabBarIcon: ({ color, focused }) => <User color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
