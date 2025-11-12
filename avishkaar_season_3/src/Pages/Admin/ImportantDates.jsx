// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Filter, UserPlus, CheckCircle, XCircle, Edit3, Save } from "lucide-react";
// import { jwtDecode } from "jwt-decode";

// export default function ImportantDates() {
//   const [requests, setRequests] = useState([]);
//   const [mentors, setMentors] = useState([]);
//   const [selectedMentor, setSelectedMentor] = useState({});
//   const [editingMentorFor, setEditingMentorFor] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("All");

//   const API_BASE = "http://localhost:5002/api";

//   // 🧠 Fetch mentor requests + mentors
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const token = sessionStorage.getItem("token");
//         const headers = { Authorization: `Bearer ${token}` };

//         const [reqRes, mentorRes] = await Promise.all([
//           fetch(`${API_BASE}/mentor-requests`, { headers }),
//           fetch(`${API_BASE}/mentors`, { headers }),
//         ]);

//         const reqData = await reqRes.json();
//         const mentorData = await mentorRes.json();

//         setRequests(reqData.data || []);
//         setMentors(mentorData.data || []);
//       } catch (err) {
//         console.error("Error fetching mentor requests:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // ✅ Approve + Assign Mentor
//   const handleApproveWithMentor = async (request) => {
//     const teamId = request.team_id;
//     const mentorId = selectedMentor[teamId];
//     if (!mentorId) {
//       alert("⚠️ Please select a mentor before approving.");
//       return;
//     }

//     try {
//       const token = sessionStorage.getItem("token");
//       const decodedToken = jwtDecode(token);

//       const assignRes = await fetch(`${API_BASE}/mentor-assign`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           mentor_id: mentorId,
//           team_id: teamId,
//           assigned_by: decodedToken.id,
//         }),
//       });

//       const assignData = await assignRes.json();
//       if (!assignRes.ok) throw new Error(assignData.message || "Failed to assign mentor.");

//       // Update status
//       const statusRes = await fetch(`${API_BASE}/mentor-requests/${request.request_id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status: "Approved" }),
//       });

//       if (statusRes.ok) {
//         const assignedMentor = mentors.find((m) => m.Mentor_Id === mentorId);
//         alert("✅ Mentor assigned & request approved successfully!");
//         setRequests((prev) =>
//           prev.map((r) =>
//             r.request_id === request.request_id
//               ? { ...r, status: "Approved", mentor_id: mentorId, mentor: assignedMentor }
//               : r
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Error approving request:", err);
//     }
//   };

//   // ❌ Reject
//   const handleReject = async (requestId) => {
//     if (!window.confirm("Reject this request?")) return;
//     const token = sessionStorage.getItem("token");
//     const res = await fetch(`${API_BASE}/mentor-requests/${requestId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ status: "Rejected" }),
//     });
//     if (res.ok) {
//       setRequests((prev) =>
//         prev.map((r) =>
//           r.request_id === requestId ? { ...r, status: "Rejected" } : r
//         )
//       );
//     }
//   };

//   // ✏️ Update Mentor
//   const handleUpdateMentor = async (teamId) => {
//     const mentorId = selectedMentor[teamId];
//     if (!mentorId) {
//       alert("Please select a mentor first.");
//       return;
//     }

//     try {
//       const token = sessionStorage.getItem("token");
//       const res = await fetch(`${API_BASE}/mentor-assign/${teamId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ mentor_id: mentorId }),
//       });

//       if (res.ok) {
//         const updatedMentor = mentors.find((m) => m.Mentor_Id === mentorId);
//         alert("✅ Mentor updated successfully!");
//         setRequests((prev) =>
//           prev.map((r) =>
//             r.team_id === teamId ? { ...r, mentor_id: mentorId, mentor: updatedMentor } : r
//           )
//         );
//         setEditingMentorFor(null);
//       }
//     } catch (err) {
//       console.error("Error updating mentor:", err);
//     }
//   };

//   console.log("Requests:", mentors);
//   const filteredRequests = filter === "All" ? requests : requests.filter((r) => r.status === filter);

