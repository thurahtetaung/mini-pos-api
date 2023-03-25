import { ShopRepository } from '../repositories/Shop.Repository';
import { Response } from '../interfaces/response';
import { adminOnly } from './authController';

async function getShopById(shopId: string): Promise<Response> {
  try {
    const shop = await ShopRepository.getShop(shopId);
    return {
      statusCode: 200,
      data: shop,
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

async function createShop(name: string, taxPercentage: number, ownerId: string): Promise<Response> {
  try {
    const shop = await ShopRepository.createShop(name, taxPercentage, ownerId);
    return {
      statusCode: 200,
      data: shop,
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

async function updateShop(
  shopId: string,
  name: string,
  taxPercentage: number,
  userId: string,
): Promise<Response> {
  try {
    // check if user is admin
    await adminOnly(userId, shopId);
    const shop = await ShopRepository.updateShop(shopId, name, taxPercentage);
    return {
      statusCode: 200,
      data: shop,
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

async function getCategories(shopId: string): Promise<Response> {
  try {
    const categories = await ShopRepository.getCategories(shopId);
    return {
      statusCode: 200,
      data: categories,
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

export const ShopController = {
  getShopById,
  createShop,
  updateShop,
  getCategories,
};
