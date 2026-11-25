import { ScrollView, View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { pacientesMock } from '@/data/pacientesMock';
import { Colores, Espaciado, Radios, Tipografia } from '@/constants/tema';
import Boton from '@/components/Boton';

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const paciente = pacientesMock.find((p) => p.id === Number(id));

  if (!paciente) {
    return (
      <Text style={styles.vacio}>Paciente no encontrado</Text>
    );
  }

  const registrarVisita = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Visita registrada', `Se inició la visita de ${paciente.nombre}.`);
  };

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />

      <ScrollView contentContainerStyle={styles.contenedor}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <Text style={styles.nombre}>{paciente.nombre}</Text>

        {[
          ['Especie', paciente.especie],
          ['Edad', `${paciente.edad} años`],
          ['N° de atención', paciente.numero_atencion],
          ['Diagnóstico', paciente.diagnostico],
        ].map(([etiqueta, valor]) => (
          <View key={etiqueta} style={styles.fila}>
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.zonaPulgar}>
        <Boton
          titulo="Registrar visita"
          onPress={registrarVisita}
          accessibilityLabel={`Registrar visita para ${paciente.nombre}`}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: Colores.fondo,
  },
  contenedor: {
    flexGrow: 1,
    padding: 20,
    gap: Espaciado.md,
  },
  foto: {
    width: '100%',
    height: 260,
    borderRadius: 16,
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colores.primario,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colores.tarjeta,
    padding: 14,
    borderRadius: Radios.md,
  },
  etiqueta: {
    fontSize: Tipografia.cuerpo,
    color: Colores.textoSecundario,
  },
  valor: {
    fontSize: Tipografia.cuerpo,
    fontWeight: '600',
    color: Colores.texto,
  },
  vacio: {
    padding: 20,
    textAlign: 'center',
    fontSize: Tipografia.subtitulo,
    color: Colores.textoSecundario,
  },
  zonaPulgar: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderTopColor: Colores.borde,
  },
});