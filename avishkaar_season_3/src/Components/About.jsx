"use client";
import React from "react";
import { Parallax } from "react-scroll-parallax";
import { motion } from "framer-motion";
import './About.css';
import Countdown from "./CountDown";
import about from "../assets/about.webp"
import Tracks from "./Tracks";
import Stats from "./Offline/Stats";

const About = () => {
  return (
    <div className=" text-white bg-slate-950 z-[20] min-h-screen overflow-hidden">
      {/* 🌌 Hero Section */}
      {/* <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        {/* Parallax Background Stars 
        <Parallax speed={-20}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a1a,_#000)]">
            <div className="absolute w-full h-full bg-[url('/stars.png')] bg-cover opacity-40 animate-pulse"></div>
          </div>
        </Parallax>

      </section> */}

      {/* 💡 About Section */}
      <section className="relative py-20 px-8 bg-slate-950">
        <Parallax speed={-10}
          translateY={[50,20]}
        >
          <motion.h2
            initial={{ opacity: 0,scale:0.5, y: 50 }}
            whileInView={{ opacity: 1, scale:1, y: 0 }}
            transition={{ duration: 1 }}
            className="orbitron text-4xl md:text-7xl font-bold text-center text-gray-300 mb-12 bg-cyan-400/70 text-transparent bg-clip-text mb-12"
          >
            OUR SPARK
          </motion.h2>
         
        </Parallax>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <Parallax speed={20}>
        <motion.div
  
  className=""
  data-text="What is Avishkaar?"
>
  <h3 className="text-xl font-semibold orbitron mb-4">What is Avishkaar?</h3>
  <p className="text-gray-300 text-justify">
  Aavishkar is a 48-hour innovation marathon that challenges bright minds to turn bold ideas into real-world solutions.
After two successful seasons, Aavishkar returns bigger and better — now in two phases: a 24-hour online hackathon and an on-campus 48-hour grand finale.
Across themes like AI, Robotics, Sustainability, Smart Systems, and Emerging Technologies, participants from across India come together to create, collaborate, and compete. Experience hands-on mentoring, expert-led workshops, and an electrifying atmosphere of creativity and problem-solving.
Join us as we push boundaries, prototype the future, and shape ideas that can make a difference.
Because at Aavishkar — innovation never sleeps.</p>
<h3 className="text-xl font-semibold orbitron my-4">Previous Stats </h3>
<Stats/>
</motion.div>
</Parallax>


<motion.div
  // whileHover={{ scale: 1 }}
  animate={{
    y: [0, -20, 0],}}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  className="p-6 rounded-2xl"
  data-text="Why Join?"
>
            <Parallax speed={50}
            translateX={[-100,100]}
            >
            <img src={about} alt="" />
            </Parallax>
</motion.div>

        </div>
      </section>
      <Parallax speed={-10}
      translateY={[-50, 50]}
      >
     
      </Parallax>
      
    </div>
  );
};

export default About;
