// backend/routes/authRoutes.js

import express from 'express';
import { register, login } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route pour l'inscription
router.post('/register', register);

// Route pour la connexion
router.post('/login', login);

// Route pour récupérer les infos de l'utilisateur connecté
router.get('/me', authenticate, (req, res) => {
  res.json({
    message: 'Tu es authentifié ✅',
    user: {
      id: req.user._id,
      nom: req.user.nom,
      prenom: req.user.prenom,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

export default router;
