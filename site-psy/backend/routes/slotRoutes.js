import express from 'express';
import { generateSlots } from '../controllers/slotController.js';
import { authenticate, authorizeRole } from '../middlewares/authMiddleware.js';
import { getAvailableSlotsByDate } from '../controllers/slotController.js';
import { reserveSlot } from '../controllers/slotController.js';
import { getMyReservedSlots } from '../controllers/slotController.js';
import { getMySlots } from '../controllers/slotController.js';
import { deleteSlot } from '../controllers/slotController.js';
import { updateSlot } from '../controllers/slotController.js';
import { reserverCreneau } from '../controllers/slotController.js';
import { getAllReservedSlots } from '../controllers/slotController.js';
import { annulerCreneau } from '../controllers/slotController.js';




const router = express.Router();

// 🔒 accessible uniquement aux psychologues
router.post('/generate', authenticate, authorizeRole('psychologue'), generateSlots);
router.get('/', getAvailableSlotsByDate);
router.post('/reserve', authenticate, authorizeRole('client'), reserveSlot);
router.get('/my', authenticate, authorizeRole('client'), getMyReservedSlots);
router.get('/mine', authenticate, authorizeRole('psychologue'), getMySlots);
router.delete('/:id', authenticate, authorizeRole('psychologue'), deleteSlot);
router.put('/:id', authenticate, authorizeRole('psychologue'), updateSlot);
router.put('/reserver/:id', authenticate, authorizeRole('client'), reserverCreneau);
router.get('/reserved', authenticate, authorizeRole('psychologue'), getAllReservedSlots);
router.put('/annuler/:id', authenticate, authorizeRole('client'), annulerCreneau);

export default router;
