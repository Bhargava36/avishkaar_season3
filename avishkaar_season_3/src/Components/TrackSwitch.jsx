// import React, { useRef, useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import OfflineHighlights from "./Offline/OfflineHighlights";
// import OnlineHighlights from "./Online/OnlineHighlights";
// import { FaLaptop, FaUsers } from "react-icons/fa"; // Icons for tabs
// const TrackSwitch = () => {
//   return (
//     <div className="w-full pt-30">
//       <SlideTabs />
//     </div>
//   );
// };

// export default TrackSwitch;

// const SlideTabs = () => {
//   const [hoverPos, setHoverPos] = useState({ left: 0, width: 0, opacity: 0 });
//   const [activePos, setActivePos] = useState({ left: 0, width: 0 });
//   const [activeIndex, setActiveIndex] = useState(0);

//    const tabs = [
//     { label: "Virtual Hackathon", icon: <FaLaptop /> },
//     { label: "Physical Hackathon", icon: <FaUsers /> },
//   ];
//   const tabRefs = useRef([]);

//   // Initialize first tab as active
//   useEffect(() => {
//     if (tabRefs.current[0]) {
//       const { width } = tabRefs.current[0].getBoundingClientRect();
//       setActivePos({ left: tabRefs.current[0].offsetLeft, width });
//     }
//   }, []);

//   const handleTabClick = (index) => {
//     const tabRef = tabRefs.current[index];
//     if (!tabRef) return;
//     const { width } = tabRef.getBoundingClientRect();
//     setActivePos({ left: tabRef.offsetLeft, width });
//     setActiveIndex(index);
//   };

//   return (
//     <div>
//       <ul className="relative mx-auto  flex justify-between max-w-3xl border border-slate-800 rounded-full border-2 border-slate-800 bg-slate-900 py-6 px-3">
//         {tabs.map((tab, index) => (
//           <Tab
//             key={index}
//             ref={(el) => (tabRefs.current[index] = el)}
//             onMouseEnter={(ref) => {
//               if (!ref) return;
//               const { width } = ref.getBoundingClientRect();
//               setHoverPos({ left: ref.offsetLeft, width, opacity: 1 });
//             }}
//             onMouseLeave={() => setHoverPos((prev) => ({ ...prev, opacity: 0 }))}
//             onClick={() => handleTabClick(index)}
//             active={activeIndex === index}
//             icon={tab.icon}
//           >
//             {tab.label}
//           </Tab>
//         ))}

//         {/* Hover Cursor */}
//         <Cursor position={hoverPos} color="bg-slate-500" />

//         {/* Active Cursor */}
//         <motion.li
//           animate={{
//             left: activePos.left,
//             width: activePos.width,
//           }}
//           className="absolute z-0 h-13/16 -mt-3 rounded-full bg-slate-700"
//         />
//       </ul>

//       {/* Active Tab Content */}
//       <div className="mt-6 text-white">
//         {activeIndex === 0 && <OfflineHighlights />}
//         {activeIndex === 1 && <OnlineHighlights />}
//       </div>
//     </div>
//   );
// };

// // Forward ref for Tab
// const Tab = React.forwardRef(({ children, onMouseEnter, onMouseLeave, onClick, active,icon }, ref) => {
//   return (
//     <li
//       ref={ref}
//       onMouseEnter={() => onMouseEnter(ref.current)}
//       onMouseLeave={onMouseLeave}
//       onClick={onClick}
//       className={`relative z-10 block cursor-pointer px-3 py-1.5 flex text-xs md:text-xl items-center justify-around orbitron uppercase md:px-5 md:py-3 ${
//         active ? "text-white  font-bold" : "text-slate-500"
//       }`}
//     >
//         <span className="text-lg md:text-4xl mr-2">{icon}</span>
//       {children}
//     </li>
//   );
// });

