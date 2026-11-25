import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import Aparecer from '@/components/Aparecer';
import Presionable from '@/components/Presionable';
import { Colores, Espacio, Radio, Tipografia, TAMANO_TACTIL } from '@/constants/tema';

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
  deshabilitado?: boolean;
  cargando?: boolean;
  accessibilityHint?: string;
};

const COLORES = {
  primario: {
    fondo: { normal: Colores.primario, activo: Colores.primarioActivo },
    borde: { normal: Colores.primario, activo: Colores.primarioActivo },
  },
  secundario: {
    fondo: { normal: 'rgba(255, 92, 168, 0)', activo: Colores.acentoSuave },
    borde: { normal: Colores.acento, activo: Colores.acento },
  },
};

export default function Boton({
  titulo,
  onPress,
  variante = 'primario',
  deshabilitado = false,
  cargando = false,
  accessibilityHint,
}: Props) {
  const primario = variante === 'primario';
  const inactivo = deshabilitado || cargando;
  const colores = COLORES[variante];

  return (
    <Presionable
      onPress={onPress}
      disabled={inactivo}
      hitSlop={8}
      vibracion={primario ? 'toque' : 'seleccion'}
      fondo={colores.fondo}
      borde={colores.borde}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactivo, busy: cargando }}
      style={[styles.base, deshabilitado && styles.deshabilitado]}>
      {/* Cruce suave entre el texto y el indicador de carga */}
      {cargando ? (
        <Aparecer key="cargando" desde={0}>
          <ActivityIndicator color={primario ? Colores.textoSobrePrimario : Colores.acento} />
        </Aparecer>
      ) : (
        <Aparecer key="texto" desde={0}>
          <Text style={[styles.texto, !primario && styles.textoSecundario]}>{titulo}</Text>
        </Aparecer>
      )}
    </Presionable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: TAMANO_TACTIL,
    borderRadius: Radio.m,
    borderWidth: 2,
    paddingHorizontal: Espacio.l,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deshabilitado: { opacity: 0.4 },
  texto: { ...Tipografia.subtitulo, color: Colores.textoSobrePrimario },
  textoSecundario: { color: Colores.acento },
});
