import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import Boton from '@/components/Boton';
import { usePacientes } from '@/hooks/usePacientes';
import {
  Colores,
  Espaciado,
  Radios,
  Tipografia,
} from '@/constants/tema';

export default function Pacientes() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');

  const filtrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando && pacientes.length === 0) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colores.primario} />
        <Text style={styles.mensaje}>Cargando pacientes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centro}>
        <Text style={styles.mensajeError}>
          No se pudieron cargar los pacientes.
        </Text>
        <Text style={styles.detalleError}>{error}</Text>
        <Boton
          titulo="Reintentar"
          icono="refresh-outline"
          onPress={recargar}
          accessibilityLabel="Reintentar carga de pacientes"
        />
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente por nombre..."
        placeholderTextColor={Colores.textoSecundario}
        accessibilityLabel="Buscar paciente por nombre"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={styles.listaContenido}
        showsVerticalScrollIndicator={false}
        refreshing={cargando}
        onRefresh={recargar}
        ListEmptyComponent={
          <Text style={styles.mensaje}>
            {busqueda.trim().length > 0
              ? 'Sin resultados'
              : 'No hay pacientes registrados.'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: Espaciado.lg,
    backgroundColor: Colores.fondo,
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Espaciado.xl,
    gap: Espaciado.md,
    backgroundColor: Colores.fondo,
  },
  buscador: {
    backgroundColor: Colores.tarjeta,
    color: Colores.texto,
    borderRadius: Radios.md,
    borderWidth: 1,
    borderColor: Colores.borde,
    paddingHorizontal: Espaciado.lg,
    paddingVertical: Espaciado.md,
    fontSize: Tipografia.cuerpo,
    marginBottom: Espaciado.lg,
  },
  listaContenido: {
    gap: Espaciado.md,
    paddingBottom: Espaciado.xxl,
  },
  mensaje: {
    textAlign: 'center',
    fontSize: Tipografia.cuerpo,
    color: Colores.textoSecundario,
    marginTop: Espaciado.xl,
  },
  mensajeError: {
    textAlign: 'center',
    fontSize: Tipografia.titulo,
    fontWeight: 'bold',
    color: Colores.alerta,
  },
  detalleError: {
    textAlign: 'center',
    fontSize: Tipografia.pequeno,
    color: Colores.textoSecundario,
    marginBottom: Espaciado.sm,
  },
});