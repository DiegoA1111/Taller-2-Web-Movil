// Ubicación: src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CountriesService } from './countries/countries.service'; // Importa el servicio

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (¡Importante para tu frontend!)
  app.enableCors();

  // Obtener el servicio de configuración y el puerto del .env
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  // --- Ejecutar el Seeding ---
  const countriesService = app.get(CountriesService);
  await countriesService.seed();
  // -------------------------

  await app.listen(port);
  console.log(`API de Países (NestJS) corriendo en http://localhost:${port}`);
}
bootstrap();