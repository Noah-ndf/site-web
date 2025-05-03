// backend/controllers/authController.js

import { users, User } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Vérifie si l'utilisateur existe déjà
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Email déjà utilisé' });
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'utilisateur
  const newUser = new User({
    id: Date.now(), // temporaire
    name,
    email,
    password: hashedPassword
  });

  users.push(newUser);

  res.status(201).json({ message: 'Utilisateur créé avec succès' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Utilisateur non trouvé' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Mot de passe incorrect' });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(200).json({ message: 'Connexion réussie', token });
};
