import { View, Text, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Boton from '@/components/Boton';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

export default function FichaPacienteScreen() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  const paciente = pacientesMock.find((p) => p.id.toString() === id);

  if (!paciente) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.error} accessibilityRole="alert">
          Paciente no encontrado
        </Text>
      </View>
    );
  }

  const registrarVisita = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Próximamente', 'Disponible en el Tópico 05');
  };

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <ScrollView contentContainerStyle={styles.contenido}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          resizeMode="cover"
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <View style={styles.card}>
          <Text style={styles.nombre} accessibilityRole="header">
            {paciente.nombre}
          </Text>
          <Text style={styles.atencion}>Atención N° {paciente.numero_atencion}</Text>
          <View style={styles.separador} />
          <Text style={styles.etiqueta}>Especie</Text>
          <Text style={styles.valor}>{paciente.especie}</Text>
          <Text style={styles.etiqueta}>Edad</Text>
          <Text style={styles.valor}>{paciente.edad} años</Text>
          <Text style={styles.etiqueta}>Diagnóstico / Motivo</Text>
          <Text style={styles.valor}>{paciente.diagnostico}</Text>
        </View>
      </ScrollView>

      {/* Acción principal fija abajo: zona del pulgar */}
      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton
          titulo="Registrar visita"
          onPress={registrarVisita}
          accessibilityHint={`Registra una visita para ${paciente.nombre}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  contenido: { padding: Espacio.m, gap: Espacio.m },
  centrado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Espacio.m,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  error: { ...Tipografia.cuerpo, fontWeight: '700', color: Colores.alerta, textAlign: 'center' },
  foto: { width: '100%', height: 220, borderRadius: Radio.l },
  card: {
    backgroundColor: Colores.tarjeta,
    borderRadius: Radio.l,
    padding: Espacio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  nombre: { ...Tipografia.titulo, color: Colores.acento },
  atencion: { ...Tipografia.etiqueta, color: Colores.textoSecundario, marginTop: Espacio.xs },
  separador: { height: 1, backgroundColor: Colores.borde, marginVertical: Espacio.m },
  etiqueta: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
    marginTop: Espacio.s,
    textTransform: 'uppercase',
  },
  valor: { ...Tipografia.cuerpo, fontWeight: '500', color: Colores.texto, marginTop: Espacio.xs },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});
