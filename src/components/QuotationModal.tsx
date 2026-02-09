import React from 'react';
import './QuotationModal.css';

interface QuotationModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    productImg: string;
}

const QuotationModal: React.FC<QuotationModalProps> = ({ isOpen, onClose, productName, productImg }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="quotation-modal">
                <button className="close-x" onClick={onClose}><i className="ri-close-line"></i></button>

                <h2 className="modal-title-main">{productName}</h2>

                <div className="modal-body">
                    <div className="modal-left product-preview">
                        <img src={productImg} alt={productName} />
                    </div>

                    <div className="modal-right quotation-form-mini">
                        <h3>Place Your Quotation</h3>
                        <div className="form-group-compact">
                            <label>Size</label>
                            <input type="text" defaultValue="5x5 feet (60x60 in)" />
                        </div>
                        <div className="form-group-compact">
                            <label>Quantity</label>
                            <input type="number" />
                        </div>
                        <div className="form-group-compact">
                            <label>Message</label>
                            <textarea rows={4}></textarea>
                        </div>

                        <div className="modal-actions">
                            <button className="btn-add-quotation">Add Quotation</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotationModal;
