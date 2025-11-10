// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Search, UserCheck, Clock, Mail, Filter } from "lucide-react";

// export default function AdminAbstractResults() {
//   const [results, setResults] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);

//   const API_BASE = "http://localhost:5002/api/abstract-results";
//   const API_MAIL = "http://localhost:5002/api/abstract-results/publish";

//   // 🧠 Fetch all results on mount
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         setLoading(true);
//         const token = sessionStorage.getItem("token");
//         const res = await fetch(API_BASE, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setResults(data.data || []);
//         setFiltered(data.data || []);
//       } catch (err) {
//         console.error("Error fetching abstract results:", err);
//       } finally {
//         setTimeout(() => setLoading(false), 2000); // initial 2s load
//       }
//     };

//     fetchResults();
//   }, []);

//   // 🔍 Handle Search + Filter (with 2-second animation)
//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => {
//       let data = results;
//       if (filterStatus !== "All") {
//         data = data.filter((r) => r.status === filterStatus);
//       }
//       if (searchQuery.trim()) {
//         const query = searchQuery.toLowerCase();
//         data = data.filter(
//           (r) =>
//             r.team_name?.toLowerCase().includes(query) ||
//             r.abstract_id?.toLowerCase().includes(query) ||
//             r.status?.toLowerCase().includes(query) ||
//             r.evaluated_by_name?.toLowerCase().includes(query)
//         );
//       }
//       setFiltered(data);
//       setLoading(false);
//     }, 500); // 2-second delay animation

//     return () => clearTimeout(timer);
//   }, [searchQuery, filterStatus, results]);

//   // ✉️ Publish Results - send emails to all teams
//   const publishResults = async () => {
//     if (!window.confirm("Are you sure you want to publish results? This will send emails to all teams.")) return;

//     setSending(true);
//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(API_MAIL, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert(`✅ Results published successfully! (${data.sentCount || 0} emails sent)`);
//       } else {
//         alert(`❌ Failed to publish results.\n${data.message || "Server error."}`);
//       }
//     } catch (err) {
//       console.error("Error publishing results:", err);
//       alert("Error publishing results. Try again later.");
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen mt-20 bg-slate-950 text-white font-orbitron">
//       {/* Header */}
//       <motion.h2
//         className="text-4xl font-bold orbitron text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Abstract Evaluation Results
//       </motion.h2>

//       {/* Search + Filters + Publish */}
//       <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8 px-4">
//         {/* 🔍 Search Bar */}
//         <div className="relative w-full md:w-1/2">
//           <input
//             type="text"
//             placeholder="Search by team name, abstract ID, status, or evaluator..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full px-5 py-3 pl-12 rounded-2xl bg-gray-900/60 border border-cyan-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
//           />
//           <Search className="absolute left-4 top-3.5 text-cyan-300" size={20} />
//         </div>

//         {/* 🧩 Filter Buttons */}
//         <div className="flex gap-2 flex-wrap justify-center">
//           {["All", "Accepted", "Rejected", "On Review"].map((status) => (
//             <motion.button
//               key={status}
//               onClick={() => setFilterStatus(status)}
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
//                 filterStatus === status
//                   ? "bg-cyan-500 text-black border-cyan-400"
//                   : "bg-gray-800 text-cyan-300 border-cyan-500/20 hover:bg-cyan-600/30"
//               }`}
//             >
//               <Filter size={14} className="inline mr-1" /> {status}
//             </motion.button>
//           ))}
//         </div>

//         {/* ✉️ Publish Results Button */}
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={publishResults}
//           disabled={sending}
//           className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all disabled:opacity-60"
//         >
//           <Mail size={20} /> {sending ? "Sending..." : "Publish Results"}
//         </motion.button>
//       </div>

