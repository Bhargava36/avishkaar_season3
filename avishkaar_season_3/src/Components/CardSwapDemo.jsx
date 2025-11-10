import React, { useState } from "react";
import CardSwap, { Card } from "./CardSwap";
import "./CardSwapDemo.css"

const CardSwapDemo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const themes = [
    {
      title: "🚀 Innovation",
      text: "Push the boundaries of creativity and technology.",
      image: "https://picsum.photos/id/1011/400/300"
    },
    {
      title: "🎨 Design",
      text: "Blend usability with modern aesthetics.",
      image: "https://picsum.photos/id/1015/400/300"
    },
    {
      title: "⚡ Performance",
      text: "Fast, scalable, and optimized experiences.",
      image: "https://picsum.photos/id/1025/400/300"
    },
    {
      title: "🤝 Teamwork",
      text: "Collaboration drives growth and success.",
      image: "https://picsum.photos/id/1005/400/300"
    },
    {
      title: "🌱 Growth",
      text: "Continuous learning and improvement.",
      image: "https://picsum.photos/id/1035/400/300"
    }
  ];

  return (
    <div className="flex flex-col md:flex-row items-center overflow-x-hidden justify-center min-h-screen z-50 gap-8 p-8">
      {/* LEFT SECTION (Dynamic Theme Info) */}
      <div className="w-full md:w-1/3 text-center md:text-left space-y-4">
        <h1 className="text-xl font-bold glitch1" data-text={themes[activeIndex].title}>
          {themes[activeIndex].title}
        </h1>
        <p className="text-lg text-gray-300">{themes[activeIndex].text}</p>
      </div>

      {/* RIGHT SECTION (Cards) */}
      <div className="w-full md:w-1/2">
        <CardSwap
          width={400}
          height={300}
          delay={4000}
          pauseOnHover
          skewAmount={5}
          onCardClick={(i) => setActiveIndex(i)}
        >
          {themes.map((theme, i) => (
            <Card
              key={i}
              customClass="overflow-hidden shadow-lg border border-purple-500 bg-black/80"
            >
              <img
                src={theme.image}
                alt={theme.title}
                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition"
              />
              <div className="absolute bottom-2 left-2 text-white font-semibold text-lg bg-black/60 px-2 py-1 rounded">
                {theme.title}
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </div>
  );
};

export default CardSwapDemo;
