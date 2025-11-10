
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useNavigate,useOutletContext } from "react-router-dom";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import logo1 from "../../assets/aitam_white-title_logo.png";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default function TeamOverview() {
  const [team, setTeam] = useState({});
  const [members, setMembers] = useState([]);
  const [teamCount, setTeamCount] = useState(0);
  const [addingIndex, setAddingIndex] = useState(null); // track which slot is adding
  const [newMember, setNewMember] = useState({ name: "", email: "" });
  const navigate = useNavigate();
const [teamResult, setTeamResult] = useState(null);
const [abstractData, setAbstractData] = useState(null);
const [mentorRequestStatus, setMentorRequestStatus] = useState(null);
const [assignedMentor, setAssignedMentor] = useState(null);

const [showMentorModal, setShowMentorModal] = useState(false);
const [mentorRequest, setMentorRequest] = useState({
  message: "",
  preference: "",
});
const [mentorRequested, setMentorRequested] = useState(false);


// ✅ Handle Single ID Card Download
  const downloadStyledIdCard = async (member) => {
  try {
    console.log("🪪 Generating ID card for:", member.member_name);

    // Create card container
    const card = document.createElement("div");
    card.style.width = "270px";
    card.style.height = "420px";
    card.style.padding = "16px";
    card.style.borderRadius = "16px";
    card.style.background = "linear-gradient(145deg, #0f172a, #020617)";
    card.style.color = "#fff";
    card.style.fontFamily = "Orbitron, sans-serif";
    card.style.border = "1px solid rgba(34, 211, 238, 0.25)";
    card.style.display = "flex";
    card.style.flexDirection = "column";
    card.style.alignItems = "center";
    card.style.position = "fixed";
    card.style.top = "-9999px";
    card.style.overflow = "hidden";

    // Header Row
    const header = document.createElement("div");
    header.style.width = "100%";
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.marginBottom = "8px";

    const title = document.createElement("h2");
    title.textContent = "AVISHKAAR";
    title.style.fontSize = "14px";
    title.style.color = "#38bdf8";
    title.style.margin = "0";
    header.appendChild(title);

    const logo = document.createElement("img");
    logo.src = logo1;
    logo.crossOrigin = "anonymous";
    logo.style.width = "65px";
    logo.style.height = "55px";
    logo.style.objectFit = "contain";
    header.appendChild(logo);

    card.appendChild(header);

    // Divider
    const divider = document.createElement("div");
    divider.style.width = "100%";
    divider.style.height = "2px";
    divider.style.background = "linear-gradient(90deg, #22d3ee, #2563eb, #22d3ee)";
    divider.style.borderRadius = "2px";
    card.appendChild(divider);

    // Member Photo
    const photoBox = document.createElement("div");
    photoBox.style.width = "110px";
    photoBox.style.height = "130px";
    photoBox.style.marginTop = "18px";
    photoBox.style.borderRadius = "14px";
    photoBox.style.overflow = "hidden";
    photoBox.style.border = "2px solid rgba(34,211,238,0.6)";
    card.appendChild(photoBox);

    const photo = document.createElement("img");
    photo.crossOrigin = "anonymous";
    photo.src =
      member.photo
        ? member.photo.startsWith("http")
          ? member.photo
          : `http://localhost:5002${member.photo}`
        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
    photo.style.width = "100%";
    photo.style.height = "100%";
    photo.style.objectFit = "cover";
    photoBox.appendChild(photo);

    // Info Box
    const info = document.createElement("div");
    info.style.marginTop = "14px";
    info.style.textAlign = "center";
    card.appendChild(info);

    const name = document.createElement("h3");
    name.textContent = member.member_name;
    name.style.color = "#22d3ee";
    name.style.fontSize = "15px";
    info.appendChild(name);

    const role = document.createElement("p");
    role.textContent = member.role;
    role.style.fontSize = "12px";
    role.style.color = "#cbd5e1";
    info.appendChild(role);

    const teamInfo = document.createElement("p");
    teamInfo.textContent = `Team: ${team?.teamname}`;
    teamInfo.style.fontSize = "11px";
    teamInfo.style.color = "#94a3b8";
    info.appendChild(teamInfo);

    const college = document.createElement("p");
    college.textContent = team?.collegeName;
    college.style.fontSize = "10px";
    college.style.color = "#64748b";
    info.appendChild(college);

    // ✅ Generate QR code as image instead of canvas
    const qrData = JSON.stringify({
      name: member.member_name,
      email: member.email_id,
      teamId: team.teamId,
      team: team.teamname,
    });

    const qrImageData = await QRCode.toDataURL(qrData, { width: 100, margin: 1 });

    const qrImg = document.createElement("img");
    qrImg.src = qrImageData;
    qrImg.crossOrigin = "anonymous";
    qrImg.style.width = "90px";
    qrImg.style.height = "90px";
    qrImg.style.marginTop = "10px";
    card.appendChild(qrImg);

    const qrLabel = document.createElement("p");
    qrLabel.textContent = "Scan for Team Info";
    qrLabel.style.fontSize = "9px";
    qrLabel.style.color = "#38bdf8";
    qrLabel.style.opacity = "0.8";
    card.appendChild(qrLabel);

    const footer = document.createElement("p");
    footer.textContent = "Powered by Web Fusion • 2025";
    footer.style.fontSize = "9px";
    footer.style.color = "#38bdf8";
    footer.style.marginTop = "8px";
    card.appendChild(footer);

    document.body.appendChild(card);

    // ✅ Wait until all images are truly loaded and sized
    const imgs = Array.from(card.querySelectorAll("img"));
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise((resolve) => {
            const check = () => {
              if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) resolve();
              else setTimeout(check, 100);
            };
            check();
          })
      )
    );

    // ✅ Small delay to ensure DOM paints fully
    await new Promise((r) => setTimeout(r, 300));

    // ✅ Capture the card
    let canvas = await html2canvas(card, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#000",
      logging: false,
    });

    // Retry if failed
    if (canvas.width === 0 || canvas.height === 0) {
      console.warn("⚠️ html2canvas failed, retrying...");
      await new Promise((r) => setTimeout(r, 300));
      canvas = await html2canvas(card, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#000",
      });
    }

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const cardWidth = 85;
    const cardHeight = 115;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const xOffset = (pageWidth - cardWidth) / 2;
    const yOffset = (pageHeight - cardHeight) / 2;

    pdf.addImage(imgData, "PNG", xOffset, yOffset, cardWidth, cardHeight);
    pdf.save(`${member.member_name}_ID_Card.pdf`);

    document.body.removeChild(card);
  } catch (err) {
    console.error("❌ ID card generation failed:", err);
    alert("Failed to generate ID card. Check console for details.");
  }
};

