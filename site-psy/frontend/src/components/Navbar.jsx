import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './../styles/Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'it', label: 'Italiano' },
  ];

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
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
{(!user || user.role === 'client') && (
  <div className="rdv-dropdown">
    <button className="rdv-button">
      {t('nav.appointments')}
    </button>
    <ul className="rdv-menu">
      <li>
        <Link to={user ? "/prendre-rendez-vous" : "/login"}>
          {t('nav.makeAppointment')}
        </Link>
      </li>
      {user && (
        <li>
          <Link to="/mes-rendez-vous">
            {t('nav.myAppointments')}
          </Link>
        </li>
      )}
    </ul>
  </div>
)}
        {user && user.role === 'psychologue' && (
  <div className="rdv-dropdown">
    <button className="rdv-button">
      {t('nav.appointments')}
    </button>
    <ul className="rdv-menu">
      <li><Link to="/tous-les-rendez-vous">{t('nav.allAppointments')}</Link></li>
      <li><Link to="/configurer-creneaux">{t('nav.setupSlots')}</Link></li>
      <li><Link to="/mes-creneaux">{t('nav.mySlots')}</Link></li>
    </ul>
  </div>
)}


        <div className="lang-dropdown">
  <button className="lang-button">
    {t('nav.language')}
  </button>
  <ul className="lang-menu">
    {languages.map((lang) => (
      <li key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
        {lang.label}
      </li>
    ))}
  </ul>
</div>
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
