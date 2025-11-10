import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SpaceCard = ({ children, className = '', shineColor = 'rgba(255, 255, 255, 0.2)' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Generate random particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2
  }));

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative border-1 border-cyan-400 backdrop-blur-xl rounded-2xl p-8
        border border-space-white/10 overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Shining Border Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
            ${shineColor} 0%, transparent 50%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* Space Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-space-white/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* 3D Rotation Effect */}
      <motion.div
        className="relative z-10"
        animate={{
          rotateX: isHovered ? (mousePosition.y - 150) / 20 : 0,
          rotateY: isHovered ? (mousePosition.x - 150) / 20 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Glow Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-space-white/5 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
    </motion.div>
  );
};

export default SpaceCard; 