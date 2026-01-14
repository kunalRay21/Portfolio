"use client";

import { useState } from "react";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <style jsx>{`
        .hamburger {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
          padding: 0.5rem;
          transition: all 0.3s ease;
        }

        .hamburger:hover {
          gap: 0.75rem;
        }

        .hamburger-dash {
          width: 1.5rem;
          height: 2px;
          background-color: white;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger.active .hamburger-dash:first-child {
          transform: rotate(45deg) translateY(12px);
        }

        .hamburger.active .hamburger-dash:last-child {
          transform: rotate(-45deg) translateY(-12px);
        }
      `}</style>

      <button
        className={`hamburger fixed top-8 right-8 z-50 ${
          isOpen ? "active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <div className="hamburger-dash" />
        <div className="hamburger-dash" />
      </button>
    </>
  );
}
