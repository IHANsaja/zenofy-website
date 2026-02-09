import React, { useState, useEffect } from 'react';
import ReviewModal from './ReviewModal';
import './ProductDetailModal.css';

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: number;
        brand: string;
        name: string;
        price: number;
        rating: number;
        image: string;
        details?: string;
        category?: string;
    } | null;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ isOpen, onClose, product }) => {
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [allReviews, setAllReviews] = useState<any[]>([]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=400';
    };

    useEffect(() => {
        if (isOpen) {
            const saved = localStorage.getItem('zenofy_reviews');
            if (saved) {
                setAllReviews(JSON.parse(saved));
            }
        }
    }, [isOpen]);

    const productReviews = allReviews.filter(r => r.productId === product?.id);

    const handleAddReview = (newReview: any) => {
        const updatedReviews = [newReview, ...allReviews];
        setAllReviews(updatedReviews);
        localStorage.setItem('zenofy_reviews', JSON.stringify(updatedReviews));
    };

    if (!isOpen || !product) return null;

    return (
        <div className="detail-modal-overlay" onClick={onClose}>
            <div className="detail-modal-content" onClick={e => e.stopPropagation()}>
                <button className="detail-close-btn" onClick={onClose}>
                    <i className="ri-close-line"></i>
                </button>

                <div className="detail-modal-body">
                    <div className="detail-image-section">
                        <img src={product.image || (product as any).img} alt={product.name} onError={handleImageError} />
                    </div>

                    <div className="detail-info-section">
                        <span className="detail-brand">{product.brand || 'ZENOFY'}</span>
                        <h2 className="detail-title">{product.name}</h2>

                        <div className="detail-rating">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <i key={s} className={s <= (product.rating || 5) ? "ri-star-fill" : "ri-star-line"}></i>
                            ))}
                            <span className="review-count-badge">({productReviews.length} reviews)</span>
                        </div>

                        <div className="detail-price">
                            <span>LKR</span> {product.price?.toLocaleString()}
                        </div>

                        <div className="detail-description">
                            <h3>Description</h3>
                            <p>{product.details || "Experience the pinnacle of projection technology. This high-end device offers crystal clear clarity, vibrant colors, and unparalleled performance for your home theater or professional setup."}</p>
                        </div>

                        <div className="contact-info-section">
                            <p className="order-text">To order and quotations: contact</p>
                            <div className="contact-actions">
                                <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp">
                                    <i className="ri-whatsapp-line"></i>
                                    <span>WhatsApp</span>
                                </a>
                                <a href="tel:+94771234567" className="contact-btn call">
                                    <i className="ri-phone-line"></i>
                                    <span>Call</span>
                                </a>
                            </div>
                            <div className="directory-details">
                                <p><i className="ri-map-pin-line"></i> No. 123, Galle Road, Colombo 03, Sri Lanka</p>
                                <p><i className="ri-mail-line"></i> info@zenofy.lk</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detail-reviews-area">
                    <div className="reviews-section-header">
                        <h3>Customer Reviews</h3>
                        <button className="add-review-minimal-btn" onClick={() => setShowReviewModal(true)}>
                            <i className="ri-add-line"></i> ADD REVIEW
                        </button>
                    </div>

                    <div className="product-reviews-list">
                        {productReviews.length > 0 ? (
                            productReviews.map((review) => (
                                <div key={review.id} className="minimal-review-card">
                                    <div className="minimal-review-header">
                                        <div className="user-info">
                                            <i className="ri-user-fill"></i>
                                            <strong>{review.user}</strong>
                                        </div>
                                        <div className="minimal-stars">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={i < review.rating ? "ri-star-fill" : "ri-star-line"}></i>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="minimal-review-text">{review.text}</p>
                                    {review.images && (
                                        <div className="review-images">
                                            {review.images.map((img: string, i: number) => (
                                                <div key={i} className="review-img-thumb">
                                                    <img src={img} alt="" onError={handleImageError} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <span className="minimal-review-date">{review.date}</span>
                                </div>
                            ))
                        ) : (
                            <div className="no-reviews-minimal">
                                <i className="ri-chat-voice-line"></i>
                                <p>No reviews yet. Be the first to share your experience!</p>
                            </div>
                        )}
                    </div>
                </div>

                <ReviewModal
                    isOpen={showReviewModal}
                    onClose={() => setShowReviewModal(false)}
                    onAddReview={handleAddReview}
                    productId={product.id}
                />
            </div>
        </div>
    );
};

export default ProductDetailModal;
