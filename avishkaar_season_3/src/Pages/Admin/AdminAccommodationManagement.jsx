// AdminAccommodationManagement.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Edit3,
  Trash2,
  Save,
  X,
  UploadCloud,
  FileText,
} from "lucide-react";

export default function AdminAccommodationManagement() {
  const [blocks, setBlocks] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [blockForm, setBlockForm] = useState({
    block_name: "",
    gender: "Male",
  });

  const [roomForm, setRoomForm] = useState({
    block_id: "",
    room_no: "",
    capacity: "",
    occupied: 0,
  });

  const [editingBlock, setEditingBlock] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);

  const [loading, setLoading] = useState(false);
  const [searchBlocks, setSearchBlocks] = useState("");
  const [searchRooms, setSearchRooms] = useState("");

  const [csvError, setCsvError] = useState("");

  // NEW STATES FOR SUMMARY
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [blockSummary, setBlockSummary] = useState(null);

  const API = "http://localhost:5002/api/AdminAccommodation";

  const authHeaders = () => {
    const token = sessionStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ---------------- FETCH BLOCKS ----------------
  const fetchBlocks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/blocks`, {
        headers: { ...authHeaders() },
      });
      const json = await res.json();
      setBlocks(json.data || []);
    } catch (err) {
      console.error("Fetch blocks error:", err);
    }
    setLoading(false);
  };

  // ---------------- FETCH ROOMS ----------------
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/rooms`, {
        headers: { ...authHeaders() },
      });
      const json = await res.json();
      setRooms(json.data || []);
    } catch (err) {
      console.error("Fetch rooms error:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlocks();
    fetchRooms();
  }, []);

  // ----------------------------------------------------------
  // LOAD BLOCK SUMMARY (NEW)
  // ----------------------------------------------------------
  const loadBlockSummary = (block) => {
    setSelectedBlock(block);

    const roomsInBlock = rooms.filter((r) => r.block_id === block.block_id);

    const totalRooms = roomsInBlock.length;
    const totalCapacity = roomsInBlock.reduce((a, b) => a + Number(b.capacity), 0);
    const totalOccupied = roomsInBlock.reduce((a, b) => a + Number(b.occupied), 0);

    setBlockSummary({
      block_id: block.block_id,
      block_name: block.block_name,
      gender: block.gender,
      totalRooms,
      totalCapacity,
      totalOccupied,
      available: totalCapacity - totalOccupied,
      rooms: roomsInBlock,
    });
  };

  // ----------------------------------------------------------
  // BLOCK CRUD
  // ----------------------------------------------------------
  const handleBlockSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlock) {
        await fetch(`${API}/blocks/${editingBlock.block_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(blockForm),
        });
      } else {
        await fetch(`${API}/blocks`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({
            block_name: blockForm.block_name,
            gender: blockForm.gender,
          }),
        });
      }

      await fetchBlocks();

      setBlockForm({ block_name: "", gender: "Male" });
      setEditingBlock(null);
    } catch (err) {
      console.error(err);
      alert("Error saving block");
    }
  };

  const handleDeleteBlock = async (block_id) => {
    if (!window.confirm("Delete block?")) return;

    try {
      await fetch(`${API}/blocks/${block_id}`, {
        method: "DELETE",
        headers: { ...authHeaders() },
      });
      fetchBlocks();
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------------------------------------
  // ROOM CRUD
  // ----------------------------------------------------------
  const handleRoomSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingRoom) {
        await fetch(`${API}/rooms/${editingRoom.room_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify(roomForm),
        });
      } else {
        await fetch(`${API}/rooms`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders() },
          body: JSON.stringify({
            block_id: roomForm.block_id,
            room_no: roomForm.room_no,
            capacity: roomForm.capacity,
            occupied: roomForm.occupied,
          }),
        });
      }

      await fetchRooms();

      setEditingRoom(null);
      setRoomForm({
        block_id: "",
        room_no: "",
        capacity: "",
        occupied: 0,
      });
    } catch (err) {
      console.error(err);
      alert("Error saving room");
    }
  };

  const handleDeleteRoom = async (room_id) => {
    if (!window.confirm("Delete room?")) return;

    try {
      await fetch(`${API}/rooms/${room_id}`, {
        method: "DELETE",
        headers: { ...authHeaders() },
      });
      fetchRooms();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- FILTERS ----------------
  const filteredBlocks = blocks.filter((b) => {
    const q = searchBlocks.toLowerCase();
    return (
      b.block_id?.toLowerCase().includes(q) ||
      b.block_name?.toLowerCase().includes(q) ||
      b.gender?.toLowerCase().includes(q)
    );
  });

  const filteredRooms = rooms.filter((r) => {
    const q = searchRooms.toLowerCase();
    return (
      r.room_id?.toLowerCase().includes(q) ||
      r.block_id?.toLowerCase().includes(q) ||
      r.room_no?.toString().toLowerCase().includes(q)
    );
  });

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white font-orbitron">
      <motion.h2
        className="text-4xl mt-8 font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 via-blue-300 to-cyan-200 bg-clip-text text-transparent"
      >
        Accommodation — Block & Room Management
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* ---------------- BLOCKS PANEL ---------------- */}
        <motion.section className="bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl text-cyan-300 flex items-center gap-2">
              <FileText size={22} /> Block Management
            </h3>
            <input
              type="text"
              placeholder="Search blocks..."
              value={searchBlocks}
              onChange={(e) => setSearchBlocks(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-800/60 border border-cyan-400/20"
            />
          </div>

          {/* Block Form */}
          <form
            onSubmit={handleBlockSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"
          >
            <input
              disabled
              value={editingBlock ? editingBlock.block_id : "Auto-generated"}
              className="px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-400/20 text-gray-400"
            />

            <input
              required
              placeholder="Block Name"
              value={blockForm.block_name}
              onChange={(e) =>
                setBlockForm({ ...blockForm, block_name: e.target.value })
              }
              className="px-3 py-2 rounded-lg bg-gray-800/70 border border-cyan-400/20"
            />

            <select
              value={blockForm.gender}
              onChange={(e) =>
                setBlockForm({ ...blockForm, gender: e.target.value })
              }
              className="px-3 py-2 rounded-lg bg-gray-800/70 border border-cyan-400/20"
            >
              <option>Male</option>
              <option>Female</option>
            </select>

            <div className="col-span-3 flex justify-end gap-3 mt-2">
              {editingBlock && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlock(null);
                    setBlockForm({ block_name: "", gender: "Male" });
                  }}
                  className="bg-red-500/30 border border-red-400/40 text-red-300 px-4 py-2 rounded-xl"
                >
                  <X size={16} /> Cancel
                </button>
              )}

              <button
                type="submit"
                className="bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 px-4 py-2 rounded-xl"
              >
                <Save size={16} /> {editingBlock ? "Save Block" : "Add Block"}
              </button>
            </div>
          </form>

          {/* Blocks List */}
          <div className="mt-4">
            {filteredBlocks.length === 0 ? (
              <p className="text-center text-gray-400">No blocks found.</p>
            ) : (
              <div className="grid gap-3">
                {filteredBlocks.map((b) => (
                  <div
                    key={b.block_id}
                    onClick={() => loadBlockSummary(b)}
                    className="cursor-pointer flex justify-between px-3 py-2 rounded-lg bg-slate-900 border border-cyan-400/10 hover:border-cyan-400/40 transition"
                  >
                    <div>
                      <span className="text-cyan-300 font-semibold">
                        {b.block_id}
                      </span>{" "}
                      {b.block_name}{" "}
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                        {b.gender}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingBlock(b);
                          setBlockForm({
                            block_name: b.block_name,
                            gender: b.gender,
                          });
                        }}
                        className="px-3 py-1 rounded-lg border border-cyan-400/20 text-cyan-300"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBlock(b.block_id);
                        }}
                        className="px-3 py-1 rounded-lg border border-red-400/20 text-red-300"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>

        {/* ---------------- ROOMS PANEL ---------------- */}
        <motion.section className="bg-gray-900/60 border border-cyan-400/30 rounded-2xl p-6">
          <div className="flex justify-between mb-4">
            <h3 className="text-2xl text-cyan-300 flex items-center gap-2">
              <FileText size={22} /> Room Management
            </h3>
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchRooms}
              onChange={(e) => setSearchRooms(e.target.value)}
              className="px-3 py-2 rounded-xl bg-gray-800/60 border border-cyan-400/20"
            />
          </div>

          {/* Room Form */}
          <form
            onSubmit={handleRoomSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4"
          >
            <input
              disabled
              value={editingRoom ? editingRoom.room_id : "Auto-generated"}
              className="px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-400/20 text-gray-400"
            />

            <select
              required
              value={roomForm.block_id}
              onChange={(e) =>
                setRoomForm({ ...roomForm, block_id: e.target.value })
              }
              className="px-3 py-2 rounded-lg bg-gray-800/70 border border-cyan-400/20"
            >
              <option value="">Select Block</option>
              {blocks.map((b) => (
                <option key={b.block_id} value={b.block_id}>
                  {b.block_id} — {b.block_name}
                </option>
              ))}
            </select>

            <input
              required
              placeholder="Room No"
              value={roomForm.room_no}
              onChange={(e) =>
                setRoomForm({ ...roomForm, room_no: e.target.value })
              }
              className="px-3 py-2 rounded-lg bg-gray-800/70 border border-cyan-400/20"
            />

            <input
              required
              type="number"
              placeholder="Capacity"
              value={roomForm.capacity}
              onChange={(e) =>
                setRoomForm({ ...roomForm, capacity: e.target.value })
              }
              className="px-3 py-2 rounded-lg bg-gray-800/70 border border-cyan-400/20"
            />

            <input
              type="number"
              min="0"
              placeholder="Occupied"
              value={roomForm.occupied}
              onChange={(e) =>
                setRoomForm({
                  ...roomForm,
                  occupied: Math.max(0, Number(e.target.value || 0)),
                })
              }
              className="px-3 py-2 rounded-lg bg-gray-800/70 border border-cyan-400/20"
            />

            <div className="col-span-3 flex justify-end gap-3 mt-2">
              {editingRoom && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingRoom(null);
                    setRoomForm({
                      block_id: "",
                      room_no: "",
                      capacity: "",
                      occupied: 0,
                    });
                  }}
                  className="bg-red-500/30 border border-red-400/40 text-red-300 px-4 py-2 rounded-xl"
                >
                  <X size={16} /> Cancel
                </button>
              )}

              <button
                type="submit"
                className="bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 px-4 py-2 rounded-xl"
              >
                <Save size={16} /> {editingRoom ? "Save Room" : "Add Room"}
              </button>
            </div>
          </form>

          {/* Rooms List */}
          <div className="mt-4">
            {filteredRooms.length === 0 ? (
              <p className="text-center text-gray-400">No rooms found.</p>
            ) : (
              <div className="grid gap-3">
                {filteredRooms.map((r) => (
                  <div
                    key={r.room_id}
                    className="flex justify-between px-3 py-2 rounded-lg bg-slate-900 border border-cyan-400/10"
                  >
                    <div>
                      <span className="text-cyan-300 font-semibold">
                        {r.room_id}
                      </span>{" "}
                      Room {r.room_no}{" "}
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                        {r.block_id}
                      </span>{" "}
                      <span className="text-xs text-gray-400">
                        cap: {r.capacity}
                      </span>{" "}
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          Number(r.occupied) > 0
                            ? "bg-red-600/20 text-red-300"
                            : "bg-green-600/10 text-green-300"
                        }`}
                      >
                        {r.occupied > 0 ? `${r.occupied} occupied` : "vacant"}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingRoom(r);
                          setRoomForm({
                            block_id: r.block_id,
                            room_no: r.room_no,
                            capacity: r.capacity,
                            occupied: r.occupied,
                          });
                        }}
                        className="px-3 py-1 rounded-lg border border-cyan-400/20 text-cyan-300"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(r.room_id)}
                        className="px-3 py-1 rounded-lg border border-red-400/20 text-red-300"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.section>
      </div>

      {/* ----------------------------------------------------------
        BLOCK SUMMARY PANEL (NEW)
      ----------------------------------------------------------- */}
      {selectedBlock && blockSummary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-gray-900/70 border border-cyan-400/30 rounded-2xl p-6 shadow-xl"
        >
          <h3 className="text-3xl font-bold text-cyan-300 mb-6">
            Block Summary — {blockSummary.block_name}
          </h3>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-gray-800/50 p-5 rounded-xl border border-cyan-400/20">
              <p className="text-sm text-gray-400">Block ID</p>
              <p className="text-xl text-white">{blockSummary.block_id}</p>
            </div>

            <div className="bg-gray-800/50 p-5 rounded-xl border border-cyan-400/20">
              <p className="text-sm text-gray-400">Total Rooms</p>
              <p className="text-xl text-white">{blockSummary.totalRooms}</p>
            </div>

            <div className="bg-gray-800/50 p-5 rounded-xl border border-cyan-400/20">
              <p className="text-sm text-gray-400">Capacity</p>
              <p className="text-xl text-white">{blockSummary.totalCapacity}</p>
            </div>

            <div className="bg-gray-800/50 p-5 rounded-xl border border-cyan-400/20">
              <p className="text-sm text-gray-400">Occupied</p>
              <p className="text-xl text-red-300">{blockSummary.totalOccupied}</p>
            </div>

            <div className="bg-gray-800/50 p-5 rounded-xl border border-cyan-400/20">
              <p className="text-sm text-gray-400">Available</p>
              <p className="text-xl text-green-300">{blockSummary.available}</p>
            </div>
          </div>

          {/* ROOMS TABLE */}
          <h3 className="text-2xl text-cyan-300 mb-4">Rooms in this Block</h3>

          {blockSummary.rooms.length === 0 ? (
            <p className="text-gray-400">This block has no rooms.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-800 text-cyan-300">
                  <tr>
                    <th className="p-3 border border-cyan-400/20">Room ID</th>
                    <th className="p-3 border border-cyan-400/20">Room No</th>
                    <th className="p-3 border border-cyan-400/20">Capacity</th>
                    <th className="p-3 border border-cyan-400/20">Occupied</th>
                  </tr>
                </thead>
                <tbody>
                  {blockSummary.rooms.map((room) => (
                    <tr key={room.room_id} className="bg-slate-900 border-b border-cyan-400/10">
                      <td className="p-3">{room.room_id}</td>
                      <td className="p-3">{room.room_no}</td>
                      <td className="p-3">{room.capacity}</td>
                      <td className="p-3">{room.occupied}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-right">
            <button
              onClick={() => setSelectedBlock(null)}
              className="px-6 py-2 bg-red-600/20 text-red-300 border border-red-400/40 rounded-xl"
            >
              Close Summary
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
