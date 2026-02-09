import React from 'react';
import './QuotationForm.css';

const QuotationForm: React.FC = () => {
    return (
        <div className="quotation-form-page">
            <div className="form-page-container">
                <button className="back-btn-circle-alt"><i className="ri-arrow-left-s-line"></i></button>
                <div className="main-form-card">
                    <h1>Thank You for Choosing ZENOFY!</h1>

                    <form className="quotation-submit-form">
                        <div className="form-group-wide">
                            <label>Customer Name</label>
                            <input type="text" />
                        </div>
                        <div className="form-group-wide">
                            <label>Company Name</label>
                            <input type="text" />
                        </div>
                        <div className="form-group-wide">
                            <label>Email</label>
                            <input type="email" />
                        </div>
                        <div className="form-group-wide">
                            <label>Company Email</label>
                            <input type="email" />
                        </div>
                        <div className="form-group-wide">
                            <label>Phone number</label>
                            <input type="tel" />
                        </div>
                        <div className="form-group-wide">
                            <label>Address</label>
                            <textarea rows={4}></textarea>
                        </div>

                        <div className="form-submit-row">
                            <button type="submit" className="btn-quotation-submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default QuotationForm;
