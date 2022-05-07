import { pool } from './databaseConnection';
import { readFileSync } from 'fs';

export async function getTeachers() {
  var sql = readFileSync('src/sql/query_teachers.sql').toString();
  const teachers = await pool.query(sql);
  return teachers;
}
