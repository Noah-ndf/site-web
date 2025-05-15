import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import authRoutes from './routes/authRoutes.js';
import slotRoutes from './routes/slotRoutes.js';

dotenv.config();
connectDB(); // Connexion à MongoDB

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:5173', // Adresse du front-end
  credentials: true,              // Autoriser les cookies / tokens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Route de test (accueil)
app.get('/', (req, res) => {
  res.send('API en ligne 🎉');
});

// Route de test rapide
app.get('/api/test', (req, res) => {
  res.send('Le backend répond bien ✅');
});

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/slots', slotRoutes);

// Route fallback 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur http://localhost:${PORT}`);
});

