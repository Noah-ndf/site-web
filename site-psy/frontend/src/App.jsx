import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

// 📦 Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const MesRendezVous = lazy(() => import('./pages/MesRendezVous'));
const PrendreRendezVous = lazy(() => import('./pages/PrendreRendezVous'));
const TousLesRendezVous = lazy(() => import('./pages/TousLesRendezVous'));
const Bnp = lazy(() => import('./pages/Bnp'));
const Presentation = lazy(() => import('./pages/Presentation'));
const Tarifs = lazy(() => import('./pages/Tarifs'));
const Coordonnees = lazy(() => import('./pages/coordonnees'));
const ConfigurerCreneaux = lazy(() => import('./pages/ConfigurerCreneaux'));
const TousMesCreneaux = lazy(() => import('./pages/TousMesCreneaux'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Suspense fallback={<Loader />}>
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
          <Route path="*" element={<NotFound />} />

          {/* 🔐 Routes protégées */}
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
          <Route
            path="/mes-creneaux"
            element={
              <PrivateRoute requiredRole="psychologue">
                <TousMesCreneaux />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </AuthProvider>
  );
}

export default App;
