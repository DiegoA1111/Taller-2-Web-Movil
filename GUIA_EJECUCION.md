# Guía Rápida de Ejecución

## Estado Actual del Proyecto
- API Express (Clima y Fútbol) - Funcional
- API NestJS (Países) - Funcional
- API FastAPI (Videojuegos) - Funcional
- Frontend - Muestra datos de Clima, Fútbol, Países y Videojuegos

## IMPORTANTE: Las APIs deben estar corriendo

**Antes de abrir el frontend, asegúrate de que las 3 APIs estén corriendo en terminales separadas:**

1. **Terminal 1 - Express API (Puerto 3002):**
   ```bash
   cd backend/express-api
   npm start
   ```

2. **Terminal 2 - NestJS API (Puerto 3001):**
   ```bash
   cd backend/nestjs-api
   npm run start:dev
   ```

3. **Terminal 3 - FastAPI (Puerto 3003):**
   ```bash
   cd backend/fastapi-api
   venv\Scripts\Activate.ps1  # Windows PowerShell (o source venv/bin/activate en Mac/Linux)
   uvicorn app.main:app --reload --host 0.0.0.0 --port 3003
   ```

**Verificar que las APIs estén corriendo:**
- Express: Abre http://localhost:3002/health en el navegador
- NestJS: Abre http://localhost:3001/countries en el navegador
- FastAPI: Abre http://localhost:3003/ en el navegador

Si alguna no responde, revisa la terminal correspondiente para ver errores.

## Pasos para Ejecutar
### 1. Verificar PostgreSQL (es importante verificar si PostgreSQL esté corriendo)

**Windows:**
- Busca "Services" en el menú de inicio
- Busca "postgresql" y verifica que esté en estado "Running"

**Mac/Linux:**
```bash
# Verificar si está corriendo
sudo systemctl status postgresql
# O iniciarlo si no está corriendo
sudo systemctl start postgresql
```

### 2. Crear las Bases de Datos
Abre una terminal y ejecuta
```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear las bases de datos necesarias
CREATE DATABASE weather_db;
CREATE DATABASE countries_db;
CREATE DATABASE videogames_db;
```

**Nota:** Si pide contraseña, se tiene que usar la que configuró al instalar PostgreSQL.

**Verificar que se crearon correctamente:**
```bash
# Listar todas las bases de datos (deberías ver weather_db, countries_db y videogames_db en la lista)
\l

# Verificar weather_db
\c weather_db
# Si ves "You are now connected to database "weather_db"", está bien

# Verificar countries_db
\c countries_db
# Si ves "You are now connected to database "countries_db"", está bien

# Verificar videogames_db
\c videogames_db
# Si ves "You are now connected to database "videogames_db"", está bien
```

**Salir de psql:**
```bash
\q
```

### 3. Configurar la API Express
```bash
# Ir a la carpeta de la API
cd backend/express-api

# Instalar dependencias (solo la primera vez)
npm install

# Crear archivo .env
# Windows PowerShell:
Copy-Item .env.example .env

# Windows CMD:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Editar el archivo `.env`** con tus credenciales de PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgresql
DB_NAME=weather_db
PORT=3002
```

### 4. Iniciar el Servidor Express

```bash
# Asegúrate de estar en backend/express-api
npm start
```

Deberías ver:
```
API del clima corriendo en http://localhost:3002
Chequeo de salud corre en http://localhost:3002/health
La base de datos se inicializó bien con datos de ejemplo
```

**Importante** Se debe dejar abierta esta terminal abierta mientras se usa la app

### 5. Configurar la API NestJS
```bash
# Ir a la carpeta de la API
cd backend/nestjs-api

# Instalar dependencias (solo la primera vez)
npm install

# Crear archivo .env
# Windows PowerShell:
Copy-Item .env.example .env

# Windows CMD:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Editar el archivo `.env`** con tus credenciales de PostgreSQL:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password_de_postgresql
DB_NAME=countries_db
PORT=3001
```

### 6. Iniciar el Servidor NestJS

