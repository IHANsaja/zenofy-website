import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Signup: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        // Save user data to localStorage
        const userData = {
            fullName,
            email,
            contact: '',
            country: 'Sri Lanka',
            address: ''
        };
        localStorage.setItem('zenofy_user', JSON.stringify(userData));

        alert('Signup successful! Please login.');
        navigate('/login');
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-illustration">
                    <img
                        src="src/assets/logo.png"
                        alt="Signup Illustration"
                        onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'}
                    />
                </div>
                <h2>Join Zenofy</h2>
                <form className="auth-form" onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-btn">Create Account</button>
                </form>
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
