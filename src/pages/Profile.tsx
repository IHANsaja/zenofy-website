import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        fullName: 'Zenofy User',
        email: 'user@zenofy.com',
        contact: '+94 77 123 4567',
        country: 'Sri Lanka',
        address: 'No. 123, Galle Road, Colombo 03'
    });

    useEffect(() => {
        const saved = localStorage.getItem('zenofy_user');
        if (saved) {
            setUserData(JSON.parse(saved));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to save these changes?');
        if (confirmed) {
            localStorage.setItem('zenofy_user', JSON.stringify(userData));
            alert('Changes saved successfully!');
        }
    };

    return (
        <div className="profile-page glass-bg">
            <div className="profile-container glass-card">
                <div className="profile-header">
                    <h2 className="profile-title gold-text">Profile</h2>
                    <button className="back-btn" onClick={() => navigate(-1)}><i className="ri-arrow-left-circle-fill"></i></button>
                </div>

                <div className="profile-content">
                    <div className="profile-left">
                        <div className="avatar-wrapper">
                            <div className="avatar-placeholder">
                                <i className="ri-user-fill"></i>
                            </div>
                            <button className="edit-avatar-btn">
                                <i className="ri-pencil-fill"></i>
                            </button>
                        </div>
                    </div>

                    <div className="profile-right">
                        <form className="profile-form" onSubmit={handleSave}>
                            <div className="form-group full-width">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={userData.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contact</label>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={userData.contact}
                                        onChange={handleChange}
                                        placeholder="Contact"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <div className="select-wrapper">
                                        <select name="country" value={userData.country} onChange={handleChange}>
                                            <option value="Sri Lanka">Sri Lanka</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                        </select>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="email"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Shipping Address</label>
                                <textarea
                                    name="address"
                                    value={userData.address}
                                    onChange={handleChange}
                                    placeholder="Shipping Address"
                                    rows={4}
                                ></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-save">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Illustration as seen in Image 0 */}
                <div className="profile-illustration">
                    <img src="src/assets/profile-illustration.png" alt="Profile Illustration" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
