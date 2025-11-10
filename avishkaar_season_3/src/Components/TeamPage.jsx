import React from "react";
import { motion } from "framer-motion";
import bharath from "../assets/Team/Bharathvarma.webp";
import image1 from "../assets/photos/Kranthi_Kiran_Kelam.jpg";
import image2 from "../assets/photos/Harshitha_Nakkala.jpg";
import image3 from "../assets/photos/Ekshitha_Lakkoju.jpeg";
import image4 from "../assets/photos/Sanapala_Haritha.jpg";
import image5 from "../assets/photos/Muddada_Niranjan.jpg";
import image6 from "../assets/photos/Harika_Golusu.jpg";
import image7 from "../assets/photos/Sahukari_Siddhartha.jpg";
import image8 from "../assets/photos/Pragathi_Duggivalasa.jpg";
import image9 from "../assets/photos/Bharath_Varma.jpg";
import image10 from "../assets/photos/Mithil.jpg";
import image11 from "../assets/photos/Praneeth.jpg";
import image12 from "../assets/photos/Kowshik.jpg";
import image13 from "../assets/photos/MAVK_Raghavan.jpg";
import image14 from "../assets/photos/Guntuku_Chinmay.jpg";
import image15 from "../assets/photos/Hari_Charan_Agatamudi.jpg";
import image16 from "../assets/photos/Govardhan_Rao_Vamaravalli.jpg";
import image17 from "../assets/photos/MV_Sai_Keerthi.jpg";
import image18 from "../assets/photos/Harish_Sasanapuri.jpg";
import image19 from "../assets/photos/Vamsi_Sharma.jpg";
import image20 from "../assets/photos/Kondala_Sravanti.jpg";
import image21 from "../assets/photos/Saikamal_Suro.jpg";
import image22 from "../assets/photos/Thonangi_Prasanth_Kumar.jpg";
import image23 from "../assets/photos/Nadipena_Varunkumar.jpg";
import image24 from "../assets/photos/Kancharana_Durga_Prasad.jpg";
import image25 from "../assets/photos/Yedla_Yaswanth.jpg";
import image26 from "../assets/photos/Gorribanda_Tarun_Kumar.jpg";
import image27 from "../assets/photos/Aswin_Kumar_Yalla.jpg";
import image28 from "../assets/photos/Thanisha_Potta.jpg";
import image29 from "../assets/photos/Saranya_Kalivarapu.jpg";
import image30 from "../assets/photos/Sonalika_Panda.jpg";
import image31 from "../assets/photos/Jashmin_Jena.jpg";
import image32 from "../assets/photos/Patnaikuni_Chandini.jpg";
import image33 from "../assets/photos/Akasapu_Gayatri.jpg";
import image34 from "../assets/photos/U_Rajeswara_Rao.jpg";
import image35 from "../assets/photos/Tangudu_Sowmya.jpg";
const TeamPage = () => {
  const teamMembers = [
  { id: 1, name: "Kranthi Kiran Kelam", image: image1, role: "Convener", branch: "CSM" },
  { id: 2, name: "Harshitha Nakkala", image: image2, role: "Co Convener", branch: "CSM" },
  { id: 3, name: "Ekshitha Lakkoju", image: image3, role: "Quality Assurance", branch: "CSM" },
  { id: 4, name: "Sanapala Haritha", image: image4, role: "Quality Assurance", branch: "CSE" },
  { id: 5, name: "Muddada Niranjan", image: image5, role: "Finance", branch: "EEE" },
  { id: 6, name: "Harika Golusu", image: image6, role: "Promotions", branch: "CSM" },
  { id: 7, name: "Sahukari Siddhartha", image: image7, role: "Promotions", branch: "MBA" },
  { id: 8, name: "Pragathi Duggivalasa", image: image8, role: "Promotions", branch: "CSM" },
  { id: 21, name: "Saikamal Suro", image: image21, role: "Web", branch: "CSD" },
  { id: 22, name: "Thonangi Prasanth Kumar", image: image22, role: "Web", branch: "CSE" },
  { id: 9, name: "Bharath Varma", image: image9, role: "Design", branch: "CSE" },
  { id: 10, name: "Mithil", image: image10, role: "Design", branch: "CSD" },
  { id: 11, name: "Praneeth", image: image11, role: "Media", branch: "CSE" },
  { id: 12, name: "Kowshik", image: image12, role: "Media", branch: "CSE" },
  { id: 13, name: "MAVK Raghavan", image: image13, role: "Outreach", branch: "CSD" },
  { id: 14, name: "Guntuku Chinmay", image: image14, role: "Outreach", branch: "CSM" },
  { id: 15, name: "Hari Charan Agatamudi", image: image15, role: "Sponsorships", branch: "CSM" },
  { id: 16, name: "Govardhan Rao Vamaravalli", image: image16, role: "Sponsorships", branch: "ECE" },
  { id: 17, name: "MV Sai Keerthi", image: image17, role: "Art & Creative", branch: "CSM" },
  { id: 18, name: "Harish Sasanapuri", image: image18, role: "Art & Creative", branch: "CSE" },
  { id: 19, name: "Vamsi Sharma", image: image19, role: "Entertainment", branch: "CSE" },
  { id: 20, name: "Kondala Sravanti", image: image20, role: "Entertainment", branch: "CSM" },

  { id: 23, name: "Nadipena Varunkumar", image: image23, role: "Tech Team", branch: "IT" },
  { id: 24, name: "Kancharana Durga Prasad", image: image24, role: "Tech Team", branch: "ECE" },
  { id: 25, name: "Yedla Yaswanth", image: image25, role: "Food & Logistics", branch: "CSE" },
  { id: 26, name: "Gorribanda Tarun Kumar", image: image26, role: "Food & Logistics", branch: "IT" },
  { id: 27, name: "Aswin Kumar Yalla", image: image27, role: "Travel & Accommodation", branch: "MECH" },
  { id: 28, name: "Thanisha Potta", image: image28, role: "Travel & Accommodation", branch: "ECE" },
  { id: 29, name: "Saranya Kalivarapu", image: image29, role: "Reporting", branch: "CIVIL" },
  { id: 30, name: "Sonalika Panda", image: image30, role: "Reporting", branch: "EEE" },
  { id: 31, name: "Jashmin Jena", image: image31, role: "Registration", branch: "IT" },
  { id: 32, name: "Patnaikuni Chandini", image: image32, role: "Registration", branch: "MCA" },
  { id: 33, name: "Akasapu Gayatri", image: image33, role: "Registration", branch: "CSD" },
  { id: 34, name: "U Rajeswara Rao", image: image34, role: "Corporate Relations", branch: "CSD" },
  { id: 35, name: "Tangudu Sowmya", image: image35, role: "Corporate Relations", branch: "EEE" }
];

  return (
    <div className="min-h-screen max-w-[95%] md:max-w-[80%] text-white overflow-hidden mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER */}
      <div className="text-center mt-20 py-16">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold mb-6 orbitron tracking-wide text-cyan-600"
        >
          OUR TEAM
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Meet the passionate individuals powering our mission. Together, we're
          redefining collaboration.
        </motion.p>
      </div>

      {/* TEAM GRID */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-8xl mx-auto pb-20"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="group relative bg-gradient-to-br from-gray-800/60 via-gray-900/40 to-slate-900/20 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] transition-all duration-700 overflow-hidden"
          >
            {/* Glow Border */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-cyan-400/30 via-slate-500/30 to-cyan-400/30 blur-xl transition-all duration-700"></div>

            {/* IMAGE */}
            <div className="relative mb-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-72 object-cover grayscale group-hover:grayscale-0 rounded-xl border border-white/10 group-hover:border-cyan-400/60 transition-all duration-500"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-transparent via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>

            {/* INFO */}
            <div className="text-center relative z-10">
              <h3 className="text-xl font-bold text-white mb-1 orbitron">
                {member.name}
              </h3>
              <p className="text-cyan-300 font-semibold text-xs mb-3 uppercase tracking-wider">
                {member.role}
              </p>
              <p className="text-gray-400 italic text-sm leading-relaxed">
                "{member.branch}"
              </p>
            </div>

            {/* Bottom Border */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 via-slate-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamPage;