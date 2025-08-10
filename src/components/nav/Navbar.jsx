// src/components/Navbar.jsx
import React from "react";
import { useXP } from "../../pages/Home/XpContent"; // ← adjust path if your context lives elsewhere
import { Link } from "react-router-dom";
import {
    FaHome,
    FaDrumstickBite,
    FaGamepad,
    FaUsers,
    FaUserAlt,
} from "react-icons/fa";

const NarutoRainNavbar = () => {
    // only read values from context here — do NOT call addXP in the navbar
    const {
        level = 1,
        xp = 0,
        xpForNextLevel = 100,
        xpGain = 0,
        showXPGain = false,
    } = useXP();

    const xpPercent = Math.min((xp / xpForNextLevel) * 100, 100);

    const navLinks = [
        { path: "/", label: "Home", icon: <FaHome /> },
        { path: "/recipes", label: "Recipes", icon: <FaDrumstickBite /> },
        { path: "/queue", label: "Queue", icon: <FaGamepad /> },
        { path: "/community", label: "Community", icon: <FaUsers /> },
    ];

    return (
        <div className="relative overflow-hidden font-mono bg-black text-white">
            {/* Naruto Rain (visual only) */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-naruto-fall absolute text-red-400"
                        style={{
                            top: `${-10 - i * 6}%`,
                            left: `${Math.random() * 90}%`,
                            fontSize: `${1 + Math.random() * 2}rem`,
                            animationDuration: `${10 + Math.random() * 6}s`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    >
                        🍥
                    </div>
                ))}
            </div>

            {/* Navbar */}
            <header className="z-10 relative bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-b border-red-600 shadow-lg backdrop-blur-md">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center font-semibold text-white relative">
                    {/* Logo */}
                    <div className="absolute left-6 flex items-center gap-3">
                        <span className="text-red-400 text-2xl tracking-widest font-bold drop-shadow">
                            🍥OTAKUBITES
                        </span>
                    </div>

                    {/* Center Nav */}
                    <ul className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-wider">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="flex items-center gap-2 hover:text-red-400 transition duration-300"
                                >
                                    {link.icon} {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Profile / XP */}
                    <div className="absolute right-6 flex items-center gap-4 text-xs">
                        <div className="hidden md:block text-right">
                            <div className="flex items-center gap-2">
                                <FaUserAlt className="text-red-300 text-lg" />
                                <span>Lv {level}</span>
                            </div>

                            <div className="w-24 bg-red-400/50 rounded h-2 mt-1 overflow-hidden">
                                <div
                                    className="bg-red-400 h-2 rounded transition-all duration-500"
                                    style={{ width: `${xpPercent}%` }}
                                />
                            </div>
                        </div>

                        {/* Floating +XP (shows when context sets showXPGain=true) */}
                        {showXPGain && (
                            <div className="absolute -top-4 right-0 text-red-400 font-bold select-none pointer-events-none text-sm">
                                +{xpGain} XP
                            </div>
                        )}

                        {/* mobile menu placeholder */}
                        <button className="md:hidden text-2xl text-white">☰</button>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default NarutoRainNavbar;
