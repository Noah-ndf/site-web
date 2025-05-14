import Slot from '../models/slotModel.js';

export const generateSlots = async (req, res) => {
  try {
    const { config = {}, joursAvance = 7 } = req.body;
    const psyId = req.user._id;

    const joursMap = {
      'dimanche': 0,
      'lundi': 1,
      'mardi': 2,
      'mercredi': 3,
      'jeudi': 4,
      'vendredi': 5,
      'samedi': 6
    };

    const createdSlots = [];
    const today = new Date();

    for (let i = 0; i < joursAvance; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);

      const dayIndex = date.getDay(); // 0 = dimanche
      const jourFr = Object.keys(joursMap).find(j => joursMap[j] === dayIndex);
      const jourConfig = config[jourFr];

      if (!jourConfig || !jourConfig.actif) continue;

      const from = jourConfig.from;
      const to = jourConfig.to;

      for (let hour = from; hour < to; hour++) {
        const slotDate = new Date(date);
        slotDate.setHours(hour, 0, 0, 0);

        const existing = await Slot.findOne({ date: slotDate, psy: psyId });
        if (!existing) {
          const newSlot = new Slot({
            date: slotDate,
            psy: psyId,
            estDisponible: true
          });
          await newSlot.save();
          createdSlots.push(newSlot);
        }
      }
    }

    res.status(201).json({
      message: `${createdSlots.length} créneaux créés`,
      slots: createdSlots
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la génération des créneaux' });
  }
};


// ✅ Nouvelle route GET pour récupérer les créneaux disponibles par date
export const getAvailableSlotsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: 'Date manquante' });
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const slots = await Slot.find({
      date: { $gte: start, $lt: end },
      estDisponible: true
    }).sort({ date: 1 });

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des créneaux' });
  }
};

export const reserveSlot = async (req, res) => {
  try {
    const { slotId } = req.body;

    if (!slotId) {
      return res.status(400).json({ message: 'ID du créneau requis' });
    }

    const slot = await Slot.findById(slotId);

    if (!slot) {
      return res.status(404).json({ message: 'Créneau introuvable' });
    }

    if (!slot.estDisponible) {
      return res.status(400).json({ message: 'Ce créneau est déjà réservé' });
    }

    // Vérifie que le créneau n’est pas dans le passé
    if (new Date(slot.date) < new Date()) {
      return res.status(400).json({ message: 'Ce créneau est déjà passé' });
    }

    // Réservation
    slot.estDisponible = false;
    slot.prisPar = req.user._id;

    await slot.save();

    res.status(200).json({ message: 'Créneau réservé avec succès', slot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la réservation' });
  }
};

export const getMyReservedSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ prisPar: req.user._id })
      .sort({ date: 1 });

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous' });
  }
};
