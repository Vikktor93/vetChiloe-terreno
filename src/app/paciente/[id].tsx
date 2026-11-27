import { Alert, ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Boton from '@/components/Boton';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // los hooks van antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  const paciente = pacientesMock.find((p) => p.id === Number(id));

  if (!paciente) {
    return <Text style={styles.vacio}>Paciente no encontrado</Text>;
  }

  function registrarVisita() {
    // Reto opcional: vibración breve al tocar la acción principal
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Próximamente', 'El registro de visitas estará disponible en una próxima actualización.');
  }

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <Text style={styles.nombre} accessibilityRole="header">{paciente.nombre}</Text>
        {[
          ['Especie', paciente.especie],
          ['Edad', `${paciente.edad} años`],
          ['N° de atención', paciente.numero_atencion],
          ['Diagnóstico', paciente.diagnostico],
        ].map(([etiqueta, valor]) => (
          <View key={etiqueta} style={styles.fila} accessible accessibilityLabel={`${etiqueta}: ${valor}`}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Acción principal fija abajo: en la zona del pulgar */}
      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton titulo="Registrar visita" icono="clipboard-outline" onPress={registrarVisita} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  contenedor: { padding: Espacio.l, gap: Espacio.m },
  foto: { width: '100%', height: 260, borderRadius: Radio.l },
  nombre: { ...Tipografia.titulo, fontSize: 26, color: Colores.primario },
  fila: {
    flexDirection: 'row', justifyContent: 'space-between', gap: Espacio.m,
    backgroundColor: Colores.tarjeta, padding: Espacio.m, borderRadius: Radio.m,
  },
  etiqueta: { ...Tipografia.cuerpo, color: Colores.textoSecundario },
  valor: { ...Tipografia.cuerpo, fontWeight: '600', color: Colores.texto, flexShrink: 1, textAlign: 'right' },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
  vacio: { ...Tipografia.cuerpo, padding: Espacio.l, textAlign: 'center', color: Colores.texto },
});
