import { useCallback, useEffect, useState } from 'react';
import { obtenerPacientes } from '@/services/api';
import { describirError, type ErrorApp } from '@/services/errores';
import { vibrar } from '@/utils/vibrar';
import { Paciente } from '@/data/pacientesMock';

// Hook propio: empaqueta los tres estados de la petición (cargando, error, datos).
export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<ErrorApp | null>(null);
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
        if (!activo) return;
        setError(describirError(e));
        vibrar.error(); // el teléfono avisa que algo falló
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
