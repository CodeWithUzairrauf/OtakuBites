import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/community/signup');
  };

  return (
    <>
      <section className="relative min-h-screen bg-black text-white py-16 px-6 md:px-20 overflow-hidden">
        <motion.h1
          className="text-center text-3xl md:text-5xl font-bold text-red-400 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Otaku Community
        </motion.h1>
        <motion.div
          className="border border-red-400 bg-zinc-900 rounded-xl p-6 text-zinc-300 mt-20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="mb-6">
            Community features coming soon! Stay tuned for forums and chatrooms.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleJoin}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:bg-red-600 transition"
          >
            Join the Community
          </motion.button>
        </motion.div>
      </section>
    </>
  );
};

export default Community;
