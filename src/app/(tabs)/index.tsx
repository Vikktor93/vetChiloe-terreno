import { useState } from 'react';
import { ActivityIndicator, View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Boton from '@/components/Boton';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { usePacientes } from '@/hooks/usePacientes';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

export default function Pacientes() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');
  const filtrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 1. Primera carga: Render puede tardar cerca de un minuto en despertar
  if (cargando && pacientes.length === 0) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color={Colores.primario} />
        <Text style={styles.mensaje}>Cargando pacientes…</Text>
      </View>
    );
  }

  // 2. Error: mensaje claro y una acción para salir
  if (error) {
    return (
      <View style={styles.centro}>
        <Ionicons name="cloud-offline-outline" size={48} color={Colores.textoSecundario} />
        <Text style={styles.titulo}>No se pudieron cargar los pacientes</Text>
        <Text style={styles.mensaje}>Revisa tu conexión e inténtalo de nuevo.</Text>
        <Boton titulo="Reintentar" icono="refresh" onPress={recargar} />
      </View>
    );
  }

  // 3. Datos
  return (
    <View style={styles.contenedor}>
      <View style={styles.buscador}>
        <Ionicons name="search" size={20} color={Colores.textoSecundario} />
        <TextInput
          style={styles.campo}
          placeholder="Buscar paciente…"
          placeholderTextColor={Colores.textoSecundario}
          value={busqueda}
          onChangeText={setBusqueda}
          accessibilityLabel="Buscar paciente por nombre"
          clearButtonMode="while-editing"
        />
      </View>
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item }) => <TarjetaPaciente paciente={item} />}
        contentContainerStyle={{ gap: Espacio.m, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        // Deslizar hacia abajo para recargar
        refreshing={cargando}
        onRefresh={recargar}
        // Vacío: sin resultados del buscador o la API sin pacientes
        ListEmptyComponent={
          <View style={styles.vacio}>
            <Ionicons name="search-outline" size={48} color={Colores.textoSecundario} />
            {busqueda ? (
              <>
                <Text style={styles.titulo}>Sin resultados</Text>
                <Text style={styles.mensaje}>No hay pacientes que coincidan con «{busqueda}».</Text>
              </>
            ) : (
              <Text style={styles.titulo}>No hay pacientes registrados</Text>
            )}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  centro: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: Espacio.m, padding: Espacio.l, backgroundColor: Colores.fondo,
  },
  buscador: {
    flexDirection: 'row', alignItems: 'center', gap: Espacio.s,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta, borderRadius: Radio.m,
    borderWidth: 1, borderColor: Colores.borde,
    paddingHorizontal: Espacio.m, marginBottom: Espacio.m,
  },
  campo: { ...Tipografia.cuerpo, flex: 1, minHeight: TAMANO_TACTIL, color: Colores.texto },
  vacio: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Espacio.s, paddingTop: Espacio.xl },
  titulo: { ...Tipografia.subtitulo, color: Colores.texto, textAlign: 'center' },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
});
