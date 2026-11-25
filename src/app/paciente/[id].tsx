import Boton from '@/components/Boton';
import { Colores, Espacio, Radio, TamañoTexto } from '@/constants/tema';
import { pacientesMock } from '@/data/pacientesMock';

import { Stack, useLocalSearchParams } from 'expo-router';

import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{ id: string }>();

  const paciente = pacientesMock.find(
    (p) => p.id === Number(id)
  );

  if (!paciente) {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.vacio}>
          Paciente no encontrado
        </Text>
      </View>
    );
  }

  const datos: { etiqueta: string; valor: string }[] = [
    { etiqueta: 'Especie', valor: paciente.especie },
    { etiqueta: 'Edad', valor: `${paciente.edad} años` },
    { etiqueta: 'N° de atención', valor: String(paciente.numero_atencion) },
    { etiqueta: 'Diagnóstico', valor: paciente.diagnostico },
  ];

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />

      <ScrollView
        contentContainerStyle={styles.contenedor}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: paciente.foto }}
          style={styles.foto}
          accessibilityLabel={`Fotografía de ${paciente.nombre}`}
        />

        <Text style={styles.nombre}>
          {paciente.nombre}
        </Text>

        {datos.map((dato) => (
          <View
            key={dato.etiqueta}
            style={styles.fila}
            accessible
            accessibilityLabel={`${dato.etiqueta}: ${dato.valor}`}
          >
            <Text style={styles.etiqueta}>
              {dato.etiqueta}
            </Text>

            <Text style={styles.valor}>
              {dato.valor}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View
        style={[
          styles.acciones,
          { paddingBottom: insets.bottom + Espacio.m },
        ]}
      >
        <Boton
          titulo="Registrar visita"
          onPress={() =>
            Alert.alert(
              'Próximamente',
              'Disponible en el Tópico 05'
            )
          }
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
    padding: Espacio.m,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
    paddingBottom: Espacio.l,
  },

  foto: {
    width: '100%',
    height: 260,
    borderRadius: Radio.medio,
  },

  nombre: {
    fontSize: TamañoTexto.tituloGrande,
    fontWeight: 'bold',
    color: Colores.primario,
  },

  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colores.tarjeta,
    padding: Espacio.m,
    borderRadius: Radio.medio,
    gap: Espacio.s,
  },

  etiqueta: {
    fontSize: TamañoTexto.pequeño,
    color: Colores.textoSecundario,
    flexShrink: 1,
  },

  valor: {
    fontSize: TamañoTexto.cuerpo,
    fontWeight: '600',
    color: Colores.texto,
    flexShrink: 1,
    textAlign: 'right',
  },

  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },

  vacio: {
    padding: Espacio.l,
    fontSize: TamañoTexto.cuerpo,
    textAlign: 'center',
    color: Colores.texto,
  },
});
