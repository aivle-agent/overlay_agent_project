import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubPage.css';

const TaxPage = () => {
    const navigate = useNavigate();

    return (
        <div className="subpage-container">
            <header className="subpage-header">
                <button onClick={() => navigate('/dashboard')} className="btn-back">← Back</button>
                <h1>Tax & Finance</h1>
            </header>

            <div className="subpage-content">
                <section className="action-section">
                    <h2>Local Tax Services</h2>
                    <div className="button-grid">
                        <button id="btn-pay-tax" className="action-btn">
                            <span className="icon">💸</span>
                            Pay Local Tax
                        </button>
                        <button id="btn-tax-refund" className="action-btn">
                            <span className="icon">↩️</span>
                            Tax Refund Application
                        </button>
                        <button id="btn-auto-pay" className="action-btn">
                            <span className="icon">🔄</span>
                            Apply for Auto-Payment
                        </button>
                    </div>
                </section>

                <section className="action-section">
                    <h2>Certificates</h2>
                    <div className="button-grid">
                        <button id="btn-tax-cert" className="action-btn">
                            <span className="icon">📄</span>
                            Local Tax Certificate
                        </button>
                        <button id="btn-income-cert" className="action-btn">
                            <span className="icon">📑</span>
                            Income Certificate
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default TaxPage;
