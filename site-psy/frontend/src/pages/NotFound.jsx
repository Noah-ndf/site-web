import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './../styles/NotFound.css';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>{t('notfound.title')}</h2>
      <p>{t('notfound.description')}</p>
      <Link to="/">{t('notfound.homeLink')}</Link>
    </div>
  );
}