useEffect(() => {
  const fetchTeamResult = async (teamId) => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`http://localhost:5002/api/abstract-results/team/${teamId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Fetched team result:", data.data);

      if (data.data) {
        setTeamResult(data.data[0]);
        console.log("Team Result:", teamResult);
      } else {
        setTeamResult(null);
      }
    } catch (err) {
      console.error("Error fetching team result:", err);
      setTeamResult(null);
    }
  };

  const fetchAbstractData = async (teamId) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`http://localhost:5002/api/abstracts/team/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log(data,"hello3")
    if (Array.isArray(data) && data.length > 0) {
      setAbstractData(data[0]);
      console.log(abstractData,"Hello2")
    } else if (data.data) {
      setAbstractData(data.data);
    } else {
      setAbstractData(null);
    }
  } catch (err) {
    console.error("Error fetching abstract data:", err);
    setAbstractData(null);
  }
  console.log(abstractData);
};

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
        setTeamCount(data.members);
        console.log("Team Data:", data);
        fetchTeamMembers(data.teamId);
        fetchTeamResult(data.teamId); // ✅ Now it's defined above
        fetchAbstractData(data.teamId);
        fetchMentorRequest(data.teamId);

      }
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  fetchTeamData();
}, []);

const fetchMentorRequest = async (teamId) => {
  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`http://localhost:5002/api/mentor-requests/team/${teamId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data.success && data.data) {
      const req = data.data[0]; // assuming one request per team
      setMentorRequestStatus(req.status);
      setAssignedMentor(req.mentor_name || null);
      setMentorRequested(true);
    } else {
      setMentorRequested(false);
      setMentorRequestStatus(null);
      setAssignedMentor(null);
    }
  } catch (err) {
    console.error("Error fetching mentor request:", err);
  }
};


useEffect(() => {
  if (teamResult) console.log("✅ Updated teamResult:", teamResult);
}, [teamResult]);


const handleMentorRequest = async () => {
  if (!mentorRequest.message.trim()) {
    alert("Please enter a message before submitting.");
    return;
  }

  try {
    const token = sessionStorage.getItem("token");
    const res = await fetch("http://localhost:5002/api/mentor-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        team_id: team.teamId,
        message: mentorRequest.message,
        status: "Pending",
      }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("✅ Mentor request submitted successfully!");
      setShowMentorModal(false);
      setMentorRequest({ message: "" });
    } else {
      alert(`❌ Failed to submit request: ${data.message}`);
    }
  } catch (err) {
    console.error("Error submitting mentor request:", err);
    alert("Error submitting mentor request. Please try again later.");
  }
};



  const fetchTeamMembers = async (teamId) => {
    try {
      const res = await fetch(`http://localhost:5002/api/team-members/team/${teamId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      console.log("Fetched members:", data);
      setMembers(data);
    } catch (err) {
      console.error("Error fetching team members:", err);
      setMembers([]);
    }
  };

  // handle adding new member
