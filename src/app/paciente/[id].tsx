import { Colores } from '@/constants/colores';
import { pacientesMock } from '@/data/pacientesMock';

import { Stack, useLocalSearchParams } from 'expo-router';

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function FichaPaciente() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const paciente = pacientesMock.find(
    (p) => p.id === Number(id)
  );

  if (!paciente) {
    return (
      <Text style={styles.vacio}>
        Paciente no encontrado
      </Text>
    );
  }

  const datos: { etiqueta: string; valor: string }[] = [
    { etiqueta: 'Especie', valor: paciente.especie },
    { etiqueta: 'Edad', valor: `${paciente.edad} años` },
    { etiqueta: 'N° de atención', valor: String(paciente.numero_atencion) },
    { etiqueta: 'Diagnóstico', valor: paciente.diagnostico },
  ];

  return (
    <ScrollView contentContainerStyle={styles.contenedor}>
      <Stack.Screen options={{ title: paciente.nombre }} />

      <Image
        source={{ uri: paciente.foto }}
        style={styles.foto}
      />

      <Text style={styles.nombre}>
        {paciente.nombre}
      </Text>

      {datos.map((dato) => (
        <View key={dato.etiqueta} style={styles.fila}>
          <Text style={styles.etiqueta}>
            {dato.etiqueta}
          </Text>

          <Text style={styles.valor}>
            {dato.valor}
          </Text>
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
    borderRadius: 12,
  },

  etiqueta: {
    color: Colores.textoSecundario,
  },

  valor: {
    fontWeight: '600',
    color: Colores.texto,
  },

  vacio: {
    padding: 20,
    textAlign: 'center',
  },
});
