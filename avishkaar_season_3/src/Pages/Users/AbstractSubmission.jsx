
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { FileText, Video, Tag, Code, ClipboardList, User } from "lucide-react";
// import { jwtDecode } from "jwt-decode";

// const defaultTeamMembers = [
//   { id: 1, name: "Prashanth", role: "Team Lead", email: "prashanth@webfusion.com", phone: "9876543210", gender: "Male" },
//   { id: 2, name: "Kranthi", role: "Frontend Developer", email: "kranthi@webfusion.com", phone: "9876501234", gender: "Female" },
//   { id: 3, name: "Kamal", role: "Backend Developer", email: "kamal@webfusion.com", phone: "9876549876", gender: "Male" },
//   { id: 4, name: "Bestie", role: "UI/UX Designer", email: "bestie@webfusion.com", phone: "9876504321", gender: "Female" },
// ];

// export default function AbstractSubmission() {
//   const [canSubmit, setCanSubmit] = useState(false);
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [abstractText, setAbstractText] = useState("");
//   const [abstractFile, setAbstractFile] = useState(null);
//   const [videoURL, setVideoURL] = useState("https://example.com/video");
//   const [teamId, setTeamId] = useState("TEAM123");
//   const [problemStatement, setProblemStatement] = useState("");
//   const [theme, setTheme] = useState("");
//   const [technologies, setTechnologies] = useState("");
//   const [existing, setExisting] = useState("No");
//   const [team, setTeam] = useState({});
//   const [teamCount, setTeamCount] = useState(0);
//   const [filePath, setFilePath] = useState("");
//   // 🔹 Drafts
//   const [drafts, setDrafts] = useState([]);
//   const [showDraftModal, setShowDraftModal] = useState(false);

//   // ✅ Fetch team data
//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         if (!token) return;

//         const decoded = jwtDecode(token);
//         const res = await fetch(`http://localhost:5002/api/teams/${decoded.id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const data = await res.json();
//         if (data?.teamId) {
//           setTeam(data);
//           console.log("Team:", data);
//           setTeamId(data.teamId);
//           setTeamCount(data.members);
//           fetchTeamMembers(data.teamId);
//         }
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       }
//     };

//     fetchTeamData();
//   }, []);

//   // ✅ Fetch team members
//   const fetchTeamMembers = async (teamId) => {
//     try {
//       const res = await fetch(`http://localhost:5002/api/team-members/team/${teamId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch members");
//       const data = await res.json();
//       setTeamMembers(data.length === 0 ? defaultTeamMembers : data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Enable submit when members match team count
//   useEffect(() => {
//     if (teamMembers.length > 0 && teamCount > 0 && teamMembers.length === teamCount) {
//       setCanSubmit(true);
//     } else {
//       setCanSubmit(false);
//     }
//   }, [teamMembers, teamCount]);

//   // ✅ Save draft handler
// const handleSaveDraft = async () => {
//   const formData = new FormData();
//   formData.append("team_id", teamId);
//   formData.append("abstract_description", abstractText);
//   formData.append("problem_statement", problemStatement);
//   formData.append("theme", theme);
//   formData.append("technologies_used", technologies);
//   formData.append("video_url", videoURL);
//   formData.append("existing_project", existing);

//   if (abstractFile) {
//     formData.append("file", abstractFile);
//   }

//   try {
//     const res = await fetch("http://localhost:5002/api/drafts", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//       },
//       body: formData, // <-- no Content-Type, FormData sets it automatically
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Draft saved successfully!");
//       console.log("Draft created:", data);
//     } else {
//       alert(data.error || "Failed to save draft");
//     }
//   } catch (err) {
//     console.error("Error saving draft:", err);
//     alert("Error saving draft");
//   }
// };

// const handleDeleteDraft = async (draftId) => {
//   if (!window.confirm("Are you sure you want to delete this draft?")) return;

