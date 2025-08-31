import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../Api/axios.js'; // ✅ ensure lowercase "api"
import { registerURL } from '../../Api/apiEndpoints.js';

const Signup = ({ onSignupSuccess }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null); // ✅ added error state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const response = await api.post(registerURL, formData);
            console.log("Signup successful:", response.data);

            if (onSignupSuccess) {
                onSignupSuccess(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An unexpected error occurred.');
            console.error("Signup failed:", err.response?.data || err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative min-h-screen w-full 
      bg-gradient-to-br from-[#0B0C10] via-[#1a1a1a] to-[#2A0A14] bg-fixed
      text-white flex items-center justify-center py-12 overflow-hidden">

            {/* Card */}
            <motion.div
                className="relative z-10 w-full max-w-md bg-[#1a1a1a]/90 border border-[#FF7EB6]/40 
        rounded-2xl p-10 shadow-lg shadow-[#FF7EB6]/20 backdrop-blur-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Title */}
                <motion.h1
                    className="text-center text-3xl md:text-4xl font-extrabold mb-8 drop-shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Create an Account
                </motion.h1>

                {/* Error */}
                {error && (
                    <motion.div
                        className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-center mb-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {error}
                    </motion.div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {["username", "email", "password", "confirmPassword"].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-300 mb-2 font-semibold capitalize">
                                {field === "confirmPassword" ? "Confirm Password" : field}
                            </label>
                            <input
                                type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={
                                    field === "username"
                                        ? "Your anime alias..."
                                        : field === "email"
                                            ? "Enter your Email"
                                            : `Enter your ${field}`
                                }
                                className="w-full p-3 rounded-lg bg-black/70 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    ))}

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
