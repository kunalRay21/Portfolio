"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
interface ClipTransitionProps {
  onComplete?: () => void;
}

export default function ClipTransition({ onComplete }: ClipTransitionProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Start when loader disappears (2500ms)
    const start = setTimeout(() => {
      setActive(true);
    }, 2000);

    // Hide component after exit animation completes and call callback
    // Total duration: animation (1.8s) + delay (0.3s) + shimmer (1.5s) = ~3.6s
    const hide = setTimeout(() => {
      setActive(false);
      onComplete?.();
    }, 8000 + 3000);

    return () => {
      clearTimeout(start);
      clearTimeout(hide);
    };
  }, []);

  if (!active) return null;

  const panels = 5;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 flex flex-row">
        {[...Array(panels)].map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-full bg-gradient-to-b from-[#050807] via-[#0a0f0d] to-[#050807]"
            initial={{ y: 0 }}
            animate={{ y: "-100%" }}
            transition={{
              duration: 1.8,
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.08,
            }}
          />
        ))}
      </div>

      {/* Shimmer overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "200%", opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
    </div>
  );
}
