// import React, { useState } from "react";
// import { FaSignOutAlt } from "react-icons/fa";
// import { RiAdminFill } from "react-icons/ri";
// import { AiOutlineMenuUnfold } from "react-icons/ai";
// import { MdOutlineClose } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import { BsFillPassportFill } from "react-icons/bs";
// import { RiContactsBookFill } from "react-icons/ri";
// import { IoFileTrayFull } from "react-icons/io5";
// import { GrServices } from "react-icons/gr";
// import { Outlet } from "react-router-dom";
// import { useEffect } from "react";
// import { jwtDecode } from "jwt-decode";
// import { LuLayoutDashboard } from "react-icons/lu";
// // import TeamOverview from "./TeamOverview";



// const AdminDashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("Overview");
//   const navigate = useNavigate();

//   // ✅ Added `path` for each menu item
//   const menuItems = [
//     { name: "Overview", icon: <LuLayoutDashboard />      , path: "" },
//     { name: "Important Dates", icon: <IoFileTrayFull />, path: "important-dates" },
//     { name: "Themes", icon: <GrServices />, path: "themes" },
//     { name: "Team", icon: <RiContactsBookFill />, path: "team" },
//     { name: "Registered Teams", icon: <RiContactsBookFill />, path: "registered-teams" },

//   ];

//   useEffect(() => {
//       const token = sessionStorage.getItem("token");
//       if (token) {
//         try {
//           const decoded = jwtDecode(token);
//         } catch {
//           sessionStorage.removeItem("token");
//         }
//       }
//     }, []);
//   const logout1 = async () => {
//     sessionStorage.removeItem("token");
//     console.log("logged out");
//     navigate("/");
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-950 z-50 transition duration-700">
//       {/* Sidebar */}
//       <div
//         className={`${
//           isSidebarOpen ? "w-64" : "w-16"
//         } h-screen bg-gradient-to-br from-cyan-400/90 via-blue-900 to-blue-600/30 overflow-hidden px-2 shadow-lg flex flex-col transition-all duration-700`}
//         onMouseEnter={() => setIsSidebarOpen(true)}
//         onMouseLeave={() => setIsSidebarOpen(false)}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-center  h-20">
//           <h2 className="text-2xl flex gap-2 font-bold text-white">
//             <RiAdminFill />
//             <span
//               className={`text-xl font-bold text-white orbitron  transition-all duration-700 ${
//                 isSidebarOpen ? "block" : "hidden"
//               }`}
//             >
//               Admin Space
//             </span>
//           </h2>
//         </div>

//         {/* Sidebar Menu */}
//         <ul className="flex-1 p-1 mt-4">
//           {menuItems.map((item) => (
//             <li key={item.name} className="mb-2 rounded">
//               <Link
//                 to={item.path}
//                 onClick={() => setActiveMenu(item.name)}
//                 className={`flex items-center gap-6 px-4 py-3 border transition duration-700 cursor-pointer rounded ${
//                   activeMenu === item.name
//                     ? "bg-transparent border border-cyan-400 text-white bg-gradient-to-br from-cyan-400  to-blue-600"
//                     : "bg-transparent border-transparent text-white"
//                 }`}
//               >
//                 <span className="text-lg orbitron -ml-2">{item.icon}</span>
//                 <span
//                   className={`text-md font-medium orbitron transition-all duration-700 ${
//                     isSidebarOpen ? "block" : "hidden"
//                   }`}
//                 >
//                   {item.name}
//                 </span>
//               </Link>
//             </li>
//           ))}
//         </ul>

//         {/* Logout Button */}
//         <button
//           className="mb-6 flex justify-center items-center text-center gap-2 p-3 bg-transparent border border-red-700 text-white hover:bg-red-600 rounded transition-all duration-700"
//           onClick={logout1}
//         >
//           <FaSignOutAlt />
//           <span
//             className={`text-md font-medium orbitron transition-all duration-700 ${
//               isSidebarOpen ? "block" : "hidden"
//             }`}
//           >
//             Logout
//           </span>
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 relative">
//         {/* Toggle Button */}
//         <button
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//           className={`z-50 absolute top-2 left-4 bg-black text-2xl font-bold text-white p-2 cursor-pointer hover:bg-gradient-to-br from-cyan-400  to-blue-600 rounded transition-all duration-700 ${
//             isSidebarOpen ? "bg-cyan-400" : "bg-blue-600/50"
//           }`}
//         >
//           {isSidebarOpen ? <MdOutlineClose /> : <AiOutlineMenuUnfold />}
//         </button>

