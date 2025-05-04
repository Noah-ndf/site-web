import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <img src="./../../public/pink-logo.png" alt="" />
        <Link to="/">Accueil</Link> 
        <Link to="/presentation">Présentation</Link> 
        <Link to="/tarifs">Mes tarifs</Link>
        <Link to="/bnp">Mon livre et podcast</Link>
        <Link to="/coordonnees">Mes coordonnées</Link>
        </div>
        <Link className="login" to="/login">Connexion</Link>
    </nav>
  );
}

