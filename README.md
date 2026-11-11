# vetChiloé en Terreno

Aplicación móvil para apoyar las atenciones veterinarias en terreno en Chiloé. Este proyecto usa React Native, Expo y TypeScript.

## Historias de usuario

- Como veterinario en terreno, quiero ver los pacientes de ejemplo en la pantalla de inicio para identificar rápidamente a quién atender.
- Como veterinario en terreno, quiero reconocer a cada paciente por su nombre, especie y foto para evitar confusiones durante una visita.
- Como veterinario en terreno, quiero consultar la aplicación desde mi teléfono para usarla durante el trabajo en terreno.

## Estado actual

- Plantilla de Expo limpiada: `src/app/` contiene solo `index.tsx` y `_layout.tsx`.
- Mock tipado de tres pacientes en `src/data/pacientesMock.ts`, reutilizando los datos del proyecto web.
- Componente `TarjetaPaciente` en `src/components/`, con imagen, especie, edad y número de atención.
- Los archivos de ejemplo y el primer avance de pacientes se conservaron en `example/`.
- TypeScript excluye `example/` para que ese código de referencia no interfiera con la app nueva.

### Referencia de adaptación web a React Native

El avance anterior está disponible en `example/src/`. `TarjetaPaciente.jsx` usaba elementos HTML (`div`, `h3`, `p`, `button`) y clases CSS; su adaptación usa componentes nativos como `View`, `Text`, `Pressable` e `Image`, con estilos definidos mediante `StyleSheet`.

## Ejecutar en Expo Go

Requisitos: Node.js y Expo Go instalado en el teléfono.

```bash
npm install
npx expo start
```

Con el teléfono y el computador conectados a la misma red Wi-Fi, escanea el código QR que aparece en la terminal con Expo Go. Si la red impide la conexión, inicia Expo con `npx expo start --tunnel`.

## Rama de trabajo

`estudiante/Benjamin-Concha`

## Proyecto web de referencia

- Datos: [`pacientesMock.js`](https://github.com/Vikktor93/vetChiloe/blob/main/src/data/pacientesMock.js)
- Componente: [`TarjetaPaciente.jsx`](https://github.com/Vikktor93/vetChiloe/blob/main/src/components/TarjetaPaciente.jsx)
