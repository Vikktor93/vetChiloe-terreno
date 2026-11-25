import { useCallback, useEffect, useState } from 'react';
import { obtenerPacientes } from '@/services/api';
import { Paciente } from '@/data/pacientesMock';

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setPacientes(await obtenerPacientes());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  }, []);

  // En la primera carga cargando ya es true y error null: esos setState no cambian nada.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { cargar(); }, [cargar]);

  return { pacientes, cargando, error, recargar: cargar };
}
