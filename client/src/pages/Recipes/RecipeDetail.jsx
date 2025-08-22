import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipeData } from '../../components/data/RecipeData';
import { motion } from 'framer-motion';

export default function RecipeDetail() {
    const { id } = useParams();
    const recipe = recipeData.find(r => r.id === id);

    if (!recipe) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <h1 className="text-red-500 text-xl">Recipe not found.</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-19">
            <Link to="/recipes" className="text-red-400 hover:u8nderline">&larr; Back to Recipes</Link>

            <motion.h1
                className="flex items-center gap-3 text-2xl md:text-4xl font-bold text-red-400 mb-6 mt-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                    {recipe.icon}
                {recipe.name}
            </motion.h1>

            <p className="text-gray-300 mb-6">{recipe.desc}</p>

            <div className="bg-[#1a1a1a] p-6 rounded-xl border border-red-500 shadow-lg space-y-4">
                <h2 className="text-2xl font-semibold text-red-400">Ingredients</h2>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {recipe.Ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold text-red-400 mt-6">Instructions</h2>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                    {recipe.Instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>  
        </div>
    );
}
