export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number;
  diagnostico: string;
  foto: string;
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: 'Luna',
    numero_atencion: 'A-001',
    especie: 'Canino',
    edad: 4,
    diagnostico: 'Control anual',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=200',
  },
  {
    id: 2,
    nombre: 'Michi',
    numero_atencion: 'A-002',
    especie: 'Felino',
    edad: 2,
    diagnostico: 'Vacunación triple felina',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200',
  },
  {
    id: 3,
    nombre: 'Toby',
    numero_atencion: 'A-003',
    especie: 'Canino',
    edad: 6,
    diagnostico: 'Revisión dermatológica',
    foto: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200',
  },
];