import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Video, ArrowLeft, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";
export default function AdminAbstractOverview() {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const [abstract, setAbstract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [results, setResults] = useState([]);
  const [currentResult, setCurrentResult] = useState(null);

  const API_BASE = "http://localhost:5002/api";
  const API_BASE2 = "http://localhost:5002";
  const API_BASE3 = "http://localhost:5002/api/abstract-results";
  useEffect(() => {
      const fetchResults = async () => {
        try {
          setLoading(true);
          const token = sessionStorage.getItem("token");
          const res = await fetch(API_BASE3, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setResults(data.data || []);
          console.log("Fetched Abstract Results:", data.data);
        } catch (err) {
          console.error("Error fetching abstract results:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchResults();
    }, []);
  
  useEffect(() => {
    const fetchAbstract = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };
        const res = await fetch(`${API_BASE}/abstracts/team/${teamId}`, { headers });
        const data = await res.json();
        const result = Array.isArray(data.data || data)
          ? (data.data || data)[0]
          : data.data || data;

        console.log("Fetched Abstract:", result);
        setAbstract(result);

        
        console.log("All Results:", results);
        
      } catch (err) {
        console.error("Error fetching abstract:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbstract();
  }, [teamId]);


const Evaluate = async (status) => {
  if (!abstract?.abstract_id || !abstract?.team_id) {
    alert("Missing abstract or team details.");
    return;
  }

  setUpdating(true);
  try {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);
    console.log("Decoded token for evaluation:", decoded);

    // Extract required info
    const abstract_id = abstract.abstract_id;
    const team_id = abstract.team_id;
    const evaluated_by = decoded.id; // from token payload

    console.log("Submitting Evaluation:", {
      abstract_id,
      team_id,
      evaluated_by,
      status,
    });

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // ✅ Send all required details to backend
    const res = await fetch(`${API_BASE}/abstract-results`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        abstract_id,
        team_id,
        evaluated_by,
        status,
      }),
    });

    const data = await res.json();
    console.log("Evaluation API Response:", data);

    if (res.ok) {
      setAbstract({ ...abstract, status });
      alert(`✅ Abstract successfully evaluated as "${status}"`);
    } else {
      alert("❌ Failed to submit evaluation. Please try again.");
    }
  } catch (err) {
    console.error("Evaluation failed:", err);
    alert("Error submitting evaluation. Please try again.");
  } finally {
    setUpdating(false);
  }
};
  

  const UpdatedEvaluation = async (newStatus) => {
  if (!currentResult?.result_id) {
    alert("No existing result found for this abstract.");
    return;
  }

  setUpdating(true);
  try {
    const token = sessionStorage.getItem("token");
    const decoded = jwtDecode(token);

    console.log("🔁 Updating Evaluation:", {
      result_id: currentResult.result_id,
      newStatus,
      evaluated_by: decoded.id,
    });

    const res = await fetch(
      `${API_BASE3}/${currentResult.result_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: newStatus,
          evaluated_by: decoded.id,
        }),
      }
    );

    const data = await res.json();
    console.log("Update Response:", data);

    if (res.ok) {
      alert(`✅ Evaluation updated to "${newStatus}"`);
      // 🔄 Update results list in state
      setResults((prev) =>
        prev.map((r) =>
          r.result_id === currentResult.result_id
            ? { ...r, status: newStatus, evaluated_at: new Date().toISOString() }
            : r
        )
      );
    } else {
      alert("❌ Failed to update evaluation.");
    }
  } catch (err) {
    console.error("Error updating evaluation:", err);
    alert("Error updating evaluation.");
  } finally {
    setUpdating(false);
  }
};

// Match result when abstract OR results update
useEffect(() => {
  if (abstract && results.length > 0) {
    const matched = results.find((r) => r.abstract_id === abstract.abstract_id);
    console.log("Matched Result:", matched);
    setCurrentResult(matched || null);
  }
}, [abstract, results]);

  if (loading)
    return <p className="text-center mt-20 text-gray-400 animate-pulse">Loading...</p>;
  if (!abstract)
    return <p className="text-center mt-20 text-gray-400">No abstract found.</p>;

  return (
    <div className="min-h-screen p-8 bg-slate-950 text-white font-orbitron relative overflow-hidden">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/admin")}
        className="absolute top-16 left-0 flex items-center gap-2 bg-blue-900 hover:from-cyan-500 hover:to-blue-400 px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-cyan-500/30 transition-all"
      >
        <ArrowLeft size={18} /> Back
      </motion.button>

      {/* Heading */}
      <motion.h2
        className="text-5xl font-extrabold text-center my-12 bg-cyan-600 bg-clip-text orbitron text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Abstract Details
      </motion.h2>

      {/* Content Container */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 bg-white/5 backdrop-blur-md border border-cyan-400/20 p-8 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Left Panel */}
        <motion.div
          className="bg-slate-950 rounded-3xl border border-cyan-400/20 p-8  transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-2xl  mb-4 font-bold tracking-wide">
            <strong className="text-cyan-600 orbitron">Problem Statement : </strong>{abstract?.problem_statement || "Untitled Abstract"}
          </h3>

          <div className="space-y-2 text-gray-300 font-bold text-sm">
            <p><strong className="text-cyan-600 orbitron">Theme : </strong> {abstract?.theme}</p>
            <p><strong className="text-cyan-600 orbitron">Team ID : </strong> {abstract?.team_id}</p>
            <p><strong className="text-cyan-600 orbitron">Abstract ID : </strong> {abstract?.abstract_id}</p>
            <p><strong className="text-cyan-600 orbitron">Technologies : </strong> {abstract?.technologies_used}</p>
            <p><strong className="text-cyan-600 orbitron">Existing Project : </strong> {abstract?.existing_project}</p>
            <p><strong className="text-cyan-600 orbitron">Created At : </strong> {new Date(abstract?.created_at).toLocaleString()}</p>
            <p>
              <strong className="text-cyan-600 orbitron">Status : </strong>{" "}
              <span
                className={`${
                  currentResult?.status == "Accepted"
                    ? "text-green-400"
                    : currentResult?.status === "Rejected"
                    ? "text-red-400"
                    : "text-yellow-400"
                } font-semibold`}
              >
                {currentResult?.status || "On Review"}
              </span>
            </p>
          </div>

          <motion.div
            className="mt-6 bg-slate-900 border border-cyan-400/20 rounded-2xl p-4"
            whileHover={{ scale: 1.01 }}
          >
            <h5 className="text-cyan-600 text-sm orbitron font-semibold uppercase mb-2 tracking-widest">
              Abstract Description
            </h5>
            <p className="text-gray-200 text-sm leading-relaxed max-h-48 overflow-y-auto">
              {abstract?.abstract_description || "No description available"}
            </p>
          </motion.div>
        </motion.div>

        {/* Right Panel */}
        <motion.div
          className="p-6 bg-slate-950 rounded-3xl border border-cyan-400/20 text-center  transition-all"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-xl orbitron font-semibold text-cyan-600 mb-5">
            Submitted Files
          </h3>

          {/* Video */}
          {abstract?.video_url ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowVideoModal(true)}
              className="flex items-center orbitron justify-center gap-2 bg-cyan-400  w-full py-3 rounded-xl font-semibold mb-4 shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              <Video size={30} /> Watch Video
            </motion.button>
          ) : (
            <p className="text-gray-500 orbitron italic">No video uploaded</p>
          )}

          {/* File */}
          {abstract?.file_path ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFileModal(true)}
              className="flex items-center orbitron justify-center gap-2 bg-blue-600 w-full py-3 rounded-xl font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)]"
            >
              <FileText size={30} /> View Abstract File
            </motion.button>
          ) : (
            <p className="text-gray-500 italic">No document uploaded</p>
          )}
        </motion.div>
      </motion.div>

      {/* Status Buttons */}
    {/* Status Buttons */}

{/* 🧩 Evaluation Section */}
<div className="p-6 bg-slate-950 rounded-3xl border border-cyan-400/20 text-center">
  <h3 className="text-xl font-semibold text-cyan-600 mb-5">Evaluation</h3>

  {/* ✅ Case 1: Abstract already evaluated */}
  <div className="p-6 bg-slate-950 rounded-3xl border border-cyan-400/20 text-center">
  <h3 className="text-xl font-semibold text-cyan-600 mb-5">Evaluation</h3>

  {/* Case 1: There is a result */}
  {currentResult ? (
    <>
      {/* Case 1.1: Show evaluation card */}
      {currentResult.status != null ? (
        <>
          <motion.div
            className={`px-12 py-6 rounded-2xl shadow-lg text-center border text-xl font-semibold ${
              currentResult.status === "Accepted"
                ? "bg-green-600/20 border-green-400 text-green-300"
                : currentResult.status === "Rejected"
                ? "bg-red-600/20 border-red-400 text-red-300"
                : "bg-yellow-600/20 border-yellow-400 text-yellow-300"
            }`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 12 }}
          >
            <p className="text-3xl font-bold mb-2">
              {currentResult.status === "Accepted"
                ? "✅ QUALIFIED"
                : currentResult.status === "Rejected"
                ? "❌ REJECTED"
                : "⏳ ON REVIEW"}
            </p>

            <p className="text-sm text-gray-300">
              Evaluated by:{" "}
              <span className="text-cyan-400">
                {currentResult.evaluated_by_name || "Unknown"}
              </span>
            </p>

            <p className="text-sm text-gray-400 mt-1">
              On:{" "}
              {currentResult.evaluated_at
                ? new Date(currentResult.evaluated_at).toLocaleString()
                : "Not recorded"}
            </p>
          </motion.div>

          {/* Case 1.2: Show buttons if status is empty / null / On Review */}
          {(!currentResult.status ||
            currentResult.status === "On Review" ||
            currentResult.status.trim() === "") && (
            <div className="flex justify-center gap-4 mt-6">
              {["Accepted", "Rejected", "On Review"].map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => UpdatedEvaluation(s)}
                  disabled={updating}
                  className={`px-8 py-2 rounded-xl font-semibold transition-all disabled:opacity-60 ${
                    s === "Accepted"
                      ? "bg-green-600 hover:bg-green-500"
                      : s === "Rejected"
                      ? "bg-red-600 hover:bg-red-500"
                      : "bg-yellow-500 hover:bg-yellow-400 text-black"
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          )}
        </>
      ) : (
        // If no status available
        <div className="flex justify-center gap-6">
          {["Accepted", "Rejected", "On Review"].map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => UpdatedEvaluation(status)}
              disabled={updating}
              className={`px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-60 ${
                status === "Accepted"
                  ? "bg-green-600 hover:bg-green-500"
                  : status === "Rejected"
                  ? "bg-red-600 hover:bg-red-500"
                  : "bg-yellow-500 hover:bg-yellow-400 text-black"
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>
      )}
    </>
  ) : (
    // Case 2: No result exists → first time evaluation
    <div className="flex justify-center gap-6">
      {["Accepted", "Rejected", "On Review"].map((status) => (
        <motion.button
          key={status}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => Evaluate(status)}
          disabled={updating}
          className={`px-8 py-3 rounded-xl font-semibold transition-all disabled:opacity-60 ${
            status === "Accepted"
              ? "bg-green-600 hover:bg-green-500"
              : status === "Rejected"
              ? "bg-red-600 hover:bg-red-500"
              : "bg-yellow-500 hover:bg-yellow-400 text-black"
          }`}
        >
          {status}
        </motion.button>
      ))}
    </div>
  )}
</div>

</div>


      {/* FILE MODAL */}
      <AnimatePresence>
        {showFileModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900/90 border border-cyan-400/30 rounded-3xl p-6 w-full max-w-5xl h-[80vh] flex flex-col shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              initial={{ scale: 0.8, rotateY: 10, opacity: 0 }}
              animate={{ scale: 1, rotateY: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotateY: -10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-cyan-400 font-semibold text-lg flex items-center gap-2">
                  <FileText size={18} /> Abstract Document
                </h3>
                <button
                  onClick={() => setShowFileModal(false)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={20} />
                </button>
              </div>
              <iframe
                src={
                  abstract.file_path.startsWith("http")
                    ? abstract.file_path
                    : `${API_BASE2}${abstract.file_path}`
                }
                title="Abstract Document"
                className="flex-1 rounded-xl border border-cyan-400/30"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-900/90 border border-cyan-400/30 rounded-3xl p-6 w-full max-w-4xl h-[70vh] flex flex-col shadow-[0_0_30px_rgba(0,255,255,0.4)]"
              initial={{ scale: 0.8, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-cyan-400 font-semibold text-lg flex items-center gap-2">
                  <Video size={18} /> Video Preview
                </h3>
                <button
                  onClick={() => setShowVideoModal(false)}
                  className="text-red-400 hover:text-red-300"
                >
                  <X size={20} />
                </button>
              </div>
              {abstract.video_url.includes("youtube.com") ||
              abstract.video_url.includes("youtu.be") ? (
                <iframe
                  src={abstract.video_url.replace("watch?v=", "embed/")}
                  title="Abstract Video"
                  className="flex-1 rounded-xl border border-cyan-400/30"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="flex flex-col justify-center items-center flex-1 text-center">
                  <p className="text-gray-300 mb-4">
                    External video link detected.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => window.open(abstract.video_url, "_blank")}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                  >
                    Open in New Tab
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
