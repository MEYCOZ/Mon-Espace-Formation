import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetails from './pages/CourseDetails';

function App() {
  const location = useLocation();
  // On détecte si on est sur une page d'authentification
  const isAuthPage = location.pathname === '/connexion' || location.pathname === '/inscription';

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Affiche le Header SEULEMENT si on n'est PAS sur login/register */}
      {!isAuthPage && <Header />}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<Catalogue />} />
          <Route path="/formations/:id" element={<CourseDetails />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
        </Routes>
      </main>

      {/* Affiche le Footer SEULEMENT si on n'est PAS sur login/register */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;