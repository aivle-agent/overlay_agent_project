import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelfarePage = () => {
    const navigate = useNavigate();

    return (
        <div className="subpage-container">
            <button className="btn-back" onClick={() => navigate('/dashboard')}>← Back to Dashboard</button>
            <h1>Welfare Services</h1>
            <div className="action-grid">
                <button id="btn-child-allowance" className="action-btn">Child Allowance</button>
                <button id="btn-energy-voucher" className="action-btn">Energy Voucher</button>
                <button id="btn-disability" className="action-btn">Disability Support</button>
                <button id="btn-elderly-job" className="action-btn">Elderly Job Program</button>
            </div>
        </div>
    );
};

export default WelfarePage;
