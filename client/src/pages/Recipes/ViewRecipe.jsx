import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../../Api/axios";
import { getRecipeByIdURL } from "../../Api/apiEndpoints";

const ViewRecipe = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await api.get(getRecipeByIdURL.replace(":id", id));
                setRecipe(res.data);
            } catch (err) {
                console.error("Error fetching recipe:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);

    if (loading) {
        return (
            <section className="flex justify-center items-center min-h-screen bg-black text-white">
                <p>Loading recipe...</p>
            </section>
        );
    }

    if (!recipe) {
        return (
            <section className="flex justify-center items-center min-h-screen bg-black text-white">
                <p>Recipe not found.</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0B0C10] via-[#1a1a1a] to-[#2A0A14] text-white py-12 px-6 md:px-20">
            <motion.div
                className="max-w-3xl mx-auto bg-zinc-900 border border-[#FF7EB6]/40 rounded-2xl shadow-lg shadow-[#FF7EB6]/20 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {recipe.image && (
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-72 object-cover"
                    />
                )}

                <div className="p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#FF7EB6] mb-4">
                        {recipe.title}
                    </h1>
                    <p className="text-gray-300 mb-6">{recipe.description}</p>

                    {/* Tags */}
                    {recipe.tags && recipe.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {recipe.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="bg-[#FF7EB6]/20 text-[#FF7EB6] text-xs px-3 py-1 rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Ingredients */}
                    {recipe.ingredients && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-[#FF7EB6] mb-2">
                                Ingredients
                            </h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {recipe.ingredients.map((ing, i) => (
                                    <li key={i}>{ing}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Steps */}
                    {recipe.steps && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-[#FF7EB6] mb-2">
                                Steps
                            </h2>
                            <ol className="list-decimal list-inside text-gray-300 space-y-2">
                                {recipe.steps.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ol>
                        </div>
                    )}

                    <Link
                        to="/recipes"
                        className="inline-block mt-4 px-6 py-2 bg-[#FF7EB6] text-black rounded-full font-semibold shadow-lg hover:bg-[#ff649f] transition"
                    >
                        ← Back to Recipes
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default ViewRecipe;
