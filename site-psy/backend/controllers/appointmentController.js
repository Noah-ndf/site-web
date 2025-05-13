import Appointment from '../models/appointmentModel.js';

// ✅ Créer un rendez-vous (client)
export const createAppointment = async (req, res) => {
  try {
    const { date, motif } = req.body;

    const appointment = new Appointment({
      client: req.user._id,
      date,
      motif,
    });

    await appointment.save();
    res.status(201).json({ message: 'Appointment created', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error creating appointment' });
  }
};

// ✅ Récupérer les rendez-vous du client connecté
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ client: req.user._id }).sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

// ✅ Récupérer tous les rendez-vous (réservé au psychologue)
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('client', 'nom prenom email')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all appointments' });
  }
};

// ✅ Mettre à jour le statut d’un rendez-vous (psychologue uniquement)
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const validStatus = ['en attente', 'confirmé', 'annulé'];
    if (!validStatus.includes(statut)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.statut = statut;
    await appointment.save();

    res.json({ message: 'Status updated', appointment });
  } catch (err) {
    res.status(500).json({ message: 'Error updating appointment' });
  }
};
