// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { 
 
//   FaInstagram, 
//   FaLinkedin, 
 
//   FaEnvelope, 
//   FaPhone, 
//   FaMapMarkerAlt,

//   FaYoutube,
//   FaWhatsapp,
//   FaArrowRight,
//   FaExternalLinkAlt
// } from 'react-icons/fa';
// // import GlitchText from './GlitchText';
// import Glitchtext2 from './Glitchtext2';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const quickLinks = [
//     { name: 'Home', path: '/', icon: FaArrowRight },
//     { name: 'About Us', path: '/about-us', icon: FaArrowRight },
//     { name: 'Services', path: '/services', icon: FaArrowRight },
//     { name: 'Projects', path: '/projects', icon: FaArrowRight },
//     { name: 'Blog', path: '/blog', icon: FaArrowRight },
//     { name: 'Contact', path: '/contact', icon: FaArrowRight }
//   ];

//   // const services = [
//   //   { name: 'Web Development', path: '/services/web-development', icon: FaArrowRight },
//   //   { name: 'UI/UX Design', path: '/services/ui-ux-design', icon: FaArrowRight },
//   //   { name: 'Graphic Design', path: '/services/graphic-design', icon: FaArrowRight },
//   //   { name: 'Photography', path: '/services/photography', icon: FaArrowRight },
//   //   { name: 'Digital Marketing', path: '/services/digital-marketing', icon: FaArrowRight },
//   //   { name: 'Power BI', path: '/services/power-bi', icon: FaArrowRight },
//   //   { name: 'Tutoring', path: '/services/tutoring', icon: FaArrowRight }
//   // ];

//   const legalLinks = [
//     { name: 'Privacy Policy', path: '/privacy-policy', icon: FaExternalLinkAlt },
//     { name: 'Terms & Conditions', path: '/terms-conditions', icon: FaExternalLinkAlt }
//   ];

//   const socialLinks = [
//     // { icon: FaFacebook, url: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
//     // { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter', color: 'hover:text-blue-400' },
//     { icon: FaInstagram, url: 'https://www.instagram.com/avishkaar.aitam?igsh=MXRvZ3NpMDhhZms3bg==', label: 'Instagram', color: 'hover:text-pink-500' },
//     { icon: FaLinkedin, url: 'https://www.linkedin.com/school/aitamofficial/', label: 'LinkedIn', color: 'hover:text-blue-600' },
//     // { icon: FaGithub, url: 'https://github.com', label: 'GitHub', color: 'hover:text-gray-300' },
//     // { icon: FaDribbble, url: 'https://dribbble.com', label: 'Dribbble', color: 'hover:text-pink-400' },
//     // { icon: FaBehance, url: 'https://behance.net', label: 'Behance', color: 'hover:text-blue-500' },
//     { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube', color: 'hover:text-red-500' },
//     { icon: FaWhatsapp, url: 'https://wa.me/916301680216', label: 'WhatsApp', color: 'hover:text-green-500' }
//   ];

//   const contactInfo = [
//     { icon: FaMapMarkerAlt, text: 'Aditya Institution of Technology And Management, Tekkali, Andhra Pradesh, India', link: null },
//     { icon: FaPhone, text: '+91 7386759626', link: 'tel:+91 7386759626' },
//     { icon: FaEnvelope, text: 'avishkaar2024@adityatekkali.edu.in', link: 'mailto:avishkaar2024@adityatekkali.edu.in' },
//     { icon: FaWhatsapp, text: 'WhatsApp: +91 7386759626' , link: 'https://wa.me/7386759626' }
//   ];

//   const linkVariants = {
//     hover: {
//       x: 5,
//       transition: {
//         duration: 0.2,
//         ease: "easeInOut"
//       }
//     }
//   };

//   const iconVariants = {
//     hover: {
//       scale: 1.2,
//       rotate: 15,
//       transition: {
//         duration: 0.3,
//         ease: "easeInOut"
//       }
//     }
//   };

