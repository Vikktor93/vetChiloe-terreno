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
  { id: 1, nombre: 'Charkicito', numero_atencion: 'A-001', especie: 'Felino', edad: 8, diagnostico: 'Control anual', foto: 'https://images.unsplash.com/photo-1790172202932-95d8991d25a3?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 2, nombre: 'Hannita', numero_atencion: 'A-002', especie: 'Felino', edad: 3, diagnostico: 'Vacunación', foto: 'https://images.unsplash.com/photo-1790172629627-12f29ca54657?q=80&w=671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
  { id: 3, nombre: 'Mercedes', numero_atencion: 'A-003', especie: 'Felino', edad: 8, diagnostico: 'Desparasitación', foto: 'https://images.unsplash.com/photo-1790171730151-7e0b88bdf614?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D' },
];