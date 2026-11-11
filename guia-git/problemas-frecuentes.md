# Problemas frecuentes

## "remote: Permission to ... denied" o error 403 al hacer push

No aceptaste la invitación al repositorio. Revisa tu correo o <https://github.com/notifications>, acepta y vuelve a intentar.

## GitHub pide usuario y contraseña, y la contraseña no funciona

GitHub ya no acepta la contraseña de la cuenta en la terminal.

- **Windows:** Git para Windows incluye *Git Credential Manager*. Al hacer push se abre el navegador para iniciar sesión. Si no se abre, reinstala Git marcando esa opción.
- **macOS / Linux:** usa `gh auth login` (GitHub CLI) o crea un *Personal Access Token* y úsalo como contraseña.

## "push declined due to repository rule violations" / "Cannot update this protected ref"

Estás intentando subir a `main`, que está protegida. Revisa en qué rama estás:

```bash
git branch
```

Si hiciste commits en `main` por error, consulta la siguiente sección.

## Hice commits en `main` en vez de en mi rama

```bash
git checkout -b estudiante/nombre-apellido    # crea tu rama con esos commits
git push -u origin estudiante/nombre-apellido
git checkout main
git reset --hard origin/main                  # devuelve main local a como está en GitHub
git checkout estudiante/nombre-apellido
```

> Si tu rama **ya existía**, usa `git checkout estudiante/nombre-apellido` y luego `git merge main` en vez de `-b`. Después sigue con el `reset` de `main`.

## "fatal: The current branch has no upstream branch"

Es tu primer push de esa rama. Usa:

```bash
git push -u origin estudiante/nombre-apellido
```

## No puedo cambiar de rama: "Your local changes would be overwritten"

Tienes cambios sin guardar. Haz commit primero:

```bash
git add .
git commit -m "WIP: trabajo en progreso"
```

o guárdalos temporalmente:

```bash
git stash            # guarda los cambios a un lado
git checkout <otra-rama>
# ...
git checkout <tu-rama>
git stash pop        # los recupera
```

## Conflicto al hacer merge

Git avisa `CONFLICT` cuando tú y la base cambiaron las mismas líneas.

1. Abre el archivo en VS Code. Verás bloques marcados con `<<<<<<<`, `=======` y `>>>>>>>`.
2. Elige **Accept Current**, **Accept Incoming** o **Accept Both**, o edita a mano.
3. Guarda y termina el merge:

```bash
git add .
git commit -m "Resuelve conflicto con main"
git push
```

Para cancelar el merge y volver a como estabas: `git merge --abort`.

## La app muestra una pantalla antigua o "Unable to resolve module"

- Limpia la caché: `npx expo start -c`.
- Revisa que el archivo exista con ese **nombre exacto**, mayúsculas incluidas (`TarjetaPaciente.tsx`).
- Si cambiaste de rama: ejecuta `npm install`.

## "Project is incompatible with this version of Expo Go"

La versión del SDK del proyecto y la de Expo Go no coinciden. El proyecto usa **SDK 58**: actualiza Expo Go desde la tienda.

## El QR no conecta

- Computador y teléfono deben estar en la **misma red Wi-Fi**.
- Si la red de la universidad lo bloquea: `npx expo start --tunnel`.

## `&&` no funciona en la terminal (Windows PowerShell antiguo)

Ejecuta los comandos por separado, uno por línea:

```bash
cd vetChiloe-terreno
npm install
```

## Subí `node_modules` o `example/` por error

Ya están en `.gitignore`. Si aun así los subiste:

```bash
git rm -r --cached node_modules example
git commit -m "Quita carpetas ignoradas"
git push
```
