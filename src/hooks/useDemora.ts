import { useEffect, useState } from 'react';

// Devuelve true si "activo" lleva más de "ms" milisegundos encendido.
// Sirve para avisar que Render está despertando cuando la carga se alarga.
export function useDemora(activo: boolean, ms = 6000) {
  const [demorado, setDemorado] = useState(false);

  useEffect(() => {
    if (!activo) return;
    const temporizador = setTimeout(() => setDemorado(true), ms);
    return () => {
      clearTimeout(temporizador);
      setDemorado(false);
    };
  }, [activo, ms]);

  return activo && demorado;
}
