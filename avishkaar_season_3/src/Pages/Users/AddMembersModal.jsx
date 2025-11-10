// import React, { useState } from "react";
// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// export default function AddMembersModal({ onClose, onAdded, count }) {
//   const [members, setMembers] = useState([]);
//   const [gender, setGender] = useState("");
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [step, setStep] = useState(2); // directly open member entry modal
//   const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
//   // ✅ Add or update member
//   const handleAddOrUpdateMember = () => {
//     if ( !formData.name || !formData.email || !formData.phone || !gender) {
//   alert("Please fill all fields before proceeding.");
//   return;
// }

//     const role =
//       editingIndex === null && members.length === 0 ? "Team Lead" : "Team Member";
//     const newMember = { ...formData, gender, role };
//     if (editingIndex !== null) {
//       const updated = [...members];
//       updated[editingIndex] = { ...newMember, role: updated[editingIndex].role };
//       setMembers(updated);
//       setEditingIndex(null);
//     } else {
//       const updated = [...members, newMember];
//       setMembers(updated);
//       if (updated.length == count) {
//         setTimeout(() => setStep(3), 300);
//       }
//     }

//     setFormData({ name: "", email: "", phone: "", teamId: jwtDecode(sessionStorage.getItem("token")).id , photo: null ,gender:"" });
//     setGender("");
//   };

//   // ✅ Edit a member
//   const handleEdit = (index) => {
//     setEditingIndex(index);
//     const member = members[index];
//     setFormData({
//       name: member.name,
//       email: member.email,
//       phone: member.phone,
//     });
//     setGender(member.gender);
//     setStep(2);
//   };

//   // ✅ Delete a member
//   const handleDelete = (index) => {
//     const updated = members.filter((_, i) => i !== index);
//     setMembers(updated);
//   };

//   // ✅ Submit all members
//   const handleSubmit = async () => {
//   if (members.length !== count) {
//     alert(`Please add all ${count} team members before submitting.`);
//     return;
//   }

//   try {
//     const formDataToSend = new FormData();

//     members.forEach((m, i) => {
//       formDataToSend.append(`members[${i}][teamId]`, m.teamId);
//       formDataToSend.append(`members[${i}][name]`, m.name);
//       formDataToSend.append(`members[${i}][email]`, m.email);
//       formDataToSend.append(`members[${i}][phone]`, m.phone);
//       formDataToSend.append(`members[${i}][gender]`, m.gender);
//       formDataToSend.append(`members[${i}][role]`, m.role);
//       if (m.photo) formDataToSend.append(`members[${i}][photo]`, m.photo);
//     });
//     console.log(formDataToSend);
//     const token = sessionStorage.getItem("token");
//     await fetch("http://localhost:5002/api/team-members", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`, // ✅ Keep token if backend requires
//       },
//       body: formDataToSend,
//     });

//     onAdded();
//     onClose();
//   } catch (err) {
//     console.error(err);
//   }
//   useEffect(() => {
//   const token = sessionStorage.getItem("token");
//   if (token) {
//     try {
//       var decoded = jwtDecode(token);
//       console.log(decoded);
//       console.log(decoded.id);
//     } catch {
//       sessionStorage.removeItem("token");
//     }
//   }
// }, []);
// };



//   return (
//     <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
//       <div className="bg-gray-900 border border-cyan-400/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.25)] w-[90%] max-w-xl text-white">
//         <h2 className="text-2xl font-semibold text-center mb-4 text-cyan-400">
//           {step === 2 ? "Add Team Members" : "Review Members"}
//         </h2>

