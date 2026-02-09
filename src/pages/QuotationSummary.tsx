import React from 'react';
import { Link } from 'react-router-dom';
import './QuotationSummary.css';

const QuotationSummary: React.FC = () => {
    const quoteItems = [
        {
            id: 1,
            name: 'Manual Wall Mount Projector Screen',
            size: '223 x 223',
            price: 200000.00,
            quantity: 20,
            message: 'I want this now.',
            img: '/assets/pro1.png'
        },
        {
            id: 2,
            name: 'Manual Wall Mount Projector Screen',
            size: '223 x 223',
            price: 200000.00,
            quantity: 10,
            message: 'I want this black.',
            img: '/assets/pro1.png'
        }
    ];

    return (
        <div className="quotation-summary-page">
            <div className="summary-page-container">
                <div className="summary-left">
                    <h2 className="summary-section-title">Items</h2>
                    <div className="quote-items-list">
                        {quoteItems.map((item) => (
                            <div key={item.id} className="quote-item-card">
                                <div className="quote-item-body">
                                    <div className="quote-img-box">
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="quote-item-details">
                                        <h4>{item.name}</h4>
                                        <div className="quote-meta">
                                            <div className="meta-line">
                                                <span>Size</span>
                                                <span className="colon">:</span>
                                                <span>{item.size}</span>
                                            </div>
                                            <div className="meta-line">
                                                <span>Price</span>
                                                <span className="colon">:</span>
                                                <span>Rs.{item.price.toLocaleString()}</span>
                                            </div>
                                            <div className="meta-line">
                                                <span>Quantity</span>
                                                <span className="colon">:</span>
                                                <span>{item.quantity}</span>
                                            </div>
                                            <div className="meta-line">
                                                <span>Message</span>
                                                <span className="colon">:</span>
                                                <span>{item.message}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="summary-right">
                    <div className="summary-header">
                        <h2 className="summary-title">Summary</h2>
                        <button className="back-btn-circle-alt2"><i className="ri-arrow-left-s-line"></i></button>
                    </div>
                    <div className="summary-stats-card">
                        <div className="summary-rows">
                            <div className="sum-row">
                                <span>Screen - MA 1107 x 1</span>
                                <span className="sym">=</span>
                                <span className="val">100 000.00</span>
                            </div>
                            <div className="sum-row sub">
                                <span>Rs. 100 000.00</span>
                            </div>
                            <div className="sum-row">
                                <span>Screen - MA1108 x 2</span>
                                <span className="sym">=</span>
                                <span className="val">400 000.00</span>
                            </div>
                            <div className="sum-row sub">
                                <span>Rs. 200 000.00</span>
                            </div>
                            <div className="sum-row shipping">
                                <span>Shipping Cost</span>
                                <span className="sym">=</span>
                                <span className="val">10 000.00</span>
                            </div>
                        </div>

                        <div className="total-divider"></div>

                        <div className="sum-total-row">
                            <h3>Total</h3>
                            <div className="total-val-box">
                                <span className="sym">=</span>
                                <span className="val-final">510 000.00</span>
                            </div>
                        </div>

                        <div className="confirm-action-box">
                            <Link to="/quotation-form" className="btn-confirm-quotation-link">
                                <button className="btn-confirm-quotation">Confirm Quoatation</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Background Illustration from Image 4 */}
                <div className="summary-illustration">
                    <img src="/assets/cart-illustration.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default QuotationSummary;
