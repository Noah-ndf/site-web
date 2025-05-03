import { appointments, Appointment } from '../models/appointmentModel.js';

export const createAppointment = (req, res) => {
  const { date, time, reason } = req.body;

  if (!date || !time || !reason) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const newAppointment = new Appointment({
    id: Date.now(),
    userId: req.user.id, // on prend l'ID depuis le token
    date,
    time,
    reason
  });

  appointments.push(newAppointment);

  res.status(201).json({ message: 'Rendez-vous créé', appointment: newAppointment });
};

export const getMyAppointments = (req, res) => {
  const userAppointments = appointments.filter(a => a.userId === req.user.id);
  res.json(userAppointments);
};
