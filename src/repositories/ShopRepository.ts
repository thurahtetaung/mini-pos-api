import { Shop } from '../entities/Shop';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { ShopWithCategories, productCategory } from '../interfaces/types';

export class ShopRepository {
  static async getShop(id: string): Promise<ShopWithCategories> {
    try {
      const shop = await Shop.findOne({
        where: {
          id,
        },
        relations: {
          products: true,
        },
        select: {
          id: true,
          name: true,
          taxPercentage: true,
          products: {
            id: true,
            name: true,
            description: true,
            category: true,
            price: true,
          },
        },
      });
      // get categories
      const categories: productCategory[] = await this.getCategories(id);
      // add categories to shop
      const shopWithCategories = { ...shop, categories };
      return shopWithCategories as ShopWithCategories;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async createShop(name: string, taxPercentage: number, ownerId: string): Promise<Shop> {
    try {
      const shop = new Shop();
      shop.name = name;
      shop.taxPercentage = taxPercentage;
      // find user
      const user = await User.findOne({
        where: {
          id: ownerId,
        },
        relations: {
          shop: true,
        },
      });
      // if user not found or not admin throw error
      if (!user || user.userType !== 'admin') {
        throw new Error('User not found');
      }
      // if user is already owner of a shop throw error
      if (user.shop) {
        throw new Error('User already owns a shop');
      }
      shop.owner = user;
      await shop.save();
      return shop;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async updateShop(id: string, name: string, taxPercentage: number): Promise<Shop> {
    try {
      // find shop
      const shop = await Shop.findOne({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          taxPercentage: true,
        },
      });
      // if shop not found throw error
      if (!shop) {
        throw new Error('Shop not found');
      }
      shop.name = name;
      shop.taxPercentage = taxPercentage;
      await shop.save();
      return shop;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
  static async getCategories(shopId: string): Promise<productCategory[]> {
    try {
      // find categories
      const products = await Product.find({
        where: {
          shop: {
            id: shopId,
          },
        },
      });
      // map products to categories
      const categories = products.map((product) => product.category);
      // remove duplicates
      const uniqueCategories = [...new Set(categories)];
      return uniqueCategories;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }

  static async getShopByUserId(userId: string): Promise<Shop> {
    try {
      const shop = await Shop.findOne({
        where: {
          owner: {
            id: userId,
          },
        },
      });
      return shop;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  }
}
