import React, { useEffect, useState } from 'react';

export default function MesRendezVous() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const formatDateHeure = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('Vous devez être connecté.');
      return;
    }

    fetch('http://localhost:5000/api/slots/my', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSlots(data);
        } else {
          setMessage('Aucun rendez-vous trouvé.');
        }
      })
      .catch(() => {
        setMessage('Erreur lors du chargement des rendez-vous.');
      });
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes rendez-vous</h2>

      {message && <p style={{ color: 'red' }}>{message}</p>}

      {slots.length > 0 ? (
        <ul>
          {slots.map((slot) => (
            <li key={slot._id}>{formatDateHeure(slot.date)}</li>
          ))}
        </ul>
      ) : (
        !message && <p>Vous n’avez encore pris aucun rendez-vous.</p>
      )}
    </div>
  );
}
