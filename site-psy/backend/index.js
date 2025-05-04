import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API en ligne 🎉');
});

const PORT = process.env.PORT || 5000;
app.get('/api/test', (req, res) => {
  res.send('Le backend répond bien ✅');
});

app.listen(PORT, () => console.log(`Serveur en écoute sur http://localhost:${PORT}`));

app.use('/api/auth', authRoutes);



app.use('/api/appointments', appointmentRoutes);

app.get('/api/test', (req, res) => {
  res.send('Le backend répond bien ✅');
});
