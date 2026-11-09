# Flujo de trabajo del estudiante

Guía para trabajar en **vetChiloé Terreno** con Git y GitHub. Sigue los pasos en orden. La parte A se hace **una sola vez** y la parte B se repite en **cada avance**.

> **Regla de oro:** trabaja siempre en **tu rama** `estudiante/nombre-apellido`. Nunca en `main`.

---

## Antes de empezar

- [ ] Tienes **Node.js** 22.13+, 24.3+ o 26+ (revisa con `node -v`).
- [ ] Tienes **Git** instalado (revisa con `git --version`).
- [ ] Tienes una cuenta en **GitHub** y se la diste al docente.
- [ ] **Aceptaste la invitación** al repositorio. Llega por correo o aparece en <https://github.com/notifications>. Sin aceptarla no podrás subir tu rama.
- [ ] Tienes **Expo Go** en tu teléfono, versión SDK 58.

---

## A. Primera vez (Paso 0 de las diapositivas)

### 1. Clonar el repositorio

Abre una terminal en la carpeta donde guardas tus proyectos:

```bash
git clone https://github.com/Vikktor93/vetchiloe-terreno.git
cd vetchiloe-terreno
```

### 2. Instalar las dependencias

```bash
npm install
```

> `node_modules` no viene en el repositorio, por eso hay que instalarlo.

### 3. Crear tu rama

Usa tu nombre y apellido en minúsculas y sin tildes:

```bash
git checkout -b estudiante/nombre-apellido
```

Comprueba en qué rama estás (la actual aparece con `*`):

```bash
git branch
```

### 4. Probar que todo funciona

```bash
npx expo start
```

Escanea el QR con Expo Go. Debes ver la pantalla **"Welcome to Expo"**.

---

## B. En cada avance

### 1. Asegúrate de estar en tu rama

```bash
git branch
```

Si no estás en la tuya:

```bash
git checkout estudiante/nombre-apellido
```

### 2. Desarrolla el avance

Sigue la guía paso a paso de las diapositivas. Mientras trabajas:

```bash
npx expo start        # día a día
npx expo start -c     # si ves pantallas antiguas o errores raros (limpia la caché)
```

### 3. Revisa que no haya errores de tipos

```bash
npx tsc --noEmit
```

Si no imprime nada, está todo correcto.

### 4. Guarda tus cambios (commit)

Puedes hacer varios commits durante el avance. **Mientras más pequeños, mejor.**

```bash
git status                                   # qué archivos cambiaron
git add .                                    # prepara todos los cambios
git commit -m "Agrega TarjetaPaciente"       # guarda con un mensaje claro
```

Al terminar el avance, el último commit lleva el nombre del avance:

```bash
git commit -m "Avance 01: pantalla de inicio"
```

### 5. Sube tu rama a GitHub (push)

**La primera vez** se indica el destino con `-u`:

```bash
git push -u origin estudiante/nombre-apellido
```

**Las siguientes veces** basta con:

```bash
git push
```

### 6. Entrega: Pull Request en borrador (solo la primera vez)

1. Entra al repositorio en GitHub. Aparecerá un aviso amarillo con el botón **Compare & pull request**.
   - Si no aparece: pestaña **Pull requests** → **New pull request** → *base:* `main` ← *compare:* `estudiante/nombre-apellido`.
2. Título: **`Entrega · Nombre Apellido`**.
3. En la descripción, agrega una **captura de tu teléfono** con la app funcionando.
4. Abre la flecha del botón verde y elige **Create draft pull request**.

> **El PR nunca se fusiona** (no presiones *Merge*). Es tu carpeta de entrega: ahí el docente revisa y deja comentarios.

**En los avances siguientes no abras un PR nuevo.** Cada `git push` actualiza automáticamente el mismo PR.

### 7. Revisa los comentarios del docente

En tu PR → pestaña **Conversation** o **Files changed**. Corrige lo que se indique, haz commit y push. Los cambios aparecen en el mismo PR.

---

## C. Cuando el docente actualiza `main`

Si el docente avisa que agregó algo a la base (imágenes, dependencias, etc.):

```bash
git checkout main
git pull
git checkout estudiante/nombre-apellido
git merge main
npm install            # por si hay dependencias nuevas
git push
```

Si aparece un **conflicto**, revisa [problemas-frecuentes.md](problemas-frecuentes.md#conflicto-al-hacer-merge).

---

## D. Ver la solución del docente

Cuando cierra el plazo de un avance, el docente publica la rama `docente/solucion`.

**Opción 1 (recomendada), en GitHub:** selector de ramas → `docente/solucion` → navega por los archivos.

**Opción 2, en tu computador, para ejecutarla:**

```bash
git fetch
git checkout docente/solucion
npx expo start -c
```

Cuando termines, **vuelve a tu rama**. No trabajes en la del docente.

```bash
git checkout estudiante/nombre-apellido
```

**Opción 3, comparar tu código con la solución:**

```bash
git fetch
git diff estudiante/nombre-apellido origin/docente/solucion -- src/
```

---

## Resumen de comandos

| Momento | Comando |
|---|---|
| Clonar (una vez) | `git clone https://github.com/Vikktor93/vetchiloe-terreno.git` |
| Instalar | `npm install` |
| Crear mi rama (una vez) | `git checkout -b estudiante/nombre-apellido` |
| Ver en qué rama estoy | `git branch` |
| Cambiar a mi rama | `git checkout estudiante/nombre-apellido` |
| Ejecutar la app | `npx expo start` (o `-c` para limpiar la caché) |
| Revisar tipos | `npx tsc --noEmit` |
| Ver cambios | `git status` |
| Guardar cambios | `git add .` y `git commit -m "mensaje"` |
| Subir (primera vez) | `git push -u origin estudiante/nombre-apellido` |
| Subir (siguientes) | `git push` |
| Traer cambios de main | `git checkout main`, `git pull`, `git checkout <mi-rama>`, `git merge main` |
