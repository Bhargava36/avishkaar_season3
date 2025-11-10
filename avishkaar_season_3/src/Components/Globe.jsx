import React, { useEffect, useRef, useCallback } from "react";
import createGlobe from "cobe";
import { cn } from "../lib/utils";

// Convert hex color to normalized RGB [0–1]
const hexToRgbNormalized = (hex) => {
  let r = 0, g = 0, b = 0;
  const cleanHex = hex.startsWith("#") ? hex.slice(1) : hex;

  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6) {
    r = parseInt(cleanHex.substring(0, 2), 16);
    g = parseInt(cleanHex.substring(2, 4), 16);
    b = parseInt(cleanHex.substring(4, 6), 16);
  } else {
    console.warn(`Invalid hex color: ${hex}. Falling back to black.`);
    return [0, 0, 0];
  }

  return [r / 255, g / 255, b / 255];
};

// Debounce utility to limit resize event calls
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const Globe = ({
  className,
  theta = 0.75,
  dark = 1,
  scale = 1.1,
  diffuse = 1,
  mapSamples = 20000,
  mapBrightness = 3,
  baseColor = "#1f2937",
  markerColor = "#42daf5",
  glowColor = "#22d3ee",
  markers = [],
}) => {
  const canvasRef = useRef(null);
  const globeRef = useRef(null);
  const phiRef = useRef(0);
  const thetaRef = useRef(theta);
  const isDragging = useRef(false);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);
  const autoRotateSpeed = 0.003;

  const resolvedBaseColor =
    typeof baseColor === "string" ? hexToRgbNormalized(baseColor) : baseColor;
  const resolvedMarkerColor =
    typeof markerColor === "string" ? hexToRgbNormalized(markerColor) : markerColor;
  const resolvedGlowColor =
    typeof glowColor === "string" ? hexToRgbNormalized(glowColor) : glowColor;

  const initGlobe = useCallback(() => {
    if (globeRef.current?.destroy) {
      globeRef.current.destroy();
      globeRef.current = null;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const sizePx = Math.min(rect.width, rect.height);
    const dpr = window.devicePixelRatio || 1;

    canvas.width = sizePx * dpr;
    canvas.height = sizePx * dpr;
    canvas.style.width = `${sizePx}px`;
    canvas.style.height = `${sizePx}px`;

    globeRef.current = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width: sizePx * dpr,
      height: sizePx * dpr,
      phi: phiRef.current,
      theta: thetaRef.current,
      dark,
      scale,
      diffuse,
      mapSamples,
      mapBrightness,
      baseColor: resolvedBaseColor,
      markerColor: resolvedMarkerColor,
      glowColor: resolvedGlowColor,
      markers,
      onRender: (state) => {
        if (!isDragging.current) phiRef.current += autoRotateSpeed;
        state.phi = phiRef.current;
        state.theta = thetaRef.current;
      },
    });
  }, [
    dark,
    scale,
    diffuse,
    mapSamples,
    mapBrightness,
    resolvedBaseColor,
    resolvedMarkerColor,
    resolvedGlowColor,
    markers,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initGlobe();

    // Mouse events
    const onMouseDown = (e) => {
      isDragging.current = true;
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
      canvas.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (isDragging.current) {
        const deltaX = e.clientX - lastMouseX.current;
        const deltaY = e.clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.clientX;
        lastMouseY.current = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      canvas.style.cursor = "grab";
    };

    const onMouseLeave = onMouseUp;

    // Touch events
    const onTouchStart = (e) => {
      isDragging.current = true;
      lastMouseX.current = e.touches[0].clientX;
      lastMouseY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (isDragging.current) {
        const deltaX = e.touches[0].clientX - lastMouseX.current;
        const deltaY = e.touches[0].clientY - lastMouseY.current;
        const rotationSpeed = 0.005;

        phiRef.current += deltaX * rotationSpeed;
        thetaRef.current = Math.max(
          -Math.PI / 2,
          Math.min(Math.PI / 2, thetaRef.current - deltaY * rotationSpeed)
        );

        lastMouseX.current = e.touches[0].clientX;
        lastMouseY.current = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => (isDragging.current = false);

    // Add listeners
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchend", onTouchEnd);

    // Handle visibility (pause when tab inactive)
    const handleVisibilityChange = () => {
      if (!globeRef.current) return;
      if (document.hidden && globeRef.current.pause) globeRef.current.pause();
      else if (globeRef.current.resume) globeRef.current.resume();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Debounced resize
    const handleResize = debounce(() => initGlobe(), 300);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      if (globeRef.current?.destroy) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [initGlobe]);

  return (
    <div
      className={cn(
        "flex items-center justify-center z-[50] w-full h-full md:mt-[200px] mt-[10px] cursor-grab",
        className
      )}
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          aspectRatio: "1/1",
          cursor: "grab",
          display: "block",
          pointerEvents: "auto", 
        }}
        className="mx-auto mt-[100px] md:mt-[900px]"
      />
    </div>
  );
};

export default Globe;
