# Script para iniciar todos los servidores

Write-Host "Iniciando servidores..." -ForegroundColor Green

# Iniciar Express API
Write-Host "`nIniciando Express API en puerto 3002..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Carla\Documents\GitHub\Taller-2-Web-Movil\backend\express-api'; node server.js"

# Esperar un segundo
Start-Sleep -Seconds 2

# Iniciar NestJS API
Write-Host "Iniciando NestJS API en puerto 3001..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\Carla\Documents\GitHub\Taller-2-Web-Movil\backend\nestjs-api'; npm run start:dev"

Write-Host "`n¡Servidores iniciándose!" -ForegroundColor Green
Write-Host "Express API: http://192.168.1.82:3002" -ForegroundColor Yellow
Write-Host "NestJS API: http://192.168.1.82:3001" -ForegroundColor Yellow
Write-Host "`nPresiona cualquier tecla para cerrar este mensaje (los servidores seguirán corriendo)..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
