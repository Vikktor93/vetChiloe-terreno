import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#6A43A8' },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen name="index" options={{ title: 'vetChiloé Terreno' }} />
    </Stack>
  );
}
