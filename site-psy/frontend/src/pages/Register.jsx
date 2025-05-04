import React from 'react';
import './../styles/register.css';
import { Link } from 'react-router-dom';

export default function Register() {
  return <div className='rcontainer'>
    <div className="rbloc1">
    <div className="rbloc1-2">
        <form className="rlogin-form">
          <h2>Inscription</h2>

          <div className="rlabelinput">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" placeholder="Votre nom" required />
          </div>
          <div className="rlabelinput">
            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" placeholder="Votre prénom" required />
          </div>
          <div className="rlabelinput">
            <label htmlFor="email">Adresse e-mail</label>
            <input type="email" id="email" placeholder="Votre email" required />
          </div>
          <div className="rlabelinput">
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder="Votre mot de passe" required />
          </div>
          <div className="rlabelinput">
            <label htmlFor="telephone">Téléphone</label>
            <input type="tel" id="telephone" placeholder="Votre numéro de téléphone" required />
          </div>
          <button type="submit">S'inscrire</button>
        </form>
      </div>
      <div className="rbloc1-1">
        <img src="./../../public/logo-white-background.png" alt="" />
        <h1>Bienvenue !</h1>
        <h2>Veuillez renseigner vos informations personnelles pour pouvoir acceder à la prise de rendez-vous</h2>
        <p>Déjà client ? Connectez-vous <Link to="/login">ici.</Link> </p>
      </div>
    </div>
  </div>;
}