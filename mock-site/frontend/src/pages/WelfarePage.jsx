import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubPage.css';

const WelfarePage = () => {
    const navigate = useNavigate();

    return (
        <div className="subpage-container">
            <header className="subpage-header">
                <button onClick={() => navigate('/dashboard')} className="btn-back">← Back</button>
                <h1>Welfare Services</h1>
            </header>

            <div className="subpage-content">
                <section className="action-section">
                    <h2>Subsidy Applications</h2>
                    <div className="button-grid">
                        <button id="btn-child-allowance" className="action-btn">
                            <span className="icon">👶</span>
                            Child Allowance
                        </button>
                        <button id="btn-energy-voucher" className="action-btn">
                            <span className="icon">⚡</span>
                            Energy Voucher
                        </button>
                    </div>
                </section>

                <section className="action-section">
                    <h2>Support Programs</h2>
                    <div className="button-grid">
                        <button id="btn-disability" className="action-btn">
                            <span className="icon">♿</span>
                            Disability Support
                        </button>
                        <button id="btn-elderly-job" className="action-btn">
                            <span className="icon">👴</span>
                            Elderly Job Program
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default WelfarePage;
