import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../Api/axios";
import { getRecipesURL } from "../../Api/apiEndpoints";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get(getRecipesURL);
        setRecipes(res.data);
      } catch (err) {
        console.error("Error fetching recipes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-black text-white">
        <p>Loading recipes...</p>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1a1a1a] to-[#2A0A14] text-white py-16 px-6 md:px-12 overflow-hidden">
      {/* Title */}
      <div className="flex justify-center items-center mb-12">
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-[#FF7EB6] text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Anime Recipes
        </motion.h1>
        <Link to="/recipes/add">
          <motion.button
            className="ml-4 bg-[#FF7EB6] text-black py-2 px-4 rounded-full font-semibold shadow-lg hover:bg-[#ff649f] transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add Recipe
          </motion.button>
        </Link>
      </div>

      {/* Pinterest-style Masonry Cards */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 z-10 relative">
        {recipes.map((recipe, index) => (
          <motion.div
            key={recipe._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="break-inside-avoid bg-[#0B0C10]/90 border border-[#1F2833] 
                       p-5 rounded-2xl shadow-md hover:shadow-pink-500/30 
                       transition transform hover:-translate-y-1 backdrop-blur-sm"
          >
            {recipe.image && (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="text-lg font-semibold text-[#FF7EB6] mb-2">
              {recipe.title}
            </h2>
            <p className="text-sm text-gray-400 mb-4 line-clamp-3">
              {recipe.description}
            </p>

            <Link
              to={`/recipes/${recipe._id}`}
              className="text-[#FF7EB6] mt-2 block text-sm font-medium hover:text-[#ff649f] transition-colors"
            >
              View Recipe →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Recipes;
