import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import './Header.css';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // In a real app, this would come from an auth context.
    // For now, we'll check if the path is /admin to simulate role detection or check logic.
    // However, the user specifically said "admin should not see the shop like users".
    // Let's assume the user is logged in as admin if they are on /admin/* or based on some state.
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <header className="site-header">
            <div className="nav-container">
                <div className="left-section">
                    <i
                        className="ri-menu-line menu-icon"
                        onClick={() => setIsMobileMenuOpen(true)}
                    ></i>
                    <Link to="/" className="logo-section">
                        <img src="/assets/logo.png" alt="zenofy-logo" className="logo" />
                        <h1 className="brand-name">ZENOFY</h1>
                    </Link>
                </div>

                <div className="center-right-section">
                    <nav className="desktop-links">
                        {!isAdmin ? (
                            <>
                                <Link to="/shop" className="nav-item">
                                    <i className="ri-shopping-bag-3-line"></i>
                                    <span>SHOP</span>
                                </Link>
                                <Link to="/home" className="nav-item">
                                    <i className="ri-home-4-line"></i>
                                    <span>HOME</span>
                                </Link>
                                <Link to="/profile" className="nav-item">
                                    <i className="ri-user-line"></i>
                                    <span>PROFILE</span>
                                </Link>
                            </>
                        ) : (
                            <Link to="/admin/dashboard" className="nav-item active">
                                <i className="ri-dashboard-line"></i>
                                <span>ADMIN DASHBOARD</span>
                            </Link>
                        )}
                    </nav>

                    <div className="header-actions">
                        <Link to="/cart" className="cart-icon">
                            <i className="ri-shopping-cart-2-line"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={clsx('mobile-overlay', isMobileMenuOpen && 'active')}>
                <div className="mobile-sidebar">
                    <div className="sidebar-header">
                        <i className="ri-close-line close-icon" onClick={() => setIsMobileMenuOpen(false)}></i>
                    </div>
                    <div className="mobile-links">
                        {!isAdmin ? (
                            <>
                                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>SHOP</Link>
                                <Link to="/home" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>PROFILE</Link>
                                <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)}>CART</Link>
                            </>
                        ) : (
                            <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>DASHBOARD</Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
