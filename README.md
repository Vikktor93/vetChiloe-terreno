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

## Vibración y animaciones

Pensado para trabajar al sol, cuando la pantalla casi no se ve: cada acción importante confirma con una vibración (`expo-haptics`, helper en `src/utils/haptics.ts`).

- Botones: vibración media (primario) o suave (secundario); no vibran deshabilitados ni cargando.
- Tocar una tarjeta de paciente: vibración suave.
- "Registrar visita": vibración de éxito junto al aviso.
- Al aparecer un error de conexión (lista o ficha): vibración de error; "Reintentar" vibra como botón.
- Cambiar de pestaña: vibración de selección.
- El buscador no vibra al escribir.

Animaciones sutiles con Reanimated (duraciones en `Animacion` de `src/constants/tema.ts`): botones y tarjetas se achican levemente al presionarlos, las primeras tarjetas aparecen escalonadas y la ficha aparece con un fundido. Si el teléfono tiene activado "reducir movimiento", no se animan. En web y emuladores la vibración no hace nada; hay que probarla en un teléfono real.

## Variable de entorno

Crear o editar `.env` en la raíz del proyecto con la URL (HTTPS) de la API de vetChiloé:

```
EXPO_PUBLIC_API_URL=https://tu-api.onrender.com
```

La app consume `GET /api/pacientes` (lista) y `GET /api/pacientes/:id` (ficha). Las variables `EXPO_PUBLIC_` quedan dentro de la app: nunca pongas claves secretas. Después de cambiar `.env`, reiniciar con `npx expo start -c`.
