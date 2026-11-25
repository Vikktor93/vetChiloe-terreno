import { Easing } from 'react-native-reanimated';

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
  // Estados interactivos (hover con puntero / presionado)
  primarioActivo: '#E8378F',  // Botón primario bajo el dedo o el puntero
  tarjetaActiva: '#1F1A26',   // Tarjeta bajo el dedo o el puntero
  acentoSuave: 'rgba(255, 92, 168, 0.14)', // Relleno del botón secundario activo
  esqueleto: '#24202B',       // Bloques del esqueleto de carga
  // Degradado sobre la foto de la ficha (para que el texto blanco se lea)
  sombraFoto: ['rgba(11, 11, 14, 0)', 'rgba(11, 11, 14, 0.55)', '#0B0B0E'] as const,
  vidrio: 'rgba(22, 22, 29, 0.72)', // botones flotantes sobre la foto
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

// Movimiento: duraciones (ms) y curvas compartidas por toda la app.
// Presionar responde rápido (100–160 ms); la UI nunca pasa de 300 ms.
export const Movimiento = {
  presion: 120,        // el dedo toca: respuesta inmediata
  soltar: 220,         // el dedo se levanta: vuelve suave
  hover: 160,          // puntero encima (tablet con mouse / web)
  entrada: 240,        // elementos que aparecen
  escalonado: 50,      // retraso entre elementos de una lista
  pulso: 850,          // respiración del esqueleto de carga
  escalaPresion: 0.97, // nunca 0: se encoge apenas, como un botón físico
  escalaHover: 1.015,
};

// Curvas fuertes (los ease-out por defecto son muy débiles).
// Nunca ease-in en UI: empieza lento justo cuando el usuario mira.
export const Curvas = {
  salida: Easing.bezier(0.23, 1, 0.32, 1),       // entradas, presión, hover
  enMovimiento: Easing.bezier(0.77, 0, 0.175, 1), // cosas que se mueven en pantalla
  respiracion: Easing.inOut(Easing.quad),         // pulso continuo del esqueleto
};

// Resortes: para movimientos que el usuario puede interrumpir (conservan la
// velocidad si cambias de idea a mitad de camino). Rebote mínimo: la app es
// de trabajo, no un juego.
export const Resortes = {
  // Píldora del filtro que se desliza entre opciones
  deslizar: { damping: 20, stiffness: 220, mass: 0.7 },
  // Al soltar un botón vuelve con un pequeño rebote
  soltar: { damping: 14, stiffness: 320, mass: 0.6 },
};

// Medidas de los encabezados que se transforman con el scroll.
export const Encabezado = {
  alturaFoto: 300,  // foto de la ficha
  tituloGrande: 32, // "Pacientes" antes de hacer scroll
  colapso: 64,      // px de scroll en que el título grande pasa a barra compacta
};
