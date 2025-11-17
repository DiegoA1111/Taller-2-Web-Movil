# Guía Completa para Empaquetar la App como APK

Esta guía contiene todos los pasos necesarios para que cualquier persona pueda generar el APK desde cero.

## Requisitos Previos

Antes de empaquetar la aplicación, asegúrate de tener instalado:

1. **Node.js** (versión 18 o superior)
2. **Apache Cordova CLI** (instalar globalmente)
3. **Android SDK** (a través de Android Studio o descarga directa)
4. **Java JDK** (versión 8 o superior)
5. **Gradle** (se puede instalar con Chocolatey o manualmente)

---

## Instalación Paso a Paso

### Paso 1: Instalar Cordova

```powershell
npm install -g cordova
```

**Nota:** Al ejecutar `cordova` por primera vez, te preguntará sobre estadísticas de uso. Puedes responder `n` (no) o usar `echo n |` antes del comando.

### Paso 2: Instalar Gradle

**Opción A: Con Chocolatey (Recomendado para Windows)**

1. Abre PowerShell como administrador (clic derecho → "Ejecutar como administrador")
2. Ejecuta:
   ```powershell
   choco install gradle -y
   ```
3. Cierra y vuelve a abrir la terminal para que se actualice el PATH
4. Verifica la instalación:
   ```powershell
   gradle --version
   ```

**Opción B: Instalación Manual**

1. Descarga Gradle desde: https://gradle.org/releases/
2. Extrae el ZIP en una carpeta (ejemplo: `C:\gradle`)
3. Agrega `C:\gradle\bin` al PATH del sistema:
   - Abre "Variables de entorno" en Windows
   - Edita la variable "Path" del sistema
   - Agrega `C:\gradle\bin`
   - Reinicia la terminal

### Paso 3: Configurar Variables de Entorno

**IMPORTANTE:** Estas variables deben configurarse antes de construir el APK.

**Windows PowerShell:**

```powershell
# 1. Encontrar la ruta de Java
where.exe java
# Ejemplo de salida: C:\Program Files\Common Files\Oracle\Java\javapath\java.exe
# La ruta real suele ser: C:\Program Files\Java\jdk-XX

# 2. Configurar JAVA_HOME (ajusta la ruta según tu instalación)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-20"

# 3. Configurar ANDROID_HOME (ajusta la ruta según tu instalación)
# Generalmente está en: C:\Users\TU_USUARIO\AppData\Local\Android\Sdk
$env:ANDROID_HOME = "C:\Users\TU_USUARIO\AppData\Local\Android\Sdk"

# 4. Agregar Android SDK al PATH
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

**Nota:** Estas variables se configuran solo para la sesión actual. Si cierras la terminal, tendrás que configurarlas de nuevo. Para hacerlas permanentes, configúralas en las Variables de Entorno del sistema.

### Paso 4: Verificar Instalaciones

```powershell
# Verificar Node.js
node --version

# Verificar Cordova
cordova --version

# Verificar Java
java --version

# Verificar Gradle
gradle --version

# Verificar Android SDK
echo $env:ANDROID_HOME
```

---

## Configuración del Proyecto

### Paso 1: Actualizar Archivos del Frontend

**Estructura de archivos:**
- Los archivos originales del frontend están en `frontend/`:
  - `frontend/index.html`
  - `frontend/apis.js`
  - `frontend/styles.css`
- Estos archivos deben copiarse a `frontend/cordova-app/www/` antes de construir el APK

```powershell
# Desde la raíz del proyecto
cd frontend/cordova-app

