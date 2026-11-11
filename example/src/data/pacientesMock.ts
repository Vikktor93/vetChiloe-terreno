export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: 'Felino' | 'Canino';
  edad: string;
  diagnostico: string;
  foto: string;
};

export const pacientesMock: Paciente[] = [
  {
    id: 1,
    nombre: 'Charkicito',
    numero_atencion: '2026-A1',
    especie: 'Felino',
    edad: '8 años',
    diagnostico: 'Control sano y vacunas al día.',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 2,
    nombre: 'Mercedes',
    numero_atencion: '2026-B2',
    especie: 'Felino',
    edad: '8 años',
    diagnostico: 'Tratamiento por otitis leve.',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    nombre: 'Hannita',
    numero_atencion: '2026-C3',
    especie: 'Felino',
    edad: '3 años',
    diagnostico: 'Observación por alergia alimentaria.',
    foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80',
  },
];
