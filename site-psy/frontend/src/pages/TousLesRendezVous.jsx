import React, { useEffect, useState } from 'react';

export default function TousLesRendezVous() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const fetchSlots = async () => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/slots/reserved', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setSlots(data);
        setMessage('');
      } else {
        setMessage(data.message || 'Erreur lors du chargement des rendez-vous.');
      }
    } catch (err) {
      setMessage('Erreur de connexion au serveur.');
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const formatDate = (d) =>
    new Date(d).toLocaleString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Rendez-vous réservés</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      {slots.length === 0 && !message && <p>Aucun rendez-vous pour l’instant.</p>}

      <ul style={{ marginTop: '1rem' }}>
        {slots.map((slot) => (
          <li
            key={slot._id}
            style={{
              marginBottom: '1rem',
              color: slot.estDisponible ? 'gray' : 'black',
              textDecoration: slot.estDisponible ? 'line-through' : 'none',
            }}
          >
            <strong>Date :</strong> {formatDate(slot.date)} <br />
            <strong>Client :</strong> {slot.prisPar?.prenom} {slot.prisPar?.nom} <br />
            <strong>Email :</strong> {slot.prisPar?.email} <br />
            <strong>Statut :</strong>{' '}
            {slot.estDisponible ? (
              <span style={{ color: 'gray' }}>Annulé</span>
            ) : (
              <span style={{ color: 'green' }}>Confirmé</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
