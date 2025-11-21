import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import TaxPage from './pages/TaxPage';
import WelfarePage from './pages/WelfarePage';
import AgentSidebar from './agent/AgentSidebar';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/tax" element={<TaxPage />} />
          <Route path="/welfare" element={<WelfarePage />} />
        </Routes>
        <AgentSidebar />
      </div>
    </Router>
  );
}

export default App;
