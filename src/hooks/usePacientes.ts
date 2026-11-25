import { useCallback, useEffect, useState } from 'react';
import { obtenerPacientes } from '@/services/api';
import { Paciente } from '@/data/pacientesMock';

// Hook propio: empaqueta los tres estados de la petición (cargando, error, datos).
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

  useEffect(() => {
    cargar();
  }, [cargar]);

  // recargar sirve para "Reintentar" y para deslizar y actualizar
  return { pacientes, cargando, error, recargar: cargar };
}
