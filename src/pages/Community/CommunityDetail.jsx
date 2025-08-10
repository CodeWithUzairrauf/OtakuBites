import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useXP } from '../Home/XpContent';

const Join = () => {
    const [formData, setFormData] = useState({ username: '', email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { addXP, xpGain } = useXP();
    const navigate = useNavigate();

    // State for the forum
    const [posts, setPosts] = useState([
    ]);
    const [newPostContent, setNewPostContent] = useState('');

    // For XP animation
    const count = useMotionValue(0);
    const rounded = useTransform(count, Math.round);

    useEffect(() => {
        if (isSubmitted) {
            const animation = animate(count, xpGain || 50, {
                duration: 1.5,
                ease: "easeOut"
            });
            return animation.stop;
        }
    }, [isSubmitted, xpGain]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        console.log('Joining community with:', formData);

        // Simulate API call
        setTimeout(() => {
            addXP(50); // Award 50 XP for joining
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        const newPost = {
            id: posts.length + 1,
            author: formData.username,
            content: newPostContent,
        };

        setPosts([...posts, newPost]);
        setNewPostContent('');
    };

    if (isSubmitted) {
        return (
            <section className="relative min-h-screen bg-black text-white py-16 px-6 md:px-20">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-red-400 mb-2 text-center">
                        Welcome to the Forum, {formData.username}!
                    </h1>
                    <motion.p
                        className="text-xl text-white-400 font-bold mb-8 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } }}
                    >
                        You've earned +<motion.span>{rounded}</motion.span> XP!
                    </motion.p>
                </motion.div>

                {/* Forum Posts */}
                <div className="space-y-6 max-w-3xl mx-auto">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            className="bg-zinc-900 border border-zinc-700 rounded-xl p-6 shadow-md"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <p className="text-red-400 font-semibold mb-2">{post.author}</p>
                            <p className="text-zinc-300">{post.content}</p>
                        </motion.div>
                    ))}
                </div>

                {/* New Post Form */}
                <motion.form
                    onSubmit={handlePostSubmit}
                    className="max-w-3xl mx-auto mt-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: posts.length * 0.15 }}
                >
                    <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-4 rounded-lg bg-black border border-red-500 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition h-28 resize-none"
                        required
                    />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full mt-4 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:bg-red-600 transition"
                    >
                        Post to Forum
                    </motion.button>
                </motion.form>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen bg-black text-white py-16 px-6 md:px-20 overflow-hidden">

            <motion.h1
                className="text-center text-3xl md:text-5xl font-bold text-red-400 mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Join the Otaku Community
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
                    <label className="block text-zinc-300 mb-2 font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
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
                    {isSubmitting ? 'Joining...' : 'Join Now'}
                </motion.button>
            </motion.form>
        </section>
    );
};

export default Join;
