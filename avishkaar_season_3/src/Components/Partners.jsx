// import { motion } from "framer-motion";
// import gfg from "../assets/partners/gfg.jpg";
// import brandingjester from "../assets/partners/brandingjester.png";
// import Flashootlogo from "../assets/partners/Flashootlogo.png";
// import ItemRise from "../assets/partners/Aitamrise.png";
// const partners = [
//   { image: gfg, name: "Gfg" },
//   { image: brandingjester, name: "Branding Jester" },
//   { image: Flashootlogo, name: "Flashoot" },
//   { image: ItemRise, name: "Aitamrise" },
// ];

// const Partners = () => {
//   return (
//     <section className="relative w-full py-16 px-6 bg-transparent flex flex-col items-center">
//       {/* Title */}
//       <motion.h2
//         initial={{ opacity: 0, y: -20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         viewport={{ once: true }}
//         className="orbitron text-3xl md:text-4xl font-semibold text-center text-cyan-600 mb-12"
//       >
//         OUR PARTNERS
//       </motion.h2>

//       {/* Logo Grid */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10 md:gap-16 justify-items-center">
//         {partners.map((partner, index) => (
//           <motion.div
//             key={index}
//             className="flex flex-col items-center group cursor-pointer"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: index * 0.1 }}
//             viewport={{ once: true }}
//           >
//             {/* Logo */}
//             <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
//               <motion.img
//                 src={partner.image}
//                 alt={partner.name}
//                 className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300 filter group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]"
//                 whileHover={{ scale: 1.05 }}
//               />
//             </div>

//             {/* Label */}
//             <p className="text-sm md:text-base text-slate-500 mt-3 font-medium tracking-wide group-hover:text-white transition-colors duration-300">
//               {partner.name}
//             </p>
//           </motion.div>
//         ))}
//       </div>

//       {/* Soft glow accent under section */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[120px] bg-gradient-to-t from-blue-600/20 to-transparent blur-3xl pointer-events-none"></div>
//     </section>
//   );
// };

// export default Partners;
import { motion } from "framer-motion";
import gfg from "../assets/partners/gfg.jpg";
import brandingjester from "../assets/partners/brandingjester.png";
import Flashootlogo from "../assets/partners/Flashootlogo.png";
import ItemRise from "../assets/partners/Aitamrise.png";
import unstop from '../assets/sponsers/unstop.png';
import gdg from '../assets/partners/gdglogo.png';
const mediaPartners = [
  { image: brandingjester, name: "Branding Jester" },
  { image: Flashootlogo, name: "Flashoot" },
];

const outreachPartners = [
  { image: gfg, name: "GFG" },
  { image: gdg, name: "GDG" },
];

const incubationPartner = [
  { name: "Aitamrise Incubator" }, // 👈 removed image
];

const platformPartners = [
  { image: unstop, name: "Unstop" },
];

const Partners = () => {
  return (
    <section className="relative w-full py-16 px-2 md:px-6 bg-transparent flex flex-col items-center">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="orbitron text-3xl md:text-4xl mt-24 font-semibold text-center text-cyan-600 mb-18"
      >
        OUR PARTNERS
      </motion.h2>

      {/* 4 Partner Categories in One Row */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-2 md:gap-5 w-full max-w-7xl">
        <PartnerCategory title="Outreach Partners" partners={outreachPartners} />
        <PartnerCategory title="Media Partners" partners={mediaPartners} />
        <PartnerCategory title="Incubation Partner" partners={incubationPartner} textOnly /> {/* 👈 added prop */}
        <PartnerCategory title="Platform Partners" partners={platformPartners} />
      </div>

      {/* Soft glow accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[120px] bg-gradient-to-t from-blue-300/20 to-transparent blur-3xl pointer-events-none"></div>
    </section>
  );
};

export default Partners;

/* --------------------------
   Reusable PartnerCategory Component
---------------------------*/
const PartnerCategory = ({ title, partners, textOnly = false }) => (
  <div className="flex flex-col items-center text-center w-full flex-1">
    {/* Subheading */}
    <motion.h3
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-xl md:text-2xl  font-semibold text-white mb-8 orbitron"
    >
      {title}
    </motion.h3>

    {/* Partner Section */}
    <div className="flex w-full flex-wrap justify-center gap-3 items-center">
      {partners.map((partner, index) => (
        <motion.div
          key={index}
          className="flex flex-col justify-center items-center group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Conditional Rendering */}
          {textOnly ? (
            <p className="text-lg md:text-xl orbitron group-hover:text-white text-slate-300 font-semibold tracking-wide">
              {partner.name}
            </p>
          ) : (
            <>
              {/* Logo */}
              <div className="relative flex items-center justify-center">
                <motion.img
                  src={partner.image}
                  alt={partner.name}
                  className="w-24 h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300 filter group-hover:drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]"
                  whileHover={{ scale: 1.05 }}
                />
              </div>

              {/* Label */}
              <p className="text-sm md:text-base text-slate-500 mt-3 font-medium tracking-wide group-hover:text-white transition-colors orbitron duration-300">
                {partner.name}
              </p>
            </>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);
