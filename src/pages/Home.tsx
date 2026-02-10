import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const popularProducts = [
        { id: 1, brand: 'ZENOFY', name: 'Elite Series 4K Projector', price: 1250, rating: 5, image: 'https://images.unsplash.com/photo-1593359677879-14ff9d56508d?auto=format&fit=crop&q=80&w=400', popular: true },
        { id: 2, brand: 'ZENOFY', name: '120" ALR Fixed Frame Screen', price: 850, rating: 5.0, image: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=400', popular: true },
        { id: 3, brand: 'ZENOFY', name: 'Ultra-Quiet Motorized Screen', price: 950, rating: 5.0, image: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=400', popular: true },
        { id: 4, brand: 'ZENOFY', name: 'Heavy Duty Projector Lift', price: 450, rating: 5.0, image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400', popular: true },
        { id: 5, brand: 'ZENOFY', name: 'Precision Projector Stand', price: 120, rating: 5.0, image: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=400', popular: true },
    ];

    const handleCategoryClick = (name: string) => {
        navigate(`/shop?category=${encodeURIComponent(name)}`);
    };

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">WELCOME TO ZENOFY!</h1>
                        <p className="hero-desc">
                            Zenofy specializes in providing top-tier projectors, projector screens, and related
                            accessories, catering to both home entertainment enthusiasts and professionals seeking
                            superior visual solutions for presentations, classrooms, and conference rooms. Our products
                            are designed to deliver exceptional image clarity, brightness, and durability, ensuring an
                            immersive and reliable experience for all your projection needs.
                        </p>
                        <button className="btn-primary" onClick={() => navigate('/shop')}>SHOP NOW</button>
                    </div>
                    <div className="hero-visual">
                        {/* Large illustration as seen in Image 2 */}
                        <img src="src\assets\ZenofyHero.png" alt="Zenofy Hero Illustration" className="hero-img" />
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section className="collections-section">
                <div className="collection-card dark-blue">
                    <div className="collection-info">
                        <h3>VEGA SMART SCREENS COLLECTION</h3>
                        <button className="btn-outline" onClick={() => navigate('/shop')}>BUY NOW</button>
                    </div>
                    <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=400" alt="Vega Screens" />
                </div>
                <div className="collection-card dark-navy">
                    <div className="collection-info">
                        <h3>PROJECTOR LIFTS AND STANDS</h3>
                        <button className="btn-outline" onClick={() => navigate('/shop')}>BUY NOW</button>
                    </div>
                    <img src="https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&q=80&w=400" alt="Lifts and Stands" />
                </div>
            </section>

            {/* Popular Products */}
            <section className="popular-products">
                <div className="section-header">
                    <h2>Most Popular Products</h2>
                    <div className="section-actions">
                        <Link to="/reviews" className="see-reviews">Reviews</Link>
                        <Link to="/shop" className="see-all">see all</Link>
                    </div>
                </div>
                <div className="products-grid">
                    {popularProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            hideCart={true}
                            onClick={() => handleProductClick(product)}
                        />
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section className="categories-section">
                <h2 className="section-title">Categories</h2>
                <div className="categories-grid">
                    {[
                        { icon: 'ri-slideshow-line', name: 'Electric Screen' },
                        { icon: 'ri-window-line', name: 'Manual Screen' },
                        { icon: 'ri-presentation-line', name: 'Tripod Screen' },
                        { icon: 'ri-stack-line', name: 'Projector Stand' },
                        { icon: 'ri-arrow-up-down-line', name: 'Projector Lift' },
                    ].map((cat, i) => (
                        <div key={i} className="category-item clickable" onClick={() => handleCategoryClick(cat.name)}>
                            <div className="category-icon-box">
                                <i className={cat.icon}></i>
                            </div>
                            <p>{cat.name}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <section className="services-section">
                <div className="service-card">
                    <div className="service-icon-box">
                        <i className="ri-truck-line"></i>
                    </div>
                    <h3>Free Delivery</h3>
                    <p>We provide free delivery for orders over 50,000 LKR</p>
                </div>
                <div className="service-card">
                    <div className="service-icon-box">
                        <i className="ri-shield-check-line"></i>
                    </div>
                    <h3>Secure Payment</h3>
                    <p>You can use Visa or Mastercard for secure online payments</p>
                </div>
                <div className="service-card">
                    <div className="service-icon-box">
                        <i className="ri-customer-service-2-line"></i>
                    </div>
                    <h3>Smart Assistance</h3>
                    <p>Reach out to our customer support, powered by a blend of smart human and AI assistants</p>
                </div>
            </section>

            <ProductDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Home;
