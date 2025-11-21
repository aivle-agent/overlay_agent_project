import React, { useState } from 'react';
import './AgentSidebar.css';
import Overlay from './Overlay';

const AgentSidebar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { role: 'agent', text: 'Hello! I am your helper. Tell me what you want to do.' }
    ]);
    const [input, setInput] = useState('');
    const [currentPlan, setCurrentPlan] = useState(null);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Mock API call to Agent Backend
        try {
            // In real implementation: fetch('http://localhost:8000/plan', ...)
            // Simulating response for "login"
            setTimeout(() => {
                const mockPlan = [
                    { step: 1, selector: '#tab-id', action: 'click', text: 'First, click on the "ID / Password" tab.' },
                    { step: 2, selector: '#username', action: 'type', text: 'Click here and type your ID.' },
                    { step: 3, selector: '#password', action: 'type', text: 'Now enter your password here.' },
                    { step: 4, selector: '#btn-id-login', action: 'click', text: 'Finally, click the Login button.' }
                ];

                setCurrentPlan(mockPlan);
                setCurrentStepIndex(0);
                setMessages(prev => [...prev, { role: 'agent', text: 'I can help with that. Follow my lead!' }]);
            }, 1000);
        } catch (error) {
            console.error("Error fetching plan:", error);
            setMessages(prev => [...prev, { role: 'agent', text: 'Sorry, I had trouble understanding that.' }]);
        }
    };

    const handleNext = () => {
        if (currentPlan && currentStepIndex < currentPlan.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
        } else {
            setMessages(prev => [...prev, { role: 'agent', text: 'We are done! Great job.' }]);
            setCurrentPlan(null);
            setCurrentStepIndex(-1);
        }
    };

    const currentStep = currentPlan ? currentPlan[currentStepIndex] : null;

    return (
        <>
            <div className={`agent-sidebar ${isOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <h3>Helper Agent</h3>
                    <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Close' : 'Open'}</button>
                </div>

                {isOpen && (
                    <>
                        <div className="chat-window">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    {msg.text}
                                </div>
                            ))}
                            {currentStep && (
                                <div className="instruction-card">
                                    <h4>Step {currentStep.step}</h4>
                                    <p>{currentStep.text}</p>
                                    <button onClick={handleNext} className="btn-next">Next Step</button>
                                </div>
                            )}
                        </div>

                        <div className="input-area">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type here..."
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </>
                )}
            </div>

            {/* Render Overlay based on current step */}
            <Overlay
                targetSelector={currentStep?.selector}
                visible={!!currentStep}
            />
        </>
    );
};

export default AgentSidebar;
