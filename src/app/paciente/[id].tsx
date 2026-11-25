import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Boton from '@/components/Boton';
import { obtenerPaciente } from '@/services/api';
import { Paciente } from '@/data/pacientesMock';
import { Colores, Espacio, Radio, Tipografia } from '@/constants/tema';

const ALTO_FOTO = 260;

export default function FichaPaciente() {
  const insets = useSafeAreaInsets(); // antes de cualquier return
  const { id } = useLocalSearchParams<{ id: string }>();
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    obtenerPaciente(id)
      .then((p) => activo && setPaciente(p))
      .catch((e) => activo && setError(e.message));
    return () => { activo = false; };
  }, [id]);

  if (error) return <Text style={styles.vacio}>{error}</Text>;
  if (!paciente) {
    return <ActivityIndicator style={styles.centro} size="large" color={Colores.primario} />;
  }

  return (
    <View style={styles.pantalla}>
      <ScrollView contentContainerStyle={styles.contenedor}>
        <Stack.Screen options={{ title: paciente.nombre }} />
        <Image source={{ uri: paciente.foto }} style={styles.foto} />
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
      <View style={[styles.acciones, { paddingBottom: insets.bottom + Espacio.m }]}>
        <Boton
          titulo="Registrar visita"
          onPress={() => Alert.alert('Próximamente', 'Disponible en el Tópico 05')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  contenedor: {
    flexGrow: 1, padding: Espacio.l, gap: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  foto: { width: '100%', height: ALTO_FOTO, borderRadius: Radio.l },
  nombre: { ...Tipografia.titulo, color: Colores.primario },
  fila: {
    flexDirection: 'row', justifyContent: 'space-between', gap: Espacio.m,
    backgroundColor: Colores.tarjeta, padding: Espacio.m, borderRadius: Radio.m,
  },
  etiqueta: { ...Tipografia.cuerpo, color: Colores.textoSecundario },
  valor: { ...Tipografia.cuerpo, fontWeight: '600', color: Colores.texto, flexShrink: 1, textAlign: 'right' },
  vacio: { ...Tipografia.cuerpo, padding: Espacio.l, textAlign: 'center', color: Colores.alerta },
  centro: { flex: 1, backgroundColor: Colores.fondo },
  acciones: {
    padding: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderTopWidth: 1,
    borderColor: Colores.borde,
  },
});
