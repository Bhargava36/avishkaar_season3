import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Filter,
  UserPlus,
  CheckCircle,
  XCircle,
  Edit3,
} from "lucide-react";

export default function ImportantDates() {
  const [requests, setRequests] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [editingRequest, setEditingRequest] = useState(null);
  const [editMessage, setEditMessage] = useState("");

  const API_BASE = "http://localhost:5002/api";

  // 🧠 Fetch mentor requests + mentors
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [reqRes, mentorRes] = await Promise.all([
          fetch(`${API_BASE}/mentor-requests`, { headers }),
          fetch(`${API_BASE}/mentors`, { headers }),
        ]);

        const reqData = await reqRes.json();
        const mentorData = await mentorRes.json();

        setRequests(reqData.data || []);
        setMentors(mentorData.data || []);
      } catch (err) {
        console.error("Error fetching mentor requests:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🧩 Approve / Reject request
  const handleStatusUpdate = async (id, status) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/mentor-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`✅ Request marked as ${status}`);
        setRequests((prev) =>
          prev.map((r) => (r.request_id === id ? { ...r, status } : r))
        );
      } else {
        alert(`❌ ${data.message || "Failed to update request"}`);
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Error updating status. Please try again.");
    }
  };

  // 🧩 Assign mentor to team
  const handleAssignMentor = async (teamId) => {
    const mentorId = selectedMentor[teamId];
    if (!mentorId) {
      alert("Please select a mentor first.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/mentor-assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mentor_id: mentorId,
          team_id: teamId,
          assigned_by: "Admin",
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Mentor assigned successfully!");
        setRequests((prev) =>
          prev.map((r) =>
            r.team_id === teamId ? { ...r, status: "Approved" } : r
          )
        );
      } else {
        alert(`❌ ${data.message || "Failed to assign mentor"}`);
      }
    } catch (err) {
      console.error("Error assigning mentor:", err);
      alert("Error assigning mentor. Please try again.");
    }
  };

  // 🧭 Filter requests
  const filteredRequests =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  // 📝 Handle Edit Modal Submit
  const handleEditSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/mentor-requests/${editingRequest.request_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: editMessage, status: "Pending" }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Request moved back to Pending for reconsideration");
        setRequests((prev) =>
          prev.map((r) =>
            r.request_id === editingRequest.request_id
              ? { ...r, message: editMessage, status: "Pending" }
              : r
          )
        );
        setEditingRequest(null);
        setEditMessage("");
      } else {
        alert(`❌ ${data.message || "Failed to update request"}`);
      }
    } catch (err) {
      console.error("Error editing request:", err);
      alert("Error editing request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron">
      {/* Header */}
      <motion.h2
        className="text-4xl md:text-5xl  font-bold text-center mb-12 bg-cyan-600 orbitron mt-12 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mentor Requests Management
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {["All", "Pending", "Approved", "Rejected"].map((s) => (
          <motion.button
            key={s}
            onClick={() => setFilter(s)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
              filter === s
                ? "bg-cyan-500 text-black border-cyan-400"
                : "bg-gray-800 text-cyan-300 border-cyan-500/20 hover:bg-cyan-600/30"
            }`}
          >
            <Filter size={14} className="inline mr-1" /> {s}
          </motion.button>
        ))}
      </div>

      {/* Table */}
      <motion.div
        className="bg-gray-900/40 border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse py-10">
            Loading mentor requests...
          </p>
        ) : filteredRequests.length === 0 ? (
          <p className="text-center text-gray-400 py-10">
            No mentor requests found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-cyan-400/40 rounded-xl text-left text-sm md:text-base">
              <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Team</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">College</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Message</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Status</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30 text-center">
                    Assign Mentor
                  </th>
                  <th className="px-4 py-3 border-b border-cyan-400/30 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {filteredRequests.map((r, index) => (
                  <motion.tr
                    key={r.request_id}
                    className="hover:bg-cyan-500/10 border-b border-gray-700/50 transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <td className="px-4 py-3 font-semibold text-cyan-300">
                      {r.team_name || "—"}
                    </td>
                    <td className="px-4 py-3">{r.college_name || "—"}</td>
                    <td className="px-4 py-3 max-w-[250px] truncate">
                      {r.message || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
                          r.status === "Approved"
                            ? "bg-green-700/30 text-green-300 border-green-400/30"
                            : r.status === "Rejected"
                            ? "bg-red-700/30 text-red-300 border-red-400/30"
                            : "bg-yellow-700/30 text-yellow-300 border-yellow-400/30"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      {r.status === "Approved" && (
                        <span className="text-cyan-400 italic">
                          Mentor Assigned
                        </span>
                      )}
                      {r.status === "Pending" && (
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                          <select
                            value={selectedMentor[r.team_id] || ""}
                            onChange={(e) =>
                              setSelectedMentor({
                                ...selectedMentor,
                                [r.team_id]: e.target.value,
                              })
                            }
                            className="bg-gray-800 border border-cyan-400/40 text-white text-sm rounded-lg px-2 py-1 focus:outline-none"
                          >
                            <option value="">Select Mentor</option>
                            {mentors.map((m) => (
                              <option key={m.mentor_id} value={m.mentor_id}>
                                {m.mentor_name}
                              </option>
                            ))}
                          </select>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAssignMentor(r.team_id)}
                            className="bg-cyan-500/30 hover:bg-cyan-500/50 border border-cyan-400/40 px-3 py-1 rounded-lg text-sm flex items-center gap-1"
                          >
                            <UserPlus size={16} /> Assign
                          </motion.button>
                        </div>
                      )}
                      {r.status === "Rejected" && <span>-</span>}
                    </td>

                    {/* 🧩 Actions */}
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      {r.status === "Pending" && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleStatusUpdate(r.request_id, "Approved")
                            }
                            className="text-green-400 hover:text-green-300"
                            title="Approve Request"
                          >
                            <CheckCircle size={20} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleStatusUpdate(r.request_id, "Rejected")
                            }
                            className="text-red-400 hover:text-red-300"
                            title="Reject Request"
                          >
                            <XCircle size={20} />
                          </motion.button>
                        </>
                      )}
                      {r.status === "Rejected" && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setEditingRequest(r);
                            setEditMessage(r.message || "");
                          }}
                          className="text-yellow-400 hover:text-yellow-300"
                          title="Edit Rejected Request"
                        >
                          <Edit3 size={20} />
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* 📝 Edit Modal */}
      {editingRequest && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gray-900 border border-cyan-400/30 rounded-3xl p-8 w-full max-w-lg text-center shadow-[0_0_30px_rgba(0,255,255,0.3)]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">
              Edit Mentor Request
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              Team: <span className="text-cyan-300">{editingRequest.team_name}</span>
            </p>
            <textarea
              value={editMessage}
              onChange={(e) => setEditMessage(e.target.value)}
              rows="4"
              className="w-full bg-gray-800 text-white p-3 rounded-xl mb-4 border border-cyan-400/40"
              placeholder="Update request message..."
            ></textarea>

            <div className="flex justify-end gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditingRequest(null)}
                className="bg-red-500/30 border border-red-400/40 px-4 py-2 rounded-xl text-red-300 hover:bg-red-500/40"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEditSubmit}
                className="bg-cyan-500/30 border border-cyan-400/40 px-4 py-2 rounded-xl text-cyan-300 hover:bg-cyan-500/40"
              >
                Save & Reopen
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
