import { pool } from './databaseConnection';

export async function now() {
  const now = await pool.query('SELECT NOW()');

  return now;
}
