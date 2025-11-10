"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLeaf, FaHeartbeat, FaTrash, FaSolarPanel, FaBook, FaCity, FaMoneyBill, FaLightbulb } from "react-icons/fa";

const themes = [
  {
    title: "Agriculture",
    detail: "Innovative solutions to improve crop yield, sustainable farming, and supply chain management.",
    icon: <FaLeaf className="text-green-400" />,
  },
  {
    title: "Healthcare",
    detail: "Digital health platforms, AI diagnostics, and affordable solutions for better medical services.",
    icon: <FaHeartbeat className="text-red-400 " />,
  },
  {
    title: "Waste Management",
    detail: "Smart segregation, recycling systems, and efficient waste-to-energy solutions.",
    icon: <FaTrash className="text-yellow-400 " />,
  },
  {
    title: "Renewable Energy",
    detail: "Solar, wind, and green energy innovations to reduce carbon footprint.",
    icon: <FaSolarPanel className="text-cyan-400" />,
  },
  {
    title: "Education",
    detail: "Tech-driven learning solutions, e-learning platforms, and accessibility tools.",
    icon: <FaBook className="text-purple-400 " />,
  },
  {
    title: "Smart Cities",
    detail: "Urban planning, IoT-driven infrastructure, and sustainable mobility solutions.",
    icon: <FaCity className="text-blue-400 " />,
  },
  {
    title: "Finance",
    detail: "FinTech innovations, digital payments, and financial inclusion platforms.",
    icon: <FaMoneyBill className="text-green-500 " />,
  },
  {
    title: "Open Innovation",
    detail: "Unconventional ideas that don’t fit into other categories but can create large impact.",
    icon: <FaLightbulb className="text-yellow-300" />,
  },
];

export default function OfflineTheme() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="mt-16 max-w-6xl mx-auto">
      <h2 className="orbitron rubik-glitch text-4xl md:text-5xl font-bold text-center text-gray-300 mb-12 bg-gradient-to-b from-white to-blue-600/50 text-transparent bg-clip-text mb-8">
        Themes
      </h2>

      {/* Buttons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {themes.map((theme, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActiveIndex(index)}
            className={`flex flex-col items-center gap-3 p-6 rounded-xl shadow-md border transition ${
              activeIndex === index
                ? "bg-gradient-to-br from-cyan-400 via-black to-blue-600 border-blue-600 text-white"
                : "bg-black border-blue-600/20 text-gray-200"
            }`}
          >
            <span className="text-2xl">{theme.icon}</span>
            <span className="font-semibold orbitron">{theme.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
  {activeIndex !== null && (
    <motion.div
      className="fixed overlay inset-0 bg-black/90 flex items-center h-screen justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setActiveIndex(null)}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                   bg-black p-8 rounded-2xl max-w-2xl w-[90%] 
                   border border-cyan-400/30 shadow-2xl text-center"
      >
        {/* Title & Icon */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <span className="text-5xl">{themes[activeIndex].icon}</span>
          <h3 className="text-2xl font-bold orbitron text-cyan-600">
            {themes[activeIndex].title}
          </h3>
        </div>

        {/* Details */}
        <p className="text-gray-300 leading-relaxed mb-6">
          {themes[activeIndex].detail}
        </p>

        {/* Close Button */}
        <button
          onClick={() => setActiveIndex(null)}
          className="px-6 py-2 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-400 text-white font-semibold hover:scale-105 transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </section>
  );
}
