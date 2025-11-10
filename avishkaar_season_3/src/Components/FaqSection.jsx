// import React, { useState } from "react";

// export default function FaqSection() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const faqs = [
//     {
//       question: "Who can participate in AVISHKAAR SEASON 3?",
//       answer:
//         "AVISHKAAR SEASON 2 welcomes undergraduate and postgraduate students from all years and institutes in India who are currently enrolled as full-time students. Aavishkaar is open to teams with a passion for innovation and a desire to contribute to society. Whether you're a student, professional, entrepreneur, or simply someone with a creative mind, we welcome you to join us in this exciting journey.",
//     },
//     {
//       question: "What can be the team size in AVISHKAAR SEASON 3?",
//       answer:
//         "The team can consist of a Minimum of 1 to a Maximum 4 four members.",
//     },
//     {
//       question: "Is there any security provided for our projects?",
//       answer:
//         "As the hackathon will be conducted for 48 hours continuously we can provide a good atmosphere and safety. At least one student must be engaged with the project in the absence of a team members.",
//     },
//     {
//       question: "Food & Accommodation provision?",
//       answer:
//         "Selected teams for the grand finale round will have to pay for food and accommodation for a three-days, two-night stay throughout the hackathon. The details and fees for food and accommodation will be communicated upon selection for the grand finale.",
//     },
//     {
//       question: "Can a team consist the students from different domains?",
//       answer:
//         "Certainly! A team has the flexibility to include students from diverse domains collaborating harmoniously to create a unified project.",
//     },
//     {
//       question: "Is there any registration fee?",
//       answer:
//         "Absolutely not! Participating in this event comes at no cost, as there is no registration fee required for entry.",
//     },
//     {
//       question: "What are the criteria for the evaluation?",
//       answer:
//         "The project evaluations will be based on a comprehensive scoring system, assigning 30 points for the identified problem, 20 points for the proposed solution, and an additional 20 points each for technical feasibility and novelty. Team strength will also be a factor, contributing 10 points to the overall assessment. This multifaceted approach ensures a thorough and balanced evaluation, taking into account the project's relevance, innovation, technical viability, and the strength of the collaborating team.",
//     },
//     {
//       question: "Can I participate in both Virtual and Physical Hackathon tracks?",
//       answer:
//         "Yes, teams can register for both tracks — the Virtual Hackathon is a 24-hour online challenge, and the Physical Hackathon is a 48-hour on-campus event; if a team is selected in the online round, the qualified teams will also get the opportunity to participate in the offline hackathon.",
//     },
//     {
//       question: "Will hardware support be available during the Physical Hackathon?",
//       answer:
//         "Basic hardware support (if requested in advance) will be provided. Special requirements must be communicated to organizers.",
//     },
//     {
//       question: "How will the pitching be conducted for Virtual Hackathon?",
//       answer:
//         "Shortlisted teams will present their solutions in a 5–7 minute virtual pitching session followed by jury Q&A.",
//     },
//     {
//       question: "Do participants have to arrange their own travel?",
//       answer:
//         "Yes. Teams must arrange their own travel. Food and accommodation will be provided on campus at nominal charges.",
//     },
//   ];

//   const toggleFAQ = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div className="bg-black text-left text-stone-200 py-24 px-6 max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
//       {/* Left Section (Sticky) */}
//       <div className="basis-1/3 md:sticky md:top-24 self-start">
//         <p className="inline-block font-semibold text-cyan-400 mb-4">
//           Virtual Hackathon FAQ
//         </p>
//         <p className="sm:text-4xl text-3xl font-extrabold text-stone-100">
//           Frequently Asked Questions
//         </p>
//       </div>