//       {/* Table + Loading Animation */}
//       <motion.div
//         className="w-full mx-auto bg-gray-900/50 border border-cyan-400/30 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.15)] p-6 backdrop-blur-md overflow-x-auto min-h-[300px]"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-16">
//             {/* Fancy loading animation */}
//             <motion.div
//               animate={{ rotate: 360 }}
//               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//               className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
//             />
//             <p className="text-gray-400 mt-4 text-sm animate-pulse">
//               Filtering data, please wait...
//             </p>
//           </div>
//         ) : filtered.length === 0 ? (
//           <p className="text-center text-gray-400 py-10">No matching results found.</p>
//         ) : (
//           <table className="w-full border-collapse text-left text-sm md:text-base">
//             <thead>
//               <tr className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
//                 <th className="px-4 py-3 border-b border-cyan-400/30">Result ID</th>
//                 <th className="px-4 py-3 border-b border-cyan-400/30">Abstract ID</th>
//                 <th className="px-4 py-3 border-b border-cyan-400/30">Team</th>
//                 <th className="px-4 py-3 border-b border-cyan-400/30">College</th>
//                 <th className="px-4 py-3 border-b border-cyan-400/30">Status</th>
//                 <th className="px-4 py-3 border-b border-cyan-400/30">Evaluated By</th>
//                 <th className="px-4 py-3 border-b border-cyan-400/30">Evaluated On</th>
//               </tr>
//             </thead>
//             <tbody className="text-gray-200">
//               {filtered.map((r, index) => (
//                 <motion.tr
//                   key={r.result_id}
//                   className="hover:bg-cyan-500/10 transition-all border-b border-gray-800"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   {/* <td className="px-4 py-3">{r.result_id}</td>
//                   <td className="px-4 py-3">{r.abstract_id}</td>
//                   <td className="px-4 py-3 font-semibold text-cyan-300">{r.team_name || "-"}</td>
//                   <td className="px-4 py-3">{r.college_name || "-"}</td>
//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-3 py-1 rounded-xl text-xs font-semibold ${
//                         r.status === "Accepted"
//                           ? "bg-green-700/30 text-green-300 border border-green-400/30"
//                           : r.status === "Rejected"
//                           ? "bg-red-700/30 text-red-300 border border-red-400/30"
//                           : "bg-yellow-700/30 text-yellow-300 border border-yellow-400/30"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </td>
//                   <td className="px-4 py-3 flex items-center gap-2">
//                     <UserCheck size={16} className="text-cyan-300" />
//                     {r.evaluated_by_name || "N/A"}
//                   </td>
//                   <td className="px-4 py-3 flex items-center gap-2">
//                     <Clock size={16} className="text-cyan-300" />
//                     {r.evaluated_at
//                       ? new Date(r.evaluated_at).toLocaleString()
//                       : "-"}
//                   </td> */}
//                   <td className="px-4 py-3 text-gray-300">{r.result_id}</td>

// <td className="px-4 py-3 text-gray-300">{r.abstract_id}</td>

// <td className="px-4 py-3 font-semibold text-cyan-300">
//   {r.team_name || "-"}
// </td>

// <td className="px-4 py-3 text-gray-300">
//   {r.college_name || "-"}
// </td>

// <td className="px-4 py-3">
//   <span
//     className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
//       r.status === "Accepted"
//         ? "bg-green-700/30 text-green-300 border-green-400/30"
//         : r.status === "Rejected"
//         ? "bg-red-700/30 text-red-300 border-red-400/30"
//         : "bg-yellow-700/30 text-yellow-300 border-yellow-400/30"
//     }`}
//   >
//     {r.status}
//   </span>
// </td>

// {/* 🧑‍💻 Evaluated By */}
// {/* 🧑‍💻 Evaluated By */}
// <td className="px-4 py-3 flex items-center gap-2 text-gray-300">
//   <UserCheck size={16} className="text-cyan-300" />
//   {r.evaluated_by_name || r.evaluatedBy || "N/A"}
// </td>

// {/* ⏰ Evaluated On */}
{/* <td className="px-1 py-3  text-gray-300">
    <p className="flex gap-2">
  <Clock size={16} className="text-cyan-300" />
  {r.evaluated_at
    ? new Date(r.evaluated_at).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-"}
    </p>
</td> */}



//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import { Search, UserCheck, Clock, Mail, Filter } from "lucide-react";

