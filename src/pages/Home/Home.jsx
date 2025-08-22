{/* 
  import { motion } from 'framer-motion';
import { GiNoodles, GiGameConsole, GiChatBubble } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import NarutoBg from "../../assets/naruto-bg.jpg";
import "../../Styles/index.css"

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
      icon: <GiNoodles className="text-[#FF7EB6] text-3xl" />,
      title: 'Recipes',
      desc: 'Cook like your favorite anime characters with step-by-step guides.',
      link: "/recipes"
    },
    {
      icon: <GiGameConsole className="text-[#FF7EB6] text-3xl" />,
      title: 'Queue',
      desc: 'Track your anime cravings with a smart, gamified watchlist.',
      link: "/queue"
    },
    {
      icon: <GiChatBubble className="text-[#FF7EB6] text-3xl" />,
      title: 'Community',
      desc: 'Connect with fellow otakus, share your dishes & collections.',
      link: "/community"
    }
  ];

  return (
    <div className="text-white flex flex-col items-center justify-center px-4">
<motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="relative text-center min-h-screen flex flex-col items-center justify-center 
          w-screen -mx-[calc((100vw-100%)/2)] overflow-hidden 
          bg-cover bg-center"
  style={{ backgroundImage: `url(${NarutoBg})` }}
>
  <div className="absolute inset-0 bg-black/60" />

  <h1 className="relative z-10 text-5xl font-extrabold font-mono text-[#F5F5F5] drop-shadow">
    🍥 OtakuBites
  </h1>

  <p className="relative z-10 text-lg mt-3 text-gray-300">
    Where anime cravings meet culinary creations.
  </p>

  <motion.button
    whileTap={{ scale: 0.95 }}
    whileHover={{ scale: 1.05 }}
    className="relative z-10 mt-8 px-6 py-3 rounded-full font-bold text-base shadow-lg 
            bg-[#FF7EB6] text-black tracking-wide transition-all hover:bg-[#ff649f]"
  >
    <Link to="/recipes">
      Start Exploring
    </Link>
  </motion.button>
</motion.div>

<div className="relative my-16 px-4 overflow-hidden w-full max-w-7xl">

  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 z-10">
    {features.map((item, i) => (
      <motion.div
        key={i}
        custom={i}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="bg-[#0B0C10]/90 border border-[#1F2833] p-6 rounded-2xl 
                shadow-md hover:shadow-pink-500/30 transition transform 
                hover:-translate-y-1 backdrop-blur-sm"
      >
        <div className="text-xl mb-3 flex items-center gap-3 font-mono text-[#F5F5F5]">
          {item.icon} <strong>{item.title}</strong>
        </div>
        <p className="text-sm text-gray-400">{item.desc}</p>
        <Link
          to={item.link}
          className="text-[#FF7EB6] mt-4 block text-sm font-medium hover:text-[#ff649f] transition-colors"
        >
          Explore →
        </Link>
      </motion.div>
    ))}
  </div>
</div>
    </div >
  );
}

  */}

import { motion } from 'framer-motion';
import { GiNoodles, GiGameConsole, GiChatBubble } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import "../../Styles/index.css"
import NarutoBg from "../../assets/naruto-bg.jpg";

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
      icon: <GiNoodles className="text-[#FF7EB6] text-3xl" />,
      title: 'Recipes',
      desc: 'Cook like your favorite anime characters with step-by-step guides.',
      link: "/recipes"
    },
    {
      icon: <GiGameConsole className="text-[#FF7EB6] text-3xl" />,
      title: 'Queue',
      desc: 'Track your anime cravings with a smart, gamified watchlist.',
      link: "/queue"
    },
    {
      icon: <GiChatBubble className="text-[#FF7EB6] text-3xl" />,
      title: 'Community',
      desc: 'Connect with fellow otakus, share your dishes & collections.',
      link: "/community"
    }
  ];

  return (
    <div className="text-white flex flex-col items-center justify-center px-4">

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center min-h-[500px] flex flex-col items-center justify-center 
    w-screen -mx-[calc((100vw-100%)/2)] mb-12 overflow-hidden 
    bg-cover bg-center"
        style={{ backgroundImage: `url(${NarutoBg})` }}
      >
        {/* Overlay to make text readable */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <h1 className="relative z-10 text-5xl font-extrabold font-mono text-[#F5F5F5] drop-shadow">
          🍥 OtakuBites
        </h1>

        <p className="relative z-10 text-lg mt-3 text-gray-300">
          Where anime cravings meet culinary creations.
        </p>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className="relative z-10 mt-8 px-6 py-3 rounded-full font-bold text-base shadow-lg 
      bg-[#FF7EB6] text-black tracking-wide transition-all hover:bg-[#ff649f]"
        >
          <Link to="/recipes">
            Start Exploring
          </Link>
        </motion.button>
      </motion.div>

      {/* Features Section */}
      <div className="relative mb-10 px-4 overflow-hidden">

        {/* Akatsuki Clouds Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="akatsuki-cloud cloud-1"></div>
          <div className="akatsuki-cloud cloud-2"></div>
          <div className="akatsuki-cloud cloud-3"></div>
        </div>

        {/* Cards Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 z-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-[#0B0C10]/90 border mx-6 mt-6 border-[#1F2833] p-6 rounded-2xl 
                shadow-md hover:shadow-pink-500/30 transition transform 
                hover:-translate-y-1 backdrop-blur-sm"
            >
              <div className="text-xl mb-3 flex items-center gap-3 font-mono text-[#F5F5F5]">
                {item.icon} <strong>{item.title}</strong>
              </div>
              <p className="text-sm text-gray-400">{item.desc}</p>
              <Link
                to={item.link}
                className="text-[#FF7EB6] mt-4 block text-sm font-medium hover:text-[#ff649f] transition-colors"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
