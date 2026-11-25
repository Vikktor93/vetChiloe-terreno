import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

import Aviso from '@/components/Aviso';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import { Colores, Duracion, Espacio, Radio, TAMANO_TACTIL, Tipografia } from '@/constants/tema';
import { useDemora } from '@/hooks/useDemora';
import { usePacientes } from '@/hooks/usePacientes';
import { mensajeDeError } from '@/utils/mensajesError';
import { vibrar } from '@/utils/vibrar';

export default function Pacientes() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');
  const primeraCarga = cargando && pacientes.length === 0;
  const demorado = useDemora(primeraCarga);

  const texto = busqueda.trim().toLowerCase();
  const pacientesFiltrados = pacientes.filter((p) =>
    [p.nombre, p.especie, p.numero_atencion].some((campo) =>
      campo?.toLowerCase().includes(texto),
    ),
  );

  const limpiarBusqueda = () => {
    vibrar.toque();
    setBusqueda('');
  };

  // 1) Cargando: Render puede tardar cerca de un minuto en despertar.
  if (primeraCarga) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator
          size="large"
          color={Colores.primario}
          accessibilityLabel="Cargando pacientes"
        />
        <Text style={styles.cargandoTitulo}>Cargando pacientes...</Text>
        {demorado ? (
          <Animated.Text entering={FadeIn.duration(Duracion.lenta)} style={styles.cargandoTexto}>
            El servidor está despertando. La primera carga puede tardar hasta un minuto.
          </Animated.Text>
        ) : null}
      </View>
    );
  }

  // 2) Error: sin conexión, el servidor no responde o falló.
  if (error) {
    return (
      <ScrollView contentContainerStyle={styles.centro}>
        <Aviso
          {...mensajeDeError(error)}
          detalle={error.message}
          acciones={[{ titulo: 'Reintentar', onPress: recargar, cargando }]}
        />
      </ScrollView>
    );
  }

  // 3) La API respondió bien pero no hay pacientes registrados.
  if (pacientes.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.centro}>
        <Aviso
          icono="file-tray-outline"
          titulo="Aún no hay pacientes"
          mensaje="Cuando la clínica registre pacientes en vetChiloé web, aparecerán aquí."
          acciones={[{ titulo: 'Actualizar', onPress: recargar, cargando }]}
        />
      </ScrollView>
    );
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.subtitulo}>La clínica, ahora en terreno</Text>

      <View style={styles.buscador}>
        <Ionicons name="search" size={24} color={Colores.textoSecundario} />
        <TextInput
          style={styles.entrada}
          placeholder="Nombre, especie o N° de atención"
          placeholderTextColor={Colores.textoSecundario}
          value={busqueda}
          onChangeText={setBusqueda}
          returnKeyType="search"
          autoCorrect={false}
          accessibilityLabel="Buscar paciente por nombre, especie o número de atención"
        />
        {busqueda ? (
          <Pressable
            onPress={limpiarBusqueda}
            hitSlop={Espacio.s}
            style={styles.botonLimpiar}
            accessibilityRole="button"
            accessibilityLabel="Limpiar búsqueda"
          >
            <Ionicons name="close-circle" size={24} color={Colores.textoSecundario} />
          </Pressable>
        ) : null}
      </View>

      <Text style={styles.contador} accessibilityLiveRegion="polite">
        {texto
          ? `${pacientesFiltrados.length} de ${pacientes.length} pacientes`
          : `${pacientes.length} ${pacientes.length === 1 ? 'paciente' : 'pacientes'}`}
      </Text>

      <Animated.FlatList
        data={pacientesFiltrados}
        keyExtractor={(paciente) => paciente.id.toString()}
        renderItem={({ item, index }) => <TarjetaPaciente paciente={item} indice={index} />}
        itemLayoutAnimation={LinearTransition.duration(Duracion.normal)}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        refreshing={cargando}
        onRefresh={() => {
          vibrar.seleccion();
          recargar();
        }}
        ListEmptyComponent={
          // 4) Hay pacientes, pero la búsqueda no encontró ninguno.
          <Aviso
            icono="search-outline"
            titulo="Sin resultados"
            mensaje={`No hay pacientes que coincidan con «${busqueda.trim()}». Revisa cómo está escrito o busca por especie o N° de atención.`}
            acciones={[
              { titulo: 'Limpiar búsqueda', onPress: limpiarBusqueda, variante: 'secundario' },
            ]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: Espacio.m,
    backgroundColor: Colores.fondo,
  },
  centro: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espacio.m,
    padding: Espacio.l,
    backgroundColor: Colores.fondo,
  },
  cargandoTitulo: {
    ...Tipografia.subtitulo,
    color: Colores.texto,
  },
  cargandoTexto: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    textAlign: 'center',
  },
  subtitulo: {
    ...Tipografia.cuerpo,
    color: Colores.textoSecundario,
    marginBottom: Espacio.m,
  },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.s,
    minHeight: TAMANO_TACTIL + Espacio.s,
    paddingLeft: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderRadius: Radio.m,
    borderWidth: 1,
    borderColor: Colores.borde,
  },
  entrada: {
    flex: 1,
    minHeight: TAMANO_TACTIL,
    ...Tipografia.cuerpo,
    color: Colores.texto,
  },
  botonLimpiar: {
    minWidth: TAMANO_TACTIL,
    minHeight: TAMANO_TACTIL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contador: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
    marginVertical: Espacio.s,
  },
  lista: {
    gap: Espacio.m,
    paddingBottom: Espacio.m,
  },
});
