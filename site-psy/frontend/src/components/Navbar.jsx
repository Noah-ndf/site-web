import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="links">
        <img src="./../../public/pink-logo.png" alt="" />
        <Link to="/">Accueil</Link> 
        <Link to="/login">Connexion</Link> 
        <Link to="/register">Inscription</Link>
        </div>
        <Link className="login" to="/login">Connexion</Link>
    </nav>
  );
}

