// Ubicación: src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module'; // Lo crearemos en el sig. paso
import { Country } from './countries/entities/countries.entities'; // La entidad que definimos

@Module({
  imports: [
    // 1. Configuración para leer archivos .env
    ConfigModule.forRoot({
      isGlobal: true, // Hace que el .env esté disponible en todo el proyecto
    }),

    // 2. Configuración de la Base de Datos (TypeORM)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa ConfigModule para usar ConfigService
      inject: [ConfigService], // Inyecta el servicio de configuración
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Country], // Le dice a TypeORM qué entidades (tablas) debe conocer
        synchronize: true, // Sincroniza automáticamente la BD (solo para desarrollo)
      }),
    }),

    // 3. El módulo de nuestra funcionalidad de Países
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}