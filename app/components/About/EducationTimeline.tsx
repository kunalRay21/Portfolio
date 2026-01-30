"use client";

import { motion } from "framer-motion";
import { Education } from "./types";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface EducationTimelineProps {
  education: Education[];
}

/**
 * EducationTimeline Component
 * ===========================
 *
 * Displays education history in a modern card grid layout.
 * Features elevated cards with accent borders and animated icons.
 */

export default function EducationTimeline({
  education,
}: EducationTimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {education.map((edu, index) => (
        <motion.div
          key={edu.id}
          variants={cardVariants}
          className="group relative"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
        >
          {/* Decorative Corner Accent */}
          <motion.div
            className="absolute -top-1 -right-1 w-20 h-20 bg-linear-to-br from-emerald-500/20 to-transparent rounded-tr-2xl rounded-bl-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Main Card */}
          <div className="relative p-8 rounded-2xl bg-linear-to-br from-white/10 to-white/5 border-2 border-white/10 backdrop-blur-sm overflow-hidden h-full">
            {/* Animated Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(135deg, rgba(16, 185, 129, 0.2), transparent, rgba(16, 185, 129, 0.2))",
              }}
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Top Icon Section */}
            <div className="relative z-10 flex items-start justify-between mb-6">
              <motion.div
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <GraduationCap className="w-8 h-8 text-emerald-400" />
              </motion.div>

              {/* Year Badge */}
              <motion.div
                className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-300">
                    {edu.year}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 space-y-4">
              {/* Degree Title */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.4 }}
              >
                <div className="flex items-start gap-2 mb-2">
                  <Award className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">
                    {edu.degree}
                  </h3>
                </div>
              </motion.div>

              {/* Institution */}
              <motion.p
                className="text-base font-medium text-emerald-400/90"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5 }}
              >
                {edu.institution}
              </motion.p>

              {/* Description with animated underline */}
              {edu.description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.6 }}
                  className="pt-4 border-t border-white/5"
                >
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {edu.description}
                  </p>
                </motion.div>
              )}
            </div>

            {/* Bottom Accent Line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.7, duration: 0.6 }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
