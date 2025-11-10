// import React, { useState,useEffect } from "react";
// import { href, Link } from "react-router-dom"; // Import Link from react-router-dom
// import { motion } from "framer-motion"; // Import motion from framer-motion
// import { AnimatePresence } from "framer-motion";
// import { XIcon } from "lucide-react";
// import logo from "../assets/aitam_white-title_logo.png";
// import logo2 from "../assets/iic.png";
// import MenuLinks from "./MenuLinks";
// // import { motion } from "framer-motion";
// import { FaPhone, FaWhatsapp } from "react-icons/fa";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const [isScrolled, setIsScrolled] = useState(false);


//   useEffect(() => {
 
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true); 
//       } else {
//         setIsScrolled(false); 
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//   }, []);
//   const splitText = (text) => text.split("");

//   const letterVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: 
//       (index) => ({
//         opacity: 1,
//         y: 0,
//         transition: {
//           delay: index * 0.05, // Staggered delay based on index
//           type: "spring",
//           stiffness: 100,
//         },
//     }),
//   };

//    const containerVariants = {
//     hidden: {},
//     visible: {
//       transition: {
//         staggerChildren: 1, // Delay between letters
//       },
//     },
//   };
//   const menuItems = [
//     { label: "Home", href: "/" },
//     { label: "About", href: "/about" },
//     { label: "Offline Track", href: "/offlinetrack" },
//     { label: "Online Track", href: "/onlinetrack" },
//     // { label: "Login", href: "/login" },
//     // { label: "Register", href: "/signup" },
//     // { label: "Admin", href: "/admlogin" },
//     { label: "Team", href: "/team" },
//   ];
//   const menuItems2 = [
//     { label: "Admin Login", href: "/admlogin" },
//     { label: "Admin Register", href: "/admregistration" },
//     { label: "Tracks", href: "/tracks" },
//     { label: "Login", href: "/login" },
//     {label:"Sign Up", href:"/signup"}
//   ];


//   const socialLinks = [
//       { icon: FaInstagram, url: 'https://www.instagram.com/avishkaar.aitam?igsh=MXRvZ3NpMDhhZms3bg==', label: 'Instagram', color: 'hover:text-pink-500' },
//       { icon: FaLinkedin, url: 'https://www.linkedin.com/school/aitamofficial/', label: 'LinkedIn', color: 'hover:text-blue-600' },
//       { icon: FaYoutube, url: 'https://www.youtube.com/@aitamofficial', label: 'YouTube', color: 'hover:text-red-500' },
//       { icon: FaWhatsapp, url: 'https://wa.me/7386759626', label: 'WhatsApp', color: 'hover:text-green-500' }
//     ];
  
//     const contactInfo = [
//     {
//       name: "K.Kranthi Kiran",
//       phone: "+91 7386759626",
//       whatsapp: "https://wa.me/7386759626",
//     },
//     {
//       name: "N Harshitha",
//       phone: "+91 9704279188",
//       whatsapp: "https://wa.me/9704279188",
//     },
//     {
//       icon: FaMapMarkerAlt,
//       text: "Aditya Institute of Technology And Management, Tekkali",
//       link: "https://maps.app.goo.gl/ELGK577RKGmfnQc48",
//     },
//     {
//       icon: FaEnvelope,
//       text: "avishkaar@adityatekkali.edu.in",
//       link: "mailto:avishkaar@adityatekkali.edu.in",
//     },
//   ];
  
  
//   return (
//     <div className="relative">
 
//       <nav
//       className={`fixed w-full z-40 py-2 px-6 transition-colors bg-slate-950 md:bg-transparent duration-1000 ease-in-out ${
//         isScrolled ? "bg-slate-950" : "bg-transparent"
//       }`}
//     >
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <div className="flex items-center bg-slate-950 p-2 mt-2 gap-3">
//             <Link to="/" className={`title no-underline bg-slate-950 transition duration-700 text-5xl font-serif font-bold`}>
//               <img src={logo} className="h-14"/>
//             </Link>
//             <Link to="/" className={`title no-underline bg-white p-2 rounded transition duration-700 text-5xl font-serif font-bold`}>
//               <img src={logo2} className="h-14"/>
//             </Link>
//           </div>
          
//           <div className="relative group inline-block">
//             <button
//               onClick={toggleMenu}
//               className="text-gray-900 focus:outline-none px-4 py-2 text-cyan-400 rounded-md focus:outline-none"
//             >

