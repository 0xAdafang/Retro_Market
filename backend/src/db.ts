import { Pool } from 'pg';

export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'retrogame_market',
  password: 'Aqwpmn963',
  port: 5432
});
