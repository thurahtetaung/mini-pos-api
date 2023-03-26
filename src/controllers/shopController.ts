import { ShopRepository } from '../repositories/ShopRepository';
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
    throw err;
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
    throw err;
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
    throw err;
  }
}

export const ShopController = {
  getShopById,
  createShop,
  updateShop,
};
