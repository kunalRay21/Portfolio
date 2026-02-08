"use client";

import { motion } from "framer-motion";
import { Skill } from "./types";
import { useState } from "react";
import { Filter, Grid, List as ListIcon } from "lucide-react";

interface SkillsListProps {
  skills: Skill[];
}

export default function SkillsList({ skills }: SkillsListProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const categories = [
    { id: "all", label: "ALL_SYSTEMS" },
    { id: "frontend", label: "INTERFACE" },
    { id: "backend", label: "CORE_LOGIC" },
    { id: "tools", label: "TOOLKIT" },
  ];

  const filteredSkills =
    activeFilter === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeFilter);

  return (
    <div className="space-y-8">
      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 md:gap-4 p-1 bg-white/5 border border-white/10 rounded-lg md:rounded-full w-fit backdrop-blur-sm">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-4 py-2 rounded-lg md:rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 ${
              activeFilter === cat.id
                ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                : "text-neutral-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredSkills.map((skill) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            key={skill.id}
            className="group relative h-28 bg-neutral-900 border border-white/20 hover:border-emerald-500/50 overflow-hidden flex flex-col justify-between p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:bg-neutral-800/50"
          >
            {/* Corner Accents - More visible */}
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-emerald-400 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-emerald-400 transition-colors duration-300" />

            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">
                DIR:/{skill.category.substring(0, 3).toUpperCase()}
              </span>
              <div className="w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-emerald-500 transition-colors animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            </div>

            <div className="relative">
              <h3 className="text-base font-bold text-white font-mono group-hover:translate-x-1 transition-transform duration-300 tracking-wide">
                {skill.name}
              </h3>

              {/* Proficiency Bar - Thicker and brighter */}
              <div className="w-full h-1 bg-white/20 mt-3 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-emerald-500 group-hover:bg-emerald-400 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>
            </div>

            {/* Hover Background Sweep */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
