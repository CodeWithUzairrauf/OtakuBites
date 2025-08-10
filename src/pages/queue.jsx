import React, { useState } from "react";
import { useXP } from "../pages/Home/XpContent"; // Adjust path as needed
import { motion, AnimatePresence } from "framer-motion";
import { FaPlusCircle } from "react-icons/fa";

const Queue = () => {
  const [queueItems, setQueueItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newAnime, setNewAnime] = useState({ title: '', description: '', image: '' });

  const { addXP } = useXP();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnime((prev) => ({ ...prev, [name]: value }));
  };

  // Add anime to queue and reward XP
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAnime.title.trim() || !newAnime.image.trim()) return;
    addXP(120);
    setQueueItems([...queueItems, newAnime]);
    setNewAnime({ title: '', description: '', image: '' });
    setShowModal(false);
  };


  return (
      <section className="relative min-h-screen bg-black text-white py-16 px-6 md:px-20 overflow-hidden">
        <motion.h1
          className="text-center text-3xl md:text-5xl font-bold text-red-400 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Animes in queue
        </motion.h1>

        <motion.div
          className="border border-red-400 bg-zinc-900 rounded-xl p-6 text-zinc-300 mt-20 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="mb-6">
            Track your anime cravings with a smart, gamified watchlist.
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-red-500 text-white rounded-full font-semibold shadow-lg hover:bg-red-600 transition"
          >
            <FaPlusCircle className="inline mr-2" />
            Add to Queue
          </motion.button>
        </motion.div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-6 md:px-20">
        {queueItems.map((anime, index) => (
          <div
            key={index}
            className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg flex flex-col"
          >
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-lg font-bold">{anime.title}</h3>
              <p className="text-sm text-gray-400 flex-grow">{anime.description}</p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 border border-red-500 rounded-xl p-6 w-full max-w-md shadow-lg shadow-red-500/50"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold text-red-400 mb-4">Add Anime to Queue</h2>
              <input
                type="text"
                placeholder="Anime Title"
                value={newAnime.title}
                onChange={(e) => setNewAnime({ ...newAnime, title: e.target.value })}
                className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={newAnime.description}
                onChange={(e) => setNewAnime({ ...newAnime, description: e.target.value })}
                className="w-full mb-3 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newAnime.image}
                onChange={(e) => setNewAnime({ ...newAnime, image: e.target.value })}
                className="w-full mb-4 p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 rounded bg-red-500 hover:bg-red-400 text-white"
                >
                  Add
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Queue;
