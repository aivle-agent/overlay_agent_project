import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('id');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <h1>Government Portal Login</h1>
            <div className="login-tabs">
                <button
                    id="tab-id"
                    className={activeTab === 'id' ? 'active' : ''}
                    onClick={() => setActiveTab('id')}
                >
                    ID / Password
                </button>
                <button
                    id="tab-cert"
                    className={activeTab === 'cert' ? 'active' : ''}
                    onClick={() => setActiveTab('cert')}
                >
                    Digital Certificate
                </button>
            </div>

            <div className="login-content">
                {activeTab === 'id' && (
                    <div className="login-form">
                        <input type="text" id="username" placeholder="User ID" />
                        <input type="password" id="password" placeholder="Password" />
                        <button id="btn-id-login" onClick={handleLogin}>Login</button>
                    </div>
                )}
                {activeTab === 'cert' && (
                    <div className="cert-login">
                        <p>Select your certificate from the list below.</p>
                        <div className="cert-list">
                            <div className="cert-item">Hong Gil Dong (Expires 2025-12-31)</div>
                        </div>
                        <button id="btn-cert-login" onClick={handleLogin}>Login with Certificate</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