# Copiar los archivos del frontend a la carpeta www/ de Cordova
Copy-Item ..\index.html www\index.html -Force
Copy-Item ..\apis.js www\apis.js -Force
Copy-Item ..\styles.css www\styles.css -Force
```

**Nota:** Si modificas los archivos en `frontend/`, recuerda copiarlos a `www/` antes de construir el APK.

### Paso 2: Configurar la IP del Servidor

**IMPORTANTE:** Antes de construir el APK, debes actualizar la IP del servidor.

1. **Obtén tu IP local:**
   ```powershell
   # Windows PowerShell
   Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -notlike "*Loopback*" -and $_.IPAddress -notlike "169.254.*"} | Select-Object -First 1 -ExpandProperty IPAddress
   
   # O simplemente:
   ipconfig
   # Busca "IPv4 Address" (ejemplo: 192.168.1.100)
   ```

2. **Edita `frontend/cordova-app/www/apis.js`** (líneas 31-44) y cambia `localhost` por tu IP:
   ```javascript
   const API_CONFIG = {
       countries: {
           url: 'http://TU_IP:3001/countries'  // Cambiar TU_IP por tu IP local
       },
       weather: {
           url: 'http://TU_IP:3002/weather'
       },
       videogames: {
           url: 'http://TU_IP:3003/games'
       },
       football: {
           url: 'http://TU_IP:3002/football'
       }
   };
   ```

3. **Edita `frontend/cordova-app/config.xml`** (líneas 22-24) y actualiza las IPs:
   ```xml
   <access origin="http://TU_IP:3001" />
   <access origin="http://TU_IP:3002" />
   <access origin="http://TU_IP:3003" />
   ```

### Paso 3: Verificar que las APIs estén corriendo

Antes de construir el APK, asegúrate de que las 3 APIs estén corriendo en tu servidor:

- **NestJS API** (Puerto 3001): `http://TU_IP:3001/countries`
- **Express API** (Puerto 3002): `http://TU_IP:3002/weather`
- **FastAPI** (Puerto 3003): `http://TU_IP:3003/games`

---

## Construir el APK

### Paso 1: Configurar Variables de Entorno

**IMPORTANTE:** Estas variables deben configurarse en cada nueva sesión de terminal. Si ya las configuraste en el Paso 3 de "Instalación Paso a Paso", puedes saltar este paso.

En tu terminal PowerShell, ejecuta:

```powershell
# Ajusta estas rutas según tu instalación
$env:JAVA_HOME = "C:\Program Files\Java\jdk-20"
$env:ANDROID_HOME = "C:\Users\TU_USUARIO\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

**Nota:** Para hacer estas variables permanentes, configúralas en las Variables de Entorno del sistema Windows.

### Paso 2: Construir el APK

**Opción 1: APK de Desarrollo (Debug)**

Este APK es más fácil de generar y es útil para pruebas:

```powershell
cd frontend/cordova-app
echo n | cordova build android
```

El APK se generará en:
```
platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

**Nota:** El `echo n |` responde "no" a la pregunta sobre estadísticas de uso de Cordova.

**Opción 2: APK de Producción (Release)**

Para un APK firmado listo para distribución:

```powershell
cd frontend/cordova-app
echo n | cordova build android --release
```

El APK sin firmar se generará en:
```
platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk
```

**Para firmar el APK (opcional):**

1. Crear un keystore (solo la primera vez):
   ```powershell
   keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
   ```

2. Firmar el APK:
   ```powershell
   jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
   ```

3. Optimizar el APK:
   ```powershell
   zipalign -v 4 app-release-unsigned.apk InfoMovil.apk
   ```

---

## Instalar el APK

### En un Dispositivo Físico

1. Transfiere el archivo `.apk` a tu dispositivo Android (por USB, correo, Drive, etc.)
2. Habilita "Fuentes desconocidas" en Configuración → Seguridad
3. Abre el archivo `.apk` en tu dispositivo e instálalo

**Importante:** Tu dispositivo Android debe estar en la misma red WiFi que tu servidor para que la app pueda conectarse a las APIs.

### En un Emulador

```powershell
cd frontend/cordova-app
cordova run android
```

---

## Solución de Problemas

### Error: "Could not find an installed version of Gradle"

**Solución 1: Instalar Gradle con Chocolatey (requiere PowerShell como administrador):**
```powershell
# Abrir PowerShell como administrador y ejecutar:
choco install gradle -y
# Cerrar y volver a abrir la terminal
```

