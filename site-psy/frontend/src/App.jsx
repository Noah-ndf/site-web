import React from 'react';
import './i18n/i18n';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Bnp from './pages/Bnp';
import Presentation from './pages/presentation';
import Register from './pages/Register';
import Coordonnees from './pages/coordonnees';
import Tarifs from './pages/tarifs';
import Navbar from './components/Navbar';
import MesRendezVous from './pages/MesRendezVous';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mes-rendez-vous" element={<MesRendezVous />} />
        <Route path="/bnp" element={<Bnp />} />
        <Route path="/presentation" element={<Presentation />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/coordonnees" element={<Coordonnees />} />
      </Routes>
      <Footer />
    </>
  );
}
