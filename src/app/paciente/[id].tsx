import { useCallback, useEffect, useState } from 'react';

import Boton from '@/components/Boton';
import {
  Colores,
  Espacio,
  Radio,
  TamañoTexto,
} from '@/constants/tema';
import { obtenerPaciente } from '@/services/api';
import { Paciente } from '@/types/paciente';

import { Stack, useLocalSearchParams } from 'expo-router';

import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function FichaPaciente() {
  const insets = useSafeAreaInsets();

  const { id } = useLocalSearchParams<{ id: string }>();

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPaciente = useCallback(async () => {
    setCargando(true);
    setError(null);

    try {
      const idNumerico = Number(id);

      if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        throw new Error('El ID del paciente no es válido.');
      }

      const datos = await obtenerPaciente(idNumerico);
      setPaciente(datos);
    } catch (err) {
      setPaciente(null);
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo cargar la ficha del paciente.'
      );
    } finally {
      setCargando(false);
    }
  }, [id]);

  useEffect(() => {
    cargarPaciente();
  }, [cargarPaciente]);

  if (cargando) {
    return (
      <View style={styles.estado}>
        <ActivityIndicator size="large" color={Colores.primario} />
        <Text style={styles.vacio}>
          Cargando ficha del paciente...
        </Text>
      </View>
    );
  }

  if (error || !paciente) {
    return (
      <View style={styles.estado}>
        <Text style={styles.error}>
          No se pudo cargar el paciente
        </Text>

        <Text style={styles.vacio}>
          {error || 'Paciente no encontrado'}
        </Text>

        <Pressable
          style={styles.botonReintentar}
          onPress={cargarPaciente}
        >
          <Text style={styles.textoBoton}>
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  const datos: { etiqueta: string; valor: string }[] = [
    { etiqueta: 'Especie', valor: paciente.especie },
    { etiqueta: 'Edad', valor: paciente.edad },
    {
      etiqueta: 'N° de atención',
      valor: String(paciente.numero_atencion),
    },
    { etiqueta: 'Diagnóstico', valor: paciente.diagnostico },
  ];

  return (
    <View style={styles.pantalla}>
      <Stack.Screen options={{ title: paciente.nombre }} />

      <ScrollView
        contentContainerStyle={styles.contenedor}
        showsVerticalScrollIndicator={false}
      >
        {paciente.foto ? (
          <Image
            source={{ uri: paciente.foto }}
            style={styles.foto}
            accessibilityLabel={`Fotografía de ${paciente.nombre}`}
          />
        ) : (
          <View style={styles.fotoVacia}>
            <Text style={styles.vacio}>
              Sin fotografía disponible
            </Text>
          </View>
        )}

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

  fotoVacia: {
    width: '100%',
    height: 180,
    borderRadius: Radio.medio,
    backgroundColor: Colores.borde,
    justifyContent: 'center',
    alignItems: 'center',
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

  estado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Espacio.l,
    gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },

  error: {
    fontSize: TamañoTexto.cuerpo,
    fontWeight: 'bold',
    color: '#C0392B',
    textAlign: 'center',
  },

  botonReintentar: {
    backgroundColor: Colores.primario,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
