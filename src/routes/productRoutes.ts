import { Router } from 'express';
import { auth } from '../middleware/auth';
import { ProductController } from '../controllers/productController';

export const router = Router();
router.use(auth);

// get a product by id
router.get('/:id', (req, res) => {
  try {
    ProductController.getProductById(req.params.id).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// get all products in a shop
router.get('/byShop', (req, res) => {
  try {
    const { shopId } = req.query;
    ProductController.getProductsByShop(shopId.toString()).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// get all products in a shop by category
router.get('/byCategory', (req, res) => {
  try {
    const { category, shopId } = req.query;
    ProductController.getProductsByCategory(category.toString(), shopId.toString()).then(
      (response) => {
        res.status(response.statusCode).json(response);
      },
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// create a product
router.post('/', (req, res) => {
  try {
    const { name, description, category, price, shopId, userId } = req.body;
    ProductController.createProduct(name, description, category, price, shopId, userId).then(
      (response) => {
        res.status(response.statusCode).json(response);
      },
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// update a product
router.patch('/', (req, res) => {
  try {
    const { name, description, category, price, shopId, userId, id } = req.body;
    ProductController.updateProduct(shopId, userId, id, name, description, category, price).then(
      (response) => {
        res.status(response.statusCode).json(response);
      },
    );
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// delete a product
router.delete('/', (req, res) => {
  try {
    const { id, userId, shopId } = req.body;
    ProductController.deleteProduct(id, userId, shopId).then((response) => {
      res.status(response.statusCode).json(response);
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});
