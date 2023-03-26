import { ProductRepository } from '../repositories/ProductRepository';
import { Response } from '../interfaces/response';
import { productCategory } from '../interfaces/types';
import { adminOnly } from './authController';

async function getProductsByShop(shopId: string): Promise<Response> {
  try {
    const products = await ProductRepository.getProducts(shopId);
    return {
      statusCode: 200,
      data: products,
    };
  } catch (err) {
    throw err;
  }
}

async function getProductById(id: string): Promise<Response> {
  try {
    const product = await ProductRepository.getProduct(id);
    if (!product) throw new Error('Product not found');
    return {
      statusCode: 200,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

async function createProduct(
  name: string,
  description: string,
  category: productCategory,
  price: number,
  userId: string,
  shopId: string,
): Promise<Response> {
  try {
    // check if user is admin
    await adminOnly(userId, shopId);
    const product = await ProductRepository.createProduct(
      shopId,
      name,
      description,
      category,
      price,
    );
    return {
      statusCode: 200,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

async function updateProduct(
  shopId: string,
  userId: string,
  id: string,
  name: string,
  description: string,
  category: productCategory,
  price: number,
): Promise<Response> {
  try {
    // check if user is admin
    await adminOnly(userId, shopId);
    const product = await ProductRepository.updateProduct(id, name, description, category, price);
    return {
      statusCode: 200,
      data: product,
    };
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(id: string, userId: string, shopId: string): Promise<Response> {
  try {
    // check if user is admin
    await adminOnly(userId, shopId);
    await ProductRepository.deleteProduct(id);
    return {
      statusCode: 200,
      data: 'Product deleted',
    };
  } catch (err) {
    throw err;
  }
}

async function searchProducts(shopId: string, query: string): Promise<Response> {
  try {
    const products = await ProductRepository.searchProducts(shopId, query);
    return {
      statusCode: 200,
      data: products,
    };
  } catch (err) {
    throw err;
  }
}

async function getProductsByCategory(shopId: string, category: string): Promise<Response> {
  try {
    const products = await ProductRepository.getProductsByCategory(
      shopId,
      category as productCategory,
    );
    return {
      statusCode: 200,
      data: products,
    };
  } catch (err) {
    throw err;
  }
}

export const ProductController = {
  getProductsByShop,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductsByCategory,
};
