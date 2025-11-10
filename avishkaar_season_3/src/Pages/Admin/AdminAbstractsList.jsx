import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👈 for navigation
import { Search, Filter, Clock } from "lucide-react";

export default function AdminAbstractsList() {
  const [abstracts, setAbstracts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 Initialize navigate

  const API_URL = "http://localhost:5002/api/abstracts";

  // 🧠 Fetch abstracts
  useEffect(() => {
    const fetchAbstracts = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log("Abstracts:", data);
        const list = data.data || data || [];
        setAbstracts(list);
        setFiltered(list);
      } catch (err) {
        console.error("Error fetching abstracts:", err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };
    fetchAbstracts();
  }, []);

  // 🔍 Filter & Search Logic
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let data = abstracts;
      if (filterStatus !== "All") {
  if (filterStatus === "Not Evaluated") {
    data = data.filter(
      (a) => !a.status || a.status.trim() === "" || a.status === null
    );
  } else {
    data = data.filter(
      (a) => a.status?.toLowerCase() === filterStatus.toLowerCase()
    );
  }
}

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        data = data.filter(
          (a) =>
            a.team_name?.toLowerCase().includes(query) ||
            a.abstract_id?.toLowerCase().includes(query) ||
            a.domain?.toLowerCase().includes(query)
        );
      }
      setFiltered(data);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery, filterStatus, abstracts]);

  // 🧭 Navigation Handlers
  const goToTeamDetails = (teamId) => {
    navigate(`/admin/team/${teamId}`);
  };

  const goToAbstractDetails = (abstractId) => {
    navigate(`/admin/abstract/${abstractId}`);
  };

  return (
    <div className="min-h-screen mt-20 bg-slate-950 text-white font-orbitron px-4">
      {/* Header */}
      <motion.h2
        className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        All Abstracts
      </motion.h2>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by team name, abstract ID, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-2xl bg-gray-900/60 border border-cyan-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
          />
          <Search className="absolute left-4 top-3.5 text-cyan-300" size={20} />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 flex-wrap justify-center">
          {["All", "Accepted", "Rejected", "Not Evaluated"].map((status) => (
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
              Loading abstracts...
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No abstracts found.</p>
        ) : (
          <table className="w-full border-collapse text-left text-sm md:text-base min-w-[900px]">
            <thead>
              <tr className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
                <th className="px-4 py-3 border-b border-cyan-400/30">Abstract ID</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Team ID</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Team Name</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">College</th>
                {/* <th className="px-4 py-3 border-b border-cyan-400/30">Title</th> */}
                {/* <th className="px-4 py-3 border-b border-cyan-400/30">Domain</th> */}
                <th className="px-4 py-3 border-b border-cyan-400/30">Status</th>
                <th className="px-4 py-3 border-b border-cyan-400/30">Submitted On</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              {filtered.map((a, i) => (
                <motion.tr
                  key={a.abstract_id}
                  className="hover:bg-cyan-500/10 transition-all border-b border-gray-800"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  {/* Abstract ID → Click to Abstract Details */}
                  <td
                    className="px-4 py-3 text-white font-semibold cursor-pointer hover:underline"
                    onClick={() => goToAbstractDetails(a.team_id)}
                  >
                    {a.abstract_id}
                  </td>
                <td
                    className="px-4 py-3 text-white font-semibold cursor-pointer hover:underline"
                    onClick={() => goToTeamDetails(a.team_id)}
                  >
                    {a.team_id}
                  </td>
                  {/* Team Name → Click to Team Details */}
                  <td
                    className="px-4 py-3 font-semibold text-cyan-300 cursor-pointer hover:underline"
                    onClick={() => goToTeamDetails(a.team_id)}
                  >
                    {a.teamname}
                  </td>

                  <td className="px-4 py-3 text-gray-300">{a.collegeName}</td>
                  {/* <td className="px-4 py-3 text-gray-300 truncate max-w-[250px]">
                    {a.collegeName}
                  </td> */}
                  {/* <td className="px-4 py-3 text-gray-300">{a.domain}</td> */}

                  {/* Status — handle null */}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                        !a.status
                          ? "bg-gray-700/30 text-yellow-300 border-yellow-400/30"
                          : a.status === "Accepted"
                          ? "bg-green-700/30 text-green-300 border-green-400/30"
                          : a.status === "Rejected"
                          ? "bg-red-700/30 text-red-300 border-red-400/30"
                          : "bg-yellow-700/30 text-yellow-300 border-yellow-400/30"
                      }`}
                    >
                      {a.status || "Not Evaluated"}
                    </span>
                  </td>

                  {/* Submitted Date */}
                  <td className="px-4 py-3 flex items-center gap-2 text-gray-300">
                    <Clock size={16} className="text-cyan-300" />
                    {a.created_at
                      ? new Date(a.created_at).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
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
