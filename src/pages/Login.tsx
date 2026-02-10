import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Static role-based redirection logic
        if (email === 'admin@zenofy.com' && password === 'admin123') {
            navigate('/admin/dashboard');
        } else if (email === 'user@zenofy.com' && password === 'user123') {
            navigate('/home');
        } else {
            setError('Invalid email or password. Hint: admin@zenofy.com / admin123 or user@zenofy.com / user123');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-illustration">
                    <img
                        src="src/assets/logo.png"
                        alt="Login Illustration"
                        onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'}
                    />
                </div>
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form className="auth-form" onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                </form>
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
