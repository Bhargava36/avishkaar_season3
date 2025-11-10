// "use client";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaLeaf,
//   FaHeartbeat,
//   FaTrash,
//   FaSolarPanel,
//   FaCity,
//   FaUsers,
//   FaBusAlt,
//   FaLightbulb,
//   FaGlobeAsia,
// } from "react-icons/fa";

// const onlineThemes = [
//   {
//     title: "Digital Empowerment for Rural Communities",
//     detail:
//       "Use technology to improve education, healthcare, agriculture, or finance access for rural areas.",
//     icon: <FaUsers className="text-cyan-400" />,
//   },
//   {
//     title: "Urban Mobility & Traffic Management",
//     detail:
//       "Solve traffic jams, promote smart transport, or improve public transit systems in cities.",
//     icon: <FaBusAlt className="text-yellow-400" />,
//   },
//   {
//     title: "Agriculture & Food Technology",
//     detail:
//       "Create solutions to help farmers manage crops better, reduce food waste, or improve food delivery.",
//     icon: <FaLeaf className="text-green-400" />,
//   },
//   {
//     title: "Medical & Health",
//     detail:
//       "Improve patient care, disease detection, medical records, or healthcare access through technology.",
//     icon: <FaHeartbeat className="text-red-400" />,
//   },
//   {
//     title: "Waste Management & Recycling",
//     detail:
//       "Innovate in collection, segregation, reuse, or recycling methods to build a cleaner environment.",
//     icon: <FaTrash className="text-yellow-500" />,
//   },
//   {
//     title: "Renewable & Sustainable Energy",
//     detail:
//       "Develop solutions in solar, wind, or green energy to reduce carbon emissions and save power.",
//     icon: <FaSolarPanel className="text-cyan-500" />,
//   },
//   {
//     title: "Tourism & Travel",
//     detail:
//       "Make tourism smarter and safer with crowd management, eco-tourism, or traveler health assistance.",
//     icon: <FaGlobeAsia className="text-purple-400" />,
//   },
//   {
//     title: "Student Innovation (Open Theme)",
//     detail:
//       "Unconventional and creative ideas that don’t fit into other themes but can create a large impact.",
//     icon: <FaLightbulb className="text-yellow-300" />,
//   },
// ];

// export default function OnlineTheme() {
//   const [activeIndex, setActiveIndex] = useState(null);

//   return (
//     <section className="mt-16 max-w-6xl mx-auto">
      
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-6xl md:text-7xl font-bold text-center text-cyan-600 orbitron mb-12"
//       >
//          Themes Breakdown – What Problems You Can Solve?
//       </motion.h2>
      

//       {/* Themes Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         {onlineThemes.map((theme, index) => (
//           <motion.button
//             key={index}
//             whileHover={{ scale: 1.05 }}
//             onClick={() => setActiveIndex(index)}
//             className={`flex flex-col items-center gap-3 p-6 rounded-xl shadow-md border transition ${
//               activeIndex === index
//                 ? "bg-gradient-to-br from-cyan-400 via-black to-purple-600 border-purple-600 text-white"
//                 : "bg-slate-900 border-purple-600/20 text-gray-200"
//             }`}
//           >
//             <span className="text-2xl">{theme.icon}</span>
//             <span className="font-semibold orbitron text-center">
//               {theme.title}
//             </span>
//           </motion.button>
//         ))}
//       </div>

//       {/* Modal */}
//       <AnimatePresence>
//         {activeIndex !== null && (
//           <motion.div
//             className="fixed overlay inset-0 top-10 bg-black/90 flex items-center h-screen justify-center z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={() => setActiveIndex(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
//                          bg-black p-8 rounded-2xl max-w-2xl w-[90%] 
//                          border border-cyan-400/30 shadow-2xl text-center"
//             >
//               {/* Title & Icon */}
//               <div className="flex flex-col items-center gap-4 mb-6">
//                 <span className="text-5xl">{onlineThemes[activeIndex].icon}</span>
//                 <h3 className="text-2xl font-bold orbitron text-cyan-600">
//                   {onlineThemes[activeIndex].title}
//                 </h3>
//               </div>

//               {/* Details */}
//               <p className="text-gray-300 leading-relaxed mb-6">
//                 {onlineThemes[activeIndex].detail}
//               </p>

//               {/* Close Button */}
//               <button
//                 onClick={() => setActiveIndex(null)}
//                 className="px-6 py-2 rounded-lg bg-gradient-to-br from-purple-600 via-black to-cyan-400 text-white font-semibold hover:scale-105 transition"
//               >
//                 Close
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaHeartbeat,
  FaTrash,
  FaSolarPanel,
  FaCity,
  FaUsers,
  FaBusAlt,
  FaLightbulb,
  FaGlobeAsia,
} from "react-icons/fa";

const onlineThemes = [
  {
    title: "Digital Empowerment for Rural Communities",
    detail:
      "Use technology to improve education, healthcare, agriculture, or finance access for rural areas.",
    icon: <FaUsers className="text-cyan-400" />,
  },
  {
    title: "Urban Mobility & Traffic Management",
    detail:
      "Solve traffic jams, promote smart transport, or improve public transit systems in cities.",
    icon: <FaBusAlt className="text-yellow-400" />,
  },
  {
    title: "Agriculture & Food Technology",
    detail:
      "Create solutions to help farmers manage crops better, reduce food waste, or improve food delivery.",
    icon: <FaLeaf className="text-green-400" />,
  },
  {
    title: "Medical & Health",
    detail:
      "Improve patient care, disease detection, medical records, or healthcare access through technology.",
    icon: <FaHeartbeat className="text-red-400" />,
  },
  {
    title: "Waste Management & Recycling",
    detail:
      "Innovate in collection, segregation, reuse, or recycling methods to build a cleaner environment.",
    icon: <FaTrash className="text-yellow-500" />,
  },
  {
    title: "Renewable & Sustainable Energy",
    detail:
      "Develop solutions in solar, wind, or green energy to reduce carbon emissions and save power.",
    icon: <FaSolarPanel className="text-cyan-500" />,
  },
  {
    title: "Tourism & Travel",
    detail:
      "Make tourism smarter and safer with crowd management, eco-tourism, or traveler health assistance.",
    icon: <FaGlobeAsia className="text-purple-400" />,
  },
  {
    title: "Student Innovation (Open Theme)",
    detail:
      "Unconventional and creative ideas that don’t fit into other themes but can create a large impact.",
    icon: <FaLightbulb className="text-yellow-300" />,
  },
];

export default function OnlineTheme() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="mt-16 max-w-6xl mx-auto px-4">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-cyan-600 orbitron mb-12"
      >
        Themes Breakdown – What Problems You Can Solve?
      </motion.h2>

      {/* Accordion Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {onlineThemes.map((theme, index) => (
          <motion.div
            key={index}
            className={`rounded-xl border shadow-md transition overflow-hidden ${
              activeIndex === index
                ? "bg-slate-800 border-slate-600 text-white"
                : "bg-slate-900 border-slate-600/20 text-gray-200"
            }`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="flex flex-col items-center text-center p-6 w-full hover:opacity-90 transition"
            >
              <span className="text-3xl mb-3">{theme.icon}</span>
              <span className="font-semibold orbitron text-lg">
                {theme.title}
              </span>
            </button>

            {/* Accordion Content */}
            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-6 pb-6 text-center"
                >
                  <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                    {theme.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
