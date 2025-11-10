"use client";
import { useAnimate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Countdown = ({ targetDate }) => {
  return (
    <div className=" mt-10 p-4">
      <div className="mx-auto flex w-full max-w-5xl items-center bg-transparent text-white">
        <CountdownItem unit="Day" text="days" targetDate={targetDate} /> 
        <span className="text-4xl md:text-7xl">:</span>
        <CountdownItem unit="Hour" text="hours" targetDate={targetDate} /> 
        <span className="text-4xl md:text-7xl">:</span>
        <CountdownItem unit="Minute" text="minutes" targetDate={targetDate} /> 
        <span className="text-4xl md:text-7xl">:</span>
        <CountdownItem unit="Second" text="seconds" targetDate={targetDate} />
      </div>
    </div>
  );
};

const CountdownItem = ({ unit, text, targetDate }) => {
  const { ref, time } = useTimer(unit, targetDate);

  return (
    <div className="flex h-24 w-1/4 flex-col items-center justify-center gap-1 font-mono md:h-36 md:gap-2 ">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-2xl orbitron font-medium md:text-4xl lg:text-6xl xl:text-7xl text-amber-500"
        >
          {time}
        </span>
      </div>
      <span className="text-xs font-light text-slate-500 orbitron md:text-sm lg:text-base">
        {text}
      </span>
    </div>
  );
};

export default Countdown;

// Custom hook for countdown
const useTimer = (unit, targetDate) => {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = async () => {
    const end = new Date(targetDate);
    const now = new Date();
    const distance = +end - +now;

    let newTime = 0;

    if (distance <= 0) {
      newTime = 0;
    } else if (unit === "Day") {
      newTime = Math.floor(distance / DAY);
    } else if (unit === "Hour") {
      newTime = Math.floor((distance % DAY) / HOUR);
    } else if (unit === "Minute") {
      newTime = Math.floor((distance % HOUR) / MINUTE);
    } else {
      newTime = Math.floor((distance % MINUTE) / SECOND);
    }

    if (newTime !== timeRef.current) {
      // Exit animation
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      // Enter animation
      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
};
