import React, { useEffect, useState } from 'react';

export default function TousLesRendezVous() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return setError('You must be logged in.');

    fetch('http://localhost:5000/api/appointments/all', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized or access denied');
        return res.json();
      })
      .then(data => setAppointments(data))
      .catch(err => setError(err.message));
  }, [token]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statut: newStatus }),
      });

      if (!res.ok) throw new Error('Update failed');

      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, statut: newStatus } : a))
      );
    } catch (err) {
      alert('❌ ' + err.message);
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Rendez-vous de tous les clients</h2>
      {appointments.length === 0 ? (
        <p>Aucun rendez-vous pour le moment.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Client</th>
              <th>Email</th>
              <th>Date</th>
              <th>Motif</th>
              <th>Statut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a._id}>
                <td>{a.client.nom} {a.client.prenom}</td>
                <td>{a.client.email}</td>
                <td>{new Date(a.date).toLocaleString()}</td>
                <td>{a.motif}</td>
                <td>{a.statut}</td>
                <td>
                  <select
                    value={a.statut}
                    onChange={(e) => handleStatusChange(a._id, e.target.value)}
                  >
                    <option value="en attente">en attente</option>
                    <option value="confirmé">confirmé</option>
                    <option value="annulé">annulé</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