//         {/* STEP 2: Add Members */}
//         {step === 2 && (
//           <div>
//             <h3 className="text-center mb-3 font-semibold text-cyan-300">
//               {editingIndex !== null
//                 ? `Editing Member ${editingIndex + 1}`
//                 : `Add Member ${members.length + 1} of ${count}`}
//             </h3>
//             <input
//               placeholder="teamId"
//               disabled
//               value={jwtDecode(sessionStorage.getItem("token")).id}
//               onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
//               className="border border-cyan-400 bg-gray-800 w-full p-2 mb-2 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//             />
//             <input
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="border border-cyan-400 bg-gray-800 w-full p-2 mb-2 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//             />
//             <input
//               placeholder="Email"
//               type="email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="border border-cyan-400 bg-gray-800 w-full p-2 mb-2 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//             />
//             <input
//               placeholder="Phone Number"
//               type="number"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="border border-cyan-400 bg-gray-800 w-full p-2 mb-3 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//             />
//             <input
//               placeholder="Photo"
//               type="file"
//               onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
//               className="border border-cyan-400 bg-gray-800 w-full p-2 mb-3 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
//             />
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="border border-cyan-400 bg-gray-800 text-white p-3 mb-3 w-full rounded-lg text-center focus:ring-2 focus:ring-cyan-400 outline-none"
//             >
//               <option value="" disabled>
//                 Select Gender
//               </option>
//               {["Male", "Female", "Other"].map((g) => (
//                 <option key={g} value={g}>
//                   {g}
//                 </option>
//               ))}
//             </select>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleAddOrUpdateMember}
//                 className="w-1/2 py-2 bg-cyan-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-all"
//               >
//                 {editingIndex !== null
//                   ? "Update Member"
//                   : members.length + 1 === count
//                   ? "Add & Review"
//                   : "Add Member"}
//               </button>
//               <button
//                 onClick={() => setStep(3)}
//                 className="w-1/2 py-2 bg-gray-700 text-cyan-300 hover:bg-gray-600 rounded-lg transition-all"
//               >
//                 View Members
//               </button>
//             </div>
//           </div>
//         )}

//         {/* STEP 3: Review Members */}
//         {step === 3 && (
//           <div>
//             <h3 className="text-center mb-3 font-semibold text-cyan-300">
//               Review Members
//             </h3>
//             {members.length === 0 ? (
//               <p className="text-center text-gray-400">No members added yet.</p>
//             ) : (
//               <ul className="bg-gray-800 p-3 rounded-lg max-h-60 overflow-y-auto border border-cyan-400/30">
//                 {members.map((m, i) => (
//                   <li key={i} className="border-b border-cyan-400/20 py-2">
//                     {m.teamId}
//                     <p className="font-semibold mb-2 text-cyan-300">
//                       {m.name}{" "}
//                       <span className="text-blue-200 text-sm"> - {m.role}</span>
//                     </p>
//                     <p className="text-sm text-gray-300">
//                       {m.email} | {m.phone} | {m.gender}
//                     </p>
//                     <div className="flex justify-end gap-3 mt-1">
//                       <button
//                         onClick={() => handleEdit(i)}
//                         className="text-sm text-cyan-400 cursor-pointer rounded px-3 hover:text-cyan-300"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(i)}
//                         className="text-sm text-red-400 cursor-pointer rounded px-3 hover:text-red-300"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             <button
//               onClick={handleSubmit}
//               className="mt-4 w-full py-2 bg-cyan-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-all"
//             >
//               Submit All Members
//             </button>

//             <button
//               onClick={() => setStep(2)}
//               className="mt-2 w-full py-2 bg-gray-700 text-cyan-300 hover:bg-gray-600 rounded-lg transition-all"
//             >
//               Back to Add Members
//             </button>
//           </div>
//         )}

//         {/* Cancel */}
//         <button
//           onClick={onClose}
//           className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-all"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function AddMembersModal({ onClose, onAdded, count }) {
  const [members, setMembers] = useState([]);
  const [gender, setGender] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [step, setStep] = useState(2);
  const [formData, setFormData] = useState({
    teamId: "",
    name: "",
    email: "",
    phone: "",
    photo: null,
  });

  // ✅ Decode token once on mount
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setFormData((prev) => ({ ...prev, teamId: decoded.id }));
      } catch {
        sessionStorage.removeItem("token");
      }
    }
  }, []);

  // ✅ Add or update member
  const handleAddOrUpdateMember = () => {
    if (!formData.name || !formData.email || !formData.phone || !gender) {
      alert("Please fill all fields before proceeding.");
      return;
    }

    const role =
      editingIndex === null && members.length === 0 ? "Team Lead" : "Team Member";
    const newMember = { ...formData, gender, role };

    if (editingIndex !== null) {
      const updated = [...members];
      updated[editingIndex] = { ...newMember, role: updated[editingIndex].role };
      setMembers(updated);
      setEditingIndex(null);
    } else {
      const updated = [...members, newMember];
      setMembers(updated);
      if (updated.length === count) setTimeout(() => setStep(3), 300);
    }

    // reset input
    setFormData((prev) => ({
  ...prev,
  name: "",
  email: "",
  phone: "",
  photo: null,
}));
setGender("");

  };

  // ✅ Edit a member
  const handleEdit = (index) => {
    const member = members[index];
    setEditingIndex(index);
    setFormData({
      ...formData,
      name: member.name,
      email: member.email,
      phone: member.phone,
      teamId: member.teamId,
      photo: null,
    });
    setGender(member.gender);
    setStep(2);
  };

  // ✅ Delete a member
  const handleDelete = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

