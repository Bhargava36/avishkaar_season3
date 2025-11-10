import React from "react";

const Subcards = () => {
  const cards = [
    {
      title: "Abstract",
      subtitle: (
        <>
        <ul className="pl-6 text-left text-white leading-relaxed list-disc list-outside text-sm space-y-2 marker:text-cyan-400 hover:marker:text-black bg-transparent text-xs md:text-sm font-normal mb-8">
            <li className="text-xl">Problem title & description </li>
            <li className="text-xl">Real-world pain points with validation (data if available) </li>
            <li className="text-xl">Current solutions & their limitations</li>
            <li className="text-xl">Your proposed solution and why it's better</li>
            <li className="text-xl">Technology plan and feasibility</li>
            <li className="text-xl">Diagrams/ wireframes/ flowcharts that supports your idea</li>
        </ul>
        </>
      ),
      href: "#",
      smallIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2h6a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6h4M12 10h4M12 14h4"
          />
        </svg>
      ),
      largeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-36 h-36"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 2h6a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h6z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6h4M12 10h4M12 14h4"
          />
        </svg>
      ),
      bgGradient: "from-slate-600 to-cyan-900",
    },
    {
      title: "Video",
      subtitle: (
        <>
        <ul className="pl-6 text-left text-white leading-relaxed list-disc list-outside text-sm space-y-2 hover:marker:text-black marker:text-cyan-400  text-xs md:text-sm font-normal mb-8">
        <li className="text-xl">Brief team intro</li>
            <li className="text-xl">Problem overview</li>
            <li className="text-xl">Solution in simple terms </li>
            <li className="text-xl">Unique features and intended impact </li>
        </ul>
        </>
      ),
      href: "#",
      smallIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
          />
        </svg>
      ),
      largeIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-36 h-36"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z"
          />
        </svg>
      ),
      bgGradient: "from-slate-600 to-cyan-400",
    },
  ];

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6 justify-center">
      {cards.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </div>
  );
};

const Card = ({ title, subtitle, href, smallIcon, largeIcon, bgGradient }) => {
  return (
    <a
      href={href}
      className="relative w-full p-6 rounded-lg overflow-hidden group bg-slate-950 border border-slate-800"
    >
      {/* Background gradient sliding up on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${bgGradient}/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700`}
      />

      {/* Large icon in background top-right */}
      <div className="absolute -top-12 -right-12 opacity-20 group-hover:rotate-12 transition-transform duration-300 z-0">
        {largeIcon}
      </div>

      {/* Small icon + text */}
      <div className="relative z-10 flex flex-col items-start">
        <div className="mb-3 text-white group-hover:text-white">{smallIcon}</div>
        <h3 className="text-xl orbitron font-semibold text-slate-500 group-hover:text-white">
          {title}
        </h3>
        <ul className="text-gray-500 group-hover:text-gray-200">{subtitle}</ul>
      </div>
    </a>
  );
};

export default Subcards;
