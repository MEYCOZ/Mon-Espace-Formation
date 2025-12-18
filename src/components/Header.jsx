import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { theme } from '../utils/theme';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <Navbar expand="lg" className="py-3 bg-white sticky-top shadow-sm">
            <Container>
                {/* LOGO */}
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <div style={{ color: theme.colors.primary, fontSize: '26px', fontWeight: '800', marginRight: '12px', letterSpacing: '-1px' }}>
                        <span style={{ color: theme.colors.accent }}>M</span>EF
                    </div>
                    <span style={{ fontSize: '14px', color: theme.colors.textGrey, borderLeft: '1px solid #dee2e6', paddingLeft: '12px', lineHeight: '1.2' }}>
                        Mon Espace<br />Formation
                    </span>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="align-items-center gap-lg-4 gap-2 mt-3 mt-lg-0">
                        <Nav.Link as={Link} to="/" className="fw-medium text-dark">Accueil</Nav.Link>
                        <Nav.Link as={Link} to="/formations" className="fw-medium text-dark">Formations</Nav.Link>
                        <Nav.Link as={Link} to="/about" className="fw-medium text-dark">A Propos</Nav.Link>
                        <Nav.Link href="/#contact" className="fw-medium text-dark">Contact</Nav.Link>

                        {/* BOUTON MON COMPTE -> Redirige vers /connexion */}
                        <Button
                            as={Link}
                            to="/connexion"
                            className="fw-bold px-4 py-2 border-0 rounded-1"
                            style={{ backgroundColor: theme.colors.accent, color: theme.colors.white }}
                        >
                            Mon Compte
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;