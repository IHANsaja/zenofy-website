import React from 'react';
import './Cart.css';

const Cart: React.FC = () => {
    const cartItems = [
        { id: 1, name: 'Screen - MA1107', price: 100000.00, quantity: 1, desc: 'Screen suitable for medium scale classes', size: '113 x 113', img: '/assets/pro1.png' },
        { id: 2, name: 'Screen - MA1108', price: 200000.00, quantity: 2, desc: 'Screen suitable for over medium scale classes', size: '223 x 223', img: '/assets/pro2.png' },
    ];

    return (
        <div className="cart-page">
            <div className="cart-container">
                <div className="cart-left">
                    <h2 className="cart-section-title">Items</h2>
                    <div className="items-list">
                        {cartItems.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="item-header">
                                    <h3>{item.name}</h3>
                                </div>
                                <div className="item-body">
                                    <div className="item-img-box">
                                        <img src={item.img} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p className="item-desc">{item.desc}</p>
                                        <div className="item-meta">
                                            <div className="meta-row">
                                                <span>Size</span>
                                                <span>:</span>
                                                <span>{item.size}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span>Price</span>
                                                <span>:</span>
                                                <span>Rs.{item.price.toLocaleString()}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span>Quantity</span>
                                                <span>:</span>
                                                <div className="qty-controls">
                                                    <button><i className="ri-arrow-left-s-line"></i></button>
                                                    <span>{item.quantity}</span>
                                                    <button><i className="ri-arrow-right-s-line"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn-remove">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-clear-cart">Clear Cart</button>
                </div>

                <div className="cart-right">
                    <div className="summary-header">
                        <h2 className="summary-title">Summary</h2>
                        <button className="back-btn"><i className="ri-arrow-left-circle-fill"></i></button>
                    </div>
                    <div className="summary-card">
                        <div className="summary-items">
                            {cartItems.map(item => (
                                <div key={item.id} className="summary-row">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>=</span>
                                    <span>{(item.price * item.quantity).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="summary-row shipping">
                                <span>Shipping Cost</span>
                                <span>=</span>
                                <span>10,000.00</span>
                            </div>
                        </div>
                        <div className="total-row">
                            <h3>Total</h3>
                            <div className="total-amount">
                                <span>=</span>
                                <span>510,000.00</span>
                            </div>
                        </div>
                        <div className="checkout-action">
                            <button className="btn-checkout">Checkout</button>
                        </div>
                    </div>
                </div>

                {/* Illustration from Image 1 */}
                <div className="cart-illustration">
                    <img src="/assets/cart-illustration.png" alt="Cart Illustration" />
                </div>
            </div>
        </div>
    );
};

export default Cart;
