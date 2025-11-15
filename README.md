# Taller 2 - Desarrollo Web Móvil

## Información del Grupo

**Grupo 8:**

- Pablo Villarroel - 21.239.259-6
- Sebastián Pleticosic - 19.307.465-0
- Diego Véliz - 20.797.904-K
- Vicente Araya - 20.797.409-9

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de un ecosistema completo compuesto por tres APIs backend independientes y una aplicación web móvil empaquetada como APK Android mediante Apache Cordova.

La aplicación InfoMóvil permitirá a los usuarios acceder a información dinámica sobre:
1. Países del mundo
2. Información del clima
3. Videojuegos
4. Partidos de fútbol

## Arquitectura del Sistema

### Backend - APIs

El proyecto incluye tres APIs independientes desarrolladas con diferentes tecnologías:

#### 1. Weather API - Express
- **Tecnología**: Express.js (Node.js)
- **Base de Datos**: PostgreSQL
- **Puerto**: 3002
- **Endpoints**: `/weather`, `/football`
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
- **Estado**: Pendiente de implementar
- **Ubicación**: `backend/fastapi-api/`

### Frontend

- **Tecnología**: HTML5, CSS3, JavaScript puro
- **Framework CSS**: Tailwind CSS
- **Diseño**: Mobile First
- **Empaquetado**: Apache Cordova
- **Ubicación**: `frontend/cordova-app/`

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
- **Apache Cordova CLI** (para generar APK)
- **Android SDK** (para compilar APK)

### Instalación de Software Requerido

#### Node.js
**Windows/Mac:**
1. Descarga desde: https://nodejs.org/
2. 2.Ejecutar el instalador
3. Verificar con `node --version` y `npm --version`

**Linux:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### PostgreSQL
**Windows:**
- Descarga desde: https://www.postgresql.org/download/windows/
- Ejecuta el instalador (elige contraseña para usuario `postgres`)

**Mac:**
```bash
brew install postgresql@14
brew services start postgresql@14
```

**Linux:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Cordova
```bash
npm install -g cordova
```

## Instalación y Configuración

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd Taller-2-Web-Movil
```

### 2. Configurar Bases de Datos PostgreSQL
Cada integrante crea las bases de datos en su PostgreSQL local:
```sql
CREATE DATABASE countries_db;
CREATE DATABASE weather_db;
CREATE DATABASE videogames_db;
```
Finalmente cada uno configura su archivo `.env` en cada API con sus credenciales locales.

### 3. Configurar y Ejecutar APIs

#### Countries API (NestJS)
```bash
cd backend/nestjs-api
npm install
# Crear archivo .env con las credenciales de PostgreSQL
npm run start:dev
```
La API estará disponible en: http://localhost:3001

#### Weather API (Express)
```bash
cd backend/express-api
npm install
# Copiar .env.example a .env y configurar con tus credenciales
cp .env.example .env
# Editar .env con tus datos de PostgreSQL
npm start
```
La API estará disponible en: http://localhost:3002

**Guía rápida de ejecución:** Ver `GUIA_EJECUCION.md` para instrucciones paso a paso de cómo ejecutar el proyecto en su estado actual.

#### Videojuegos API (FastAPI)
```bash
cd backend/fastapi-api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Crear archivo .env con las credenciales de PostgreSQL
uvicorn main:app --reload --port 3003
```
La API estará disponible en: http://localhost:3003

### 4. Configurar Frontend

#### Para Desarrollo Web
Los archivos del frontend están en la carpeta `frontend/`:
- `frontend/index.html`
- `frontend/apis.js`
- `frontend/styles.css`

Abre `frontend/index.html` en un navegador o usa un servidor local apuntando a esa carpeta.

Asegúrate de que las URLs de las APIs en `apis.js` apunten a los servidores locales.

#### Para Empaquetar como APK

1. Copiar archivos al proyecto Cordova:
```bash
cd frontend/cordova-app
cp ../index.html .
cp ../apis.js .
cp ../styles.css .
cp ../tailwind.config.js .
```

2. Instalar plugins de Cordova:
```bash
cordova platform add android
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-splashscreen
```

3. Construir APK:
```bash
cordova build android
```

El APK se generará en: `platforms/android/app/build/outputs/apk/debug/app-debug.apk`

## Estructura del Proyecto

```
Taller-2-Web-Movil/
├── backend/
│   ├── nestjs-api/          # API de Países (NestJS) - Funcional
│   │   ├── src/
│   │   ├── package.json
│   │   └── .env.example
│   ├── express-api/         # API de Clima y Fútbol (Express) - Funcional
│   │   ├── server.js
│   │   ├── package.json
│   │   └── README.md
│   └── fastapi-api/         # API de Videojuegos (FastAPI) - Pendiente
├── frontend/
│   ├── index.html           # Frontend principal
│   ├── apis.js              # Lógica de APIs
│   ├── styles.css           # Estilos personalizados
│   ├── tailwind.config.js   # Configuración Tailwind
│   └── cordova-app/         # Proyecto Cordova
│       └── config.xml
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


## Características de la Aplicación

- [x] Diseño Mobile First con Tailwind CSS (del Taller 1)
- [x] Navegación SPA (Single Page Application) (del Taller 1)
- [x] Filtrado y ordenamiento dinámico (del Taller 1)
- [x] Vistas detalladas por recurso (del Taller 1)
- [x] Estados de carga y manejo de errores (del Taller 1)
- [x] Consumo de API Express (Clima y Fútbol) - Funcional
- [x] Consumo de API NestJS (Países) - Funcional
- [ ] Consumo de API FastAPI (Videojuegos) - Pendiente
- [ ] Empaquetado como APK Android (pendiente)

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

## Estado Actual del Proyecto

Ver [PROGRESO.md](PROGRESO.md) para detalles del estado de desarrollo.

**Nota**: Este proyecto está en desarrollo activo. Algunas funcionalidades pueden estar incompletas o en proceso de implementación.

## Notas Importantes

- Las APIs están en desarrollo - algunas funcionalidades pueden no estar completamente implementadas
- Las APIs deben estar ejecutándose antes de usar la aplicación
- Para producción, cambiar las URLs en `apis.js` de `localhost` a las URLs de los servidores
- El APK generado requerirá permisos de Internet para consumir las APIs
- Las bases de datos se inicializarán automáticamente con datos de ejemplo al iniciar las APIs (cuando esté implementado)

## Licencia

Este proyecto fue desarrollado como parte del Taller 2 de Desarrollo Web Móvil.

## Contacto

Para consultas o problemas, contactar al grupo 8.