// // Hover Cursor
// const Cursor = ({ position, color = "bg-black" }) => {
//   return (
//     <motion.li
//       animate={{
//         ...position,
//       }}
//       className={`absolute z-0 h-7 rounded-full md:h-12 ${color}`}
//     />
//   );
// };
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import OfflineHighlights from "./Offline/OfflineHighlights";
import OnlineHighlights from "./Online/OnlineHighlights";
import { FaLaptop, FaUsers } from "react-icons/fa"; // Icons for tabs

const TrackSwitch = ({ defaultTrack = "offline" }) => {
  return (
    <div className="w-full px-2 pt-30">
      <SlideTabs defaultTrack={defaultTrack} />
    </div>
  );
};

export default TrackSwitch;

const SlideTabs = ({ defaultTrack }) => {
  const [hoverPos, setHoverPos] = useState({ left: 0, width: 0, opacity: 0 });
  const [activePos, setActivePos] = useState({ left: 0, width: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    { label: "Virtual Hackathon", icon: <FaLaptop />, key: "online" },
    { label: "Physical Hackathon", icon: <FaUsers />, key: "offline" },
  ];

  const tabRefs = useRef([]);

  // Set default active tab based on prop
  useEffect(() => {
    const defaultIndex =
      tabs.findIndex((tab) => tab.key === defaultTrack.toLowerCase()) ?? 0;

    if (tabRefs.current[defaultIndex]) {
      const { width } = tabRefs.current[defaultIndex].getBoundingClientRect();
      setActivePos({
        left: tabRefs.current[defaultIndex].offsetLeft,
        width,
      });
      setActiveIndex(defaultIndex);
    }
  }, [defaultTrack]);

  const handleTabClick = (index) => {
    const tabRef = tabRefs.current[index];
    if (!tabRef) return;
    const { width } = tabRef.getBoundingClientRect();
    setActivePos({ left: tabRef.offsetLeft, width });
    setActiveIndex(index);
  };

  return (
    <div>
      <ul className="relative mx-auto flex justify-between max-w-3xl border border-slate-800 rounded-full bg-slate-900 py-6 px-3">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            onMouseEnter={(ref) => {
              if (!ref) return;
              const { width } = ref.getBoundingClientRect();
              setHoverPos({ left: ref.offsetLeft, width, opacity: 1 });
            }}
            onMouseLeave={() =>
              setHoverPos((prev) => ({ ...prev, opacity: 0 }))
            }
            onClick={() => handleTabClick(index)}
            active={activeIndex === index}
            icon={tab.icon}
          >
            {tab.label}
          </Tab>
        ))}

        {/* Hover Cursor */}
        <Cursor position={hoverPos} color="bg-slate-500" />

        {/* Active Cursor */}
        <motion.li
          animate={{
            left: activePos.left,
            width: activePos.width,
          }}
          className="absolute w-full z-0 h-13/16 -mt-3 rounded-full bg-slate-700"
        />
      </ul>

      {/* Active Tab Content */}
      <div className="mt-6 text-white">
        {tabs[activeIndex].key === "offline" && <OfflineHighlights />}
        {tabs[activeIndex].key === "online" && <OnlineHighlights />}
      </div>
    </div>
  );
};

// Forward ref for Tab
const Tab = React.forwardRef(
  ({ children, onMouseEnter, onMouseLeave, onClick, active, icon }, ref) => {
    return (
      <li
        ref={ref}
        onMouseEnter={() => onMouseEnter(ref.current)}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`relative z-10 block cursor-pointer px-3 py-1.5 flex text-xs md:text-xl items-center justify-around orbitron uppercase md:px-5 md:py-3 ${
          active ? "text-white font-bold" : "text-slate-500"
        }`}
      >
        <span className="text-lg md:text-4xl mr-2">{icon}</span>
        {children}
      </li>
    );
  }
);

// Hover Cursor
const Cursor = ({ position, color = "bg-black" }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className={`absolute z-0 h-7 rounded-full md:h-12 ${color}`}
    />
  );
};



