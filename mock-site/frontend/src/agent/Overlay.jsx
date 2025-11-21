import React, { useEffect, useState } from 'react';
import './Overlay.css';

const Overlay = ({ targetSelector, visible }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!visible || !targetSelector) {
            setPosition(null);
            return;
        }

        const updatePosition = () => {
            const element = document.querySelector(targetSelector);
            if (element) {
                const rect = element.getBoundingClientRect();
                setPosition({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    height: rect.height,
                });

                // Scroll into view if needed
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition);

        // Mutation observer to handle dynamic content changes?
        // For now, simple polling or event listeners might suffice for the mock.
        const interval = setInterval(updatePosition, 500);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition);
            clearInterval(interval);
        };
    }, [targetSelector, visible]);

    if (!visible || !position) return null;

    return (
        <div
            className="agent-overlay-box"
            style={{
                top: position.top,
                left: position.left,
                width: position.width,
                height: position.height,
            }}
        >
            <div className="overlay-label">Click Here</div>
        </div>
    );
};

export default Overlay;
