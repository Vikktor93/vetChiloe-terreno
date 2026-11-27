import { useCallback, useEffect, useState } from 'react';
import { obtenerPacientes } from '@/services/api';
import type { Paciente } from '@/types/paciente';

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
      console.log('usePacientes:', e); // detalle técnico solo para depurar
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => { cargar(); }, [cargar]);

  return { pacientes, cargando, error, recargar: cargar };
}
