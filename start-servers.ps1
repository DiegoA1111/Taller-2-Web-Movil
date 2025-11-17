# Script para iniciar todos los servidores del proyecto

# Obtener la ruta del directorio del script
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = $scriptPath

Write-Host "Iniciando servidores..." -ForegroundColor Green
Write-Host "Directorio del proyecto: $projectRoot" -ForegroundColor Gray

# Iniciar Express API (Puerto 3002)
Write-Host "`n[1/3] Iniciando Express API en puerto 3002..." -ForegroundColor Cyan
$expressPath = Join-Path $projectRoot "backend\express-api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$expressPath'; npm start"

# Esperar un segundo
Start-Sleep -Seconds 2

# Iniciar NestJS API (Puerto 3001)
Write-Host "[2/3] Iniciando NestJS API en puerto 3001..." -ForegroundColor Cyan
$nestjsPath = Join-Path $projectRoot "backend\nestjs-api"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$nestjsPath'; npm run start:dev"

# Esperar un segundo
Start-Sleep -Seconds 2

# Iniciar FastAPI (Puerto 3003)
Write-Host "[3/3] Iniciando FastAPI en puerto 3003..." -ForegroundColor Cyan
$fastapiPath = Join-Path $projectRoot "backend\fastapi-api"
$venvActivate = Join-Path $fastapiPath "venv\Scripts\Activate.ps1"
if (Test-Path $venvActivate) {
    # Crear un script temporal para activar venv y ejecutar uvicorn
    $tempScript = Join-Path $env:TEMP "start-fastapi.ps1"
    @"
cd '$fastapiPath'
. '$venvActivate'
uvicorn app.main:app --reload --host 0.0.0.0 --port 3003
"@ | Out-File -FilePath $tempScript -Encoding UTF8
    Start-Process powershell -ArgumentList "-NoExit", "-File", $tempScript
} else {
    Write-Host "  Advertencia: No se encontró el entorno virtual en $fastapiPath\venv" -ForegroundColor Yellow
    Write-Host "  Ejecutando sin venv (puede fallar si las dependencias no están instaladas globalmente)" -ForegroundColor Yellow
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$fastapiPath'; uvicorn app.main:app --reload --host 0.0.0.0 --port 3003"
}

Write-Host "`n¡Servidores iniciándose!" -ForegroundColor Green
Write-Host "`nAPIs disponibles en:" -ForegroundColor Yellow
Write-Host "  - Express API:   http://localhost:3002" -ForegroundColor White
Write-Host "  - NestJS API:    http://localhost:3001" -ForegroundColor White
Write-Host "  - FastAPI:       http://localhost:3003" -ForegroundColor White
Write-Host "`nPresiona cualquier tecla para cerrar este mensaje (los servidores seguirán corriendo)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
