# vetChiloé Terreno

App móvil (Expo SDK 58 + Expo Router) para que el equipo de vetChiloé atienda pacientes en terreno: lista de pacientes con buscador, ficha de cada paciente y datos reales desde la API de vetChiloé web.

## Historias de usuario

- Como veterinario en terreno, quiero ver la lista de mis pacientes en el teléfono, para saber a quién debo atender sin volver a la clínica.
- Como veterinario en terreno, quiero buscar un paciente por su nombre, para encontrarlo rápido mientras estoy en un predio.
- Como veterinario en terreno, quiero abrir la ficha de un paciente con su foto, especie, edad y diagnóstico, para revisar sus antecedentes antes de examinarlo.
- Como veterinario en terreno, quiero tener el botón "Registrar visita" al alcance del pulgar, para usar la app con una sola mano mientras sostengo al animal.
- Como veterinario en terreno, quiero ver un aviso claro y un botón para reintentar cuando falla la conexión, para no quedarme sin datos cuando la señal es intermitente.

## Cómo ejecutar

```bash
npm install
npx expo start -c
```

Escanear el código QR con Expo Go.

Revisiones:

```bash
npx tsc --noEmit
npx expo lint
```

## Variable de entorno

Crear o editar `.env` en la raíz del proyecto con la URL (HTTPS) de la API de vetChiloé:

```
EXPO_PUBLIC_API_URL=https://tu-api.onrender.com
```

La app consume `GET /api/pacientes` (lista) y `GET /api/pacientes/:id` (ficha). Las variables `EXPO_PUBLIC_` quedan dentro de la app: nunca pongas claves secretas. Después de cambiar `.env`, reiniciar con `npx expo start -c`.
