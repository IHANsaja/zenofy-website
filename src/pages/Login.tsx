import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

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
            navigate('/shop');
        } else {
            setError('Invalid email or password. Hint: admin@zenofy.com / admin123 or user@zenofy.com / user123');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                {error && <div className="error-message">{error}</div>}
                <form className="login-form" onSubmit={handleLogin}>
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
                    <button type="submit" className="login-btn">Login</button>
                </form>
                <div className="login-footer">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
