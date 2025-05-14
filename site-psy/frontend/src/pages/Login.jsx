import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './../styles/login.css';

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || 'Erreur de connexion');
        return;
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);                // ✅ Mise à jour du contexte
      navigate('/');                     // ✅ Redirection vers l’accueil
      window.scrollTo(0, 0);             // ✅ Scroll automatique en haut

    } catch (err) {
      setMessage('Une erreur est survenue');
    }
  };

  return (
    <div className='container'>
      <div className="bloc1">
        <div className="bloc1-1">
          <img src="./../../public/logo-white-background.png" alt="" />
          <h1>Heureux de vous revoir !</h1>
          <h2>Veuillez vous connecter pour accéder à mes services</h2>
          <p>Pas encore de compte ? inscrivez-vous <a href="/register">ici.</a></p>
        </div>
        <div className="bloc1-2">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Connexion</h2>

            <div className="labelinput">
              <label htmlFor="email">Email :</label>
              <input
                type="email"
                id="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="labelinput">
              <label htmlFor="password">Mot de passe :</label>
              <input
                type="password"
                id="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Se connecter</button>

            {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
