// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const ImportantDates = () => {
//   const dates = [
//     { title: "Registrations Open", date: "Oct 23, 2025" },
//     { title: "Registrations Close", date: "Nov 20, 2025" },
//     { title: "Problem Statements Release", date: "Nov 25, 2025 - 10:00 AM" },
//     { title: "Hackathon Begins", date: "Nov 25, 2025 - 11:00 AM" },
//     { title: "Hackathon Ends", date: "Nov 26, 2025 - 11:00 AM" },
//     { title: "Project Submission Deadline", date: "Nov 26, 2025 - 09:00 AM to 11:00 AM" },
//     { title: "Online Pitching", date: "Nov 26, 2025 - 10:00 AM Onwards" },
//     { title: "Results Announcement", date: "Nov 26, 2025" },
//   ];

//   const [activeIndex, setActiveIndex] = useState(-1);

//   useEffect(() => {
//     const today = new Date();

//     // Convert and compare each event date
//     const currentIndex = dates.findIndex((d) => {
//       const cleanDate = d.date.split(" - ")[0]; // remove time
//       const eventDate = new Date(cleanDate);
//       return eventDate > today;
//     });

//     // If today is after all events, highlight the last one
//     setActiveIndex(currentIndex === -1 ? dates.length - 1 : currentIndex - 1);
//   }, []);

//   return (
//     <div className="mt-20 max-w-7xl mx-auto px-6">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-6xl md:text-7xl font-bold text-center text-cyan-600 orbitron mb-16"
//       >
//         Important Dates
//       </motion.h2>

//       <div className="relative flex flex-wrap justify-center gap-8 md:gap-10">
//         {dates.map((item, i) => (
//           <div key={i} className="relative flex items-center">
//             {/* Connector Line */}
//             {i !== 0 && (
//               <div
//                 className={`absolute left-[-3rem] top-1/2 -translate-y-1/2 w-12 h-[4px] transition-all duration-700 ${
//                   i <= activeIndex ? "bg-cyan-500" : "bg-slate-700/40"
//                 }`}
//               ></div>
//             )}

//             {/* Card */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               className={`relative z-10 w-64 rounded-xl p-6 border transition duration-500 shadow-xl bg-slate-900 flex flex-col items-center text-center ${
//                 i === activeIndex
//                   ? "border-cyan-400 shadow-[0_0_25px_#00f6ff]"
//                   : i < activeIndex
//                   ? "border-cyan-500/60"
//                   : "border-slate-600/50"
//               }`}
//             >
//               {/* Top Dot */}
//               <div
//                 className={`absolute -top-3 w-4 h-4 rounded-full border-2 transition-all duration-500 ${
//                   i <= activeIndex
//                     ? "border-cyan-400 bg-cyan-500"
//                     : "border-slate-700 bg-slate-800"
//                 }`}
//               ></div>

//               {/* Content */}
//               <h3
//                 className={`text-lg orbitron font-semibold mb-2 ${
//                   i <= activeIndex ? "text-cyan-400" : "text-gray-300"
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p className="text-gray-400 text-sm">{item.date}</p>
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImportantDates;
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// const ImportantDates = () => {
//   const dates = [
//     { title: "Registrations Open", date: "Oct 23, 2025" },
//     { title: "Registrations Close", date: "Nov 20, 2025" },
//     { title: "Problem Statements Release", date: "Nov 25, 2025 - 10:00 AM" },
//     { title: "Hackathon Begins", date: "Nov 25, 2025 - 11:00 AM" },
//     { title: "Hackathon Ends", date: "Nov 26, 2025 - 11:00 AM" },
//     { title: "Project Submission Deadline", date: "Nov 26, 2025 - 09:00 AM to 11:00 AM" },
//     { title: "Online Pitching", date: "Nov 26, 2025 - 10:00 AM Onwards" },
//     { title: "Results Announcement", date: "Nov 26, 2025" },
//   ];

//   const [activeIndex, setActiveIndex] = useState(-1);

//   useEffect(() => {
//     const today = new Date();

//     const currentIndex = dates.findIndex((d) => {
//       const cleanDate = d.date.split(" - ")[0];
//       const eventDate = new Date(cleanDate);
//       return eventDate > today;
//     });

//     setActiveIndex(currentIndex === -1 ? dates.length - 1 : currentIndex - 1);
//   }, []);

//   return (
//     <div className="mt-20 max-w-5xl mx-auto px-6">
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="text-6xl md:text-7xl font-bold text-center text-cyan-500 orbitron mb-20"
//       >
//         Important Dates
//       </motion.h2>

//       <div className="relative">
//         {/* Center vertical line */}
//         <div className="absolute left-1/2 top-0 w-[3px] h-full bg-slate-700/40 -translate-x-1/2"></div>

