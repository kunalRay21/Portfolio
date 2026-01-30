"use client";

import { motion } from "framer-motion";
import { Experience } from "./types";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceTimelineProps {
  experiences: Experience[];
}

/**
 * ExperienceTimeline Component
 * ============================
 *
 * Displays work experience in a vertical timeline format.
 * Features smooth animations and interactive cards.
 */

export default function ExperienceTimeline({
  experiences,
}: ExperienceTimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50, rotateY: -5 },
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
      className="relative space-y-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {/* Timeline Line with animated gradient */}
      <motion.div
        className="absolute left-3.75 top-8 bottom-8 w-0.5 bg-linear-to-b from-emerald-500 via-emerald-500/50 to-transparent hidden md:block"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      {experiences.map((exp, index) => (
        <motion.div key={exp.id} variants={itemVariants} className="relative">
          {/* Timeline Dot with pulse animation */}
          <motion.div
            className="absolute left-0 top-6 w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-emerald-600 border-4 border-black shadow-lg shadow-emerald-500/50 hidden md:flex items-center justify-center z-10"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(16, 185, 129, 0.5)",
                "0 0 40px rgba(16, 185, 129, 0.8)",
                "0 0 20px rgba(16, 185, 129, 0.5)",
              ],
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: index * 0.15,
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.3,
              },
            }}
          >
            <Briefcase className="w-3.5 h-3.5 text-white" />
          </motion.div>

          {/* Content Card with 3D effect */}
          <motion.div
            className="md:ml-16 group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
            initial={{ opacity: 0, x: -50, rotateX: -10 }}
            whileInView={{ opacity: 1, x: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring" as const,
              stiffness: 80,
              damping: 15,
              delay: index * 0.15,
            }}
            whileHover={{
              scale: 1.01,
              x: 4,
              rotateY: 1,
              transition: { duration: 0.3 },
            }}
            style={{ perspective: "1000px" }}
          >
            {/* Background Glow with moving gradient */}
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)",
                  "linear-gradient(225deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)",
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 100%)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Shimmer effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <motion.h3
                      className="text-lg md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                    >
                      {exp.role}
                    </motion.h3>
                    {exp.current && (
                      <motion.span
                        className="px-2 py-1 text-xs font-medium text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        Current
                      </motion.span>
                    )}
                  </div>
                  <p className="text-emerald-400 font-medium mb-2">
                    {exp.company}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-300 mt-2 md:mt-0">
                  <Calendar className="w-4 h-4" />
                  {exp.duration}
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Technologies with stagger animation */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                {exp.technologies.map((tech, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, scale: 0, rotate: -10 },
                      visible: { opacity: 1, scale: 1, rotate: 0 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -2,
                      backgroundColor: "rgba(16, 185, 129, 0.2)",
                      borderColor: "rgba(16, 185, 129, 0.3)",
                      color: "#6EE7B7",
                    }}
                    className="px-3 py-1 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
