import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaSearch, FaClock, FaUser, FaArrowRight, FaFilter } from 'react-icons/fa';
import { theme } from '../utils/theme';
import { catalogueData } from '../utils/data';

// animations si vous voulez changé  c'est ici ou dans le fichier theme
const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const Catalogue = () => {
    return (
        <div style={{ fontFamily: theme.fonts.main, backgroundColor: theme.colors.bgLight, minHeight: '100vh' }}>


            <section style={{ backgroundColor: theme.colors.primary, padding: '80px 0 100px 0', color: 'white' }}>
                <Container className="text-center">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 className="fw-bold display-5 mb-3">Catalogue de Formations</h1>
                        <p className="lead opacity-75 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                            Découvrez nos 13 formations dans le domaine du numérique et des nouvelles technologies
                        </p>


                        <div className="bg-white p-2 rounded-3 mx-auto shadow-lg" style={{ maxWidth: '700px' }}>
                            <InputGroup size="lg" className="border-0">
                                <InputGroup.Text className="bg-white border-0 text-muted"><FaSearch /></InputGroup.Text>
                                <Form.Control
                                    placeholder="Rechercher une formation..."
                                    className="border-0 shadow-none"
                                    style={{ fontSize: '0.95rem' }}
                                />
                            </InputGroup>
                        </div>
                    </motion.div>
                </Container>
            </section>


            <div className="bg-white border-bottom sticky-top shadow-sm" style={{ top: '70px', zIndex: 900 }}>
                <Container className="py-3">
                    <Row className="g-2 align-items-center">
                        <Col xs="auto">
                            <Button variant="outline-dark" size="sm" className="d-flex align-items-center gap-2 fw-medium rounded-1 px-3">
                                <FaFilter size={12} /> Filtres avancés
                            </Button>
                        </Col>
                        <Col>
                            <Row className="g-2">
                                {['Domaine', 'Durée', 'Difficulté', 'Tarification', 'Disponibilité'].map((filter, i) => (
                                    <Col key={i} xs="auto" className="d-none d-lg-block">
                                        <Form.Select size="sm" className="bg-light border-0 rounded-1" style={{ cursor: 'pointer', minWidth: '130px' }}>
                                            <option>Tous les {filter.toLowerCase()}s</option>
                                        </Form.Select>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>


            <Container className="py-5">
                <div className="mb-4 text-muted">13 formations trouvées</div>

                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                    <Row className="g-4 align-items-stretch">
                        {catalogueData.map((formation) => (
                            <Col lg={4} md={6} key={formation.id}>

                                <motion.div
                                    variants={fadeInUp}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="h-100"
                                >
                                    <Card className="h-100 border-0 shadow-sm overflow-hidden" style={{ borderRadius: '12px' }}>


                                        <div className="position-relative" style={{ height: '140px', backgroundColor: '#e9ecef' }}>

                                            <span
                                                className="position-absolute top-0 end-0 m-3 px-2 py-1 rounded-1 fw-bold text-dark"
                                                style={{ backgroundColor: theme.colors.accent, fontSize: '0.7rem' }}
                                            >
                                                {formation.category}
                                            </span>

                                            <span className="position-absolute bottom-0 start-0 m-3 px-2 py-1 bg-white rounded-pill shadow-sm small fw-bold" style={{ fontSize: '0.7rem' }}>
                                                {formation.sessions} sessions disponibles
                                            </span>
                                        </div>

                                        <Card.Body className="d-flex flex-column p-4">
                                            <Card.Title className="fw-bold mb-3 h6" style={{ color: theme.colors.primary, lineHeight: '1.4' }}>
                                                {formation.title}
                                            </Card.Title>

                                            <Card.Text className="text-muted small mb-4 flex-grow-1" style={{ fontSize: '0.85rem' }}>
                                                {formation.desc}
                                            </Card.Text>


                                            <div className="d-flex gap-3 mb-4 small text-muted">
                                                <div className="d-flex align-items-center gap-1">
                                                    <FaClock className="text-primary" /> {formation.time}
                                                </div>
                                                <div className="d-flex align-items-center gap-1">
                                                    <FaUser className="text-primary" /> {formation.level}
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-between mt-auto pt-3 border-top">
                                                <span className="fw-bold fs-5" style={{ color: theme.colors.accentText || '#0d6efd' }}>
                                                    {formation.price} <span className="fs-6 text-muted fw-normal">TTC</span>
                                                </span>
                                            </div>
                                        </Card.Body>


                                        <Button
                                            variant="primary"
                                            className="w-100 rounded-0 py-2 d-flex justify-content-center align-items-center gap-2 fw-medium"
                                            style={{ backgroundColor: theme.colors.primary, border: 'none' }}
                                        >
                                            Voir les détails <FaArrowRight size={12} />
                                        </Button>
                                    </Card>
                                </motion.div>
                            </Col>
                        ))}
                    </Row>
                </motion.div>
            </Container>
        </div>
    );
};

export default Catalogue;