import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import TarjetaPaciente from '@/components/TarjetaPaciente';
import { Colores } from '@/constants/tema';
import { usePacientes } from '@/hooks/usePacientes';

export default function Pacientes() {
  const [busqueda, setBusqueda] = useState('');

  const {
    pacientes,
    cargando,
    actualizando,
    error,
    recargar,
  } = usePacientes();

  const filtrados = pacientes.filter((paciente) =>
    paciente.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.buscador}
        placeholder="Buscar paciente..."
        placeholderTextColor={Colores.textoSecundario}
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {cargando ? (
        <View style={styles.estado}>
          <ActivityIndicator size="large" color={Colores.primario} />
          <Text style={styles.mensaje}>
            Cargando pacientes...
          </Text>
        </View>
      ) : error && pacientes.length === 0 ? (
        <View style={styles.estado}>
          <Text style={styles.error}>
            No se pudieron cargar los pacientes.
          </Text>

          <Text style={styles.mensaje}>
            {error}
          </Text>

          <Pressable
            style={styles.boton}
            onPress={recargar}
          >
            <Text style={styles.textoBoton}>
              Reintentar
            </Text>
          </Pressable>
        </View>
      ) : (
        <>
          {error ? (
            <Text style={styles.aviso}>
              No se pudo actualizar la lista. Mostrando datos anteriores.
            </Text>
          ) : null}

          <FlatList
            data={filtrados}
            keyExtractor={(paciente) => paciente.id.toString()}
            renderItem={({ item }) => (
              <TarjetaPaciente paciente={item} />
            )}
            contentContainerStyle={styles.lista}
            ItemSeparatorComponent={() => (
              <View style={styles.separador} />
            )}
            refreshing={actualizando}
            onRefresh={recargar}
            ListEmptyComponent={
              <Text style={styles.mensaje}>
                {busqueda
                  ? 'No se encontraron pacientes con ese nombre.'
                  : 'No hay pacientes registrados.'}
              </Text>
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 16,
    backgroundColor: Colores.fondo,
  },

  buscador: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colores.borde,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
    color: Colores.texto,
  },

  lista: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  separador: {
    height: 12,
  },

  estado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 20,
  },

  mensaje: {
    fontSize: 15,
    color: Colores.textoSecundario,
    textAlign: 'center',
  },

  error: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#C0392B',
    textAlign: 'center',
  },

  aviso: {
    color: '#C0392B',
    marginBottom: 12,
    fontSize: 13,
  },

  boton: {
    backgroundColor: Colores.primario,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});