import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Calendar, Clock, MapPin, Download, FileText, CheckCircle, Mail, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) { navigate('/connexion'); return; }

    fetch(`http://localhost:8080/api/dashboard/${userEmail}`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => { 
          setData(data);
          setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [navigate]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!data) return null;

  const { user, currentTraining, stats } = data;
  const hasTraining = currentTraining !== null;

  return (
    <div className="dashboard-wrapper">
      
      {/* HEADER : IDENTIQUE À LA MAQUETTE */}
      <div className="dashboard-header">
        <div className="container d-flex align-items-center gap-3">
            <div className="avatar-circle">
                {user.prenom.charAt(0).toUpperCase()}{user.nom.charAt(0).toUpperCase()}
            </div>
            <div>
                <h1>Bonjour {user.prenom} {user.nom}</h1>
                <p className="subtitle">TechCorp Solutions • Développeuse Web</p>
            </div>
        </div>
      </div>

      <div className="container py-4 move-up">
        
        {/* MESSAGE D'INFORMATION (Si formation) */}
        {hasTraining && (
            <div className="card-custom p-3 mb-4 d-flex align-items-center gap-3" style={{background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e'}}>
                <AlertCircle size={20} />
                <div>
                    <strong>Formation à venir</strong>
                    <div className="small">Votre formation commence dans 60 jours (15 Janvier 2025)</div>
                </div>
            </div>
        )}

        <div className="row g-4">
            
            {/* === COLONNE GAUCHE === */}
            <div className="col-lg-8">

                {/* CARTE PRINCIPALE (Même structure Vide ou Plein) */}
                <div className="card-custom">
                    
                    {/* EN-TÊTE BLEU : Toujours présent ! */}
                    <div className="card-header-blue">
                        <div>
                            {/* Si vide, on met un titre générique. Si plein, le titre de la formation */}
                            <h2>{hasTraining ? currentTraining.title : "Espace Formation"}</h2>
                            <span className="ref-text">
                                {hasTraining ? currentTraining.reference : "Dossier Apprenant"}
                            </span>
                        </div>
                        <span className="badge-gold">
                            {hasTraining ? "À Venir" : "Aucune session"}
                        </span>
                    </div>

                    {/* CORPS BLANC */}
                    <div className="card-body">
                        
                        {hasTraining ? (
                            /* --- CONTENU SI FORMATION --- */
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="d-flex gap-3 mb-3">
                                        <Calendar className="text-muted" size={18}/>
                                        <div>
                                            <div className="small text-muted">Dates de formation</div>
                                            <div className="fw-bold">{currentTraining.startDate} - {currentTraining.endDate}</div>
                                        </div>
                                    </div>
                                    {/* ... Autres détails ... */}
                                </div>
                                <div className="col-md-5">
                                    {/* Compte à rebours */}
                                    <div className="text-center p-3 border rounded bg-light">
                                        <div className="display-4 fw-bold text-primary">60</div>
                                        <div className="small text-muted">Jours restants</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* --- CONTENU SI VIDE (Mais dans la même belle carte) --- */
                            <div className="text-center py-5">
                                <BookOpen size={48} style={{color: '#e5e7eb', marginBottom: '15px'}}/>
                                <h4 className="fw-bold mb-2">Vous n'êtes inscrit à aucune formation</h4>
                                <p className="text-muted mb-4" style={{maxWidth: '400px', margin: '0 auto'}}>
                                    Consultez notre catalogue pour trouver votre prochaine session et développer vos compétences.
                                </p>
                                <Link to="/formations" className="btn-catalogue">
                                    Consulter le catalogue
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* ONGLETS (Cachés si pas de formation pour ne pas polluer) */}
                {hasTraining && (
                    <div className="mt-4">
                        {/* ... Onglets ... */}
                    </div>
                )}
            </div>

            {/* === COLONNE DROITE (SIDEBAR) === */}
            <div className="col-lg-4">
                
                {/* Mes Documents */}
                <div className="card-custom mb-4">
                    <div className="card-body">
                        <h5 className="sidebar-title">Mes documents</h5>
                        
                        {hasTraining && currentTraining.documents ? (
                            <div className="doc-list">
                                {/* ... map documents ... */}
                            </div>
                        ) : (
                            <div className="text-muted small py-2">
                                Aucun document administratif disponible.
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions Rapides (Header Foncé) */}
                <div className="card-custom mb-4 p-0 overflow-hidden">
                    <div className="sidebar-header-dark">
                        Actions rapides
                    </div>
                    <div className="card-body d-grid gap-2">
                        {/* On garde les boutons grisés ou on met le lien catalogue */}
                        <Link to="/formations" className="btn-action justify-content-center">
                            <BookOpen size={16}/> Voir toutes les formations
                        </Link>
                        <button className="btn-action text-muted" disabled>
                            <Calendar size={16}/> Ajouter au calendrier
                        </button>
                    </div>
                </div>

                {/* Mes Statistiques */}
                <div className="card-custom mb-4">
                    <div className="card-body">
                        <h5 className="sidebar-title">Mes statistiques</h5>
                        <div className="d-flex justify-content-between py-2 border-bottom border-light">
                            <span className="small text-muted"><FileText size={14} className="me-2"/> Formations suivies</span>
                            <strong>{stats ? stats.formationsSuivies : 0}</strong>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                            <span className="small text-muted"><Clock size={14} className="me-2"/> Heures de formation</span>
                            <strong>{stats ? stats.heuresFormation : 0}h</strong>
                        </div>
                    </div>
                </div>

                {/* Aide */}
                <div className="help-box">
                    <h5>Besoin d'aide ?</h5>
                    <div className="mb-3">
                        <div className="help-label">Email</div>
                        <a href="mailto:contact@txl.fr" className="help-link">contact@txlforma.fr</a>
                    </div>
                    <div>
                        <div className="help-label">Téléphone</div>
                        <div className="help-link">+33 1 23 45 67 89</div>
                    </div>
                    <div className="small text-muted mt-2 border-top border-warning pt-2" style={{fontSize: '0.7rem'}}>
                        Du lundi au vendredi de 9h à 18h
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;