import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
    CheckCircle, Calendar, Clock, MapPin, User, CreditCard, 
    Download, ArrowRight, Home, Printer, Mail, Bell, FileText 
} from 'lucide-react';

const RegistrationSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // On récupère les infos envoyées depuis la page de paiement
    const { course, user, reference } = location.state || {};

    // Si quelqu'un essaie d'accéder à cette page sans s'inscrire, on le renvoie à l'accueil
    useEffect(() => {
        if (!course || !user) {
            navigate('/formations');
        }
    }, [course, user, navigate]);

    if (!course || !user) return null;

    // Date du jour pour la transaction
    const today = new Date().toLocaleDateString('fr-FR');
    const userEmail = user.email || "email@exemple.com";

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', fontFamily: 'sans-serif' }}>
            
            {/* --- HEADER VERT --- */}
            <div style={{ backgroundColor: '#10b981', color: 'white', padding: '60px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{ background: 'white', borderRadius: '50%', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                        <CheckCircle size={32} color="#10b981" strokeWidth={3} />
                    </div>
                    <h1 className="fw-bold mb-3">Inscription confirmée !</h1>
                    <p className="lead opacity-75 mb-4">Votre paiement a été accepté et votre place est désormais réservée.</p>
                    
                    <div className="d-inline-block px-4 py-2 rounded" style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)' }}>
                        <small className="text-uppercase opacity-75" style={{ fontSize: '0.8rem' }}>Numéro d'inscription</small>
                        <div className="fw-bold fs-5">{reference || "INS-2024-001234"}</div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '-40px' }}>
                {/* Alerte Email */}
                <div className="alert bg-white border-0 shadow-sm d-flex align-items-center gap-3 p-4 mb-4 rounded-3">
                    <Mail className="text-primary" />
                    <div>
                        Un email de confirmation a été envoyé à <strong>{userEmail}</strong><br/>
                        <span className="text-muted small">avec tous les détails de votre inscription et vos documents.</span>
                    </div>
                </div>

                <div className="row g-4">
                    {/* === COLONNE GAUCHE : DÉTAILS === */}
                    <div className="col-lg-8">
                        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                            <h5 className="fw-bold mb-4 border-bottom pb-3">Détails de votre inscription</h5>

                            {/* Formation */}
                            <div className="mb-4 bg-light p-3 rounded">
                                <h6 className="fw-bold text-primary mb-2">{course.title}</h6>
                                <div className="d-flex gap-2 mb-2">
                                    <span className="badge bg-secondary text-white">{course.category || "Formation"}</span>
                                    <span className="badge bg-secondary text-white">{course.duration || "5 jours"}</span>
                                </div>
                                <small className="text-muted">Référence : {course.id ? course.id.substring(0,8).toUpperCase() : "REF-001"}</small>
                            </div>

                            {/* Session */}
                            <div className="mb-4">
                                <h6 className="fw-bold mb-3"><Calendar size={18} className="me-2 text-muted"/> Votre session</h6>
                                <div className="row g-3 text-muted small">
                                    <div className="col-md-6 d-flex gap-2">
                                        <Calendar size={16} className="mt-1"/>
                                        <div>
                                            <strong className="d-block text-dark">Dates</strong>
                                            {course.dates || "Dates à venir"}
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex gap-2">
                                        <Clock size={16} className="mt-1"/>
                                        <div>
                                            <strong className="d-block text-dark">Horaires</strong>
                                            9h00 - 17h00
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex gap-2">
                                        <MapPin size={16} className="mt-1"/>
                                        <div>
                                            <strong className="d-block text-dark">Lieu</strong>
                                            {course.lieu || "42 Avenue des Champs-Elysées, 75008 Paris"}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Participant */}
                            <div className="mb-4 border-top pt-4">
                                <h6 className="fw-bold mb-3"><User size={18} className="me-2 text-muted"/> Participant</h6>
                                <ul className="list-unstyled text-muted small mb-0">
                                    <li className="mb-1"><strong>Nom :</strong> {user.prenom} {user.nom}</li>
                                    <li className="mb-1"><strong>Email :</strong> {userEmail}</li>
                                    <li><strong>Entreprise :</strong> {user.entreprise || "Non renseignée"}</li>
                                </ul>
                            </div>

                            {/* Paiement */}
                            <div className="border rounded p-3" style={{ backgroundColor: '#f0fdf4', borderColor: '#bbf7d0' }}>
                                <div className="d-flex align-items-center gap-2 text-success fw-bold mb-2">
                                    <CheckCircle size={16} /> Paiement validé
                                </div>
                                <div className="row small text-muted">
                                    <div className="col-6 mb-1">Montant payé :</div>
                                    <div className="col-6 mb-1 fw-bold text-dark">{course.price} TTC</div>
                                    <div className="col-6">Date :</div>
                                    <div className="col-6 fw-bold text-dark">{today}</div>
                                </div>
                            </div>
                        </div>

                        {/* Prochaines étapes */}
                        <div className="bg-white rounded-3 shadow-sm p-4">
                            <h5 className="fw-bold mb-4">Prochaines étapes</h5>
                            <div className="d-flex gap-3 mb-4">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width:'40px', height:'40px'}}>
                                    <Mail size={20} className="text-primary"/>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">1. Email de confirmation</h6>
                                    <p className="text-muted small mb-0">Vous allez recevoir un email avec votre convocation.</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mb-4">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width:'40px', height:'40px'}}>
                                    <FileText size={20} className="text-warning"/>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">2. Accédez à votre espace</h6>
                                    <p className="text-muted small mb-0">Retrouvez le programme et les supports sur votre dashboard.</p>
                                </div>
                            </div>
                            <div className="d-flex gap-3">
                                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{width:'40px', height:'40px'}}>
                                    <Bell size={20} className="text-success"/>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">3. Le jour J</h6>
                                    <p className="text-muted small mb-0">Présentez-vous à 8h45 pour l'accueil café.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* === COLONNE DROITE : SIDEBAR === */}
                    <div className="col-lg-4">
                        {/* Actions */}
                        <div className="bg-white rounded-3 shadow-sm p-4 mb-4 border-top border-4 border-primary">
                            <h6 className="fw-bold mb-3">Actions rapides</h6>
                            <div className="d-grid gap-2">
                                <button onClick={() => navigate('/dashboard')} className="btn btn-warning fw-bold text-dark d-flex align-items-center justify-content-center gap-2">
                                    <User size={18}/> Accéder à Mon Espace
                                </button>
                                <button onClick={() => navigate('/formations')} className="btn btn-outline-secondary d-flex align-items-center justify-content-center gap-2">
                                    <Home size={18}/> Retour à l'accueil
                                </button>
                            </div>
                        </div>

                        {/* Documents */}
                        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
                            <h6 className="fw-bold mb-3">Documents disponibles</h6>
                            <div className="d-flex align-items-center justify-content-between p-2 border rounded mb-2">
                                <div className="d-flex align-items-center gap-2">
                                    <Download size={18} className="text-primary"/>
                                    <div className="small lh-1">
                                        <div className="fw-bold">Facture acquittée</div>
                                        <span className="text-muted" style={{fontSize:'0.7rem'}}>PDF • 1.2 Mo</span>
                                    </div>
                                </div>
                                <span className="badge bg-light text-dark border">PDF</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between p-2 border rounded">
                                <div className="d-flex align-items-center gap-2">
                                    <Download size={18} className="text-primary"/>
                                    <div className="small lh-1">
                                        <div className="fw-bold">Convocation</div>
                                        <span className="text-muted" style={{fontSize:'0.7rem'}}>PDF • 800 Ko</span>
                                    </div>
                                </div>
                                <span className="badge bg-light text-dark border">PDF</span>
                            </div>
                        </div>

                        {/* Aide */}
                        <div className="bg-warning bg-opacity-10 rounded-3 p-4 border border-warning">
                            <h6 className="fw-bold text-dark mb-2">Besoin d'aide ?</h6>
                            <p className="small text-muted mb-3">Une question sur votre inscription ?</p>
                            <div className="small">
                                <div className="mb-1">📧 contact@txlforma.fr</div>
                                <div>📞 01 23 45 67 89</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSuccess;