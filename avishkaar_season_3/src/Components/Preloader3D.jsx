// import React, { useEffect, useRef, useState } from 'react';
// import createGlobe from 'cobe';

// const Preloader3D = ({ onComplete }) => {
//   const rootRef = useRef(null);
//   const globeCanvasRef = useRef(null);
//   const globeWrapperRef = useRef(null);
//   const globeInnerRef = useRef(null);
//   const overlayCanvasRef = useRef(null);
//   const animationRef = useRef(null);
//   const globeRef = useRef(null);

//   // Keep states for React-driven UI (glitch overlay, optional other UI updates)
//   const [glitchActive, setGlitchActive] = useState(false);
//   const [lettersRevealedState, setLettersRevealedState] = useState(false);
//   const [hasExitedState, setHasExitedState] = useState(false);

//   // Use refs for per-frame flags so the animation loop sees updates immediately
//   const lettersRevealedRef = useRef(false);
//   const hasExitedRef = useRef(false);

//   useEffect(() => {
//     const globeCanvas = globeCanvasRef.current;
//     const overlayCanvas = overlayCanvasRef.current;
//     if (!globeCanvas || !overlayCanvas) return;

//     const overlayCtx = overlayCanvas.getContext('2d');
//     const getBase = () => Math.min(window.innerWidth, window.innerHeight);

//     const resizeOverlay = () => {
//       const dpr = window.devicePixelRatio || 1;
//       overlayCanvas.width = window.innerWidth * dpr;
//       overlayCanvas.height = window.innerHeight * dpr;
//       overlayCanvas.style.width = window.innerWidth + 'px';
//       overlayCanvas.style.height = window.innerHeight + 'px';
//       // Draw coordinates will use CSS pixels now
//       overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     };
//     resizeOverlay();

//     // Init cobe globe using Auto Rotate pattern for visible map samples
//     const initGlobe = () => {
//       let phi = 0;
//       let width = globeWrapperRef.current
//         ? Math.min(globeWrapperRef.current.offsetWidth, globeWrapperRef.current.offsetHeight)
//         : getBase();

//       const globe = createGlobe(globeCanvas, {
//         devicePixelRatio: 2,
//         width: width * 2,
//         height: width * 2,
//         phi: 0,
//         theta: 0.3,
//         dark: 1,
//         diffuse: 3,
//         mapSamples: 16000,
//         mapBrightness: 1.2,
//         baseColor: [6 / 255, 182 / 255, 212 / 255],
//   markerColor: [34 / 255, 211 / 255, 238 / 255],
//   glowColor: [56 / 255, 189 / 255, 248 / 255],
//         markers: [],
//         onRender: (state) => {
//           state.phi = phi;
//           phi += 0.005;
//           // keep width/height in sync with wrapper
//           width = globeWrapperRef.current
//             ? Math.min(globeWrapperRef.current.offsetWidth, globeWrapperRef.current.offsetHeight)
//             : width;
//           state.width = width * 2;
//           state.height = width * 2;
//         },
//       });

//       // fade in canvas
//       setTimeout(() => {
//         if (globeCanvas) globeCanvas.style.opacity = '1';
//       }, 0);

//       // track resize
//       const onResize = () => {
//         if (globeWrapperRef.current) width = globeWrapperRef.current.offsetWidth;
//       };
//       window.addEventListener('resize', onResize);

//       globeRef.current = globe;
//     };
//     initGlobe();

//     // Stars
//     let stars = [];
//     const regenStars = () => {
//       stars = new Array(220).fill(0).map(() => ({
//         x: Math.random() * window.innerWidth,
//         y: Math.random() * window.innerHeight,
//         r: Math.random() * 1.5 + 0.5,
//         s: Math.random() * 0.02 + 0.005,
//         a: Math.random(),
//       }));
//     };
//     regenStars();

