
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Users, FileText, UserCheck, Home } from "lucide-react";

// export default function AdminOverview() {
//   const [activeTab, setActiveTab] = useState("teams");
//   const [data, setData] = useState({
//     teams: [],
//     abstracts: [],
//     // mentors: [],
//     // accommodation: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const API_BASE = "http://localhost:5002/api";

//   // Fetch all data on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const token = sessionStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         // Fetch all sections in parallel
//         const [teamsRes, abstractsRes] = await Promise.all([
//           fetch(`${API_BASE}/teams/`, { headers }),
//           fetch(`${API_BASE}/abstracts/`, { headers }),
//           // fetch(`${API_BASE}/mentors`, { headers }),
//           // fetch(`${API_BASE}/accommodation`, { headers }),
//         ]);

//         // Convert to JSON
//         const [teams, abstracts] = await Promise.all([
//           teamsRes.json(),
//           abstractsRes.json(),
//               // mentorsRes.json(),
//               // accRes.json(),
//         ]);
//         console.log(teams.data, abstracts);
//         setData({ teams: teams.data, abstracts: abstracts });
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError("Failed to fetch data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Card definitions
//   const cards = [
//     { id: "teams", title: "Teams", count: data.teams.length },
//     { id: "abstracts", title: "Abstracts", count: data.abstracts.length },
//     // { id: "mentors", title: "Mentor", count: data.mentors.length },
//     // { id: "accommodation", title: "Accommodation", count: data.accommodation.length },
//   ];

//   const icons = {
//     teams: <Users size={36} className="text-cyan-300" />,
//     abstracts: <FileText size={36} className="text-cyan-300" />,
//     mentors: <UserCheck size={36} className="text-cyan-300" />,
//     accommodation: <Home size={36} className="text-cyan-300" />,
//   };

//   // Dynamic table rendering
//   const renderTable = () => {
//     if (loading) {
//       return <p className="text-gray-400 text-center py-10">Loading data...</p>;
//     }

//     if (error) {
//       return <p className="text-red-400 text-center py-10">{error}</p>;
//     }

//     const selected = data[activeTab];
//     if (!selected || selected.length === 0) {
//       return <p className="text-gray-400 text-center py-10">No data available</p>;
//     }

//     const headers = Object.keys(selected[0]);

//     return (
//       <div className="overflow-x-auto mt-8">
//         <table className="w-full border border-cyan-400/40 rounded-xl overflow-hidden text-left">
//           <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
//             <tr>
//               {headers.map((header) => (
//                 <th key={header} className="px-4 py-3 border-b border-cyan-400/30">
//                   {header.replace(/_/g, " ")}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-gray-200">
//             {selected.map((row, i) => (
//               <tr
//                 key={i}
//                 className="hover:bg-cyan-500/10 transition-all border-b border-gray-700/50"
//               >
//                 {headers.map((key) => (
//                   <td key={key} className="px-4 py-3">
//                     {String(row[key])}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen p-8 bg-transparent text-white font-orbitron">
//       {/* Header */}
//       <motion.h2
//         className="text-4xl rubik-glitch md:text-5xl font-bold text-center mb-12 bg-gradient-to-b from-gray-400 via-gray-400 to-cyan-400 text-transparent bg-clip-text"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         ADMIN OVERVIEW
//       </motion.h2>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
//         {cards.map((card, index) => (
//           <motion.div
//             key={card.id}
//             onClick={() => setActiveTab(card.id)}
//             className={`group relative cursor-pointer p-6 rounded-3xl border-2 transition-all overflow-hidden ${
//               activeTab === card.id
//                 ? "border-cyan-400 bg-gradient-to-br from-cyan-900/30 via-cyan-700/20 to-transparent shadow-[0_0_40px_rgba(0,255,255,0.5)] scale-105"
//                 : "border-gray-800 bg-gray-900/40 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:scale-105"
//             }`}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, delay: index * 0.1 }}
//           >
//             <motion.div
//               className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
//               style={{
//                 background:
//                   "radial-gradient(circle at top left, rgba(0, 183, 255, 0.25), transparent 70%)",
//               }}
//             ></motion.div>

//             <div className="relative flex items-center justify-around text-center z-10">
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 className="mb-3 p-3 rounded-full bg-cyan-500/10 border border-cyan-400/40 shadow-inner shadow-cyan-400/30"
//               >
//                 {icons[card.id]}
//               </motion.div>

//               <motion.div
//                 className="text-4xl font-extrabold text-white text-end drop-shadow-lg"
//                 initial={{ scale: 0.8, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <h3 className="text-lg orbitron font-semibold text-cyan-300 tracking-wide mb-1">
//                   {card.title}
//                 </h3>
//                 <span className="mr-5">{card.count}</span>
//                 {activeTab === card.id && (
//                   <motion.div
//                     layoutId="active-underline"
//                     className="mt-3 w-16 ml-auto h-[3px] bg-cyan-400 rounded-full"
//                   />
//                 )}
//               </motion.div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Table Section */}
//       <motion.div
//         className="bg-gray-900/40 backdrop-blur-md border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         <h3 className="text-2xl text-center orbitron font-semibold text-cyan-400 mb-6 capitalize">
//           {cards.find((c) => c.id === activeTab)?.title}
//         </h3>
//         {renderTable()}
//       </motion.div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, FileText, UserCheck, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminOverview() {
  const [activeTab, setActiveTab] = useState("teams");
  const [data, setData] = useState({ teams: [], abstracts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const API_BASE = "http://localhost:5002/api";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [teamsRes, abstractsRes] = await Promise.all([
          fetch(`${API_BASE}/teams/`, { headers }),
          fetch(`${API_BASE}/abstracts/`, { headers }),
        ]);

        const [teams, abstracts] = await Promise.all([
          teamsRes.json(),
          abstractsRes.json(),
        ]);
        console.log(teams.data,abstracts);
        setData({
          teams: teams.data,
          abstracts: abstracts,
        });
        console.log(data.abstracts);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    { id: "teams", title: "Teams", count: data.teams.length },
    { id: "abstracts", title: "Abstracts", count: data.abstracts.length },
  ];

  const icons = {
    teams: <Users size={36} className="text-cyan-300" />,
    abstracts: <FileText size={36} className="text-cyan-300" />,
    mentors: <UserCheck size={36} className="text-cyan-300" />,
    accommodation: <Home size={36} className="text-cyan-300" />,
  };

  const visibleColumns = {
    teams: ["teamId", "teamname", "collegeName", "members", "email","abstract_submitted"],
    abstracts: [
      "abstract_id",
      "team_id",
      "problem_statement",
      "theme",
      "abstract_description",
      "created_at",
      "status"
    ],
  };

  // ✅ Function to filter data by search query (works on all columns)
  const filterData = (rows) => {
    if (!searchQuery.trim()) return rows;

    const query = searchQuery.toLowerCase();
    return rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value && value.toString().toLowerCase().includes(query)
      )
    );
  };

  const renderTable = () => {
    if (loading) {
      return <p className="text-gray-400 text-center py-10">Loading data...</p>;
    }

    if (error) {
      return <p className="text-red-400 text-center py-10">{error}</p>;
    }

    const selected = filterData(data[activeTab]);
    if (!selected || selected.length === 0) {
      return (
        <p className="text-gray-400 text-center py-10">
          No matching data found.
        </p>
      );
    }

    const headers = visibleColumns[activeTab];

    return (
      <div className="overflow-x-auto mt-8">
        <table className="w-full border border-cyan-400/40 rounded-xl overflow-hidden text-left">
          <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 border-b border-cyan-400/30">
                  {header.replace(/_/g, " ")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-200">
          {selected.map((row, i) => (
            <tr
             key={i}
             className="hover:bg-cyan-500/10 transition-all border-b border-gray-700/50 cursor-pointer"
             onClick={() => {
             if (activeTab === "teams") {
              console.log(row.teamId);
             navigate(`/admin/team/${row.teamId}`);
             } else if (activeTab === "abstracts") {
              console.log(row.team_id);
             navigate(`/admin/abstract/${row.team_id}`);
             }
         }}
     >
          
          {headers.map((key) => (
          <td key={key} className="px-4 py-3">
          {String(row[key] ?? "null")}
           </td>
          ))}
          </tr>
        ))}
        </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-transparent text-white font-orbitron">
      <motion.h2
        className="text-4xl mt-20 orbitron md:text-5xl font-bold text-center mb-12 bg-cyan-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        ADMIN OVERVIEW
      </motion.h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            onClick={() => setActiveTab(card.id)}
            className={`group relative cursor-pointer p-6 rounded-3xl border-2 transition-all overflow-hidden ${
              activeTab === card.id
                ? "border-cyan-400 bg-gradient-to-br from-cyan-900/30 via-cyan-700/20 to-transparent shadow-[0_0_40px_rgba(0,255,255,0.5)] scale-105"
                : "border-gray-800 bg-gray-900/40 hover:border-cyan-400/60 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)] hover:scale-105"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(0, 183, 255, 0.25), transparent 70%)",
              }}
            ></motion.div>

            <div className="relative flex items-center justify-around text-center z-10">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="mb-3 p-3 rounded-full bg-cyan-500/10 border border-cyan-400/40 shadow-inner shadow-cyan-400/30"
              >
                {icons[card.id]}
              </motion.div>

              <motion.div
                className="text-4xl font-extrabold text-white text-end drop-shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg orbitron font-semibold text-cyan-300 tracking-wide mb-1">
                  {card.title}
                </h3>
                <span className="mr-5">{card.count}</span>
                {activeTab === card.id && (
                  <motion.div
                    layoutId="active-underline"
                    className="mt-3 w-16 ml-auto h-[3px] bg-cyan-400 rounded-full"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔍 Search Bar */}
      <div className="relative mb-6 w-full mx-auto">
        <input
          type="text"
          placeholder="Search across all columns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-12 rounded-2xl bg-gray-900/60 border border-cyan-400/40 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <Search className="absolute left-4 top-3.5 text-cyan-300" size={20} />
      </div>

      {/* Table */}
      <motion.div
        className="bg-gray-900/40 backdrop-blur-md border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl text-center orbitron font-semibold text-cyan-400 mb-6 capitalize">
          {cards.find((c) => c.id === activeTab)?.title}
        </h3>
        {renderTable()}
      </motion.div>
    </div>
  );
}
