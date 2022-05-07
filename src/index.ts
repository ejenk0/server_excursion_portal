import { createServer } from '@graphql-yoga/node';
import { schema } from './schema';
require('dotenv').config();

async function main() {
  const server = createServer({ schema });
  await server.start();
}

main();
