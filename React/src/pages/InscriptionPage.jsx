import React, { useState, useEffect } from 'react';
import './Inscription.css';
import { 
    ChevronLeft, Calendar, MapPin, Users, ArrowRight, Check, AlertCircle, 
    User, BookOpen, CreditCard, ShieldCheck 
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const InscriptionPage = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // --- ÉTATS ---
  const [step, setStep] = useState(1);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
      typeInscription: 'individuel',
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      cp: '',
      ville: '',
      entreprise: '', // Optionnel
      poste: ''       // Optionnel
  });

  // --- 1. CHARGEMENT DES SESSIONS ---
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8080/api/sessions')
        .then(res => res.json())
        .then(data => {
            console.log("Sessions chargées :", data);
            setSessions(data);
            setIsLoading(false);
        })
        .catch(err => {
            console.error("Erreur chargement sessions", err);
            setIsLoading(false);
        });
  }, []);

  // --- GESTION DES INPUTS ---
  const handleInputChange = (e) => {
      const { name, value, type } = e.target;
      setFormData(prev => ({
          ...prev,
          [name]: type === 'radio' ? (e.target.checked ? value : prev[name]) : value
      }));
  };

  // --- 2. LOGIQUE DE PAIEMENT & INSCRIPTION ---
  const handlePayment = async () => {
    if (!selectedSession) return;

    // Construction de l'objet à envoyer au backend
    const dataToSend = {
        userId: 1, // Simulé (ou ID récupéré via contexte Auth)
        formationId: id ? parseInt(id) : 1, 
        sessionId: selectedSession,
        status: "VALIDÉ",
        participant: { ...formData }, // On envoie aussi les infos du formulaire
        amount: 2490
    };

    try {
        const response = await fetch('http://localhost:8080/api/inscriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
            alert("✅ Paiement accepté ! Inscription validée.");
            navigate('/dashboard'); // Ou vers une page de succès
        } else {
            const msg = await response.text();
            alert("❌ Erreur : " + msg);
        }
    } catch (error) {
        console.error("Erreur connexion:", error);
        alert("❌ Impossible de contacter le serveur.");
    }
  };

  // --- ÉTAPE 1 : CHOIX SESSION ---
  const renderStep1 = () => (
    <div className="bg-white p-4 rounded border mb-4">
        <h5 className="mb-3 fw-bold text-dark">Choisissez une session</h5>
        <p className="text-muted mb-4 small">Sélectionnez la session qui vous convient (Places en temps réel)</p>

        {isLoading ? (
            <div className="text-center py-4 text-muted">Chargement des sessions disponibles...</div>
        ) : sessions.length === 0 ? (
            <div className="alert alert-warning">Aucune session disponible pour le moment.</div>
        ) : (
            sessions.map((session) => {
                const placesRestantes = session.placesTotales - session.placesReservees;
                const isFull = placesRestantes <= 0;
                
                let status = "Disponible";
                let color = "green";
                
                if (isFull) { 
                    status = "Complet"; 
                    color = "red"; 
                } else if (placesRestantes <= 2) { 
                    status = "Bientôt Complet"; 
                    color = "yellow"; 
                }

                return (
                    <div 
                        key={session.id}
                        className={`session-card ${selectedSession === session.id ? 'selected' : ''} ${isFull ? 'disabled-card' : ''}`}
                        onClick={() => !isFull && setSelectedSession(session.id)}
                        style={{ 
                            opacity: isFull ? 0.6 : 1, 
                            cursor: isFull ? 'not-allowed' : 'pointer',
                            pointerEvents: isFull ? 'none' : 'auto'
                        }}
                    >
                        <div>
                            <div className="d-flex align-items-center gap-2 mb-2 fw-semibold text-dark">
                                <Calendar size={18} className="text-muted"/> {session.dates}
                            </div>
                            <div className="d-flex gap-4 small text-muted">
                                <span className="d-flex align-items-center gap-1"><MapPin size={14}/> {session.lieu}</span>
                                <span className="d-flex align-items-center gap-1">
                                    <Users size={14}/> 
                                    {isFull ? 
                                        <span className="text-danger fw-bold">Complet</span> : 
                                        <span>{placesRestantes}/{session.placesTotales} places</span>
                                    }
                                </span>
                            </div>
                        </div>
                        <span className={`session-badge badge-${color}`}>
                            {selectedSession === session.id ? <Check size={14}/> : null} {status}
                        </span>
                    </div>
                );
            })
        )}

        <button 
            className="btn-continue" 
            disabled={!selectedSession}
            onClick={() => setStep(2)}
        >
            Continuer <ArrowRight size={18} />
        </button>
    </div>
  );

  // --- ÉTAPE 2 : FORMULAIRE ---
  const renderStep2 = () => {
    // Validation basique pour activer le bouton
    const isFormValid = formData.nom && formData.prenom && formData.email && formData.telephone;

    return (
        <div className="bg-white p-4 rounded border mb-4">
            <h5 className="form-section-title">Vos informations</h5>
            <p className="form-section-subtitle">Remplissez le formulaire pour finaliser votre inscription</p>

            <div className="mb-4">
                <label className="form-label">Type d'inscription</label>
                <div className="radio-group">
                    <label className="radio-label">
                        <input 
                            type="radio" 
                            name="typeInscription" 
                            value="individuel"
                            checked={formData.typeInscription === 'individuel'}
                            onChange={handleInputChange} 
                        /> Inscription individuelle
                    </label>
                    <label className="radio-label">
                        <input 
                            type="radio" 
                            name="typeInscription" 
                            value="entreprise"
                            checked={formData.typeInscription === 'entreprise'}
                            onChange={handleInputChange} 
                        /> Inscription entreprise
                    </label>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Nom *</label>
                    <input 
                        type="text" name="nom" className="form-control-custom" 
                        placeholder="Votre nom" value={formData.nom} onChange={handleInputChange} required 
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Prénom *</label>
                    <input 
                        type="text" name="prenom" className="form-control-custom" 
                        placeholder="Votre prénom" value={formData.prenom} onChange={handleInputChange} required 
                    />
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input 
                        type="email" name="email" className="form-control-custom" 
                        placeholder="email@exemple.fr" value={formData.email} onChange={handleInputChange} required 
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Téléphone *</label>
                    <input 
                        type="tel" name="telephone" className="form-control-custom" 
                        placeholder="06 12 34 56 78" value={formData.telephone} onChange={handleInputChange} required 
                    />
                </div>
            </div>

            {formData.typeInscription === 'entreprise' && (
                <div className="row mb-3">
                     <div className="col-md-6">
                        <label className="form-label">Nom de l'entreprise</label>
                        <input type="text" name="entreprise" className="form-control-custom" value={formData.entreprise} onChange={handleInputChange} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Poste occupé</label>
                        <input type="text" name="poste" className="form-control-custom" value={formData.poste} onChange={handleInputChange} />
                    </div>
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">Adresse</label>
                <input 
                    type="text" name="adresse" className="form-control-custom" 
                    placeholder="Numéro et rue" value={formData.adresse} onChange={handleInputChange} 
                />
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Code Postal</label>
                    <input 
                        type="text" name="cp" className="form-control-custom" 
                        placeholder="75000" value={formData.cp} onChange={handleInputChange} 
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Ville</label>
                    <input 
                        type="text" name="ville" className="form-control-custom" 
                        placeholder="Paris" value={formData.ville} onChange={handleInputChange} 
                    />
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn-back" onClick={() => setStep(1)}><ChevronLeft size={16} /> Annuler</button>
                <button 
                    className="btn-continue w-auto px-5" 
                    disabled={!isFormValid}
                    onClick={() => setStep(3)}
                >
                    Continuer <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
  };

  // --- ÉTAPE 3 : RÉCAPITULATIF & PAIEMENT ---
  const renderStep3 = () => {
    // Récupérer la session sélectionnée pour l'affichage
    const sessionDetails = sessions.find(s => s.id === selectedSession);

    return (
        <div className="bg-white p-4 rounded border mb-4">
            <h5 className="form-section-title">Récapitulatif de votre inscription</h5>
            <p className="form-section-subtitle">Vérifiez vos informations avant de procéder au paiement</p>

            {/* Info Participant Dynamique */}
            <div className="recap-section-title"><User size={18}/> Informations du participant</div>
            <div className="recap-box">
                <div className="recap-row"><strong>Nom :</strong> {formData.nom.toUpperCase()} {formData.prenom}</div>
                <div className="recap-row"><strong>Email :</strong> {formData.email}</div>
                <div className="recap-row"><strong>Téléphone :</strong> {formData.telephone}</div>
                <div className="recap-row"><strong>Adresse :</strong> {formData.adresse ? `${formData.adresse}, ${formData.cp} ${formData.ville}` : 'Non renseignée'}</div>
                
                {formData.typeInscription === 'entreprise' && (
                    <>
                        <hr style={{margin: '10px 0', opacity: 0.2}}/>
                        <div className="recap-row"><strong>Entreprise :</strong> {formData.entreprise}</div>
                        <div className="recap-row"><strong>Poste :</strong> {formData.poste}</div>
                    </>
                )}
            </div>

            {/* Info Session Dynamique */}
            <div className="recap-section-title"><Calendar size={18}/> Session sélectionnée</div>
            <div className="recap-box">
                {sessionDetails ? (
                    <>
                        <div className="recap-row"><strong>Date :</strong> {sessionDetails.dates}</div>
                        <div className="recap-row"><strong>Lieu :</strong> {sessionDetails.lieu}</div>
                        <div className="recap-row"><strong>Durée :</strong> 5 Jours (35h)</div>
                    </>
                ) : <div className="text-danger">Erreur : Session introuvable</div>}
            </div>

            <div className="recap-section-title"><BookOpen size={18}/> Détails de la formation</div>
            <div className="recap-box">
                <div className="recap-row"><strong>Formation :</strong> Développement Front-End avec React et TypeScript</div>
                <div className="recap-row"><strong>Référence :</strong> FORM-DEV-001</div>
                <div className="recap-row"><strong>Niveau :</strong> Intermédiaire</div>
            </div>

            <div className="alert-box">
                <AlertCircle size={24} className="flex-shrink-0" />
                <div>
                    <strong>Important :</strong><br/>
                    Le paiement intégral est obligatoire pour valider votre inscription.
                </div>
            </div>

            <div className="payment-block">
                <div className="payment-title"><CreditCard size={20}/> Paiement sécurisé</div>
                <p className="payment-subtitle">Procédez au paiement via Stripe pour finaliser votre inscription</p>

                <div className="stripe-badge">
                    <ShieldCheck size={16}/> Paiement 100% sécurisé par Stripe
                </div>

                <button className="btn-pay" onClick={handlePayment}>
                    Payer 2490€ avec Stripe
                </button>

                <button className="btn-modify-outline" onClick={() => setStep(2)}>
                    <ChevronLeft size={14}/> Modifier mes informations
                </button>
            </div>
        </div>
    );
  };

  return (
    <div className="inscription-wrapper">
      <div className="inscription-header">
        <div className="container">
          <Link to="/formations" className="back-link">
            <ChevronLeft size={16} /> Retour aux détails de la formation
          </Link>
          <h1 className="inscription-title">Inscription à la formation</h1>
          <p className="inscription-subtitle">Développement Front-End avec React et TypeScript</p>
        </div>
      </div>

      <div className="steps-bar">
        <div className="steps-container">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
                <span className="step-number">1</span> Choix de la session
            </div>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
                <span className="step-number">2</span> Informations
            </div>
            <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
                <span className="step-number">3</span> Récapitulatif & Paiement
            </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
            <div className="col-lg-8">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>

            <div className="col-lg-4">
                <div className="summary-card">
                    <div className="summary-header">Résumé</div>
                    <div className="summary-body">
                        <div className="small text-primary fw-bold mb-1">Formation</div>
                        <div className="fw-semibold mb-4">Développement Front-End avec React et TypeScript</div>
                        
                        <div className="price-row">
                            <span>Tarif</span>
                            <span className="fw-bold">2490€</span>
                        </div>
                        <div className="price-row">
                            <span>TVA (20%)</span>
                            <span className="fw-bold">498.00€</span>
                        </div>
                        <div className="total-row">
                            <span>Total TTC</span>
                            <span>2988€</span>
                        </div>
                    </div>
                </div>

                <div className="card-custom p-4 mb-4">
                    <h6 className="fw-bold mb-3 text-secondary">Inclus dans votre formation</h6>
                    <ul className="feature-list">
                        <li className="feature-item"><Check size={18} className="text-dark"/> <div><strong>PC portable fourni</strong></div></li>
                        <li className="feature-item"><Check size={18} className="text-dark"/> <div><strong>Support de cours</strong></div></li>
                        <li className="feature-item"><Check size={18} className="text-dark"/> <div><strong>Attestation</strong></div></li>
                        <li className="feature-item"><Check size={18} className="text-dark"/> <div><strong>Repas du midi inclus</strong></div></li>
                    </ul>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InscriptionPage;