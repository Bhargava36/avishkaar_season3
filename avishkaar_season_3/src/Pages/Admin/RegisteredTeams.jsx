// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronDown, ChevronUp, Download } from "lucide-react";
// import * as XLSX from "xlsx";
// import { row } from "mathjs";

// export default function RegisteredTeams() {
//   const [teams, setTeams] = useState([]);
//   const [expandedTeamId, setExpandedTeamId] = useState(null);
//   const [teamMembers, setTeamMembers] = useState({}); // { teamId: [members] }
//   const [loading, setLoading] = useState(false);

//   // 🧠 Fetch all teams
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const res = await fetch("http://localhost:5002/api/teams", {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         });
//         console.log("Response status:", res.status);
//         const data = await res.json();
//         setTeams(data.data);
//         console.log("Fetched teams:", data.data);
//       } catch (err) {
//         console.error("Error fetching teams:", err);
//       }
//     };
//     fetchTeams();
//   }, []);

//   // 🔽 Expand / Collapse Team
//   const toggleExpand = async (teamId) => {
//     console.log("Toggling team:", teamId);
//     if (expandedTeamId === teamId) {
//       setExpandedTeamId(null);
//       return;
//     }

//     // If members already fetched, just expand
//     if (teamMembers[teamId]) {
//       setExpandedTeamId(teamId);
//       return;
//     }

//     // Otherwise, fetch team members
//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5002/api/team-members/team/${teamId}`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         },
//       });
//       console.log("Response status:", res.status);
//       const data = await res.json();

//       setTeamMembers((prev) => ({ ...prev, [teamId]: data }));
//       setExpandedTeamId(teamId);
//     } catch (err) {
//       console.error("Error fetching team members:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const getTeamMembers = async (teamId) => {
//   //   try {
//   //     const res = await fetch(`http://localhost:5002/api/team-members/team/${teamId}`, {
//   //       headers: {
//   //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//   //       },
//   //     });
//   //     console.log("Response status:", res.status);
//   //     const data = await res.json();

//   //     setTeamMembers((prev) => ({ ...prev, [teamId]: data }));
//   //     setExpandedTeamId(teamId);
//   //   } catch (err) {
//   //     console.error("Error fetching team members:", err);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };


//   // 📊 Export to Excel
// // const exportToExcel = async () => {
// //   if (teams.length === 0) {
// //     alert("No teams available to export.");
// //     return;
// //   }

// //   try {
// //     const responses = await Promise.all(
// //       teams.map((team) =>
// //         fetch(`http://localhost:5002/api/team-members/team/${team.teamId}`, {
// //           headers: {
// //             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
// //           },
// //         })
// //       )
// //     );

// //     const results = await Promise.all(responses.map((r) => r.json()));

// //     let rows = [];
// //     teams.forEach((team, index) => {
// //       const members = Array.isArray(results[index]) ? results[index] : [];
// //       if (members.length === 0) {
// //         rows.push({
// //           "Team Name": team.teamname,
// //           "Team Email": team.email,
// //           "College": team.collegeName,
// //           "Location": team.stateName,
// //           "Member Name": "-",
// //           "Role": "-",
// //           "Member Email": "-",
// //           "Phone": "-",
// //           "Gender": "-",
// //         });
// //       } else {
// //         members.forEach((member) => {
// //           rows.push({
// //             "Team Name": team.teamname,
// //             "Team Email": team.email,
// //             "College": team.collegeName,
// //             "Location": team.stateName,
// //             "Member Name": member.member_name,
// //             "Role": member.role,
// //             "Member Email": member.email_id,
// //             "Phone": member.phone_number,
// //             "Gender": member.gender,
// //           });
// //         });
// //       }
// //     });

// //     const worksheet = XLSX.utils.json_to_sheet(rows);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");
// //     XLSX.writeFile(workbook, "Registered_Teams.xlsx");

// //     alert("✅ Excel file downloaded successfully!");
// //   } catch (err) {
// //     console.error("Export error:", err);
// //     alert("❌ Failed to export data.");
// //   }
// // };
// const exportToExcel = async () => {
//   if (teams.length === 0) {
//     alert("No teams available to export.");
//     return;
//   }

//   try {
//     // Fetch all team members for each team
//     const responses = await Promise.all(
//       teams.map((team) =>
//         fetch(`http://localhost:5002/api/team-members/team/${team.teamId}`, {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         })
//       )
//     );

//     const results = await Promise.all(responses.map((r) => r.json()));

//     let rows = [];

