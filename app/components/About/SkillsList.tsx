"use client";

import { motion } from "framer-motion";
import { Skill } from "./types";

interface SkillsListProps {
  skills: Skill[];
}

/**
 * SkillsList Component
 * ====================
 *
 * Displays skills organized by category with proficiency bars.
 * Features smooth animations and hover interactions.
 */

export default function SkillsList({ skills }: SkillsListProps) {
  const categories = {
    frontend: { label: "Frontend", color: "emerald" },
    backend: { label: "Backend", color: "blue" },
    tools: { label: "Tools & DevOps", color: "purple" },
    design: { label: "Design", color: "pink" },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, x: -60, rotateY: -25 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="space-y-6 md:space-y-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {Object.entries(categories).map(([key, { label, color }], catIndex) => {
        const categorySkills = skills.filter((skill) => skill.category === key);

        if (categorySkills.length === 0) return null;

        return (
          <motion.div
            key={key}
            variants={categoryVariants}
            style={{ perspective: "1000px" }}
          >
            {/* Category Header with pulse animation */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                className={`w-2 h-2 rounded-full bg-${color}-500`}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: catIndex * 0.3,
                }}
              />
              <motion.h3
                className="text-lg font-semibold text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                {label}
              </motion.h3>
            </div>

            {/* Skills Grid - Badge Layout */}
            <div className="flex flex-wrap gap-3">
              {categorySkills.map((skill, idx) => (
                <SkillCard key={skill.id} skill={skill} index={idx} />
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}

function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      className="group relative px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring" as const,
        stiffness: 120,
        damping: 15,
        delay: index * 0.03,
      }}
      whileHover={{
        scale: 1.05,
        y: -4,
        borderColor: "rgba(16, 185, 129, 0.3)",
        backgroundColor: "rgba(16, 185, 129, 0.05)",
        transition: { duration: 0.2 },
      }}
    >
      {/* Glowing border effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)",
        }}
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Skill Name - Centered Badge Style */}
      <div className="relative z-10 flex items-center justify-center">
        <motion.span
          className="text-sm font-medium text-white text-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          {skill.name}
        </motion.span>
      </div>

      {/* Optional glow pulse effect */}
      <motion.div
        className="absolute -inset-1 rounded-xl bg-emerald-500/20 blur-md opacity-0 group-hover:opacity-100 -z-10"
        animate={{
          opacity: [0, 0.3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.1,
        }}
      />
    </motion.div>
  );
}