//   return (
//     <footer className="relative  mb-24 min-h-screen bg-transparent text-white">
//       {/* Animated Background */}
//       {/* <div className="absolute inset-0 bg-transparent">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.2)_0%,transparent_60%)]"></div>
//       </div> */}

      
//       {/* Main Footer Content */}
//       <div className="relative min-h-screen flex flex-col">
//         <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
//           {/* Top Section with Logo and Description */}
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="mb-8"
//             >
//               <Link to="/" className="inline-flex items-center space-x-3 group">
                
//                 <Glitchtext2/>
//               </Link>
//             </motion.div>
            
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-gray-400 text-lg max-w-6xl mx-auto leading-relaxed"
//             >
//               Welcome to the Official Website of Avishkaar Season 3 — a high-energy arena where innovation meets impact.
// Step into an immersive hackathon experience that celebrates creativity, teamwork, and cutting-edge technology. From AI and web to AR/VR, IoT, and sustainability, Avishkaar brings together brilliant minds to prototype bold ideas, build real solutions, and present them to mentors and industry leaders.
// Join us for 48 hours of focused problem-solving, lightning workshops, deep-dive mentoring, and live demos — where every commit pushes the future forward and every project can spark change. 

//             </motion.p>
//           </div>

//           {/* Main Grid Layout */}
//           <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-4 gap-12 lg:gap-16">
//             {/* Quick Links */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               <h3 className="text-xl  font-orbit font-bold mb-6 text-white border-b border-white/20 pb-2">
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 {quickLinks.map((link, index) => (
//                   <motion.li 
//                     key={link.name}
//                     initial={{ opacity: 0, x: -10 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
//                   >
//                     <Link
//                       to={link.path}
//                       className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
//                     >
//                       <motion.div
//                         variants={linkVariants}
//                         whileHover="hover"
//                         className="flex items-center space-x-2 w-full"
//                       >
//                         <span className="text-sm">{link.name}</span>
//                         <motion.div
//                           variants={iconVariants}
//                           whileHover="hover"
//                           className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         >
//                           <link.icon className="w-3 h-3" />
//                         </motion.div>
//                       </motion.div>
//                     </Link>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.5 }}
//             >
//               <h3 className="text-xl font-orbit font-bold mb-6 text-white border-b border-white/20 pb-2">
//                 Contact Us
//               </h3>
//               <ul className="space-y-4">
//                 {contactInfo.map((contact, index) => (
//                   <motion.li 
//                     key={index}
//                     initial={{ opacity: 0, x: -10 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
//                     className="flex items-start space-x-3 group"
//                   >
//                     <motion.div
//                       variants={iconVariants}
//                       whileHover="hover"
//                       className="w-5 h-5 text-white mt-1 flex-shrink-0"
//                     >
//                       <contact.icon />
//                     </motion.div>
//                     {contact.link ? (
//                       <a 
//                         href={contact.link}
//                         className="text-gray-400 hover:text-white transition-colors duration-300 text-sm leading-relaxed"
//                       >
//                         {contact.text}
//                       </a>
//                     ) : (
//                       <span className="text-gray-400 text-sm leading-relaxed">
//                         {contact.text}
//                       </span>
//                     )}
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Legal Links */}
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               whileInView={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.6 }}
//             >
//               <h3 className="text-xl font-orbit font-bold mb-6 text-white border-b border-white/20 pb-2">
//                 Legal
//               </h3>
//               <ul className="space-y-3">
//                 {legalLinks.map((link, index) => (
//                   <motion.li 
//                     key={link.name}
//                     initial={{ opacity: 0, x: -10 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
//                   >
//                     <Link
//                       to={link.path}
//                       className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
//                     >
//                       <motion.div
//                         variants={linkVariants}
//                         whileHover="hover"
//                         className="flex items-center space-x-2 w-full"
//                       >
//                         <span className="text-sm">{link.name}</span>
//                         <motion.div
//                           variants={iconVariants}
//                           whileHover="hover"
//                           className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                         >
//                           <link.icon className="w-3 h-3" />
//                         </motion.div>
//                       </motion.div>
//                     </Link>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </div>

//           {/* Social Media Section */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.8 }}
//             className="mt-16 text-center"
//           >
//             <h3 className="text-xl font-orbit font-bold mb-8 text-white">
//               Follow Us
//             </h3>
//             <div className="flex flex-wrap justify-center gap-4">
//               {socialLinks.map((social, index) => (
//                 <motion.a
//                   key={social.label}
//                   href={social.url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   initial={{ opacity: 0, scale: 0 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
//                   whileHover={{ 
//                     scale: 1.2,
//                     rotate: 15,
//                     y: -5
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-all duration-300 group hover:border-white/40 ${social.color}`}
//                 >
//                   <social.icon className="text-xl" />
                  
//                   {/* Glow Effect */}
//                   <motion.div
//                     className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100"
//                     animate={{
//                       scale: [1, 1.3, 1],
//                       opacity: [0, 0.3, 0],
//                     }}
//                     transition={{
//                       duration: 2,
//                       repeat: Infinity,
//                       ease: 'easeInOut'
//                     }}
//                   />

//                   {/* Particle Effects */}
//                   <motion.div
//                     className="absolute -top-1 -right-1 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100"
//                     animate={{
//                       y: [0, -8],
//                       opacity: [0, 1, 0],
//                     }}
//                     transition={{
//                       duration: 1.5,
//                       repeat: Infinity,
//                       delay: 0.5
//                     }}
//                   />
//                 </motion.a>
//               ))}
//             </div>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 1 }}
//           className="border-t border-white/10  backdrop-blur-sm"
//         >
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//               <motion.p 
//                 className="text-gray-400 text-sm font-orbit"
//                 whileHover={{ scale: 1.2 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 © {currentYear} Designed and developed by <a href="https://aitamsac.in/ssc/index.php" target='_blank' className='text-cyan-400 hover:text-underline'> SSC </a>. All rights reserved.
//               </motion.p>
//               <div className="flex space-x-6">
//                 <Link 
//                   to="/privacy-policy" 
//                   className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-orbit group"
//                 >
//                   <span className="group-hover:underline">Privacy Policy</span>
//                 </Link>
//                 <Link 
//                   to="/terms-conditions" 
//                   className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-orbit group"
//                 >
//                   <span className="group-hover:underline">Terms & Conditions</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaInstagram, 
  FaLinkedin, 
  FaEnvelope,  
  FaMapMarkerAlt,
  FaYoutube,
  FaWhatsapp,
  FaArrowRight
} from 'react-icons/fa';
import { FaPhone } from "react-icons/fa6";
import Glitchtext2 from './Glitchtext2';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/', icon: FaArrowRight },
    { name: 'About Us', path: '/about', icon: FaArrowRight },
    // { name: 'Login', path: '/login', icon: FaArrowRight },
    // { name: 'Register', path: '/register', icon: FaArrowRight },
    { name: 'Team', path: '/team', icon: FaArrowRight },
    { name: 'Tracks', path: '/tracks', icon: FaArrowRight }
  ];

  const socialLinks = [
    { icon: FaInstagram, url: 'https://www.instagram.com/avishkaar.aitam?igsh=MXRvZ3NpMDhhZms3bg==', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: FaLinkedin, url: 'https://www.linkedin.com/school/aitamofficial/', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: FaYoutube, url: 'https://www.youtube.com/@aitamofficial', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: FaWhatsapp, url: 'https://wa.me/7386759626', label: 'WhatsApp', color: 'hover:text-green-500' }
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


  const linkVariants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="relative mb-24 min-h-screen bg-transparent text-white">
      {/* Main Footer Content */}
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Top Section with Logo and Description */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <Link to="/" className="inline-flex items-center space-x-3 group">
                <Glitchtext2/>
              </Link>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg max-w-6xl mx-auto leading-relaxed"
            >
              Welcome to the Official Website of Avishkaar Season 3 — a high-energy arena where innovation meets impact.
              Step into an immersive hackathon experience that celebrates creativity, teamwork, and cutting-edge technology. 
              From AI and web to AR/VR, IoT, and sustainability, Avishkaar brings together brilliant minds to prototype bold ideas, 
              build real solutions, and present them to mentors and industry leaders.
              Join us for 48 hours of focused problem-solving, lightning workshops, deep-dive mentoring, and live demos — 
              where every commit pushes the future forward and every project can spark change. 
            </motion.p>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-orbit font-bold mb-6 text-white border-b border-slate-700 pb-2">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center text-gray-400 hover:text-white transition-all duration-300"
                    >
                      <motion.div
                        variants={linkVariants}
                        whileHover="hover"
                        className="flex items-center space-x-2 w-full"
                      >
                        <span className="text-sm">{link.name}</span>
                        <motion.div
                          variants={iconVariants}
                          whileHover="hover"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          <link.icon className="w-3 h-3" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, delay: 0.5 }}
>
  <h3 className="text-xl font-orbit font-bold mb-6 text-white border-b border-slate-700 pb-2">
    Contact Us
  </h3>
  <ul className="space-y-4">
    {contactInfo.map((contact, index) => (
      <motion.li
        key={index}
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-1 sm:space-y-0 group"
      >
        {/* Name + Phone + WhatsApp */}
        {contact.name ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm">
            <div className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300">
              <FaPhone className="w-4 h-4 flex-shrink-0" />
              <a href={`tel:${contact.phone}`} className="hover:text-white">
                {contact.name} : {contact.phone}
              </a>
            </div>

            <div className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors duration-300">
              <FaWhatsapp className="w-4 h-4 flex-shrink-0" />
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-green-400"
              >
                WhatsApp
              </a>
            </div>
          </div>
        ) : (
          // Other contact details (Map & Email)
          <div className="flex items-start space-x-3">
            <contact.icon className="w-5 h-5 text-white mt-1 flex-shrink-0" />
            {contact.link ? (
              <a
                href={contact.link}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm leading-relaxed"
              >
                {contact.text}
              </a>
            ) : (
              <span className="text-gray-400 text-sm leading-relaxed">
                {contact.text}
              </span>
            )}
          </div>
        )}
      </motion.li>
    ))}
  </ul>
</motion.div>


            {/* Social Media Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-orbit font-bold mb-6 text-white border-b border-slate-700 pb-2">
                Follow Us
              </h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 15,
                      y: -5
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 transition-all duration-300 group hover:border-white/40 ${social.color}`}
                  >
                    <social.icon className="text-xl" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    />
                    <motion.div
                      className="absolute -top-1 -right-1 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -8],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 0.5
                      }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="border-t border-slate-700 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
  <motion.p 
    className="text-gray-400 orbitron text-center text-sm font-orbit"
    whileHover={{ scale: 1.2 }}
    transition={{ duration: 0.2 }}
  >
    Copyrights ©️ {currentYear} Designed and developed by 
    {" "}    
    <a href="https://www.linkedin.com/in/bhargava-naidu-jaddu-b60a6b214/" className='text-cyan-400 hover:text-underline' target="_blank" rel="noopener noreferrer"> Bhargav </a> 
    {""},{" "}
    <a href="https://www.linkedin.com/in/prasanth-kumar-thonangi/" className='text-cyan-400 hover:text-underline' target="_blank" rel="noopener noreferrer"> Prasanth </a>
    {" "}and{" "}
    <a href="https://www.linkedin.com/in/sai-kamal-suro-981320277/" className='text-cyan-400 hover:text-underline' target="_blank" rel="noopener noreferrer"> Sai Kamal </a>
    {" "}From{" "}
    <a href="https://aitamsac.in/ssc/index.php" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline"> SSC </a> 
    .
    All rights reserved.
  </motion.p>

  {/* <div className="flex space-x-6">
    <Link 
      to="/privacy-policy" 
      className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-orbit group"
    >
      <span className="group-hover:underline">Privacy Policy</span>
    </Link>
    <Link 
      to="/terms-conditions" 
      className="text-gray-400 hover:text-white transition-all duration-300 text-sm font-orbit group"
    >
      <span className="group-hover:underline">Terms & Conditions</span>
    </Link>
  </div> */}
</div>

          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;