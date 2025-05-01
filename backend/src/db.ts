import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'retrogame_market',
  password: 'A',
  port: 5432
});
