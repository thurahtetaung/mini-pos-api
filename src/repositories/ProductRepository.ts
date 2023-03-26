import { productCategory } from '../interfaces/types';
import { Product } from '../entities/Product';
import { Shop } from '../entities/Shop';
import { Like } from 'typeorm';

export class ProductRepository {
  static async getProduct(id: string): Promise<Product> {
    return await Product.findOne({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
      },
    });
  }

  static async getProducts(shopId: string): Promise<Product[]> {
    // find shop
    const shop = await Shop.findOne({
      where: {
        id: shopId,
      },
      relations: {
        products: true,
      },
      select: {
        products: {
          id: true,
          name: true,
          description: true,
          category: true,
          price: true,
        },
      },
    });
    return shop.products;
  }

  static async createProduct(
    shopId: string,
    name: string,
    description: string,
    category: productCategory,
    price: number,
  ): Promise<Product> {
    try {
      const product = new Product();
      product.name = name;
      product.description = description;
      product.category = category;
      product.price = price;
      // find shop
      const shop = await Shop.findOne({
        where: {
          id: shopId,
        },
      });
      // if shop not found throw error
      if (!shop) {
        throw new Error('Shop not found');
      }
      product.shop = shop;
      await product.save();
      return product;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async updateProduct(
    id: string,
    name: string,
    description: string,
    category: productCategory,
    price: number,
  ): Promise<Product> {
    // find product
    try {
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      // if product not found throw error
      if (!product) {
        throw new Error('Product not found');
      }
      product.name = name;
      product.description = description;
      product.category = category;
      product.price = price;
      await product.save();
      return product;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async deleteProduct(id: string): Promise<void> {
    try {
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      // if product not found throw error
      if (!product) {
        throw new Error('Product not found');
      }
      await product.remove();
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async searchProducts(shopId: string, query: string): Promise<Product[]> {
    // search products by name like query limited to 6
    return await Product.find({
      where: {
        shop: {
          id: shopId,
        },
        name: Like(`%${query}%`),
      },
      take: 6,
    });
  }

  static async getProductsByCategory(
    shopId: string,
    category: productCategory,
  ): Promise<Product[]> {
    // find products by category
    return await Product.find({
      where: {
        shop: {
          id: shopId,
        },
        category,
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        price: true,
      },
    });
  }
}
