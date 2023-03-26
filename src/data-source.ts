import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Product } from './entities/Product';
import { Shop } from './entities/Shop';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Product, Shop],
  logging: false,
  synchronize: true,
});
