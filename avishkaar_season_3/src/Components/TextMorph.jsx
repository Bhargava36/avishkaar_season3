import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function TextMorph({ texts = [], className = "" }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (texts.length === 0) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [texts]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
    }),
  };

  if (texts.length === 0) return null;

  return (
    <div className={`relative h-24 overflow-hidden ${className}`}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
            scale: { duration: 0.2 },
          }}
          className="absolute w-full text-center"
        >
          <span className="font-orbit text-4xl font-bold bg-gradient-to-r from-space-white to-space-white/50 bg-clip-text text-transparent">
            {texts[index]}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 