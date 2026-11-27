// Forma de un paciente tal como lo entrega la API (GET /api/pacientes)
export type Paciente = {
  id: number;
  nombre: string;
  numero_atencion: string;
  especie: string;
  edad: number | string | null; // la API la guarda como texto: "8 años"
  diagnostico: string | null;
  foto: string | null;          // algunos pacientes no tienen foto
};

// Muestra la edad igual venga como número (8) o como texto ("8 años")
export function formatearEdad(edad: Paciente['edad']): string {
  if (edad === null || edad === '') return 'Edad sin registrar';
  return typeof edad === 'number' ? `${edad} años` : edad;
}
