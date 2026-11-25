import { useCallback, useEffect, useState } from "react";
import { obtenerPacientes } from "@/services/api";
import type { Paciente } from "@/types/paciente";

function mensajeDeError(e: unknown): string {
  return e instanceof Error
    ? e.message
    : "No se pudieron cargar los pacientes.";
}

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    obtenerPacientes()
      .then((datos) => {
        if (!cancelado) setPacientes(datos);
      })
      .catch((e: unknown) => {
        if (!cancelado) setError(mensajeDeError(e));
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  const recargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setPacientes(await obtenerPacientes());
    } catch (e) {
      setError(mensajeDeError(e));
    } finally {
      setCargando(false);
    }
  }, []);

  return { pacientes, cargando, error, recargar };
}