// Add Member Function
const handleAddMember = async (index) => {
  let roleToAssign =
    members.length === 0 && index === 0
      ? "Team Lead"
      : newMember.role || "Team Member";

  const { member_name, email_id, phone_number, gender } = newMember;

  if (!member_name || !email_id || !gender || !phone_number) {
    alert("Please fill all fields");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("teamId", team.teamId);
    formData.append("member_name", member_name);
    formData.append("email_id", email_id);
    formData.append("phone_number", phone_number);
    formData.append("gender", gender);
    formData.append("role", roleToAssign);
    if (newMember.photo) formData.append("photo", newMember.photo);

    const res = await fetch("http://localhost:5002/api/team-members", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to add member");

    const added = await res.json();
    setMembers((prev) => [...prev, added]);
    setAddingIndex(null);
    setNewMember({
      member_name: "",
      email_id: "",
      phone_number: "",
      gender: "",
      role: "",
      photo: null,
    });
    fetchTeamMembers(team.teamId);
  } catch (error) {
    console.error("Error adding member:", error);
  }
};




const [editingMember, setEditingMember] = useState(null);
const [editedValues, setEditedValues] = useState({ member_name: "", email_id: "", phone: "" });

const handleEditMember = (member) => {
  setEditingMember(member);
  setEditedValues({
    memberId: member.memberId || "",
    member_name: member.member_name || "",
    email_id: member.email_id || member.email || "",
    phone: member.phone_number || member.phone || "",
  });
};
const handleSaveEdit = async () => {
  try {
    const res = await fetch(
      `http://localhost:5002/api/team-members/${editingMember.memberId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          member_name: editedValues.member_name,
          email_id: editedValues.email_id,
          phone_number: editedValues.phone,
        }),
      }
    );

    if (!res.ok) throw new Error("Failed to update member");

    const updated = await res.json();
    setMembers((prev) =>
      prev.map((m) =>
        m.id === editingMember.id
          ? { ...m, member_name: editedValues.member_name, email_id: editedValues.email_id, phone_number: editedValues.phone_number }
          : m
      )
    );

    setEditingMember(null);
  } catch (err) {
    console.error("Error updating member:", err);
  }
};
  const { setActiveMenu } = useOutletContext();

  const handleSubmitClick = () => {
    setActiveMenu("Abstract");
    navigate("abstract-submission");
  };


  const isTeamIncomplete = !team.teamname || !team.email || !teamCount;
  const isExactCount = members.length === teamCount;
  const isLess = members.length < teamCount;

  return (

      <div className="relative px-1 sm:px-10 py-12 w-full min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white font-orbitron overflow-hidden">
     <motion.h2
        className="text-3xl orbitron sm:text-4xl md:text-5xl font-bold text-center mb-12 text-cyan-600"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        TEAM OVERVIEW
      </motion.h2>

      {/* Team Info Section */}

<motion.section
  className={`grid grid-cols-1 md:grid-cols-2 gap-3 relative px-6 sm:px-10 py-8 sm:py-10 overflow-hidden ${
    isTeamIncomplete ? "opacity-50 blur-sm pointer-events-none" : ""
  }`}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>

<motion.div
  className={` relative bg-gradient-to-br from-gray-950 via-black to-gray-900 border border-cyan-500/30 rounded-3xl shadow-[0_0_25px_rgba(0,255,255,0.15)] px-6 sm:px-10 py-8 sm:py-10 mb-14 overflow-hidden ${
    isTeamIncomplete ? "opacity-50 blur-sm pointer-events-none" : ""
  }`}
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  {/* Decorative Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 via-transparent to-purple-600/10 pointer-events-none"></div>

  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 relative z-10">
    <div className="flex flex-col sm:items-center gap-4">
      <h3 className="text-3xl font-bold text-cyan-400 tracking-wide orbitron">
        Team : {team.teamname || "Team Information"}
      </h3>
      <h4>
        {team.teamId && (
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 tracking-wide">
          Team-ID: {team.teamId}
        </span>
      )}
      </h4>
    </div>

    {/* QR Code Block */}
    <div className="bg-gray-800/50 border border-cyan-500/30 rounded-2xl p-3 flex flex-col items-center shadow-[0_0_20px_rgba(0,255,255,0.2)]">
      <QRCodeCanvas
        value={JSON.stringify({
          teamId: team.teamId,
          teamName: team.teamname,
          email: team.email,
        })}
        size={150}
        bgColor="transparent"
        fgColor="#00ffff"
        level="H"
      />
      <p className="text-[11px] text-gray-400 mt-1">Team QR Code</p>
    </div>
  </div>

  {/* Divider Line */}
  <div className="h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent mb-6"></div>

  {/* Info Section - Patterned Grid */}
  <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 text-sm relative z-10">
    <div className="flex flex-col bg-gray-800/40 border border-cyan-700/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all">
      <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Email</span>
      <span className="text-cyan-300 font-medium tracking-wide">{team.email || "Not available"}</span>
    </div>

    {/* <div className="flex flex-col bg-gray-800/40 border border-cyan-700/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all">
      <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Password</span>
      <span className="text-cyan-300 font-medium">*********</span>
    </div> */}

    <div className="flex flex-col bg-gray-800/40 border border-cyan-700/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all">
      <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Team Size</span>
      <span className="text-cyan-300 font-medium">{teamCount || "Not set"}</span>
    </div>

    <div className="flex flex-col bg-gray-800/40 border border-cyan-700/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all">
      <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Created At</span>
      <span className="text-cyan-300 font-medium">
        {team.created_at
          ? new Date(team.created_at).toLocaleDateString()
          : "N/A"}
      </span>
    </div>

    

    <div className="flex flex-col bg-gray-800/40 border border-cyan-700/30 rounded-xl p-4 hover:border-cyan-400/50 transition-all">
      <span className="text-gray-400 text-xs uppercase tracking-widest mb-1">Status</span>
      <span
        className={`font-semibold ${
          isTeamIncomplete ? "text-yellow-400" : "text-green-400"
        }`}
      >
        {isTeamIncomplete ? "Incomplete" : "Active"}
      </span>
    </div>
  </div>

  {/* Subtle floating glow */}
  <div className="absolute -bottom-12 left-0 w-64 h-64 bg-cyan-600/10 blur-3xl rounded-full"></div>
  <div className="absolute -top-10 right-0 w-52 h-52 bg-purple-600/10 blur-3xl rounded-full"></div>
</motion.div>

<div>
  <div className="text-center">

  {/* 1️⃣ If members incomplete */}
  {!isExactCount && (
    <p className="text-yellow-400 text-lg font-semibold">
      Please complete your team member details before submitting the abstract.
    </p>
  )}

  {/* 2️⃣ If all members added but abstract not submitted yet */}
  {isExactCount && !abstractData && (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold text-white shadow-[0_0_20px_rgba(0,255,0,0.4)]"
      onClick={handleSubmitClick}
    >
      Submit Abstract
    </motion.button>
  )}

  {/* 3️⃣ If abstract submitted but not yet evaluated */}
  {abstractData && !teamResult && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-blue-900/40 border border-blue-500/40 text-blue-300 inline-block px-8 py-5 rounded-2xl shadow-[0_0_20px_rgba(0,150,255,0.4)] mt-4"
    >
      <p className="text-lg font-semibold orbitron">
        ✅ You have already submitted your abstract.
      </p>
      <p className="text-sm text-gray-400 mt-2">
        Submitted on{" "}
        {new Date(abstractData.created_at).toLocaleString()}
      </p>
      <p className="text-xs text-gray-500 italic mt-1">
        Awaiting evaluation results...
      </p>
    </motion.div>
  )}

  {/* 4️⃣ If result available */}
  {teamResult && (
    <motion.div
      className="mb-12 mx-auto w-full text-center bg-gray-900/60 border border-cyan-500/50 rounded-3xl p-8 shadow-[0_0_25px_rgba(0,255,255,0.3)]"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl orbitron font-semibold text-cyan-400 mb-3">
        Abstract Evaluation Result
      </h3>

      <motion.div
        className={`px-8 py-5 rounded-2xl text-2xl font-bold orbitron tracking-wide inline-block shadow-lg ${
          teamResult.status === "Accepted"
            ? "bg-green-600/20 border-2 border-green-400 text-green-300 shadow-[0_0_20px_rgba(0,255,0,0.4)]"
            : teamResult.status === "Rejected"
            ? "bg-red-600/20 border-2 border-red-400 text-red-300 shadow-[0_0_20px_rgba(255,0,0,0.4)]"
            : "bg-yellow-600/20 border-2 border-yellow-400 text-yellow-300 shadow-[0_0_20px_rgba(255,255,0,0.4)]"
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      >
        {teamResult.status === "Accepted"
          ? "✅ ACCEPTED"
          : teamResult.status === "Rejected"
          ? "❌ REJECTED"
          : "⏳ ON REVIEW"}
      </motion.div>

      <p className="mt-4 text-gray-400 text-sm">
        Evaluated by{" "}
        <span className="text-cyan-400 font-semibold">
          {teamResult.evaluated_by_name || "Admin"}
        </span>{" "}
        on{" "}
        {teamResult.evaluated_at
          ? new Date(teamResult.evaluated_at).toLocaleString()
          : "N/A"}
      </p>
    </motion.div>
  )}
</div>


{/* ✅ Abstract Result & Mentor Request Section */}
<div className="">

  {/* ⏳ Waiting for results */}
  {!teamResult && (
    <motion.div
      className="bg-yellow-900/30 border border-yellow-400/40 text-yellow-300 inline-block px-8 py-5 rounded-2xl shadow-[0_0_20px_rgba(255,255,0,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-lg font-semibold orbitron">⏳ Waiting for Results...</p>
      <p className="text-sm text-gray-400 mt-1">
        Your abstract is under evaluation. Please check back soon.
      </p>
    </motion.div>
  )}

  {/* ❌ Not Cleared */}
  {teamResult && teamResult.status === "Rejected" && (
    <motion.div
      className="bg-red-900/40 w-full border border-red-400/50 text-red-300 inline-block px-8 py-5 rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.4)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-lg font-semibold orbitron">❌ Not Cleared First Round</p>
      <p className="text-sm text-gray-400 mt-1">
        Thank you for participating. Best of luck for your future endeavors!
      </p>
    </motion.div>
  )}

  {/* ✅ Accepted - Show Request Mentor */}
{/* ✅ Accepted Abstract → Mentor Request Flow */}
{teamResult && teamResult.status === "Accepted" && (
  <div className="mt-8 text-center">
    {/* 🟩 No request yet */}
    {!mentorRequested && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMentorModal(true)}
        className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold shadow-[0_0_25px_rgba(0,255,255,0.5)]"
      >
        Request Mentor
      </motion.button>
    )}

    {/* 🟨 Request Pending */}
    {mentorRequested && mentorRequestStatus === "Pending" && (
      <motion.div
        className="bg-yellow-900/40 border border-yellow-400/50 text-yellow-300 inline-block px-8 py-5 rounded-2xl shadow-[0_0_20px_rgba(255,255,0,0.4)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-lg font-semibold orbitron">
          ⏳ Mentor Request Submitted
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Your mentor request is under review.
        </p>
      </motion.div>
    )}

    {/* ❌ Request Rejected */}
    {mentorRequested && mentorRequestStatus === "Rejected" && (
      <motion.div
        className="bg-red-900/40 border border-red-400/50 text-red-300 inline-block px-8 py-5 rounded-2xl shadow-[0_0_20px_rgba(255,0,0,0.4)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-lg font-semibold orbitron">
          ❌ Mentor Request Rejected
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Please contact the event coordinator for clarification.
        </p>
      </motion.div>
    )}

    {/* ✅ Mentor Assigned */}
    {mentorRequested && mentorRequestStatus === "Approved" && assignedMentor && (
      <motion.div
        className="bg-green-900/40 border border-green-400/50 text-green-300 inline-block px-8 py-5 rounded-2xl shadow-[0_0_20px_rgba(0,255,0,0.4)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-lg font-semibold orbitron">
          🧑‍🏫 Mentor Assigned
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Your team has been assigned to mentor{" "}
          <span className="text-cyan-300 font-semibold">
            {assignedMentor}
          </span>.
        </p>
      </motion.div>
    )}
  </div>
)}

</div>
</div>

</motion.section>



      {/* Members Section */}
      <div>
        <h3 className="text-2xl orbitron font-semibold text-cyan-400 mb-6 text-center">
          Team Members
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Existing Members */}
{members.map((member, i) => (
  <motion.div
  key={i}
  id={`id-card-${i}`}
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  whileHover={{ scale: 1.03 }}
  transition={{ duration: 0.4, delay: i * 0.1 }}
  className="relative group bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-3xl overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-all duration-500"
>
  {/* Top Info Section */}
  <div className="flex items-center gap-5 p-6 relative z-20">
    {/* Profile Image */}
    <div className="relative">
      <div className="absolute inset-0 rounded-xl bg-cyan-400/30 blur-lg group-hover:blur-xl transition-all"></div>
      <img
        src={
          member.photo
            ? `http://localhost:5002${member.photo}`
            : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
        }
        alt={member.member_name}
        className="relative z-10 w-20 h-20 rounded-xl object-cover border-2 border-cyan-400 shadow-lg"
      />
    </div>

    {/* Name and Role */}
    <div className="text-left">
      <h3 className="text-2xl orbitron font-semibold text-cyan-300 tracking-wide">
        {member.member_name}
      </h3>
      <p className="text-sm text-gray-400 italic">{member.role}</p>
    </div>
  </div>

  {/* Divider Line */}
  <div className="mx-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

  {/* Details Section */}
  <div className="p-6 space-y-2 text-gray-300 text-sm relative z-20">
    <div className="flex justify-between">
      <span className="text-cyan-400">Email:</span>
      <span className="truncate max-w-[150px] md:max-w-[300px]">
        {member.email_id}
      </span>
    </div>
    <div className="flex justify-between">
      <span className="text-cyan-400">Phone:</span>
      <span>📞 {member.phone_number}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-cyan-400">Gender:</span>
      <span>{member.gender}</span>
    </div>
  </div>

  {/* QR Code + Buttons Section */}
  <div className="flex justify-around pb-6 relative z-30 pointer-events-auto">
    <div className="bg-gray-800/70 p-3 rounded-xl border border-cyan-500/30">
      <QRCodeCanvas
        value={JSON.stringify({
          name: member.member_name,
          email: member.email_id,
          phone: member.phone_number,
          teamId: team.teamId,
        })}
        size={90}
        bgColor="transparent"
        fgColor="#00ffff"
        level="H"
      />
    </div>

    <div className="space-y-3 flex flex-col justify-center">
      {/* 🧾 Edit Details */}
      <motion.button
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          handleEditMember(member);
        }}
        className="relative z-40 bg-cyan-600 text-white font-semibold px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] transition-all duration-300"
      >
        Edit Details
      </motion.button>

      {/* 🪪 Download ID */}
      <motion.button
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => {
          e.stopPropagation();
          downloadStyledIdCard(member);
        }}
        className="relative z-40 bg-green-600 text-white hover:bg-green-800 font-semibold px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(0,255,0,0.4)] hover:shadow-[0_0_25px_rgba(0,255,0,0.7)] transition-all duration-300"
      >
        Download ID Card
      </motion.button>
    </div>
  </div>

  {/* Glow Effects (below content, no blocking clicks) */}
  <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-all duration-700 pointer-events-none"></div>
  <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-all duration-700 pointer-events-none"></div>

  {/* Animated Bottom Bar */}
  <motion.div
    whileHover={{ scaleX: 1.05 }}
    transition={{ duration: 0.3 }}
    className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 animate-[pulse_3s_ease-in-out_infinite] pointer-events-none"
  ></motion.div>
