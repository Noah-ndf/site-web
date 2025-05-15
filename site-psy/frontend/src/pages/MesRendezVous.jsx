import React, { useEffect, useState } from 'react';

export default function MesRendezVous() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');

  const fetchSlots = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/slots/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        // 👉 On ne garde que les créneaux confirmés (pas annulés)
        const futursConfirmes = data.filter((slot) => !slot.estDisponible);
        setSlots(futursConfirmes);
        setMessage('');
      } else {
        setMessage(data.message || 'Erreur lors du chargement.');
      }
    } catch {
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

  const peutAnnuler = (date) => {
    const maintenant = new Date();
    const diff = new Date(date) - maintenant;
    return diff > 24 * 60 * 60 * 1000;
  };

  const handleCancel = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm("Annuler ce rendez-vous ?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/slots/annuler/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        fetchSlots(); // actualise la liste
      } else {
        setMessage(data.message || 'Erreur lors de l’annulation');
      }
    } catch {
      setMessage('Erreur serveur.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes rendez-vous réservés</h2>
      {message && <p style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>}
      {slots.length === 0 && <p>Aucun rendez-vous réservé.</p>}

      <ul style={{ marginTop: '1rem' }}>
        {slots.map((slot) => (
          <li key={slot._id} style={{ marginBottom: '1.5rem' }}>
            <strong>Date :</strong> {formatDate(slot.date)}
            {peutAnnuler(slot.date) && (
              <button
                onClick={() => handleCancel(slot._id)}
                style={{
                  marginLeft: '1rem',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.3rem 0.6rem',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
