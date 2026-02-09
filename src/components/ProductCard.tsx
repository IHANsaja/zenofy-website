import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
    brand?: string;
    image: string;
    name: string;
    price: number;
    popular?: boolean;
    rating?: number;
    hideCart?: boolean;
    onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ brand, image, name, price, popular, rating, hideCart, onClick }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=400';
    };

    return (
        <div className={`product-card ${onClick ? 'clickable' : ''}`} onClick={onClick}>
            <div className="product-image-container">
                {brand && <div className="product-brand-tag">{brand}</div>}
                <img src={image} alt={name} className="product-img" onError={handleImageError} />
            </div>
            <div className="product-info">
                <h3 className="product-title">{name}</h3>
                <div className="product-meta">
                    <div className="product-price-box">
                        <i className="ri-money-dollar-circle-fill"></i>
                        <span>PRICE : ${price}</span>
                    </div>
                    {popular && <span className="popular-tag">popular</span>}
                </div>
                {rating !== undefined && (
                    <div className="product-rating">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={i < Math.floor(rating) ? "ri-star-fill" : "ri-star-line"}></i>
                        ))}
                        <span>{rating.toFixed(1)}</span>
                    </div>
                )}
                <div className="product-actions">
                    <button className="btn-buy">BUY</button>
                    {!hideCart && <button className="btn-cart-icon"><i className="ri-shopping-cart-line"></i></button>}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
