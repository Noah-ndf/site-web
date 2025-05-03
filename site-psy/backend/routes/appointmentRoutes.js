import express from 'express';
import { createAppointment, getMyAppointments } from '../controllers/appointmentController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createAppointment); // Créer un rdv
router.get('/', authenticate, getMyAppointments); // Voir ses rdv

export default router;
