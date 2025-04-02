import { Pool } from 'pg';

export const pool = new Pool({
  user: '***',
  host: 'localhost',
  database: 'retrogame_market',
  password: '***',
  port: 5432
});
