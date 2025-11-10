import React, { useState } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';
// import Timeline from './Timeline';
// import EducationExperience from '../EducationExperience/EducationExperience';
// import JobExperience from '../JobExperience/JobExperience';
// import FuzzyBackground from '../FuzzyBackground/FuzzyBackground';
import GlitchText from './GlitchText';
import ThemeWithFilter from './ThemeWithFilter';
import Countdown from './CountDown';
import { Parallax } from 'react-scroll-parallax';
import OfflineHighlights from './Offline/OfflineHighlights';
import OnlineHighlights from './Online/OnlineHighlights';
const Tracks = () => {
  const [activeTab, setActiveTab] = useState('online');


  return (
    <div className={` z-20 transition-colors bg-slate-950 duration-500`}>
      <div className="relative py-6 rounded-xl shadow-lg w-full ">
        {/* Theme Toggle */}
        {/* <FuzzyBackground/> */}

        {/* Tabs */}
        <Parallax speed={-10}
        translateY={[-10,100]}>
        <div className="relative max-w-md mx-auto flex gap-4 items-center justify-between ">
          <button
            onClick={() => setActiveTab('online')}
            className={`   p-3 text-3xl font-medium rounded transition-colors orbitron cursor-pointer duration-300 ${activeTab === 'online' ? 'text-slate-300 bg-cyan-600' : 'text-gray-700'}`}
          >
            VIRTUAL HACKATHON
          </button>
          <button
            onClick={() => setActiveTab('offline')}
            className={` p-3 text-3xl font-medium rounded transition-colors orbitron cursor-pointer duration-300 ${activeTab === 'offline' ? 'text-slate-300 bg-cyan-600' : 'text-gray-700'}`}
          >
            PHYSICAL HACKATHON
          </button>

          {/* Sliding Bar */}
          <span
            className={`absolute left-0 h-10 bg-gradient-to-b from-cyan-600  to-transparent mt-32 transition-transform duration-500 ease-in-out ${
              activeTab === 'online' ? 'ml-3 translate-x-0' : 'ml-12 translate-x-full'
            } w-1/2`}
          />
        </div>
        </Parallax>

        {/* Content */}
        <Parallax speed={10}>
        <div className="text-sm">
          {activeTab === 'online' && (
            <>
            
            <OfflineHighlights/>
            </>
          )}
          {activeTab === 'offline' && (
            <>
            <OnlineHighlights/>
            </>
          )}
        </div>
        </Parallax>
      </div>
    </div>
  );
};

export default Tracks;
