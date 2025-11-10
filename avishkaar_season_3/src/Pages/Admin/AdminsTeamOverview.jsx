
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { QRCodeCanvas } from "qrcode.react";
// import QRCode from "qrcode";
// import { motion } from "framer-motion";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import logo1 from "../../assets/aitam_white-title_logo.png"
// export default function AdminsTeamDetails() {
//   const { teamId } = useParams();
//   const navigate = useNavigate();
//   const [team, setTeam] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [abstract, setAbstract] = useState(null);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [initialLoad, setInitialLoad] = useState(true);

//   const API_BASE = "http://localhost:5002/api";

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         const [teamRes, membersRes, abstractRes, resultsRes] = await Promise.all([
//           fetch(`${API_BASE}/teams/${teamId}`, { headers }),
//           fetch(`${API_BASE}/team-members/team/${teamId}`, { headers }),
//           fetch(`${API_BASE}/abstracts/team/${teamId}`, { headers }),
//           fetch(`${API_BASE}/abstract-results`, { headers }),
//         ]);

//         const teamData = await teamRes.json();
//         const membersData = await membersRes.json();
//         const abstractData = await abstractRes.json();
//         const resultsData = await resultsRes.json();
//         console.log("📦 Raw Abstract API Response:", membersData);

//         let abstractObj = null;
//         if (Array.isArray(abstractData)) {
//           abstractObj = abstractData[0];
//         } else if (abstractData?.data) {
//           abstractObj = Array.isArray(abstractData.data)
//             ? abstractData.data[0]
//             : abstractData.data;
//         } else {
//           abstractObj = abstractData;
//         }

//         const teamResult =
//           Array.isArray(resultsData.data) &&
//           resultsData.data.find((r) => r.team_id === teamId);

//         setTeam(teamData.data || teamData);
//         setMembers(membersData.data || membersData);
//         setAbstract(abstractObj);
//         setResult(teamResult);
//       } catch (err) {
//         console.error("❌ Error fetching team details:", err);
//       } finally {
//         setTimeout(() => setInitialLoad(false), 1000);
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [teamId]);

// //   // ✅ Stylish PDF ID Card Generator
// //   const downloadStyledIdCard = async (member) => {
// //     const card = document.createElement("div");
// //     card.style.width = "260px";
// //     card.style.height = "400px";
// //     card.style.padding = "18px";
// //     // card.style.borderRadius = "18px";
// //     card.style.background = "linear-gradient(0deg, rgb(15, 23, 42), rgba(25, 0, 108, 1))";
// //     card.style.color = "#fff";
// //     card.style.fontFamily = "Orbitron, sans-serif";
// //     card.style.borderBottom = "5px solid rgba(34, 211, 238, 0.5)";
// //     card.style.display = "flex";
// //     card.style.flexDirection = "column";
// //     card.style.alignItems = "center";
// //     card.style.justifyContent = "space-between";
// //     card.style.position = "fixed";
// //     card.style.top = "-9999px";
// //     card.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.2)";

// //     // Header / Logo
// //     const logo = document.createElement("img");
// //     logo.src = logo1; // replace with your logo path or hosted image
// //     logo.style.width = "70px";
// //     logo.style.marginTop = "5px";
// //     card.appendChild(logo);

// //     const header = document.createElement("h2");
// //     header.textContent = "Avishkaar Season 3";
// //     header.style.fontSize = "14px";
// //     header.style.marginBottom = "15px";
// //     header.style.marginTop = "5px";
// //     header.style.color = "#22d3ee";
// //     card.appendChild(header);

// //     // Profile Photo
// //     const photo = document.createElement("img");
// //     photo.src = member.photo
// //   ? `http://localhost:5002${member.photo}`
// //   : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
// //     photo.style.width = "90px";
// //     photo.style.height = "150px";
// //     photo.style.borderRadius = "20px";
// //     photo.style.border = "2px solid rgb(34,211,238)";
// //     card.appendChild(photo);

// //     // Name
// //     const name = document.createElement("h3");
// //     name.textContent = member.member_name;
// //     name.style.marginTop = "10px";
// //     name.style.fontSize = "16px";
// //     name.style.textAlign = "center"
// //     name.style.color = "#22d3ee";
// //     card.appendChild(name);

// //     // Role
// //     const role = document.createElement("p");
// //     role.textContent = member.role;
// //     role.style.fontSize = "12px";
// //     role.style.color = "#cbd5e1";
// //     card.appendChild(role);

// //     // Team & College
// //     const teamInfo = document.createElement("p");
// //     teamInfo.textContent = `Team ID: ${team.teamId}`;
// //     teamInfo.style.fontSize = "11px";
// //     teamInfo.style.color = "#94a3b8";
// //     card.appendChild(teamInfo);

// //     const college = document.createElement("p");
// //     college.textContent = team.collegeName;
// //     college.style.fontSize = "10px";
// //     college.style.textAlign = "center";
// //     college.style.color = "#64748b";
// //     card.appendChild(college);

// //     // QR Code
// //     // ✅ Generate QR Code using "qrcode" library
// // const qrData = JSON.stringify({
// //   name: member.member_name,
// //   email: member.email_id,
// //   teamId: team.teamId,
// //   team:team.teamname,
// // });
// // const qrImage = await QRCode.toDataURL(qrData, { width: 90, margin: 1 });

// // const qrImg = document.createElement("img");
// // qrImg.src = qrImage;
// // qrImg.style.width = "85px";
// // qrImg.style.marginTop = "10px";
// // card.appendChild(qrImg);


// //     // Footer
// //     const footer = document.createElement("p");
// //     footer.textContent = "Powered by Web Fusion";
// //     footer.style.fontSize = "10px";
// //     footer.style.marginBottom = "5px";
// //     footer.style.color = "#38bdf8";
// //     card.appendChild(footer);

// //     document.body.appendChild(card);

// //     const canvas = await html2canvas(card, {
// //   scale: 3,
// //   useCORS: true, // ✅ Allow cross-origin image rendering
// //   allowTaint: true, // ✅ For local images without CORS headers
// //   logging: false,
// // });

// //     const imgData = canvas.toDataURL("image/png");
// //     const pdf = new jsPDF({
// //       orientation: "portrait",
// //       unit: "px",
// //       format: [280, 410],
// //     });
// //     pdf.addImage(imgData, "PNG", 0, 0, 280, 410);
// //     pdf.save(`${member.member_name}_ID_Card.pdf`);

// //     document.body.removeChild(card);
// //   };
// // ✅ Futuristic Stylish PDF ID Card Generator
// const downloadStyledIdCard = async (member) => {
//   console.log("Generating ID card for:", member);

//   // 🔹 Create Card Container
//   const card = document.createElement("div");
//   card.style.width = "270px";
//   card.style.height = "420px";
//   card.style.padding = "16px";
//   card.style.borderRadius = "16px";
//   card.style.background = "linear-gradient(145deg, #0f172a, #020617)";
//   card.style.color = "#fff";
//   card.style.fontFamily = "Orbitron, sans-serif";
//   card.style.border = "1px solid rgba(34, 211, 238, 0.3)";
//   card.style.boxShadow = "0 0 25px rgba(0, 255, 255, 0.15)";
//   card.style.display = "flex";
//   card.style.flexDirection = "column";
//   card.style.alignItems = "center";
//   card.style.position = "fixed";
//   card.style.top = "-9999px";
//   card.style.overflow = "hidden";

//   // 🔹 Header (Top Bar)
//   const headerRow = document.createElement("div");
//   headerRow.style.display = "flex";
//   headerRow.style.justifyContent = "space-between";
//   headerRow.style.alignItems = "center";
//   headerRow.style.width = "100%";
//   headerRow.style.marginBottom = "8px";

//   const title = document.createElement("h2");
//   title.textContent = "AVISHKAAR";
//   title.style.fontSize = "14px";
//   title.style.fontWeight = "700";
//   title.style.color = "#38bdf8";
//   title.style.textShadow = "0 0 10px rgba(56, 189, 248, 0.5)";
//   title.style.margin = "0";
//   headerRow.appendChild(title);

//   const logo = document.createElement("img");
//   logo.src = logo1;
//   logo.crossOrigin = "anonymous";
//   logo.style.width = "55px";
//   logo.style.height = "auto";
//   logo.style.marginRight = "4px";
//   logo.style.filter = "drop-shadow(0 0 6px rgba(34, 211, 238, 0.4))";
//   headerRow.appendChild(logo);

//   card.appendChild(headerRow);

//   // 🔹 Divider Line
//   const divider = document.createElement("div");
//   divider.style.width = "100%";
//   divider.style.height = "2px";
//   divider.style.borderRadius = "2px";
//   divider.style.background = "linear-gradient(90deg, #22d3ee, #2563eb, #22d3ee)";
//   card.appendChild(divider);

//   // 🔹 Profile Photo Section
//   const photoBox = document.createElement("div");
//   photoBox.style.width = "110px";
//   photoBox.style.height = "130px";
//   photoBox.style.borderRadius = "14px";
//   photoBox.style.overflow = "hidden";
//   photoBox.style.marginTop = "18px";
//   photoBox.style.border = "2px solid rgba(34,211,238,0.6)";
//   photoBox.style.boxShadow = "0 0 15px rgba(34,211,238,0.3)";

//   const photo = document.createElement("img");
//   photo.src = member.photo
//     ? `http://localhost:5002${member.photo}`
//     : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
//   photo.crossOrigin = "anonymous";
//   photo.style.width = "100%";
//   photo.style.height = "100%";
//   photo.style.objectFit = "cover";
//   photoBox.appendChild(photo);
//   card.appendChild(photoBox);

//   // 🔹 Member Info Section
//   const infoBox = document.createElement("div");
//   infoBox.style.width = "100%";
//   infoBox.style.textAlign = "center";
//   infoBox.style.marginTop = "14px";
//   infoBox.style.padding = "10px 12px";
//   infoBox.style.borderRadius = "10px";
//   infoBox.style.background = "rgba(255,255,255,0.05)";
//   infoBox.style.border = "1px solid rgba(34,211,238,0.2)";
//   infoBox.style.boxShadow = "inset 0 0 10px rgba(34,211,238,0.1)";
//   card.appendChild(infoBox);

//   const name = document.createElement("h3");
//   name.textContent = member.member_name;
//   name.style.fontSize = "15px";
//   name.style.color = "#22d3ee";
//   name.style.margin = "2px 0";
//   infoBox.appendChild(name);

//   const role = document.createElement("p");
//   role.textContent = member.role;
//   role.style.fontSize = "12px";
//   role.style.color = "#cbd5e1";
//   role.style.margin = "2px 0";
//   infoBox.appendChild(role);

//   const teamInfo = document.createElement("p");
//   teamInfo.textContent = `Team: ${team.teamname}`;
//   teamInfo.style.fontSize = "11px";
//   teamInfo.style.color = "#94a3b8";
//   teamInfo.style.marginTop = "4px";
//   infoBox.appendChild(teamInfo);

//   const college = document.createElement("p");
//   college.textContent = team.collegeName;
//   college.style.fontSize = "10px";
//   college.style.color = "#64748b";
//   college.style.marginTop = "2px";
//   infoBox.appendChild(college);

//   // 🔹 QR Code Section
//   const qrSection = document.createElement("div");
//   qrSection.style.marginTop = "14px";
//   qrSection.style.display = "flex";
//   qrSection.style.flexDirection = "column";
//   qrSection.style.alignItems = "center";
//   qrSection.style.justifyContent = "center";
//   qrSection.style.background = "rgba(255,255,255,0.03)";
//   qrSection.style.padding = "8px";
//   qrSection.style.borderRadius = "10px";
//   qrSection.style.border = "1px solid rgba(34,211,238,0.2)";
//   card.appendChild(qrSection);

//   const qrData = JSON.stringify({
//     name: member.member_name,
//     email: member.email_id,
//     team: team.teamname,
//   });
//   const qrImage = await QRCode.toDataURL(qrData, { width: 100, margin: 1 });
//   const qrImg = document.createElement("img");
//   qrImg.src = qrImage;
//   qrImg.style.width = "90px";
//   qrImg.style.marginBottom = "5px";
//   qrSection.appendChild(qrImg);

//   const qrLabel = document.createElement("p");
//   qrLabel.textContent = "Scan for Team Info";
//   qrLabel.style.fontSize = "9px";
//   qrLabel.style.color = "#38bdf8";
//   qrLabel.style.opacity = "0.8";
//   qrSection.appendChild(qrLabel);

//   // 🔹 Footer
//   const footer = document.createElement("p");
//   footer.textContent = "Powered by Web Fusion • 2025";
//   footer.style.marginTop = "10px";
//   footer.style.fontSize = "9px";
//   footer.style.color = "#38bdf8";
//   footer.style.opacity = "0.8";
//   card.appendChild(footer);

//   // 🔹 Add to DOM (invisible)
//   document.body.appendChild(card);

//   // ✅ Wait for all images
//   // ✅ Robust image preloading (wait until all are fully rendered & sized)
// const waitForImages = async (element) => {
//   const imgs = Array.from(element.querySelectorAll("img"));
//   await Promise.all(
//     imgs.map(
//       (img) =>
//         new Promise((resolve) => {
//           const check = () => {
//             if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) resolve();
//             else setTimeout(check, 100);
//           };
//           check();
//         })
//     )
//   );
// };

// // 🔹 Wait for all card images (photo, logo, QR) to load completely
// await waitForImages(card);

//   // ✅ Capture the card
//   const canvas = await html2canvas(card, {
//   scale: 3,
//   useCORS: true,
//   allowTaint: true,
//   backgroundColor: "#000",
//   logging: false,
// });

//   const imgData = canvas.toDataURL("image/png");

//   // ✅ Create small PDF ID-size
//   const pdf = new jsPDF({
//     orientation: "portrait",
//     unit: "mm",
//     format: "a4",
//   });

//   const cardWidth = 55;
//   const cardHeight = 85;
//   const pageWidth = pdf.internal.pageSize.getWidth();
//   const pageHeight = pdf.internal.pageSize.getHeight();
//   const xOffset = (pageWidth - cardWidth) / 2;
//   const yOffset = (pageHeight - cardHeight) / 2;

//   pdf.addImage(imgData, "PNG", xOffset, yOffset, cardWidth, cardHeight);
//   pdf.save(`${member.member_name}_ID_Card.pdf`);

//   document.body.removeChild(card);
// };


//   // Smooth shimmer loader
//   if (initialLoad || loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-cyan-300 font-orbitron">
//         <motion.div
//           animate={{ opacity: [0.4, 1, 0.4] }}
//           transition={{ duration: 1.2, repeat: Infinity }}
//           className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-6"
//         />
//         <p className="text-lg tracking-wide">Loading team details...</p>
//       </div>
//     );
//   }

//   if (!team)
//     return <p className="text-center mt-20 text-gray-400">Team not found</p>;

//   const teamQRData = JSON.stringify({
//     teamId: team.teamId,
//     teamname: team.teamname,
//     college: team.collegeName,
//     email: team.email,
//     members: members.map((m) => m.member_name),
//   });

//   return (
//     <div className="min-h-screen bg-slate-950 text-white font-orbitron px-6 py-10 md:px-12 lg:px-20">
//       <div className="flex items-center justify-between mb-10">
//         <motion.h2
//           className="text-3xl md:text-4xl orbitron font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           Team Overview
//         </motion.h2>
//         <button
//           onClick={() => navigate("/admin")}
//           className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all"
//         >
//           ← Back
//         </button>
//       </div>

//       {/* Team + Abstract */}
//       <div className="grid lg:grid-cols-3 gap-6">
//         {/* Team Info */}
//         <motion.div
//           className="col-span-1 bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h3 className="text-xl orbitron font-semibold text-cyan-300 mb-4">
//             Team Information
//           </h3>
//           <div className="space-y-2 text-sm">
//             <p><strong>ID:</strong> {team.teamId}</p>
//             <p><strong>Name:</strong> {team.teamname}</p>
//             <p><strong>College:</strong> {team.collegeName}</p>
//             <p><strong>Email:</strong> {team.email}</p>
//             <p><strong>Members:</strong> {team.members}</p>
//           </div>
//           <div className="mt-6 flex flex-col items-center">
//             <QRCodeCanvas
//               value={teamQRData}
//               size={180}
//               bgColor="#061238ff"
//               fgColor="#ffffffff"
//             />
//           </div>
//         </motion.div>

//         {/* Abstract + Result */}
//         <motion.div
//           className="col-span-2 bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all"
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <h3 className="text-xl orbitron font-semibold text-cyan-300 mb-4">
//             Abstract Details
//           </h3>
//           {abstract ? (
//             <>
//               <p><strong>Problem Statement:</strong> {abstract.problem_statement}</p>
//               <p><strong>Theme:</strong> {abstract.theme}</p>
//               <p><strong>Description:</strong> {abstract.abstract_description}</p>
//               <p><strong>Submitted:</strong> {new Date(abstract.created_at).toLocaleString()}</p>

//               {result ? (
//                 <motion.div
//                   className="mt-5 p-4 border border-cyan-400/20 rounded-xl bg-slate-950/60"
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   <h4 className="text-cyan-400 orbitron text-lg font-semibold mb-2">
//                     Evaluation Result
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
//                     <p>
//                       <strong>Status:</strong>{" "}
//                       <span
//                         className={`px-3 py-1 rounded-lg font-semibold ${
//                           result.status === "Accepted"
//                             ? "bg-green-700/30 text-green-300"
//                             : result.status === "Rejected"
//                             ? "bg-red-700/30 text-red-300"
//                             : "bg-yellow-700/30 text-yellow-300"
//                         }`}
//                       >
//                         {result.status}
//                       </span>
//                     </p>
//                     <p>
//                       <strong>Evaluator:</strong>{" "}
//                       {result.evaluated_by_name || "—"}
//                     </p>
//                     <p>
//                       <strong>Date:</strong>{" "}
//                       {result.evaluated_at
//                         ? new Date(result.evaluated_at).toLocaleString()
//                         : "—"}
//                     </p>
//                   </div>
//                 </motion.div>
//               ) : (
//                 <p className="text-gray-400 mt-4 italic">
//                   This abstract hasn’t been evaluated yet.
//                 </p>
//               )}
//             </>
//           ) : (
//             <p className="text-gray-400">No abstract submitted yet.</p>
//           )}
//         </motion.div>
//       </div>

//       {/* Members */}
//       <motion.div
//         className="mt-10 bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all"
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h3 className="text-xl orbitron font-semibold text-cyan-300 mb-6 text-center">
//           Team Members
//         </h3>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {members.map((member) => (
//            <motion.div
//   key={member.member_id}
//   className="relative group bg-gradient-to-b from-[#0f172a] to-[#020617] p-5 rounded-2xl border border-cyan-400/20 text-center shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all duration-300 overflow-hidden"
//   whileHover={{ scale: 1.05 }}
// >
//   {/* 🌀 Neon Glow Border Animation */}
//   <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-transparent to-cyan-400/10 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 pointer-events-none"></div>

//   {/* 👤 Member Photo */}
//   <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-500">
//     <img
//       src={
//         member.photo
//           ? `http://localhost:5002${member.photo}`
//           : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//       }
//       alt={member.member_name}
//       className="w-full h-full object-cover"
//     />
//   </div>

//   {/* 🧑 Member Info */}
//   <div className="mt-3 space-y-1">
//     <h4 className="text-cyan-300 font-semibold orbitron text-lg tracking-wide drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
//       {member.member_name}
//     </h4>
//     <p className="text-gray-300 text-sm">
//       <span className="text-cyan-400/70 font-medium">{member.role}</span>
//     </p>
//   </div>

//   {/* ✉️ Email */}
//   <p className="mt-1 text-gray-400 text-xs font-light">
//     {member.email_id || "No email available"}
//   </p>

//   {/* 🔲 QR Code */}
//   <div className="relative flex justify-center mt-4">
//     <div className="absolute inset-0 blur-md bg-gradient-to-tr from-cyan-500/30 to-transparent opacity-60 rounded-xl pointer-events-none"></div>
//     <div className="relative bg-black/40 border border-cyan-400/30 p-2 rounded-xl">
//       <QRCodeCanvas
//         value={JSON.stringify({
//           member_name: member.member_name,
//           role: member.role,
//           email: member.email_id,
//         })}
//         size={100}
//         bgColor="#000"
//         fgColor="#ffffffff"
//       />
//     </div>
//   </div>

//   {/* 📥 Button */}
//   <div className="relative z-50 mt-4">
//     <button
//       onClick={() => downloadStyledIdCard(member)}
//       className="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition-all"
//     >
//       Download ID Card
//     </button>
//   </div>
// </motion.div>


//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import QRCode from "qrcode";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo1 from "../../assets/aitam_white-title_logo.png";

export default function AdminsTeamDetails() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [abstract, setAbstract] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  const API_BASE = "http://localhost:5002/api";

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [teamRes, membersRes, abstractRes, resultsRes] = await Promise.all([
          fetch(`${API_BASE}/teams/${teamId}`, { headers }),
          fetch(`${API_BASE}/team-members/team/${teamId}`, { headers }),
          fetch(`${API_BASE}/abstracts/team/${teamId}`, { headers }),
          fetch(`${API_BASE}/abstract-results`, { headers }),
        ]);

        const teamData = await teamRes.json();
        const membersData = await membersRes.json();
        const abstractData = await abstractRes.json();
        const resultsData = await resultsRes.json();

        // Clean abstract
        let abstractObj = null;
        if (Array.isArray(abstractData)) {
          abstractObj = abstractData[0];
        } else if (abstractData?.data) {
          abstractObj = Array.isArray(abstractData.data)
            ? abstractData.data[0]
            : abstractData.data;
        } else {
          abstractObj = abstractData;
        }

        // Find result for this team
        const teamResult =
          Array.isArray(resultsData.data) &&
          resultsData.data.find((r) => r.team_id === teamId);

        setTeam(teamData.data || teamData);
        setMembers(membersData.data || membersData);
        setAbstract(abstractObj);
        setResult(teamResult);
      } catch (err) {
        console.error("❌ Error fetching team details:", err);
      } finally {
        // Keep initial shimmer for at least 1s
        setTimeout(() => setInitialLoad(false), 1000);
        setLoading(false);
      }
    };

    fetchDetails();
  }, [teamId]);

  // helper: wait until all <img> children of element have natural sizes
  const waitForImages = async (element) => {
    const imgs = Array.from(element.querySelectorAll("img"));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            // If already OK size, resolve
            if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
              return resolve();
            }
            // Otherwise wait
            const onReady = () => {
              if (img.naturalWidth > 0 && img.naturalHeight > 0) resolve();
              else resolve(); // resolve anyway after load/error to avoid hanging
            };
            img.addEventListener("load", onReady, { once: true });
            img.addEventListener("error", onReady, { once: true });
            // safety timeout
            setTimeout(resolve, 2000);
          })
      )
    );
  };

  // ✅ Stylish PDF ID Card Generator (robust)
  const downloadStyledIdCard = async (member) => {
  try {
    console.log("🪪 Generating ID card for:", member.member_name);

    // Create card container
    const card = document.createElement("div");
    card.style.width = "270px";
    card.style.height = "420px";
    card.style.padding = "16px";
    card.style.borderRadius = "16px";
    card.style.background = "linear-gradient(145deg, #0f172a, #020617)";
    card.style.color = "#fff";
    card.style.fontFamily = "Orbitron, sans-serif";
    card.style.border = "1px solid rgba(34, 211, 238, 0.25)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.position = "fixed";
    card.style.top = "-9999px";
    card.style.overflow = "hidden";

    // Header Row
    const header = document.createElement("div");
    header.style.width = "100%";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "8px";

    const title = document.createElement("h2");
    title.textContent = "AVISHKAAR";
    title.style.fontSize = "14px";
    title.style.color = "#38bdf8";
    title.style.margin = "0";
    header.appendChild(title);

    const logo = document.createElement("img");
    logo.src = logo1;
    logo.crossOrigin = "anonymous";
    logo.style.width = "65px";
    logo.style.height = "55px";
    logo.style.objectFit = "contain";
    header.appendChild(logo);

    card.appendChild(header);

    // Divider
    const divider = document.createElement("div");
    divider.style.width = "100%";
    divider.style.height = "2px";
    divider.style.background = "linear-gradient(90deg, #22d3ee, #2563eb, #22d3ee)";
    divider.style.borderRadius = "2px";
    card.appendChild(divider);

    // Member Photo
    const photoBox = document.createElement("div");
    photoBox.style.width = "110px";
    photoBox.style.height = "130px";
    photoBox.style.marginTop = "18px";
    photoBox.style.borderRadius = "14px";
    photoBox.style.overflow = "hidden";
    photoBox.style.border = "2px solid rgba(34,211,238,0.6)";
    card.appendChild(photoBox);

    const photo = document.createElement("img");
    photo.crossOrigin = "anonymous";
    photo.src =
      member.photo
        ? member.photo.startsWith("http")
          ? member.photo
          : `http://localhost:5002${member.photo}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    photo.style.width = "100%";
    photo.style.height = "100%";
    photo.style.objectFit = "cover";
    photoBox.appendChild(photo);

    // Info Box
    const info = document.createElement("div");
    info.style.marginTop = "14px";
    info.style.textAlign = "center";
    card.appendChild(info);

    const name = document.createElement("h3");
    name.textContent = member.member_name;
    name.style.color = "#22d3ee";
    name.style.fontSize = "15px";
    info.appendChild(name);

    const role = document.createElement("p");
    role.textContent = member.role;
    role.style.fontSize = "12px";
    role.style.color = "#cbd5e1";
    info.appendChild(role);

    const teamInfo = document.createElement("p");
    teamInfo.textContent = `Team: ${team?.teamname}`;
    teamInfo.style.fontSize = "11px";
    teamInfo.style.color = "#94a3b8";
    info.appendChild(teamInfo);

    const college = document.createElement("p");
    college.textContent = team?.collegeName;
    college.style.fontSize = "10px";
    college.style.color = "#64748b";
    info.appendChild(college);

    // ✅ Generate QR code as image instead of canvas
    const qrData = JSON.stringify({
      name: member.member_name,
      email: member.email_id,
      teamId: team.teamId,
      team: team.teamname,
    });

    const qrImageData = await QRCode.toDataURL(qrData, { width: 100, margin: 1 });

    const qrImg = document.createElement("img");
    qrImg.src = qrImageData;
    qrImg.crossOrigin = "anonymous";
    qrImg.style.width = "90px";
    qrImg.style.height = "90px";
    qrImg.style.marginTop = "10px";
    card.appendChild(qrImg);

    const qrLabel = document.createElement("p");
    qrLabel.textContent = "Scan for Team Info";
    qrLabel.style.fontSize = "9px";
    qrLabel.style.color = "#38bdf8";
    qrLabel.style.opacity = "0.8";
    card.appendChild(qrLabel);

    const footer = document.createElement("p");
    footer.textContent = "Powered by Web Fusion • 2025";
    footer.style.fontSize = "9px";
    footer.style.color = "#38bdf8";
    footer.style.marginTop = "8px";
    card.appendChild(footer);

    document.body.appendChild(card);

    // ✅ Wait until all images are truly loaded and sized
    const imgs = Array.from(card.querySelectorAll("img"));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            const check = () => {
              if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) resolve();
              else setTimeout(check, 100);
            };
            check();
          })
      )
    );

    // ✅ Small delay to ensure DOM paints fully
    await new Promise((r) => setTimeout(r, 300));

    // ✅ Capture the card
    let canvas = await html2canvas(card, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#000",
      logging: false,
    });

    // Retry if failed
    if (canvas.width === 0 || canvas.height === 0) {
      console.warn("⚠️ html2canvas failed, retrying...");
      await new Promise((r) => setTimeout(r, 300));
      canvas = await html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#000",
      });
    }

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const cardWidth = 85;
    const cardHeight = 115;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const xOffset = (pageWidth - cardWidth) / 2;
    const yOffset = (pageHeight - cardHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, cardWidth, cardHeight);
    pdf.save(`${member.member_name}_ID_Card.pdf`);

    document.body.removeChild(card);
  } catch (err) {
    console.error("❌ ID card generation failed:", err);
    alert("Failed to generate ID card. Check console for details.");
  }
};


// ✅ Generate a Landscape Team Card PDF with QR Codes
// ✅ Generate a Landscape Team Card PDF with Team QR and Member Cards
// ✅ Optimized Landscape PDF Generator (No Cutoff)
const downloadTeamCardPDF = async () => {
  try {
    if (!team || members.length === 0) {
      alert("Team or members not found!");
      return;
    }

    // Main container
    const card = document.createElement("div");
    card.style.width = "1150px"; // wide layout for clarity
    card.style.padding = "30px";
    card.style.borderRadius = "20px";
    card.style.background = "linear-gradient(145deg, #0f172a, #020617)";
    card.style.color = "#fff";
    card.style.fontFamily = "Orbitron, sans-serif";
    card.style.border = "1px solid rgba(34,211,238,0.25)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.gap = "25px";
    card.style.position = "fixed";
    card.style.top = "-9999px";
    card.style.boxSizing = "border-box";

    // 🔹 Header (Avishkaar + Season + Logo)
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "flex-start";

    const leftTitle = document.createElement("div");
    leftTitle.innerHTML = `
      <h1 style="color:#38bdf8;font-size:34px;margin:0;">AVISHKAAR</h1>
      <p style="color:#60a5fa;font-size:18px;margin:0;">Season 3</p>
    `;
    header.appendChild(leftTitle);

    const logo = document.createElement("img");
    logo.src = logo1;
    logo.crossOrigin = "anonymous";
    logo.style.width = "100px";
    logo.style.height = "70px";
    logo.style.objectFit = "contain";
    header.appendChild(logo);

    card.appendChild(header);

    // Divider
    const divider = document.createElement("div");
    divider.style.height = "2px";
    divider.style.background =
      "linear-gradient(90deg, #22d3ee, #2563eb, #22d3ee)";
    divider.style.borderRadius = "2px";
    card.appendChild(divider);

    // 🔹 Team Details
    const teamInfo = document.createElement("div");
    teamInfo.style.display = "flex";
    teamInfo.style.justifyContent = "space-between";
    teamInfo.style.alignItems = "center";
    teamInfo.style.flexWrap = "wrap";
    teamInfo.style.padding = "0 10px";

    const leftInfo = document.createElement("div");
    leftInfo.style.flex = "1";
    leftInfo.style.minWidth = "300px";
    leftInfo.innerHTML = `
      <h2 style="color:#38bdf8;font-size:22px;margin:0 0 6px;">${team.teamname}</h2>
      <p style="font-size:14px;margin:2px 0;"><b>Team ID:</b> ${team.teamId}</p>
      <p style="font-size:14px;margin:2px 0;"><b>College:</b> ${team.collegeName}</p>
      <p style="font-size:14px;margin:2px 0;"><b>Email:</b> ${team.email}</p>
    `;

    // Team QR code
    const qrCanvas = document.createElement("canvas");
    const qrData = JSON.stringify({
      teamId: team.teamId,
      teamname: team.teamname,
      college: team.collegeName,
      email: team.email,
      members: members.map((m) => m.member_name),
    });

    await QRCode.toCanvas(qrCanvas, qrData, {
      width: 130,
      margin: 1,
      color: {
        dark: "#38bdf8",
        light: "#000000",
      },
    });
    qrCanvas.style.border = "2px solid #38bdf8";
    qrCanvas.style.borderRadius = "12px";
    qrCanvas.style.boxShadow = "0 0 20px rgba(56,189,248,0.3)";
    qrCanvas.style.margin = "10px";

    const rightQR = document.createElement("div");
    rightQR.style.textAlign = "center";
    rightQR.style.flex = "0 0 auto";
    rightQR.appendChild(qrCanvas);
    const qrLabel = document.createElement("p");
    qrLabel.textContent = "Team QR Code";
    qrLabel.style.color = "#94a3b8";
    qrLabel.style.fontSize = "12px";
    qrLabel.style.marginTop = "4px";
    rightQR.appendChild(qrLabel);

    teamInfo.appendChild(leftInfo);
    teamInfo.appendChild(rightQR);
    card.appendChild(teamInfo);

    // Divider
    const divider2 = document.createElement("div");
    divider2.style.height = "2px";
    divider2.style.background =
      "linear-gradient(90deg, #22d3ee, #2563eb, #22d3ee)";
    divider2.style.borderRadius = "2px";
    card.appendChild(divider2);

    // 🔹 Members Grid (optimized for no cutoff)
    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(230px, 1fr))";
    grid.style.gap = "15px";
    grid.style.padding = "0 10px 10px";
    grid.style.boxSizing = "border-box";

    for (const m of members) {
      const box = document.createElement("div");
      box.style.background = "rgba(15,23,42,0.9)";
      box.style.border = "1px solid rgba(56,189,248,0.4)";
      box.style.borderRadius = "14px";
      box.style.padding = "14px";
      box.style.textAlign = "center";
      box.style.boxShadow = "0 0 18px rgba(56,189,248,0.1)";

      const img = document.createElement("img");
      img.src = m.photo
        ? m.photo.startsWith("http")
          ? m.photo
          : `http://localhost:5002${m.photo}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
      img.crossOrigin = "anonymous";
      img.style.width = "80px";
      img.style.height = "80px";
      img.style.objectFit = "cover";
      img.style.borderRadius = "8px";
      img.style.border = "1.5px solid #38bdf8";
      img.style.marginBottom = "6px";
      box.appendChild(img);

      const name = document.createElement("h4");
      name.textContent = m.member_name;
      name.style.color = "#38bdf8";
      name.style.fontSize = "15px";
      name.style.margin = "5px 0 2px";
      box.appendChild(name);

      const role = document.createElement("p");
      role.textContent = m.role || "Member";
      role.style.fontSize = "13px";
      role.style.color = "#cbd5e1";
      role.style.margin = "0";
      box.appendChild(role);

      const email = document.createElement("p");
      email.textContent = m.email_id || "";
      email.style.fontSize = "11px";
      email.style.color = "#94a3b8";
      email.style.margin = "2px 0 0";
      box.appendChild(email);

      grid.appendChild(box);
    }

    card.appendChild(grid);

    // Footer
    const footer = document.createElement("p");
    footer.textContent = "Powered by Web Fusion • Avishkaar 2025";
    footer.style.textAlign = "center";
    footer.style.fontSize = "11px";
    footer.style.color = "#38bdf8";
    footer.style.marginTop = "10px";
    card.appendChild(footer);

    document.body.appendChild(card);

    // Wait for images
    const imgs = card.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map(
        (img) =>
          new Promise((res) => {
            if (img.complete && img.naturalWidth > 0) return res();
            img.onload = res;
            img.onerror = res;
          })
      )
    );

    // 🧩 Scale to fit page (avoid cutoff)
    const maxHeight = 780; // roughly fits A4 landscape
    if (card.scrollHeight > maxHeight) {
      const scale = maxHeight / card.scrollHeight;
      card.style.transform = `scale(${scale})`;
      card.style.transformOrigin = "top left";
      card.style.width = `${1150 * scale}px`;
    }

    // Capture using html2canvas
    const canvas = await html2canvas(card, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#000",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("l", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const ratio = canvas.width / canvas.height;
    const imgHeight = pageWidth / ratio;

    const yOffset = Math.max((pdf.internal.pageSize.getHeight() - imgHeight) / 2, 0);
    pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pdf.internal.pageSize.getHeight() + 2);
    pdf.save(`${team.teamname}_TeamCard.pdf`);

    document.body.removeChild(card);
  } catch (err) {
    console.error("❌ Team card PDF generation failed:", err);
    alert("Failed to generate team card PDF.");
  }
};




  // Smooth shimmer loader
  if (initialLoad || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-cyan-300 font-orbitron">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="w-20 h-20 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mb-6"
        />
        <p className="text-lg tracking-wide">Loading team details...</p>
      </div>
    );
  }

  if (!team) return <p className="text-center mt-20 text-gray-400">Team not found</p>;

  const teamQRData = JSON.stringify({
    teamId: team.teamId,
    teamname: team.teamname,
    college: team.collegeName,
    email: team.email,
    members: members.map((m) => m.member_name),
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-orbitron px-6 py-10 md:px-12 lg:px-20">
      <div className="flex items-center justify-between mb-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold orbitron bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Team Overview
        </motion.h2>
        <button
          onClick={() => navigate("/admin")}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-all"
        >
          ← Back
        </button>
      </div>

      {/* Team + Abstract */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Team Info */}
        <motion.div
          className="col-span-1 bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold orbitron text-cyan-300 mb-4">Team Information</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>ID:</strong> {team.teamId}
            </p>
            <p>
              <strong>Name:</strong> {team.teamname}
            </p>
            <p>
              <strong>College:</strong> {team.collegeName}
            </p>
            <p>
              <strong>Email:</strong> {team.email}
            </p>
            <p>
              <strong>Members:</strong> {team.members}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <QRCodeCanvas value={teamQRData} size={120} bgColor="#000" fgColor="#ffffffff" />
          </div>
          <button
  onClick={downloadTeamCardPDF}
  className="mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-lg text-sm shadow-lg shadow-cyan-500/30 transition-all"
>
  📄 Download Team Card PDF
</button>
        </motion.div>

        {/* Abstract + Result */}
        <motion.div
          className="col-span-2 bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold orbitron text-cyan-300 mb-4">Abstract Details</h3>
          {abstract ? (
            <>
              <p>
                <strong>Problem:</strong> {abstract.problem_statement}
              </p>
              <p>
                <strong>Theme:</strong> {abstract.theme}
              </p>
              <p>
                <strong>Description:</strong> {abstract.abstract_description}
              </p>
              <p>
                <strong>Submitted:</strong> {new Date(abstract.created_at).toLocaleString()}
              </p>

              {result ? (
                <motion.div
                  className="mt-5 p-4 border border-cyan-400/20 rounded-xl bg-slate-950/60"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-cyan-400 text-lg font-semibold mb-2">Evaluation Result</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        className={`px-3 py-1 rounded-lg font-semibold ${
                          result.status === "Accepted"
                            ? "bg-green-700/30 text-green-300"
                            : result.status === "Rejected"
                            ? "bg-red-700/30 text-red-300"
                            : "bg-yellow-700/30 text-yellow-300"
                        }`}
                      >
                        {result.status}
                      </span>
                    </p>
                    <p>
                      <strong>Evaluator:</strong> {result.evaluated_by_name || "—"}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {result.evaluated_at ? new Date(result.evaluated_at).toLocaleString() : "—"}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <p className="text-gray-400 mt-4 italic">This abstract hasn’t been evaluated yet.</p>
              )}
            </>
          ) : (
            <p className="text-gray-400">No abstract submitted yet.</p>
          )}
        </motion.div>
      </div>

      {/* Members */}
      <motion.div
        className="mt-10 bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 shadow-lg hover:shadow-cyan-500/10 transition-all"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-xl font-semibold text-cyan-300 orbitron mb-6 text-center">Team Members</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <motion.div
              key={member.member_id || member.email_id}
              className="relative group bg-gradient-to-b from-[#0f172a] to-[#020617] p-5 rounded-2xl border border-cyan-400/20 text-center shadow-[0_0_10px_rgba(0,255,255,0.1)] hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all duration-300 overflow-hidden"
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-cyan-400/40 mb-3">
                <img
                  src={
                    member.photo
                      ? member.photo.startsWith("http")
                        ? member.photo
                        : `http://localhost:5002${member.photo}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={member.member_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-cyan-300 orbitron font-semibold text-base mb-1">{member.member_name}</h4>
              <p className="text-gray-300 text-xs mb-1">
                <strong>Role:</strong> {member.role}
              </p>
              <p className="text-gray-300 text-xs mb-1">
                <strong>Phone Number:</strong> {member.phone_number || "N/A"}
              </p>

              <div className="flex justify-center mt-3">
                <QRCodeCanvas
                  value={JSON.stringify({
                    member_name: member.member_name,
                    role: member.role,
                    email: member.email_id,
                  })}
                  size={100}
                  bgColor="#000"
                  fgColor="#ffffffff"
                />
              </div>

              <button
                onClick={() => downloadStyledIdCard(member)}
                className="mt-4 bg-cyan-400 orbitron hover:bg-cyan-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md"
              >
                Download ID Card
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