//               <svg
//                 className={`h-6 w-6 transform transition-transform duration-300 ${
//                   isOpen ? "rotate-90" : "rotate-0"
//                 } ${isScrolled ? "text-cyan-400" : "text-cyan-400"}`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                   d={
//                     isOpen
//                       ? "M6 18L18 6M6 6l12 12"
//                       : "M4 6h16M4 12h16M4 18h16"
//                   }
//                 />
//               </svg>
//             </button>
//             <motion.div
//         className="absolute top-1 -mt-2 -ml-4 left-0 transform -translate-x-1/2 mt-2 flex space-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-1000"
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//       >
//         {splitText(isOpen ? "Close" : "Open").map((char, index) => (
//           <motion.span
//             key={char}
//             variants={letterVariants}
//             custom={index}
//             // initial="hidden"
//             // animate="visible"
//             className={`text-xl py-1 rounded-md ${isScrolled ? "text-blue-600" : "text-cyan-400"}`}
//           >
//             {char}
//           </motion.span>
//         ))}
//       </motion.div>
//           </div> 
//           </div>
//         </div>
//       </nav>
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-slate-950 text-white z-30 transition-all duration-1000 ease-in-out ${
//           isOpen ? "translate-y-0 scale-100" : "-translate-y-full scale-100"
//         }`}
//       >
//         {/* <h2 className="absolute  text-center  inset-0 text-cyan-400 top-1/2 left-10 text-9xl font-bold opacity-40 font-serif -z-10 select-none">
//           MENU
//         </h2> */}
//          <div className="absolute top-4 right-4 p-4">
//         </div>

//          <div className="flex  h-full md:flex-row flex-col justify-center items-start md:items-center ml-5 pt-16 space-8">
//         <div className="lg:w-1/2">
//           <MenuLinks  menuItems={menuItems} onLinkClick={() => setIsOpen(false)} />
//         </div>
//         {/* <div className="lg:w-1/2 mt-4 md:mt-0">          
//            <MenuLinks  menuItems={menuItems2} onLinkClick={() => setIsOpen(false)} /> 

//         </div> */}
//         ;

// <div className="lg:w-1/2 mt-10 md:mt-0 px-6 flex flex-col justify-center space-y-6">
//   {/* Title */}
//   <motion.h3
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//     className="text-3xl md:text-4xl font-bold text-cyan-400"
//   >
//     Avishkaar Season 3 @ AITAM
//   </motion.h3>

//   {/* Description */}
//   <motion.p
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: 0.1 }}
//     className="text-gray-400 text-sm md:text-base leading-relaxed"
//   >
//     AITAM’s flagship National-Level Techno-Cultural Symposium — where
//     innovation meets creativity. Join us this season for hackathons,
//     workshops, and cultural fests that ignite ideas and connect brilliant minds.
//   </motion.p>

//   {/* Social Links */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: 0.2 }}
//     className="flex space-x-5 text-xl mt-4"
//   >
//     {socialLinks.map((item, index) => (
//       <a
//         key={index}
//         href={item.url}
//         target="_blank"
//         rel="noopener noreferrer"
//         aria-label={item.label}
//         className={`text-gray-400 transition-colors duration-300 ${item.color}`}
//       >
//         <item.icon />
//       </a>
//     ))}
//   </motion.div>

//   {/* Contact Info */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: 0.3 }}
//     className="space-y-3 text-gray-300 text-sm md:text-base mt-4"
//   >
//     <h4 className="text-cyan-400 font-semibold text-lg">Contact Us</h4>

//     {contactInfo.slice(0, 2).map((contact, idx) => (
//       <div key={idx} className="flex items-center gap-3">
//         <FaPhone className="text-cyan-400" />
//         <a href={`tel:${contact.phone}`} className="hover:text-white transition">
//           {contact.name}: {contact.phone}
//         </a>
//         <a
//           href={contact.whatsapp}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-green-500 hover:text-green-400 transition"
//         >
//           <FaWhatsapp />
//         </a>
//       </div>
//     ))}

//     {/* Address */}
//     <div className="flex items-start gap-3">
//       <contactInfo[2].icon className="text-cyan-400 mt-1" />
//       <a
//         href={contactInfo[2].link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="hover:text-white transition"
//       >
//         {contactInfo[2].text}
//       </a>
//     </div>

//     {/* Email */}
//     <div className="flex items-start gap-3">
//       <contactInfo[3].icon className="text-cyan-400 mt-1" />
//       <a
//         href={contactInfo[3].link}
//         className="hover:text-white transition"
//       >
//         {contactInfo[3].text}
//       </a>
//     </div>
//   </motion.div>

//   {/* CTA */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.6, delay: 0.4 }}
//   >
//     <a
//       href="/about"
//       onClick={() => setIsOpen(false)}
//       className="inline-block mt-6 px-6 py-2 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all"
//     >
//       Learn More
//     </a>
//   </motion.div>
// </div>

//          </div>

//         </div>
//       </div>