//     teams.forEach((team, index) => {
//       const members = Array.isArray(results[index]) ? results[index] : [];

//       if (members.length === 0) {
//         // If no members, push one row
//         rows.push({
//           "Team Name": team.teamname,
//           "Team Email": team.email,
//           "College": team.collegeName,
//           "Location": team.stateName,
//           "Member Name": "-",
//           "Role": "-",
//           "Member Email": "-",
//           "Phone": "-",
//           "Gender": "-",
//         });
//       } else {
//         // First member with team details
//         rows.push({
//           "Team Name": team.teamname,
//           "Team Email": team.email,
//           "College": team.collegeName,
//           "Location": team.stateName,
//           "Member Name": members[0].member_name,
//           "Role": members[0].role,
//           "Member Email": members[0].email_id,
//           "Phone": members[0].phone_number,
//           "Gender": members[0].gender,
//         });

//         // Remaining members without repeating team details
//         for (let i = 1; i < members.length; i++) {
//           rows.push({
//             "Team Name": "",
//             "Team Email": "",
//             "College": "",
//             "Location": "",
//             "Member Name": members[i].member_name,
//             "Role": members[i].role,
//             "Member Email": members[i].email_id,
//             "Phone": members[i].phone_number,
//             "Gender": members[i].gender,
//           });
//         }
//       }
//     });

//     // Create Excel file
//     const worksheet = XLSX.utils.json_to_sheet(rows);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");
//     XLSX.writeFile(workbook, "Registered_Teams.xlsx");

//     alert("✅ Excel file downloaded successfully!");
//   } catch (err) {
//     console.error("Export error:", err);
//     alert("❌ Failed to export data.");
//   }
// };



//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron">
//       {/* Header */}
//       <motion.div
//         className="flex flex-col md:flex-row justify-between items-center my-12 gap-4"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h2 className="text-4xl orbitron md:text-5xl font-bold bg-cyan-600 text-transparent bg-clip-text text-center md:text-left">
//           REGISTERED TEAMS
//         </h2>

//         <motion.button
//           onClick={exportToExcel}
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 px-4 py-2 rounded-xl hover:bg-blue-600/20 hover:text-blue-400 transition-all"
//         >
//           <Download size={18} /> Download Excel
//         </motion.button>
//       </motion.div>

//       {/* Teams List */}
//       <div className="flex flex-col gap-6">
//         {teams.length === 0 ? (
//           <p className="text-gray-400 text-center mt-10">No teams registered yet.</p>
//         ) : (
//           teams.map((team, idx) => (
//             <motion.div
//               key={team.id}
//               className="bg-gray-900/30 backdrop-blur-md rounded-3xl p-6 border-2 border-cyan-700 shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all"
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: idx * 0.1 }}
//             >
//               {/* Team Header */}
//               <div
//                 className="flex justify-between items-center cursor-pointer"
//                 onClick={() => toggleExpand(team.teamId)}
//               >
//                 <div>
//                   <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
//                     {team.teamname}
//                   </h3>
//                   <div className="flex flex-wrap gap-2 mt-2">
//                     <span className="px-3 py-1 rounded-full bg-blue-500/20 text-white border border-gray-400 text-sm font-medium">
//                       College: {team.collegeName}
//                     </span>
//                     <span className="px-3 py-1 rounded-full bg-blue-500/20 text-white border border-gray-400 text-sm font-medium">
//                       Location: {team.stateName}
//                     </span>
//                     <span className="px-3 py-1 rounded-full bg-blue-500/20 text-white border border-gray-400 text-sm font-medium">
//                       Email: {team.email}
//                     </span>
//                     <span className="px-3 py-1 rounded-full bg-blue-500/20 text-white border border-gray-400 text-sm font-medium">
//                       Members Count: {team.members}
//                     </span>
//                     <span className={`${team.abstract_submitted ? "bg-gradient-to-b from-green-500/40 via-black/40 to-green-500/40" : "bg-gradient-to-b from-red-500/40 via-black/40 to-red-500/40"} px-3 py-1 rounded-full  border border-gray-400 text-sm font-medium`}>
//                       Abstract Status: {team.abstract_submitted ? "Submitted" : "Not Submitted"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="text-cyan-400">
//                   {expandedTeamId === team.teamId ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
//                 </div>
//               </div>

