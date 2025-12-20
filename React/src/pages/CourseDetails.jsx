import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Tab, Nav, Accordion } from 'react-bootstrap';
import {
    FaClock, FaUser, FaCheckCircle, FaCreditCard,
    FaCalendarAlt, FaMapMarkerAlt, FaChalkboardTeacher,
    FaEnvelope, FaExclamationTriangle
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { catalogueData } from '../utils/data';
import { theme } from '../utils/theme';

const CourseDetails = () => {
    const { id } = useParams();
    const course = catalogueData.find(c => c.id === parseInt(id));
    const [activeTab, setActiveTab] = useState('objectifs');

    if (!course) {
        return (
            <Container className="py-5 text-center">
                <h2>Formation non trouvée</h2>
                <Link to="/formations" className="btn btn-primary mt-3">Retour au catalogue</Link>
            </Container>
        );
    }

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <div style={{ fontFamily: theme.fonts.main, backgroundColor: theme.colors.bgLight, minHeight: '100vh' }}>
            {/* Header Section */}
            <section style={{ backgroundColor: theme.colors.primary, color: 'white', padding: '80px 0' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col lg={8}>
                            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                                <Badge bg="warning" text="dark" className="mb-3 px-3 py-2 fw-bold rounded-pill">
                                    {course.category}
                                </Badge>
                                <h1 className="display-5 fw-bold mb-4">{course.title}</h1>
                                <p className="lead mb-4 opacity-75" style={{ maxWidth: '90%' }}>
                                    {course.desc}
                                </p>
                                <div className="d-flex flex-wrap gap-4 text-white-50">
                                    <div className="d-flex align-items-center gap-2">
                                        <FaClock className="text-warning" />
                                        <span>{course.time}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <FaUser className="text-warning" />
                                        <span>{course.level}</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-warning fw-bold">€</span>
                                        <span>{course.price} TTC</span>
                                    </div>
                                </div>
                            </motion.div>
                        </Col>
                        <Col lg={4} className="d-none d-lg-block">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-3 shadow-lg p-1"
                                style={{ height: '250px' }}
                            >
                                {/* Placeholder for Video/Image */}
                                <div className="w-100 h-100 bg-light rounded-2 d-flex align-items-center justify-content-center text-muted">
                                    <span>Aperçu de la formation</span>
                                </div>
                            </motion.div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Container className="py-5" style={{ marginTop: '-40px' }}>
                <Row className="g-4">
                    {/* Main Content */}
                    <Col lg={8}>
                        <div className="bg-white rounded-3 shadow-sm p-4 h-100">
                            <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                                <Nav variant="pills" className="nav-fill mb-4 bg-light rounded-pill p-1 gap-1">
                                    <Nav.Item>
                                        <Nav.Link eventKey="objectifs" className="rounded-pill border-0" style={{ cursor: 'pointer', color: activeTab === 'objectifs' ? 'white' : theme.colors.textDark, backgroundColor: activeTab === 'objectifs' ? theme.colors.primary : 'transparent' }}>
                                            Objectifs
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="programme" className="rounded-pill border-0" style={{ cursor: 'pointer', color: activeTab === 'programme' ? 'white' : theme.colors.textDark, backgroundColor: activeTab === 'programme' ? theme.colors.primary : 'transparent' }}>
                                            Programme
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="prerequis" className="rounded-pill border-0" style={{ cursor: 'pointer', color: activeTab === 'prerequis' ? 'white' : theme.colors.textDark, backgroundColor: activeTab === 'prerequis' ? theme.colors.primary : 'transparent' }}>
                                            Prérequis
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content className="p-2">
                                    <Tab.Pane eventKey="objectifs">
                                        <h3 className="fw-bold mb-4" style={{ color: theme.colors.primary }}>Objectifs de la formation</h3>
                                        <p className="text-muted mb-4">Ce que vous serez capable de faire à l'issue de cette formation</p>

                                        <div className="d-flex flex-column gap-3 mb-5">
                                            {course.objectives?.map((obj, idx) => (
                                                <div key={idx} className="d-flex gap-3 align-items-start">
                                                    <FaCheckCircle className="text-success mt-1 flex-shrink-0" />
                                                    <span>{obj}</span>
                                                </div>
                                            )) || <p>Objectifs détaillés bientôt disponibles.</p>}
                                        </div>

                                        <h4 className="fw-bold mb-3" style={{ color: theme.colors.primary }}>Matériel fourni par TXLFORMA</h4>
                                        <div className="d-flex flex-column gap-2 text-muted small">
                                            <div className="d-flex gap-2 align-items-center">
                                                <FaCheckCircle className="text-warning" /> PC portable avec environnement pré-configuré
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <FaCheckCircle className="text-warning" /> Supports de cours numériques
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <FaCheckCircle className="text-warning" /> Exercices pratiques et corrections
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <FaCheckCircle className="text-warning" /> Accès à une plateforme de ressources en ligne pendant 6 mois
                                            </div>
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="programme">
                                        <div className="mb-4">
                                            <h4 className="fw-bold mb-2" style={{ color: theme.colors.primary }}>Programme détaillé</h4>
                                            <p className="text-muted small">5 modules pour une maîtrise complète du sujet</p>
                                        </div>

                                        {course.program ? (
                                            <div className="d-flex flex-column gap-4">
                                                {course.program.map((module, idx) => (
                                                    <div key={idx} className="border-start border-4 ps-4 position-relative" style={{ borderColor: theme.colors.primary }}>
                                                        <div className="d-flex justify-content-between align-items-baseline mb-2">
                                                            <h5 className="fw-bold mb-0" style={{ color: theme.colors.primary }}>{module.title}</h5>
                                                            <Badge bg="light" text="dark" className="border">{module.time}</Badge>
                                                        </div>
                                                        <ul className="list-unstyled text-muted small mb-0">
                                                            {module.content.map((item, i) => (
                                                                <li key={i} className="mb-1 d-flex gap-2">
                                                                    <span className="text-warning">OpenBook</span> {item}
                                                                </li>
                                                                // Note: Using "OpenBook" icon representation as standard bullet point replacement if needed, 
                                                                // but here simple text alignment is fine. Replaced with custom render below.
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            /* Fallback if program structure not fully defined in data for other courses */
                                            <Accordion defaultActiveKey="0" flush>
                                                {/* Static fallback or simplified view would go here. 
                                                  Since we populated data for id=1, we use the map above. */}
                                                <p>Programme détaillé bientôt disponible.</p>
                                            </Accordion>
                                        )}

                                        {/* Re-rendering program loop to match design better - using simple list with icons */}
                                        <div className="mt-4">
                                            {/* The loop above is good, let's refine the list items inside */}
                                        </div>
                                    </Tab.Pane>

                                    <Tab.Pane eventKey="prerequis">
                                        <h4 className="fw-bold mb-4" style={{ color: theme.colors.primary }}>Prérequis</h4>
                                        <p className="text-muted mb-4">Compétences nécessaires pour suivre cette formation</p>

                                        <div className="d-flex flex-column gap-3 mb-5">
                                            {course.prerequisites?.map((req, idx) => (
                                                <div key={idx} className="d-flex gap-3 align-items-center text-muted">
                                                    <span className="fw-bold text-muted border rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '12px' }}>{idx + 1}</span>
                                                    <span>{req}</span>
                                                </div>
                                            )) || <p>Aucun prérequis spécifique.</p>}
                                        </div>

                                        <div className="alert alert-warning border-0 d-flex gap-3 align-items-start" role="alert" style={{ backgroundColor: '#fff3cd', color: '#856404' }}>
                                            <FaExclamationTriangle className="mt-1 flex-shrink-0" />
                                            <div>
                                                <h6 className="fw-bold mb-1">Important</h6>
                                                <p className="mb-0 small">Les formations se déroulent exclusivement en présentiel dans nos salles équipées. Tout le matériel informatique est fourni par TXLFORMA.</p>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </Col>

                    {/* Sidebar */}
                    <Col lg={4}>
                        <div className="d-flex flex-column gap-4">
                            {/* Pricing Card */}
                            <Card className="border-2 border-warning shadow-sm text-center p-3" style={{ borderColor: theme.colors.accent }}>
                                <Card.Body>
                                    <h5 className="fw-bold text-primary mb-3">Tarif de la formation</h5>
                                    <div className="display-6 fw-bold mb-1">{course.price.replace('€', '')}€</div>
                                    <p className="text-muted small mb-4">TTC - Paiement intégral requis</p>
                                    <Button variant="light" size="lg" className="w-100 fw-bold d-flex align-items-center justify-content-center gap-2" style={{ color: theme.colors.accent, backgroundColor: '#fff8e1' }}>
                                        <FaCreditCard /> Paiement sécurisé par CB
                                    </Button>
                                </Card.Body>
                            </Card>

                            {/* Sessions Card */}
                            <Card className="border-0 shadow-sm p-3">
                                <Card.Body>
                                    <h5 className="fw-bold text-primary mb-3">Sessions disponibles</h5>
                                    <p className="text-muted small mb-4">Sélectionnez une session pour vous inscrire</p>

                                    <div className="d-flex flex-column gap-3">
                                        {[
                                            { date: "Du 15 décembre 2025", places: 8, salle: "Salle 1 - TXLFORMA Paris", prof: "Alice ROMAINVILLE" },
                                            { date: "Du 20 janvier 2026", places: 12, salle: "Salle 2 - TXLFORMA Paris", prof: "Roger DURAND" },
                                            { date: "Du 10 février 2026", places: 5, salle: "Salle 1 - TXLFORMA Paris", prof: "Lionel PRIGENT" }
                                        ].map((session, idx) => (
                                            <div key={idx} className="border rounded-3 p-3 position-relative hover-shadow" style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                                                <Badge bg="dark" className="position-absolute top-0 end-0 m-2 rounded-pill">{session.places} places</Badge>
                                                <div className="d-flex gap-2 align-items-center fw-bold mb-2 text-dark">
                                                    <FaCalendarAlt className="text-primary" /> {session.date}
                                                </div>
                                                <div className="small text-muted d-flex flex-column gap-1">
                                                    <div className="d-flex gap-2 align-items-center"><FaMapMarkerAlt /> {session.salle}</div>
                                                    <div className="d-flex gap-2 align-items-center"><FaChalkboardTeacher /> Formateur : {session.prof}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Help Card */}
                            <div className="rounded-3 p-4 text-white text-center" style={{ backgroundColor: '#0d2345' }}>
                                <h5 className="fw-bold mb-3">Besoin d'aide ?</h5>
                                <p className="small opacity-75 mb-4">Notre équipe est disponible pour répondre à vos questions sur cette formation.</p>
                                <Button variant="light" className="w-100 rounded-pill fw-medium text-dark">Nous contacter</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CourseDetails;
