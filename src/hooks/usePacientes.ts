import { useCallback, useEffect, useState } from 'react';
import { obtenerPacientes } from '@/services/api';
import { Paciente } from '@/data/pacientesMock';

// Hook propio: empaqueta los tres estados de la petición (cargando, error, datos).
export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  // Se ejecuta al abrir la pantalla y cada vez que se pide recargar.
  // El estado solo cambia cuando llega la respuesta (o el error).
  useEffect(() => {
    let activo = true;
    obtenerPacientes()
      .then((datos) => {
        if (!activo) return;
        setPacientes(datos);
        setError(null);
      })
      .catch((e) => {
        if (activo) setError(e instanceof Error ? e.message : 'Error desconocido');
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, [intento]);

  // recargar sirve para "Reintentar" y para deslizar y actualizar.
  const recargar = useCallback(() => {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }, []);

  return { pacientes, cargando, error, recargar };
}
