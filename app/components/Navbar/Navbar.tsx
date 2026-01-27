"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Hamburger from "./Hamburger";
import { navItems } from "./NavbarItems";

export default function Navbar() {
  return (
    <nav className="fixed top-0  right-0 z-40 gap-8 flex items-center justify-between px-8 py-6">

      {/* Desktop Navigation Items */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex items-center gap-8"
      >
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Link
              href={item.href}
              className="hover:text-zinc-400 text-white transition-colors duration-200 text-lg"
            >
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Hamburger for Mobile */}
      <div >
        <Hamburger />
      </div>
    </nav>
  );
}
