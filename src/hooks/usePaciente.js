import { useCallback, useEffect, useRef, useState } from "react";
import { obtenerPacientes } from "../data/pacientes";

export function usePacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [recargando, setRecargando] = useState(false);
  const [error, setError] = useState("");
  const solicitudRef = useRef(null);

  const cargar = useCallback(async ({ esRecarga = false } = {}) => {
    solicitudRef.current?.abort();

    const controller = new AbortController();
    solicitudRef.current = controller;
    await Promise.resolve();
    if (controller.signal.aborted) {
      return;
    }

    if (esRecarga) {
      setRecargando(true);
    } else {
      setCargando(true);
    }
    setError("");

    try {
      const pacientesCargados = await obtenerPacientes({
        signal: controller.signal,
      });
      if (!controller.signal.aborted) {
        setPacientes(pacientesCargados);
      }
    } catch (errorCarga) {
      if (!controller.signal.aborted) {
        console.error("No se pudieron cargar los pacientes.", errorCarga);
        setError(
          errorCarga instanceof Error
            ? errorCarga.message
            : "Ocurrió un error al cargar los pacientes.",
        );
      }
    } finally {
      if (!controller.signal.aborted) {
        solicitudRef.current = null;
        setCargando(false);
        setRecargando(false);
      }
    }
  }, []);

  useEffect(() => {
    let activo = true;
    void Promise.resolve().then(() => {
      if (activo) {
        return cargar();
      }
    });

    return () => {
      activo = false;
      solicitudRef.current?.abort();
    };
  }, [cargar]);

  const recargar = useCallback(
    () => cargar({ esRecarga: true }),
    [cargar],
  );

  return { pacientes, cargando, recargando, error, recargar };
}
