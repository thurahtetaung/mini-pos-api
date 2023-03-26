import { Router } from 'express';
import { auth } from '../middleware/auth';
import { ShopController } from '../controllers/shopController';
import { ProductController } from '../controllers/productController';

export const router = Router();
router.use(auth);

// get a shop by id
router.get('/', (req, res) => {
  const { id } = req.query;
  ShopController.getShopById(id.toString())
    .then((response) => {
      res.status(response.statusCode).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// create a shop
router.post('/', (req, res) => {
  const { name, description, userId } = req.body;
  ShopController.createShop(name, description, userId)
    .then((response) => {
      console.log(response);
      res.status(response.statusCode).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// update a shop
router.put('/', (req, res) => {
  const { name, taxPercentage, userId, id } = req.body;
  ShopController.updateShop(id, name, taxPercentage, userId)
    .then((response) => {
      res.status(response.statusCode).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// search products in a shop
router.get('/searchProducts', (req, res) => {
  const { query, shopId } = req.query;
  ProductController.searchProducts(query.toString(), shopId.toString())
    .then((response) => {
      res.status(response.statusCode).json(response.data);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});