//   try {
//     const res = await fetch(`http://localhost:5002/api/drafts/${draftId}`, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Draft deleted successfully!");
//       setDrafts((prev) => prev.filter((d) => d.draft_id !== draftId));
//     } else {
//       alert(data.error || "Failed to delete draft");
//     }
//   } catch (err) {
//     console.error("Error deleting draft:", err);
//   }
// };


//   // ✅ Fetch drafts
//   const fetchDrafts = async () => {
//     try {
//       const res = await fetch(`http://localhost:5002/api/drafts/team/${teamId}`, {
//         headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
//       });
//       const data = await res.json();
//       setDrafts(data);
//       console.log("Fetched drafts:", data);
//       setShowDraftModal(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ✅ Final submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!canSubmit) return;

//     if (!abstractText || !problemStatement || !theme || !technologies || !abstractFile || !videoURL || !existing) {
//       alert("Please fill all fields before submitting!");
//       return;
//     }

//     const formData = new FormData();
//   formData.append("team_id", teamId);
//   formData.append("abstract_description", abstractText);
//   formData.append("problem_statement", problemStatement);
//   formData.append("theme", theme);
//   formData.append("technologies_used", technologies);
//   formData.append("video_url", videoURL);
//   formData.append("existing_project", existing);
//     if (abstractFile) { // <-- Add file if exists
//         formData.append("file", abstractFile);
//     }
    
//     console.log("Submitting with file:", formData);
//     try {
//       const res = await fetch("http://localhost:5002/api/abstracts", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
//         body: formData,
//       });
//       const data = await res.json();
//       if (res.ok) alert("Abstract submitted successfully!");
//       else alert(data.message || "Submission failed");
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting abstract");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white font-orbitron p-6">
      
      
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Video, Tag, Code, ClipboardList, User, CheckCircle2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import Confetti from "react-confetti";

const defaultTeamMembers = [
  { id: 1, name: "Prashanth", role: "Team Lead", email: "prashanth@webfusion.com", phone: "9876543210", gender: "Male" },
  { id: 2, name: "Kranthi", role: "Frontend Developer", email: "kranthi@webfusion.com", phone: "9876501234", gender: "Female" },
  { id: 3, name: "Kamal", role: "Backend Developer", email: "kamal@webfusion.com", phone: "9876549876", gender: "Male" },
  { id: 4, name: "Bestie", role: "UI/UX Designer", email: "bestie@webfusion.com", phone: "9876504321", gender: "Female" },
];

