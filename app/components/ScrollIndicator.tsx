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
      className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-9998 pointer-events-none transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Track background */}
      <div className="w-2 h-[30vh] bg-gray-800/50 rounded-full overflow-hidden shadow-lg">
        {/* Progress indicator */}
        <div
          className="w-full bg-linear-to-b from-[#00ff41] to-[#00cc33] rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,255,65,0.6)]"
          style={{
            height: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
