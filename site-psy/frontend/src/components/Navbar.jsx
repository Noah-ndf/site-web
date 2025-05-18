import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './../styles/Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
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
        <Link to="/">{t('nav.home')}</Link>
        <Link to="/Presentation">{t('nav.about')}</Link>
        <Link to="/Tarifs">{t('nav.pricing')}</Link>

        <>
          {(!user || user.role !== 'psychologue') && (
            <Link to={user ? "/prendre-rendez-vous" : "/login"}>
              {t('nav.makeAppointment')}
            </Link>
          )}

          {user && user.role === 'client' && (
            <Link to="/mes-rendez-vous">{t('nav.myAppointments')}</Link>
          )}

          {user && user.role === 'psychologue' && (
            <>
              <Link to="/tous-les-rendez-vous">{t('nav.allAppointments')}</Link>
              <Link to="/configurer-creneaux">{t('nav.setupSlots')}</Link>
              <Link to="/mes-creneaux">{t('nav.mySlots')}</Link>
            </>
          )}
        </>

        <select
          aria-label={t('nav.language')}
          onChange={(e) => changeLanguage(e.target.value)}
          defaultValue={i18n.language}
        >
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="navbar-right">
        {user ? (
          <div className="user-info">
            <span className="bonjour-user">{t('nav.hello')}, {user.prenom}</span>
            <button onClick={handleLogout} className="login">
              {t('nav.logout')}
            </button>
          </div>
        ) : (
          <Link className="login" to="/login">{t('nav.login')}</Link>
        )}
      </div>
    </nav>
  );
}
