# Guía Rápida de Ejecución

## Estado Actual del Proyecto
- API Express (Clima y Fútbol) - Funcional
- API NestJS (Países) - Funcional
- API FastAPI (Videojuegos) - Pendiente
- Frontend - Muestra datos de Clima, Fútbol y Países

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
```

**Nota:** Si pide contraseña, se tiene que usar la que configuró al instalar PostgreSQL.

**Verificar que se crearon correctamente:**
```bash
# Listar todas las bases de datos (deberías ver weather_db y countries_db en la lista)
\l

# Verificar weather_db
\c weather_db
# Si ves "You are now connected to database "weather_db"", está bien

# Verificar countries_db
\c countries_db
# Si ves "You are now connected to database "countries_db"", está bien
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

### 7. Abrir el Frontend

**Importante:** Se debería usar un servidor local para el frontend por lo siguiente:
- Evita problemas de CORS al consumir las APIs locales
- Simula mejor el entorno de producción
- Es más cercano a cómo funcionará cuando se empaquete con Cordova
- Permite probar todas las funcionalidades correctamente

```bash
# Instalar http-server globalmente (solo una vez)
npm install -g http-server

# Desde la carpeta frontend
cd frontend
http-server -p 8000
```

Luego abre: http://localhost:8000

### 8. Probar la Aplicación

Una vez abierto el frontend:

1. **Página de inicio (Landing):** Verás la página principal con las 4 secciones
2. **Clima:** Haz clic en "Clima" - deberías ver ciudades chilenas con datos del clima
3. **Fútbol:** Haz clic en "Fútbol" - deberías ver partidos de ejemplo
4. **Países:** Haz clic en "Países" - deberías ver una lista de países con sus datos
5. **Videojuegos:** Mostrará mensaje de error porque esa API no está implementada aún

### 9. Probar las APIs directamente

Puedes probar los endpoints en el navegador o con curl:

**API Express (Puerto 3002):**
- **Health check:** http://localhost:3002/health
- **Clima:** http://localhost:3002/weather
- **Fútbol:** http://localhost:3002/football

**API NestJS (Puerto 3001):**
- **Países:** http://localhost:3001/countries

## Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `.env`
- Verifica que las bases de datos `weather_db` y `countries_db` existan

### Error: "Port 3002 already in use" o "Port 3001 already in use"
- Cierra otras instancias del servidor
- O cambia el puerto en `.env`:
  - Express: `PORT=3003` (o cualquier otro puerto disponible)
  - NestJS: `PORT=3004` (o cualquier otro puerto disponible)

### El frontend no muestra datos
- Verifica que los servidores Express y NestJS estén corriendo
- Abre la consola del navegador (F12) para ver errores
- Verifica que las URLs en `apis.js` apunten a los puertos correctos (3002 para Express, 3001 para NestJS)

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

# Terminal 3: Servidor Frontend
cd frontend
http-server -p 8000
# Luego abrir: http://localhost:8000
```

