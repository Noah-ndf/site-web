import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link> 
      <Link to="/login">Connexion</Link> 
      <Link to="/register">Inscription</Link>
    </nav>
  );
}