**Solución 2: Instalar Gradle manualmente:**
1. Descargar Gradle desde: https://gradle.org/releases/
2. Extraer el ZIP en una carpeta (ejemplo: `C:\gradle`)
3. Agregar `C:\gradle\bin` al PATH del sistema:
   - Abrir "Variables de entorno" en Windows
   - Editar la variable "Path" del sistema
   - Agregar `C:\gradle\bin`
   - Reiniciar la terminal

**Solución 3: Usar Android Studio**
Si tienes Android Studio instalado, Gradle debería estar incluido. Asegúrate de que Android Studio esté completamente instalado.

### Error: "ANDROID_HOME is not set"

**Windows PowerShell:**
```powershell
$env:ANDROID_HOME = "C:\Users\TU_USUARIO\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"
```

**Windows CMD:**
```cmd
set ANDROID_HOME=C:\Users\TU_USUARIO\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

**Linux/Mac:**
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

### Error: "SDK location not found"

Crea un archivo `local.properties` en `platforms/android/`:

```
sdk.dir=C:\\Users\\TU_USUARIO\\AppData\\Local\\Android\\Sdk
```

### Error: "No se encuentra la plataforma android"

```powershell
cd frontend/cordova-app
cordova platform add android
```

### Error: "Failed to find 'ANDROID_HOME' environment variable"

Asegúrate de que la variable de entorno esté configurada correctamente y reinicia la terminal.

### La app no se conecta a las APIs

1. Verifica que las APIs estén corriendo en el servidor
2. Verifica que la IP en `www/apis.js` sea correcta
3. Verifica que el dispositivo/emulador esté en la misma red que el servidor
4. Verifica que el firewall permita conexiones en los puertos 3001, 3002 y 3003

---

## Checklist Completo

Antes de construir el APK, verifica que tengas:

- [ ] Node.js instalado (`node --version`)
- [ ] Cordova instalado globalmente (`npm install -g cordova`)
- [ ] Gradle instalado (`gradle --version`)
- [ ] Java JDK instalado (`java --version`)
- [ ] Android SDK instalado
- [ ] Variables de entorno configuradas (JAVA_HOME, ANDROID_HOME)
- [ ] Archivos del frontend actualizados en `www/`
- [ ] IP del servidor actualizada en `www/apis.js` y `config.xml`
- [ ] Las 3 APIs corriendo en el servidor

---

## Comandos Rápidos (Resumen Completo)

```powershell
# 1. Configurar variables de entorno (ajusta las rutas)
$env:JAVA_HOME = "C:\Program Files\Java\jdk-20"
$env:ANDROID_HOME = "C:\Users\TU_USUARIO\AppData\Local\Android\Sdk"
$env:PATH += ";$env:ANDROID_HOME\tools;$env:ANDROID_HOME\platform-tools"

# 2. Ir al directorio de Cordova
cd frontend/cordova-app

# 3. Actualizar archivos del frontend (copiar desde frontend/ a www/)
Copy-Item ..\index.html www\index.html -Force
Copy-Item ..\apis.js www\apis.js -Force
Copy-Item ..\styles.css www\styles.css -Force

# 4. Actualizar la IP en www/apis.js y config.xml
# IMPORTANTE: Edita manualmente estos archivos con tu IP local (ver sección "Configurar la IP del Servidor" arriba)

# 5. Construir APK debug
echo n | cordova build android

# El APK estará en: platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Notas Importantes

- **IP Hardcodeada:** El APK tiene la IP hardcodeada. Si cambias de red o servidor, necesitarás reconstruir el APK con la nueva IP.
- **APIs en Producción:** Para producción, considera usar un servidor con IP pública o dominio, no una IP local.
- **CORS:** Asegúrate de que las APIs tengan CORS habilitado para permitir conexiones desde la app móvil.
- **Variables de Entorno:** Las variables JAVA_HOME y ANDROID_HOME deben configurarse en cada nueva sesión de terminal, a menos que las configures permanentemente en el sistema.

