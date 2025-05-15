import React, { useEffect, useState } from 'react';

export default function TousMesCreneaux() {
  const [slots, setSlots] = useState([]);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedDate, setEditedDate] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const formatDate = (d) =>
    new Date(d).toLocaleString('fr-FR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });

  const sameDay = (d1, d2) =>
    new Date(d1).toDateString() === new Date(d2).toDateString();

  const fetchSlots = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/slots/mine', {
      headers: { Authorization: `Bearer ${token}` },
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
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Supprimer ce créneau ?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/slots/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
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

  const handleUpdate = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/api/slots/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newDate: editedDate }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || 'Erreur lors de la mise à jour.');
      } else {
        setMessage(data.message);
        setEditingId(null);
        setEditedDate('');
        fetchSlots();
      }
    } catch {
      setMessage('Erreur serveur.');
    }
  };

  const slotsAffiches = filterDate
    ? slots.filter((s) => sameDay(s.date, filterDate))
    : slots;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Mes créneaux planifiés</h2>

      <label>
        Filtrer par date :
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
        {filterDate && (
          <button onClick={() => setFilterDate('')} style={{ marginLeft: '1rem' }}>
            Réinitialiser
          </button>
        )}
      </label>

      {message && (
        <p style={{ color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>
      )}
      {slotsAffiches.length === 0 && !message && <p>Aucun créneau trouvé.</p>}

      <ul>
        {slotsAffiches.map((slot) => (
          <li key={slot._id} style={{ marginBottom: '1rem' }}>
            {editingId === slot._id ? (
              <>
                <input
                  type="datetime-local"
                  value={editedDate}
                  onChange={(e) => setEditedDate(e.target.value)}
                />
                <button onClick={() => handleUpdate(slot._id)} style={{ marginLeft: '1rem' }}>
                  💾 Enregistrer
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setEditedDate('');
                  }}
                  style={{ marginLeft: '0.5rem' }}
                >
                  Annuler
                </button>
              </>
            ) : (
              <>
                {formatDate(slot.date)} — {slot.estDisponible ? '✅ Disponible' : '❌ Réservé'}
                {slot.estDisponible && (
                  <>
                    <button
                      onClick={() => {
                        setEditingId(slot._id);
                        const iso = new Date(slot.date).toISOString().slice(0, 16);
                        setEditedDate(iso);
                      }}
                      style={{ marginLeft: '1rem' }}
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(slot._id)}
                      style={{
                        marginLeft: '0.5rem',
                        color: 'white',
                        backgroundColor: 'red',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '0.3rem 0.6rem',
                        cursor: 'pointer',
                      }}
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

console.log("User connecté : ", localStorage.getItem("token"));