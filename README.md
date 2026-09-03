## 🚀 Cómo empezar

Instrucciones para clonar el repositorio y gestionar los cambios en tu entorno local.

### 1. Clonar el repositorio

```bash
git clone [https://github.com/PabloGarciaGarron/techstore-demo.git](https://github.com/PabloGarciaGarron/techstore-demo.git)
cd techstore-demo
```

### 2. Actualizar tu repositorio local

Antes de empezar a trabajar o hacer cambios, asegúrate de traer la versión más reciente:

```bash
git pull origin main
```

### 3. Subir tus cambios

Una vez que hayas modificado o agregado archivos:

```bash
# 1. Agregar los archivos al área de preparación
git add .

# 2. Guardar los cambios con un mensaje descriptivo
git commit -m "feat: agregar nuevas pruebas de Playwright"

# 3. Subir los cambios a GitHub
git push origin main
```

### 4. 📌 Subir únicamente un archivo específico (Evitar `git add .`)

Para mantener el historial limpio y evitar subir archivos innecesarios o configuraciones locales, se recomienda hacer commit únicamente de los archivos modificados que necesites:

1. **Ver los archivos modificados o creados:**

   ```bash
   git status
   ```

2. **Agregar únicamente el archivo deseado:**

   ```bash
   # Reemplaza 'ruta/al/archivo.ts' por el nombre o ruta exacta de tu archivo
   git add ruta/al/archivo.ts
   ```

   _(Ejemplo: `git add pages/LoginPage.ts`)_

3. **Confirmar el cambio con un mensaje:**

   ```bash
   git commit -m "feat: actualizar metodos en LoginPage"
   ```

4. **Enviar al repositorio remoto:**
   ```bash
   git push origin main
   ```

### 5. 📋 Formato estándar para los mensajes de commit

Para mantener un historial claro y consistente, utiliza el siguiente formato:

```text
tipo(ámbito): descripción breve - Nombre del autor
```

El mensaje debe incluir:

- **Tipo:** propósito del cambio.
- **Ámbito:** módulo o área afectada.
- **Descripción:** explicación breve en presente.
- **Autor:** nombre de la persona que realizó el cambio, precedido por `-`.

#### Tipos permitidos

- `feat`: nueva funcionalidad.
- `fix`: corrección de errores.
- `docs`: cambios en la documentación.
- `refactor`: mejora del código sin cambiar su comportamiento.
- `test`: creación o modificación de pruebas.
- `chore`: tareas de mantenimiento o configuración.

#### Ejemplos

```text
feat(auth): implementa login con Google - Juan Jose
fix(api): corrige validación de token - Juan Jose
docs(readme): actualiza guía de instalación - Juan Jose
refactor(user): simplifica servicio de usuario - Juan Jose
test(auth): agrega pruebas para login - Juan Jose
chore(deps): actualiza dependencias - Juan Jose
chore(repo): elimina archivos temporales - Juan Jose
```

#### Ejemplo al realizar un commit

```bash
git add ruta/al/archivo.ts
git commit -m "feat(auth): implementa login con Google - Juan Jose"
git add ruta/al/archivo2.ts
git commit -m "fix(api): corrige validación de token - Pablo"
git add ruta/al/archivo3.ts
git commit -m "refactor(user): simplifica servicio de usuario - Mauricio"
git add ruta/al/archivo4.ts
git commit -m "test(auth): agrega pruebas para login - Katheryn"
git push origin main
```

Se recomienda escribir el mensaje en una sola línea, utilizar verbos en presente y mantener una descripción breve y clara.
