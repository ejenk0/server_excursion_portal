import { pool } from './databaseConnection';
import { readFileSync } from 'fs';

export async function getNominees() {
  var sql = readFileSync('src/sql/query_nominees.sql').toString();
  const nominees = await pool.query(sql);
  return nominees;
}

export async function getNomineeByProgramID(program_id: string) {
  var sql = readFileSync('src/sql/query_nomineesByProgramID.sql').toString();
  const nominees = await pool.query(sql, [program_id]);
  return nominees;
}

export async function insertNominee(contact_email: string, name: string) {
  var sql = readFileSync('src/sql/insert_nominee.sql').toString();
  const response = await pool.query(sql, [contact_email, name]);
  console.log(response);
  return response;
}
