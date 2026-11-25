import { Colors } from '@/constants/tema';
import { Stack } from 'expo-router';

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: Colors.surface },
				headerTintColor: Colors.text,
				headerTitleStyle: { fontSize: 16, fontWeight: '700' },
				contentStyle: { backgroundColor: Colors.background },
			}}
		>
			<Stack.Screen name="index" options={{ title: 'vetChiloé Terreno' }} />
			<Stack.Screen name="paciente/[id]" options={{ title: 'Ficha clínica' }} />
		</Stack>
	);
}