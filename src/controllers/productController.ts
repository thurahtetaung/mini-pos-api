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
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

async function getProductById(id: string): Promise<Response> {
  try {
    const product = await ProductRepository.getProduct(id);
    return {
      statusCode: 200,
      data: product,
    };
  } catch (err) {
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
  }
}

async function createProduct(
  shopId: string,
  name: string,
  description: string,
  category: productCategory,
  price: number,
  userId: string,
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
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
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
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
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
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
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
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
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
    console.log(err.message);
    return {
      statusCode: 500,
      error: err.message,
    };
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