//               {/* Members Table */}
//               <AnimatePresence>
//                 {expandedTeamId === team.teamId && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     className="mt-6 overflow-hidden"
//                   >
//                     {loading && !teamMembers[team.teamId] ? (
//                       <p className="text-cyan-300 text-center py-4">Loading members...</p>
//                     ) : teamMembers[team.teamId] && teamMembers[team.teamId].length > 0 ? (
//                       <table className="w-full text-left border-2 border-cyan-400 rounded-xl overflow-hidden">
//                         <thead className="bg-blue-950 text-white uppercase text-sm">
//                           <tr>
//                             <th className="px-4 py-2 border-b border-blue-600/40">Name</th>
//                             <th className="px-4 py-2 border-b border-blue-600/40">Role</th>
//                             <th className="px-4 py-2 border-b border-blue-600/40">Email</th>
//                             <th className="px-4 py-2 border-b border-blue-600/40">Phone</th>
//                             <th className="px-4 py-2 border-b border-blue-600/40">Gender</th>
//                           </tr>
//                         </thead>
//                         <tbody className="text-gray-200">
//                           {teamMembers[team.teamId].map((member, i) => (
//                             <tr
//                               key={i}
//                               className="hover:bg-cyan-400/10 hover:text-blue-400 transition-all border-b border-gray-700/50"
//                             >
//                               <td className="px-4 py-2">{member.member_name}</td>
//                               <td className="px-4 py-2">{member.role}</td>
//                               <td className="px-4 py-2">{member.email_id}</td>
//                               <td className="px-4 py-2">{member.phone_number}</td>
//                               <td className="px-4 py-2">{member.gender}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     ) : (
//                       <p className="text-gray-400 text-center py-4">No members found.</p>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Download, Filter } from "lucide-react";
import * as XLSX from "xlsx";
import { RiTeamFill } from "react-icons/ri";

