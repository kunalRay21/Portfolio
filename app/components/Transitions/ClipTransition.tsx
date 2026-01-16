"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ClipTransition() {
  const [active, setActive] = useState(false);
  const [exit, setExit] = useState(false);

  useEffect(() => {
    // Start when loader disappears (1500ms)
    const start = setTimeout(() => {
      setActive(true);
    }, 1500);

    // Clear strips after they fully cover
    const clear = setTimeout(() => {
      setExit(true);
    }, 2900);

    // Hide component after exit animation completes
    const hide = setTimeout(() => {
      setActive(false);
    }, 3700);

    return () => {
      clearTimeout(start);
      clearTimeout(clear);
      clearTimeout(hide);
    };
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 flex flex-row">
        <motion.div
          className="flex-1 h-full bg-[#050807]"
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          transition={{
            duration: 2.4,
            ease: [0.22, 1, 0.36, 1],
            delay: 0,
          }}
        />
      </div>
    </div>
  );
}
