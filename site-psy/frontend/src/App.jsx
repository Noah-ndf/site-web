import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MesRendezVous from './pages/MesRendezVous';
import PrendreRendezVous from './pages/PrendreRendezVous';
import TousLesRendezVous from './pages/TousLesRendezVous';
import Bnp from './pages/Bnp';
import Presentation from './pages/Presentation';
import Tarifs from './pages/Tarifs';
import Coordonnees from './pages/coordonnees';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute'; // ✅ pour protéger la route psy
import ConfigurerCreneaux from './pages/ConfigurerCreneaux';

function App() {
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
        <Route path="/prendre-rendez-vous" element={<PrendreRendezVous />} />
        <Route
          path="/tous-les-rendez-vous"
          element={
            <PrivateRoute requiredRole="psychologue">
              <TousLesRendezVous />
            </PrivateRoute>
          }
        />
        <Route
          path="/configurer-creneaux"
          element={
            <PrivateRoute requiredRole="psychologue">
              <ConfigurerCreneaux />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App; // ✅ important pour éviter l'erreur que tu avais
