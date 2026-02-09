import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductDetailModal from '../components/ProductDetailModal';
import './Shop.css';

const Shop: React.FC = () => {
    const location = useLocation();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const slides = [
        { img: 'https://images.unsplash.com/photo-1517604401157-53c755bef0ee?auto=format&fit=crop&q=80&w=1400', text: 'Premium Cinema Experience at Your Fingertips' },
        { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400', text: 'Crystal Clear Resolution, Day or Night' },
        { img: 'https://images.unsplash.com/photo-1593359677879-14ff9d56508d?auto=format&fit=crop&q=80&w=1400', text: 'Immersive Home Theater Solutions' },
    ];

    useEffect(() => {
        // Load Categories
        const savedCategories = localStorage.getItem('zenofy_categories');
        const defaultCategories = [
            { id: 'cat1', name: 'Ambient Light Rejecting Screens', description: 'Crystal clear projection even in daylight' },
            { id: 'cat2', name: '4K High Definition Projectors', description: 'Experience every detail with stunning 4K' },
            { id: 'cat3', name: 'Professional Installation Kits', description: 'Everything you need for a perfect setup' },
            { id: 'cat4', name: 'Electric Screen' },
            { id: 'cat5', name: 'Manual Screen' },
            { id: 'cat6', name: 'Tripod Screen' },
            { id: 'cat7', name: 'Projector Stand' },
            { id: 'cat8', name: 'Projector Lift' }
        ];
        const cats = savedCategories ? JSON.parse(savedCategories) : defaultCategories;
        setCategories(cats);

        // Load Products
        const savedProducts = localStorage.getItem('zenofy_products');
        const initialProducts = [
            { id: 1, img: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?auto=format&fit=crop&q=80&w=400', name: 'Zenofy ALR Pro 120" Screen', category: 'Ambient Light Rejecting Screens', price: 850, details: 'High-contrast surface for bright rooms.' },
            { id: 2, img: 'https://images.unsplash.com/photo-1593359677879-14ff9d56508d?auto=format&fit=crop&q=80&w=400', name: 'UltraShort Throw 4K Laser Projector', category: '4K High Definition Projectors', price: 2450, details: 'Stunning 4K clarity from just inches away.' },
            { id: 3, img: 'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&q=80&w=400', name: 'Motorized Drop-Down Elite Screen', category: 'Ambient Light Rejecting Screens', price: 1100, details: 'Silent operation with premium reflection.' },
            { id: 4, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400', name: 'Universal Heavy Duty Ceiling Mount', category: 'Professional Installation Kits', price: 75, details: 'Safe and secure mounting for any projector.' },
            { id: 5, img: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&q=80&w=400', name: '8K HDMI 2.1 Fiber Optic Cable (15m)', category: 'Professional Installation Kits', price: 120, details: 'Lossless signal for extreme distances.' },
        ];
        const prods = savedProducts ? JSON.parse(savedProducts) : initialProducts;
        setProducts(prods);

        // Check for category in URL
        const params = new URLSearchParams(location.search);
        const cat = params.get('category');
        if (cat) {
            setSelectedCategory(cat);
        }
    }, [location.search]);

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
        setIsDetailModalOpen(true);
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=400';
    };

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(p => p.category === selectedCategory);

    return (
        <div className="shop-page">
            {/* Shop Hero */}
            <section className="shop-hero">
                <div className="shop-hero-container">
                    <img src={slides[currentSlide].img} alt="Hero" className="shop-hero-img" onError={handleImageError} />
                    <div className="shop-hero-overlay">
                        <h1>{slides[currentSlide].text}</h1>
                    </div>
                    <div className="shop-search-overlay">
                        <input type="text" placeholder="I'm looking for ..." />
                        <button><i className="ri-search-line"></i></button>
                    </div>
                    <div className="slider-dots">
                        {slides.map((_, i) => (
                            <span
                                key={i}
                                className={`slider-dot ${currentSlide === i ? 'active' : ''}`}
                                onClick={() => setCurrentSlide(i)}
                            ></span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter Bar */}
            <section className="category-filter-bar">
                <div className="filter-scroll">
                    <button
                        className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('All')}
                    >All</button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${selectedCategory === cat.name ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.name)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </section>

            {/* Dynamic Product Sections */}
            <section className="shop-products-section">
                <h2 className="shop-section-title">
                    {selectedCategory === 'All' ? 'All Products' : selectedCategory}
                </h2>
                <div className="shop-products-grid">
                    {filteredProducts.map((item) => (
                        <div key={item.id} className="shop-product-card clickable" onClick={() => handleProductClick(item)}>
                            <div className="shop-img-box">
                                <img src={item.img} alt={item.name} onError={handleImageError} />
                            </div>
                            <h3>{item.name}</h3>
                            <p className="shop-item-price">LKR {item.price?.toLocaleString() || '0'}</p>
                            {item.details && <p className="shop-item-details">{item.details.substring(0, 60)}...</p>}
                        </div>
                    ))}
                    {filteredProducts.length === 0 && (
                        <p className="no-products">No products found in this category.</p>
                    )}
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

export default Shop;