//     // Letters setup
//     const text = 'AVISHKAAR'.split('');
//     const centerX = () => window.innerWidth / 2;
//     const centerY = () => window.innerHeight / 2;
//     const spacingFor = () => Math.max(40, Math.min(90, getBase() * 0.08));
//     const startX = () => centerX() - (text.length * spacingFor()) / 2;
//     const directions = ['left', 'right', 'top', 'bottom', 'tl', 'tr', 'bl', 'br', 'depth'];
//     const letters = text.map((ch, i) => {
//       const dir = directions[i % directions.length];
//       const target = { x: startX() + i * spacingFor(), y: centerY() };
//       let x = target.x,
//         y = target.y,
//         z = 0;
//       if (dir === 'left') x = -200;
//       if (dir === 'right') x = window.innerWidth + 200;
//       if (dir === 'top') y = -200;
//       if (dir === 'bottom') y = window.innerHeight + 200;
//       if (dir === 'tl') {
//         x = -200;
//         y = -200;
//       }
//       if (dir === 'tr') {
//         x = window.innerWidth + 200;
//         y = -200;
//       }
//       if (dir === 'bl') {
//         x = -200;
//         y = window.innerHeight + 200;
//       }
//       if (dir === 'br') {
//         x = window.innerWidth + 200;
//         y = window.innerHeight + 200;
//       }
//       if (dir === 'depth') {
//         z = -800;
//       }
//       return { char: ch, dir, x, y, z, target, rotation: 0, scale: 1, delay: i * 90 };
//     });

//     const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
//     const project3D = (x, y, z) => {
//       const perspective = 900;
//       const s = perspective / (perspective + z);
//       return { x: x * s, y: y * s };
//     };

//     const drawLetter = (ctx, letter) => {
//       const fontSize = Math.max(48, Math.min(120, getBase() * 0.095));
//       ctx.save();
//       ctx.translate(letter.x, letter.y);
//       ctx.rotate(letter.rotation);
//       ctx.scale(letter.scale, letter.scale);
//       ctx.font = `900 ${fontSize}px 'Orbitron', monospace`;
//       ctx.textAlign = 'center';
//       ctx.textBaseline = 'middle';
//       ctx.fillStyle = '#ffffff';

//       // depth layers
//       for (let i = 4; i >= 1; i--) {
//         ctx.save();
//         ctx.translate(i * 2, i * 2);
//         ctx.globalAlpha = 0.06 * i;
//         ctx.fillStyle = '#ffffff';
//         ctx.fillText(letter.char, 0, 0);
//         ctx.restore();
//       }

//       // glow
//       ctx.save();
//       ctx.shadowColor = '#ffffff';
//       ctx.shadowBlur = 20;
//       ctx.fillStyle = '#ffffff';
//       ctx.fillText(letter.char, 0, 0);
//       ctx.restore();

//       ctx.restore();
//     };

//     // Animation
//     let start = performance.now();
//     const ZOOM_MS = 1500;
//     const animate = (now) => {
//       const elapsed = now - start;
//       overlayCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

//       // stars
//       stars.forEach((s) => {
//         s.a += s.s;
//         const twinkle = (Math.sin(s.a * Math.PI * 2) + 1) / 2;
//         overlayCtx.globalAlpha = 0.3 + twinkle * 0.7;
//         overlayCtx.fillStyle = Math.random() > 0.5 ? '#06b6d4' : '#2563eb';
//         overlayCtx.beginPath();
//         overlayCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
//         overlayCtx.fill();
//         overlayCtx.globalAlpha = 1;
//       });

//       // Globe zoom-out animation
//       const zoomT = Math.min(1, elapsed / ZOOM_MS);
//       const zoomEase = easeOutCubic(zoomT);
//       const startScale = 2.6;
//       const endScale = 1.0;
//       const scale = startScale + (endScale - startScale) * zoomEase;
//       if (globeInnerRef.current) {
//         globeInnerRef.current.style.transformOrigin = 'center center';
//         globeInnerRef.current.style.transform = `scale(${scale})`;
//         globeInnerRef.current.style.transition = 'transform 0s linear';
//         globeInnerRef.current.style.opacity = String(0.6 + 0.4 * zoomEase);
//       }

//       // letters start after zoom completes
//       const letterElapsed = Math.max(0, elapsed - ZOOM_MS);
//       const lastDelay = Math.max(...letters.map((l) => l.delay));
//       const revealAt = lastDelay / 1000 + 1.0;
//       if (!lettersRevealedRef.current && letterElapsed / 1000 >= revealAt) {
//         // flip both ref (for the animation loop) and state (for React UI)
//         lettersRevealedRef.current = true;
//         setLettersRevealedState(true);
//       }

