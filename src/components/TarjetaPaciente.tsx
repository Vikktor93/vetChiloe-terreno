import { Colors, Spacing } from '@/constants/tema';
import { Paciente } from '@/data/pacientesMock';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
type Props = { paciente: Paciente };

export default function TarjetaPaciente({ paciente }: Props) {
    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Abrir ficha de ${paciente.nombre}, ${paciente.especie}, ${paciente.edad} años`}
            onPress={() => router.push({ pathname: '/paciente/[id]', params: { id: String(paciente.id) } })}
            style={({ pressed }) => [styles.tarjeta, pressed && styles.presionada]}
        >
            <View style={styles.avatar} accessible={false}>
                <Text style={styles.inicial}>{paciente.nombre.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.nombre}>{paciente.nombre}</Text>
                <Text style={styles.detalle}>{paciente.especie} · {paciente.edad} años</Text>
                <Text style={styles.atencion}>N° {paciente.numero_atencion}</Text>
            </View>
            <Text style={styles.flecha} accessible={false}>›</Text>
        </Pressable>
);
}

const styles = StyleSheet.create({
    tarjeta: {
        flexDirection: 'row', alignItems: 'center',
        gap: Spacing.md, minHeight: 88, padding: Spacing.md, borderRadius: 8,
        backgroundColor: Colors.surface,
        borderWidth: 1, borderColor: Colors.border,
    },
    presionada: { backgroundColor: Colors.primarySoft },
    avatar: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.primarySoft },
    inicial: { color: Colors.primary, fontSize: 22, fontWeight: '700' },
    info: { flex: 1 },
    nombre: { fontSize: 18, fontWeight: 'bold',
            color: Colors.text },
    detalle: { color: Colors.textSecondary, fontSize: 14, marginTop: 2 },
    atencion: { color: Colors.textSecondary, fontSize: 14, marginTop: 3 },
    flecha: { color: Colors.primary, fontSize: 26, paddingHorizontal: Spacing.xs },
});