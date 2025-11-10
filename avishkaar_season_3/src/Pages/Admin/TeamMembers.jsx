import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, PlusCircle, Pencil, Trash2, Save } from "lucide-react";

export default function TeamMembers() {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Prashanth",
      role: "Team Lead",
      email: "bhargav@webfusion.com",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ]);

  const [newMember, setNewMember] = useState({ name: "", role: "", email: "", photo: null });
  const [editingId, setEditingId] = useState(null);
  const [editedMember, setEditedMember] = useState({ name: "", role: "", email: "", photo: null });

  // Handle file selection
  const handleFileChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEditing) setEditedMember({ ...editedMember, photo: reader.result });
      else setNewMember({ ...newMember, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Add Member
  const handleAdd = () => {
    if (!newMember.name || !newMember.role || !newMember.photo) return;
    setMembers([...members, { id: Date.now(), ...newMember }]);
    setNewMember({ name: "", role: "", email: "", photo: null });
  };

  // Delete Member
  const handleDelete = (id) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  // Edit Member
  const handleEdit = (member) => {
    setEditingId(member.id);
    setEditedMember({ ...member });
  };

  // Save Edited Member
  const handleSave = (id) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, ...editedMember } : m))
    );
    setEditingId(null);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron">
      {/* Header */}
      <motion.h2
        className="text-4xl rubik-glitch md:text-5xl font-bold text-center mb-12 bg-gradient-to-b from-gray-400 via-gray-400 to-cyan-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        TEAM MEMBERS MANAGEMENT
      </motion.h2>

      {/* Add Member Section */}
      <motion.div
        className="bg-gray-900/40 border border-cyan-400/40 rounded-3xl p-6 mb-10 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <Users size={26} /> Add New Member
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 items-center flex-wrap">
          <input
            type="text"
            placeholder="Name"
            className="flex-1 bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            className="flex-1 bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email (optional)"
            className="flex-1 bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e)}
            className="text-gray-200"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="flex items-center gap-2 bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 px-4 py-2 rounded-xl hover:bg-cyan-500/30 transition-all"
          >
            <PlusCircle size={18} /> Add
          </motion.button>
        </div>
      </motion.div>

      {/* Table Section */}
      <motion.div
        className="bg-gray-900/40 border border-cyan-400/40 rounded-3xl p-6 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Team Members List</h3>

        {members.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No team members added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-cyan-400/40 rounded-xl overflow-hidden text-left">
              <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Photo</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Name</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Role</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Email</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="hover:bg-cyan-500/10 transition-all border-b border-gray-700/50"
                  >
                    <td className="px-4 py-3">
                      {editingId === member.id ? (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, true)}
                        />
                      ) : (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === member.id ? (
                        <input
                          type="text"
                          value={editedMember.name}
                          onChange={(e) => setEditedMember({ ...editedMember, name: e.target.value })}
                          className="bg-gray-800 border border-cyan-400/40 rounded-lg px-3 py-1 w-full focus:border-cyan-400"
                        />
                      ) : (
                        member.name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === member.id ? (
                        <input
                          type="text"
                          value={editedMember.role}
                          onChange={(e) => setEditedMember({ ...editedMember, role: e.target.value })}
                          className="bg-gray-800 border border-cyan-400/40 rounded-lg px-3 py-1 w-full focus:border-cyan-400"
                        />
                      ) : (
                        member.role
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === member.id ? (
                        <input
                          type="text"
                          value={editedMember.email}
                          onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
                          className="bg-gray-800 border border-cyan-400/40 rounded-lg px-3 py-1 w-full focus:border-cyan-400"
                        />
                      ) : (
                        member.email
                      )}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      {editingId === member.id ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSave(member.id)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Save size={20} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(member)}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <Pencil size={20} />
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(member.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
