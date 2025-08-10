import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiChopsticks, GiNoodles, GiSushis } from 'react-icons/gi';
import { GiMeat } from "react-icons/gi";
import { FaBoxOpen } from 'react-icons/fa';
import { FaBowlRice } from "react-icons/fa6";
import { title } from 'framer-motion/client';

const recipes = [
  {
    title: 'Ichiraku Ramen',
    description: "Naruto’s favorite miso ramen from his beloved Ichiraku shop.",
    icon: <GiNoodles size={30} className="text-red-400" />,
  },
  {
    title: 'Omurice',
    description: "Seen in countless anime cafes — fluffy omelette over ketchup rice with cute art.",
    icon: <FaBoxOpen size={30} className="text-red-400" />,
  },
  {
    title: 'Sushi Platter',
    description: "Inspired by Tokyo Ghoul’s high-end sushi bar scene.",
    icon: <GiSushis size={30} className="text-red-400" />,
  },
  {
    title: 'Bento Box',
    description: "School lunch like the ones in My Hero Academia.",
    icon: <GiChopsticks size={30} className="text-red-400" />,
  },
  {
    title: 'Onigiri',
    description: "Rice ball just like the ones in One Piece.",
    icon: <FaBowlRice size={30} className="text-red-400" />,
  },
  {
    title: 'Takoyaki',
    description: "Osaka street food often featured in slice-of-life festival anime scenes.",
    icon: <GiMeat size={30} className="text-red-400" />,
  },
]

const Recipes = () => {
  return (
    <section className="relative min-h-screen bg-black text-white py-16 px-6 md:px-20 overflow-hidden">

      <motion.h1
        className="text-3xl md:text-5xl font-medium text-red-400 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className='text-center p-4'>Anime Recipes</div>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {recipes.map(({ id, title, description, icon, link }) => (
          <motion.div
            key={id}
            className="bg-zinc-900 border border-red-400 rounded-xl p-6"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 80, 80, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: id * 0.1 }}
          >
            <div className="mb-4">{icon}</div>
            <h2 className="text-xl font-semibold text-red-300 mb-2">{title}</h2>
            <p className="text-sm text-zinc-300 mb-4">{description}</p>
            <Link to={`/recipes/${title}`} className="text-red-400 hover:underline text-sm">
              View Recipe →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Recipes;
