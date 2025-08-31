import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import TagsInput from "../../components/TagsInput";

const CheckIcon = ({ className }) => (
  <svg className={`w-6 h-6 mr-2 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4 }}
    />
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    />
  </svg>
);

const ErrorIcon = ({ className }) => (
  <svg className={`w-6 h-6 mr-3 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../../Api/axios";
import { useNavigate } from "react-router-dom";
import TagsInput from "../../components/TagsInput";
import { addRecipeURL } from "../../Api/apiEndpoints";

const CheckIcon = ({ className }) => (
  <svg className={`w-6 h-6 mr-2 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <motion.circle
      cx="12"
      cy="12"
      r="10"
      strokeWidth="2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4 }}
    />
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    />
  </svg>
);

const ErrorIcon = ({ className }) => (
  <svg className={`w-6 h-6 mr-3 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
  </svg>
);

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    image: "",
    tags: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setTags = (newTags) => {
    setFormData({ ...formData, tags: newTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setNotification({ message: "", type: "" });

    try {
      const recipeData = {
        ...formData,
        ingredients: formData.ingredients.split(",").map((item) => item.trim()),
        steps: formData.steps.split(",").map((item) => item.trim()),
      };

      await api.post(addRecipeURL, recipeData, {
        timeout: 5000,
      });

      setNotification({ message: "Recipe added successfully!", type: "success" });

      setTimeout(() => {
        navigate("/recipes");
      }, 2000);
    } catch (error) {
      console.error(error);
      setNotification({ message: "There was an error adding the recipe.", type: "error" });
      setIsSubmitting(false);
      setTimeout(() => setNotification({ message: "", type: "" }), 5000);
    }
  };

  return (
    <section className="w-full min-h-screen 
  bg-gradient-to-br from-[#0B0C10] via-[#1a1a1a] to-[#2A0A14] 
  text-white flex justify-center items-start py-12">
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
          Add New Recipe
        </motion.h1>

        {/* Notification */}
        {notification.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center justify-center mb-6 text-lg font-semibold ${notification.type === "success" ? "text-green-400" : "text-red-400"
              }`}
          >
            {notification.type === "success" ? <CheckIcon className="text-green-400" /> : <ErrorIcon className="text-red-400" />}
            <span>{notification.message}</span>
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Title", name: "title", type: "text", placeholder: "Enter recipe title" },
            { label: "Description", name: "description", type: "textarea", placeholder: "Write a short description" },
            { label: "Ingredients", name: "ingredients", type: "text", placeholder: "Ingredients (comma separated)" },
            { label: "Steps", name: "steps", type: "text", placeholder: "Steps (comma separated)" },
            { label: "Image URL", name: "image", type: "text", placeholder: "https://..." },
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-gray-300 mb-2 font-semibold">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-lg bg-black/70 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                  rows="4"
                  required={field.name !== "image"}
                  disabled={isSubmitting}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full p-3 rounded-lg bg-black/70 text-white 
                  focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] transition disabled:opacity-50"
                  required={field.name !== "image"}
                  disabled={isSubmitting}
                />
              )}
            </div>
          ))}

          {/* Tags */}
          <div>
            <label className="block text-gray-300 mb-2 font-semibold">Tags</label>
            <TagsInput tags={formData.tags} setTags={setTags} />
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
            type="submit"
            className="w-full py-3 bg-[#FF7EB6] text-black rounded-full font-semibold shadow-lg 
            hover:bg-[#ff649f] transition disabled:bg-pink-900 disabled:text-gray-300 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default AddRecipe;
