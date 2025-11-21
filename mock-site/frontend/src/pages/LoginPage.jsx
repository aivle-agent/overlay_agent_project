import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const [activeTab, setActiveTab] = useState('certificate');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard');
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>National Public Service Portal</h1>
                <p>Secure Access to Government Services</p>
            </div>

            <div className="login-box">
                <div className="login-tabs">
                    <button
                        className={activeTab === 'certificate' ? 'active' : ''}
                        onClick={() => setActiveTab('certificate')}
                        id="tab-cert"
                    >
                        Digital Certificate
                    </button>
                    <button
                        className={activeTab === 'id' ? 'active' : ''}
                        onClick={() => setActiveTab('id')}
                        id="tab-id"
                    >
                        ID / Password
                    </button>
                    <button
                        className={activeTab === 'qr' ? 'active' : ''}
                        onClick={() => setActiveTab('qr')}
                        id="tab-qr"
                    >
                        QR Code
                    </button>
                </div>

                <div className="login-content">
                    {activeTab === 'certificate' && (
                        <div className="cert-login">
                            <div className="cert-list">
                                <div className="cert-item selected">
                                    <span className="icon">🔒</span>
                                    <div className="cert-info">
                                        <strong>Hong Gil Dong</strong>
                                        <small>Exp: 2025-12-31</small>
                                    </div>
                                </div>
                                <div className="cert-item">
                                    <span className="icon">🔒</span>
                                    <div className="cert-info">
                                        <strong>Kim Cheol Soo</strong>
                                        <small>Exp: 2024-06-30</small>
                                    </div>
                                </div>
                            </div>
                            <div className="password-input">
                                <label>Certificate Password</label>
                                <input type="password" placeholder="Enter password" id="cert-password" />
                            </div>
                            <button className="btn-primary" id="btn-cert-login" onClick={handleLogin}>Login with Certificate</button>
                        </div>
                    )}

                    {activeTab === 'id' && (
                        <form className="id-login" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label>User ID</label>
                                <input type="text" id="username" placeholder="Enter your ID" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" id="password" placeholder="Enter your password" />
                            </div>
                            <div className="virtual-keyboard">
                                <input type="checkbox" id="v-keyboard" /> <label htmlFor="v-keyboard">Use Virtual Keyboard</label>
                            </div>
                            <button type="submit" className="btn-primary" id="btn-id-login">Login</button>
                        </form>
                    )}

                    {activeTab === 'qr' && (
                        <div className="qr-login">
                            <div className="qr-code-placeholder">
                                [ QR CODE IMAGE ]
                            </div>
                            <p>Scan with your mobile app</p>
                        </div>
                    )}
                </div>

                <div className="login-footer">
                    <a href="#">Find ID</a> | <a href="#">Reset Password</a> | <a href="#">Register</a>
                </div>
            </div>

            <div className="security-notice">
                <p>⚠️ This is a secure government website. Please install the latest security plugins.</p>
            </div>
        </div>
    );
};

export default LoginPage;
