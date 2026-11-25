import { Stack, useLocalSearchParams } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Boton from '@/components/Boton';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';
import { pacientesMock } from '@/data/pacientesMock';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
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
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Foto de ${paciente.nombre}`}
        />
        <Text style={styles.nombre} accessibilityRole="header">
          {paciente.nombre}
        </Text>
        {detalles.map(({ etiqueta, valor }) => (
          <View
            key={etiqueta}
            style={styles.fila}
            accessible
            accessibilityLabel={`${etiqueta}: ${valor}`}
          >
            <Text style={styles.etiqueta}>{etiqueta}</Text>
            <Text style={styles.valor}>{valor}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton
          titulo="Registrar visita"
          accessibilityHint={`Registra una visita de ${paciente.nombre}`}
          onPress={() => Alert.alert('Próximamente', 'Disponible en el Tópico 05')}
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
    padding: Espacio.l,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  foto: {
    width: '100%',
    height: 260,
    borderRadius: Radio.l,
    backgroundColor: Colores.borde,
  },
  nombre: {
    ...Tipografia.titulo,
    color: Colores.primario,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colores.tarjeta,
    padding: Espacio.m,
    borderRadius: Radio.m,
  },
  etiqueta: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
  },
  valor: {
    ...Tipografia.cuerpo,
    flexShrink: 1,
    marginLeft: Espacio.m,
    color: Colores.texto,
    fontWeight: '600',
  },
  noEncontrado: {
    ...Tipografia.cuerpo,
    padding: Espacio.l,
    color: Colores.texto,
    textAlign: 'center',
  },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});
