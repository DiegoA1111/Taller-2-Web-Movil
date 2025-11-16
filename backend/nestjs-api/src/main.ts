// Ubicación: src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CountriesService } from './countries/countries.service'; // Importa el servicio

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (¡Importante para tu frontend!)
  app.enableCors();

  // Puerto fijo
  const port = 3001;

  // --- Ejecutar el Seeding ---
  const countriesService = app.get(CountriesService);
  await countriesService.seed();
  // -------------------------

  await app.listen(port, '0.0.0.0');
  console.log(`API de Países (NestJS) corriendo en http://0.0.0.0:${port}`);
}
bootstrap();