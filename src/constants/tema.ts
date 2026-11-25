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
};

export const Espacio = { xs: 4, s: 8, m: 16, l: 24, xl: 32 };
export const Radio = { s: 8, m: 12, l: 16, completo: 999 };
export const TAMANO_TACTIL = 48;

export const Tipografia = {
  titulo: { fontSize: 24, fontWeight: '700' },
  subtitulo: { fontSize: 18, fontWeight: '600' },
  cuerpo: { fontSize: 16 },
  etiqueta: { fontSize: 14 },
} as const;
