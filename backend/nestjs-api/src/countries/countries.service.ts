// Ubicación: src/countries/countries.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/countries.entities';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  // Lógica para el endpoint GET /countries
  findAll() {
    return this.countryRepository.find();
  }

  // --- Lógica para el Punto 5 (Seeding) ---

  async count() {
    return this.countryRepository.count();
  }

  async seed() {
    const count = await this.count();
    if (count > 0) {
      console.log('La base de datos de países ya tiene datos. No se necesita seeding.');
      return;
    }

    console.log('Iniciando seeding de países...');
    
    // Datos de ejemplo (deberías agregar más)
    const countriesData = [
      {
        name: 'Chile',
        capital: 'Santiago',
        flag: 'https://flagcdn.com/cl.svg',
        region: 'Americas',
        population: 19212362,
        area: 756102,
        currencies: JSON.parse('{"CLP": {"name": "Chilean peso", "symbol": "$"}}'),
        languages: JSON.parse('{"spa": "Spanish"}'),
      },
      {
        name: 'Argentina',
        capital: 'Buenos Aires',
        flag: 'https://flagcdn.com/ar.svg',
        region: 'Americas',
        population: 45376763,
        area: 2780400,
        currencies: JSON.parse('{"ARS": {"name": "Argentine peso", "symbol": "$"}}'),
        languages: JSON.parse('{"grn": "Guaraní", "spa": "Spanish"}'),
      },
      {
        name: 'Brazil',
        capital: 'Brasília',
        flag: 'https://flagcdn.com/br.svg',
        region: 'Americas',
        population: 212559417,
        area: 8515767,
        currencies: JSON.parse('{"BRL": {"name": "Brazilian real", "symbol": "R$"}}'),
        languages: JSON.parse('{"por": "Portuguese"}'),
      },
      {
        name: 'Peru',
        capital: 'Lima',
        flag: 'https://flagcdn.com/pe.svg',
        region: 'Americas',
        population: 33050325,
        area: 1285216,
        currencies: JSON.parse('{"PEN": {"name": "Peruvian sol", "symbol": "S/ "}}'),
        languages: JSON.parse('{"aym": "Aymara", "que": "Quechua", "spa": "Spanish"}'),
      },
      {
        name: 'Colombia',
        capital: 'Bogotá',
        flag: 'https://flagcdn.com/co.svg',
        region: 'Americas',
        population: 50882884,
        area: 1141748,
        currencies: JSON.parse('{"COP": {"name": "Colombian peso", "symbol": "$"}}'),
        languages: JSON.parse('{"spa": "Spanish"}'),
      },
      {
        name: 'Spain',
        capital: 'Madrid',
        flag: 'https://flagcdn.com/es.svg',
        region: 'Europe',
        population: 47351567,
        area: 505992,
        currencies: JSON.parse('{"EUR": {"name": "Euro", "symbol": "€"}}'),
        languages: JSON.parse('{"spa": "Spanish"}'),
      },
      {
        name: 'France',
        capital: 'Paris',
        flag: 'https://flagcdn.com/fr.svg',
        region: 'Europe',
        population: 65273511,
        area: 551695,
        currencies: JSON.parse('{"EUR": {"name": "Euro", "symbol": "€"}}'),
        languages: JSON.parse('{"fra": "French"}'),
      },
      {
        name: 'Germany',
        capital: 'Berlin',
        flag: 'https://flagcdn.com/de.svg',
        region: 'Europe',
        population: 83240525,
        area: 357022,
        currencies: JSON.parse('{"EUR": {"name": "Euro", "symbol": "€"}}'),
        languages: JSON.parse('{"deu": "German"}'),
      },
      {
        name: 'Italy',
        capital: 'Rome',
        flag: 'https://flagcdn.com/it.svg',
        region: 'Europe',
        population: 59554023,
        area: 301336,
        currencies: JSON.parse('{"EUR": {"name": "Euro", "symbol": "€"}}'),
        languages: JSON.parse('{"ita": "Italian"}'),
      },
      {
        name: 'Japan',
        capital: 'Tokyo',
        flag: 'https://flagcdn.com/jp.svg',
        region: 'Asia',
        population: 125836021,
        area: 377930,
        currencies: JSON.parse('{"JPY": {"name": "Japanese yen", "symbol": "¥"}}'),
        languages: JSON.parse('{"jpn": "Japanese"}'),
      },
      {
        name: 'Australia',
        capital: 'Canberra',
        flag: 'https://flagcdn.com/au.svg',
        region: 'Oceania',
        population: 25687041,
        area: 7692024,
        currencies: JSON.parse('{"AUD": {"name": "Australian dollar", "symbol": "$"}}'),
        languages: JSON.parse('{"eng": "English"}'),
      },
      {
        name: 'South Africa',
        capital: 'Pretoria',
        flag: 'https://flagcdn.com/za.svg',
        region: 'Africa',
        population: 59308690,
        area: 1221037,
        currencies: JSON.parse('{"ZAR": {"name": "South African rand", "symbol": "R"}}'),
        languages: JSON.parse('{"afr": "Afrikaans", "eng": "English", "nso": "Northern Sotho", "sot": "Southern Sotho", "tsn": "Tswana", "ven": "Venda", "xho": "Xhosa", "zul": "Zulu"}'),
      }
    ];

    for (const data of countriesData) {
      // Creamos la entidad
      const country = this.countryRepository.create(data);
      // Guardamos la entidad en la BD
      await this.countryRepository.save(country);
    }
    
    console.log('Seeding de países completado.');
  }
}