export default function RegisteredTeams() {
  const [teams, setTeams] = useState([]);
  const [expandedTeamId, setExpandedTeamId] = useState(null);
  const [teamMembers, setTeamMembers] = useState({});
  const [loading, setLoading] = useState(false);
  const [filterOn, setFilterOn] = useState(false); // 🔘 Filter toggle

  const API_BASE = "http://localhost:5002/api";

  // 🧠 Fetch all teams
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${API_BASE}/teams`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        const data1 = await res.json();
        console.log(data1);
        setTeams(data1.data);
        console.log(teams);
      } catch (err) {
        console.error("Error fetching teams:", err);
      }
    };
    fetchTeams();
  }, []);

  // 🔽 Expand / Collapse Team
  const toggleExpand = async (teamId) => {
    if (expandedTeamId === teamId) {
      setExpandedTeamId(null);
      return;
    }

    if (teamMembers[teamId]) {
      setExpandedTeamId(teamId);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/team-members/team/${teamId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTeamMembers((prev) => ({ ...prev, [teamId]: data }));
      setExpandedTeamId(teamId);
    } catch (err) {
      console.error("Error fetching team members:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📊 Export to Excel
  const exportToExcel = async () => {
    if (teams.length === 0) {
      alert("No teams available to export.");
      return;
    }
    console.log(teams.length);

    try {
      const responses = await Promise.all(
        teams.map((team) =>
          fetch(`${API_BASE}/team-members/team/${team.teamId}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          })
        )
      );

      const results = await Promise.all(responses.map((r) => r.json()));

      let rows = [];
      teams.forEach((team, index) => {
        const members = Array.isArray(results[index]) ? results[index] : [];

        if (members.length === 0) {
          rows.push({
            "Team Name": team.teamname,
            "Team Email": team.email,
            "College": team.collegeName,
            "Location": team.stateName,
            "Member Name": "-",
            "Role": "-",
            "Member Email": "-",
            "Phone": "-",
            "Gender": "-",
          });
        } else {
          members.forEach((member, i) => {
            rows.push({
              "Team Name": i === 0 ? team.teamname : "",
              "Team Email": i === 0 ? team.email : "",
              "College": i === 0 ? team.collegeName : "",
              "Location": i === 0 ? team.stateName : "",
              "Member Name": member.member_name,
              "Role": member.role,
              "Member Email": member.email_id,
              "Phone": member.phone_number,
              "Gender": member.gender,
            });
          });
        }
      });

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Teams");
      XLSX.writeFile(workbook, "Registered_Teams.xlsx");

      alert("✅ Excel file downloaded successfully!");
    } catch (err) {
      console.error("Export error:", err);
      alert("❌ Failed to export data.");
    }
  };

  // 🎯 Apply filter
  const filteredTeams = filterOn
    ? teams.filter((t) => t.abstract_submitted === 0)
    : teams;

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center my-12 gap-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl md:text-5xl orbitron font-bold bg-cyan-600 text-transparent bg-clip-text text-center md:text-left">
          REGISTERED TEAMS
        </h2>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              filterOn
                ? "bg-green-600/20 border-green-400 text-green-300 hover:bg-green-600/30"
                : "bg-gray-700/30 border-gray-500 text-gray-300 hover:bg-gray-600/40"
            }`}
          >
            <RiTeamFill /> Total Teams : {teams.length}
            
          </motion.button>
          {/* Filter Button */}
          <motion.button
            onClick={() => setFilterOn(!filterOn)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              filterOn
                ? "bg-green-600/20 border-green-400 text-green-300 hover:bg-green-600/30"
                : "bg-gray-700/30 border-gray-500 text-gray-300 hover:bg-gray-600/40"
            }`}
          >
            <Filter size={18} />
            {filterOn ? "Filter: Not Submitted" : "Show All Teams"}
          </motion.button>

          {/* Excel Download */}
          <motion.button
            onClick={exportToExcel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 px-4 py-2 rounded-xl hover:bg-blue-600/20 hover:text-blue-400 transition-all"
          >
            <Download size={18} /> Download Excel
          </motion.button>
        </div>
      </motion.div>

      {/* Teams List */}
      <div className="flex flex-col gap-6">
        {filteredTeams.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            {filterOn
              ? "No teams found without submitted abstracts."
              : "No teams registered yet."}
          </p>
        ) : (
          filteredTeams.map((team, idx) => (
            <motion.div
              key={team.teamId}
              className="bg-gray-900/30 backdrop-blur-md rounded-3xl p-6 border-2 border-cyan-700 shadow-[0_0_25px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            >
              {/* Team Header */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(team.teamId)}
              >
                <div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                    {team.teamname}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-gray-400 text-sm font-medium">
                      College: {team.collegeName}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-gray-400 text-sm font-medium">
                      Location: {team.stateName}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-gray-400 text-sm font-medium">
                      Email: {team.email}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-gray-400 text-sm font-medium">
                      Members Count: {team.members}
                    </span>
                    <span
                      className={`${
                        team.abstract_submitted
                          ? "bg-gradient-to-b from-green-500/40 via-black/40 to-green-500/40"
                          : "bg-gradient-to-b from-red-500/40 via-black/40 to-red-500/40"
                      } px-3 py-1 rounded-full border border-gray-400 text-sm font-medium`}
                    >
                      Abstract Status:{" "}
                      {team.abstract_submitted ? "Submitted" : "Not Submitted"}
                    </span>
                  </div>
                </div>
                <div className="text-cyan-400">
                  {expandedTeamId === team.teamId ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </div>
              </div>

              {/* Members Table */}
              <AnimatePresence>
                {expandedTeamId === team.teamId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 overflow-hidden"
                  >
                    {loading && !teamMembers[team.teamId] ? (
                      <p className="text-cyan-300 text-center py-4">
                        Loading members...
                      </p>
                    ) : teamMembers[team.teamId] &&
                      teamMembers[team.teamId].length > 0 ? (
                      <table className="w-full text-left border-2 border-cyan-400 rounded-xl overflow-hidden">
                        <thead className="bg-blue-950 text-white uppercase text-sm">
                          <tr>
                            <th className="px-4 py-2 border-b border-blue-600/40">
                              Name
                            </th>
                            <th className="px-4 py-2 border-b border-blue-600/40">
                              Role
                            </th>
                            <th className="px-4 py-2 border-b border-blue-600/40">
                              Email
                            </th>
                            <th className="px-4 py-2 border-b border-blue-600/40">
                              Phone
                            </th>
                            <th className="px-4 py-2 border-b border-blue-600/40">
                              Gender
                            </th>
                          </tr>
                        </thead>
                        <tbody className="text-gray-200">
                          {teamMembers[team.teamId].map((member, i) => (
                            <tr
                              key={i}
                              className="hover:bg-cyan-400/10 hover:text-blue-400 transition-all border-b border-gray-700/50"
                            >
                              <td className="px-4 py-2">
                                {member.member_name}
                              </td>
                              <td className="px-4 py-2">{member.role}</td>
                              <td className="px-4 py-2">{member.email_id}</td>
                              <td className="px-4 py-2">
                                {member.phone_number}
                              </td>
                              <td className="px-4 py-2">{member.gender}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-400 text-center py-4">
                        No members found.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
