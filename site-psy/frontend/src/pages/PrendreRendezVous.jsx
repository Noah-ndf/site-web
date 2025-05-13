import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PrendreRendezVous() {
  const [date, setDate] = useState('');
  const [motif, setMotif] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to make an appointment.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ date, motif })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Error creating appointment');
      }

      setMessage('Appointment successfully created ✅');
      setDate('');
      setMotif('');

      // Rediriger vers la page des RDV
      setTimeout(() => {
        navigate('/mes-rendez-vous');
      }, 1000);
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div>
      <h2>Prendre un rendez-vous</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date et heure :</label><br />
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Motif :</label><br />
          <textarea
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
            placeholder="Décrivez brièvement le motif..."
            required
          ></textarea>
        </div>
        <button type="submit">Valider</button>
      </form>
      {message && <p style={{ marginTop: '1rem', color: 'blue' }}>{message}</p>}
    </div>
  );
}
