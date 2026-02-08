"use client";

import { useState, useEffect } from "react";

interface ScrollIndicatorProps {
  isVisible?: boolean;
}

export default function ScrollIndicator({
  isVisible = true,
}: ScrollIndicatorProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-9998 pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      } top-0 left-0 right-0 md:top-1/2 md:left-6 md:right-auto md:-translate-y-1/2 md:transform`}
    >
      {/* Desktop Version (Vertical) */}
      <div className="hidden md:block w-2 h-[30vh] bg-gray-800/50 rounded-full overflow-hidden shadow-lg">
        <div
          className="w-full bg-linear-to-b from-[#00ff41] to-[#00cc33] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,65,0.6)]"
          style={{
            height: `${progress}%`,
          }}
        />
      </div>

      {/* Mobile Version (Horizontal) */}
      <div className="md:hidden w-full h-1.5 bg-gray-800/50 overflow-hidden shadow-lg">
        <div
          className="h-full bg-linear-to-r from-[#00ff41] to-[#00cc33] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,65,0.6)]"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
