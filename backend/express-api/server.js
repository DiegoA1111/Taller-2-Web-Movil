const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// pdarte encargada de la config. de base de datos
const pool = new Pool({ 
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'weather_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

async function initDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS weather (
        id SERIAL PRIMARY KEY,
        city VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        temperature DECIMAL(5,2) NOT NULL,
        feels_like DECIMAL(5,2),
        humidity INT,
        pressure INT,
        wind_speed DECIMAL(5,2),
        description VARCHAR(255),
        icon VARCHAR(10),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT unique_city UNIQUE (city)
      )
    `);
    
    // Esta sección está para verificar si hay datos en la BD}
    const result = await pool.query('SELECT COUNT(*) as count FROM weather');
    if (parseInt(result.rows[0].count) === 0) {
      const cities = [
        { city: 'Arica', country: 'Chile', temp: 22.5, feels: 21.0, humidity: 65, pressure: 1013, wind: 5.2, desc: 'cielo claro', icon: '01d' },
        { city: 'Iquique', country: 'Chile', temp: 20.8, feels: 19.5, humidity: 70, pressure: 1015, wind: 6.1, desc: 'cielo claro', icon: '01d' },
        { city: 'Antofagasta', country: 'Chile', temp: 19.2, feels: 18.0, humidity: 68, pressure: 1014, wind: 4.8, desc: 'cielo claro', icon: '01d' },
        { city: 'Coquimbo', country: 'Chile', temp: 18.5, feels: 17.2, humidity: 72, pressure: 1016, wind: 5.5, desc: 'algo de nubes', icon: '02d' },
        { city: 'Valparaiso', country: 'Chile', temp: 16.3, feels: 15.1, humidity: 75, pressure: 1017, wind: 7.2, desc: 'nubes dispersas', icon: '03d' },
        { city: 'Santiago', country: 'Chile', temp: 24.1, feels: 23.5, humidity: 45, pressure: 1012, wind: 3.5, desc: 'cielo claro', icon: '01d' },
        { city: 'Concepción', country: 'Chile', temp: 15.8, feels: 14.5, humidity: 80, pressure: 1018, wind: 8.1, desc: 'lluvia ligera', icon: '10d' },
        { city: 'Temuco', country: 'Chile', temp: 14.2, feels: 13.0, humidity: 82, pressure: 1019, wind: 6.8, desc: 'nubes', icon: '04d' },
      ];

      for (const cityData of cities) {
        await pool.query(
          `INSERT INTO weather (city, country, temperature, feels_like, humidity, pressure, wind_speed, description, icon) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [cityData.city, cityData.country, cityData.temp, cityData.feels, cityData.humidity, 
           cityData.pressure, cityData.wind, cityData.desc, cityData.icon]
        );
      }
      console.log('La base de datos se inicializó bien con datos de ejemplo');
    }
  } catch (error) {
    console.error('Hubo un 3rror inicializando base de datos:', error.message);
  }
}

app.get('/weather', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM weather ORDER BY city'
    );
    
    const formatted = result.rows.map(row => ({
      name: row.city,
      main: {
        temp: parseFloat(row.temperature),
        feels_like: parseFloat(row.feels_like),
        humidity: row.humidity,
        pressure: row.pressure,
      },
      wind: {
        speed: parseFloat(row.wind_speed),
      },
      weather: [{
        description: row.description,
        icon: row.icon,
      }],
    }));

    res.json(formatted);
  } catch (error) {
    console.error('Error obteniendo clima:', error);
    res.status(500).json({ error: 'Error al obtener datos del clima' });
  }
});

app.get('/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const result = await pool.query(
      'SELECT * FROM weather WHERE city = $1',
      [city]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ciudad no encontrada' });
    }

    const row = result.rows[0];
    const formatted = {
      name: row.city,
      main: {
        temp: parseFloat(row.temperature),
        feels_like: parseFloat(row.feels_like),
        humidity: row.humidity,
        pressure: row.pressure,
      },
      wind: {
        speed: parseFloat(row.wind_speed),
      },
      weather: [{
        description: row.description,
        icon: row.icon,
      }],
    };

    res.json(formatted);
  } catch (error) {
    console.error('Error obteniendo clima:', error);
    res.status(500).json({ error: 'Error al obtener datos del clima' });
  }
});

app.post('/weather', async (req, res) => {
  try {
    const { city, country, temperature, feels_like, humidity, pressure, wind_speed, description, icon } = req.body;

    if (!city || !temperature) {
      return res.status(400).json({ error: 'Ciudad y temperatura son requeridos' });
    }

    const result = await pool.query(
      `INSERT INTO weather (city, country, temperature, feels_like, humidity, pressure, wind_speed, description, icon)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (city) DO UPDATE SET
       temperature = EXCLUDED.temperature,
       feels_like = EXCLUDED.feels_like,
       humidity = EXCLUDED.humidity,
       pressure = EXCLUDED.pressure,
       wind_speed = EXCLUDED.wind_speed,
       description = EXCLUDED.description,
       icon = EXCLUDED.icon
       RETURNING id`,
      [city, country || 'Chile', temperature, feels_like, humidity, pressure, wind_speed, description, icon]
    );

    res.status(201).json({ message: 'Registro de clima creado/actualizado', id: result.rows[0].id });
  } catch (error) {
    console.error('Error creando registro:', error);
    res.status(500).json({ error: 'Error al crear registro de clima' });
  }
});

app.get('/football', async (req, res) => {
  try {
    const matches = [
      {
        fixture: {
          id: 1,
          venue: { name: 'Estadio Nacional', city: 'Santiago' },
          status: { elapsed: 45, long: 'Primer Tiempo' }
        },
        league: { name: 'Copa Libertadores' },
        teams: {
          home: { name: 'Colo-Colo', logo: 'https://media.api-sports.io/football/teams/1286.png' },
          away: { name: 'Flamengo', logo: 'https://media.api-sports.io/football/teams/1273.png' }
        },
        goals: { home: 2, away: 1 }
      }

    ];

    res.json({ results: matches.length, response: matches });
  } catch (error) {
    console.error('Error obteniendo partidos:', error);
    res.status(500).json({ error: 'Error al obtener partidos de fútbol' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Weather API', port: PORT });
});

async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`API del clima corriendo en http://localhost:${PORT}`);
    console.log(`Chequeo de salud corre en http://localhost:${PORT}/health`);
  });
}

startServer();

