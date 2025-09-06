import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import {
    FaHome,
    FaDrumstickBite,
    FaGamepad,
    FaUsers,
    FaTimes,
    FaBars,
} from "react-icons/fa";

const Navbar = ({ isLoggedIn, username, onLogout, showLoginButton }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { path: "/", label: "Home", icon: <FaHome /> },
        { path: "/recipes", label: "Recipes", icon: <FaDrumstickBite /> },
        { path: "/community", label: "Community", icon: <FaUsers /> },
    ];

    return (
        <div className="relative font-mono overflow-hidden">

            {/* Navbar */}
            <header className="z-20 relative w-full bg-gradient-to-r from-[#0B0C10] to-[#1F2833] shadow-lg">
                <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between font-semibold text-white">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-3 transition-all">
                            <span className="text-[#F5F5F5] text-2xl tracking-widest drop-shadow-sm">
                                🍥 OtakuBites
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <ul className="hidden md:flex items-center space-x-6 text-sm uppercase tracking-wider">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-[#FF7EB6] hover:text-black"
                                >
                                    {link.icon} {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        {isLoggedIn ? (
                            <>
                                <span className="text-white">Welcome, {username}</span>
                                <button
                                    onClick={onLogout}
                                    className="px-5 py-2 rounded-2xl tracking-widest font-bold text-sm 
                                    bg-[#FF7EB6] text-black hover:bg-[#ff649f] transition-all duration-300 shadow-md"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 rounded-2xl tracking-widest font-bold text-sm 
                                    bg-transparent border-2 border-[#FF7EB6] text-white hover:bg-[#FF7EB6] hover:text-black transition-all duration-300"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-5 py-2 rounded-2xl tracking-widest font-bold text-sm 
                                    bg-[#FF7EB6] text-black hover:bg-[#ff649f] transition-all duration-300 shadow-md"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        className="md:hidden text-2xl text-white"
                        onClick={toggleMobileMenu}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                    </motion.button>
                </nav>
            </header>

            {/* Mobile Menu (Fullscreen Overlay) */}
            <div
                className={`md:hidden fixed inset-0 bg-[#0B0C10] bg-opacity-95 z-30 flex flex-col items-center justify-center transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                <motion.button
                    className="absolute top-6 right-6 text-2xl text-[#FF7EB6] z-50"
                    onClick={toggleMobileMenu}
                    whileTap={{ rotate: 90 }}
                >
                    <FaTimes />
                </motion.button>
                <ul className="flex flex-col items-center space-y-8 text-lg uppercase tracking-wider text-white">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className="flex items-center gap-3 transition duration-300 hover:text-[#FF7EB6]"
                                onClick={() => setMobileMenuOpen(false)} // Close menu on link click
                            >
                                {link.icon} {link.label}
                            </Link>
                        </li>
                    ))}
                    <div className="mt-8 flex flex-col items-center gap-6">
                        {isLoggedIn ? (
                            <>
                                <span className="text-white text-lg">Welcome, {username}   </span>
                                <button
                                    onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                                    className="px-6 py-3 rounded-2xl bg-[#FF7EB6] text-black font-bold tracking-widest 
                                    hover:bg-[#ff649f] transition-all duration-300 shadow-lg"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-6 py-3 rounded-2xl bg-transparent border-2 border-[#FF7EB6] text-white font-bold tracking-widest 
                                    hover:bg-[#FF7EB6] hover:text-black transition-all duration-300"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-3 rounded-2xl bg-[#FF7EB6] text-black font-bold tracking-widest 
                                    hover:bg-[#ff649f] transition-all duration-300 shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;