// Tokens del sistema de diseño de vetChiloé Terreno.
// Los nombres describen el uso (primario, alerta), no el color.
export const Colores = {
  primario: '#2E7D32',
  primarioOscuro: '#1B5E20',
  fondo: '#F1F8F2',
  tarjeta: '#FFFFFF',
  borde: '#D5E5D6',
  texto: '#26352A',
  textoSecundario: '#56655A',
  textoSobrePrimario: '#FFFFFF',
  exito: '#1E7A4C',
  alerta: '#B8243A',
  advertencia: '#8A5300',
  // Fondos suaves para los avisos (los textos encima usan Colores.texto).
  primarioSuave: '#E3F1E4',
  alertaSuave: '#FBE9EC',
  advertenciaSuave: '#FFF1D6',
  // Acentos neón (solo para brillos, bordes y detalles; nunca para texto sobre blanco).
  neon: '#00E676',
  neonClaro: '#69F0AE',
};

// Brillos neón con boxShadow (React Native 0.76+), en los tonos verdes del tema.
export const Brillo = {
  suave: '0 4px 14px rgba(46, 125, 50, 0.18), 0 0 0 1px rgba(0, 230, 118, 0.25)',
  intenso: '0 6px 22px rgba(0, 230, 118, 0.45), 0 0 0 2px rgba(0, 230, 118, 0.8)',
  foto: '0 0 10px rgba(0, 230, 118, 0.6)',
};

// Degradados con backgroundImage (React Native 0.80+).
export const Degradado = {
  acento: 'linear-gradient(180deg, #69F0AE 0%, #00E676 45%, #2E7D32 100%)',
  pie: 'linear-gradient(90deg, rgba(227, 241, 228, 1) 0%, rgba(255, 255, 255, 1) 100%)',
};

export const Duracion = { rapida: 150, normal: 300, lenta: 450 };

export const Espacio = { xs: 4, s: 8, m: 16, l: 24, xl: 32 };
export const Radio = { s: 8, m: 12, l: 16, completo: 999 };
export const TAMANO_TACTIL = 48;

export const Tipografia = {
  titulo: { fontSize: 24, fontWeight: '700' },
  subtitulo: { fontSize: 18, fontWeight: '600' },
  cuerpo: { fontSize: 16 },
  etiqueta: { fontSize: 14 },
} as const;
