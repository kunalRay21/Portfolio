"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { SIDEBAR_LINKS } from "@/app/constants/sidebarLinks";

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
        className="fixed top-0 right-0 h-screen bg-[#050807] border-l border-white/10 z-40 overflow-y-auto w-4/5 md:w-3/10"
        initial={{ x: "100%", borderRadius: "50%", opacity: 0 }}
        animate={{
          x: isOpen ? "0%" : "100%",
          borderRadius: isOpen ? "0%" : "50%",
          opacity: isOpen ? 1 : 0,
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

        <div className="flex w-full h-screen flex-col justify-between items-start p-8">
          {/* Spacing for close button */}
          <div className="h-16" />

          {/* Navigation Links */}
          <nav className="w-full flex flex-col gap-4 relative">
            {SIDEBAR_LINKS.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  item.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="relative block px-6 py-3 rounded-lg transition-colors"
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                {hoveredItem === index && (
                  <motion.div
                    layoutId="sidebar-hover"
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  />
                )}

                {/* Link Container */}
                <div className="relative flex items-center gap-3 text-gray-300 z-10">
                  <motion.div
                    animate={{
                      scale: hoveredItem === index ? 1.1 : 1,
                      rotate: hoveredItem === index ? [0, -5, 5, 0] : 0,
                      x: hoveredItem === index ? 2 : 0,
                    }}
                    transition={{
                      scale: { type: "spring", stiffness: 400, damping: 20 },
                      rotate: { duration: 0.4, ease: "easeInOut" },
                      x: { type: "spring", stiffness: 300, damping: 25 },
                    }}
                  >
                    {hoveredItem === index ? (
                      <ExternalLink className="w-5 h-5 text-blue-400" />
                    ) : (
                      <item.icon
                        className="w-5 h-5"
                        style={{ color: item.color }}
                      />
                    )}
                  </motion.div>
                  <motion.span
                    animate={{
                      x: hoveredItem === index ? 4 : 0,
                      color:
                        hoveredItem === index
                          ? "rgb(147, 197, 253)"
                          : "rgb(209, 213, 219)",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  >
                    {item.label}
                  </motion.span>
                </div>
              </motion.a>
            ))}
          </nav>

          {/* Footer Space */}
          <div className="h-20" />
        </div>
      </motion.div>
    </>
  );
}
