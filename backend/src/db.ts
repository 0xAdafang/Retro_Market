import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'retrogame_market',
  password: '$',
  port: 5432
});
