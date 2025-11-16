import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { Country } from './countries/entities/countries.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'countries_db',
      entities: [Country],
      synchronize: true,
    }),
    CountriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}