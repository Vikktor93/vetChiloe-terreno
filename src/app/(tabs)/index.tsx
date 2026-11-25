import { useState } from 'react';
import { View, Text, RefreshControl, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TarjetaPaciente from '@/components/TarjetaPaciente';
import Aparecer from '@/components/Aparecer';
import Boton from '@/components/Boton';
import Buscador from '@/components/Buscador';
import FiltroEspecie from '@/components/FiltroEspecie';
import { ListaEsqueleto } from '@/components/Esqueleto';
import { usePacientes } from '@/hooks/usePacientes';
import { Paciente } from '@/data/pacientesMock';
import { vibrar } from '@/utils/vibrar';
import { Colores, Encabezado, Espacio, Radio, Tipografia } from '@/constants/tema';

const TODOS = 'Todos';

export default function PacientesScreen() {
  const insets = useSafeAreaInsets();
  const { pacientes, cargando, error, recargar } = usePacientes();
  const [busqueda, setBusqueda] = useState('');
  const [especie, setEspecie] = useState(TODOS);
  const [deslizando, setDeslizando] = useState(false);

  // Posición del scroll, leída en el hilo de UI (sin pasar por React).
  const scrollY = useSharedValue(0);
  const alHacerScroll = useAnimatedScrollHandler((e) => {
    scrollY.set(e.contentOffset.y);
  });

  // Filtros: especies que vienen de la API, con su conteo
  const conteo: Record<string, number> = { [TODOS]: pacientes.length };
  for (const p of pacientes) conteo[p.especie] = (conteo[p.especie] ?? 0) + 1;
  const especies = [TODOS, ...Object.keys(conteo).filter((e) => e !== TODOS).sort()];

  const texto = busqueda.trim().toLowerCase();
  const pacientesFiltrados = pacientes.filter(
    (p) =>
      (especie === TODOS || p.especie === especie) &&
      (p.nombre.toLowerCase().includes(texto) || p.especie.toLowerCase().includes(texto))
  );

  const primeraCarga = cargando && pacientes.length === 0 && !error;

  const actualizar = () => {
    vibrar.seleccion();
    setDeslizando(true);
    recargar();
  };
  if (deslizando && !cargando) setDeslizando(false);

  // Título grande: sube más lento que el scroll (parallax), se desvanece,
  // y al tirar hacia abajo crece un poco (como en iOS).
  const estiloTituloGrande = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, Encabezado.colapso], [1, 0], Extrapolation.CLAMP),
    transform: [
      { translateY: interpolate(scrollY.value, [-100, 0, 100], [0, 0, 30], Extrapolation.CLAMP) },
      { scale: interpolate(scrollY.value, [-120, 0], [1.12, 1], Extrapolation.CLAMP) },
    ],
  }));

  // Barra compacta: aparece justo cuando el título grande se va.
  const estiloBarra = useAnimatedStyle(() => {
    const p = interpolate(
      scrollY.value,
      [Encabezado.colapso * 0.6, Encabezado.colapso],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity: p, transform: [{ translateY: (1 - p) * -6 }] };
  });

  const cabecera = (
    <View style={styles.cabecera}>
      <Animated.View style={[styles.tituloGrande, estiloTituloGrande]}>
        <Text style={styles.titulo} accessibilityRole="header">
          Pacientes
        </Text>
        <Text style={styles.subtitulo}>
          {primeraCarga
            ? 'Conectando con la clínica...'
            : `La clínica, ahora en terreno · ${pacientes.length} pacientes`}
        </Text>
      </Animated.View>
      <Buscador valor={busqueda} onCambiar={setBusqueda} editable={!primeraCarga} />
      {!primeraCarga && !error && especies.length > 2 && (
        <Aparecer desde={0}>
          <FiltroEspecie
            opciones={especies}
            valor={especie}
            onCambiar={setEspecie}
            conteo={conteo}
          />
        </Aparecer>
      )}
    </View>
  );

  const vacio =
    pacientes.length === 0
      ? 'No hay pacientes registrados.'
      : busqueda.trim()
        ? `Sin resultados para «${busqueda.trim()}».`
        : `No hay pacientes de especie ${especie}.`;

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top }]}>
      {/* Barra compacta fija arriba: aparece al hacer scroll */}
      <Animated.View
        pointerEvents="none"
        style={[styles.barra, { top: insets.top }, estiloBarra]}>
        <Text style={styles.barraTitulo}>Pacientes</Text>
        <Text style={styles.barraConteo}>{pacientesFiltrados.length}</Text>
      </Animated.View>

      {primeraCarga ? (
        <View style={styles.contenido}>
          {cabecera}
          <ListaEsqueleto />
        </View>
      ) : error ? (
        <View style={styles.contenido}>
          {cabecera}
          <Aparecer desde={0} style={styles.centro}>
            <Text style={styles.error} accessibilityRole="alert">
              No se pudieron cargar los pacientes.
            </Text>
            <Text style={styles.detalleError}>{error}</Text>
            <Boton titulo="Reintentar" onPress={recargar} cargando={cargando} />
          </Aparecer>
        </View>
      ) : (
        <Animated.FlatList<Paciente>
          data={pacientesFiltrados}
          keyExtractor={(p) => p.id.toString()}
          ListHeaderComponent={cabecera}
          renderItem={({ item, index }) => (
            <Aparecer orden={index}>
              <TarjetaPaciente paciente={item} />
            </Aparecer>
          )}
          onScroll={alHacerScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.lista}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
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
              <Text style={styles.mensaje}>{vacio}</Text>
            </Aparecer>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: Colores.fondo },
  contenido: { flex: 1, paddingHorizontal: Espacio.m, gap: Espacio.m },
  lista: { paddingHorizontal: Espacio.m, paddingBottom: Espacio.xl, gap: Espacio.m, flexGrow: 1 },
  cabecera: { gap: Espacio.m, paddingTop: Espacio.m },
  tituloGrande: { gap: Espacio.xs, transformOrigin: 'left' },
  titulo: { fontSize: Encabezado.tituloGrande, fontWeight: '800', color: Colores.texto, letterSpacing: -0.5 },
  subtitulo: { ...Tipografia.etiqueta, color: Colores.textoSecundario },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espacio.s,
    paddingVertical: Espacio.m,
    backgroundColor: Colores.tarjeta,
    borderBottomWidth: 1,
    borderColor: Colores.borde,
  },
  barraTitulo: { ...Tipografia.subtitulo, color: Colores.texto },
  barraConteo: {
    ...Tipografia.etiqueta,
    fontWeight: '700',
    color: Colores.acento,
    paddingHorizontal: Espacio.s,
    borderRadius: Radio.completo,
    backgroundColor: Colores.acentoSuave,
    overflow: 'hidden',
  },
  centro: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: Espacio.m, padding: Espacio.l },
  mensaje: { ...Tipografia.cuerpo, color: Colores.textoSecundario, textAlign: 'center', marginTop: Espacio.xl },
  error: { ...Tipografia.subtitulo, color: Colores.alerta, textAlign: 'center' },
  detalleError: { ...Tipografia.etiqueta, color: Colores.textoSecundario, textAlign: 'center' },
});