//       letters.forEach((L, idx) => {
//         const localT = Math.max(0, letterElapsed - L.delay) / 1000;
//         const t = Math.min(1, localT);
//         const e = easeOutCubic(t);
//         const from = { x: L.x, y: L.y, z: L.z };
//         const to = { x: L.target.x, y: L.target.y, z: 0 };
//         const cx = from.x + (to.x - from.x) * e;
//         const cy = from.y + (to.y - from.y) * e;
//         const cz = from.z + (to.z - from.z) * e + Math.sin((letterElapsed + L.delay) * 0.002) * 40;
//         const rot = Math.sin((letterElapsed + L.delay) * 0.003) * 0.2;
//         const p = project3D(cx - centerX() + centerX(), cy - centerY() + centerY(), cz);
//         const letterDraw = { char: L.char, x: p.x, y: p.y, rotation: rot, scale: 1 };
//         drawLetter(overlayCtx, letterDraw);

//         // Per-letter glitch
//         if (lettersRevealedRef.current && Math.random() < 0.12) {
//           const g = (Math.sin((letterElapsed + idx * 73) * 0.02) + 1) / 2;
//           const offset = 2 + g * 4;
//           overlayCtx.save();
//           overlayCtx.translate(letterDraw.x, letterDraw.y);
//           overlayCtx.rotate(letterDraw.rotation);
//           overlayCtx.scale(letterDraw.scale, letterDraw.scale);
//           overlayCtx.font = `900 ${Math.max(48, Math.min(120, getBase() * 0.095))}px 'Orbitron', monospace`;
//           overlayCtx.textAlign = 'center';
//           overlayCtx.textBaseline = 'middle';
//           overlayCtx.fillStyle = 'rgba(6,182,212,0.6)';
//           overlayCtx.fillText(letterDraw.char, -offset, 0);
//           overlayCtx.fillStyle = 'rgba(37,99,235,0.6)';
//           overlayCtx.fillText(letterDraw.char, offset, 1);
//           for (let s = 0; s < 3; s++) {
//             const ry = Math.random() * 40 - 20;
//             overlayCtx.save();
//             overlayCtx.beginPath();
//             overlayCtx.rect(-60, ry, 120, 6);
//             overlayCtx.clip();
//             overlayCtx.fillStyle = 'rgba(6,182,212,0.25)';
//             overlayCtx.fillText(letterDraw.char, -offset, 0);
//             overlayCtx.fillStyle = 'rgba(37,99,235,0.25)';
//             overlayCtx.fillText(letterDraw.char, offset, 1);
//             overlayCtx.restore();
//           }
//           overlayCtx.restore();
//         }
//       });

//       if (lettersRevealedRef.current && Math.random() < 0.05) {
//         setGlitchActive(true);
//         setTimeout(() => setGlitchActive(false), 90);
//       }

//       // Season - 3 (use ref, not the stale closed-over state)
//       if (lettersRevealedRef.current) {
//         const afterRevealSec = letterElapsed / 1000 - (lastDelay / 1000 + 1.0);
//         const alpha = Math.max(0, Math.min(1, (afterRevealSec - 0.2) / 0.6));
//         if (alpha > 0) {
//           overlayCtx.save();
//           overlayCtx.globalAlpha = alpha;
//           overlayCtx.font = `700 ${Math.max(28, Math.min(60, getBase() * 0.05))}px 'Orbitron', monospace`;
//           overlayCtx.fillStyle = '#ffffff';
//           overlayCtx.textAlign = 'center';
//           overlayCtx.textBaseline = 'top';
//           overlayCtx.fillText(
//             'Season - 3',
//             window.innerWidth / 2,
//             window.innerHeight / 2 + Math.max(50, getBase() * 0.08)
//           );
//           overlayCtx.restore();
//         }

//         if (!hasExitedRef.current && afterRevealSec > 2.0) {
//           hasExitedRef.current = true;
//           setHasExitedState(true); // update React state as well
//           if (rootRef.current) rootRef.current.classList.add('translate-y-full');
//           setTimeout(() => {
//             if (onComplete) onComplete();
//           }, 800);
//         }
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };
//     animationRef.current = requestAnimationFrame(animate);

//     // Handle resize
//     let resizeRaf;
//     const handleResize = () => {
//       if (resizeRaf) cancelAnimationFrame(resizeRaf);
//       resizeRaf = requestAnimationFrame(() => {
//         resizeOverlay();
//         letters.forEach((L, i) => {
//           L.target.x = startX() + i * spacingFor();
//           L.target.y = centerY();
//         });
//         regenStars();
//         if (globeRef.current && globeRef.current.destroy) globeRef.current.destroy();
//         initGlobe();
//       });
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (animationRef.current) cancelAnimationFrame(animationRef.current);
//       if (globeRef.current && globeRef.current.destroy) globeRef.current.destroy();
//     };
//   }, [onComplete]);

