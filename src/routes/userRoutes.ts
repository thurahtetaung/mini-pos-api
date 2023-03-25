import { Router } from 'express';
import { UserController } from '../controllers/userController';

export const router = Router();

// login a user
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    UserController.login(email, password)
      .then((response) => {
        res.status(response.statusCode).json(response);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// register a user
router.post('/register', (req, res) => {
  try {
    const { email, password } = req.body;
    UserController.register(email, password)
      .then((response) => {
        res.status(response.statusCode).json(response);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});
