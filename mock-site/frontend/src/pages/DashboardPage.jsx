import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'menu-tax', title: 'Tax & Finance', icon: '💰', path: '/tax' },
        { id: 'menu-welfare', title: 'Welfare', icon: '❤️', path: '/welfare' },
        { id: 'menu-housing', title: 'Housing', icon: '🏠', path: '#' },
        { id: 'menu-health', title: 'Health', icon: '🏥', path: '#' },
        { id: 'menu-jobs', title: 'Jobs', icon: '💼', path: '#' },
        { id: 'menu-family', title: 'Family', icon: '👨‍👩‍👧‍👦', path: '#' },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Welcome, Hong Gil Dong</h2>
                <div className="quick-links">
                    <button id="link-resident-reg">Resident Registration</button>
                    <button id="link-tax-cert">Local Tax Certificate</button>
                </div>
            </header>

            <div className="menu-grid">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        id={item.id}
                        className="menu-card"
                        onClick={() => item.path !== '#' && navigate(item.path)}
                    >
                        <div className="icon">{item.icon}</div>
                        <div className="title">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;
