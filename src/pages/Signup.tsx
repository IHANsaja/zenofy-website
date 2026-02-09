import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

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
        <div className="profile-page glass-bg signup-page-alt">
            <div className="profile-container glass-card signup-card-alt">
                <div className="profile-header">
                    <h2 className="profile-title gold-text">Sign Up</h2>
                </div>

                <div className="profile-content">
                    <div className="profile-left">
                        <div className="avatar-wrapper">
                            <div className="avatar-placeholder">
                                <i className="ri-user-add-fill"></i>
                            </div>
                        </div>
                    </div>

                    <div className="profile-right">
                        <form className="profile-form" onSubmit={handleSignup}>
                            <div className="form-group full-width">
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
                            <div className="form-group full-width">
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
                            <div className="form-group full-width">
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
                            <div className="form-actions">
                                <button type="submit" className="btn-save">Sign Up</button>
                            </div>
                        </form>
                        <div className="signup-footer-alt">
                            <p>Already have an account? <Link to="/login" className="gold-text">Login</Link></p>
                        </div>
                    </div>
                </div>

                <div className="profile-illustration">
                    <img src="/assets/profile-illustration.png" alt="Signup Illustration" onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400'} />
                </div>
            </div>
        </div>
    );
};

export default Signup;
