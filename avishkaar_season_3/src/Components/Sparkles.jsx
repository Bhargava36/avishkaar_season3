"use client";
import React, { useId, useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import GlitchText from "./GlitchText";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Parallax } from 'react-scroll-parallax';
import Globe from "./Globe";
import gfg from "../assets/gfg.png";
import { 
  Code, 
  Cpu, 
  Database, 
  Globe as GlobeIcon, 
  Smartphone, 
  Bot, 
  Brain, 
  Cloud,
  Monitor,
  Zap,
  Binary,
  Wifi
} from "lucide-react";

// Interactive Parallax Background Component
const InteractiveParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get viewport-relative position
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePosition({ x, y });
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    // Add event listener to window for global mouse tracking
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxLayers = [
    { depth: 0.3, color: 'rgba(0, 212, 255, 0.15)', size: 80, attraction: 0.8 },
    { depth: 0.5, color: 'rgba(255, 0, 128, 0.12)', size: 120, attraction: 0.6 },
    { depth: 0.7, color: 'rgba(128, 0, 255, 0.1)', size: 160, attraction: 0.4 },
    { depth: 0.4, color: 'rgba(0, 255, 128, 0.08)', size: 100, attraction: 0.7 },
    { depth: 0.6, color: 'rgba(255, 128, 0, 0.1)', size: 140, attraction: 0.5 },
    { depth: 0.8, color: 'rgba(255, 255, 0, 0.06)', size: 180, attraction: 0.3 },
  ];

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Animated circuit patterns */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at ${20 + mousePosition.x * 60}% ${30 + mousePosition.y * 40}%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${80 - mousePosition.x * 60}% ${70 - mousePosition.y * 40}%, rgba(255, 0, 128, 0.08) 0%, transparent 50%),
            radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, rgba(128, 0, 255, 0.06) 0%, transparent 50%)
          `,
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Interactive floating orbs that follow cursor */}
      {parallaxLayers.map((layer, index) => {
        const baseX = 15 + index * 15; // Base position percentage
        const baseY = 20 + index * 12; // Base position percentage
        
        // Calculate movement based on mouse position
        const moveX = (mousePosition.x - 0.5) * 200 * layer.attraction;
        const moveY = (mousePosition.y - 0.5) * 200 * layer.attraction;

        return (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: layer.size,
              height: layer.size,
              background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
              left: `${baseX}%`,
              top: `${baseY}%`,
              filter: 'blur(1px)',
              boxShadow: `0 0 ${layer.size * 0.8}px ${layer.color}`,
            }}
            animate={{
              x: moveX,
              y: moveY,
              scale: [1, 1.4, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              x: { type: "spring", stiffness: 40, damping: 20 },
              y: { type: "spring", stiffness: 40, damping: 20 },
              scale: { duration: 2 + index * 0.3, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 3 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}

      {/* Interactive tech grid that follows cursor */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, ${0.1 + mousePosition.x * 0.1}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, ${0.1 + mousePosition.y * 0.1}) 1px, transparent 1px)
          `,
          backgroundSize: `${60 + mousePosition.x * 10}px ${60 + mousePosition.y * 10}px`,
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px) rotate(${mousePosition.x * 2}deg)`,
        }}
        animate={{
          opacity: [0.2, 0.8, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

    </div>
  );
};

// Tech icons floating parallax component
const TechParallax = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techIcons = [
    { Icon: Brain, position: { top: '10%', left: '15%' }, delay: 0, color: '#00d4ff', attraction: 0.4 },
    { Icon: Code, position: { top: '20%', right: '20%' }, delay: 0.5, color: '#ff6b6b', attraction: 0.3 },
    { Icon: Database, position: { bottom: '30%', left: '10%' }, delay: 1, color: '#4ecdc4', attraction: 0.5 },
    { Icon: GlobeIcon, position: { top: '40%', left: '5%' }, delay: 1.5, color: '#45b7d1', attraction: 0.3 },
    { Icon: Smartphone, position: { bottom: '20%', right: '15%' }, delay: 2, color: '#96ceb4', attraction: 0.4 },
    { Icon: Bot, position: { top: '60%', right: '10%' }, delay: 2.5, color: '#feca57', attraction: 0.6 },
    { Icon: Cpu, position: { top: '30%', left: '80%' }, delay: 3, color: '#ff9ff3', attraction: 0.7 },
    { Icon: Cloud, position: { bottom: '40%', left: '70%' }, delay: 3.5, color: '#54a0ff', attraction: 0.4 },
    { Icon: Monitor, position: { top: '80%', left: '25%' }, delay: 4, color: '#5f27cd', attraction: 0.5 },
    { Icon: Zap, position: { top: '10%', right: '10%' }, delay: 4.5, color: '#00d2d3', attraction: 0.7 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {techIcons.map(({ Icon, position, delay, color, attraction }, index) => {
        const moveX = (mousePos.x - 0.5) * 150 * attraction;
        const moveY = (mousePos.y - 0.5) * 150 * attraction;

        return (
          <motion.div
            key={index}
            className="absolute"
            style={position}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ 
              opacity: [0, 0.8, 0.5, 0.9, 0.4],
              scale: [0, 1.3, 0.9, 1.1, 1],
              rotate: [0, 360, 180, 360],
              y: [-15, 15, -8, 12, -5],
              x: moveX,
            }}
            transition={{
              duration: 7,
              delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              x: { type: "spring", stiffness: 50, damping: 25 },
            }}
          >
            <motion.div
              className="relative"
              animate={{
                y: moveY * 0.3,
                rotate: [0, mousePos.x * 90, 0],
              }}
              transition={{
                y: { type: "spring", stiffness: 40, damping: 20 },
                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Icon 
                size={36} 
                style={{ color }}
                className="drop-shadow-2xl filter blur-[0.3px]"
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle, ${color}70 0%, transparent 70%)`,
                  borderRadius: '50%',
                  transform: 'scale(2.5)'
                }}
                animate={{
                  opacity: [0.4, 0.9, 0.4],
                  scale: [2, 3.5, 2],
                }}
                transition={{
                  duration: 2.5 + index * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};


const SparklesCore = (props) => {
  const {
    id,
    className,
    background,
    minSize,
    maxSize,
    speed,
    particleColor,
    particleDensity,
  } = props;

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const controls = useAnimation();

  const particlesLoaded = async (container) => {
    if (container) {
      controls.start({ opacity: 1, transition: { duration: 0.5 } });
    }
  };

  const generatedId = useId();

  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: { color: { value: background || "#0d47a1" } },
            fullScreen: { enable: false, zIndex: 1 },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: { push: { quantity: 4 } },
            },
            particles: {
              color: { value: particleColor || "#ffffff" },
              move: { enable: true, speed: speed || 1.5, direction: "none" },
              number: { value: particleDensity || 300, density: { enable: true } },
              opacity: { value: { min: 0.1, max: 1 }, animation: { enable: true } },
              size: { value: { min: minSize || 1, max: maxSize || 3 } },
              shape: { type: "circle" },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};

const Sparkles = () => {
  return (
    <>

    <div speed={80}
           className="absolute mx-auto">
<Globe className={"w-[100%] h-[100%]"}/>
            </div>
           
    <div className="min-h-screen w-full   flex flex-col items-center justify-center overflow-hidden relative cursor-none">
     <div className="absolute  z-20 bottom-0 left-0 w-full h-16 bg-gradient-to-t from-slate-950 to-transparent backdrop-blur-xs" />
     
      {/* Interactive Parallax Background */}
      <InteractiveParallaxBackground />
      
      {/* Tech Parallax Background */}
      <TechParallax />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Glitch Text Component */}
        <motion.div
          className=" text-center w-full h-full  flex items-center justify-center"
          initial={{ opacity: 0, y: 20, scale: 0.2 }}
          animate={{ opacity: 1, y: 0, scale: 1.1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <GlitchText />
        </motion.div>
        
        
        {/* Enhanced gradient effects */}
        <Parallax className="w-full  h-40 relative mt-2 md:mt-16 " speed={50}
          translateY={[-100, 150]} // Moves vertically from -100px to +100px
          // scale={[0.05, 1.2]}       // Scales element
          // opacity={[0, 1]}         // Fades in
          >
        <div className="w-full h-20 relative mt-12">
          {/* Multiple gradient layers for tech theme */}
          {/* <motion.div 
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-blue-600 to-transparent h-[5px] w-8/9"
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[2px] w-3/4 blur-sm"
            animate={{
              opacity: [0.5, 1, 0.5],
              scaleX: [1, 1.2, 1]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent h-[5px] w-3/4"
            animate={{
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-1/4 blur-sm"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [1, 1.5, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-[5px] w-1/4"
            animate={{
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
 */}
          {/* Enhanced Sparkles Core */}
        <SparklesCore
          background="transparent"
            minSize={0.1}
          maxSize={1}
            particleDensity={10000}
            speed={0.5}
          className="w-full h-full"
            particleColor="#ffffff"
          />

          {/* Enhanced radial gradient */}
          <div className="absolute inset-0 w-full h-full bg-gradient-radial from-transparent via-transparent to-slate-950 opacity-60"></div>
        </div>
        </Parallax>
        <Parallax speed={30}
          translateY={[-100, 140]} // Moves vertically from -100px to +100px
          // translateX={[-50, 100]} // Moves horizontally from -100px to +100px
          // scale={[0.05, 1.2]}       // Scales element
          // opacity={[0, 1]}         // Fades in
          >
        {/* Tech fest subtitle */}
       <motion.div
  className="mt-16 text-center"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2, duration: 1 }}
>
  <h2 className="text-2xl md:text-4xl orbitron text-gray-300 font-mono tracking-wider font-extrabold">
    SEASON 3
  </h2>

  <motion.p
    className="text-sm orbitron mt-3 text-gray-300 font-mono tracking-wider rounded-full px-2 py-1 backdrop-blur-lg"
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {"{ "}
    <span className="text-cyan-400">INNOVATION</span>
    {" • "}
    <span className="text-purple-400">TECHNOLOGY</span>
    {" • "}
    <span className="text-green-400">FUTURE</span>
    {" }"}
  </motion.p>

  <p className="text-sm py-2 text-white font-bold">Powered By :</p>
  <img src={gfg} alt="GFG Logo" className="w-25 mx-auto bg-white rounded-lg p-2" />

  {/* Buttons Section */}
  <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
  
  <a 
    href="https://unstop.com/hackathons/avishkaar-season-3-virtual-hackathon-a-national-level-innovation-challenge-aditya-institute-of-technology-and-1574485?lb=R8TnBY7f&utm_medium=Share&utm_source=avish20294153&utm_campaign=Online_coding_challenge"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-mono tracking-wider rounded-full px-2 shadow-md transition-all duration-300">
      Register for Virtual
    </button>
  </a>

  <a 
    href="https://www.geeksforgeeks.org/hack-a-thon/avishkaar-national-level-hackathon-season-3"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-mono tracking-wider rounded-full px-2 shadow-md transition-all duration-300">
      Register for Physical
    </button>
  </a>

</div>

</motion.div>

          </Parallax>
      </div>

      
    </div>
    </>
  );
};

export default Sparkles;
