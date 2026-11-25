// tokens de la app: colores, espacios, radios y tipografia
export const Colores = {
  primario: "#739EA7", // celeste, solo para cosas decorativas
  primarioOscuro: "#3F6770", // celeste oscuro, para que se lea al sol
  fondo: "#E6ECE4", // salvia clarito
  tarjeta: "#FFFFFF",
  borde: "#CED9CB", // salvia
  texto: "#473D48", // ciruela
  textoSecundario: "#555B59", // gris oscuro, para que se lea al sol
  alerta: "#8A565A", // vino
  textoClaro: "#FFFFFF",

  // los otros colores de la paleta
  celeste: "#739EA7",
  salvia: "#CED9CB",
  rosa: "#E7BCC3",
  vino: "#8A565A",
  ciruela: "#473D48",
  crema: "#F1E9E6",
};

export const Espacio = {xs: 4, s: 8, m: 16, l: 24, xl: 32};
export const Radio = {s: 8, m: 12, l: 16};
export const TAMANO_TACTIL = 48;

export const Tipografia = {
  titulo: {fontSize: 24, fontWeight: "700"},
  subtitulo: {fontSize: 18, fontWeight: "600"},
  cuerpo: {fontSize: 16},
  etiqueta: {fontSize: 14},
} as const;
