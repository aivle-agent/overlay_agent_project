import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaxPage = () => {
    const navigate = useNavigate();

    return (
        <div className="subpage-container">
            <button className="btn-back" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
            <h1>Tax & Finance</h1>
            <div className="action-grid">
                <button id="btn-pay-tax" className="action-btn">Pay Local Tax</button>
                <button id="btn-tax-refund" className="action-btn">Tax Refund Application</button>
                <button id="btn-auto-pay" className="action-btn">Apply for Auto-Payment</button>
                <button id="btn-tax-cert" className="action-btn">Local Tax Certificate</button>
                <button id="btn-income-cert" className="action-btn">Income Certificate</button>
            </div>
        </div>
    );
};

export default TaxPage;
