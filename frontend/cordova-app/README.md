# InfoMóvil - Aplicación Cordova

Aplicación web móvil empaquetada como APK Android usando Apache Cordova.

## Requisitos

- Node.js 18+
- Apache Cordova CLI
- Android SDK
- Java JDK 8+

## Instalación

1. Instalar Cordova globalmente:
```bash
npm install -g cordova
```

2. Verificar instalación:
```bash
cordova --version
```

## Configuración del Proyecto

1. Copiar archivos del frontend:
```bash
# Desde frontend/cordova-app
cp ../index.html .
cp ../apis.js .
cp ../styles.css .
cp ../tailwind.config.js .
```

2. Agregar plataforma Android:
```bash
cordova platform add android
```

3. Instalar plugins necesarios:
```bash
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-splashscreen
```

## Construcción del APK

### Desarrollo (APK Debug)
```bash
cordova build android
```

El APK se generará en:
`platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Producción (APK Release)
```bash
cordova build android --release
```

Para firmar el APK, necesitarás un keystore:
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
zipalign -v 4 app-release-unsigned.apk InfoMovil.apk
```

## Ejecutar en Dispositivo/Emulador

```bash
cordova run android
```

## Configuración de URLs de APIs

Antes de construir el APK, asegúrate de actualizar las URLs en `apis.js`:

```javascript
const API_CONFIG = {
    countries: {
        url: 'http://TU_SERVIDOR:3001/countries'  // Cambiar localhost
    },
    weather: {
        url: 'http://TU_SERVIDOR:3002/weather'
    },
    videogames: {
        url: 'http://TU_SERVIDOR:3003/games'
    },
    football: {
        url: 'http://TU_SERVIDOR:3002/football'
    }
};
```

## Solución de Problemas

### Error: "ANDROID_HOME is not set"
Configurar variable de entorno:
```bash
export ANDROID_HOME=/ruta/a/android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Error: "SDK location not found"
Crear archivo `local.properties` en `platforms/android/`:
```
sdk.dir=/ruta/a/android/sdk
```

### Error de CORS
Asegurarse de que las APIs tengan CORS habilitado para todos los orígenes.

