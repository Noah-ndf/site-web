import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;

import { authenticate } from '../middlewares/authMiddleware.js';

router.get('/me', authenticate, (req, res) => {
  res.json({ message: 'Tu es authentifié ✅', user: req.user });
});
