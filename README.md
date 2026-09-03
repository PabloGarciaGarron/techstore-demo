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
