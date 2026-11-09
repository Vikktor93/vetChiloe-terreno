# Flujo de trabajo del docente

Guía para administrar el repositorio **vetChiloé Terreno**: configuración inicial, solución de referencia, revisión de entregas y publicación de soluciones.

> **Regla de oro:** `main` contiene solo la **plantilla base**. La solución vive en `docente/solucion` y **se sube a GitHub solo cuando cierra el plazo** de cada avance.

---

## A. Configuración inicial (una sola vez)

### 1. Crear el proyecto base

```bash
npx create-expo-app@latest vetchiloe-terreno --template default@sdk-58
cd vetchiloe-terreno
```

> **No ejecutar `npm run reset-project` en `main`.** Limpiar la plantilla es el Paso 1 que hace cada estudiante en su rama.

Agregar a `.gitignore`:

```gitignore
example

#LLM
AGENTS.md
.claude/
```

Si esos archivos ya estaban en un commit, sacarlos del repositorio (siguen en el computador):

```bash
git rm -r --cached AGENTS.md .claude
```

Hacer el commit de la base:

```bash
git add .
git commit -m "Plantilla base vetChiloé Terreno (Expo SDK 58)"
```

### 2. Crear el repositorio en GitHub y subir `main`

En GitHub, crear **`vetchiloe-terreno`** vacío (sin README, .gitignore ni licencia), **público**. Luego:

```bash
git branch -M main
git remote add origin https://github.com/Vikktor93/vetchiloe-terreno.git
git push -u origin main
```

### 3. Agregar a los estudiantes

**Settings → Collaborators → Add people**, con permiso **Write**. Cada estudiante debe **aceptar la invitación** para poder subir su rama.

### 4. Proteger `main` (Ruleset)

**Settings → Rules → Rulesets → New branch ruleset**

| Opción | Valor |
|---|---|
| Ruleset name | `proteger-main` |
| Enforcement status | **Active** |
| Bypass list | **Repository admin**, *Always allow* |
| Target branches | **Default** (`main`) |
| Restrict updates | ✅ Solo quien está en la bypass list puede modificar `main` (incluye hacer *Merge* de un PR). |
| Restrict deletions | ✅ |
| Require a pull request before merging | ✅ Required approvals: **0**. El resto de las opciones adicionales, sin cambios. |
| Block force pushes | ✅ |
| Lo demás | Sin marcar |

> En repositorios **privados** con cuenta gratuita, GitHub no aplica los rulesets, salvo con el beneficio docente de GitHub Education.

---

## B. Ciclo de cada avance

```
 Preparar solución  →  Clase / plazo abierto  →  Revisar PRs  →  Cierra plazo  →  Publicar solución
 (local, sin push)       (estudiantes trabajan)     (comentar)                       (git push)
```

### 1. Preparar la solución (antes de la clase)

**Primera vez:** crear la rama a partir de `main`.

```bash
git checkout main
git pull
git checkout -b docente/solucion
```

**Avances siguientes:** continuar sobre la misma rama.

```bash
git checkout docente/solucion
```

Desarrollar siguiendo las diapositivas del tópico y probar:

```bash
npx expo start -c
npx tsc --noEmit
```

Guardar **sin subir**:

```bash
git add .
git commit -m "Solución Avance NN"
```

> **No ejecutes `git push` todavía.** Si la rama nunca se ha subido, un `git push` sin `-u origin docente/solucion` es rechazado, lo que sirve como protección extra.

Mientras desarrollas, anota los errores y dudas que aparezcan: son los mismos que tendrán los estudiantes y conviene agregarlos a las notas de las diapositivas.

### 2. Revisar las entregas (plazo abierto)

En GitHub → pestaña **Pull requests** → un PR en borrador por estudiante (`Entrega · Nombre Apellido`).

| Pestaña | Para qué |
|---|---|
| **Conversation** | Comentarios generales y la captura del teléfono |
| **Commits** | Historial de avances (`Avance 01`, `Avance 02`…) |
| **Files changed** | Todo lo que cambió respecto a la plantilla. Clic en `+` junto a una línea para comentar |

> **Nunca presiones *Merge*.** Como estás en la bypass list, GitHub te lo permitiría.

**Ejecutar el proyecto de un estudiante en tu teléfono:**

```bash
git status                                   # primero, no tener cambios sin commit
git fetch                                    # trae las ramas nuevas
git checkout estudiante/maria-perez
npm install                                  # solo si agregó dependencias
npx expo start -c
```

Volver a tu solución:

```bash
git checkout docente/solucion
```

### 3. Publicar la solución (cerró el plazo)

**Primera vez:**

```bash
git checkout docente/solucion
git push -u origin docente/solucion
```

**Siguientes avances:**

```bash
git checkout docente/solucion
git push
```

> **No abras un Pull Request** para `docente/solucion`. Es solo una rama de referencia. El ruleset protege solo `main`, por lo que este push no tiene restricciones.

**Si la subiste antes de tiempo**, retírala de GitHub (queda intacta en tu computador):

```bash
git push origin --delete docente/solucion
```

Para volver a subirla después: `git push -u origin docente/solucion`.

### 4. Avisar a los estudiantes

- Que la solución del avance está publicada en `docente/solucion` (sección D de su guía).
- Los comentarios pendientes en sus PR.

---

## C. Actualizar la base (`main`)

Por ejemplo, cuando hay que agregar imágenes o una dependencia común para todos:

```bash
git checkout main
git pull
# ...hacer los cambios...
git add .
git commit -m "Base: descripción del cambio"
git push                                     # funciona porque estás en la bypass list
```

Llevar el cambio a tu solución:

```bash
git checkout docente/solucion
git merge main
```

Avisar a los estudiantes que ejecuten la **sección C** de su guía (`git merge main` en su rama).

> Para dependencias nuevas usa siempre `npx expo install <paquete>` (no `npm install <paquete>`), así se instala la versión compatible con el SDK 58.

---

## Resumen de comandos

| Momento | Comando |
|---|---|
| Crear rama de solución (una vez) | `git checkout -b docente/solucion` |
| Guardar solución | `git add .` y `git commit -m "Solución Avance NN"` |
| Ver ramas de estudiantes | `git fetch` y luego `git branch -r` |
| Probar la rama de un estudiante | `git checkout estudiante/x` y `npx expo start -c` |
| Publicar solución (primera vez) | `git push -u origin docente/solucion` |
| Publicar solución (siguientes) | `git push` |
| Retirar solución de GitHub | `git push origin --delete docente/solucion` |
| Actualizar base | En `main`: commit y `git push`; después, en tu rama: `git merge main` |
