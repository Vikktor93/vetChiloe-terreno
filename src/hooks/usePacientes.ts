import type { Paciente } from '@/data/pacientesMock';
import { obtenerPacientes } from '@/services/api';
import { useCallback, useEffect, useState } from 'react';

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [refrescando, setRefrescando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = useCallback(async (actualizar = false) => {
    if (actualizar) {
      setRefrescando(true);
    } else {
      setCargando(true);
    }
    setError(null);

    try {
      setPacientes(await obtenerPacientes());
    } catch (causa) {
      setError(causa instanceof Error ? causa.message : 'Ocurrió un error inesperado.');
    } finally {
      setCargando(false);
      setRefrescando(false);
    }
  }, []);

  useEffect(() => {
    void Promise.resolve().then(() => cargar());
  }, [cargar]);

  return {
    pacientes,
    cargando,
    refrescando,
    error,
    reintentar: () => cargar(),
    actualizar: () => cargar(true),
  };
}