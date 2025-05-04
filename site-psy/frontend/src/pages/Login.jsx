import React from 'react';
import './../styles/login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  return <div className='container'>
    <div className="bloc1">
      <div className="bloc1-1">
        <img src="./../../public/logo-white-background.png" alt="" />
        <h1>Heureux de vous revoir !</h1>
        <h2>Veuillez vous conecter pour pouvoir accès à mes services</h2>
        <p>Pas encore de compte, inscrivez-vous <Link to="/Register">ici.</Link> </p>
      </div>
      <div className="bloc1-2">
      <form className="login-form">
        <h2>Connexion</h2>
          <div className="labelinput">
            <label htmlFor="email">Email :</label>
            <input type="email" id="email" placeholder="Votre email" required />
          </div>
            <div className="labelinput"><label htmlFor="password">Mot de passe :</label>
            <input type="password" id="password" placeholder="Votre mot de passe" required /></div>
        <button type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  </div>;
}