import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import connectDB from './db.js';




dotenv.config();
connectDB(); // juste après dotenv.config()
const app = express();

app.use(express.json());

// Configuration de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Adresse du front-end
    credentials: true, // Autoriser les cookies et les tokens
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/', (req, res) => {
  res.send('API en ligne 🎉');
});

app.get('/api/test', (req, res) => {
  res.send('Le backend répond bien ✅');
});

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur en écoute sur http://localhost:${PORT}`));
