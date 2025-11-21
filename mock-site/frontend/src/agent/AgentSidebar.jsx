import React, { useState, useEffect } from 'react';
import Overlay from './Overlay';
import './AgentSidebar.css';

const AgentSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'agent', text: 'Hello! I can help you navigate this site. Try saying "I want to pay tax".' }
    ]);
    const [currentPlan, setCurrentPlan] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            const response = await fetch('http://localhost:8000/plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: input,
                    current_url: window.location.pathname
                }),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            if (data.plan && data.plan.length > 0) {
                setCurrentPlan(data.plan);
                setCurrentStepIndex(0);
                setMessages(prev => [...prev, { role: 'agent', text: 'I have a plan! Follow the highlighted steps.' }]);
            } else {
                setMessages(prev => [...prev, { role: 'agent', text: 'I am not sure what to do on this page. Try navigating to the Dashboard first.' }]);
            }

        } catch (error) {
            console.error("Error fetching plan:", error);
            setMessages(prev => [...prev, { role: 'agent', text: 'Sorry, I had trouble connecting to the brain.' }]);
        }
    };

    const handleNextStep = () => {
        if (currentStepIndex < currentPlan.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            setCurrentStepIndex(-1);
            setCurrentPlan([]);
            setMessages(prev => [...prev, { role: 'agent', text: 'All steps completed!' }]);
        }
    };

    const currentStep = currentStepIndex >= 0 && currentStepIndex < currentPlan.length
        ? currentPlan[currentStepIndex]
        : null;

    return (
        <>
            <div className={`agent-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header" onClick={() => setIsOpen(!isOpen)}>
                    <span>🤖 AI Helper</span>
                    <button>{isOpen ? '▼' : '▲'}</button>
                </div>

                {isOpen && (
                    <div className="sidebar-content">
                        <div className="messages">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>
                        <div className="input-area">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask for help..."
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </div>
                )}
            </div>

            {currentStep && (
                <Overlay
                    targetSelector={currentStep.selector}
                    instruction={currentStep.instruction}
                    onNext={handleNextStep}
                />
            )}
        </>
    );
};

export default AgentSidebar;