export default function AdminAbstractResults() {
  const [results, setResults] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const navigate = useNavigate(); // ✅ for navigation

  const API_BASE = "http://localhost:5002/api/abstract-results";
  const API_MAIL = "http://localhost:5002/api/abstract-results/publish";

  // 🧠 Fetch all results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await fetch(API_BASE, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setResults(data.data || []);
        setFiltered(data.data || []);
      } catch (err) {
        console.error("Error fetching abstract results:", err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchResults();
  }, []);

  // 🔍 Handle Search + Filter
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let data = results;

      // ✅ Filter by Status
      if (filterStatus !== "All") {
        if (filterStatus === "Not Evaluated") {
          data = data.filter(
            (r) => !r.status || r.status.trim() === "" || r.status === null
          );
        } else {
          data = data.filter(
            (r) => r.status?.toLowerCase() === filterStatus.toLowerCase()
          );
        }
      }

      // ✅ Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        data = data.filter(
          (r) =>
            r.team_name?.toLowerCase().includes(query) ||
            r.abstract_id?.toLowerCase().includes(query) ||
            r.status?.toLowerCase().includes(query) ||
            r.evaluated_by?.toLowerCase().includes(query)
        );
      }

      setFiltered(data);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, filterStatus, results]);

  // 📩 Publish Results
  const publishResults = async () => {
    if (!window.confirm("Are you sure you want to publish results? This will send emails to all teams.")) return;

    setSending(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(API_MAIL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (res.ok) {
        alert(`✅ Results published successfully! (${data.sentCount || 0} emails sent)`);
      } else {
        alert(`❌ Failed to publish results.\n${data.message || "Server error."}`);
      }
    } catch (err) {
      console.error("Error publishing results:", err);
      alert("Error publishing results. Try again later.");
    } finally {
      setSending(false);
    }
  };

  // 🧭 Navigation Handlers
  const goToTeam = (teamId) => navigate(`/admin/team/${teamId}`);
  const goToAbstract = (abstractId) => navigate(`/admin/abstract/${abstractId}`);

  return (
    <div className="min-h-screen mt-20 bg-slate-950 text-white font-orbitron">
      {/* Header */}
      <motion.h2
        className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Abstract Evaluation Results
      </motion.h2>

      {/* Search + Filters + Publish */}
      <div className="w-full mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8 px-4">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by team name, abstract ID, status, or evaluator..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-2xl bg-gray-900/60 border border-cyan-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
          <Search className="absolute left-4 top-3.5 text-cyan-300" size={20} />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {["All", "Accepted", "Rejected", "On Review", "Not Evaluated"].map((status) => (
            <motion.button
              key={status}
              onClick={() => setFilterStatus(status)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                filterStatus === status
                  ? "bg-cyan-500 text-black border-cyan-400"
                  : "bg-gray-800 text-cyan-300 border-cyan-500/20 hover:bg-cyan-600/30"
              }`}
            >
              <Filter size={14} className="inline mr-1" /> {status}
            </motion.button>
          ))}
        </div>

        {/* Publish Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={publishResults}
          disabled={sending}
          className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-3 rounded-2xl shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all disabled:opacity-60"
        >
          <Mail size={20} /> {sending ? "Sending..." : "Publish Results"}
        </motion.button>
      </div>

      {/* Table */}
      <motion.div
        className="w-full mx-auto bg-gray-900/50 border border-cyan-400/30 rounded-3xl shadow-[0_0_40px_rgba(0,255,255,0.15)] p-6 backdrop-blur-md overflow-x-auto min-h-[300px]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
            />
            <p className="text-gray-400 mt-4 text-sm animate-pulse">
              Loading results...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No matching results found.</p>
        ) : (
          <table className="w-full border-collapse text-left text-sm md:text-base">
            <thead>
              <tr className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
                <th className="px-4 py-3 border-b border-cyan-400/30">Result ID</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Abstract ID</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Team ID</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Team Name</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">College</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Status</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Evaluated By</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Evaluated On</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {filtered.map((r, index) => (
                <motion.tr
                  key={r.result_id || r.abstract_id}
                  className="hover:bg-cyan-500/10 transition-all border-b border-gray-800"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <td className="px-4 py-3 text-gray-300">{r.result_id || "-"}</td>

                  {/* Click to Abstract Details */}
                  <td
                    className="px-4 py-3 text-cyan-400 cursor-pointer hover:underline"
                    onClick={() => goToAbstract(r.team_id)}
                  >
                    {r.abstract_id}
                  </td>

                  {/* Click to Team Details */}
                  <td
                    className="px-4 py-3 text-cyan-400 cursor-pointer hover:underline"
                    onClick={() => goToTeam(r.team_id)}
                  >
                    {r.team_id}
                  </td>

                  <td
                    className="px-4 py-3 font-semibold text-cyan-300 cursor-pointer hover:underline"
                    onClick={() => goToTeam(r.team_id)}
                  >
                    {r.team_name || "-"}
                  </td>

                  <td className="px-4 py-3 text-gray-300">{r.college_name || "-"}</td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                        !r.status
                          ? "bg-gray-700/30 text-yellow-300 border-yellow-400/30"
                          : r.status === "Accepted"
                          ? "bg-green-700/30 text-green-300 border-green-400/30"
                          : r.status === "Rejected"
                          ? "bg-red-700/30 text-red-300 border-red-400/30"
                          : "bg-yellow-700/30 text-yellow-300 border-yellow-400/30"
                      }`}
                    >
                      {r.status || "Not Evaluated"}
                    </span>
                  </td>

                  {/* Evaluated By */}
                  <td className="px-4 py-3 flex items-center gap-2 text-gray-300">
                    <UserCheck size={16} className="text-cyan-300" />
                    {r.evaluated_by || "Not evaluated yet"}
                  </td>

                  {/* Evaluated On */}
                  <td className="px-1 py-3  text-gray-300">
    <p className="flex gap-2">
  <Clock size={16} className="text-cyan-300" />
  {r.evaluated_at
    ? new Date(r.evaluated_at).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-"}
    </p>
</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