//       {/* Right Section (FAQ List) */}
//       <ul className="basis-2/3">
//         {faqs.map((faq, index) => {
//           const isOpen = openIndex === index;
//           return (
//             <li key={index}>
//               <div
//                 className={` transition-all duration-300  shadow-md ${
//                   isOpen
//                     ? ""
//                     : ""
//                 }`}
//               >
//                 <button
//                   className="flex items-center justify-between  w-full px-5 py-4 text-left text-lg font-semibold text-stone-100 border-b-2 border-gray-700"
//                   aria-expanded={isOpen ? "true" : "false"}
//                   onClick={() => toggleFAQ(index)}
//                 >
//                   <span className="text-gray-400 ">{faq.question}</span>
//                   <span
//                     className={`ml-4mt-20 text-2xl font-bold transition-colors ${
//                       isOpen ? "text-blue-500" : "text-cyan-400"
//                     }`}
//                   >
//                     {isOpen ? "−" : "+"}
//                   </span>
//                 </button>
//                 <div
//                   className="overflow-hidden transition-all duration-700"
//                   style={{
//                     maxHeight: isOpen ? "300px" : "0",
//                   }}
//                 >
//                   <p className="px-5 py-4 text-cyan-400">{faq.answer}</p>
//                 </div>
//               </div>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState({ virtual: null, physical: null });

  const toggleFAQ = (type, index) => {
    setOpenIndex((prev) => ({
      ...prev,
      [type]: prev[type] === index ? null : index,
    }));
  };

  const virtualFaqs = [
    {
      question: "Who can participate in AVISHKAAR SEASON 3?",
      answer:
        "AVISHKAAR SEASON 3 welcomes undergraduate and postgraduate students from all years and institutes across India. Teams or individuals passionate about innovation and problem-solving are encouraged to join.",
    },
    {
      question: "Can I participate in both Virtual and Physical Hackathon tracks?",
      answer:
        "Yes, teams can register for both tracks — the Virtual Hackathon is a 24-hour online challenge, and the Physical Hackathon is a 48-hour on-campus event. Teams shortlisted online can also join the offline hackathon.",
    },
    {
      question: "How will the pitching be conducted for the Virtual Hackathon?",
      answer:
        "Shortlisted teams will present their solutions in a 5–7 minute virtual pitching session followed by jury Q&A.",
    },
  ];

  const physicalFaqs = [
    {
      question: "What can be the team size in AVISHKAAR SEASON 3?",
      answer:
        "The team can consist of a minimum of 1 and a maximum of 4 members.",
    },
    {
      question: "Is there any security provided for our projects?",
      answer:
        "Yes. The 48-hour hackathon will ensure a safe and secure environment. At least one member must remain with the project at all times.",
    },
    {
      question: "Food & Accommodation provision?",
      answer:
        "Selected teams for the grand finale will have to pay for food and accommodation for a three-day, two-night stay. Details and fees will be shared upon selection.",
    },
    {
      question: "Can a team consist of students from different domains?",
      answer:
        "Certainly! Teams can include students from diverse domains collaborating harmoniously on a unified project.",
    },
    {
      question: "Is there any registration fee?",
      answer:
        "No, participation in this event is completely free — there’s no registration fee.",
    },
    {
      question: "What are the criteria for evaluation?",
      answer:
        "Projects are evaluated on problem identification (30 pts), proposed solution (20 pts), technical feasibility (20 pts), novelty (20 pts), and team strength (10 pts).",
    },
    {
      question: "Will hardware support be available during the Physical Hackathon?",
      answer:
        "Basic hardware support (if requested in advance) will be provided. Special requirements must be communicated to organizers.",
    },
    {
      question: "Do participants have to arrange their own travel?",
      answer:
        "Yes. Teams must arrange their own travel. Food and accommodation will be available on campus at nominal charges.",
    },
  ];

  const renderFAQList = (faqs, type) => (
    <ul className="basis-1/2">
      {faqs.map((faq, index) => {
        const isOpen = openIndex[type] === index;
        return (
          <li key={index}>
            <div className="transition-all duration-300 shadow-md">
              <button
                className="flex items-center justify-between w-full px-5 py-4 text-left text-lg font-semibold text-stone-100 border-b-1 border-gray-700"
                onClick={() => toggleFAQ(type, index)}
              >
                <span className="text-gray-400">{faq.question}</span>
                <span
                  className={`ml-4 text-2xl font-bold transition-colors ${
                    isOpen ? "text-slate-500" : "text-cyan-600"
                  }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-700"
                style={{ maxHeight: isOpen ? "300px" : "0" }}
              >
                <p className="px-5 py-4 text-cyan-600">{faq.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="relative z-10 text-left text-stone-200 py-24 px-6 max-w-7xl mx-auto ">
  {/* Background Layer */}
  {/* <div className="absolute inset-0">
    <div className="bg-gradient-to-br from-black via-black to-black backdrop-blur-sm absolute inset-0"></div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.2)_0%,transparent_100%)]"></div>
  </div> */}

  {/* Foreground Content */}
  <div className="relative">
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false }}
        className="z-10 text-4xl orbitron md:text-5xl font-bold text-center text-cyan-600 mb-18"
      >
        Frequently Asked Questions
      </motion.h2>
    </div>

    {/* Two Columns Section */}
    <div className="flex flex-col md:flex-row gap-12 relative z-10">
      {/* Virtual Hackathon FAQs */}
      <div className="basis-1/2">
        <h3 className="text-white orbitron text-2xl font-bold mb-4">
          Virtual Hackathon
        </h3>
        {renderFAQList(virtualFaqs, "virtual")}
      </div>

      {/* Physical Hackathon FAQs */}
      <div className="basis-1/2">
        <h3 className="text-white orbitron text-2xl font-bold mb-4">
          Physical Hackathon
        </h3>
        {renderFAQList(physicalFaqs, "physical")}
      </div>
    </div>
  </div>
</div>

  );
}
