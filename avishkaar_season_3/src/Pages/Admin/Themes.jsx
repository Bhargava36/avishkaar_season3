import React, { useState } from "react";
import { motion } from "framer-motion";
import { Palette, PlusCircle, Pencil, Trash2, Save } from "lucide-react";

export default function Themes() {
  const [themes, setThemes] = useState([
    {
      id: 1,
      name: "Artificial Intelligence",
      description: "Exploring modern AI applications and their real-world impact.",
      icon: "🤖",
    },
    {
      id: 2,
      name: "Green Technology",
      description: "Sustainable and eco-friendly innovations for the future.",
      icon: "🌱",
    },
    {
      id: 3,
      name: "Cyber Security",
      description: "Protecting systems and data from modern digital threats.",
      icon: "🛡️",
    },
  ]);

  const [newTheme, setNewTheme] = useState({ name: "", description: "", icon: "" });
  const [editingId, setEditingId] = useState(null);
  const [editedTheme, setEditedTheme] = useState({ name: "", description: "", icon: "" });

  // Add Theme
  const handleAdd = () => {
    if (!newTheme.name || !newTheme.description || !newTheme.icon) return;
    setThemes([...themes, { id: Date.now(), ...newTheme }]);
    setNewTheme({ name: "", description: "", icon: "" });
  };

  // Delete Theme
  const handleDelete = (id) => {
    setThemes(themes.filter((t) => t.id !== id));
  };

  // Edit Theme
  const handleEdit = (theme) => {
    setEditingId(theme.id);
    setEditedTheme({ name: theme.name, description: theme.description, icon: theme.icon });
  };

  // Save Edited Theme
  const handleSave = (id) => {
    setThemes(
      themes.map((t) =>
        t.id === id ? { ...t, name: editedTheme.name, description: editedTheme.description, icon: editedTheme.icon } : t
      )
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
        THEMES MANAGEMENT
      </motion.h2>

      {/* Add Theme Section */}
      <motion.div
        className="bg-gray-900/40 border border-cyan-400/40 rounded-3xl p-6 mb-10 shadow-[0_0_25px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
          <Palette size={26} /> Add New Theme
        </h3>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Theme Name"
            className="flex-1 bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={newTheme.name}
            onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="flex-1 bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={newTheme.description}
            onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Icon Code (e.g. 🤖)"
            className="w-32 bg-gray-800/70 border border-cyan-400/40 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-400/80"
            value={newTheme.icon}
            onChange={(e) => setNewTheme({ ...newTheme, icon: e.target.value })}
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
        <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Themes List</h3>

        {themes.length === 0 ? (
          <p className="text-gray-400 text-center py-10">No themes added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-cyan-400/40 rounded-xl overflow-hidden text-left">
              <thead className="bg-cyan-500/20 text-cyan-300 uppercase text-sm">
                <tr>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Icon</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Theme Name</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30">Description</th>
                  <th className="px-4 py-3 border-b border-cyan-400/30 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {themes.map((theme) => (
                  <tr
                    key={theme.id}
                    className="hover:bg-cyan-500/10 transition-all border-b border-gray-700/50"
                  >
                    <td className="px-4 py-3 text-2xl text-center">{theme.icon}</td>
                    <td className="px-4 py-3">
                      {editingId === theme.id ? (
                        <input
                          type="text"
                          value={editedTheme.name}
                          onChange={(e) =>
                            setEditedTheme({ ...editedTheme, name: e.target.value })
                          }
                          className="bg-gray-800 border border-cyan-400/40 rounded-lg px-3 py-1 w-full focus:border-cyan-400"
                        />
                      ) : (
                        theme.name
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {editingId === theme.id ? (
                        <input
                          type="text"
                          value={editedTheme.description}
                          onChange={(e) =>
                            setEditedTheme({ ...editedTheme, description: e.target.value })
                          }
                          className="bg-gray-800 border border-cyan-400/40 rounded-lg px-3 py-1 w-full focus:border-cyan-400"
                        />
                      ) : (
                        theme.description
                      )}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      {editingId === theme.id ? (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSave(theme.id)}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Save size={20} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(theme)}
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <Pencil size={20} />
                        </motion.button>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(theme.id)}
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
