"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Hamburger from "./Hamburger";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 p-8 right-0 z-40">

        <Hamburger/>
    </nav>
  );
}
