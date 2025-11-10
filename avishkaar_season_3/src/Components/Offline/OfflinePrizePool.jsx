import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const prizes = [
    { position: "3rd", amount: 75000, color: "from-orange-900 to-orange-300" },
    { position: "1st", amount: 125000, color: "from-yellow-900 to-yellow-300" },
    { position: "2nd", amount: 100000, color: "from-gray-900 to-gray-300" },
  ];
export default function OfflinePrizePool() {
  const [counts, setCounts] = useState(prizes.map(() => 0));
  const [finished, setFinished] = useState(prizes.map(() => false));
  const [confettiFired, setConfettiFired] = useState(false);
  const containerRef = useRef(null);
  // Count-up logic
  useEffect(() => {
    prizes.forEach((prize, idx) => {
      const duration = 1400 + idx * 250;
      const start = performance.now();
      const step = (time) => {
        const t = Math.min(1, (time - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = Math.round(prize.amount * eased);
        setCounts((prev) => {
          const copy = [...prev];
          copy[idx] = value;
          return copy;
        });
        if (t < 1) requestAnimationFrame(step);
        else {
          setFinished((prev) => {
            const copy = [...prev];
            copy[idx] = true;
            return copy;
          });
        }
      };
      requestAnimationFrame(step);
    });
  }, []);
  // Fire confetti when container comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !confettiFired && finished[1]) {
            setConfettiFired(true);
            import("canvas-confetti").then((confetti) => {
              confetti.default({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              setTimeout(() => confetti.default({ particleCount: 50, spread: 100, origin: { y: 0.55 } }), 400);
            });
          }
        });
      },
      { threshold: 0.5 } // 50% visible
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [confettiFired, finished]);
  return (
    <section ref={containerRef} className="w-full flex flex-col items-center justify-center py-16 relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="orbitron text-3xl md:text-4xl font-extrabold text-center text-gray-200 mb-18"
      >
        Prize Pool
      </motion.h2>
      <div className="flex justify-center items-end gap-8 min-h-[260px]">
        {prizes.map((p, index) => {
          const heights = ["150px", "250px", "200px"];
          return (
            <motion.div
              key={p.position}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.18, duration: 0.9, type: "spring", stiffness: 90 }}
              className="relative w-18 md:w-28 flex flex-col items-center"
            >
              <div
                className={`w-full rounded-t-xl shadow-2xl overflow-hidden`}
                style={{ height: heights[index], background: `linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))` }}
              >
                <div
                  className={`w-full h-full bg-gradient-to-t ${p.color} bg-clip-border opacity-95`}
                  style={{ mixBlendMode: "overlay", transform: "translateZ(0)" }}
                />
              </div>

              <p className={`absolute -top-14 font-bold ${p.labelColor} flex items-center gap-2`}>
                {index === 1 ? "🥇" : index === 2 ? "🥈" : "🥉"} {p.position}
              </p>

              <p className="absolute -top-8 text-white font-mono font-semibold">
                ₹{counts[index].toLocaleString("en-IN")}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}













