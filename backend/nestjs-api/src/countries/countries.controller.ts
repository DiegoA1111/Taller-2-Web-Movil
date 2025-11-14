// Ubicación: src/countries/countries.controller.ts

import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries') // Define el prefijo de ruta: /countries
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get() // Responde a peticiones GET /countries
  findAll() {
    return this.countriesService.findAll();
  }
}