//   return (
//     <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron">
//       <motion.h2
//         className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
//         initial={{ opacity: 0, y: -30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         Mentor Requests Management
//       </motion.h2>

//       {/* Filter Buttons */}
//       <div className="flex flex-wrap gap-3 justify-center mb-8">
//         {["All", "Pending", "Approved", "Rejected"].map((s) => (
//           <motion.button
//             key={s}
//             onClick={() => setFilter(s)}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.9 }}
//             className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
//               filter === s
//                 ? "bg-cyan-500 text-black border-cyan-400"
//                 : "bg-gray-800 text-cyan-300 border-cyan-500/20 hover:bg-cyan-600/30"
//             }`}
//           >
//             <Filter size={14} className="inline mr-1" /> {s}
//           </motion.button>
//         ))}
//       </div>

//       {/* Table */}
//       <motion.div
//         className="bg-gray-900/40 border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//       >
//         {loading ? (
//           <p className="text-center text-gray-400 py-10">Loading mentor requests...</p>
//         ) : filteredRequests.length === 0 ? (
//           <p className="text-center text-gray-400 py-10">No mentor requests found.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border border-cyan-400/40 rounded-xl text-left text-sm md:text-base">
//               <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
//                 <tr>
//                   <th className="px-4 py-3 border-b border-cyan-400/30">Team</th>
//                   <th className="px-4 py-3 border-b border-cyan-400/30">College</th>
//                   <th className="px-4 py-3 border-b border-cyan-400/30">Message</th>
//                   <th className="px-4 py-3 border-b border-cyan-400/30">Status</th>
//                   <th className="px-4 py-3 border-b border-cyan-400/30">Mentor</th>
//                   <th className="px-4 py-3 border-b border-cyan-400/30 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredRequests.map((r, i) => {
//                   console.log("Request:", r);
//                   const mentor =
//                     r.mentor || mentors.find((m) => m.Mentor_Id == r.mentor_id);
//                   console.log("Mentor for team", r.team_id, ":", mentor);
//                   return (
//                     <motion.tr
//                       key={r.request_id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       className="hover:bg-cyan-500/10 border-b border-gray-700/50"
//                     >
//                       <td className="px-4 py-3 text-cyan-300 font-semibold">
//                         {r.team_name || "—"}
//                       </td>
//                       <td className="px-4 py-3">{r.college_name || "—"}</td>
//                       <td className="px-4 py-3 max-w-[250px] truncate">{r.message || "-"}</td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-3 py-1 rounded-xl text-xs font-semibold border ${
//                             r.status === "Approved"
//                               ? "bg-green-700/30 text-green-300 border-green-400/30"
//                               : r.status === "Rejected"
//                               ? "bg-red-700/30 text-red-300 border-red-400/30"
//                               : "bg-yellow-700/30 text-yellow-300 border-yellow-400/30"
//                           }`}
//                         >
//                           {r.status}
//                         </span>
//                       </td>

//                       {/* ✅ Mentor Info */}
//                       <td className="px-4 py-3 text-center">
//                         {r.status === "Pending" || editingMentorFor === r.team_id ? (
//                           <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
//                             <select
//                               value={selectedMentor[r.team_id] || ""}
//                               onChange={(e) =>
//                                 setSelectedMentor({
//                                   ...selectedMentor,
//                                   [r.team_id]: e.target.value,
//                                 })
//                               }
//                               className="bg-gray-800 border border-cyan-400/40 text-white text-sm rounded-lg px-2 py-1 focus:outline-none"
//                             >
//                               <option value="">Select Mentor</option>
//                               {mentors.map((m) => (
//                                 <option key={m.Mentor_Id} value={m.Mentor_Id}>
//                                   {m.Mentor_Name}
//                                 </option>
//                               ))}
//                             </select>
//                             {editingMentorFor === r.team_id && (
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => handleUpdateMentor(r.team_id)}
//                                 className="bg-green-500/30 border border-green-400/40 px-3 py-1 rounded-lg text-sm text-green-300 hover:bg-green-500/40"
//                               >
//                                 <Save size={16} /> Save
//                               </motion.button>
//                             )}
//                           </div>
//                         ) : r.status === "Approved" ? (
//                           <div>
//                             <p className="text-cyan-300 font-semibold">{mentor?.Mentor_Name}</p>
//                             <p className="text-gray-400 text-xs italic">
//                               {mentor?.Tech_stack || "No tech stack"}
//                             </p>
//                           </div>
//                         ) : (
//                           "-"
//                         )}
//                       </td>

