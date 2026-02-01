"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Lock body scroll so only the resume scrolls
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-black/80 backdrop-blur-sm">
      {/* 1. Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* 2. The Resume Image Container */}
      <div className="relative z-10 w-full max-w-4xl my-10 px-4">
        {/* Close Button - Sticky so it follows you as you scroll, or fixed */}
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-3 bg-transparent text-white hover:text-gray-300 transition-transform hover:scale-110"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 3. The Image (Looks like a clean document) */}
        {/* Replace '/Ray.png' with your actual image file */}
        <img
          src="/Ray.png"
          alt="Resume"
          className="w-full h-auto bg-white shadow-2xl rounded-sm pointer-events-none select-none"
        />
      </div>
    </div>
  );
}
