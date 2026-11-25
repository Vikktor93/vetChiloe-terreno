import { Paciente } from "@/data/pacientesMock";
import { obtenerPacientes } from "@/services/api";
import { useCallback, useEffect, useState } from "react";

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // cargar sirve para la primera vez, para reintentar y para deslizar y actualizar
  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      setPacientes(await obtenerPacientes());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return {pacientes, cargando, error, recargar: cargar};
}
