import { useEffect, useState } from 'react';

function MesRendezVous() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Utilisateur non connecté.');
      setLoading(false);
      return;
    }

    fetch('http://localhost:5000/api/appointments', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors du chargement des rendez-vous');
        return res.json();
      })
      .then(data => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Mes rendez-vous</h2>
      {appointments.length === 0 ? (
        <p>Vous n'avez encore aucun rendez-vous.</p>
      ) : (
        <ul>
          {appointments.map((a) => (
            <li key={a.id}>
              <strong>{a.date}</strong> à <strong>{a.time}</strong> — {a.reason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MesRendezVous;
