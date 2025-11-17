# Taller 2 - Desarrollo Web Móvil

## Información del Grupo

**Grupo 8:**

- Pablo Villarroel - 21.239.259-6
- Sebastián Pleticosic - 19.307.465-0
- Diego Véliz - 20.797.904-K
- Vicente Araya - 20.797.409-9

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de un ecosistema completo compuesto por tres APIs backend independientes y una aplicación web móvil empaquetada como APK Android mediante Apache Cordova.

La aplicación **InfoMóvil** permitirá a los usuarios acceder a información dinámica sobre:
1. Países del mundo
2. Información del clima
3. Videojuegos
4. Partidos de fútbol

## 🚀 Inicio Rápido

**Para instrucciones detalladas de instalación, configuración y ejecución, consulta la [Guía de Ejecución](GUIA_EJECUCION.md).**

La guía incluye:
- Configuración paso a paso de las bases de datos PostgreSQL
- Instalación y configuración de cada API (Express, NestJS, FastAPI)
- Configuración del entorno virtual de Python
- Ejecución del frontend
- Solución de problemas comunes

## Arquitectura del Sistema

### Backend - APIs

El proyecto incluye tres APIs independientes desarrolladas con diferentes tecnologías:

#### 1. Weather API - Express
- **Tecnología**: Express.js (Node.js)
- **Base de Datos**: PostgreSQL
- **Puerto**: 3002
- **Endpoints**: `/weather`, `/football`, `/health`
- **Estado**: Funcional
- **Ubicación**: `backend/express-api/`

#### 2. Countries API - NestJS
- **Tecnología**: NestJS (Node.js + TypeScript)
- **Base de Datos**: PostgreSQL
- **Puerto**: 3001
- **Endpoints**: `/countries`
- **Estado**: Funcional
- **Ubicación**: `backend/nestjs-api/`

#### 3. Videojuegos API - FastAPI
- **Tecnología**: FastAPI (Python)
- **Base de Datos**: PostgreSQL
- **Puerto**: 3003
- **Endpoints**: `/games`
- **Estado**: Funcional
- **Ubicación**: `backend/fastapi-api/`

### Frontend

- **Tecnología**: HTML5, CSS3, JavaScript puro
- **Framework CSS**: Tailwind CSS
- **Diseño**: Mobile First
- **Empaquetado**: Apache Cordova
- **Ubicación**: 
  - Desarrollo web: `frontend/` (index.html, apis.js, styles.css)
  - Proyecto Cordova: `frontend/cordova-app/`

## Tecnologías Utilizadas

### Backend
- **NestJS 10.x** - Framework Node.js con TypeScript
- **Express.js 4.x** - Framework Node.js
- **FastAPI 0.104.x** - Framework Python
- **PostgreSQL 12+** - Base de datos relacional
- **TypeORM** - ORM para NestJS
- **SQLAlchemy** - ORM para FastAPI
- **Swagger/OpenAPI** - Documentación de APIs

### Frontend
- **HTML5** - Estructura
- **CSS3** - Estilos (Mobile First)
- **Tailwind CSS** - Framework CSS
- **JavaScript ES6+** - Lógica de aplicación
- **Apache Cordova** - Empaquetado para Android

## Requisitos Previos

### Software Necesario
- **Node.js** 18+ (para NestJS y Express)
- **Python** 3.10+ (para FastAPI)
- **PostgreSQL** 12+ (base de datos)
- **npm** o **yarn** (gestor de paquetes Node.js)
- **pip** (gestor de paquetes Python)
- **Apache Cordova CLI** (para generar APK) - Opcional
- **Android SDK** (para compilar APK) - Opcional

Para instrucciones detalladas de instalación, ver [GUIA_EJECUCION.md](GUIA_EJECUCION.md).

## Instalación y Configuración

**📖 Consulta la [Guía de Ejecución](GUIA_EJECUCION.md) para instrucciones completas y detalladas.**

### Resumen de Pasos

1. **Clonar el repositorio**
2. **Configurar PostgreSQL** (crear bases de datos)
3. **Configurar y ejecutar las APIs:**
   - Express API (puerto 3002)
   - NestJS API (puerto 3001)
   - FastAPI (puerto 3003)
4. **Ejecutar el frontend**

Para empaquetar como APK, consulta [GUIA_APK.md](frontend/cordova-app/GUIA_APK.md).

## Estructura del Proyecto

```
Taller-2-Web-Movil/
├── backend/
│   ├── nestjs-api/          # API de Países (NestJS)
│   ├── express-api/         # API de Clima y Fútbol (Express)
│   └── fastapi-api/         # API de Videojuegos (FastAPI)
├── frontend/
│   ├── index.html           # Frontend principal (desarrollo web)
│   ├── apis.js              # Lógica de APIs
│   ├── styles.css           # Estilos
│   └── cordova-app/         # Proyecto Cordova
│       ├── www/             # Archivos copiados para APK
│       └── config.xml       # Configuración Cordova
├── GUIA_EJECUCION.md        # Guía detallada de ejecución
├── GUIA_APK.md              # Guía para generar APK (en frontend/cordova-app/)
└── README.md                # Este archivo
```

## Endpoints de las APIs

### Weather API (Express - Puerto 3002)
- `GET /weather` - Obtener todos los registros de clima
- `GET /weather/:city` - Obtener clima de una ciudad
- `POST /weather` - Crear/actualizar registro de clima
- `GET /football` - Obtener partidos de fútbol
- `GET /health` - Health check

### Countries API (NestJS - Puerto 3001)
- `GET /countries` - Obtener todos los países

### Videojuegos API (FastAPI - Puerto 3003)
- `GET /games` - Obtener todos los videojuegos (con paginación: `?skip=0&limit=40`)
- `GET /games/{id}` - Obtener un videojuego por ID
- **Documentación Swagger**: http://localhost:3003/docs

## Características de la Aplicación

- [x] Diseño Mobile First con Tailwind CSS
- [x] Navegación SPA (Single Page Application)
- [x] Filtrado y ordenamiento dinámico
- [x] Vistas detalladas por recurso
- [x] Estados de carga y manejo de errores
- [x] Consumo de API Express (Clima y Fútbol) - Funcional
- [x] Consumo de API NestJS (Países) - Funcional
- [x] Consumo de API FastAPI (Videojuegos) - Funcional
- [x] Empaquetado como APK Android - Funcional

## Desarrollo

### Modo Desarrollo
1. Iniciar las tres APIs en terminales separadas
2. Abrir `frontend/index.html` en un navegador o usar un servidor local:
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server
```

### Modo Producción (APK)
1. Asegurarse de que todas las APIs estén ejecutándose
2. Actualizar las URLs en `apis.js` para apuntar a los servidores de producción
3. Construir el APK con Cordova

## Documentación Adicional

- **[GUIA_EJECUCION.md](GUIA_EJECUCION.md)** - Guía completa de instalación, configuración y ejecución
- **[GUIA_APK.md](frontend/cordova-app/GUIA_APK.md)** - Instrucciones para generar el APK Android

## Notas Importantes

- **Las APIs deben estar ejecutándose antes de usar la aplicación**
- Para producción, cambiar las URLs en `apis.js` de `localhost` a las URLs de los servidores
- El APK generado requerirá permisos de Internet para consumir las APIs
- Las bases de datos se inicializan automáticamente con datos de ejemplo al iniciar las APIs