```bash
# Asegúrate de estar en backend/nestjs-api
npm run start:dev
```

Deberías ver:
```
API de Países (NestJS) corriendo en http://localhost:3001
Iniciando seeding de países...
Seeding de países completado.
```

**Importante** Se debe dejar abierta esta terminal abierta mientras se usa la app

### 7. Configurar la API FastAPI (Videojuegos)
```bash
# Ir a la carpeta de la API
cd backend/fastapi-api

# Crear entorno virtual (solo la primera vez)
python -m venv venv

# Activar el entorno virtual
# Windows PowerShell:
venv\Scripts\Activate.ps1

# Windows CMD:
venv\Scripts\activate.bat

# Mac/Linux:
source venv/bin/activate
```

**Instalar dependencias:**
```bash
# Asegúrate de que el entorno virtual esté activado
pip install -r requirements.txt
```

**Crear archivo `.env`** copiando el ejemplo:
```bash
# Windows PowerShell:
Copy-Item .env.example .env

# Windows CMD:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Editar el archivo `.env`** con tus credenciales de PostgreSQL:
```
DATABASE_URL=postgresql://postgres:tu_password_de_postgresql@localhost:5432/videogames_db
```

**Nota:** Reemplaza `tu_password_de_postgresql` con tu contraseña real de PostgreSQL.

**Poblar la base de datos con datos de ejemplo:**
```bash
# Asegúrate de que el entorno virtual esté activado y el .env esté configurado
python seed.py
```

### 8. Iniciar el Servidor FastAPI

```bash
# Asegúrate de estar en backend/fastapi-api y que el entorno virtual esté activado
uvicorn app.main:app --reload --host 0.0.0.0 --port 3003
```

Deberías ver:
```
INFO:     Uvicorn running on http://0.0.0.0:3003 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

**Importante** Se debe dejar abierta esta terminal abierta mientras se usa la app

**Nota:** La documentación interactiva (Swagger UI) estará disponible en: http://localhost:3003/docs

### 9. Abrir el Frontend

**Importante:** Se debería usar un servidor local para el frontend por lo siguiente:
- Evita problemas de CORS al consumir las APIs locales
- Simula mejor el entorno de producción
- Es más cercano a cómo funcionará cuando se empaquete con Cordova
- Permite probar todas las funcionalidades correctamente

```bash
# Instalar http-server globalmente (solo una vez)
npm install -g http-server

# Luego, desde la carpeta frontend
cd frontend
http-server -p 8000
```

Luego abre: http://localhost:8000

### 10. Probar la Aplicación

Una vez abierto el frontend:

1. **Página de inicio (Landing):** Verás la página principal con las 4 secciones
2. **Clima:** Haz clic en "Clima" - deberías ver ciudades chilenas con datos del clima
3. **Fútbol:** Haz clic en "Fútbol" - deberías ver partidos de ejemplo
4. **Países:** Haz clic en "Países" - deberías ver una lista de países con sus datos
5. **Videojuegos:** Haz clic en "Videojuegos" - deberías ver una lista de videojuegos con sus datos

### 11. Probar las APIs directamente

Puedes probar los endpoints en el navegador o con curl:

**API Express (Puerto 3002):**
- **Health check:** http://localhost:3002/health
- **Clima:** http://localhost:3002/weather
- **Fútbol:** http://localhost:3002/football

**API NestJS (Puerto 3001):**
- **Países:** http://localhost:3001/countries

**API FastAPI (Puerto 3003):**
- **Raíz:** http://localhost:3003/
- **Videojuegos:** http://localhost:3003/games (GET para listar todos)
- **Documentación (Swagger):** http://localhost:3003/docs

## Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `.env`
- Verifica que las bases de datos `weather_db`, `countries_db` y `videogames_db` existan

### Error: "Port 3002 already in use" o "Port 3001 already in use" o "Port 3003 already in use"
- Cierra otras instancias del servidor
- O cambia el puerto en `.env`:
  - Express: `PORT=3004` (o cualquier otro puerto disponible)
  - NestJS: `PORT=3005` (o cualquier otro puerto disponible)
  - FastAPI: Cambia el puerto en el comando `uvicorn` (ej: `--port 3006`)

