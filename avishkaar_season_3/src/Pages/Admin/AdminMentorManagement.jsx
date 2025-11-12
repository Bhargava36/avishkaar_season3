
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Edit3, Trash2, Save, X } from "lucide-react";

export default function AdminMentorManagement() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingMentor, setEditingMentor] = useState(null);
  const [form, setForm] = useState({
    mentor_name: "",
    email: "",
    designation: "",
    tech_stack: "",
  });

  const API_BASE = "http://localhost:5002/api/mentors";

  // 🧠 Fetch Mentors
  const fetchMentors = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const res = await fetch(API_BASE, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Fetched mentors raw:", data);

      // 🧩 Normalize data
      const mentorsList = (data.data || data || []).map((m) => ({
        mentor_id: m.Mentor_Id || m.mentorId,
        mentor_name: m.Mentor_Name || m.mentorName,
        designation: m.Designation,
        email: m.Email,
        tech_stack: m.Tech_Stack || m.techStack,
      }));

      console.log("Normalized mentors:", mentorsList);
      setMentors(mentorsList);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // ➕ Add or Update Mentor
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const method = editingMentor ? "PUT" : "POST";
    const url = editingMentor
      ? `${API_BASE}/${editingMentor.mentor_id}`
      : API_BASE;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        alert(editingMentor ? "✅ Mentor updated" : "✅ Mentor added");
        fetchMentors();
        setEditingMentor(null);
        setForm({
          mentor_name: "",
          email: "",
          designation: "",
          tech_stack: "",
        });
      } else {
        alert(`❌ Operation failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error saving mentor:", err);
    }
  };

  // 🗑 Delete Mentor
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this mentor?")) return;

    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("✅ Mentor deleted");
        fetchMentors();
      } else {
        alert("❌ Failed to delete mentor");
      }
    } catch (err) {
      console.error("Error deleting mentor:", err);
    }
  };

  // ✏️ Edit Mentor
  const handleEdit = (mentor) => {
    setEditingMentor(mentor);
    setForm({ ...mentor });
  };

  // 🔍 Filter Mentors
  const filteredMentors = mentors.filter((m) => {
    const q = searchQuery.toLowerCase();
    return (
      m.mentor_name?.toLowerCase().includes(q) ||
      m.email?.toLowerCase().includes(q) ||
      m.tech_stack?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white font-orbitron">
      {/* Header */}
      <motion.h2
        className="text-4xl md:text-4xl orbitron mt-12 font-bold text-center mb-10 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Mentor Management
      </motion.h2>

      {/* Add/Edit Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6 mb-10 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <UserPlus size={26} />
          {editingMentor ? "Edit Mentor" : "Add Mentor"}
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Mentor Name"
            className="bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={form.mentor_name}
            onChange={(e) => setForm({ ...form, mentor_name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Designation"
            className="bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={form.designation}
            onChange={(e) => setForm({ ...form, designation: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Tech Stack (e.g. React, Node.js)"
            className="bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={form.tech_stack}
            onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {editingMentor && (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingMentor(null);
                setForm({
                  mentor_name: "",
                  email: "",
                  designation: "",
                  tech_stack: "",
                });
              }}
              className="flex items-center gap-2 bg-red-500/30 border border-red-400/50 text-red-300 px-5 py-2 rounded-xl hover:bg-red-500/40"
            >
              <X size={18} /> Cancel
            </motion.button>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 px-5 py-2 rounded-xl hover:bg-cyan-500/40"
          >
            <Save size={18} /> {editingMentor ? "Save Changes" : "Add Mentor"}
          </motion.button>
        </div>
      </motion.form>

      {/* Search Bar */}
      <div className="relative w-full  mx-auto mb-10">
        <input
          type="text"
          placeholder="Search mentors by name, email or tech stack..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3 pl-12 rounded-2xl bg-gray-900/60 border border-cyan-400/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
        />
        <Search className="absolute left-4 top-3.5 text-cyan-300" size={20} />
      </div>

      {/* Mentor Cards */}
      {loading ? (
        <p className="text-center text-gray-400 animate-pulse mt-10">
          Loading mentors...
        </p>
      ) : filteredMentors.length === 0 ? (
        <p className="text-center text-gray-400">No mentors found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {filteredMentors.map((m, i) => (
    <motion.div
      key={m.mentor_id}
      className="relative bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-cyan-400/30 rounded-3xl p-6 text-center shadow-[0_0_25px_rgba(0,255,255,0.15)] hover:shadow-[0_0_45px_rgba(0,255,255,0.4)] transition-all duration-300 backdrop-blur-md group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ scale: 1.03 }}
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-lg transition-all duration-300"></div>

      {/* Mentor Name */}
      <h4 className="text-xl font-bold text-cyan-300 mb-2 tracking-wide z-10 relative">
        {m.mentor_name}
      </h4>
<h4 className="text-xs text-white bg-cyan-500/10 border border-cyan-400/40 hover:bg-cyan-500/20 transition-all rounded-full p-1 mb-2 tracking-wide z-10 relative">
        {m.mentor_id}
      </h4>
      {/* Designation */}
      <p className="text-gray-300 text-sm font-medium mb-2">
        {m.designation || "—"}
      </p>

      {/* Email */}
      <p className="text-gray-400 text-xs mb-3 truncate">{m.email}</p>

      {/* Tech Stack */}
      {m.tech_stack ? (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {m.tech_stack.split(",").map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 rounded-full hover:bg-cyan-500/20 transition-all"
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-xs mb-4">No tech stack listed</p>
      )}

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-2 z-10 relative">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleEdit(m)}
          className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-cyan-300 border border-cyan-400/40 rounded-xl hover:bg-cyan-500/20 hover:shadow-[0_0_10px_rgba(0,255,255,0.3)] transition-all"
        >
          <Edit3 size={16} /> Edit
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleDelete(m.mentor_id)}
          className="flex items-center gap-1 px-4 py-2 text-sm font-semibold text-red-300 border border-red-400/40 rounded-xl hover:bg-red-500/20 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)] transition-all"
        >
          <Trash2 size={16} /> Delete
        </motion.button>
      </div>
    </motion.div>
  ))}
</div>

      )}
    </div>
  );
}
