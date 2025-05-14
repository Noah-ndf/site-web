import React, { useState } from 'react';

const jours = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

export default function ConfigurerCreneaux() {
  const [dates, setDates] = useState([]);
  const [dateInput, setDateInput] = useState('');
  const [config, setConfig] = useState(() =>
    Object.fromEntries(jours.map(j => [j, { actif: false, plages: [{ from: 10, to: 19 }] }]))
  );
  const [message, setMessage] = useState('');

  const handleAddDate = () => {
    if (dateInput && !dates.includes(dateInput)) {
      setDates([...dates, dateInput]);
      setDateInput('');
    }
  };

  const handleRemoveDate = (d) => {
    setDates(dates.filter(date => date !== d));
  };

  const handleJourChange = (jour, key, value) => {
    setConfig(prev => ({
      ...prev,
      [jour]: {
        ...prev[jour],
        [key]: value
      }
    }));
  };

  const handlePlageChange = (jour, index, key, value) => {
    const plages = [...config[jour].plages];
    plages[index][key] = parseInt(value);
    handleJourChange(jour, 'plages', plages);
  };

  const handleAddPlage = (jour) => {
    const plages = [...config[jour].plages, { from: 10, to: 12 }];
    handleJourChange(jour, 'plages', plages);
  };

  const handleRemovePlage = (jour, index) => {
    const plages = config[jour].plages.filter((_, i) => i !== index);
    handleJourChange(jour, 'plages', plages);
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
        body: JSON.stringify({ config, dates }),
      });

      const data = await res.json();
      setMessage(data.message || 'Créneaux générés.');
    } catch {
      setMessage('Erreur lors de la génération.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Configurer mes créneaux</h2>

      <form onSubmit={handleSubmit}>
        <label>Ajouter une date (aaaa-mm-jj) :</label><br />
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <button type="button" onClick={handleAddDate}>Ajouter la date</button>

        {dates.length > 0 && (
          <ul>
            {dates.map((d) => (
              <li key={d}>
                {d}{' '}
                <button type="button" onClick={() => handleRemoveDate(d)}>❌</button>
              </li>
            ))}
          </ul>
        )}

        <hr />

        {jours.map((jour) => (
          <div key={jour} style={{ marginBottom: '2rem' }}>
            <label>
              <input
                type="checkbox"
                checked={config[jour].actif}
                onChange={e => handleJourChange(jour, 'actif', e.target.checked)}
              />
              {' '}
              {jour.charAt(0).toUpperCase() + jour.slice(1)}
            </label>

            {config[jour].actif && (
              <>
                {config[jour].plages.map((plage, i) => (
                  <div key={i}>
                    de{' '}
                    <input
                      type="number"
                      min="0"
                      max="23"
                      value={plage.from}
                      onChange={(e) => handlePlageChange(jour, i, 'from', e.target.value)}
                    />{' '}
                    à{' '}
                    <input
                      type="number"
                      min="1"
                      max="24"
                      value={plage.to}
                      onChange={(e) => handlePlageChange(jour, i, 'to', e.target.value)}
                    />
                    {' '}
                    <button type="button" onClick={() => handleRemovePlage(jour, i)}>🗑️</button>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddPlage(jour)}>➕ Ajouter une plage</button>
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
