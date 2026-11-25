import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import FotoPaciente from '@/components/FotoPaciente';
import {
  Brillo,
  Colores,
  Degradado,
  Duracion,
  Espacio,
  Radio,
  Tipografia,
} from '@/constants/tema';
import { formatearEdad, type Paciente } from '@/types/paciente';
import { vibrar } from '@/utils/vibrar';

type Props = {
  paciente: Paciente;
  // Posición en la lista: las tarjetas aparecen una tras otra.
  indice?: number;
};

const iconoEspecie: Record<string, keyof typeof Ionicons.glyphMap> = {
  Canino: 'paw',
  Felino: 'paw',
  Ave: 'leaf',
  Pez: 'fish',
};

export default function TarjetaPaciente({ paciente, indice = 0 }: Props) {
  const edad = formatearEdad(paciente.edad);

  return (
    <Animated.View
      entering={FadeInDown.delay(Math.min(indice, 8) * 70).duration(Duracion.normal)}
    >
      <Link href={{ pathname: '/paciente/[id]', params: { id: paciente.id } }} asChild>
        <Pressable
          onPressIn={vibrar.seleccion}
          accessibilityRole="button"
          accessibilityLabel={`Ver ficha de ${paciente.nombre}, ${paciente.especie}, ${edad}, atención ${paciente.numero_atencion}`}
          accessibilityHint="Abre la ficha clínica"
        >
          {({ pressed }) => (
            <View style={[styles.tarjeta, pressed && styles.tarjetaPresionada]}>
              {/* Franja neón a la izquierda */}
              <View style={styles.acento} />

              <View style={styles.cuerpo}>
                {/* Fila superior: foto + nombre + etiquetas */}
                <View style={styles.cabecera}>
                  <View style={styles.anilloFoto}>
                    <FotoPaciente paciente={paciente} estilo={styles.foto} tamanoIcono={28} />
                  </View>
                  <View style={styles.info}>
                    <Text style={styles.nombre} numberOfLines={1}>
                      {paciente.nombre}
                    </Text>
                    <View style={styles.chips}>
                      <View style={styles.chip}>
                        <Ionicons
                          name={iconoEspecie[paciente.especie] ?? 'paw'}
                          size={14}
                          color={Colores.primarioOscuro}
                        />
                        <Text style={styles.chipTexto}>{paciente.especie}</Text>
                      </View>
                      <View style={styles.chip}>
                        <Ionicons name="time-outline" size={14} color={Colores.primarioOscuro} />
                        <Text style={styles.chipTexto}>{edad}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Pie a lo ancho: N° de atención y "Ver ficha" */}
                <View style={styles.pie}>
                  <View style={styles.atencion}>
                    <Ionicons
                      name="document-text-outline"
                      size={16}
                      color={Colores.textoSecundario}
                    />
                    <Text style={styles.atencionTexto}>N° {paciente.numero_atencion}</Text>
                  </View>
                  <View style={[styles.verFicha, pressed && styles.verFichaPresionado]}>
                    <Text style={[styles.verFichaTexto, pressed && styles.verFichaTextoPresionado]}>
                      Ver ficha
                    </Text>
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color={pressed ? Colores.textoSobrePrimario : Colores.primario}
                    />
                  </View>
                </View>
              </View>
            </View>
          )}
        </Pressable>
      </Link>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row',
    borderRadius: Radio.l,
    backgroundColor: Colores.tarjeta,
    borderWidth: 1,
    borderColor: Colores.borde,
    boxShadow: Brillo.suave,
    overflow: 'hidden',
  },
  tarjetaPresionada: {
    borderColor: Colores.neon,
    boxShadow: Brillo.intenso,
    transform: [{ scale: 0.98 }],
  },
  acento: {
    width: 6,
    backgroundImage: Degradado.acento,
  },
  cuerpo: {
    flex: 1,
  },
  cabecera: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.m,
    padding: Espacio.m,
  },
  anilloFoto: {
    padding: 3,
    borderRadius: Radio.completo,
    borderWidth: 2,
    borderColor: Colores.neon,
    boxShadow: Brillo.foto,
  },
  foto: {
    width: 60,
    height: 60,
    borderRadius: Radio.completo,
    backgroundColor: Colores.borde,
  },
  info: {
    flex: 1,
    gap: Espacio.s,
  },
  nombre: {
    ...Tipografia.subtitulo,
    fontSize: 20,
    color: Colores.texto,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Espacio.s,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.xs,
    paddingHorizontal: Espacio.s + 2,
    paddingVertical: Espacio.xs,
    borderRadius: Radio.completo,
    backgroundColor: Colores.primarioSuave,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.35)',
  },
  chipTexto: {
    ...Tipografia.etiqueta,
    fontWeight: '600',
    color: Colores.primarioOscuro,
  },
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Espacio.m,
    paddingVertical: Espacio.s,
    borderTopWidth: 1,
    borderTopColor: Colores.borde,
    backgroundImage: Degradado.pie,
  },
  atencion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacio.xs,
  },
  atencionTexto: {
    ...Tipografia.etiqueta,
    color: Colores.textoSecundario,
    fontVariant: ['tabular-nums'],
  },
  verFicha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minHeight: 36,
    paddingLeft: Espacio.m,
    paddingRight: Espacio.s,
    borderRadius: Radio.completo,
    borderWidth: 1.5,
    borderColor: Colores.primario,
    backgroundColor: Colores.tarjeta,
  },
  verFichaPresionado: {
    backgroundColor: Colores.primario,
    borderColor: Colores.neon,
    boxShadow: Brillo.foto,
  },
  verFichaTexto: {
    ...Tipografia.etiqueta,
    fontWeight: '700',
    color: Colores.primario,
  },
  verFichaTextoPresionado: {
    color: Colores.textoSobrePrimario,
  },
});
