import { Stack, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colores } from '@/constants/colores';
import { pacientesMock } from '@/data/pacientesMock';

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const paciente = pacientesMock.find((item) => item.id === Number(id));

  if (!paciente) {
    return (
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Stack.Screen options={{ title: 'Ficha' }} />
        <Text style={styles.noEncontrado}>No se encontró este paciente.</Text>
      </ScrollView>
    );
  }

  const detalles = [
    { etiqueta: 'Especie', valor: paciente.especie },
    { etiqueta: 'Edad', valor: `${paciente.edad} años` },
    { etiqueta: 'N° de atención', valor: paciente.numero_atencion },
    { etiqueta: 'Diagnóstico', valor: paciente.diagnostico },
  ];

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <Image
        source={{ uri: paciente.foto }}
        style={styles.foto}
        accessibilityLabel={`Foto de ${paciente.nombre}`}
      />
      <Text style={styles.nombre}>{paciente.nombre}</Text>
      {detalles.map(({ etiqueta, valor }) => (
        <View key={etiqueta} style={styles.fila}>
          <Text style={styles.etiqueta}>{etiqueta}</Text>
          <Text style={styles.valor}>{valor}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 20,
    gap: 12,
    backgroundColor: Colores.fondo,
  },
  foto: {
    width: '100%',
    height: 260,
    borderRadius: 16,
    backgroundColor: Colores.borde,
  },
  nombre: {
    color: Colores.primario,
    fontSize: 26,
    fontWeight: 'bold',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colores.tarjeta,
    padding: 14,
    borderRadius: 12,
  },
  etiqueta: {
    color: Colores.textoSecundario,
  },
  valor: {
    flexShrink: 1,
    marginLeft: 12,
    color: Colores.texto,
    fontWeight: '600',
  },
  noEncontrado: {
    padding: 20,
    color: Colores.texto,
    textAlign: 'center',
  },
});