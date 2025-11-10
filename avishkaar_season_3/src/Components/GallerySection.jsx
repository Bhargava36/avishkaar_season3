
// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// import hacimage1 from "../assets/Pics/Hackathon/one.webp";
// import hacimage2 from "../assets/Pics/Hackathon/two.webp";
// import hacimage3 from "../assets/Pics/Hackathon/three.webp";
// import hacimage4 from "../assets/Pics/Hackathon/four.webp";
// import hacimage5 from "../assets/Pics/Hackathon/five.webp";

// import funimage1 from "../assets/Pics/Funactivity/one.webp";
// import funimage2 from "../assets/Pics/Funactivity/two.webp";
// import funimage3 from "../assets/Pics/Funactivity/three.webp";
// import funimage4 from "../assets/Pics/Funactivity/four.webp";

// import inaimage1 from "../assets/Pics/Inauguration/one.webp";
// import inaimage2 from "../assets/Pics/Inauguration/two.webp";
// import inaimage4 from "../assets/Pics/Inauguration/four.webp";
// import inaimage5 from "../assets/Pics/Inauguration/five.webp";

// import nightimage1 from "../assets/Pics/Nightcamp/one.webp";
// import nightimage2 from "../assets/Pics/Nightcamp/two.webp";
// import nightimage3 from "../assets/Pics/Nightcamp/three.webp";
// import nightimage4 from "../assets/Pics/Nightcamp/four.webp";
// import nightimage5 from "../assets/Pics/Nightcamp/five.webp";

// import prizesimage1 from "../assets/Pics/Prizes/one.webp";
// import prizesimage2 from "../assets/Pics/Prizes/two.webp";
// import prizesimage3 from "../assets/Pics/Prizes/three.webp";
// import prizesimage4 from "../assets/Pics/Prizes/four.webp";

// const galleryItems = [
//   { id: 1, title: "Hackathon Moments", images: [hacimage1, hacimage2, hacimage3, hacimage4, hacimage5] },
//   { id: 2, title: "Fun Activities", images: [funimage1, funimage2, funimage3, funimage4] },
//   { id: 3, title: "Inauguration", images: [inaimage1, inaimage2, inaimage4, inaimage5] },
//   { id: 4, title: "Night Events", images: [nightimage1, nightimage2, nightimage3, nightimage4, nightimage5] },
//   { id: 5, title: "Award Ceremony", images: [prizesimage1, prizesimage2, prizesimage3, prizesimage4] },
// ];

// export default function GallerySection() {
//   const [currentIndexes, setCurrentIndexes] = useState(galleryItems.map(() => 0));

//   useEffect(() => {
//     const totalSections = galleryItems.length;

//     const interval = setInterval(() => {
//       // Staggered update: one section at a time
//       galleryItems.forEach((_, i) => {
//         setTimeout(() => {
//           setCurrentIndexes(prev =>
//             prev.map((idx, j) =>
//               j === i ? (idx + 1) % galleryItems[j].images.length : idx
//             )
//           );
//         }, i * 900); // delay between each section
//       });
//     }, 9000); // full cycle time

//     return () => clearInterval(interval);
//   }, []);

//   const dissolveVariant = {
//     initial: { opacity: 0, scale: 1.05, filter: "blur(6px)" },
//     animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
//     exit: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
//   };

//   return (
//     <section className="relative max-h-screen w-full py-12 md:overflow-hidden">
//       {/* Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         viewport={{ once: false }}
//         className="text-3xl md:text-4xl font-bold text-center text-cyan-600 mb-8 orbitron"
//       >
//         Tech Fest Gallery
//       </motion.h2>

//       {/* Bento Grid */}
//       <div className="max-w-6xl h-[1000px] md:h-[700px]   mx-auto grid grid-cols-1 grid-rows-5 md:grid-cols-6 md:grid-rows-6 gap-3 px-4">
//         {galleryItems.map((item, i) => {
//           let span = {};
//           switch (i) {
//             case 0:
//               span = { col: "col-span-4", row: "row-span-2" };
//               break;
//             case 1:
//               span = { col: "col-span-2", row: "row-span-4" };
//               break;
//             case 2:
//               span = { col: "col-span-2", row: "row-span-4" };
//               break;
//             case 3:
//               span = { col: "col-span-2", row: "row-span-2" };
//               break;
//             case 4:
//               span = { col: "col-span-4", row: "row-span-2" };
//               break;
//             default:
//               span = { col: "col-span-2", row: "row-span-2" };
//           }

//           return (
//             <motion.div
//               key={item.id}
//               className={`md:${span.col} md:${span.row} relative group rounded-xl overflow-hidden shadow-md border border-cyan-400/20 hover:border-blue-600/40 transition-all duration-500`}
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.15, duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <AnimatePresence mode="wait">
//                 <motion.img
//                   key={currentIndexes[i]} // triggers re-render
//                   src={item.images[currentIndexes[i]]}
//                   alt={item.title}
//                   variants={dissolveVariant}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                   transition={{ duration: 1, ease: "easeInOut" }}
//                   className="absolute inset-0 w-full h-full object-cover"
//                 />
//               </AnimatePresence>

