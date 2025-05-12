import React, { useState } from 'react';
import './../styles/login.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div className='container'>
      <div className="bloc1">
        <div className="bloc1-1">
          <img src="./../../public/logo-white-background.png" alt="" />
          <h1>Heureux de vous revoir !</h1>
          <h2>Veuillez vous connecter pour accéder à mes services</h2>
          <p>Pas encore de compte ? inscrivez-vous <Link to="/Register">ici.</Link></p>
        </div>

        <div className="bloc1-2">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Connexion</h2>

            <div className="labelinput">
              <label htmlFor="email">Email :</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="Votre email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                autoComplete="email"
              />
            </div>

            <div className="labelinput">
              <label htmlFor="password">Mot de passe :</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Votre mot de passe" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                autoComplete="current-password"
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
