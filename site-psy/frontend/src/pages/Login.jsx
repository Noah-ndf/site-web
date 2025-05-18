import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './../styles/login.css';

export default function Login() {
  const { t } = useTranslation();
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
        setMessage(data.message || t('login.defaultLoginError'));
        return;
      }

      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/');
      window.scrollTo(0, 0);

    } catch (err) {
      setMessage(t('login.error'));
    }
  };

  return (
    <div className='container'>
      <div className="bloc1">
        <div className="bloc1-1">
          <img src="./../../public/logo-white-background.png" alt="" />
          <h1>{t('login.welcomeTitle')}</h1>
          <h2>{t('login.welcomeSubtitle')}</h2>
          <p>
            {t('login.noAccount')}
            <a href="/register">{t('login.here')}</a>
          </p>
        </div>

        <div className="bloc1-2">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>{t('login.formTitle')}</h2>

            <div className="labelinput">
              <label htmlFor="email">{t('login.emailLabel')}</label>
              <input
                type="email"
                id="email"
                placeholder={t('login.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="labelinput">
              <label htmlFor="password">{t('login.passwordLabel')}</label>
              <input
                type="password"
                id="password"
                placeholder={t('login.passwordPlaceholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">{t('login.submit')}</button>

            {message && <p style={{ color: 'red', marginTop: '1rem' }}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
