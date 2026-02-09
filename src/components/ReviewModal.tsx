import React, { useState } from 'react';
import './ReviewModal.css';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddReview: (review: any) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onAddReview }) => {
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);

    if (!isOpen) return null;

    const badges = [
        { id: 'prof', name: 'Professional Service', icon: '/assets/service1.png' },
        { id: 'eff', name: 'Efficient Service', icon: '/assets/service2.png' },
        { id: 'fast', name: 'Fast Response', icon: '/assets/service3.png' },
        { id: 'time', name: 'Timeliness', icon: '/assets/service1.png' },
        { id: 'supp', name: 'Supportive Staff', icon: '/assets/service2.png' }
    ];

    const toggleBadge = (id: string) => {
        if (selectedBadges.includes(id)) {
            setSelectedBadges(selectedBadges.filter(b => b !== id));
        } else {
            setSelectedBadges([...selectedBadges, id]);
        }
    };

    const handleSubmit = () => {
        if (!title || !message) {
            alert('Please fill in all fields');
            return;
        }

        const newReview = {
            id: Date.now(),
            user: 'You',
            date: new Date().toLocaleString(),
            rating: rating,
            text: message,
            title: title,
            badges: selectedBadges
        };

        onAddReview(newReview);
        onClose();

        // Reset form
        setTitle('');
        setMessage('');
        setRating(5);
        setSelectedBadges([]);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="review-modal" onClick={e => e.stopPropagation()}>
                <button className="close-x" onClick={onClose}><i className="ri-close-line"></i></button>

                <div className="modal-body">
                    <div className="modal-left">
                        <div className="upload-area">
                            <i className="ri-upload-2-line"></i>
                            <p>Upload Product Image</p>
                        </div>
                        <div className="upload-thumbs">
                            <div className="thumb-box"></div>
                            <div className="thumb-box"></div>
                            <div className="thumb-box"></div>
                        </div>
                        <div className="rating-stars-input">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <i
                                    key={num}
                                    className={num <= rating ? "ri-star-fill active" : "ri-star-line"}
                                    onClick={() => setRating(num)}
                                ></i>
                            ))}
                        </div>
                    </div>

                    <div className="modal-right">
                        <div className="form-group-modal">
                            <label>Review Title</label>
                            <input
                                type="text"
                                placeholder="Summarize your experience"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="form-group-modal">
                            <label>Your Message</label>
                            <textarea
                                rows={6}
                                placeholder="Tell us more about the product and service..."
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="evaluation-badges">
                            {badges.map(badge => (
                                <div
                                    key={badge.id}
                                    className={`badge ${selectedBadges.includes(badge.id) ? 'selected' : ''}`}
                                    onClick={() => toggleBadge(badge.id)}
                                >
                                    <img src={badge.icon} alt={badge.name} />
                                    <span>{badge.name}</span>
                                </div>
                            ))}
                        </div>

                        <button className="btn-modal-submit" onClick={handleSubmit}>SUBMIT REVIEW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
