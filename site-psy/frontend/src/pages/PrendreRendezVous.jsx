import React, { useState, useEffect } from 'react';

export default function PrendreRendezVous() {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const fetchSlots = async () => {
    if (!date) return;
    try {
      const res = await fetch(`http://localhost:5000/api/slots?date=${date}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setSlots(data);
        setMessage('');
      } else {
        setMessage(data.message || 'Erreur lors du chargement des créneaux');
        setSlots([]);
      }
    } catch {
      setMessage('Erreur de connexion au serveur');
      setSlots([]);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [date]);

const handleReservation = async (slotId) => {
  const confirm = window.confirm("Souhaitez-vous vraiment réserver ce créneau ?");
  if (!confirm) return;

  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`http://localhost:5000/api/slots/reserver/${slotId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      setMessage(data.message);
      fetchSlots(); // rafraîchit la liste
    } else {
      setMessage(data.message || 'Erreur lors de la réservation');
    }
  } catch {
    setMessage('Erreur lors de la réservation');
  }
};

  const formatDateTime = (d) =>
    new Date(d).toLocaleString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Prendre un rendez-vous</h2>

      <label>
        Choisissez une date :
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </label>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('succès') ? 'green' : 'red' }}>
          {message}
        </p>
      )}

      <ul style={{ marginTop: '2rem' }}>
        {slots.map((slot) => (
          <li key={slot._id} style={{ marginBottom: '1rem' }}>
            {formatDateTime(slot.date)}
            <button
              onClick={() => handleReservation(slot._id)}
              style={{
                marginLeft: '1rem',
                padding: '0.3rem 0.7rem',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Réserver
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
