import React, { useState } from 'react';

const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export default function ConfigurerCreneaux() {
  const [joursAvance, setJoursAvance] = useState(7);
  const [config, setConfig] = useState(() =>
    Object.fromEntries(jours.map(j => [j, { actif: false, from: '10', to: '19' }]))
  );
  const [message, setMessage] = useState('');

  const handleChange = (jour, key, value) => {
    setConfig(prev => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        [key]: key === 'actif' ? value : parseInt(value)
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/slots/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ config, joursAvance }),
      });

      const data = await res.json();
      setMessage(data.message || 'Créneaux générés.');
    } catch {
      setMessage('Erreur lors de la génération des créneaux.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Configurer mes créneaux</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre de jours à générer :</label>
        <select value={joursAvance} onChange={e => setJoursAvance(parseInt(e.target.value))}>
          <option value={7}>7 jours</option>
          <option value={14}>14 jours</option>
          <option value={21}>21 jours</option>
          <option value={28}>28 jours</option>
        </select>

        <hr />

        {jours.map((jour) => (
          <div key={jour} style={{ marginBottom: '1rem' }}>
            <label>
              <input
                type="checkbox"
                checked={config[jour].actif}
                onChange={e => handleChange(jour, 'actif', e.target.checked)}
              />
              {' '}
              {jour.charAt(0).toUpperCase() + jour.slice(1)}
            </label>

            {config[jour].actif && (
              <>
                {' '}de{' '}
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={config[jour].from}
                  onChange={e => handleChange(jour, 'from', e.target.value)}
                />
                h à{' '}
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={config[jour].to}
                  onChange={e => handleChange(jour, 'to', e.target.value)}
                />
                h
              </>
            )}
          </div>
        ))}

        <button type="submit">Générer les créneaux</button>
      </form>

      {message && <p style={{ marginTop: '1rem', color: 'green' }}>{message}</p>}
    </div>
  );
}
