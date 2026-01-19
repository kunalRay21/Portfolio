"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectCardProps } from "./types";

export default function ProjectCardClient({
  project,
  index,
  priority = false,
}: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { title, image, description, technologies, link } = project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-[420px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* 3D Card Container */}
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          perspective: "1000px",
        }}
      >
        {/* Front Face - Image & Title */}
        <div
          className="absolute w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {/* Background Image - Optimized with Next.js Image */}
          <div className="absolute inset-0">
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-emerald-500/30" />

          {/* Content */}
          <div className="relative h-full p-8 flex flex-col justify-between">
            {/* Featured Badge */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 w-fit">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-medium text-emerald-300">
                  Featured
                </span>
              </div>
            </div>

            {/* Title at bottom */}
            <motion.h3
              className="text-4xl font-bold text-white"
              animate={{
                y: isFlipped ? 20 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              {title}
            </motion.h3>
          </div>

          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{
              x: isFlipped ? "100%" : "-100%",
            }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Back Face - Description & Tech Stack */}
        <div
          className="absolute w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-teal-600/30 to-emerald-600/30 backdrop-blur-sm p-8"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Background with overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />

          {/* Border glow */}
          <div className="absolute inset-0 rounded-2xl border border-emerald-500/30" />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between">
            {/* Description */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-emerald-300">
                About Project
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                {description}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-emerald-300">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 border border-emerald-500/30 text-emerald-300"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.05,
                    }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* View Project Link */}
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
              whileHover={{ x: 5 }}
            >
              <span>View Project</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
