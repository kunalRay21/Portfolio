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

            {/* Skills Grid with wave pattern */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
      className="group relative p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, rotateX: -20 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: index * 0.05,
      }}
      whileHover={{
        scale: 1.03,
        y: -4,
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

      <div className="flex items-center justify-between mb-2 relative z-10">
        <motion.span
          className="text-sm font-medium text-white"
          whileHover={{ x: 5 }}
          transition={{ type: "spring" as const, stiffness: 300 }}
        >
          {skill.name}
        </motion.span>
        <motion.span
          className="text-xs text-zinc-400 tabular-nums"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 + 0.3 }}
        >
          {skill.proficiency}%
        </motion.span>
      </div>

      {/* Progress Bar with liquid fill effect */}
      <div className="relative w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: index * 0.1,
          }}
        />

        {/* Main progress bar with wave effect */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: index * 0.08,
          }}
        />

        {/* Glow effect that follows the progress */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-emerald-500/50 rounded-full blur-sm"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: index * 0.08,
          }}
        />

        {/* Moving light particle */}
        <motion.div
          className="absolute inset-y-0 w-1 bg-white rounded-full shadow-lg shadow-emerald-500"
          initial={{ left: 0 }}
          animate={{ left: `${skill.proficiency}%` }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
            delay: index * 0.08,
          }}
        />
      </div>
    </motion.div>
  );
}
