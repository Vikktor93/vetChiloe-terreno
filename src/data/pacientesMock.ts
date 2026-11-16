export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string; // URL de la imagen
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: 'Luna',
    numero_atencion: 'A-001',
    especie: 'Canino',
    edad: 4,
    diagnostico: 'Control anual',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    nombre: 'Mishi',
    numero_atencion: 'A-002',
    especie: 'Felino',
    edad: 2,
    diagnostico: 'Vacunación y desparasitación',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    nombre: 'Rocky',
    numero_atencion: 'A-003',
    especie: 'Canino',
    edad: 6,
    diagnostico: 'Revisión dermatológica',
    foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
  },
];