//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

//               {/* Title */}
//               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
//                 <motion.h3
//                   whileHover={{ scale: 1.05 }}
//                   className="text-sm md:text-base font-semibold orbitron text-cyan-300 group-hover:text-blue-400 backdrop-blur-sm transition"
//                 >
//                   {item.title}
//                 </motion.h3>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import hacimage1 from "../assets/Pics/Hackathon/one.webp";
import hacimage2 from "../assets/Pics/Hackathon/two.webp";
import hacimage3 from "../assets/Pics/Hackathon/three.webp";
import hacimage4 from "../assets/Pics/Hackathon/four.webp";
import hacimage5 from "../assets/Pics/Hackathon/five.webp";

import funimage1 from "../assets/Pics/Funactivity/one.webp";
import funimage2 from "../assets/Pics/Funactivity/two.webp";
import funimage3 from "../assets/Pics/Funactivity/three.webp";
import funimage4 from "../assets/Pics/Funactivity/four.webp";

import inaimage1 from "../assets/Pics/Inauguration/one.webp";
import inaimage2 from "../assets/Pics/Inauguration/two.webp";
import inaimage4 from "../assets/Pics/Inauguration/four.webp";
import inaimage5 from "../assets/Pics/Inauguration/five.webp";

import nightimage1 from "../assets/Pics/Nightcamp/one.webp";
import nightimage2 from "../assets/Pics/Nightcamp/two.webp";
import nightimage3 from "../assets/Pics/Nightcamp/three.webp";
import nightimage4 from "../assets/Pics/Nightcamp/four.webp";
import nightimage5 from "../assets/Pics/Nightcamp/five.webp";

import prizesimage1 from "../assets/Pics/Prizes/one.webp";
import prizesimage2 from "../assets/Pics/Prizes/two.webp";
import prizesimage3 from "../assets/Pics/Prizes/three.webp";
import prizesimage4 from "../assets/Pics/Prizes/four.webp";

const galleryItems = [
  { id: 1, title: "Hackathon Moments", images: [hacimage1, hacimage2, hacimage3, hacimage4, hacimage5] },
  { id: 2, title: "Fun Activities", images: [funimage1, funimage2, funimage3, funimage4] },
  { id: 3, title: "Inauguration", images: [inaimage1, inaimage2, inaimage4, inaimage5] },
  { id: 4, title: "Night Events", images: [nightimage1, nightimage2, nightimage3, nightimage4, nightimage5] },
  { id: 5, title: "Award Ceremony", images: [prizesimage1, prizesimage2, prizesimage3, prizesimage4] },
];

export default function GallerySection() {
  const [currentIndexes, setCurrentIndexes] = useState(galleryItems.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      galleryItems.forEach((_, i) => {
        setTimeout(() => {
          setCurrentIndexes(prev =>
            prev.map((idx, j) =>
              j === i ? (idx + 1) % galleryItems[j].images.length : idx
            )
          );
        }, i * 900);
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  const dissolveVariant = {
    initial: { opacity: 0, scale: 1.05, filter: "blur(6px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.98, filter: "blur(6px)" },
  };

  return (
    <section className="relative w-full py-12 overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        className="text-3xl md:text-4xl font-bold text-center text-cyan-600 mb-8 orbitron"
      >
        Tech Fest Gallery
      </motion.h2>

      {/* Responsive Grid */}
      <div
        className="
          max-w-7xl mx-auto 
          grid gap-3 px-4 
          grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 
          auto-rows-[180px] sm:auto-rows-[220px] md:auto-rows-[250px] lg:auto-rows-[180px]
        "
      >
        {galleryItems.map((item, i) => {
          let span = {};
          switch (i) {
            case 0:
              span = { col: "lg:col-span-4", row: "lg:row-span-2" };
              break;
            case 1:
              span = { col: "lg:col-span-2", row: "lg:row-span-4" };
              break;
            case 2:
              span = { col: "lg:col-span-2", row: "lg:row-span-4" };
              break;
            case 3:
              span = { col: "lg:col-span-2", row: "lg:row-span-2" };
              break;
            case 4:
              span = { col: "lg:col-span-4", row: "lg:row-span-2" };
              break;
            default:
              span = { col: "lg:col-span-2", row: "lg:row-span-2" };
          }

          return (
            <motion.div
              key={item.id}
              className={`relative group rounded-xl overflow-hidden shadow-md border border-cyan-400/20 hover:border-blue-600/40 transition-all duration-500 ${span.col} ${span.row}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndexes[i]}
                  src={item.images[currentIndexes[i]]}
                  alt={item.title}
                  variants={dissolveVariant}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

              {/* Title */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-xs sm:text-sm md:text-base font-semibold orbitron text-cyan-300 group-hover:text-blue-400 backdrop-blur-sm transition"
                >
                  {item.title}
                </motion.h3>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
