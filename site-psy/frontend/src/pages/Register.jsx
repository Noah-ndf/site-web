import React, { useState } from 'react';
import './../styles/register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api';

export default function Register() {
  const { t } = useTranslation();
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
      setError(t('register.error'));
    }
  };

  return (
    <div className='rcontainer'>
      <div className="rbloc1">
        <div className="rbloc1-2">
          <form className="rlogin-form" onSubmit={handleSubmit}>
            <h2>{t('register.title')}</h2>

            <div className="rlabelinput">
              <label htmlFor="nom">{t('register.nameLabel')}</label>
              <input 
                type="text" 
                id="nom" 
                placeholder={t('register.namePlaceholder')}
                required 
                value={formData.nom} 
                onChange={handleChange} 
                autoComplete="family-name"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="prenom">{t('register.firstnameLabel')}</label>
              <input 
                type="text" 
                id="prenom" 
                placeholder={t('register.firstnamePlaceholder')}
                required 
                value={formData.prenom} 
                onChange={handleChange} 
                autoComplete="given-name"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="email">{t('register.emailLabel')}</label>
              <input 
                type="email" 
                id="email" 
                placeholder={t('register.emailPlaceholder')}
                required 
                value={formData.email} 
                onChange={handleChange} 
                autoComplete="email"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="password">{t('register.passwordLabel')}</label>
              <input 
                type="password" 
                id="password" 
                placeholder={t('register.passwordPlaceholder')}
                required 
                value={formData.password} 
                onChange={handleChange} 
                autoComplete="new-password"
              />
            </div>

            <div className="rlabelinput">
              <label htmlFor="telephone">{t('register.phoneLabel')}</label>
              <input 
                type="tel" 
                id="telephone" 
                placeholder={t('register.phonePlaceholder')}
                required 
                value={formData.telephone} 
                onChange={handleChange} 
                autoComplete="tel"
              />
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">{t('register.submit')}</button>
          </form>
        </div>

        <div className="rbloc1-1">
          <img src="./../../public/logo-white-background.png" alt="" />
          <h1>{t('register.welcomeTitle')}</h1>
          <h2>{t('register.welcomeSubtitle')}</h2>
          <p>
            {t('register.alreadyClient')}
            <Link to="/login">{t('register.here')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
