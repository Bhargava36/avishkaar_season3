import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  { id: 1, name: "NovaTech", logo: "https://via.placeholder.com/100x50?text=NovaTech" },
  { id: 2, name: "CyberWave", logo: "https://via.placeholder.com/100x50?text=CyberWave" },
  { id: 3, name: "BlueOrbit", logo: "https://via.placeholder.com/100x50?text=BlueOrbit" },
  { id: 4, name: "QuantumSoft", logo: "https://via.placeholder.com/100x50?text=QuantumSoft" },
  { id: 5, name: "PixelEdge", logo: "https://via.placeholder.com/100x50?text=PixelEdge" },
  { id: 6, name: "DataNova", logo: "https://via.placeholder.com/100x50?text=DataNova" },
];

const OurSponsors = () => {
  return (
    <section className="relative mt-24 overflow-hidden bg-gradient-to-b from-black via-blue-950 to-blue-900 text-white py-24">
      {/* Space background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

      {/* Glowing orb center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-400/10 blur-3xl animate-pulse"></div>

      {/* Section title */}
      <div className="relative z-10 text-center mb-20">
        <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        className="z-10 text-4xl orbitron md:text-5xl font-bold text-center text-cyan-600 mb-8"
      >
        Our Sponsors
      </motion.h2> 
        <p className="text-blue-200 mt-4 max-w-xl mx-auto">
          Powering innovation and creativity beyond the stars ✨
        </p>
      </div>

      {/* Orbit animation */}
      <div className="relative z-10 flex justify-center items-center">
        <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-cyan-400/40 flex justify-center items-center"
          >
            {sponsors.map((sponsor, index) => {
              const angle = (index / sponsors.length) * 2 * Math.PI;
              const x = Math.cos(angle) * 180;
              const y = Math.sin(angle) * 180;

              return (
                <motion.div
                  key={sponsor.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="absolute w-24 h-14 flex flex-col items-center justify-center"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <div className="bg-blue-900/40 border border-cyan-400/30 p-3 rounded-xl shadow-lg hover:shadow-cyan-400/50 hover:scale-110 transition-all">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-20 h-10 object-contain"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Inner glow core */}
          <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-gradient-to-br from-cyan-400/60 to-blue-600/60 blur-xl rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_40px_15px_rgba(34,211,238,0.3)]"></div>
        </div>
      </div>
    </section>
  );
};

export default OurSponsors;
