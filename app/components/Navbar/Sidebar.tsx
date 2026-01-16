"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const linkItems = [
    { href: "https://linkedin.com", label: "Linkedin", color: "#345995" },
    { href: "https://github.com", label: "About", color: "#029B00" },
    { href: "mailto:contact@example.com", label: "Contact", color: "#ED9121" },
    { href: "https://github.com", label: "Github", color: "#57ADEC" },
    { href: "https://blog.example.com", label: "Blog", color: "#CBDF92" },
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      />

      {/* Sidebar */}
      <motion.div
        className="fixed top-0 right-0 h-screen bg-[#050807] border-l border-white/10 z-40 overflow-y-auto opacity-100 w-4/5 md:w-3/10"
        initial={{ x: "100%", borderRadius: "50%" }}
        animate={{
          x: isOpen ? "0%" : "100%",
          borderRadius: isOpen ? "0%" : "50%",
        }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
      >
        {/* Close Button */}
        <motion.button
          className={`fixed top-8 right-8 flex flex-col justify-center gap-2 cursor-pointer p-2 rounded z-50`}
          onClick={onClose}
          aria-label="Close menu"
        >
          <motion.div
            className="w-6 h-0.5 bg-white"
            animate={isOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="w-6 h-0.5 bg-white"
            animate={isOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <div className="flex w-full min-h-screen items-center">
          <nav className="space-y-8 w-full text-center flex items-start px-20 flex-col pt-20">
            {linkItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 w-full"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.a
                  href={item.href}
                  target={item.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={
                    item.href.startsWith("mailto")
                      ? undefined
                      : "noopener noreferrer"
                  }
                >
                  {hoveredItem === index ? (
                    <ExternalLink className="w-5 h-5 text-white" />
                  ) : (
                    <motion.span
                      className="w-5 h-5 cursor-pointer flex-shrink-0 relative rounded-full flex items-center justify-center"
                      animate={{ scale: hoveredItem === index ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      style={{ backgroundColor: item.color }}
                    ></motion.span>
                  )}
                </motion.a>
                <a
                  href="#"
                  className="block text-white hover:text-white/60 transition-colors"
                >
                  {item.label}
                </a>
              </motion.div>
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );
}
