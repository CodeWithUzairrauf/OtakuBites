import { motion } from 'framer-motion';
import { GiNoodles, GiGameConsole, GiChatBubble, GiBowlOfRice } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};



export default function Home() {
  const features = [
    {
      icon: <GiNoodles className="text-red-400 text-3xl" />,
      title: 'Recipes',
      desc: 'Cook like your favorite anime characters with step-by-step guides.',
      link: "/recipes"
    },
    {
      icon: <GiGameConsole className="text-red-400 text-3xl" />,
      title: 'Queue',
      desc: 'Track your anime cravings with a smart, gamified watchlist.',
      link: "/queue"
    },
    {
      icon: <GiChatBubble className="text-red-400 text-3xl" />,
      title: 'Community',
      desc: 'Connect with fellow otakus, share your dishes & collections.',
      link: "/community"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-black text-white flex flex-col items-center justify-center px-4">

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 md:mb-40"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-red-400 font-mono">🍥OtakuBites</h1>
        <p className="text-lg mt-2 text-gray-300">Where anime cravings meet culinary creations.</p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-4 py-3 md:px-6 md:py-4 bg-red-500 hover:bg-red-600 transition rounded-full font-bold text-sm shadow-lg shadow-red-500/20"
        >
          <Link to="/recipes">
            Start Exploring
          </Link>
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl w-full mt-0 mb-6">
        {features.map((item, i) => (
          <motion.div
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-[#1a1a1a] border border-red-500 p-6 rounded-xl m-0 shadow-md hover:shadow-red-400/20 transition hover:scale-105"
          >
            <div className="text-xl mb-2 text-red-400 flex items-center gap-2 font-mono">
              {item.icon} <strong>{item.title}</strong>
            </div>
            <p className="text-sm text-gray-300">{item.desc}</p>
            <Link to={item.link} className="text-red-500 mt-4 block text-sm hover:underline">Explore →</Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}