</motion.div>

))}




          {/* Empty Slots */}
          {isLess &&
  Array.from({ length: teamCount - members.length }).map((_, i) => {
    const index = members.length + i;
    return (
      <div
        key={index}
        className="p-5 bg-gray-900 rounded-xl border-2 border-dashed border-cyan-700 flex flex-col items-center justify-center"
      >
        {addingIndex === index ? (
          <>
            {/* Member Name */}
            <input
              type="text"
              placeholder="Enter member full name"
              className="mb-2 px-3 py-2 rounded bg-gray-800 text-white w-full"
              value={newMember.member_name}
              onChange={(e) =>
                setNewMember({ ...newMember, member_name: e.target.value })
              }
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Enter email address"
              className="mb-2 px-3 py-2 rounded bg-gray-800 text-white w-full"
              value={newMember.email_id}
              onChange={(e) =>
                setNewMember({ ...newMember, email_id: e.target.value })
              }
            />

            {/* Phone Number */}
            <input
              type="text"
              placeholder="Phone Number"
              className="mb-2 px-3 py-2 rounded bg-gray-800 text-white w-full"
              value={newMember.phone_number}
              onChange={(e) =>
                setNewMember({ ...newMember, phone_number: e.target.value })
              }
            />

            {/* Gender */}
            <select
              className="mb-2 px-3 py-2 rounded bg-gray-800 text-white w-full"
              value={newMember.gender}
              onChange={(e) =>
                setNewMember({ ...newMember, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            {/* Role */}
            {/* <select
  className="mb-2 px-3 py-2 rounded bg-gray-800 text-white w-full"
  value={newMember.role}
  onChange={(e) =>
    setNewMember({ ...newMember, role: e.target.value })
  }
>
  <option value="">Select Role</option>
  <option value="Team Lead">Team Lead</option>
  <option value="Team Member">Team Member</option>
</select> */}

            {/* Photo Upload */}
            <input
              type="file"
              accept="image/*"
              className="mb-3 w-full text-sm text-gray-300"
              onChange={(e) =>
                setNewMember({ ...newMember, photo: e.target.files[0] })
              }
            />

            {/* Save Button */}
            <button
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md w-full"
              onClick={() => handleAddMember(index)}
            >
              Save Member
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 mt-3 px-4 py-2 rounded-md w-full"
              onClick={() => setAddingIndex(null)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h4 className="text-lg font-semibold mb-3">
  {members.length === 0 && i === 0
    ? "Add Team Lead Details"
    : "Add Member Details"}
</h4>

<button
  className="bg-cyan-500 hover:bg-cyan-600 text-black px-3 py-1 rounded-md"
  onClick={() => setAddingIndex(index)}
>
  {members.length === 0 && i === 0 ? "Add Team Lead" : "Add Member"}
</button>

          </>
        )}
      </div>
    );
  })}

        </div>

        {/* Submit Abstract */}
        {/* ✅ Abstract Submission / Status Section */}



{/* 🧩 Mentor Request Modal */}
{showMentorModal && (
  <motion.div
    className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="relative bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-400/30 rounded-3xl p-8 w-full max-w-lg text-center shadow-[0_0_30px_rgba(0,255,255,0.3)]"
      initial={{ scale: 0.8, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      {/* ✖️ Close Button */}
      <button
        onClick={() => setShowMentorModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-all"
      >
        ✖
      </button>

      {/* Heading */}
      <h3 className="text-3xl font-bold text-cyan-400 mb-5 orbitron tracking-wide">
        Request a Mentor
      </h3>

      {/* Subtext */}
      <p className="text-gray-400 text-sm mb-6">
        Explain briefly why your team needs mentorship. Be specific so the right mentor can be assigned.
      </p>

      {/* Mentor Request Message */}
      <textarea
        className="w-full bg-gray-900/80 text-white px-4 py-3 rounded-xl border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all resize-none"
        rows="5"
        placeholder="Describe your needs (e.g. technical guidance, presentation tips, etc.)..."
        value={mentorRequest.message}
        onChange={(e) =>
          setMentorRequest({ ...mentorRequest, message: e.target.value })
        }
      ></textarea>

      {/* Status Field (Optional for Admin Preview Mode) */}
      {mentorRequest.status && (
        <p className="text-sm mt-3 text-gray-400">
          Current Status:{" "}
          <span
            className={`font-semibold ${
              mentorRequest.status === "Pending"
                ? "text-yellow-400"
                : mentorRequest.status === "Approved"
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {mentorRequest.status}
          </span>
        </p>
      )}

      {/* Buttons */}
      <div className="flex justify-between gap-4 mt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl font-semibold shadow-[0_0_15px_rgba(0,255,255,0.3)]"
          onClick={handleMentorRequest}
        >
          Submit Request
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-semibold shadow-[0_0_15px_rgba(255,0,0,0.3)]"
          onClick={() => setShowMentorModal(false)}
        >
          Cancel
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
)}




        {editingMember && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-xl border border-cyan-600 w-80 text-center">
      <h3 className="text-cyan-400 text-lg font-semibold mb-4">
        Edit Contact Info
      </h3>

<input
              type="text"
              placeholder="Member Name"
              className="mb-2 px-3 py-2 rounded bg-gray-800 text-white w-full"
              value={editedValues.member_name}
              onChange={(e) =>
                setEditedValues({ ...editedValues, member_name: e.target.value })
              }
            />
      <input
        type="email"
        placeholder="Email"
        className="mb-3 w-full px-3 py-2 rounded bg-gray-800 text-white"
        value={editedValues.email_id}
        onChange={(e) =>
          setEditedValues({ ...editedValues, email_id: e.target.value })
        }
      />

        <input
        type="text"
        placeholder="Member ID"
        className="mb-3 w-full px-3 hidden py-2 rounded bg-gray-800 text-white"
        value={editedValues.memberId}
        onChange={(e) =>
          setEditedValues({ ...editedValues, memberId: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="mb-3 w-full px-3 py-2 rounded bg-gray-800 text-white"
        value={editedValues.phone}
        onChange={(e) =>
          setEditedValues({ ...editedValues, phone: e.target.value })
        }
      />

      <div className="flex justify-between mt-4">
        <button
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md"
          onClick={() => handleSaveEdit()}
        >
          Save
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md"
          onClick={() => setEditingMember(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
function InfoCard({ label, value }) {
  return (
    <div className="bg-gray-800/40  rounded-xl p-4 border border-cyan-700/40 hover:border-cyan-400 transition-all">
      <p className="text-[10px] text-gray-400">{label}</p>
      <p className="text-cyan-300 text-[13px] md:text-[18px] mt-1">{value}</p>
    </div>
  );
}