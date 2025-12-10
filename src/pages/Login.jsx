import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import AuthLayout from '../components/AuthLayout';
import { theme } from '../utils/theme';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout title="Connexion" subtitle="Accédez à votre compte">
            <Form>
                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold small text-secondary">Email</Form.Label>
                    <Form.Control type="email" placeholder="exemple@email.com" className="py-2 bg-light border-0" />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label className="fw-bold small text-secondary">Mot de passe</Form.Label>
                    <InputGroup>
                        <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="py-2 bg-light border-0"
                        />
                        <InputGroup.Text
                            className="bg-light border-0"
                            style={{ cursor: 'pointer', color: '#6c757d' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </InputGroup.Text>
                    </InputGroup>
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check type="checkbox" label="Se souvenir de moi" className="small text-muted" id="remember" />
                    <a href="#" className="small fw-bold text-decoration-none" style={{ color: theme.colors.primary }}>Mdp oublié ?</a>
                </div>

                <Button
                    className="w-100 py-2 fw-bold border-0 d-flex align-items-center justify-content-center gap-2 shadow-sm"
                    style={{ backgroundColor: theme.colors.primary }}
                >
                    Se connecter <FaArrowRight size={12} />
                </Button>
            </Form>

            <div className="text-center mt-5 pt-3 border-top small text-muted">
                Pas encore de compte ?{' '}
                <Link to="/inscription" className="fw-bold text-decoration-none" style={{ color: theme.colors.accentText || '#0d6efd' }}>
                    S'inscrire
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Login;