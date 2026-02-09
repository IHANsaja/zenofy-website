import React, { useState, useEffect, useMemo } from 'react';
import ReviewModal from '../components/ReviewModal';
import './Reviews.css';

const Reviews: React.FC = () => {
    const [showAddModal, setShowAddModal] = useState(false);

    // Load reviews from localStorage or use defaults
    const [reviews, setReviews] = useState<any[]>(() => {
        const saved = localStorage.getItem('zenofy_reviews');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: 1,
                user: 'UserName123',
                date: '2024/01/23 4:45PM',
                rating: 5.0,
                text: 'The projector I purchased from Zenofy exceeded my expectations. The picture quality is stunning, with vibrant colors and sharp resolution, even in bright rooms. It was easy to set up and works perfectly for both movies and presentations.',
                badges: ['prof', 'eff']
            },
            {
                id: 2,
                user: 'newUSER456',
                date: '2024/01/23 4:45PM',
                rating: 5.0,
                text: 'I bought a projector screen from Zenofy, and the quality is outstanding. The material is durable and wrinkle-free, providing a crystal-clear viewing experience.',
                images: ['https://images.unsplash.com/photo-1517604401157-53c755bef0ee?auto=format&fit=crop&q=80&w=400'],
                badges: ['eff', 'supp']
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('zenofy_reviews', JSON.stringify(reviews));
    }, [reviews]);

    const handleAddReview = (newReview: any) => {
        setReviews([newReview, ...reviews]);
    };

    // Dynamic metrics calculation
    const analysisMetrics = useMemo(() => {
        const total = reviews.length || 1;

        const countBadge = (id: string) => reviews.filter(r => r.badges?.includes(id)).length;

        const metrics = [
            { id: 'prof', label: 'Professionalism of the service' },
            { id: 'eff', label: 'Efficiency of the service' },
            { id: 'fast', label: 'Our response time' },
            { id: 'time', label: 'Timeliness of contract' },
            { id: 'supp', label: 'Support of the staff' }
        ];

        return metrics.map(m => {
            const count = countBadge(m.id);
            const percent = Math.round((count / total) * 100);

            let average = 'NEUTRAL';
            let color = '#CDDC39';

            if (percent >= 80) { average = 'GREAT'; color = '#4CAF50'; }
            else if (percent >= 60) { average = 'GOOD'; color = '#8BC34A'; }
            else if (percent < 40) { average = 'BAD'; color = '#FFEB3B'; }
            if (percent < 20) { average = 'WORST'; color = '#A83232'; }

            return { ...m, value: percent, average, color };
        });
    }, [reviews]);

    const averageRating = useMemo(() => {
        if (reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }, [reviews]);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://images.unsplash.com/photo-1594322436404-5a0526db4d13?auto=format&fit=crop&q=80&w=400';
    };

    return (
        <div className="reviews-page">
            <div className="reviews-container">
                <div className="reviews-main">
                    <div className="reviews-header-info">
                        <div className="rating-summary">
                            <h1>CUSTOMER REVIEWS</h1>
                            <div className="big-rating">
                                <span className="rating-num">{averageRating}</span>
                                <div className="stars-row">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className={i < Math.floor(Number(averageRating)) ? "ri-star-fill" : "ri-star-line"}></i>
                                    ))}
                                </div>
                                <p className="review-count">({reviews.length} reviews)</p>
                            </div>
                        </div>
                        <i className="ri-star-fill floating-star"></i>
                    </div>

                    <div className="recent-reviews-section">
                        <div className="section-header-bar">
                            <h2>Recent Reviews</h2>
                            <button className="add-review-btn" onClick={() => setShowAddModal(true)}>ADD REVIEW</button>
                        </div>

                        <div className="reviews-list">
                            {reviews.map(review => (
                                <div key={review.id} className="review-card">
                                    <div className="review-user-icon">
                                        <i className="ri-user-3-fill"></i>
                                    </div>
                                    <div className="review-content">
                                        <div className="review-meta">
                                            <h3>{review.user}</h3>
                                            <div className="review-stars">
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className={i < Math.floor(review.rating) ? "ri-star-fill" : "ri-star-line"}></i>
                                                ))}
                                                <span>{review.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <p className="review-date">{review.date}</p>
                                        <p className="review-text">{review.text}</p>
                                        {review.images && (
                                            <div className="review-images">
                                                {review.images.map((img: string, i: number) => (
                                                    <div key={i} className="review-img-thumb"><img src={img} alt="" onError={handleImageError} /></div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="review-analyzer">
                    <h2>REVIEW ANALYZER</h2>
                    <div className="analyzer-metrics">
                        {analysisMetrics.map((metric, i) => (
                            <div key={i} className="metric-item">
                                <p className="metric-label">{metric.label}</p>
                                <div className="metric-progress-container">
                                    <div className="metric-values">
                                        <span className="val-percent">{metric.value}%</span>
                                        <span className="val-avg">AVERAGE: <span className="avg-label">{metric.average}</span></span>
                                    </div>
                                    <div className="progress-bar-bg">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${metric.value}%`, backgroundColor: metric.color }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
            <ReviewModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAddReview={handleAddReview}
                productId={null}
            />
        </div>
    );
};

export default Reviews;