//         {/* Dynamic Content */}
//         <div className="absolute top-0 left-0 w-full h-full pt-16 px-6 overflow-y-auto">
//           {/* <h1 className="text-3xl text-center font-bold text-gray-800 orbitron dark:text-white mb-6">
//             {activeMenu}
//           </h1> */}

//           {/* ✅ React Router Outlet for nested routes */}
//           <Outlet />
//           {/* <TeamOverview/> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPassportFill } from "react-icons/bs";
import { RiContactsBookFill } from "react-icons/ri";
import { IoFileTrayFull } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Overview");
  const navigate = useNavigate();

  // ✅ Added `path` for each menu item
  const menuItems = [
    { name: "Overview", icon: <LuLayoutDashboard />      , path: "" },
    {name:"Abstracts List", icon: <BsFillPassportFill />, path: "abstracts-list"},

    {name:"Abstract Results", icon: <BsFillPassportFill />, path: "abstract-results"},
     {name:"Mentors", icon: <BsFillPassportFill />, path: "mentor-management"},
   
    { name: "Mentor Requests", icon: <IoFileTrayFull />, path: "important-dates" },
    { name: "Themes", icon: <GrServices />, path: "themes" },
    { name: "Team", icon: <RiContactsBookFill />, path: "team" },
    { name: "Registered Teams", icon: <RiContactsBookFill />, path: "registered-teams" },
    { name: "Accommodation", icon: <BsFillPassportFill />, path: "accommodation" },

  ];

  const logout1 = async () => {
    sessionStorage.removeItem("token");
    console.log("logged out");
    navigate("/");
  };
const token = sessionStorage.getItem("token");
  return (
    <div className="flex min-h-screen z-50 bg-gradient-to-br from-gray-900 via-black to-gray-950 transition duration-700">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } h-screen bg-blue-950 overflow-hidden px-2 shadow-lg flex flex-col transition-all duration-700`}
        onMouseEnter={() => setIsSidebarOpen(true)}
        onMouseLeave={() => setIsSidebarOpen(false)}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-center  h-20">
          <h2 className="text-2xl flex gap-2 font-bold text-white">
            <RiAdminFill />
            <span
              className={`text-xl font-bold text-white orbitron  transition-all duration-700 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Admin's Space
            </span>
          </h2>
        </div>

        {/* Sidebar Menu */}
        <ul className="flex-1 p-1 mt-4">
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2 rounded">
              <Link
                to={item.path}
                onClick={() => setActiveMenu(item.name)}
                className={`flex items-center gap-6 px-4 py-3 border transition duration-700 cursor-pointer rounded ${
                  activeMenu === item.name
                    ? " border border-cyan-400 text-white bg-cyan-400"
                    : "bg-transparent border-transparent text-white"
                }`}
              >
                <span className="text-lg orbitron -ml-2">{item.icon}</span>
                <span
                  className={`text-md font-medium orbitron transition-all duration-700 ${
                    isSidebarOpen ? "block" : "hidden"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          className="mb-6 flex justify-center items-center text-center gap-2 p-3 bg-transparent border border-red-700 text-white hover:bg-red-600 rounded transition-all duration-700"
          onClick={logout1}
        >
          <FaSignOutAlt />
          <span
            className={`text-md font-medium orbitron transition-all duration-700 ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Logout
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`z-50 absolute top-2 left-4 bg-black text-2xl font-bold text-white p-2 cursor-pointer hover:bg-blue-600 rounded transition-all duration-700 ${
            isSidebarOpen ? "bg-cyan-400" : "bg-blue-600/50"
          }`}
        >
          {isSidebarOpen ? <MdOutlineClose /> : <AiOutlineMenuUnfold />}
        </button>

        {/* Dynamic Content */}
        <div className="absolute top-0 bg-slate-950 px-5 left-0 w-full h-full overflow-y-auto">
          {/* <h1 className="text-3xl text-center font-bold text-gray-800 orbitron dark:text-white mb-6">
            {activeMenu}
          </h1> */}

          {/* ✅ React Router Outlet for nested routes */}
          <Outlet context={{ setActiveMenu }}/>
          {/* <TeamOverview/> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
