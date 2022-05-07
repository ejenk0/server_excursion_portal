import { pool } from './databaseConnection';
import { readFileSync } from 'fs';

export async function getNomineeByProgramID(program_id: string) {
  var sql = readFileSync('src/sql/query_nomineesByProgramID.sql').toString();
  const nominees = await pool.query(sql, [program_id]);
  return nominees;
}

export async function getNominees() {
  var sql = readFileSync('src/sql/query_nominees.sql').toString();
  const nominees = await pool.query(sql);
  return nominees;
}
