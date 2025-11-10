"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

function Counter({ from = 0, to, duration = 2 }) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(Math.floor(latest));
      },
    });

    return controls.stop;
  }, [count, to, duration]);

  return <motion.span>{display}</motion.span>;
}

export default function Stats() {
  return (
    <div className="flex gap-10 text-center text-white">
      <div>
        <h3 className="text-2xl font-bold text-cyan-400 orbitron">
          <Counter to={2} />
        </h3>
        <p className="text-gray-400 text-sm">Seasons</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-cyan-400 orbitron">
          <Counter to={2000} />+
        </h3>
        <p className="text-gray-400 text-sm">Participants</p>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-cyan-400 orbitron">
          <Counter to={90} />+
        </h3>
        <p className="text-gray-400 text-sm">Projects</p>
      </div>
    </div>
  );
}