//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/aitam_white-title_logo.png";
import logo2 from "../assets/iic.png";
import MenuLinks from "./MenuLinks";
import {

  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const splitText = (text) => text.split("");

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.05, type: "spring", stiffness: 100 },
    }),
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 1 } },
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Offline Track", href: "/offlinetrack" },
    { label: "Online Track", href: "/onlinetrack" },
    { label: "Team", href: "/team" },
  ];

  const socialLinks = [
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/avishkaar.aitam?igsh=MXRvZ3NpMDhhZms3bg==",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/school/aitamofficial/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: FaYoutube,
      url: "https://www.youtube.com/@aitamofficial",
      label: "YouTube",
      color: "hover:text-red-500",
    },
    {
      icon: FaWhatsapp,
      url: "https://wa.me/7386759626",
      label: "WhatsApp",
      color: "hover:text-green-500",
    },
  ];

  const contactInfo = [
    {
      name: "K.Kranthi Kiran",
      phone: "+91 7386759626",
      whatsapp: "https://wa.me/7386759626",
    },
    {
      name: "N Harshitha",
      phone: "+91 9704279188",
      whatsapp: "https://wa.me/9704279188",
    },
    {
      icon: FaMapMarkerAlt,
      text: "Aditya Institute of Technology And Management, Tekkali",
      link: "https://maps.app.goo.gl/ELGK577RKGmfnQc48",
    },
    {
      icon: FaEnvelope,
      text: "avishkaar@adityatekkali.edu.in",
      link: "mailto:avishkaar@adityatekkali.edu.in",
    },
  ];

  return (
    <div className="relative">
      {/* ===== Navbar ===== */}
      <nav
        className={`fixed w-full z-40 py-2 md:px-6 transition-colors duration-1000 ease-in-out ${
          isScrolled ? "bg-slate-950" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-1 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* ===== Logos ===== */}
            <div className="flex items-center bg-slate-950 p-2 mt-2 gap-3 rounded-md">
              <Link to="/">
                <img src={logo} alt="AITAM Logo" className="h-14" />
              </Link>
              <Link to="/">
                <img src={logo2} alt="IIC Logo" className="h-14 rounded bg-white p-2" />
              </Link>
            </div>

            {/* ===== Menu Button ===== */}
            <div className="relative group inline-block">
              <button
                onClick={toggleMenu}
                className="focus:outline-none px-4 py-2 text-cyan-400"
              >
                <svg
                  className={`h-6 w-6 transform transition-transform duration-300 ${
                    isOpen ? "rotate-90" : "rotate-0"
                  } text-cyan-400`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>

              {/* Text Animation */}
              <motion.div
                className="absolute top-1 -mt-2 -ml-4 left-0 transform -translate-x-1/2 mt-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-700"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {splitText(isOpen ? "Close" : "Open").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    custom={index}
                    className="text-xl py-1 rounded-md text-cyan-400"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </nav>

      {/* ===== Fullscreen Menu ===== */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-slate-950 text-white z-30 transition-all duration-1000 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col md:flex-row h-full justify-center items-start md:items-center ml-5 pt-16">
          {/* ===== Left Menu Links ===== */}
          <div className="lg:w-1/2">
            <MenuLinks
              menuItems={menuItems}
              onLinkClick={() => setIsOpen(false)}
            />
          </div>

          {/* ===== Right Section ===== */}
          <div className="lg:w-1/2 hidden md:block mt-10 md:mt-0 px-6 flex flex-col justify-center space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl orbitron md:text-4xl font-bold text-cyan-600"
            >
              Avishkaar Season 3 
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-sm md:text-base leading-relaxed"
            >
              Aavishkar is a 48-hour innovation marathon that challenges bright minds to turn bold ideas into real-world solutions.
After two successful seasons, Aavishkar returns bigger and better — now in two phases: a 24-hour online hackathon and an on-campus 48-hour grand finale.
Across themes like AI, Robotics, Sustainability, Smart Systems, and Emerging Technologies, participants from across India come together to create, collaborate, and compete. Experience hands-on mentoring, expert-led workshops, and an electrifying atmosphere of creativity and problem-solving.
Join us as we push boundaries, prototype the future, and shape ideas that can make a difference.
Because at Aavishkar — innovation never sleeps.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex space-x-5 text-xl mt-4"
            >
              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`text-gray-400 transition-colors duration-300 ${item.color}`}
                >
                  <item.icon />
                </a>
              ))}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 text-gray-300 text-sm md:text-base mt-4"
            >
              <h4 className=" font-semibold text-lg">Contact Us</h4>

              {contactInfo.slice(0, 2).map((contact, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <FaPhone className="text-cyan-400" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="hover:text-white transition"
                  >
                    {contact.name}: {contact.phone}
                  </a>
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 hover:text-green-400 transition"
                  >
                    <FaWhatsapp />
                  </a>
                </div>
              ))}

              {/* Address */}
              <div className="flex items-start gap-3">
                {React.createElement(contactInfo[2].icon, { className: "text-cyan-400 mt-1" })}
                <a
                  href={contactInfo[2].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  {contactInfo[2].text}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                {React.createElement(contactInfo[3].icon, { className: "text-cyan-400 mt-1" })}
                <a
                  href={contactInfo[3].link}
                  className="hover:text-white transition"
                >
                  {contactInfo[3].text}
                </a>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="inline-block mt-6 px-6 py-2 bg-cyan-500 text-black font-semibold rounded-full hover:bg-cyan-400 transition-all"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
