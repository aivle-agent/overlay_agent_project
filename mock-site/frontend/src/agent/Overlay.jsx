import React, { useEffect, useState } from 'react';
import './Overlay.css';

const Overlay = ({ targetSelector, instruction, onNext }) => {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!targetSelector) {
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

                // Auto-scroll to element
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Add click listener to the target element to proceed to next step
                const handleClick = () => {
                    element.removeEventListener('click', handleClick);
                    onNext();
                };
                element.addEventListener('click', handleClick);

                return () => element.removeEventListener('click', handleClick);
            } else {
                // Element not found on this page
                setPosition(null);
            }
        };

        updatePosition();
        window.addEventListener('resize', updatePosition);

        // Retry finding element for a short duration (in case of dynamic loading)
        const interval = setInterval(updatePosition, 500);

        return () => {
            window.removeEventListener('resize', updatePosition);
            clearInterval(interval);
        };
    }, [targetSelector, onNext]);

    if (!position) return null;

    return (
        <div
            className="overlay-highlight"
            style={{
                top: position.top - 5,
                left: position.left - 5,
                width: position.width + 10,
                height: position.height + 10,
            }}
        >
            <div className="overlay-instruction">
                {instruction}
                <div className="overlay-arrow"></div>
            </div>
        </div>
    );
};

export default Overlay;
