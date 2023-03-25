import { Router } from 'express';
import { auth } from '../middleware/auth';
import { ShopController } from '../controllers/shopController';
import { ProductController } from '../controllers/productController';

export const router = Router();
router.use(auth);

// get a shop by id
router.get('/:id', (req, res) => {
  try {
    ShopController.getShopById(req.params.id).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// create a shop
router.post('/', (req, res) => {
  try {
    const { name, description, userId } = req.body;
    ShopController.createShop(name, description, userId).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// update a shop
router.patch('/', (req, res) => {
  try {
    const { name, description, userId, id } = req.body;
    ShopController.updateShop(userId, id, name, description).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// search products in a shop
router.get('/searchProducts', (req, res) => {
  try {
    const { query, shopId } = req.query;
    ProductController.searchProducts(query.toString(), shopId.toString()).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// get all categories in a shop
router.get('/categories', (req, res) => {
  try {
    const { shopId } = req.query;
    ShopController.getCategories(shopId.toString()).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});
