import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './../styles/Navbar.css';

export default function Navbar() {
  const { t, i18n } = useTranslation('navbar');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="navbar">
      <div className="links">
        <img src="./../../public/pink-logo.png" alt="logo" />
        <Link to="/">{t('home')}</Link>
        <Link to="/presentation">{t('presentation')}</Link>
        <Link to="/tarifs">{t('pricing')}</Link>
        <Link to="/bnp">{t('bookPodcast')}</Link>
        <Link to="/coordonnees">{t('contact')}</Link>
        <Link to="/prendre-rendez-vous">Prendre un rendez-vous</Link>

        <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
        </select>
      </div>
      <div className="navbar-right">
        <Link className="login" to="/login">{t('login')}</Link>
      </div>
    </nav>
  );
}