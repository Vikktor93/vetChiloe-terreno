// Forma de un paciente tal como lo entrega la API de vetChiloé web.
export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  // La API calcula la edad desde la fecha de nacimiento ("3 años", "5 meses")
  // o devuelve el número ingresado a mano; puede venir vacía.
  edad: number | string | null;
  diagnostico: string;
  // URL, imagen en base64 (data:) o 'sin-foto.svg' si no tiene foto.
  foto: string;
  raza?: string;
  peso?: number;
  fecha_nacimiento?: string;
  'dueño'?: string;
  rut?: string;
  telefono?: string;
};

export function formatearEdad(edad: Paciente['edad']): string {
  if (edad === null || edad === '') return 'Edad sin registrar';
  if (typeof edad === 'number') return `${edad} ${edad === 1 ? 'año' : 'años'}`;
  return edad;
}

// React Native no dibuja SVG ni rutas relativas: solo URLs o data: de imagen.
export function fotoValida(foto: string | undefined): foto is string {
  return !!foto && (/^https?:\/\//.test(foto) || /^data:image\/(png|jpe?g|webp|gif)/.test(foto));
}
