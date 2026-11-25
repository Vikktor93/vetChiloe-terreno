import { Platform } from 'react-native';

export const Colores = {
  // Paleta tomada de vetChiloé web (teal) para que ambas se vean iguales
  primario: '#167D91',
  primarioOscuro: '#116779',
  primarioSuave: '#E1F3F5',
  fondo: '#F6F9FB',
  tarjeta: '#FFFFFF',
  borde: '#D5E2E8',
  texto: '#192E3B',
  textoSecundario: '#526775',
  textoSobrePrimario: '#FFFFFF',
  exito: '#1E7A4C',
  alerta: '#B8243A',
  alertaSuave: '#FDECEE',
  sombra: '#1D4257',
};

// Chips de especie como en la web (azul / naranjo / morado), con el texto oscurecido para llegar a 4.5:1.
export const ColoresEspecie: Record<string, { texto: string; fondo: string }> = {
  canino: { texto: '#3B67A8', fondo: '#E8F0FC' },
  felino: { texto: '#9A5128', fondo: '#FFF0E5' },
  'exótico': { texto: '#71499E', fondo: '#F1EAFA' },
  otro: { texto: Colores.primarioOscuro, fondo: Colores.primarioSuave },
};

export const Espacio = { xs: 4, s: 8, m: 16, l: 24, xl: 32 };
export const Radio = { s: 8, m: 12, l: 16, pildora: 999 };
export const TAMANO_TACTIL = 48;
export const Tamano = { fotoLista: 64, iconoFotoLista: 32, icono: 20, iconoEstado: 40, circuloEstado: 80 };

// Animaciones sutiles (ms). Reanimated las desactiva solo si el teléfono tiene "reducir movimiento".
export const Animacion = {
  rapida: 120, // achicar / soltar al presionar
  normal: 220, // aparición de tarjetas y ficha
  escalon: 40, // retraso entre tarjetas al aparecer
  maxEscalonados: 8, // solo las primeras tarjetas se animan, para no hacer lenta una lista larga
  escalaPresion: 0.97,
};

// Sombra suave de tarjeta (equivale a --card-shadow de la web).
export const Sombra = Platform.select({
  ios: { shadowColor: Colores.sombra, shadowOpacity: 0.08, shadowRadius: 12, shadowOffset: { width: 0, height: 3 } },
  android: { elevation: 2 },
  default: { boxShadow: '0 3px 12px rgba(29, 66, 87, 0.08)' },
});

export const Tipografia = {
  titulo: { fontSize: 24, fontWeight: '700' },
  subtitulo: { fontSize: 18, fontWeight: '600' },
  cuerpo: { fontSize: 16 },
  etiqueta: { fontSize: 14 },
} as const;
