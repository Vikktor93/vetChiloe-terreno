// Sistema de diseño de vetChiloé Terreno (Avance 03).
// Los nombres describen el USO (primario, alerta), no el color.
// Cambias un token aquí y se actualiza toda la app.

export const Colores = {
  primario: '#D81B7A',        // Fondo de botones principales (texto blanco encima: 4,8:1)
  primarioOscuro: '#A10058',  // Bordes y detalles de acento
  acento: '#FF5CA8',          // Texto rosa sobre fondo oscuro (6,3:1, cumple WCAG AA)
  fondo: '#0B0B0E',           // Fondo de pantalla
  tarjeta: '#16161D',         // Tarjetas, inputs, barras
  borde: '#2B2230',           // Bordes sutiles
  texto: '#F8F9FA',           // Texto principal
  textoSecundario: '#A0A0AB', // Subtítulos y etiquetas (6,9:1 sobre tarjeta)
  textoSobrePrimario: '#FFFFFF',
  alerta: '#FF4D6D',          // Errores
};

// Escala fija de espaciado: nada de márgenes al azar.
export const Espacio = { xs: 4, s: 8, m: 16, l: 24, xl: 32 };

export const Radio = { s: 8, m: 12, l: 16, completo: 999 };

// Mínimo táctil: 48 dp en Android (Material) / 44 pt en iOS (HIG).
export const TAMANO_TACTIL = 48;

// Ningún texto bajo 14; el cuerpo es 16.
export const Tipografia = {
  titulo: { fontSize: 24, fontWeight: '700' },
  subtitulo: { fontSize: 18, fontWeight: '600' },
  cuerpo: { fontSize: 16 },
  etiqueta: { fontSize: 14 },
} as const;
