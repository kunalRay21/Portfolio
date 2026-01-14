"use client";

import { useEffect, useState } from "react";

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
      <style jsx>{`
        .strip {
          animation: slideAndExit 2.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideAndExit {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>

      <div className={`absolute inset-0 flex flex-row ${exit ? "exit" : ""}`}>
        <div
          className="strip flex-1 h-full bg-[#050807]"
          style={{
            animationDelay: `0s`,
          }}
        />
      </div>
    </div>
  );
}
