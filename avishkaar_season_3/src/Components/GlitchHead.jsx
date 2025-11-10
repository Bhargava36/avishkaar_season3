const GlitchHead = ({ text }) => {
    return (
      <div className="relative inline-block">
        {/* Base Layer */}
        <span className="text-5xl absolute left-2 top-1 font-extrabold text-white">{text}</span>
  
        {/* Cyan offset */}
        <span className="absolute top-0 left-1 text-5xl font-extrabold text-cyan-500 opacity-70">
          {text}
        </span>
  
        {/* Pink offset */}
        <span className="absolute top-1 left-0 text-5xl font-extrabold text-pink-500 opacity-70">
          {text}
        </span>
      </div>
    );
  };
  
  export default GlitchHead;
  