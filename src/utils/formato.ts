/**
 * La API entrega la edad a veces como número (4), a veces como texto ("8")
 * y a veces ya escrita ("23 años y 5 meses"). Esto la deja siempre legible.
 */
export function formatearEdad(edad: number | string): string {
  const texto = String(edad).trim();
  if (/año|mes|sem|día/i.test(texto)) return texto; // ya viene con unidad
  const n = Number(texto);
  if (Number.isNaN(n)) return texto;
  return n === 1 ? '1 año' : `${n} años`;
}