//                       {/* ✅ Actions */}
//                       <td className="px-4 py-3 text-center flex justify-center gap-3">
//                         {r.status === "Pending" && (
//                           <>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => handleApproveWithMentor(r)}
//                               className="bg-green-600/30 border border-green-400/40 text-green-300 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-600/40"
//                             >
//                               <CheckCircle size={16} /> Approve & Assign
//                             </motion.button>

//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => handleReject(r.request_id)}
//                               className="bg-red-600/30 border border-red-400/40 text-red-300 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600/40"
//                             >
//                               <XCircle size={16} /> Reject
//                             </motion.button>
//                           </>
//                         )}

//                         {r.status === "Approved" && editingMentorFor !== r.team_id && (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => setEditingMentorFor(r.team_id)}
//                             className="bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-yellow-500/40"
//                           >
//                             <Edit3 size={16} /> Edit Mentor
//                           </motion.button>
//                         )}
//                       </td>
//                     </motion.tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Filter, CheckCircle, XCircle, Edit3, Save } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function MentorRequests() {
  const [requests, setRequests] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [assignments, setAssignments] = useState([]); // 🧩 New: mentor assignments
  const [selectedMentor, setSelectedMentor] = useState({});
  const [editingMentorFor, setEditingMentorFor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const API_BASE = "http://localhost:5002/api";

  // 🧠 Fetch all required data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [reqRes, mentorRes, assignRes] = await Promise.all([
          fetch(`${API_BASE}/mentor-requests`, { headers }),
          fetch(`${API_BASE}/mentors`, { headers }),
          fetch(`${API_BASE}/mentor-assign`, { headers }), // 🆕 Fetch assignments
        ]);

        const reqData = await reqRes.json();
        const mentorData = await mentorRes.json();
        const assignData = await assignRes.json();

        setRequests(reqData.data || []);
        setMentors(mentorData.data || []);
        setAssignments(assignData.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🧩 Helper: get mentor assigned to a specific team
  const getAssignedMentor = (teamId) => {
    const assignment = assignments.find((a) => a.team_id === teamId);
    console.log("Assignment for team", teamId, ":", assignment);
    if (!assignment) return null;
    return mentors.find((m) => m.Mentor_Id === assignment.mentor_id);
  };

  // ✅ Approve + Assign Mentor
  const handleApproveWithMentor = async (request) => {
    const teamId = request.team_id;
    const mentorId = selectedMentor[teamId];
    if (!mentorId) {
      alert("⚠️ Please select a mentor before approving.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const decoded = jwtDecode(token);

      // 1️⃣ Add mentor assignment
      const assignRes = await fetch(`${API_BASE}/mentor-assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mentor_id: mentorId,
          team_id: teamId,
          assigned_by: decoded.id,
        }),
      });

      const assignData = await assignRes.json();
      if (!assignRes.ok) throw new Error(assignData.message);

      // 2️⃣ Update request to approved
      await fetch(`${API_BASE}/mentor-requests/${request.request_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Approved" }),
      });

      alert("✅ Mentor assigned & request approved successfully!");

      const assignedMentor = mentors.find((m) => m.Mentor_Id === mentorId);

      // Update UI states
      setAssignments((prev) => [
        ...prev,
        {
          team_id: teamId,
          mentor_id: mentorId,
          assigned_by: decoded.id,
          assigned_at: new Date(),
        },
      ]);

      setRequests((prev) =>
        prev.map((r) =>
          r.request_id === request.request_id
            ? { ...r, status: "Approved" }
            : r
        )
      );
    } catch (err) {
      console.error("Error approving:", err);
    }
  };

  // ❌ Reject
  const handleReject = async (requestId) => {
    if (!window.confirm("Reject this request?")) return;

    const token = sessionStorage.getItem("token");
    const res = await fetch(`${API_BASE}/mentor-requests/${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "Rejected" }),
    });

    if (res.ok) {
      setRequests((prev) =>
        prev.map((r) =>
          r.request_id === requestId ? { ...r, status: "Rejected" } : r
        )
      );
    }
  };

  // ✏️ Update Mentor Assignment
  const handleUpdateMentor = async (teamId) => {
    const mentorId = selectedMentor[teamId];
    if (!mentorId) {
      alert("Please select a mentor to update.");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_BASE}/mentor-assign/${teamId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ mentor_id: mentorId }),
      });

      if (res.ok) {
        alert("✅ Mentor reassigned successfully!");
        const updatedMentor = mentors.find((m) => m.Mentor_Id === mentorId);

        setAssignments((prev) =>
          prev.map((a) =>
            a.team_id === teamId ? { ...a, mentor_id: mentorId } : a
          )
        );
        setEditingMentorFor(null);
      }
    } catch (err) {
      console.error("Error updating mentor:", err);
    }
  };

  const filteredRequests =
    filter === "All" ? requests : requests.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron">
      <motion.h2
        className="text-4xl md:text-5xl orbitron font-bold text-center mb-12 bg-cyan-600 mt-12 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mentor Requests Management
      </motion.h2>

      {/* Filter Buttons */}
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
          <p className="text-center text-gray-400 py-10">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-cyan-400/40 rounded-xl text-left text-sm md:text-base">
              <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3">Team</th>
                  <th className="px-4 py-3">College</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Mentor</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((r) => {
                  const assignedMentor = getAssignedMentor(r.team_id);

                  return (
                    <tr key={r.request_id} className="border-b border-gray-700/50">
                      <td className="px-4 py-3 text-cyan-300 font-semibold">{r.team_name}</td>
                      <td className="px-4 py-3">{r.college_name}</td>
                      <td className="px-4 py-3 max-w-[250px] truncate">{r.message}</td>
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

                      {/* 🧠 Mentor Display */}
                      <td className="px-4 py-3 text-center">
                        {r.status === "Approved" && !editingMentorFor ? (
                          assignedMentor ? (
                            <div>
                              <p className="text-cyan-300 font-semibold">{assignedMentor.Mentor_Name}</p>
                              <p className="text-gray-400 text-xs italic">
                                {assignedMentor.Designation} • {assignedMentor.Tech_stack}
                              </p>
                            </div>
                          ) : (
                            <p className="text-gray-400 italic">No mentor assigned</p>
                          )
                        ) : r.status === "Pending" || editingMentorFor === r.team_id ? (
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
                                <option key={m.Mentor_Id} value={m.Mentor_Id}>
                                  {m.Mentor_Name}
                                </option>
                              ))}
                            </select>

                            {editingMentorFor === r.team_id && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleUpdateMentor(r.team_id)}
                                className="bg-green-500/30 border border-green-400/40 px-3 py-1 rounded-lg text-sm text-green-300 hover:bg-green-500/40"
                              >
                                <Save size={16} /> Save
                              </motion.button>
                            )}
                          </div>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-center flex justify-center gap-3">
                        {r.status === "Pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleApproveWithMentor(r)}
                              className="bg-green-600/30 border border-green-400/40 text-green-300 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-600/40"
                            >
                              <CheckCircle size={16} /> Approve & Assign
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleReject(r.request_id)}
                              className="bg-red-600/30 border border-red-400/40 text-red-300 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600/40"
                            >
                              <XCircle size={16} /> Reject
                            </motion.button>
                          </>
                        )}

                        {r.status === "Approved" && editingMentorFor !== r.team_id && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setEditingMentorFor(r.team_id)}
                            className="bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-yellow-500/40"
                          >
                            <Edit3 size={16} /> Edit Mentor
                          </motion.button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
