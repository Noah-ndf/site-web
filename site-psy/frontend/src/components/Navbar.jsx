import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './../styles/Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation('navbar');
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (loading) return null;

  return (
    <nav className="navbar">
      <div className="links">
        <img src="./../../public/pink-logo.png" alt="logo" />
        <Link to="/">Accueil</Link>
        <Link to="/Presentation">Qui suis-je ?</Link>
        <Link to="/Presentation">Tarifs et contact</Link>

        {/* 👇 N'affiche PAS ce lien si l'utilisateur est une psychologue */}
        {(!user || user.role !== 'psychologue') && (
          <Link to="/prendre-rendez-vous">Prendre un rendez-vous</Link>
        )}

        {user && user.role === 'client' && (
          <Link to="/mes-rendez-vous">Mes rendez-vous</Link>
        )}

        {user && user.role === 'psychologue' && (
          <>
            <Link to="/tous-les-rendez-vous">Tous les rendez-vous</Link>
            <Link to="/configurer-creneaux">Configurer mes créneaux</Link>
            <Link to="/mes-creneaux">Mes créneaux</Link>
          </>
        )}

        <select
          aria-label="Choix de la langue"
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue={i18n.language}
        >
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
        </select>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            <span className="bonjour-user">Bonjour, {user.prenom}</span>
            <button onClick={handleLogout} className="login">
              Se déconnecter
            </button>
          </div>
        ) : (
          <Link className="login" to="/login">{t('login')}</Link>
        )}
      </div>
    </nav>
  );
}
