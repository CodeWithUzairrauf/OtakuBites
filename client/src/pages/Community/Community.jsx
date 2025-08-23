import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/community/signup');
  };

  return (
    <section className="relative h-screen w-screen bg-gradient-to-br from-[#0B0C10] via-[#1F1F1F] to-[#0B0C10] 
      text-white flex flex-col items-center justify-center px-6 md:px-20 overflow-hidden">

      {/* Soft Sakura Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF7EB6]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#FFB6D5]/20 blur-3xl rounded-full"></div>
      </div>

      {/* Wrapper to center heading + card together */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-10">
        {/* Heading */}
        <motion.h1
          className="text-center text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-wide"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Otaku Community
        </motion.h1>

        {/* Card */}
        <motion.div
          className="max-w-2xl border border-[#FF7EB6]/40 bg-[#1a1a1a]/80 rounded-2xl p-8 text-gray-200 
          shadow-lg shadow-[#FF7EB6]/20 backdrop-blur-md text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="mb-6 text-lg text-gray-300 leading-relaxed">
            Our Sakura-powered community is coming soon!
            Connect, share, and grow with fellow anime & food lovers.
          </p>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleJoin}
            className="px-8 py-3 rounded-full font-semibold text-black shadow-lg 
            bg-[#FF7EB6] hover:bg-[#ff649f] transition-all tracking-wide"
          >
            Join the Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Community;
