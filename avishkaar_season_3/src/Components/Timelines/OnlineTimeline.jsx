"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import SpotlightCard from "./SpotlightCard";

const TimelinePage = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // ✅ Track active phase

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 1%", "end 100%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // ✅ Observe each section and update active index
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = sectionRefs.current.map((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.4 } // 40% visible = active
      );
      if (el) observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="w-full font-sans md:px-10" ref={containerRef}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl font-bold text-center text-cyan-600 orbitron mb-12"
      >
        Virtual Timeline
      </motion.h2>

      <div ref={ref} className="sticky max-w-7xl mx-auto pb-20 relative">
        {data.map((item, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)} // ✅ store each section
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Node + Title */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="sticky flex flex-col md:flex-row z-30 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
            >
              <div className="h-10 absolute left-3 md:left-4 w-10 rounded-full flex items-center justify-center">
                {/* ✅ Active node indicator */}
                <div
                  className={`h-4 w-4 rounded-full border border-neutral-300 dark:border-neutral-700 
                  transition-all duration-300
                  ${
                    activeIndex === index
                      ? "bg-cyan-400 shadow-[0_0_15px_4px_rgba(34,211,238,0.6)]"
                      : "bg-neutral-200 dark:bg-neutral-800"
                  }`}
                />
              </div>

              <h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold orbitron transition-colors duration-300 ${
                  activeIndex === index
                    ? "text-cyan-400"
                    : "text-neutral-500 dark:text-neutral-500"
                }`}
              >
                {item.title}
              </h3>
            </motion.div>

            {/* Content */}
            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <h3
                className={`md:hidden block orbitron text-2xl mb-4 text-left font-bold ${
                  activeIndex === index
                    ? "text-cyan-400"
                    : "text-neutral-500 dark:text-neutral-500"
                }`}
              >
                {item.title}
              </h3>
              {item.content}
            </motion.div>
          </div>
        ))}

        {/* Vertical line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-9 left-8 top-0 overflow-hidden w-[4px] 
             bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] 
             from-yellow-300 via-green-300 to-green-500 
             [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-6 
               bg-gradient-to-t from-slate-300 via-slate-600 to-cyan-400 
               from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};



// Main page component with integrated Timeline
export default function OnlineTimeline() {
  const data = [
    {
      title: "Phase 1",
      content: (
        <>
        <div className="mb-8 text-white orbitron text-3xl ">
            Registration & Confirmation
        </div>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(34, 211, 238, 1)">
            <div>
                <ul className="pl-6 font-orbit text-slate-300 text-left leading-relaxed list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    <li className="text-xl text-slate-400 md:text-justify">Teams must register through the official Avishkaar Season 3 portal before the deadline.</li>
                    <li className="text-xl text-slate-400 md:text-justify">Each team may consist of 1 to 4 members from the same college. </li>
                    <li className="text-xl text-slate-400 md:text-justify">Once registered, a confirmation email with your Team Code will be sent. This Team Code must 
be used in all your communications and file naming during submission.</li>
                    <li className="text-xl text-slate-400 md:text-justify">No changes to team composition will be entertained after registration closes.</li>
                </ul>
            </div>
        </SpotlightCard>
        </>
      ),
    },
    {
      title: "Phase 2",
      content: (
      <>
        <div className="mb-8 text-slate-400 text-white orbitron text-3xl">
            Hackathon Kickoff & Problem Statement Release 
        </div>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(34, 211, 238, 1)">
            <div>
                <ul className="pl-6 font-orbit text-left list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl text-slate-300 text-xs md:text-sm font-normal mb-8">
                    <li className="text-xl text-slate-400 md:text-justify">The problem statements will be released on the day of the hackathon via email and on the 
official communication group at the scheduled start time.  </li>
                    <li className="text-xl text-slate-400 md:text-justify">All teams will receive the same set of curated problem statements.</li>
                    <li className="text-xl text-slate-400 md:text-justify">Teams must choose any one problem statement and begin working on their solution 
immediately. </li>
                    <li className="text-xl text-slate-400 md:text-justify">A 24-hour timer will start the moment the problem statements are released.</li>
                    <li className="text-xl text-slate-400 md:text-justify">Strict adherence to the time limit is required. Late submissions will not be accepted.</li>
                </ul>
            </div>
        </SpotlightCard>
        </>
    ),
    },
    {
      title: "Phase 3",
      content: (
        <>
        <div className="mb-8 text-white orbitron text-3xl">
             Product Development - Within 24 Hours 
        </div>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(34, 211, 238, 1)">
            <div>
                <ul className="pl-6 font-orbit text-gray-600 text-left leading-relaxed list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl  text-xs md:text-sm font-normal mb-8">
                    <li className="text-xl text-slate-400 md:text-justify">Teams should start by discussing the problem, brainstorming solutions,
                        dividing roles, and setting internal milestones.</li>
                    <li className="text-xl text-slate-400 md:text-justify">All coding, design, and documentation must be completed within the 24-hour timeframe.</li>
                    <li className="text-xl text-slate-400 md:text-justify">Participants may use any technology stack, APIs, or platforms, but must document them clearly in the submission.</li>
                    <li className="text-xl text-slate-400 md:text-justify">No technical mentoring will be provided, but a helpdesk will be available for queries related to problem scope, submission process, and file format or access issues.
                    </li>
                </ul>
            </div>
        </SpotlightCard>
        </>),
    },
    {
        title: "Phase 4",
      content: (
        <>
        <div className="mb-8 text-white orbitron text-3xl">
            Final Submission
        </div>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(34, 211, 238, 1)">
            <div>
                <h2 className="text-2xl font-orbit text-slate-400 text-left">Before the 24-hour window closes, each team must upload the following via the official submission portal: </h2>
                <ol className="pl-6 mt-4 font-orbit text-slate-400 text-left leading-relaxed list-decimal list-outside space-y-2 marker:text-cyan-400 marker:text-xl dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    <li className="text-xl text-slate-400">Code Repository Link
                        <ul className="pl-6 leading-relaxed list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                            <li className="text-xl text-slate-400">GitHub or Google Drive (ensure access is public)</li>
                            <li className="text-xl text-slate-400">Folder must be clearly structured and labelled </li>
                        </ul>
                    </li>
                    <li className="text-xl text-slate-400">Technical Documentation (PDF) 
                        <ul className="pl-6 leading-relaxed list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                            <li className="text-xl text-slate-400">Overview of solution</li>
                            <li className="text-xl text-slate-400">Workflow and architecture</li>
                            <li className="text-xl text-slate-400">Tools and technologies used </li>
                            <li className="text-xl text-slate-400">Instructions to run the code (if applicable)</li>
                        </ul>
                    </li>
                    <li className="text-xl text-slate-400">Pitch Deck (6–8 Slides) 
                        <ul className="pl-6 leading-relaxed list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                            <li className="text-xl text-slate-400">Title, Problem, Solution, Innovation, Tech Stack, Screenshots, Impact, Team Info</li>
                        </ul>
                    </li>
                </ol>
            </div>
        </SpotlightCard>
        </>
      ),
    },
    {
        title: "Phase 5",
      content: (
        <>
        <div className="mb-8 text-white orbitron text-3xl">
        Evaluation & Pitching (Post-Hackathon)
        </div>
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(34, 211, 238, 1)">
            <div>
                <ul className="pl-6 font-orbit text-gray-200 text-left leading-relaxed list-disc list-outside space-y-2 marker:text-cyan-400 marker:text-xl dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                    <li className="text-xl text-slate-400 md:text-justify">After the hackathon, submissions will be reviewed by an expert jury panel comprising industry professionals and academicians.</li>
                    {/* <li className="text-xl text-slate-400 md:text-justify">Selected teams will be invited to present their project in a virtual pitching session. </li> */}
                    <li className="text-xl text-slate-400 md:text-justify">Teams will receive a time slot and must be available for a 5-7minute pitch, followed by a brief Q&A with the jury. </li>
                    <li className="text-xl text-slate-400 md:text-justify">No changes to team composition will be entertained after registration closes.</li>
                </ul>
            </div>
        </SpotlightCard>
        </>
      ),
    }
  ];

  return <TimelinePage data={data} />;
}
