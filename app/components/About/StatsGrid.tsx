"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import { AboutData } from "./types";

interface StatsGridProps {
  stats: AboutData["stats"];
}

/**
 * StatsGrid Component
 * ===================
 *
 * Displays animated statistics in a grid layout.
 * Features 3D tilt effects and floating animations.
 */

export default function StatsGrid({ stats }: StatsGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} stat={stat} index={index} />
      ))}
    </motion.div>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: { label: string; value: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"],
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 60, rotateX: -45, scale: 0.8 },
        visible: {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 12,
            delay: index * 0.08,
          },
        },
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={{
        y: isHovered ? -8 : [0, -5, 0],
      }}
      transition={{
        y: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.2,
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden cursor-pointer"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Ambient glow */}
      <div className="absolute -inset-1 bg-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Shimmer effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      )}

      <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
        <motion.div
          className="text-3xl md:text-4xl font-bold text-white mb-2"
          animate={{
            color: isHovered ? "#10B981" : "#FFFFFF",
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {stat.value}
        </motion.div>
        <motion.div
          className="text-xs md:text-sm text-zinc-400"
          animate={{
            color: isHovered ? "#D1D5DB" : "#A1A1AA",
          }}
          transition={{ duration: 0.3 }}
        >
          {stat.label}
        </motion.div>
      </div>

      {/* Corner accent with rotation */}
      <motion.div
        className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-emerald-500/10 to-transparent rounded-bl-full"
        initial={{ opacity: 0, rotate: -45 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          rotate: isHovered ? 0 : -45,
        }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
}
