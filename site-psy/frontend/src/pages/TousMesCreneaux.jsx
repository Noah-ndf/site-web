import React, { useEffect, useState } from 'react';

export default function TousMesCreneaux() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const formatDate = (d) =>
    new Date(d).toLocaleString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/slots/mine', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSlots(data);
        } else {
          setMessage('Erreur lors du chargement des créneaux.');
        }
      })
      .catch(() => setMessage('Erreur serveur.'));
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Supprimer ce créneau ?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/slots/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Erreur lors de la suppression.');
      } else {
        setSlots(slots.filter((s) => s._id !== id));
        setMessage(data.message);
      }
    } catch {
      setMessage('Erreur de connexion.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes créneaux planifiés</h2>

      {message && <p style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>}
      {slots.length === 0 && !message && <p>Vous n'avez aucun créneau configuré.</p>}

      <ul>
        {slots.map((slot) => (
          <li key={slot._id} style={{ marginBottom: '1rem' }}>
            {formatDate(slot.date)} — {slot.estDisponible ? '✅ Disponible' : '❌ Réservé'}
            {slot.estDisponible && (
              <button
                onClick={() => handleDelete(slot._id)}
                style={{ marginLeft: '1rem', color: 'white', backgroundColor: 'red', border: 'none', borderRadius: '4px', padding: '0.3rem 0.6rem', cursor: 'pointer' }}
              >
                Supprimer
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
