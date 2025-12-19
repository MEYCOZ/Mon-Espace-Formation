// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Calendar, Clock, MapPin, Download, FileText, CheckCircle, Mail, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // IMPORT AJOUTÉ

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // INITIALISATION

  useEffect(() => {
    // 1. On récupère l'email sauvegardé lors du login
    const userEmail = localStorage.getItem('userEmail');

    // 2. Sécurité : Si pas d'email, on renvoie vers la connexion
    if (!userEmail) {
        navigate('/connexion');
        return;
    }

    // 3. Appel API avec l'email dynamique
    fetch(`http://localhost:8080/api/dashboard/${userEmail}`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => { setData(data); setLoading(false); })
      .catch((err) => { 
          console.error(err); 
          setLoading(false); 
          // Optionnel : si erreur, on peut aussi rediriger ou afficher un message
      });
  }, [navigate]);

  if (loading) return <div className="text-center mt-5">Chargement...</div>;
  if (!data) return <div className="text-center mt-5 text-danger">Erreur de chargement ou utilisateur introuvable.</div>;

  const { user, currentTraining } = data;

  // ... (LE RESTE DE TON RENDU RESTE EXACTEMENT LE MÊME) ...
  return (
    <div className="container py-4">
      
      {/* HEADER BIENVENUE */}
      <div className="p-4 mb-4 rounded-3 text-white d-flex align-items-center gap-3 welcome-header">
        <div className="avatar-circle bg-white text-dark d-flex justify-content-center align-items-center rounded-circle fw-bold fs-4">
            {user.prenom.charAt(0)}{user.nom.charAt(0)}
        </div>
        <div>
            <h1 className="h3 mb-1">Bonjour {user.prenom} {user.nom}</h1>
            <p className="mb-0 opacity-75 small">TechCorp Solutions • Développeuse Web</p>
        </div>
      </div>

      <div className="row g-4">
        
        {/* === COLONNE GAUCHE (Main) === */}
        <div className="col-lg-8">
            
            {/* Alerte */}
            <div className="alert alert-light border d-flex align-items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-secondary"/>
                <span className="small"><strong>Formation à venir :</strong> Votre formation commence dans {currentTraining?.duration || "bientôt"}.</span>
            </div>

            {/* Carte Formation */}
            <div className="card shadow-sm border-light mb-4">
                <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h2 className="h4 mb-1">{currentTraining?.title}</h2>
                            <p className="text-muted small mb-0">{currentTraining?.reference} • {currentTraining?.sessionRef}</p>
                        </div>
                        <span className="badge bg-dark rounded-pill">À Venir</span>
                    </div>

                    <div className="row g-3 mb-4">
                        <div className="col-md-6 d-flex gap-2">
                            <Calendar size={18} className="text-muted"/>
                            <div>
                                <small className="text-muted d-block">Dates</small>
                                <span className="fw-semibold">{currentTraining?.startDate} - {currentTraining?.endDate}</span>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex gap-2">
                            <Clock size={18} className="text-muted"/>
                            <div>
                                <small className="text-muted d-block">Horaires</small>
                                <span className="fw-semibold">9h00 - 17h00</span>
                            </div>
                        </div>
                        <div className="col-12 d-flex gap-2">
                            <MapPin size={18} className="text-muted"/>
                            <div>
                                <small className="text-muted d-block">Lieu</small>
                                <span className="fw-semibold">{currentTraining?.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section Formateur */}
                    <div className="bg-light p-3 rounded d-flex align-items-center gap-3 mb-4">
                        <div className="rounded-circle bg-secondary bg-opacity-25 d-flex justify-content-center align-items-center" style={{width: 40, height: 40}}>JM</div>
                        <div>
                            <p className="mb-0 fw-bold">{currentTraining?.trainerName}</p>
                            <small className="text-muted d-block">{currentTraining?.trainerRole}</small>
                            <a href={`mailto:${currentTraining?.trainerEmail}`} className="small text-decoration-none text-secondary">
                                <Mail size={12} className="me-1"/>{currentTraining?.trainerEmail}
                            </a>
                        </div>
                    </div>

                    {/* Progression */}
                    <div>
                        <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>Progression</span>
                            <span>0 / 5 Jours</span>
                        </div>
                        <div className="progress" style={{height: '8px'}}>
                            <div className="progress-bar bg-success" role="progressbar" style={{width: '0%'}}></div>
                        </div>
                        <div className="d-flex justify-content-between small text-muted mt-1">
                            <span>0h / 35h effectuées</span>
                            <span>Présence : 0%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Liste Ressources */}
            <h5 className="mb-1">Documents et ressources</h5>
            <p className="text-muted small mb-3">Accédez aux supports de cours</p>

            <div className="list-group mb-4">
                <div className="list-group-item list-group-item-action d-flex align-items-center p-3 border-light shadow-sm mb-2 rounded">
                    <div className="p-2 bg-primary bg-opacity-10 text-primary rounded me-3">
                        <FileText size={20}/>
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="mb-0">Programme détaillé</h6>
                        <small className="text-muted">PDF • 2.4 MB</small>
                    </div>
                    <button className="btn btn-sm btn-light border"><Download size={14} className="me-1"/> Télécharger</button>
                </div>
                
                <div className="list-group-item d-flex align-items-center p-3 border-light bg-light rounded opacity-75">
                    <div className="p-2 bg-secondary bg-opacity-10 text-secondary rounded me-3">
                        <FileText size={20}/>
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="mb-0">Support J1</h6>
                        <small className="text-muted">Bientôt disponible</small>
                    </div>
                    <span className="badge bg-secondary bg-opacity-25 text-dark">Indisponible</span>
                </div>
            </div>

        </div>

        {/* === COLONNE DROITE (Sidebar) === */}
        <div className="col-lg-4">
            
            {/* Mes Documents */}
            <div className="card shadow-sm border-light mb-4">
                <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                    <h6 className="fw-bold">Mes documents</h6>
                </div>
                <div className="card-body">
                    {currentTraining?.documents?.map((doc, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                            <div>
                                <small className="d-block fw-bold text-dark">{doc.title}</small>
                                <span className="badge bg-light text-secondary border">{doc.type}</span>
                            </div>
                            <button className="btn btn-link text-secondary p-0"><Download size={18}/></button>
                        </div>
                    ))}
                    {!currentTraining?.documents?.length && <small>Aucun document.</small>}
                </div>
            </div>

            {/* Actions */}
            <div className="card shadow-sm border-light mb-4">
                <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                     <h6 className="fw-bold">Actions Rapides</h6>
                </div>
                <div className="card-body d-grid gap-2">
                    <button className="btn btn-outline-secondary text-start btn-sm"><Calendar size={14} className="me-2"/> Ajouter au calendrier</button>
                    <button className="btn btn-outline-secondary text-start btn-sm"><MapPin size={14} className="me-2"/> Itinéraire</button>
                    <button className="btn btn-outline-secondary text-start btn-sm"><Mail size={14} className="me-2"/> Contacter formateur</button>
                </div>
            </div>

            {/* Stats */}
            <div className="card shadow-sm border-light mb-4">
                <div className="card-body">
                    <h6 className="fw-bold mb-3">Statistiques</h6>
                    <div className="d-flex justify-content-between mb-2 small">
                        <span className="text-muted"><FileText size={14} className="me-2"/> Formations</span>
                        <strong>{data.stats?.formationsSuivies || 0}</strong>
                    </div>
                    <div className="d-flex justify-content-between mb-2 small">
                        <span className="text-muted"><Clock size={14} className="me-2"/> Heures</span>
                        <strong>{data.stats?.heuresFormation || 0}h</strong>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;