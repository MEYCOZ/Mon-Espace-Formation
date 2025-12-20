import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetails from './pages/CourseDetails';
import About from './pages/About';
import Contact from './pages/Contact';

// 👇 1. IMPORT DU DASHBOARD
import Dashboard from './pages/Dashboard'; 

function App() {
  const location = useLocation();
  
  // On détecte si on est sur une page d'authentification
  const isAuthPage = location.pathname === '/connexion' || location.pathname === '/inscription';

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="d-flex flex-column min-vh-100">

      {/* Affiche le Header SEULEMENT si on n'est PAS sur login/register */}
      {/* Note : Le Dashboard aura donc le Header, ce qui est normal */}
      {!isAuthPage && <Header />}

      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<Catalogue />} />
          <Route path="/formations/:id" element={<CourseDetails />} />
          <Route path="/connexion" element={<Login />} />
          <Route path="/inscription" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 👇 2. AJOUT DE LA ROUTE DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </main>

      {/* Affiche le Footer SEULEMENT si on n'est PAS sur login/register */}
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;