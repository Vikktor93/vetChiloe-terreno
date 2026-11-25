import { useCallback, useEffect, useState } from 'react';

import { aErrorApi, type ErrorApi, obtenerPacientes } from '@/services/api';
import type { Paciente } from '@/types/paciente';
import { vibrar } from '@/utils/vibrar';

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<ErrorApi | null>(null);
  const [intento, setIntento] = useState(0);

  // Se ejecuta al abrir la pantalla y cada vez que cambia "intento".
  // Los estados solo cambian cuando llega la respuesta (o el error).
  useEffect(() => {
    let activo = true;
    obtenerPacientes()
      .then((datos) => {
        if (activo) setPacientes(datos);
      })
      .catch((e) => {
        if (!activo) return;
        setError(aErrorApi(e));
        vibrar.error();
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, [intento]);

  // Reintentar y deslizar para actualizar: vuelve al estado Cargando.
  const recargar = useCallback(() => {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }, []);

  return { pacientes, cargando, error, recargar };
}
