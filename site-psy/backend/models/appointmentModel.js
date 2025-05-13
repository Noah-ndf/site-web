import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  motif: {
    type: String,
    required: true,
  },
  statut: {
    type: String,
    enum: ['en attente', 'confirmé', 'annulé'],
    default: 'en attente',
  },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
