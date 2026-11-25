import { useEffect, useState, type ReactNode } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator, Pressable, RefreshControl, StyleSheet,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import Boton from '@/components/Boton';
import { usePacientes } from '@/hooks/usePacientes';
import { vibrar } from '@/utils/haptics';
import {
  Animacion, Colores, Espacio, Radio, Tamano, Tipografia, TAMANO_TACTIL,
} from '@/constants/tema';

// Entrada escalonada solo para las primeras tarjetas; se crean una vez, fuera del render.
const ENTRADAS = Array.from({ length: Animacion.maxEscalonados }, (_, i) =>
  FadeInDown.duration(Animacion.normal).delay(i * Animacion.escalon));

type PropsEstado = {
  icono: keyof typeof Ionicons.glyphMap;
  titulo: string;
  mensaje?: string;
  error?: boolean;
  children?: ReactNode;
};

// Estado vacío / error con ícono, igual para todas las variantes de la lista.
function Estado({ icono, titulo, mensaje, error = false, children }: PropsEstado) {
  return (
    <View style={styles.estado}>
      <View style={[styles.circulo, error && styles.circuloError]}>
        <Ionicons name={icono} size={Tamano.iconoEstado}
          color={error ? Colores.alerta : Colores.primarioOscuro} />
      </View>
      <Text style={styles.estadoTitulo}>{titulo}</Text>
      {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
      {children}
    </View>
  );
}

export default function Pacientes() {
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');
  const [enfocado, setEnfocado] = useState(false);
  const filtrados = pacientes.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()));

  useEffect(() => {
    if (error) vibrar.error();
  }, [error]);

  if (cargando && pacientes.length === 0) {
    return (
      <ActivityIndicator style={styles.centro}
        size="large" color={Colores.primario} />
    );
  }
  if (error) {
    return (
      <View style={styles.centro}>
        <Estado icono="cloud-offline-outline" error
          titulo="No se pudieron cargar los pacientes."
          mensaje="Revisa tu conexión e inténtalo de nuevo.">
          <Boton titulo="Reintentar" onPress={recargar} />
        </Estado>
      </View>
    );
  }

  const total = busqueda ? `${filtrados.length} de ${pacientes.length}` : `${pacientes.length}`;
  const plural = pacientes.length === 1 ? 'paciente' : 'pacientes';

  return (
    <View style={styles.contenedor}>
      <View style={[styles.buscador, enfocado && styles.buscadorEnfocado]}>
        <Ionicons name="search" size={Tamano.icono} color={Colores.textoSecundario} />
        <TextInput
          style={styles.input}
          placeholder="Buscar paciente..."
          placeholderTextColor={Colores.textoSecundario}
          accessibilityLabel="Buscar paciente por nombre"
          value={busqueda}
          onChangeText={setBusqueda}
          onFocus={() => setEnfocado(true)}
          onBlur={() => setEnfocado(false)}
          returnKeyType="search"
        />
        {busqueda ? (
          <Pressable onPress={() => setBusqueda('')} style={styles.limpiar}
            accessibilityRole="button" accessibilityLabel="Borrar búsqueda">
            <Ionicons name="close-circle" size={Tamano.icono} color={Colores.textoSecundario} />
          </Pressable>
        ) : null}
      </View>
      {pacientes.length > 0 ? (
        <View style={styles.resumen}>
          <Text style={styles.resumenTitulo}>Mis pacientes</Text>
          <View style={styles.contador}>
            <Text style={styles.contadorTexto}>{total} {plural}</Text>
          </View>
        </View>
      ) : null}
      <FlatList
        data={filtrados}
        keyExtractor={(p) => p.id.toString()}
        renderItem={({ item, index }) => (
          // Sin animación mientras se escribe en el buscador.
          <Animated.View entering={busqueda ? undefined : ENTRADAS[index]}>
            <TarjetaPaciente paciente={item} />
          </Animated.View>
        )}
        contentContainerStyle={styles.lista}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={cargando}
            onRefresh={recargar}
            colors={[Colores.primario]}
            tintColor={Colores.primario}
          />
        }
        ListEmptyComponent={
          pacientes.length > 0
            ? <Estado icono="search-outline" titulo="Sin resultados"
                mensaje={`Ningún paciente coincide con "${busqueda}".`} />
            : <Estado icono="paw-outline" titulo="No hay pacientes."
                mensaje="Desliza hacia abajo para actualizar." />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: Colores.fondo },
  centro: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    padding: Espacio.m, backgroundColor: Colores.fondo,
  },
  buscador: {
    flexDirection: 'row', alignItems: 'center', gap: Espacio.s,
    minHeight: TAMANO_TACTIL,
    margin: Espacio.m, marginBottom: 0, paddingLeft: Espacio.m,
    backgroundColor: Colores.tarjeta, borderRadius: Radio.m,
    borderWidth: 1, borderColor: Colores.borde,
  },
  buscadorEnfocado: { borderColor: Colores.primario },
  input: {
    ...Tipografia.cuerpo, flex: 1, color: Colores.texto,
    minHeight: TAMANO_TACTIL, paddingVertical: Espacio.s, paddingRight: Espacio.m,
  },
  limpiar: {
    width: TAMANO_TACTIL, height: TAMANO_TACTIL, alignItems: 'center', justifyContent: 'center',
  },
  resumen: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Espacio.m, paddingTop: Espacio.m, paddingBottom: Espacio.s,
  },
  resumenTitulo: { ...Tipografia.subtitulo, fontWeight: '700', color: Colores.texto },
  contador: {
    backgroundColor: Colores.primarioSuave, borderRadius: Radio.pildora,
    paddingHorizontal: Espacio.s + Espacio.xs, paddingVertical: Espacio.xs,
  },
  contadorTexto: { ...Tipografia.etiqueta, fontWeight: '600', color: Colores.primarioOscuro },
  lista: { gap: Espacio.m, padding: Espacio.m, paddingTop: Espacio.s, flexGrow: 1 },
  estado: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: Espacio.m, padding: Espacio.l,
  },
  circulo: {
    width: Tamano.circuloEstado, height: Tamano.circuloEstado, borderRadius: Radio.pildora,
    alignItems: 'center', justifyContent: 'center', backgroundColor: Colores.primarioSuave,
  },
  circuloError: { backgroundColor: Colores.alertaSuave },
  estadoTitulo: { ...Tipografia.subtitulo, color: Colores.texto, textAlign: 'center' },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center' },
});
