import { productCategory } from '../../interfaces/types';
import { Product } from '../Product';
import { Shop } from '../Shop';
const categories = [
  'food',
  'clothes',
  'electronics',
  'furniture',
  'toys',
  'books',
  'sports',
  'tools',
  'games',
  'movies',
  'music',
  'other',
] as productCategory[];

// write a function that creates 5 random products of each categories with random prices
export const productSeeder = async () => {
  // find shops
  const shops = await Shop.find();
  // for each shop
  for (const shop of shops) {
    // for each category
    for (const category of categories) {
      // create 5 products
      for (let i = 0; i < 5; i++) {
        const product = new Product();
        product.name = `${category} ${i}`;
        product.description = `This is a ${category} product`;
        product.category = category;
        // 100 - 1000 with 100 interval
        product.price = Math.floor(Math.random() * 10) * 100 + 100;
        product.shop = shop;
        await product.save();
      }
    }
  }
};
