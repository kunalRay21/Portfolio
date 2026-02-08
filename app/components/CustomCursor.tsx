"use client";

import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        className={`hidden md:block fixed pointer-events-none z-9999 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          willChange: "left, top",
        }}
      >
        {/* macOS arrow cursor */}
        <svg
          width="23"
          height="23"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))",
          }}
        >
          <path
            d="M 10 5 L 10 95 L 35 65 L 80 65 Z"
            fill="#00ff41"
            stroke="rgba(0, 255, 65, 0.4)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </>
  );
}