//   return (
//     <div
//       ref={rootRef}
//       className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-all ease-out"
//     >
//       <style>
//         {`
//           @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');
//         `}
//       </style>

//       {/* Globe layer (centered) */}
//       <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
//         <div
//           ref={globeWrapperRef}
//           className="relative flex items-center justify-center w-[70vmin] h-[70vmin]"
//         >
//           <div
//             ref={globeInnerRef}
//             className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-linear"
//           >
//             <canvas
//               ref={globeCanvasRef}
//               className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Stars + letters layer */}
//       <canvas
//         ref={overlayCanvasRef}
//         className="absolute z-20 inset-0 w-full h-full bg-transparent"
//       />

//       {/* Optional glitch overlay */}
//       {glitchActive && (
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="w-full h-full opacity-10 bg-gradient-to-br from-cyan-400/0 via-cyan-400/10 to-blue-600/0 animate-pulse" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Preloader3D;
import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

const Preloader3D = ({ onComplete }) => {
  const rootRef = useRef(null);
  const globeCanvasRef = useRef(null);
  const globeWrapperRef = useRef(null);
  const globeInnerRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const globeRef = useRef(null);

  const [glitchActive, setGlitchActive] = useState(false);
  const [lettersRevealedState, setLettersRevealedState] = useState(false);
  const [hasExitedState, setHasExitedState] = useState(false);

  const lettersRevealedRef = useRef(false);
  const hasExitedRef = useRef(false);

  useEffect(() => {
    const globeCanvas = globeCanvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!globeCanvas || !overlayCanvas) return;

    const overlayCtx = overlayCanvas.getContext('2d');
    const getBase = () => Math.min(window.innerWidth, window.innerHeight);

    const resizeOverlay = () => {
      const dpr = window.devicePixelRatio || 1;
      overlayCanvas.width = window.innerWidth * dpr;
      overlayCanvas.height = window.innerHeight * dpr;
      overlayCanvas.style.width = window.innerWidth + 'px';
      overlayCanvas.style.height = window.innerHeight + 'px';
      overlayCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeOverlay();

    // Initialize globe
    const initGlobe = () => {
      let phi = 0;
      let width = globeWrapperRef.current
        ? Math.min(globeWrapperRef.current.offsetWidth, globeWrapperRef.current.offsetHeight)
        : getBase();

      const globe = createGlobe(globeCanvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 3,
        mapSamples: 16000,
        mapBrightness: 1.2,
        baseColor: [6 / 255, 182 / 255, 212 / 255],
  markerColor: [34 / 255, 211 / 255, 238 / 255],
  glowColor: [56 / 255, 189 / 255, 248 / 255],
        markers: [],
        onRender: (state) => {
          state.phi = phi;
          phi += 0.005;
          width = globeWrapperRef.current
            ? Math.min(globeWrapperRef.current.offsetWidth, globeWrapperRef.current.offsetHeight)
            : width;
          state.width = width * 2;
          state.height = width * 2;
        },
      });

      setTimeout(() => {
        if (globeCanvas) globeCanvas.style.opacity = '1';
      }, 0);

      globeRef.current = globe;
    };
    initGlobe();

    // Stars
    let stars = [];
    const regenStars = () => {
      stars = new Array(220).fill(0).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        s: Math.random() * 0.02 + 0.005,
        a: Math.random(),
      }));
    };
    regenStars();

    // Letters setup
    const text = 'AVISHKAAR'.split('');
    const centerX = () => window.innerWidth / 2;
    const centerY = () => window.innerHeight / 2;
    const spacingFor = () => Math.max(40, Math.min(90, getBase() * 0.08));
    const startX = () => centerX() - (text.length * spacingFor()) / 2;
    const directions = ['left', 'right', 'top', 'bottom', 'tl', 'tr', 'bl', 'br', 'depth'];
    const letters = text.map((ch, i) => {
      const dir = directions[i % directions.length];
      const target = { x: startX() + i * spacingFor(), y: centerY() };
      let x = target.x,
        y = target.y,
        z = 0;
      if (dir === 'left') x = -200;
      if (dir === 'right') x = window.innerWidth + 200;
      if (dir === 'top') y = -200;
      if (dir === 'bottom') y = window.innerHeight + 200;
      if (dir === 'tl') {
        x = -200;
        y = -200;
      }
      if (dir === 'tr') {
        x = window.innerWidth + 200;
        y = -200;
      }
      if (dir === 'bl') {
        x = -200;
        y = window.innerHeight + 200;
      }
      if (dir === 'br') {
        x = window.innerWidth + 200;
        y = window.innerHeight + 200;
      }
      if (dir === 'depth') {
        z = -800;
      }
      return { char: ch, dir, x, y, z, target, rotation: 0, scale: 1, delay: i * 90 };
    });

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const project3D = (x, y, z) => {
      const perspective = 900;
      const s = perspective / (perspective + z);
      return { x: x * s, y: y * s };
    };

    const drawLetter = (ctx, letter) => {
      const fontSize = Math.max(48, Math.min(120, getBase() * 0.095));
      ctx.save();
      ctx.translate(letter.x, letter.y);
      ctx.rotate(letter.rotation);
      ctx.scale(letter.scale, letter.scale);
      ctx.font = `900 ${fontSize}px 'Orbitron', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';

      // depth layers
      for (let i = 4; i >= 1; i--) {
        ctx.save();
        ctx.translate(i * 2, i * 2);
        ctx.globalAlpha = 0.06 * i;
        ctx.fillText(letter.char, 0, 0);
        ctx.restore();
      }

      // glow
      ctx.save();
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 20;
      ctx.fillText(letter.char, 0, 0);
      ctx.restore();

      ctx.restore();
    };

    // Animation
    let start = performance.now();
    const ZOOM_MS = 1500;
    const animate = (now) => {
      const elapsed = now - start;
      overlayCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // stars
      stars.forEach((s) => {
        s.a += s.s;
        const twinkle = (Math.sin(s.a * Math.PI * 2) + 1) / 2;
        overlayCtx.globalAlpha = 0.3 + twinkle * 0.7;
        overlayCtx.fillStyle = Math.random() > 0.5 ? '#06b6d4' : '#2563eb';
        overlayCtx.beginPath();
        overlayCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        overlayCtx.fill();
        overlayCtx.globalAlpha = 1;
      });

      // Globe zoom-out animation
      const zoomT = Math.min(1, elapsed / ZOOM_MS);
      const zoomEase = easeOutCubic(zoomT);
      const startScale = 2.6;
      const endScale = 1.0;
      const scale = startScale + (endScale - startScale) * zoomEase;
      if (globeInnerRef.current) {
        globeInnerRef.current.style.transformOrigin = 'center center';
        globeInnerRef.current.style.transform = `scale(${scale})`;
        globeInnerRef.current.style.transition = 'transform 0s linear';
        globeInnerRef.current.style.opacity = String(0.6 + 0.4 * zoomEase);
      }

      // letters start after zoom completes
      const letterElapsed = Math.max(0, elapsed - ZOOM_MS);
      const lastDelay = Math.max(...letters.map((l) => l.delay));
      const revealAt = lastDelay / 1000 + 1.0;
      if (!lettersRevealedRef.current && letterElapsed / 1000 >= revealAt) {
        lettersRevealedRef.current = true;
        setLettersRevealedState(true);
      }

      letters.forEach((L, idx) => {
        const localT = Math.max(0, letterElapsed - L.delay) / 1000;
        const t = Math.min(1, localT);
        const e = easeOutCubic(t);
        const from = { x: L.x, y: L.y, z: L.z };
        const to = { x: L.target.x, y: L.target.y, z: 0 };
        const cx = from.x + (to.x - from.x) * e;
        const cy = from.y + (to.y - from.y) * e;
        const cz = from.z + (to.z - from.z) * e + Math.sin((letterElapsed + L.delay) * 0.002) * 40;
        const rot = Math.sin((letterElapsed + L.delay) * 0.003) * 0.2;
        const p = project3D(cx - centerX() + centerX(), cy - centerY() + centerY(), cz);
        const letterDraw = { char: L.char, x: p.x, y: p.y, rotation: rot, scale: 1 };
        drawLetter(overlayCtx, letterDraw);

        // Per-letter glitch
        if (lettersRevealedRef.current && Math.random() < 0.12) {
          const g = (Math.sin((letterElapsed + idx * 73) * 0.02) + 1) / 2;
          const offset = 2 + g * 4;
          overlayCtx.save();
          overlayCtx.translate(letterDraw.x, letterDraw.y);
          overlayCtx.rotate(letterDraw.rotation);
          overlayCtx.scale(letterDraw.scale, letterDraw.scale);
          overlayCtx.font = `900 ${Math.max(48, Math.min(120, getBase() * 0.095))}px 'Orbitron', monospace`;
          overlayCtx.textAlign = 'center';
          overlayCtx.textBaseline = 'middle';
          overlayCtx.fillStyle = 'rgba(6,182,212,0.6)';
          overlayCtx.fillText(letterDraw.char, -offset, 0);
          overlayCtx.fillStyle = 'rgba(37,99,235,0.6)';
          overlayCtx.fillText(letterDraw.char, offset, 1);
          for (let s = 0; s < 3; s++) {
            const ry = Math.random() * 40 - 20;
            overlayCtx.save();
            overlayCtx.beginPath();
            overlayCtx.rect(-60, ry, 120, 6);
            overlayCtx.clip();
            overlayCtx.fillStyle = 'rgba(6,182,212,0.25)';
            overlayCtx.fillText(letterDraw.char, -offset, 0);
            overlayCtx.fillStyle = 'rgba(37,99,235,0.25)';
            overlayCtx.fillText(letterDraw.char, offset, 1);
            overlayCtx.restore();
          }
          overlayCtx.restore();
        }
      });

      // Optional glitch overlay
      if (lettersRevealedRef.current && Math.random() < 0.05) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 90);
      }

      // "Season - 3" and fade globe
      if (lettersRevealedRef.current) {
        const afterRevealSec = letterElapsed / 1000 - (lastDelay / 1000 + 1.0);
        const alpha = Math.max(0, Math.min(1, (afterRevealSec - 0.2) / 0.6));
        if (alpha > 0) {
          overlayCtx.save();
          overlayCtx.globalAlpha = alpha;
          overlayCtx.font = `700 ${Math.max(28, Math.min(60, getBase() * 0.05))}px 'Orbitron', monospace`;
          overlayCtx.fillStyle = '#ffffff';
          overlayCtx.textAlign = 'center';
          overlayCtx.textBaseline = 'top';
          overlayCtx.fillText(
            'Season - 3',
            window.innerWidth / 2,
            window.innerHeight / 2 + Math.max(50, getBase() * 0.08)
          );
          overlayCtx.restore();
        }

        // Gradual globe fade-out
        if (globeInnerRef.current) {
          const fadeStart = 1.5; // seconds after reveal
          const fadeDuration = 2.5; // fade duration in seconds
          const fadeProgress = Math.max(0, (afterRevealSec - fadeStart) / fadeDuration);
          const opacity = Math.max(0, 1 - fadeProgress);
          globeInnerRef.current.style.opacity = opacity.toFixed(2);
        }

        // Exit after complete
        if (!hasExitedRef.current && afterRevealSec > 4.0) {
          hasExitedRef.current = true;
          setHasExitedState(true);
          if (rootRef.current) rootRef.current.classList.add('translate-y-full', 'opacity-0');
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 800);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    // Resize handler
    let resizeRaf;
    const handleResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resizeOverlay();
        letters.forEach((L, i) => {
          L.target.x = startX() + i * spacingFor();
          L.target.y = centerY();
        });
        regenStars();
        if (globeRef.current && globeRef.current.destroy) globeRef.current.destroy();
        initGlobe();
      });
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (globeRef.current && globeRef.current.destroy) globeRef.current.destroy();
    };
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden transition-all ease-out"
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');`}
      </style>

      {/* Globe layer */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div
          ref={globeWrapperRef}
          className="relative flex items-center justify-center w-[70vmin] h-[70vmin]"
        >
          <div
            ref={globeInnerRef}
            className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-linear"
          >
            <canvas
              ref={globeCanvasRef}
              className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            />
          </div>
        </div>
      </div>

      {/* Stars + letters */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute z-20 inset-0 w-full h-full bg-transparent"
      />

      {/* Glitch overlay */}
      {glitchActive && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full opacity-10 bg-gradient-to-br from-cyan-400/0 via-cyan-400/10 to-blue-600/0 animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default Preloader3D;