### Error: "ERR_CONNECTION_REFUSED" o "No se puede acceder a este sitio"
**Esto significa que la API no está corriendo. Solución:**

1. **Verifica que la API esté iniciada:**
   - Debe haber una terminal abierta con el servidor corriendo
   - Deberías ver mensajes como "API corriendo en http://localhost:XXXX"

2. **Inicia la API correspondiente:**
   - **Express (puerto 3002):** `cd backend/express-api && npm start`
   - **NestJS (puerto 3001):** `cd backend/nestjs-api && npm run start:dev`
   - **FastAPI (puerto 3003):** `cd backend/fastapi-api && venv\Scripts\Activate.ps1 && uvicorn app.main:app --reload --host 0.0.0.0 --port 3003`

3. **Verifica que PostgreSQL esté corriendo** (si el error persiste):
   - Las APIs necesitan PostgreSQL para funcionar
   - Ver sección "1. Verificar PostgreSQL" más arriba

### El frontend no muestra datos
**Pasos para diagnosticar:**

1. **Verifica que los servidores estén corriendo:**
   - Express API: http://localhost:3002/health (debería responder)
   - NestJS API: http://localhost:3001/countries (debería devolver JSON)
   - FastAPI: http://localhost:3003/ (debería devolver JSON)

2. **Abre la consola del navegador (F12):**
   - Ve a la pestaña "Console" para ver errores de JavaScript
   - Ve a la pestaña "Network" para ver si las peticiones fallan
   - Busca errores de CORS (ej: "CORS policy", "Access-Control-Allow-Origin")

3. **Verifica que estés usando el servidor local:**
   - El frontend debe abrirse desde: http://localhost:8000
   - NO abrir el archivo HTML directamente (file://) porque causa problemas de CORS

4. **Verifica las URLs en `apis.js`:**
   - Deben apuntar a los puertos correctos (3002 para Express, 3001 para NestJS, 3003 para FastAPI)
   - Deben usar `http://localhost` (no `127.0.0.1`)

5. **Si ves errores de CORS:**
   - Verifica que las APIs tengan CORS habilitado
   - Reinicia los servidores de las APIs

### Error al activar el entorno virtual de Python (FastAPI)
**Windows PowerShell:**
Si obtienes un error de política de ejecución, ejecuta:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Mac/Linux:**
Si obtienes un error de permisos, ejecuta:
```bash
chmod +x venv/bin/activate
```

### Error: "ModuleNotFoundError: No module named 'psycopg2'" (FastAPI)
Este error ocurre cuando falta el driver de PostgreSQL. Solución:
```bash
# Asegúrate de que el entorno virtual esté activado
pip install psycopg2-binary
# O reinstala todas las dependencias
pip install -r requirements.txt
```

### Error al instalar dependencias
```bash
# Limpiar e instalar de nuevo
cd backend/express-api
rm -rf node_modules package-lock.json
npm install
```

## Resumen de Comandos

```bash
# Terminal 1: Servidor Express (API Clima y Fútbol)
cd backend/express-api
npm install          # Solo primera vez
npm start

# Terminal 2: Servidor NestJS (API Países)
cd backend/nestjs-api
npm install          # Solo primera vez
npm run start:dev

# Terminal 3: Servidor FastAPI (API Videojuegos)
cd backend/fastapi-api
python -m venv venv  # Solo primera vez
venv\Scripts\Activate.ps1  # Windows PowerShell (o source venv/bin/activate en Mac/Linux)
pip install -r requirements.txt  # Solo primera vez
python seed.py       # Solo primera vez (para poblar la BD)
uvicorn app.main:app --reload --host 0.0.0.0 --port 3003

# Terminal 4: Servidor Frontend
cd frontend
http-server -p 8000
# Luego abrir: http://localhost:8000
```

