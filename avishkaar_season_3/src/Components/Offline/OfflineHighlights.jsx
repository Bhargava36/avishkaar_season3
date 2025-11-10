





"use client";
import { motion } from "framer-motion";
import OfflineTheme from "../Offline/OfflineTheme";
import OfflinePrizePool from "./OfflinePrizePool";
import OfflineTimeline from "../Timelines/OfflineTimeline";
import Countdown from "../CountDown";
// import OnlineTheme from "./OnlineTheme";
import { Parallax } from "react-scroll-parallax";
// import ImportantDates from "./ImportantDates";
// import OnlinePrizePool from "./OnlinePrizePool";


const dates = [
  { title: "Registrations Open", date: "Oct 23, 2025" },
  { title: "Abstract & Video Submission Deadline", date: "Nov 20, 2024" },
  { title: "Results of Shortlisting", date: "Nov 30, 2025" },
  { title: "Mentorship Phase Begins", date: "Dec 1, 2025" },
  { title: "Mentorship Phase Ends", date: "Dec 21, 2025" },
  { title: "Reporting at Campus", date: "Dec 26, 2025 (Evening)" },
  { title: "Hackathon Begins", date: "Dec 27, 2025 - 9:00 AM" },
  { title: "Hackathon Ends", date: "Dec 29, 2025 - 9:00 AM" },
  { title: "Final Jury & Awards Ceremony", date: "Dec 29, 2025 - 2:00 PM onwards" },
];




export default function OnlineHighlights() {
  return (
    
    <section className="w-full min-h-screen  text-white px-6 pb-16">
      {/* <Parallax speed={20}
      translateY={[10,-150]}

      className="overflow-visible"
      >
      <h1 className="text-[3.5rem] orbitron w-full md:text-[6rem] bg-gradient-to-b from-cyan-400 via-blue-400 to-blue-900 text-center text-transparent bg-clip-text font-extrabold">PHYSICAL HACKATHON</h1>
      </Parallax> */}
      {/* About Section */}
      <Parallax speed={20}
      translateY={[100,-50]}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
        

        {/* Offline Hackathon Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-slate-900 border-2 border-slate-800  rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-3xl font-bold orbitron mb-2">
            Physical Hackathon
          </h3>
          <p className="text-gray-300 my-4">48-Hour On-Campus Format</p>
          <ul className="text-gray-400 text-xl list-disc ml-5 space-y-3 mb-4">
            <li>Teams of 1–4 register and submit a 2-page abstract and 1-minute video pitch.</li>
            <li>Experts shortlist teams based on originality and feasibility.</li>
            <li>Selected teams undergo 3 weeks of mentorship.</li>
            <li>48-hour on-campus hackathon held at AITAM.</li>
            <li>⁠Final pitches judged on innovation, depth, and presentation.</li>
          </ul>

          <a href="https://www.geeksforgeeks.org/hack-a-thon/avishkaar-national-level-hackathon-season-3" target="_blank" className="px-5 py-2 mt-5 rounded-lg bg-orange-700 hover:bg-orange-900 text-white font-semibold shadow-md hover:scale-105 transition ease-in-out duration-500">
            Register
          </a>
        </motion.div>
        <div>
          {/* <h2 className="text-3xl md:text-4xl orbitron font-bold text-purple-600 mb-4">
            About
          </h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            Avishkaar Offline Hackathon is a 48-hour continuous innovation 
            challenge hosted on-campus at AITAM. With structured mentorship, 
            an open innovation model, and a massive prize pool, participants 
            compete to solve real-world problems with cutting-edge solutions.
          </p>

          <ul className="text-gray-400 text-sm list-disc ml-5 space-y-2">
            <li>Mode: Offline (On-campus at AITAM)</li>
            <li>Duration: 48 continuous hours</li>
            <li>Model: Open Innovation – Teams propose their own ideas</li>
            <li>Team Size: 1 to 4 students (same institution)</li>
            <li>Mentorship: Structured 3-week guidance before finale</li>
            <li>Food & Accommodation: Provided on paid basis at nominal charges</li>
            <li>Recognition: E-certificates, goodies, and post-hack support</li>
          </ul> */}
          <OfflinePrizePool/>
        </div>
      </div>
      </Parallax>
      <Parallax speed={10} translateY={[50,-50]} className="mt-20">
      {/* Countdown to Hackathon Start */}
      <Countdown targetDate="2025-12-27T15:00:00" />
      </Parallax>
            <Parallax speed={10} translateY={[50,-50]} className="mt-20">

      {/* <OnlineTheme/> */}
      </Parallax>
      <Parallax speed={5} translateY={[50,-50]} className="mt-20">

      {/* Important Dates */}
      <div className="mt-20 max-w-7xl mx-auto">
        <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-bold text-center text-cyan-600 orbitron mb-12"
      >
         Important Dates
      </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dates.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="group rounded-xl p-6 border flex flex-col items-center border-cyan-400/20 shadow-lg text-center bg-slate-900 transition duration-500"
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
      </Parallax>
      {/* <ImportantDates /> */}

      <OfflineTimeline />
      {/* <OfflinePrizePool /> */}
    </section>
  );
}
