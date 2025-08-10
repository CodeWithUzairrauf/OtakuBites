// src/context/XPContext.jsx
import React, { createContext, useContext, useState } from "react";

const XPContext = createContext();

export const XPProvider = ({ children }) => {
    const [level, setLevel] = useState(9);
    const [xp, setXp] = useState(350);
    const [xpForNextLevel, setXpForNextLevel] = useState(500);

    // >>> add these two state variables <<<
    const [xpGain, setXpGain] = useState(0);
    const [showXPGain, setShowXPGain] = useState(false);

    const addXP = (amount) => {
        setXpGain(amount);
        setShowXPGain(true);
        setTimeout(() => setShowXPGain(false), 1200);
        console.log()
        setXp((prev) => {
            let newXP = prev + amount;
            if (newXP >= xpForNextLevel) {
                setLevel((l) => l + 1);
                newXP -= xpForNextLevel;
                setXpForNextLevel((r) => Math.round(r * 1.25));
            }
            return newXP;
        });
    };

    return (
        <XPContext.Provider
            value={{
                level,
                xp,
                xpForNextLevel,
                xpGain,
                showXPGain,
                addXP,
            }}
        >
            {children}
        </XPContext.Provider>
    );
};

export const useXP = () => {
    const ctx = useContext(XPContext);
    if (!ctx) throw new Error("useXP must be used inside XPProvider");
    return ctx;
};
