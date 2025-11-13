# Guía Rápida de Ejecución

## Estado Actual del Proyecto
- API Express (Clima y Fútbol) - Funcional
- API NestJS (Países) - Pendiente
- API FastAPI (Videojuegos) - Pendiente
- Frontend - Sólo mostrará datos de Clima y Fútbol

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

### 2. Crear la Base de Datos
Abre una terminal y ejecuta
```bash
# Conectar a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE weather_db;
```

**Nota:** Si pide contraseña, se tiene que usar la que configuró al instalar PostgreSQL.

**Verificar que se creó correctamente:**
```bash
# Listar todas las bases de datos (deberías ver weather_db en la lista)
\l

# O intentar conectarte a la base de datos
\c weather_db
```

Si ves el mensaje `You are now connected to database "weather_db"`, significa que se creó correctamente.

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
### 5. Abrir el Frontend

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

### 6. Probar la Aplicación

Una vez abierto el frontend:

1. **Página de inicio (Landing):** Verás la página principal con las 4 secciones
2. **Clima:** Haz clic en "Clima" - deberías ver ciudades chilenas con datos del clima
3. **Fútbol:** Haz clic en "Fútbol" - deberías ver partidos de ejemplo
4. **Países y Videojuegos:** Mostrarán mensajes de error porque esas APIs no están implementadas aún

### 7. Probar la API directamente

Puedes probar los endpoints en el navegador o con curl:

- **Health check:** http://localhost:3002/health
- **Clima:** http://localhost:3002/weather
- **Fútbol:** http://localhost:3002/football

## Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que PostgreSQL esté corriendo
- Revisa las credenciales en `.env`
- Verifica que la base de datos `weather_db` exista

### Error: "Port 3002 already in use"
- Cierra otras instancias del servidor
- O cambia el puerto en `.env`: `PORT=3003`

### El frontend no muestra datos
- Verifica que el servidor Express esté corriendo
- Abre la consola del navegador (F12) para ver errores
- Verifica que las URLs en `apis.js` apunten a `localhost:3002`

### Error al instalar dependencias
```bash
# Limpiar e instalar de nuevo
cd backend/express-api
rm -rf node_modules package-lock.json
npm install
```

## Resumen de Comandos

```bash
# Terminal 1: Servidor Express (API Backend)
cd backend/express-api
npm install          # Solo primera vez
npm start

# Terminal 2: Servidor Frontend
cd frontend
http-server -p 8000
# Luego abrir: http://localhost:8000
```

