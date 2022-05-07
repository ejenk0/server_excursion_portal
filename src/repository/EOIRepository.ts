import { readFileSync } from 'fs';
import { pool } from './databaseConnection';

export async function insertEOI(nominee_id: string, program_id: string) {
  var sql = readFileSync('src/sql/insert_eoi.sql').toString();
  const response = await pool.query(sql, [nominee_id, program_id]);
  return 200;
}

export async function deleteEOI(nominee_id: string, program_id: string) {
  var sql = readFileSync('src/sql/delete_eoi.sql').toString();
  const response = await pool.query(sql, [nominee_id, program_id]);
  return 200;
}
