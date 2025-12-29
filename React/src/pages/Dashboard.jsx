import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { Calendar, Clock, MapPin, Download, FileText, CheckCircle, Mail, AlertCircle, BookOpen } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Nouvel état pour l'animation de la barre de progression
  const [progressWidth, setProgressWidth] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) { navigate('/connexion'); return; }

    fetch(`http://localhost:8080/api/dashboard/${userEmail}`)
      .then((res) => res.ok ? res.json() : Promise.reject(res))
      .then((data) => { 
          setData(data);
          setLoading(false);
          
          // Petit délai pour lancer l'animation de la barre APRES l'affichage
          setTimeout(() => {
              // Calcul théorique : (heures faites / heures totales) * 100
              // Ici on simule une progression ou on utilise les données si dispo
              setProgressWidth(35); // Exemple : 35%
          }, 500);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [navigate]);

  if (loading) return <div className="loading-container"><div className="spinner"></div></div>;
  if (!data) return null;

  const { user, currentTraining, stats } = data;
  const hasTraining = currentTraining !== null;

  return (
    <div className="dashboard-wrapper">
      
      {/* HEADER BLEU (Animation délai 1) */}
      <div className="dashboard-header animate-enter delay-1">
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

      <div className="container">
        
        {/* ALERTE (Si formation) - Animation délai 2 */}
        {hasTraining && (
            <div className="card-custom p-3 mb-4 d-flex align-items-center gap-3 animate-enter delay-2" style={{background: '#fffbeb', border: '1px solid #fcd34d', color: '#92400e'}}>
                <AlertCircle size={20} />
                <div>
                    <strong>Formation à venir</strong>
                    <div className="small">Votre formation commence dans 60 jours (15 Janvier 2025).</div>
                </div>
            </div>
        )}

        <div className="row g-4">
            
            {/* === COLONNE GAUCHE (Animation délai 3) === */}
            <div className="col-lg-8 animate-enter delay-3">

                {/* CARTE PRINCIPALE */}
                <div className="card-custom mb-5">
                    <div className="card-header-blue">
                        <div>
                            <h2>{hasTraining ? "Développement Front-End avec React" : "Espace Formation"}</h2>
                            <span className="ref-text">{hasTraining ? "Form-DEV-001 • INS-2024-001234" : "Dossier Apprenant"}</span>
                        </div>
                        <span className="badge-gold">{hasTraining ? "À Venir" : "Aucune session"}</span>
                    </div>

                    <div className="card-body">
                        {hasTraining ? (
                            <>
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="d-flex gap-3 mb-3">
                                            <Calendar className="text-muted" size={20}/>
                                            <div>
                                                <div className="small text-muted fw-bold">Dates de formation</div>
                                                <div className="fw-semibold">15 Janvier 2025 - 19 Janvier 2025</div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-3 mb-3">
                                            <Clock className="text-muted" size={20}/>
                                            <div>
                                                <div className="small text-muted fw-bold">Horaires</div>
                                                <div className="fw-semibold">9h00 - 17h00</div>
                                            </div>
                                        </div>
                                        <div className="d-flex gap-3">
                                            <MapPin className="text-muted" size={20}/>
                                            <div>
                                                <div className="small text-muted fw-bold">Lieu</div>
                                                <div className="fw-semibold">42 Avenue des Champs-Élysées, 75008 Paris</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="text-center p-4 border rounded bg-white shadow-sm" style={{border: '1px solid #fbbf24'}}>
                                            <div className="small text-muted mb-1">Formation dans</div>
                                            <div className="display-4 fw-bold text-primary">60</div>
                                            <div className="fw-bold text-primary">Jours</div>
                                            <hr className="my-2"/>
                                            <div className="small text-muted">Début le 15 Janvier</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Formateur */}
                                <div className="trainer-box">
                                    <div className="trainer-avatar">JM</div>
                                    <div className="flex-grow-1">
                                        <div className="trainer-label">Votre formateur</div>
                                        <h5 className="trainer-name">Jean-Pierre Martin</h5>
                                        <div className="trainer-role">Expert React & TypeScript</div>
                                        <div className="trainer-email">
                                            <Mail size={14}/> jp.martin@txlforma.fr
                                        </div>
                                    </div>
                                </div>

                                {/* Progression Animée */}
                                <div className="progress-section">
                                    <div className="progress-header">
                                        <span>Progression</span>
                                        <span>0 / 5 Jours</span>
                                    </div>
                                    <div className="progress-track">
                                        {/* Utilisation de la variable d'état pour animer la largeur */}
                                        <div className="progress-fill" style={{width: `${progressWidth}%`}}></div>
                                    </div>
                                    <div className="progress-footer">
                                        <span>0h / 35h effectuées</span>
                                        <span>Taux de présence : 0%</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-5">
                                <BookOpen size={48} className="text-muted mb-3 opacity-50"/>
                                <h4 className="fw-bold">Aucune formation en cours</h4>
                                <p className="text-muted mb-4">Inscrivez-vous via le catalogue.</p>
                                <Link to="/formations" className="btn-catalogue">Voir le catalogue</Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* DOCUMENTS (Animation délai 4) */}
                <div className="animate-enter delay-4">
                    <div className="tabs-container">
                        <button className="tab-btn active">
                            <FileText size={16} className="me-2 mb-1"/>Documents de formation
                        </button>
                        <button className="tab-btn">
                            <CheckCircle size={16} className="me-2 mb-1"/>Émargement
                        </button>
                        <button className="tab-btn">
                            <FileText size={16} className="me-2 mb-1"/>Attestation
                        </button>
                    </div>

                    <div className="mb-3">
                        <h5 className="fw-bold" style={{color: '#0f2d5c', fontSize: '1.1rem'}}>Documents et ressources</h5>
                        <p className="text-muted small">Accédez aux supports de cours et ressources pédagogiques</p>
                    </div>

                    <div className="resource-list">
                        <div className="resource-item">
                            <div className="resource-icon blue"><FileText size={24}/></div>
                            <div className="flex-grow-1">
                                <h6 className="mb-0 fw-bold">Programme détaillé</h6>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <span className="badge-pill" style={{background:'#f3f4f6', border:'none'}}>Programme</span>
                                    <small className="text-muted">2.4 MB</small>
                                </div>
                            </div>
                            <button className="btn-download-yellow">
                                <Download size={16}/> Télécharger
                            </button>
                        </div>
                        
                        <div className="resource-item">
                            <div className="resource-icon gray"><FileText size={24}/></div>
                            <div className="flex-grow-1">
                                <h6 className="mb-0 text-muted">Supports de cours - Jour 1</h6>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <span className="badge-pill" style={{background:'#f3f4f6', border:'none'}}>Supports</span>
                                    <small className="text-muted">5.1 MB</small>
                                </div>
                            </div>
                            <span className="badge-soon">Bientôt disponible</span>
                        </div>

                         <div className="resource-item">
                            <div className="resource-icon gray"><FileText size={24}/></div>
                            <div className="flex-grow-1">
                                <h6 className="mb-0 text-muted">Supports de cours - Jour 2</h6>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <span className="badge-pill" style={{background:'#f3f4f6', border:'none'}}>Supports</span>
                                    <small className="text-muted">4.8 MB</small>
                                </div>
                            </div>
                            <span className="badge-soon">Bientôt disponible</span>
                        </div>
                        
                        <div className="resource-item">
                            <div className="resource-icon blue"><FileText size={24}/></div>
                            <div className="flex-grow-1">
                                <h6 className="mb-0 fw-bold">Ressources complémentaires</h6>
                                <div className="d-flex align-items-center gap-2 mt-1">
                                    <span className="badge-pill" style={{background:'#f3f4f6', border:'none'}}>Ressources</span>
                                    <small className="text-muted">1.2 MB</small>
                                </div>
                            </div>
                            <button className="btn-download-yellow">
                                <Download size={16}/> Télécharger
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* === COLONNE DROITE / SIDEBAR (Animation délai 4) === */}
            <div className="col-lg-4 animate-enter delay-4">
                
                <div className="card-custom mb-4">
                    <div className="card-body">
                        <h5 className="sidebar-title border-bottom pb-2 mb-3">Mes documents</h5>
                        {hasTraining ? (
                            <div className="doc-list">
                                <div className="doc-item">
                                    <h6 className="fw-bold">Facture acquittée</h6>
                                    <small className="text-muted d-block mb-2">FAC-2024-001234</small>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge-pill gray">Facture</span>
                                        <button className="btn btn-link text-decoration-none text-muted p-0"><Download size={16}/> PDF</button>
                                    </div>
                                </div>
                                <div className="doc-item mt-3 pt-3 border-top">
                                    <h6 className="fw-bold">Convention de formation</h6>
                                    <small className="text-muted d-block mb-2">À signer et retourner</small>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="badge-pill" style={{background:'#fee2e2', color:'#b91c1c', border:'none'}}>À retourner</span>
                                        <button className="btn btn-link text-decoration-none text-muted p-0"><Download size={16}/> PDF</button>
                                    </div>
                                </div>
                            </div>
                        ) : <p className="small text-muted">Aucun document.</p>}
                    </div>
                </div>

                <div className="card-custom mb-4 p-0 overflow-hidden">
                    <div className="sidebar-header-dark">Actions Rapides</div>
                    <div className="card-body d-grid gap-2">
                        {hasTraining ? (
                            <>
                                <button className="btn-action"><Calendar size={18}/> Ajouter au calendrier</button>
                                <button className="btn-action"><MapPin size={18}/> Itinéraire</button>
                                <button className="btn-action"><Mail size={18}/> Contacter formateur</button>
                            </>
                        ) : (
                             <Link to="/formations" className="btn-action justify-content-center text-decoration-none">
                                <BookOpen size={18}/> Consulter le catalogue
                            </Link>
                        )}
                    </div>
                </div>

                <div className="card-custom mb-4">
                    <div className="card-body">
                        <h5 className="sidebar-title mb-3">Mes statistiques</h5>
                        <div className="d-flex justify-content-between py-2 border-bottom border-light">
                            <span className="small text-muted">Formations suivies</span>
                            <strong>{stats ? stats.formationsSuivies : 0}</strong>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                            <span className="small text-muted">Heures de formation</span>
                            <strong>{stats ? stats.heuresFormation : 0}h</strong>
                        </div>
                    </div>
                </div>

                 <div className="help-box">
                    <h5 className="mb-3 text-warning-dark border-bottom border-warning pb-2 d-inline-block">Besoin d'aide ?</h5>
                    <div className="mb-3">
                        <div className="help-label">Email</div>
                        <a href="mailto:contact@txlforma.fr" className="help-link">contact@txlforma.fr</a>
                    </div>
                    <div>
                        <div className="help-label">Téléphone</div>
                        <div className="help-link">+33 1 23 45 67 89</div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;