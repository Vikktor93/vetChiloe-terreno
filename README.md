# vetChiloé en Terreno

Aplicación móvil para apoyar las atenciones veterinarias en terreno en Chiloé. Este proyecto usa React Native, Expo y TypeScript.

## Historias de usuario

- Como veterinario en terreno, quiero ver los pacientes de ejemplo en la pantalla de inicio para identificar rápidamente a quién atender.
- Como veterinario en terreno, quiero reconocer a cada paciente por su nombre, especie y foto para evitar confusiones durante una visita.
- Como veterinario en terreno, quiero consultar la aplicación desde mi teléfono para usarla durante el trabajo en terreno.

## Primer avance

- Proyecto base con Expo Router y TypeScript.
- Pantalla de inicio con tres pacientes reutilizados de `pacientesMock.js` del proyecto web.
- `TarjetaPaciente.tsx` muestra nombre, especie y foto mediante props.
- La vista se puede probar con Expo Go mientras el servidor de desarrollo está activo.

### Adaptación del componente web

`TarjetaPaciente.jsx` usaba elementos HTML (`div`, `h3`, `p`, `button`) y clases CSS. En React Native se reemplazan por componentes nativos como `View`, `Text`, `Pressable` e `Image`, y los estilos se definen con `StyleSheet`. Para este primer paso, la tarjeta recibe nombre, especie y URL de foto como props tipadas.

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
