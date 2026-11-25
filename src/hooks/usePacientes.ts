import { useCallback, useEffect, useState } from 'react';

import { obtenerPacientes } from '@/services/api';
import { Paciente } from '@/types/paciente';

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = useCallback(async () => {
    if (pacientes.length === 0) {
      setCargando(true);
    } else {
      setActualizando(true);
    }

    setError(null);

    try {
      const datos = await obtenerPacientes();
      setPacientes(datos);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudieron cargar los pacientes.'
      );
    } finally {
      setCargando(false);
      setActualizando(false);
    }
  }, [pacientes.length]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return {
    pacientes,
    cargando,
    actualizando,
    error,
    recargar,
  };
}