//         {dates.map((item, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: i * 0.1 }}
//             className={`relative flex items-center justify-between mb-16 ${
//               i % 2 === 0 ? "flex-row-reverse" : ""
//             }`}
//           >
//             {/* Connector dot */}
//             <div
//               className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 ${
//                 i <= activeIndex
//                   ? "border-cyan-400 bg-cyan-500"
//                   : "border-slate-600 bg-slate-800"
//               }`}
//             ></div>

//             {/* Connector line segment */}
//             {i < dates.length - 1 && (
//               <div
//                 className={`absolute left-1/2 top-6 -translate-x-1/2 w-[3px] h-16 ${
//                   i < activeIndex ? "bg-cyan-500" : "bg-slate-700/40"
//                 }`}
//               ></div>
//             )}

//             {/* Card */}
//             <div
//               className={`w-[45%] rounded-xl border p-6 shadow-xl bg-slate-900 transition-all duration-500 ${
//                 i === activeIndex
//                   ? "border-cyan-400 shadow-[0_0_25px_#00f6ff]"
//                   : i < activeIndex
//                   ? "border-cyan-500/50"
//                   : "border-slate-600/50"
//               }`}
//             >
//               <h3
//                 className={`text-xl font-semibold orbitron mb-2 ${
//                   i <= activeIndex ? "text-cyan-400" : "text-gray-300"
//                 }`}
//               >
//                 {item.title}
//               </h3>
//               <p className="text-gray-400 text-sm">{item.date}</p>
//             </div>

//             <div className="w-[45%]"></div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImportantDates;
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const ImportantDates = () => {
  const dates = [
    { title: "Registrations Open", date: "Oct 23, 2025" },
    { title: "Registrations Close", date: "Nov 20, 2025" },
    { title: "Problem Statements Release", date: "Nov 25, 2025 - 10:00 AM" },
    { title: "Hackathon Begins", date: "Nov 25, 2025 - 11:00 AM" },
    { title: "Hackathon Ends", date: "Nov 26, 2025 - 11:00 AM" },
    { title: "Project Submission Deadline", date: "Nov 26, 2025 - 09:00 AM to 11:00 AM" },
    { title: "Online Pitching", date: "Nov 26, 2025 - 10:00 AM Onwards" },
    { title: "Results Announcement", date: "Nov 26, 2025" },
  ];

  const defaultActiveDate = "Nov 25, 2025"; // default active date
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    // Compute active index
    const activeDate = new Date(defaultActiveDate);
    const index = dates.findIndex((d) => {
      const cleanDate = d.date.split(" - ")[0];
      const eventDate = new Date(cleanDate);
      return eventDate > activeDate;
    });
    setActiveIndex(index === -1 ? dates.length - 1 : index - 1);
  }, []);

  useEffect(() => {
    // Measure height of container for the progress line
    if (containerRef.current) {
      setLineHeight(containerRef.current.offsetHeight);
    }
  }, [containerRef.current, activeIndex]);

  return (
    <div className="mt-20 max-w-5xl mx-auto px-6 relative">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-bold text-center text-cyan-500 orbitron mb-20"
      >
        Important Dates
      </motion.h2>

      <div ref={containerRef} className="relative">
        {/* Full vertical line */}
        <div className="absolute left-1/2 top-0 w-[3px] h-full bg-slate-700/40 -translate-x-1/2"></div>

        {/* Active progress line */}
        {lineHeight > 0 && (
          <div
            className="absolute left-1/2 top-0 w-[3px] bg-cyan-500 -translate-x-1/2 transition-all duration-500"
            style={{
              height: `${((activeIndex + 1) / dates.length) * lineHeight}px`,
            }}
          ></div>
        )}

        {dates.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative flex items-center justify-between mb-16 ${
              i % 2 === 0 ? "flex-row-reverse" : ""
            }`}
          >
            {/* Connector dot */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 ${
                i <= activeIndex
                  ? "border-cyan-400 bg-cyan-500"
                  : "border-slate-600 bg-slate-800"
              }`}
            ></div>

            {/* Card */}
            <div
              className={`w-[45%] rounded-xl border p-6 shadow-xl bg-slate-900 transition-all duration-500 ${
                i === activeIndex
                  ? "border-cyan-400 shadow-[0_0_25px_#00f6ff]"
                  : i < activeIndex
                  ? "border-cyan-500/50"
                  : "border-slate-600/50"
              }`}
            >
              <h3
                className={`text-xl font-semibold orbitron mb-2 ${
                  i <= activeIndex ? "text-cyan-400" : "text-gray-300"
                }`}
              >
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.date}</p>
            </div>

            <div className="w-[45%]"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ImportantDates;
