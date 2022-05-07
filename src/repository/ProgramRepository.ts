import { readFileSync } from 'fs';
import { pool } from './databaseConnection';

export async function getPrograms() {
  const sql = readFileSync('src/sql/query_programs.sql').toString();
  const programs = await pool.query(sql);
  return programs;
}

export async function getProgramByID(program_id: string) {
  const sql = readFileSync('src/sql/query_programsByID.sql').toString();
  const program = await pool.query(sql, [program_id]);
  return program.rows[0];
}
