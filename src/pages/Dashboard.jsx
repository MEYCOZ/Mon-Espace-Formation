import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Calendar, Clock, MapPin, Download, FileText, CheckCircle, Mail, AlertCircle, Phone } from 'lucide-react';

// 👇 TENTATIVE D'IMPORT DU THÈME
// Si ton fichier est ailleurs, change juste le chemin ici (ex: '../styles/theme')
let theme = {};
try {
  theme = require('../theme').default || require('../theme');
} catch (e) {
  console.warn("Theme.js non trouvé, utilisation du style par défaut.");
}

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- 1. RÉCUPÉRATION DES DONNÉES (BACKEND JAVA) ---
  useEffect(() => {
    // On utilise l'email de test (ou celui stocké dans le localStorage si tu as une vraie connexion)
    const userEmail = "mzenati829@gmail.com"; 

    fetch(`http://localhost:8080/api/dashboard/${userEmail}`)
      .then((response) => {
        if (!response.ok) throw new Error('Erreur réseau');
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur backend:", err);
        setError("Impossible de charger vos données.");
        setLoading(false);
      });
  }, []);

  // --- 2. GESTION DES ÉTATS DE CHARGEMENT ---
  if (loading) return <div className="loading-screen">Chargement de votre espace...</div>;
  if (error) return <div className="error-screen">{error}</div>;
  if (!data) return null;

  const { user, currentTraining } = data;

  // --- 3. STYLE DYNAMIQUE (THEME OU DÉFAUT) ---
  // On utilise tes couleurs si elles existent, sinon on met le Gris Foncé de ton image
  const headerStyle = {
    backgroundColor: theme?.colors?.primary || theme?.palette?.primary?.main || '#2d3748', 
    color: '#ffffff'
  };

  return (
    <div className="dashboard-container">
      
      {/* === EN-TÊTE (Header) === */}
      <div className="welcome-section" style={headerStyle}>
        <div className="avatar-circle">
          {user.prenom.charAt(0)}{user.nom.charAt(0)}
        </div>
        <div className="welcome-text">
          <h1>Bonjour {user.prenom} {user.nom}</h1>
          <p className="subtitle">TechCorp Solutions • Développeuse Web</p>
        </div>
      </div>

      <div className="dashboard-grid">
        
        {/* === COLONNE GAUCHE (Formation) === */}
        <div className="main-content">
            
            {/* Alerte Info */}
            <div className="info-alert">
                <AlertCircle className="alert-icon" size={20} />
                <span>
                    <strong>Formation à venir</strong> : Votre formation commence dans {currentTraining?.duration ? "quelques jours" : "bientôt"}.
                </span>
            </div>

            {/* Carte Formation */}
            <div className="card training-card">
                <div className="card-header">
                    <div>
                        <h2>{currentTraining?.title || "Formation"}</h2>
                        <p className="ref-text">
                            {currentTraining?.reference || "REF-000"} • {currentTraining?.sessionRef || "SESSION-000"}
                        </p>
                    </div>
                    <span className="badge-status">À Venir</span>
                </div>

                <div className="training-details-grid">
                    <div className="detail-item">
                        <Calendar className="icon" size={18} />
                        <div>
                            <span className="label">Dates de formation</span>
                            <p>{currentTraining?.startDate} - {currentTraining?.endDate}</p>
                        </div>
                    </div>
                    <div className="detail-item">
                        <Clock className="icon" size={18} />
                        <div>
                            <span className="label">Horaires</span>
                            <p>9h00 - 17h00</p> 
                        </div>
                    </div>
                    <div className="detail-item full-width">
                        <MapPin className="icon" size={18} />
                        <div>
                            <span className="label">Lieu</span>
                            <p>{currentTraining?.location || "Lieu non défini"}</p>
                        </div>
                    </div>
                </div>

                {/* Formateur */}
                <div className="trainer-section">
                    <div className="trainer-avatar">JM</div>
                    <div className="trainer-info">
                        <span className="label">Votre formateur</span>
                        <p className="trainer-name">{currentTraining?.trainerName || "Non assigné"}</p>
                        <p className="trainer-role">{currentTraining?.trainerRole || "Formateur expert"}</p>
                        <a href={`mailto:${currentTraining?.trainerEmail}`} className="trainer-email">
                           <Mail size={14} style={{display:'inline', marginRight:'5px'}}/> 
                           {currentTraining?.trainerEmail || "email@exemple.com"}
                        </a>
                    </div>
                </div>

                {/* Progression (Fausse donnée pour l'UI car pas en base) */}
                <div className="progress-section">
                    <div className="progress-header">
                        <span>Progression</span>
                        <span>0 / 5 Jours</span>
                    </div>
                    <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{width: '0%'}}></div>
                    </div>
                    <div className="progress-footer">
                        <span>0h / 35h effectuées</span>
                        <span>Taux de présence : 0%</span>
                    </div>
                </div>
            </div>

            {/* Liste des Ressources (Partie Basse) */}
            <div className="tabs-container">
                <button className="tab active">Documents de formation</button>
                <button className="tab">Émargement</button>
                <button className="tab">Attestation</button>
            </div>

            <div className="resources-list">
                <p className="section-title">Documents et ressources</p>
                <p className="section-subtitle">Accédez aux supports de cours et ressources pédagogique</p>

                <div className="resource-item">
                    <div className="file-icon-box"><FileText /></div>
                    <div className="file-info">
                        <h4>Programme détaillé</h4>
                        <p>Plan de formation jour par jour • 2.4 MB</p>
                    </div>
                    <button className="btn-download"><Download size={16} /> Télécharger</button>
                </div>

                <div className="resource-item disabled">
                    <div className="file-icon-box"><FileText /></div>
                    <div className="file-info">
                        <h4>Support de cours - Jour 1</h4>
                        <p>Introduction à React • 5.1 MB</p>
                    </div>
                    <span className="status-pill">Bientôt disponible</span>
                </div>
            </div>
        </div>

        {/* === COLONNE DROITE (Sidebar) === */}
        <div className="sidebar">
            
            {/* Mes Documents Dynamiques */}
            <div className="card sidebar-card">
                <h3>Mes documents</h3>
                <div className="document-list">
                    {currentTraining?.documents && currentTraining.documents.length > 0 ? (
                        currentTraining.documents.map((doc, index) => (
                            <div key={index} className="sidebar-doc-item">
                                <div className="doc-content">
                                    <strong>{doc.title}</strong>
                                    <p>{doc.ref}</p>
                                    <span className="doc-tag">{doc.type}</span>
                                </div>
                                <Download className="doc-download-icon" size={18} />
                            </div>
                        ))
                    ) : (
                        <p className="no-doc">Aucun document disponible.</p>
                    )}
                </div>
            </div>

            {/* Actions Rapides */}
            <div className="card sidebar-card">
                <h3>Actions Rapides</h3>
                <div className="actions-list">
                    <button className="btn-action"><Calendar size={16}/> Ajouter au calendrier</button>
                    <button className="btn-action"><MapPin size={16}/> Itinéraire vers le lieu</button>
                    <button className="btn-action"><Mail size={16}/> Contacter le formateur</button>
                </div>
            </div>

            {/* Statistiques */}
            <div className="card sidebar-card">
                <h3>Mes statistiques</h3>
                <div className="stats-list">
                    <div className="stat-row">
                        <span><FileText size={16}/> Formations suivies</span>
                        <strong>0</strong>
                    </div>
                    <div className="stat-row">
                        <span><Clock size={16}/> Heures de formation</span>
                        <strong>0h</strong>
                    </div>
                    <div className="stat-row">
                        <span><CheckCircle size={16}/> Attestations</span>
                        <strong>0</strong>
                    </div>
                </div>
            </div>

            {/* Besoin d'aide */}
            <div className="help-box">
                <h3>Besoin d'aide ?</h3>
                <p className="help-label">Email</p>
                <a href="mailto:contact@txlforma.fr" className="help-link">contact@txlforma.fr</a>
                
                <p className="help-label">Téléphone</p>
                <p className="help-phone">+33 1 23 45 67 89</p>
                <div className="help-separator"></div>
                <p className="help-note">Du lundi au vendredi de 9h à 18h</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;