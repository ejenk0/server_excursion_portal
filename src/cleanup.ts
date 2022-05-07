var nodeCleanup = require('node-cleanup');
import { pool } from './repository/databaseConnection';

nodeCleanup(function (_exitCode: any, _signal: any) {
  pool.end();
});