const handleSubmit = async () => {
  if (members.length !== count) {
    alert(`Please add all ${count} team members before submitting.`);
    return;
  }

  try {
    const token = sessionStorage.getItem("token");
    console.log(members);
for (let i = 0; i < members.length; i++) {
  const member = members[i];
  const formData = new FormData();
      console.log(member);
      // Append member details
      formData.append("teamId", member.teamId);
      formData.append("member_name", member.name);
      formData.append("role", member.role);
      formData.append("phone_number", member.phone);
      formData.append("email_id", member.email);
      formData.append("gender", member.gender);
      if (member.photo) formData.append("photo", member.photo);


      // Append photo if exists
      // if (member.photo) {
      //   formData.append("photo", member.photo); // field name must match backend upload.single('photo')
      // }

      const res = await fetch("http://localhost:5002/api/team-members", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });


       const data = await res.json();
  console.log(`Member ${i + 1} response:`, data);
}

    // alert("All members added successfully!");
    // onAdded();
    // onClose();
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-md">
      <div className="bg-gray-900 border border-cyan-400/40 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,255,255,0.25)] w-[90%] max-w-xl text-white">
        <h2 className="text-2xl font-semibold text-center mb-4 text-cyan-400">
          {step === 2 ? "Add Team Members" : "Review Members"}
        </h2>

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <h3 className="text-center mb-3 font-semibold text-cyan-300">
              {editingIndex !== null
                ? `Editing Member ${editingIndex + 1}`
                : `Add Member ${members.length + 1} of ${count}`}
            </h3>

            <input
              placeholder="Team ID"
              value={formData.teamId}
              disabled
              className="border border-cyan-400 bg-gray-800 w-full p-2 mb-2 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 outline-none"
            />
            <input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-cyan-400 bg-gray-800 w-full p-2 mb-2 rounded-lg text-white"
            />
            <input
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border border-cyan-400 bg-gray-800 w-full p-2 mb-2 rounded-lg text-white"
            />
            <input
              placeholder="Phone Number"
              type="number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border border-cyan-400 bg-gray-800 w-full p-2 mb-3 rounded-lg text-white"
            />
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
              className="border border-cyan-400 bg-gray-800 w-full p-2 mb-3 rounded-lg text-white"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border border-cyan-400 bg-gray-800 text-white p-3 mb-3 w-full rounded-lg text-center"
            >
              <option value="" disabled>Select Gender</option>
              {["Male", "Female", "Other"].map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>

            <div className="flex gap-3">
              <button
                onClick={handleAddOrUpdateMember}
                className="w-1/2 py-2 bg-cyan-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-all"
              >
                {editingIndex !== null
                  ? "Update Member"
                  : members.length + 1 === count
                  ? "Add & Review"
                  : "Add Member"}
              </button>
              <button
                onClick={() => setStep(3)}
                className="w-1/2 py-2 bg-gray-700 text-cyan-300 hover:bg-gray-600 rounded-lg transition-all"
              >
                View Members
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div>
            <h3 className="text-center mb-3 font-semibold text-cyan-300">
              Review Members
            </h3>
            {members.length === 0 ? (
              <p className="text-center text-gray-400">No members added yet.</p>
            ) : (
              <ul className="bg-gray-800 p-3 rounded-lg max-h-60 overflow-y-auto border border-cyan-400/30">
                {members.map((m, i) => (
                  <li key={i} className="border-b border-cyan-400/20 py-2">
                    <p className="font-semibold mb-2 text-cyan-300">
                      {m.name}{" "}
                      <span className="text-blue-200 text-sm"> - {m.role}</span>
                    </p>
                    <p className="text-sm text-gray-300">
                      {m.email} | {m.phone} | {m.gender}
                    </p>
                    <div className="flex justify-end gap-3 mt-1">
                      <button
                        onClick={() => handleEdit(i)}
                        className="text-sm text-cyan-400 cursor-pointer hover:text-cyan-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(i)}
                        className="text-sm text-red-400 cursor-pointer hover:text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={handleSubmit}
              className="mt-4 w-full py-2 bg-cyan-500 hover:bg-blue-600 text-black font-semibold rounded-lg transition-all"
            >
              Submit All Members
            </button>

            <button
              onClick={() => setStep(2)}
              className="mt-2 w-full py-2 bg-gray-700 text-cyan-300 hover:bg-gray-600 rounded-lg transition-all"
            >
              Back to Add Members
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
