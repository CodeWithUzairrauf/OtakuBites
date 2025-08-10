// src/components/NarutoRain.jsx
import React, { useEffect, useState } from 'react';

const NarutoRain = () => {
    const [emojis, setEmojis] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setEmojis((prev) => [
                ...prev,
                {
                    id: Math.random().toString(36).substr(2, 9),
                    left: Math.random() * 100,
                    size: Math.random() * 24 + 16,
                    duration: Math.random() * 5 + 5,
                },
            ]);
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            {emojis.map((emoji) => (
                <div
                    key={emoji.id}
                    className="absolute animate-fall"
                    style={{
                        left: `${emoji.left}%`,
                        fontSize: `${emoji.size}px`,
                        animationDuration: `${emoji.duration}s`,
                        top: '-50px',
                    }}
                >
                    🍥
                </div>
            ))}
        </div>
    );
};

export default NarutoRain;
