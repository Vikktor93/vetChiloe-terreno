import { useState } from 'react';
import { View, Text, FlatList, TextInput, RefreshControl, StyleSheet } from 'react-native';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import Aparecer from '@/components/Aparecer';
import Boton from '@/components/Boton';
import { ListaEsqueleto } from '@/components/Esqueleto';
import { usePacientes } from '@/hooks/usePacientes';
import { vibrar } from '@/utils/vibrar';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

export default function PacientesScreen() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');
  const [deslizando, setDeslizando] = useState(false);

  const texto = busqueda.trim().toLowerCase();
  const pacientesFiltrados = pacientes.filter(
    (p) => p.nombre.toLowerCase().includes(texto) || p.especie.toLowerCase().includes(texto)
  );

  const primeraCarga = cargando && pacientes.length === 0 && !error;

  const actualizar = () => {
    vibrar.seleccion();
    setDeslizando(true);
    recargar();
  };
  // El indicador de "deslizar" se apaga cuando termina la carga.
  if (deslizando && !cargando) setDeslizando(false);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.subtitulo}>La clínica, ahora en terreno</Text>
      <TextInput
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Buscar paciente..."
        placeholderTextColor={Colores.textoSecundario}
        autoCapitalize="none"
        editable={!primeraCarga}
        accessibilityLabel="Buscar paciente por nombre o especie"
        style={styles.buscador}
      />

      {primeraCarga ? (
        // Estado 1: cargando (Render puede tardar en despertar)
        <View>
          <ListaEsqueleto />
          <Text style={[styles.mensaje, styles.mensajeCarga]}>
            Conectando con la clínica...
          </Text>
        </View>
      ) : error ? (
        // Estado 2: error con Reintentar
        <Aparecer desde={0} style={styles.centro}>
          <Text style={styles.error} accessibilityRole="alert">
            No se pudieron cargar los pacientes.
          </Text>
          <Text style={styles.detalleError}>{error}</Text>
          <Boton titulo="Reintentar" onPress={recargar} cargando={cargando} />
        </Aparecer>
      ) : (
        // Estado 3: datos (vacío, sin resultados y deslizar para actualizar)
        <FlatList
          data={pacientesFiltrados}
          keyExtractor={(p) => p.id.toString()}
          renderItem={({ item, index }) => (
            // Las tarjetas entran escalonadas (solo las primeras 8 esperan)
            <Aparecer orden={index}>
              <TarjetaPaciente paciente={item} />
            </Aparecer>
          )}
          contentContainerStyle={styles.lista}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              refreshing={deslizando}
              onRefresh={actualizar}
              tintColor={Colores.acento}
              colors={[Colores.primario]}
              progressBackgroundColor={Colores.tarjeta}
            />
          }
          ListEmptyComponent={
            <Aparecer desde={0}>
              <Text style={styles.mensaje}>
                {pacientes.length === 0
                  ? 'No hay pacientes registrados.'
                  : `Sin resultados para «${busqueda.trim()}».`}
              </Text>
            </Aparecer>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: Espacio.m, backgroundColor: Colores.fondo },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Espacio.l,
    gap: Espacio.m,
  },
  subtitulo: { ...Tipografia.cuerpo, color: Colores.textoSecundario, marginBottom: Espacio.m },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
  mensajeCarga: { marginTop: Espacio.l },
  error: { ...Tipografia.subtitulo, color: Colores.alerta, textAlign: 'center' },
  detalleError: { ...Tipografia.etiqueta, color: Colores.textoSecundario, textAlign: 'center' },
  buscador: {
    ...Tipografia.cuerpo,
    minHeight: TAMANO_TACTIL,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
    borderRadius: Radio.m,
    paddingHorizontal: Espacio.m,
    marginBottom: Espacio.m,
    color: Colores.texto,
  },
  lista: { gap: Espacio.m, paddingBottom: Espacio.m, flexGrow: 1 },
});
