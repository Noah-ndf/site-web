import Slot from '../models/slotModel.js';
import { sendEmail } from '../utils/emailService.js';
import { formatDate } from '../utils/dateFormatter.js';

export const generateSlots = async (req, res) => {
  try {
    const { config = {}, dates = [] } = req.body;
    const psyId = req.user._id;

    if (!Array.isArray(dates) || dates.length === 0) {
      return res.status(400).json({ message: 'Aucune date fournie' });
    }

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

    for (const dateStr of dates) {
      const dateObj = new Date(dateStr);
      const dayIndex = dateObj.getDay();
      const jourFr = Object.keys(joursMap).find(j => joursMap[j] === dayIndex);
      const jourConfig = config[jourFr];

      if (!jourConfig || !jourConfig.actif || !Array.isArray(jourConfig.plages)) continue;

      for (const plage of jourConfig.plages) {
        const from = plage.from;
        const to = plage.to;

        for (let hour = from; hour < to; hour++) {
          const slotDate = new Date(dateStr);
          slotDate.setHours(hour, 0, 0, 0);

          const exists = await Slot.findOne({ date: slotDate, psy: psyId });
          if (!exists) {
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
    }

    res.status(201).json({
      message: `${createdSlots.length} créneaux générés avec succès.`,
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

export const getMySlots = async (req, res) => {
  try {
    const slots = await Slot.find({ psy: req.user._id })
      .sort({ date: 1 });

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération de vos créneaux' });
  }
};

export const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: 'Créneau introuvable' });
    }

    // Vérifie que le créneau appartient à la psy connectée
    if (slot.psy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Accès refusé' });
    }

    // Empêche la suppression d’un créneau déjà réservé
    if (!slot.estDisponible) {
      return res.status(400).json({ message: 'Créneau déjà réservé, impossible à supprimer' });
    }

    await Slot.findByIdAndDelete(slot._id);
    res.status(200).json({ message: 'Créneau supprimé avec succès' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la suppression du créneau' });
  }
};

export const updateSlot = async (req, res) => {
  try {
    const { newDate } = req.body;

    if (!newDate) {
      return res.status(400).json({ message: 'Nouvelle date requise' });
    }

    const slot = await Slot.findById(req.params.id);

    if (!slot) {
      return res.status(404).json({ message: 'Créneau introuvable' });
    }

    // Vérifie que le créneau appartient bien à la psy connectée
    if (slot.psy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    // Empêche la modification si le créneau est réservé
    if (!slot.estDisponible) {
      return res.status(400).json({ message: 'Impossible de modifier un créneau réservé' });
    }

    const newDateObj = new Date(newDate);

    // Vérifie si un autre créneau existe déjà à cette date
    const duplicate = await Slot.findOne({
      date: newDateObj,
      psy: req.user._id
    });

    if (duplicate) {
      return res.status(400).json({ message: 'Un créneau existe déjà à cette heure-là' });
    }

    slot.date = newDateObj;
    await slot.save();

    res.status(200).json({ message: 'Créneau mis à jour', slot });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du créneau' });
  }
};

export const reserverCreneau = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);

    if (!slot) return res.status(404).json({ message: 'Créneau introuvable' });
    if (!slot.estDisponible) return res.status(400).json({ message: 'Créneau déjà réservé' });

    slot.estDisponible = false;
    slot.prisPar = req.user._id;
    slot.dateAnnulation = null; // au cas où il a été annulé puis repris
    await slot.save();

    await sendEmail({
      to: req.user.email,
      subject: 'Votre rendez-vous est confirmé',
      text: `Bonjour ${req.user.prenom},\n\nVotre rendez-vous est confirmé pour le ${formatDate(slot.date)}.\n\nMerci.`,
    });

    res.status(200).json({ message: 'Créneau réservé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la réservation du créneau' });
  }
};

export const getAllReservedSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ prisPar: { $ne: null } })
      .populate('prisPar', 'nom prenom email')
      .sort({ date: 1 });

    res.status(200).json(slots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous réservés' });
  }
};

export const annulerCreneau = async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id).populate('psy prisPar');

    if (!slot) return res.status(404).json({ message: 'Créneau introuvable' });
    if (!slot.prisPar || slot.prisPar._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Accès interdit' });
    }

    const maintenant = new Date();
    const diffHeures = (new Date(slot.date) - maintenant) / (1000 * 60 * 60);
    if (diffHeures < 24) {
      return res.status(400).json({ message: 'Impossible d’annuler un rendez-vous à moins de 24h' });
    }

    slot.estDisponible = true;
    slot.dateAnnulation = new Date();
    await slot.save();

    await sendEmail({
      to: slot.psy.email,
      subject: 'Annulation de rendez-vous',
      text: `Bonjour,\n\nLe client ${slot.prisPar.prenom} ${slot.prisPar.nom} a annulé son rendez-vous prévu le ${formatDate(slot.date)}.`,
    });

    res.status(200).json({ message: 'Rendez-vous annulé avec succès' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur lors de l’annulation du rendez-vous' });
  }
};
