// Ubicación: src/countries/entities/country.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('countries') // Esto crea una tabla llamada 'countries'
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  capital: string;

  @Column({ type: 'text', nullable: true })
  flag: string; // URL de la bandera

  @Column({ type: 'varchar', length: 100, nullable: true })
  region: string;

  @Column({ type: 'int', nullable: true })
  population: number;

  @Column({ type: 'float', nullable: true })
  area: number;

  // Usamos 'jsonb' para guardar objetos/arrays de forma nativa en PostgreSQL.
  // Tu frontend apis.js parece esperar un JSON
  @Column({ type: 'jsonb', nullable: true })
  currencies: any; 

  @Column({ type: 'jsonb', nullable: true })
  languages: any;
}