export default function AbstractSubmission() {
  const [canSubmit, setCanSubmit] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [abstractText, setAbstractText] = useState("");
  const [abstractFile, setAbstractFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [teamId, setTeamId] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [theme, setTheme] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [existing, setExisting] = useState("No");
  const [team, setTeam] = useState({});
  const [teamCount, setTeamCount] = useState(0);
  const [filePath, setFilePath] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // ✅ Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const decoded = jwtDecode(token);
        const res = await fetch(`http://localhost:5002/api/teams/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (data?.teamId) {
          setTeam(data);
          setTeamId(data.teamId);
          setTeamCount(data.members);
          fetchTeamMembers(data.teamId);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchTeamData();
  }, [refresh]);

  // ✅ Fetch team members
  const fetchTeamMembers = async (teamId) => {
    try {
      const res = await fetch(`http://localhost:5002/api/team-members/team/${teamId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setTeamMembers(data.length === 0 ? defaultTeamMembers : data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Enable submit when members match team count
  useEffect(() => {
    if (teamMembers.length > 0 && teamCount > 0 && teamMembers.length === teamCount) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [teamMembers, teamCount]);

  // ✅ Save draft handler
  const handleSaveDraft = async () => {
    const formData = new FormData();
    formData.append("team_id", teamId);
    formData.append("abstract_description", abstractText);
    formData.append("problem_statement", problemStatement);
    formData.append("theme", theme);
    formData.append("technologies_used", technologies);
    formData.append("video_url", videoURL);
    formData.append("existing_project", existing);

    if (abstractFile) formData.append("file", abstractFile);

    try {
      const res = await fetch("http://localhost:5002/api/drafts", {
        method: "POST",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) alert("Draft saved successfully!");
      else alert(data.error || "Failed to save draft");
    } catch (err) {
      console.error(err);
      alert("Error saving draft");
    }
  };

  // ✅ Delete draft
  const handleDeleteDraft = async (draftId) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) return;
    try {
      const res = await fetch(`http://localhost:5002/api/drafts/${draftId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      if (res.ok) {
        alert("Draft deleted successfully!");
        setDrafts((prev) => prev.filter((d) => d.draft_id !== draftId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Fetch drafts
  const fetchDrafts = async () => {
    try {
      const res = await fetch(`http://localhost:5002/api/drafts/team/${teamId}`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      });
      const data = await res.json();
      setDrafts(data);
      setShowDraftModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Final submit
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!canSubmit) return;

  if (
    !abstractText ||
    !problemStatement ||
    !theme ||
    !technologies ||
    !abstractFile ||
    !videoURL ||
    !existing
  ) {
    alert("Please fill all fields before submitting!");
    return;
  }

  const formData = new FormData();
  formData.append("team_id", teamId);
  formData.append("abstract_description", abstractText);
  formData.append("problem_statement", problemStatement);
  formData.append("theme", theme);
  formData.append("technologies_used", technologies);
  formData.append("video_url", videoURL);
  formData.append("existing_project", existing);
  if (abstractFile) formData.append("file", abstractFile);

  try {
    const res = await fetch("http://localhost:5002/api/abstracts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert("Abstract submitted successfully!");
      setShowConfetti(true); // 🎉 show confetti

      setTimeout(() => {
        
        setRefresh((prev) => !prev); // ♻️ trigger re-render
      }, 2000); // Confetti visible for 4 seconds
      setTimeout(() => setShowConfetti(false), 8000);
    } else {
      alert(data.message || "Submission failed");
    }
  } catch (err) {
    console.error(err);
    alert("Error submitting abstract");
  }
};



  // 🟢 RENDER STARTS HERE
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white font-orbitron p-6">
      {showConfetti && <Confetti recycle={false} numberOfPieces={400} gravity={0.3} />}
      {/* ✅ Check submission status */}
      {team.abstract_submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center text-center border-4 border-green-400/40 rounded-3xl p-10 bg-gray-800/40 backdrop-blur-lg shadow-[0_0_50px_rgba(0,255,0,0.3)]"
        >
          <CheckCircle2 className="text-green-400 w-20 h-20 mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 orbitron tracking-widest mb-4">ABSTRACT SUBMITTED ✅</h1>
          <p className="text-gray-300 text-lg max-w-xl">
            You have already submitted your abstract for <span className="text-cyan-400">{team.team_name}</span>.  
            Further edits are disabled to maintain submission integrity.
          </p>
          <div className="mt-6 text-sm text-gray-400">
            <p><strong>Team ID:</strong> {team.teamId}</p>
            <p><strong>Submitted On:</strong> {new Date(team.submitted_at || Date.now()).toLocaleString()}</p>
          </div>
        </motion.div>
      ) : (
        // 🔹 Display full form if not submitted
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-7xl"
        >
          

          <motion.h2
        className="text-4xl font-bold mt-20 mb-8 bg-cyan-600 orbitron text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Abstract Submission
      </motion.h2>

      {/* Team Members */}
      <div className="w-full max-w-7xl mb-6 p-4 bg-gray-900/30 rounded-3xl border border-cyan-400 shadow-[0_0_30px_rgba(0,255,255,0.2)]">
        <h3 className="text-cyan-400 font-semibold mb-4 text-lg">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {teamMembers.map((member, index) => (
              <div key={member.memberId} className="flex flex-col justify-center items-center bg-gray-800/50 border border-cyan-900 p-3 rounded-xl shadow-sm">
                <img
                  src={member.photo ? `http://localhost:5002${member.photo}` : "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                  alt={member.member_name}
                  className="w-20 h-20 rounded-full border-2 border-cyan-400 object-cover"
                />
                {/* <p className="font-semibold text-gray-200">
                {index === 0 ? "Team Lead: " : ""}
                {member.member_name || member.name}
              </p> */}
                <p className="font-semibold text-gray-400">{member.member_name}</p>
                <p className="text-gray-600 text-sm">{member.role}</p>
                <p className="text-gray-300 text-xs">{member.email_id}</p>
                <p className="text-gray-300 text-xs">{member.phone_number}</p>
                <p className="text-gray-300 text-xs">{member.gender}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-7xl bg-gray-900/30 p-8 rounded-3xl border border-cyan-400 shadow-[0_0_40px_rgba(0,255,255,0.2)] flex flex-col gap-6">
        {/* Team Info */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-800/50 border border-cyan-900 rounded-xl p-3">
            <User className="text-cyan-400" />
            <input type="text" value={teamId || "Loading..."} disabled className="w-full bg-transparent text-gray-200 outline-none" />
          </div>
          <div className="flex-1 flex items-center gap-2 bg-gray-800/50 border border-gray-600 rounded-xl p-3">
            <Video className="text-blue-400" />
            <input
              type="text"
              placeholder="https://example.com/video"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              readOnly={!canSubmit}
              className="w-full bg-transparent text-gray-200 outline-none"
            />
          </div>
        </div>

        {/* Abstract File */}
        <div className="flex items-center gap-3 bg-gray-800/50 border border-gray-600 rounded-xl p-3">
          <FileText className="text-cyan-400" />
          <label className="w-full cursor-pointer">
            <span className="text-gray-300">{abstractFile ? abstractFile.name : "Upload Abstract File (.pdf, .doc)"}</span>
            <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setAbstractFile(e.target.files[0])} className="hidden" disabled={!canSubmit} />
          </label>
        </div>

        {/* Abstract Text */}
        <div className="flex flex-col bg-gray-800/50 border border-gray-600 rounded-xl p-3">
          <label className="flex items-center gap-2 text-cyan-400 mb-2"><ClipboardList /> <span>Abstract Text</span></label>
          <textarea value={abstractText} onChange={(e) => setAbstractText(e.target.value)} disabled={!canSubmit} placeholder="Enter your abstract here..." className="w-full bg-transparent text-gray-200 resize-none outline-none h-32" />
        </div>

        {/* Problem Statement */}
        <div className="flex flex-col bg-gray-800/50 border border-gray-600 rounded-xl p-3">
          <label className="flex items-center gap-2 text-blue-400 mb-2"><Tag /> <span>Problem Statement</span></label>
          <textarea value={problemStatement} onChange={(e) => setProblemStatement(e.target.value)} disabled={!canSubmit} placeholder="Describe the problem..." className="w-full bg-transparent text-gray-200 resize-none outline-none h-24" />
        </div>

        {/* Theme & Tech */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-2 bg-gray-800/50 border border-gray-600 rounded-xl p-3">
            <Tag className="text-cyan-400" />
            <select className="rounded bg-gray-800/50 text-white w-full" value={theme} onChange={(e) => setTheme(e.target.value)} disabled={!canSubmit}>
              <option value="">Select Theme</option>
              <option value="Digital Empowerment">Digital Empowerment</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Sustainability">Sustainability</option>
              <option value="Urban Solutions">Urban Solutions</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Space Tech">Space Tech</option>
              <option value="Education">Education</option>
              <option value="Energy">Energy</option>
            </select>
          </div>

          <div className="flex-1 flex items-center gap-2 bg-gray-800/50 border border-gray-600 rounded-xl p-3">
            <Code className="text-blue-400" />
            <input type="text" placeholder="Technologies Used" value={technologies} onChange={(e) => setTechnologies(e.target.value)} disabled={!canSubmit} className="w-full bg-transparent text-gray-200 outline-none" />
          </div>
        </div>

        {/* Existing / Not Existing */}
        <div className="flex gap-6 flex-col md:flex-row items-center">
          <span className="text-cyan-400 font-semibold">Existing / Not Existing:</span>
          <label className="flex items-center gap-2">
            <input type="radio" name="existing" value="Yes" checked={existing === "Yes"} onChange={(e) => setExisting(e.target.value)} disabled={!canSubmit} className="accent-cyan-400" />
            Existing
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="existing" value="No" checked={existing === "No"} onChange={(e) => setExisting(e.target.value)} disabled={!canSubmit} className="accent-blue-600" />
            Not Existing
          </label>
        </div>

        {/* Buttons */}
        
        <div className="flex flex-column md:flex-row justify-between items-center mt-4">
          
          <motion.button type="button" className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold" onClick={handleSaveDraft}>
            Save as Draft
          </motion.button>

          <motion.button type="button" className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-semibold" onClick={fetchDrafts}>
            View Drafts
          </motion.button>
            
          <motion.button type="submit"  className={`px-6 py-2 rounded-lg font-semibold transition-all ${canSubmit ? "bg-cyan-500 text-black hover:bg-cyan-400" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`} whileHover={canSubmit ? { scale: 1.05 } : {}}>
            {canSubmit ? "Submit Abstract" : "Add Team Members First"}
              </motion.button>
            
          {/* <motion.button type="submit"  className={`px-6 py-2 rounded-lg font-semibold transition-all ${canSubmit ? "bg-cyan-500 text-black hover:bg-cyan-400" : "bg-gray-700 text-gray-400 cursor-not-allowed"}`} whileHover={canSubmit ? { scale: 1.05 } : {}}>
            {canSubmit ? "Submit Abstract" : "Add Team Members First"}
          </motion.button> */}
        </div>
      </form>

      {/* Drafts Modal */}
      {showDraftModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-cyan-400 shadow-lg">
            <h3 className="text-cyan-400 font-semibold mb-4 text-lg text-center">Saved Drafts</h3>
            {drafts.length === 0 ? (
              <p className="text-gray-400 text-center">No drafts found</p>
            ) : (
              <ul className="space-y-2">
                {drafts.map((draft, index) => (
                  <li
  key={index}
  className="bg-gray-800 hover:bg-gray-700 p-3 rounded-lg border border-cyan-700 text-gray-300 relative"
>
  <div
    onClick={() => {
      setAbstractText(draft.abstract_description || "");
      setProblemStatement(draft.problem_statement || "");
      setTheme(draft.theme || "");
      setTechnologies(draft.technologies_used || "");
      setVideoURL(draft.video_url || "");
      setExisting(draft.existing_project || "Yes");
      setFilePath(draft.file_path ? `http://localhost:5002${draft.file_path}` : "");
      setShowDraftModal(false);
    }}
    className="cursor-pointer"
  >
    <div className="font-semibold text-cyan-400">
    {draft.abstract_description
      ? draft.abstract_description.slice(0, 50)
      : draft.problem_statement.slice(0, 50)}…
  </div>
  <div className="font-semibold text-cyan-400">
    {draft.problem_statement
      ? draft.problem_statement.slice(0, 50)
      : draft.abstract_description.slice(0, 50)}…
  </div>
  {draft.video_url && (
    <div className="text-sm text-gray-400 mt-1">Video URL: {draft.video_url}</div>
  )}
  {draft.file_path && (
    <div className="text-sm text-gray-400 mt-1">File Path: {`http://localhost:5002${draft.file_path}`}</div>
  )}
  {draft.theme && (
    <div className="text-sm text-gray-400 mt-1">Theme: {draft.theme}</div>
  )}
  {draft.technologies_used && (
    <div className="text-sm text-gray-400 mt-1">Technologies Used: {draft.technologies_used}</div>
  )}
  <div className="text-xs text-gray-500 mt-2">
    Saved on: {new Date(draft.created_at).toLocaleString()}
  </div>
  </div>

  {/* Delete Button */}
  <button
    onClick={() => handleDeleteDraft(draft.draft_id)}
    className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-xs text-white px-2 py-1 rounded"
  >
    Delete
  </button>
</li>

                ))}
              </ul>
            )}
            <button className="mt-4 w-full py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-black font-semibold" onClick={() => setShowDraftModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
        </motion.div>
      )}
    </div>
  );
}
