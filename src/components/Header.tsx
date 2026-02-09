import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/logo.png';
import './Header.css';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const location = useLocation();

    const isAdmin = location.pathname.startsWith('/admin');

    // Sample data for suggestions
    const allItems = [
        { name: 'Elite Series 4K Projector', type: 'product', path: '/shop' },
        { name: '120\" ALR Fixed Frame Screen', type: 'product', path: '/shop' },
        { name: 'Electric Screen', type: 'category', path: '/shop?category=Electric Screen' },
        { name: 'Manual Screen', type: 'category', path: '/shop?category=Manual Screen' },
        { name: 'Projector Lift', type: 'category', path: '/shop?category=Projector Lift' },
        { name: 'Profile', type: 'page', path: '/profile' },
        { name: 'Shop', type: 'page', path: '/shop' },
    ];

    const suggestions = allItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    const handleSuggestionClick = (item: any) => {
        navigate(item.path);
        setSearchQuery('');
        setIsSearchFocused(false);
    };

    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isHomePage = location.pathname === '/home';

    return (
        <header className={clsx('site-header', isAuthPage && 'auth-header')}>
            <div className="nav-container">
                {!isAuthPage && (
                    <div className="left-section">
                        <i
                            className="ri-menu-line menu-icon"
                            onClick={() => setIsMobileMenuOpen(true)}
                        ></i>
                        <Link to="/" className="logo-section">
                            <img src={logo} alt="zenofy-logo" className="logo" />
                            <h1 className="brand-name">ZENOFY</h1>
                        </Link>
                    </div>
                )}

                {isAuthPage && (
                    <div className="auth-logo-center">
                        <Link to="/" className="logo-section">
                            <img src={logo} alt="zenofy-logo" className="logo" />
                            <h1 className="brand-name">ZENOFY</h1>
                        </Link>
                    </div>
                )}

                {!isAuthPage && (
                    <div className="center-right-section">
                        {isHomePage && (
                            <div className="search-container">
                                <div className="search-box">
                                    <input
                                        type="text"
                                        placeholder="Search products, services..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchFocused(true)}
                                        onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    />
                                    <i className="ri-search-line"></i>
                                </div>
                                {isSearchFocused && searchQuery && (
                                    <div className="search-suggestions glass-card">
                                        {suggestions.length > 0 ? (
                                            suggestions.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="suggestion-item"
                                                    onClick={() => handleSuggestionClick(item)}
                                                >
                                                    <i className={item.type === 'category' ? 'ri-stack-line' : 'ri-projector-line'}></i>
                                                    <span>{item.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-suggestions">No results found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <nav className="desktop-links">
                            {!isAdmin ? (
                                <>
                                    <Link to="/home" className="nav-item">
                                        <i className="ri-home-4-line"></i>
                                        <span>HOME</span>
                                    </Link>
                                    <Link to="/shop" className="nav-item">
                                        <i className="ri-shopping-bag-3-line"></i>
                                        <span>SHOP</span>
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
                            <Link
                                to="/cart"
                                className="nav-item cart-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("This option is under development");
                                }}
                            >
                                <i className="ri-shopping-cart-2-line"></i>
                                <span>CART</span>
                            </Link>

                            <button
                                className="logout-btn"
                                onClick={() => {
                                    // Clear auth state if any, for now just navigate
                                    navigate('/login');
                                }}
                                title="Logout"
                            >
                                <i className="ri-logout-box-r-line"></i>
                            </button>
                        </div>
                    </div>
                )}
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
                                <Link to="/home" onClick={() => setIsMobileMenuOpen(false)}>HOME</Link>
                                <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>SHOP</Link>
                                <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>PROFILE</Link>
                                <Link
                                    to="/cart"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setIsMobileMenuOpen(false);
                                        alert("This option is under development");
                                    }}
                                >
                                    CART
                                </Link>
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
