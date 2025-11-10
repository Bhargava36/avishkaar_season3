import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TeamDetailsModal({ onClose, onSave }) {
  const [teamData, setTeamData] = useState({
    teamname: "",
    email: "",
    members: "",
  });

  const handleChange = (e) => {
    setTeamData({ ...teamData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(teamData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 border border-cyan-500/50 rounded-2xl p-8 w-[90%] max-w-md"
      >
        <h2 className="text-cyan-400 text-2xl font-semibold mb-6 text-center">
          Fill Team Details
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="teamname"
            placeholder="Team Name"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-cyan-600/40 focus:border-cyan-400 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Team Email"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-cyan-600/40 focus:border-cyan-400 text-white"
          />
          <input
            type="number"
            name="members"
            placeholder="Team Size"
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-800 border border-cyan-600/40 focus:border-cyan-400 text-white"
          />

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-600"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
