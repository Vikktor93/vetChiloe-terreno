import { useCallback, useEffect, useState } from 'react';
import { obtenerPacientes } from '@/services/api';
import { Paciente } from '@/types/paciente';

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await obtenerPacientes();
      setPacientes(datos);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { pacientes, cargando, error, recargar: cargar };
}