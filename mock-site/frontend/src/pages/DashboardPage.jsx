import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'menu-tax', title: 'Tax & Finance', icon: '💰', desc: 'Pay taxes, get certificates', path: '/tax' },
        { id: 'menu-welfare', title: 'Welfare', icon: '🤲', desc: 'Apply for benefits', path: '/welfare' },
        { id: 'menu-housing', title: 'Housing', icon: '🏠', desc: 'Real estate services', path: '#' },
        { id: 'menu-health', title: 'Health', icon: '🏥', desc: 'Vaccination & Insurance', path: '#' },
        { id: 'menu-jobs', title: 'Jobs', icon: '💼', desc: 'Employment support', path: '#' },
        { id: 'menu-family', title: 'Family', icon: '👨‍👩‍👧‍👦', desc: 'Birth & Marriage', path: '#' },
    ];

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="logo">National Portal</div>
                <div className="user-menu">
                    <span>Welcome, Hong Gil Dong</span>
                    <button onClick={() => navigate('/')} id="btn-logout">Logout</button>
                </div>
            </nav>

            <div className="main-content">
                <section className="hero-section">
                    <h2>What service are you looking for today?</h2>
                    <div className="search-bar">
                        <input type="text" placeholder="Search for services (e.g., Tax Certificate)" />
                        <button>Search</button>
                    </div>
                </section>

                <section className="services-grid" id="services-section">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            className="service-card"
                            id={item.id}
                            onClick={() => item.path !== '#' && navigate(item.path)}
                        >
                            <div className="icon">{item.icon}</div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </section>

                <section className="quick-links">
                    <h3>Frequently Used Services</h3>
                    <ul>
                        <li><a href="#" id="link-resident-reg">Resident Registration</a></li>
                        <li><a href="#" id="link-tax-cert">Local Tax Certificate</a></li>
                        <li><a href="#" id="link-passport">Passport Application</a></li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default DashboardPage;
