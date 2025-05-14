import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true, // évite les doublons
  },
  estDisponible: {
    type: Boolean,
    default: true,
  },
  prisPar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  psy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Slot', slotSchema);
