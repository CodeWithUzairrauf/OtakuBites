import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CommunityLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        console.log('Logging in with:', formData);

        // Simulate an API call
        setTimeout(() => {
            setIsSubmitting(false);
            // Handle successful login, e.g., redirect to the community page
        }, 2000);
    };

    return (
        <section className="relative min-h-screen bg-black text-white py-16 px-6 md:px-20 overflow-hidden">

            <motion.h1
                className="text-center text-3xl md:text-5xl font-bold text-red-400 mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Login to the Otaku Community
            </motion.h1>

            <motion.form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-zinc-900 border border-red-400 rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="mb-6">
                    <label className="block text-zinc-300 mb-2 font-semibold">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Your anime alias..."
                        className="w-full p-3 rounded-lg bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition disabled:opacity-50"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-zinc-300 mb-2 font-semibold">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Your secret jutsu..."
                        className="w-full p-3 rounded-lg bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition disabled:opacity-50"
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    type="submit"
                    className="w-full py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:bg-red-600 transition disabled:bg-red-800 disabled:cursor-not-allowed"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                </motion.button>
            </motion.form>
        </section>
    );
};

export default CommunityLogin;
