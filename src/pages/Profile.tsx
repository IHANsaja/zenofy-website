import React from 'react';
import './Profile.css';

const Profile: React.FC = () => {
    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <h2 className="profile-title">Profile</h2>
                    <button className="back-btn"><i className="ri-arrow-left-circle-fill"></i></button>
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
                        <form className="profile-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>First name</label>
                                    <input type="text" placeholder="First name" />
                                </div>
                                <div className="form-group">
                                    <label>Last name</label>
                                    <input type="text" placeholder="Last name" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Contact</label>
                                    <input type="text" placeholder="Contact" />
                                </div>
                                <div className="form-group">
                                    <label>Country</label>
                                    <div className="select-wrapper">
                                        <select defaultValue="Country">
                                            <option disabled>Country</option>
                                            <option>Sri Lanka</option>
                                            <option>USA</option>
                                            <option>UK</option>
                                        </select>
                                        <i className="ri-arrow-down-s-line"></i>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Email</label>
                                <input type="email" placeholder="email" />
                            </div>

                            <div className="form-group full-width">
                                <label>Shipping Address</label>
                                <textarea placeholder="Shipping Address" rows={4}></textarea>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-save">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Illustration as seen in Image 0 */}
                <div className="profile-illustration">
                    <img src="/assets/profile-illustration.png" alt="Profile Illustration" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
