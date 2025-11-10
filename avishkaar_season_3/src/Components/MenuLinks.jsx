// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function MenuLinks({ menuItems, onLinkClick }) {
//   return (
//     <div className="flex  flex-col gap-6 px-10">
//       {menuItems.map((item, index) => (
//         <Link
//           key={index}
//           to={item.href}
//           onClick={() => {
//             if (typeof onLinkClick === "function") onLinkClick();
//           }}
//           className="group flex items-center gap-1 md:gap-3 cursor-pointer"
//         >
//           {/* Arrow */}
//           <ArrowRight
//             className="
//               size-2 md:size-5 glitch-text  glitch-hover-text
//               -translate-x-full opacity-0 orbitron
//               transition-all duration-1000 ease-in-out
//               group-hover:translate-x-0 group-hover:opacity-100
//               group-hover:text-cyan-400 dark:group-hover:text-purple-600
//               md:size-8 
//             "
//           />

//           {/* Text with glitch on hover */}
//           <h1
//             className="
//               glitch-text glitch-hover-text orbitron
//               -translate-x-4 transition-all duration-1000 ease-out
//               group-hover:translate-x-0
//               group-hover:text-cyan-400 dark:group-hover:text-purple-600
//               md:text-9xl text-lg
//             "
//             data-text={item.label}
//           >
//             {item.label}
//           </h1>
//         </Link>
//       ))}
//     </div>
//   );
// }
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function MenuLinks({ menuItems, onLinkClick }) {
  return (
    <div className="flex flex-col gap-2 md:gap-4 px-4 sm:px-6 md:px-10">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.href}
          onClick={() => {
            if (typeof onLinkClick === "function") onLinkClick();
          }}
          className="
            group flex items-center gap-2 md:gap-4 cursor-pointer
            transition-all duration-500
          "
        >
          {/* Arrow Icon */}
          <ArrowRight
            className="
              size-3 sm:size-4 md:size-6 lg:size-8
              glitch-text glitch-hover-text orbitron
              -translate-x-full opacity-0
              transition-all duration-700 ease-in-out
              group-hover:translate-x-0 group-hover:opacity-100
              group-hover:text-cyan-400 dark:group-hover:text-purple-600
            "
          />

          {/* Text with glitch on hover */}
          <h1
            className="
              glitch-text glitch-hover-text orbitron font-bold
              -translate-x-2 sm:-translate-x-3 md:-translate-x-4
              transition-all duration-700 ease-out
              group-hover:translate-x-0
              group-hover:text-cyan-400 dark:group-hover:text-purple-600
              text-base sm:text-2xl md:text-4xl lg:text-6xl xl:text-8xl 2xl:text-9xl
            "
            data-text={item.label}
          >
            {item.label}
          </h1>
        </Link>
      ))}
    </div>
  );
}
