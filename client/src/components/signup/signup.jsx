import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Signup = ({ onSignupSuccess }) => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        console.log('Signing with:', formData);

        // Simulate API
        setTimeout(() => {
            setIsSubmitting(false);
            if (onSignupSuccess) {
                onSignupSuccess(formData);
            }
        }, 2000);
    };

    return (
        <section className="relative h-screen w-screen bg-gradient-to-br from-[#0B0C10] to-[#0B0C10] 
      text-white flex items-center justify-center overflow-hidden">

            {/* Card */}
            <motion.div
                className="relative z-10 w-full max-w-md bg-[#1a1a1a]/80 border border-[#FF7EB6]/40 
        rounded-2xl p-10 shadow-lg shadow-[#FF7EB6]/20 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Title */}
                <motion.h1
                    className="text-center text-3xl md:text-4xl font-extrabold  mb-8 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Create an Account
                </motion.h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2 font-semibold">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Your anime alias..."
                            className="w-full p-3 rounded-lg bg-black/70 text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter you Email"
                            className="w-full p-3 rounded-lg bg-black/70 
              text-white focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-lg bg-black/70
              text-white focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 font-semibold">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            className="w-full p-3 rounded-lg bg-black/70 
              text-white focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        type="submit"
                        className="w-full py-3 bg-[#FF7EB6] text-black rounded-full font-semibold shadow-lg 
            hover:bg-[#ff649f] transition disabled:bg-pink-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Signing up...' : 'Signup'}
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default Signup;