import { useState, useEffect } from "react";
// import './GlitchText.css';
import { Parallax } from 'react-scroll-parallax';
const Glitchtext2 = ({
  speed = 1,
  enableShadows = true,
  className = ''
}) => {
  const languages = [
    { text: "AVISHKAAR", lang: "EN" },
    { text: "अविष्कार", lang: "HI" },
    { text: "అవిష్కార్", lang: "TE" },
    { text: "அவிஷ்கார்", lang: "TA" },
    { text: "ಅವಿಷ್ಕಾರ್", lang: "KN" },
    { text: "അവിഷ്കാർ", lang: "ML" },
    { text: "আবিষ্কার", lang: "BN" },
    { text: "અવિષ્કાર", lang: "GU" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true); 
      setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % languages.length); 
        setIsGlitching(false);
      }, 500); 
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const inlineStyles = {
    '--after-duration': `${speed * 0.4}s`,
    '--before-duration': `${speed * 0.4}s`,
    '--after-shadow': enableShadows ? '-5px 0 red' : 'none',
    '--before-shadow': enableShadows ? '5px 0 cyan' : 'none',
  };

  return (
    
    <div className="">
      <div
        className={`anek-gujarati anek-malayalam anek-kannada  anek-tamil chathura-bold rozha-one-regular bg-transparent glitch  ${isGlitching ? 'active-glitch' : ''} ${className}`}
        style={inlineStyles}
        data-text={languages[currentIndex].text}
      >
        {languages[currentIndex].text}
      </div>
    </div>
   
  );
};

export default Glitchtext2;
