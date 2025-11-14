// Ubicación: src/countries/countries.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/countries.entities';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';

@Module({
  imports: [
    // Registra la entidad "Country" para que el servicio pueda usarla
    TypeOrmModule.forFeature([Country]),
  ],
  controllers: [CountriesController], // El controlador de rutas
  providers: [CountriesService],    // El proveedor de lógica
  exports: [CountriesService],        // Exporta el servicio (para el seeding)
})
export class CountriesModule {}