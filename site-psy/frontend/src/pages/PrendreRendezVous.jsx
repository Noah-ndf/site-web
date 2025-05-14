import React, { useState, useEffect } from 'react';

export default function PrendreRendezVous() {
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');

  const formatHeure = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    setMessage('');
    setSuccess('');
    setSlots([]);
  };

  const fetchSlots = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/slots?date=${date}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setSlots(data);
      } else {
        setMessage('Aucun créneau trouvé pour cette date.');
      }
    } catch {
      setMessage('Erreur lors de la récupération des créneaux.');
    }
  };

  useEffect(() => {
    if (date) fetchSlots();
  }, [date]);

  const handleReserve = async (slotId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Vous devez être connecté pour réserver.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/slots/reserve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ slotId })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Erreur lors de la réservation.');
      } else {
        setSuccess('Créneau réservé avec succès ✅');
        setSlots((prev) => prev.filter((s) => s._id !== slotId));
      }
    } catch {
      setMessage('Erreur réseau.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Prendre un rendez-vous</h2>

      <label htmlFor="date">Choisissez une date :</label><br />
      <input
        type="date"
        id="date"
        value={date}
        onChange={handleDateChange}
        required
        style={{ margin: '1rem 0' }}
      />

      {message && <p style={{ color: 'red' }}>{message}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {slots.length > 0 && (
        <>
          <h3>Créneaux disponibles :</h3>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {slots.map((slot) => (
              <li key={slot._id} style={{ marginBottom: '0.5rem' }}>
                {formatHeure(slot.date)}
                <button
                  onClick={() => handleReserve(slot._id)}
                  style={{ marginLeft: '1rem' }}
                >
                  Réserver
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
