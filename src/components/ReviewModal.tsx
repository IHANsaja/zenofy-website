import React, { useState } from 'react';
import './ReviewModal.css';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddReview: (review: any) => void;
    productId: number | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onAddReview, productId }) => {
    const [rating, setRating] = useState(5);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
    const [images, setImages] = useState<string[]>([]);

    if (!isOpen) return null;

    const badges = [
        { id: 'prof', name: 'Professional', icon: 'ri-shield-user-line' },
        { id: 'eff', name: 'Efficient', icon: 'ri-rocket-line' },
        { id: 'fast', name: 'Fast Response', icon: 'ri-flashlight-line' },
        { id: 'time', name: 'Timeliness', icon: 'ri-time-line' },
        { id: 'supp', name: 'Supportive', icon: 'ri-customer-service-2-line' }
    ];

    const toggleBadge = (id: string) => {
        if (selectedBadges.includes(id)) {
            setSelectedBadges(selectedBadges.filter(b => b !== id));
        } else {
            setSelectedBadges([...selectedBadges, id]);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImages(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = () => {
        if (!title || !message) {
            alert('Please fill in all fields');
            return;
        }

        const newReview = {
            id: Date.now(),
            productId: productId,
            user: 'You',
            date: new Date().toLocaleString(),
            rating: rating,
            text: message,
            title: title,
            badges: selectedBadges,
            images: images
        };

        onAddReview(newReview);
        onClose();

        // Reset form
        setTitle('');
        setMessage('');
        setRating(5);
        setSelectedBadges([]);
        setImages([]);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="review-modal" onClick={e => e.stopPropagation()}>
                <button className="close-x" onClick={onClose}><i className="ri-close-line"></i></button>

                <div className="modal-body">
                    <div className="modal-left">
                        <label className="upload-area">
                            <input type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                            <i className="ri-image-add-line"></i>
                            <p>Upload Product Image</p>
                        </label>
                        <div className="upload-thumbs">
                            {images.map((img, idx) => (
                                <div key={idx} className="thumb-box">
                                    <img src={img} alt="Preview" />
                                    <button className="remove-thumb" onClick={() => setImages(images.filter((_, i) => i !== idx))}>
                                        <i className="ri-close-circle-fill"></i>
                                    </button>
                                </div>
                            ))}
                            {[...Array(Math.max(0, 3 - images.length))].map((_, i) => (
                                <div key={`empty-${i}`} className="thumb-box empty"></div>
                            ))}
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
                                rows={4}
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
                                    <i className={badge.icon}></i>
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
