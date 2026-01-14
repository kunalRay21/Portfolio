"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Hero/Sidebar";

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    console.log("current OPEN STATE", isOpen);
    setIsOpen((prev) => !prev);
    console.log("OPEN STATE AFTER CLICK", isOpen);
  };
  return (
    <>
      <motion.button
        className={`fixed top-8 right-8 z-50 flex flex-col justify-center gap-2 cursor-pointer p-2`}
        onClick={handleClick}
        aria-label="Toggle menu"
        onHoverStart={() => {}}
        onHoverEnd={() => {}}
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
      <Sidebar isOpen={isOpen} />
    </>
  );
}
