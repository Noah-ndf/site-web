import express from 'express';
import {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
} from '../controllers/appointmentController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';
import { updateAppointmentStatus } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', authenticate, createAppointment);
router.get('/me', authenticate, getMyAppointments);
router.get('/all', authenticate, authorizeRole('psychologue'), getAllAppointments);
router.put('/:id', authenticate, authorizeRole('psychologue'), updateAppointmentStatus);


export default router;
