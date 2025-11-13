# Weather API - Express
API REST para información del clima desarrollada con Express.js. Esta fue la primera API que implementamos para el proyecto.

## Qué es lo que hace esta API:
Proporciona información del clima de ciudades chilenas. También tiene un endpoint para partidos de fútbol que agregamos después.

## Tecnologías que usamos

- Express.js 4.x
- Node.js con JavaScript
- PostgreSQL como base de datos
- pg para conectarnos a PostgreSQL

## Lo necesario para poder ejecutar la app

- Node.js 18 o superior
- PostgreSQL 12 o superior (o cualquier versión reciente)
- npm (viene con Node.js)

### Instalación de Node.js

Si no tienes Node.js instalado:

**Windows/Mac:**
- Descarga el instalador desde: https://nodejs.org/
- Ejecuta el instalador y sigue las instrucciones
- Verifica la instalación:
  ```bash
  node --version
  npm --version
  ```

### Instalación de PostgreSQL

Si no tienes PostgreSQL instalado:

**Windows:**
- Descarga el instalador desde: https://www.postgresql.org/download/windows/
- Ejecuta el instalador (elige una contraseña para el usuario `postgres`)
- Durante la instalación, asegúrate de que el puerto sea `5432` (es el por defecto)

**Verificar instalación:**
```bash
psql --version
```

## Cómo instalarla

1. Primero instala las dependencias:
```bash
npm install
```

2. Configura tu archivo `.env`:
   - Copia el archivo `.env.example` como `.env`:
   ```bash
   cp .env.example .env
   ```
   - Edita el archivo `.env` con tus credenciales de PostgreSQL

3. Crea la base de datos en PostgreSQL:
```sql
CREATE DATABASE weather_db;
```

4. Ejecuta la API:
```bash
# Modo desarrollo (con nodemon para auto-reload)
npm run dev

# Modo producción
npm start
```

La API debería estar corriendo en http://localhost:3002

## Configuración para trabajo en equipo

Cada integrante del equipo debe configurar su propia base de datos PostgreSQL local:

1. **Cada integrante instala PostgreSQL** en su máquina
2. **Cada uno crea su propia base de datos** `weather_db`
3. **Cada uno configura su archivo `.env`** con sus propias credenciales locales
4. **El archivo `.env` NO se sube a Git** (está en `.gitignore`)



## Endpoints disponibles

- `GET /weather` - Devuelve todos los registros de clima que tenemos
- `GET /weather/:city` - Busca el clima de una ciudad específica (ej: /weather/Santiago)
- `POST /weather` - Crea o actualiza un registro de clima
- `GET /football` - Devuelve partidos de fútbol (datos de ejemplo por ahora)
- `GET /health` - Para verificar que la API está funcionando

## Ejemplo de respuesta

Cuando haces un GET a `/weather`, se recibe algo como:

```json
[
  {
    "name": "Santiago",
    "main": {
      "temp": 24.1,
      "feels_like": 23.5,
      "humidity": 45,
      "pressure": 1012
    },
    "wind": {
      "speed": 3.5
    },
    "weather": [{
      "description": "cielo claro",
      "icon": "01d"
    }]
  }
]
```

## Estructura del proyecto

```
express-api/
├── server.js          # Todo el código del servidor y las rutas
├── package.json       # Las dependencias que necesita
├── .env              # Tus credenciales (no subir a git!)
└── README.md         # Este archivo
```

## Notas

- La base de datos se inicializa automáticamente con datos de ejemplo la primera vez que corres el servidor
- El endpoint de fútbol todavía usa datos hardcodeados, falta conectarlo a una base de datos
- Si tienes problemas de conexión, revisa que PostgreSQL esté corriendo y que las credenciales en `.env` sean correctas

