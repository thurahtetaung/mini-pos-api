// generate 12 different types of products
import { Shop } from '../entities/Shop';
export type productCategory =
  | 'food'
  | 'clothes'
  | 'electronics'
  | 'furniture'
  | 'toys'
  | 'books'
  | 'sports'
  | 'tools'
  | 'games'
  | 'movies'
  | 'music'
  | 'other';

export interface ShopWithCategories extends Shop {
  categories: productCategory[];
}

export type userType = 'admin' | 'user';
