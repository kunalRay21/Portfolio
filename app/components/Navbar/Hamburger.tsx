"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        className={`flex flex-col justify-center gap-2 cursor-pointer p-2 rounded z-50`}
        onClick={handleClick}
        aria-label="Toggle menu"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
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
      <Sidebar isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
