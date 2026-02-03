"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Particles from "@/components/Particles";
import SectionHeader from "./SectionHeader";
import SkillsList from "./SkillsList";
import ExperienceTimeline from "./ExperienceTimeline";
import { aboutData } from "./aboutData";
import { useResumeModal } from "@/app/contexts/ResumeModalContext";
import { techIconMap } from "./techIcons";

/**
 * AboutSection Component
 * ======================
 *
 * Main About section featuring personal introduction, skills, experience, and stats.
 * Design consistent with Hero and Projects sections.
 *
 * STRUCTURE:
 * - Hero-style intro with gradient background
 * - Stats grid
 * - Skills categorized by type
 * - Experience timeline
 * - Smooth scroll animations throughout
 */

export default function AboutSection() {
  const { openResume } = useResumeModal();

  // Fix 2: Mobile Performance Optimization
  const [particleCount, setParticleCount] = useState(1500);

  useEffect(() => {
    const handleResize = () => {
      // Mobile detection: width < 768px
      if (window.innerWidth < 768) {
        setParticleCount(300);
      } else {
        setParticleCount(1500);
      }
    };

    // Set initial value
    handleResize();

    // Listen for window resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      id="about"
      className="relative w-full bg-linear-to-b from-black via-black to-transparent overflow-hidden"
    >
      {/* Particles Background - Optimized for Mobile */}
      <div className="absolute inset-0 pointer-events-none z-5 opacity-40">
        <Particles
          className=""
          particleCount={10000}
          particleSpread={40}
          speed={0.03}
          particleColors={["#10B981", "#34D399", "#6EE7B7"]}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={10}
          pixelRatio={
            typeof window !== "undefined"
              ? Math.min(window.devicePixelRatio, 2)
              : 1
          }
        />
      </div>

      {/* Aurora Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(52,211,153,0.1),transparent_50%)]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        {/* Hero Introduction - Compact */}
        <div className="flex items-center justify-center px-6 md:px-10 lg:px-16 py-12 md:py-16">
          <motion.div
            className="max-w-6xl w-full"
            initial={{ opacity: 0, rotateX: 15 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ perspective: "1000px" }}
          >
            {/* Main Headline with split animation */}
            <motion.h1
              className="text-center text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.1] text-white tracking-tight mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.span
                className="inline-block text-[#C9C5B1] font-signature"
                initial={{ opacity: 0, x: -50, rotateY: -90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {aboutData.headlinePrefix}
              </motion.span>
              {"  "}
              <motion.span
                className="inline-block text-emerald-500"
                initial={{ opacity: 0, x: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {aboutData.headlineCenter}
              </motion.span>{" "}
              <motion.span
                className="inline-block text-[#C9C5B1] font-signature"
                initial={{ opacity: 0, x: -50, rotateY: -90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {aboutData.headlineHighlight}
              </motion.span>{" "}
            </motion.h1>

            {/* Tagline with typewriter effect */}
            <motion.p
              className="text-center text-lg md:text-xl text-zinc-300 mb-8"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {aboutData.tagline}
            </motion.p>
          </motion.div>
        </div>

        {/* Two Column Grid - Description & Technologies */}
        <div className="max-w-6xl mx-auto px-6  py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Left Side - Description (60%) */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Description with gradient border card */}
              <div className="relative group">
                {/* Animated gradient border */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                />

                {/* Content card */}
                <div className="relative bg-zinc-900/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-zinc-800">
                  {/* Animated typing effect paragraph */}
                  <motion.div
                    className="text-base md:text-lg text-zinc-300 leading-relaxed space-y-4 relative"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    <p className="relative">
                      <motion.span
                        className="inline-block"
                        initial={{ width: 0 }}
                        whileInView={{ width: "auto" }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1.5 }}
                      >
                        {aboutData.description}
                      </motion.span>
                      <motion.span
                        className="inline-block w-0.5 h-5 bg-emerald-500 ml-1"
                        animate={{
                          opacity: [1, 0, 1],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </p>
                  </motion.div>

                  {/* Decorative elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-20 h-20 border border-emerald-500/20 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-16 h-16 border border-emerald-500/10 rounded-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -90, -180, -270, -360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Side - Technologies (40%) */}
            <motion.div
              className="lg:col-span-4"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-4 justify-center">
                  {aboutData.skills.map((skill, index) => {
                    const techConfig = techIconMap[skill.id];
                    if (!techConfig) return null;

                    const Icon = techConfig.icon;

                    return (
                      <motion.a
                        key={skill.id}
                        href={techConfig.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-2 group cursor-pointer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-xs text-zinc-400 text-center max-w-20 group-hover:text-emerald-400 transition-colors">
                          {skill.name}
                        </span>
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-12">
          <SectionHeader
            badge="Professional Journey"
            title="Work Experience"
            subtitle="Building innovative solutions and leading teams across various industries."
          />
          <ExperienceTimeline experiences={aboutData.experience} />
        </div>

        {/* Download Resume CTA - Fix 5 */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-12 flex justify-center">
          <motion.button
            onClick={openResume}
            className="group relative px-8 py-4 rounded-full bg-emerald-500 text-white font-semibold text-lg overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#059669",
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 1,
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              View Resume
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={{
                  x: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </span>
          </motion.button>
        </div>

        {/* Bottom Spacing */}
        <div className="h-12" />
      </div>
    </section>
  );
}
