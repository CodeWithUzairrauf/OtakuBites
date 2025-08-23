import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CommunityLogin = ({ onLogin }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        console.log('Logging in with:', formData);

        // Simulate API
        setTimeout(() => {
            setIsSubmitting(false);
            if (onLogin) {
                onLogin(formData);
            }
        }, 2000);
    };

    return (
        <section className="relative h-screen w-screen bg-gradient-to-br from-[#0B0C10] to-[#0B0C10] 
      text-white flex items-center justify-center overflow-hidden">

            {/* Card */}
            <motion.div
                className="relative z-10 w-full max-w-md bg-[#1a1a1a] border border-[#FF7EB6]/40 
  rounded-2xl p-10 shadow-lg shadow-[#FF7EB6]/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Title */}
                <motion.h1
                    className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Welcome Back
                </motion.h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                            className="w-full p-3 rounded-lg bg-black/70 text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
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
                            className="w-full p-3 rounded-lg bg-black/70 text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                        type="submit"
                        className="w-full py-3 bg-[#FF7EB6] text-black rounded-full font-semibold shadow-lg 
            hover:bg-[#ff649f] transition disabled:bg-pink-900  disabled:text-gray-300 disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </motion.button>

                    <Link
                        to='/signup'
                        className="mt-4 block text-sm font-medium hover:text-[#ff649f] transition-colors text-center"
                    >
                        Don’t have an account?
                    </Link>
                </form>
            </motion.div>
        </section>
    );
};

export default CommunityLogin;
