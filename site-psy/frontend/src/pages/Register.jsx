import React, { useState } from 'react';
import './../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function Register() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: '',
  });
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
      await API.post('/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  return (
    <div className='rcontainer'>
      <div className="rbloc1">
        <div className="rbloc1-2">
          <form className="rlogin-form" onSubmit={handleSubmit}>
            <h2>Inscription</h2>

            <div className="rlabelinput">
              <label htmlFor="nom">Nom</label>
              <input 
                type="text" 
                id="nom" 
                name="nom" 
                placeholder="Votre nom" 
                required 
                value={formData.nom} 
                onChange={handleChange} 
                autoComplete="family-name"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="prenom">Prénom</label>
              <input 
                type="text" 
                id="prenom" 
                name="prenom" 
                placeholder="Votre prénom" 
                required 
                value={formData.prenom} 
                onChange={handleChange} 
                autoComplete="given-name"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="email">Adresse e-mail</label>
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

            <div className="rlabelinput">
              <label htmlFor="password">Mot de passe</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                placeholder="Votre mot de passe" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                autoComplete="new-password"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="telephone">Téléphone</label>
              <input 
                type="tel" 
                id="telephone" 
                name="telephone" 
                placeholder="Votre numéro de téléphone" 
                required 
                value={formData.telephone} 
                onChange={handleChange} 
                autoComplete="tel"
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="submit">S'inscrire</button>
          </form>
        </div>

        <div className="rbloc1-1">
          <img src="./../../public/logo-white-background.png" alt="" />
          <h1>Bienvenue !</h1>
          <h2>Veuillez renseigner vos informations personnelles pour pouvoir accéder à la prise de rendez-vous</h2>
          <p>Déjà client ? Connectez-vous <Link to="/login">ici.</Link></p>
        </div>
      </div>
    </div>
  );
}
