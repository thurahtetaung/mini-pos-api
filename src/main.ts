import * as app from './app';
import * as dotenv from 'dotenv';
import { AppDataSource } from './data-source';

dotenv.config();

async function main() {
  console.log('Starting server...');
  await AppDataSource.initialize();
  await AppDataSource.synchronize();
  await app.start();
}

main().catch((err) => {
  console.log(err.message);
  process.exit(1);
});
